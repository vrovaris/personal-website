#!/bin/sh
# Builds libseccomp 2.6.1 to WebAssembly and links a harness that exports real
# cBPF. Runs entirely inside emscripten/emsdk under --platform linux/amd64:
#
#   - the container is Linux, so the kernel headers libseccomp needs
#     (linux/*.h, asm/*.h) are present; Emscripten ships none
#   - amd64 specifically, because asm/unistd.h must carry x86_64 syscall
#     numbers — the architecture the gate's policies and traces describe
#   - nothing is installed on the host
#
# Usage: ./build.sh     (from tools/seccomp-wasm/)
set -eu

VERSION=2.6.1
IMAGE=emscripten/emsdk:latest
HERE=$(cd "$(dirname "$0")" && pwd)

mkdir -p "$HERE/build"

docker run --rm --platform linux/amd64 \
  -v "$HERE/build:/work" -v "$HERE/shim:/shim:ro" -w /work "$IMAGE" sh -c "
set -eu

# gperf generates libseccomp's syscall-table perfect hash. Build-time only.
apt-get update -qq >/dev/null 2>&1
apt-get install -y -qq gperf >/dev/null 2>&1

if [ ! -d libseccomp-$VERSION ]; then
  wget -q https://github.com/seccomp/libseccomp/releases/download/v$VERSION/libseccomp-$VERSION.tar.gz
  tar xzf libseccomp-$VERSION.tar.gz
fi
cd libseccomp-$VERSION

# --- the one modification to upstream (LGPL-2.1: published here, in full) ---
# libseccomp picks arch_def_native from the build architecture and #errors on
# anything it does not recognise. wasm32 is not a seccomp target and never will
# be — there are no syscalls to filter. The library is built only to generate
# BPF for a real kernel, and the filters this site emits describe x86_64.
grep -q '__EMSCRIPTEN__' src/arch.c || sed -i \
  's|^#if __i386__|#if defined(__EMSCRIPTEN__)\nconst struct arch_def *arch_def_native = \&arch_def_x86_64;\n#elif __i386__|' \
  src/arch.c

# -I/shim wins over glibc's sys/prctl.h, which opens with __BEGIN_DECLS and does
# not compile against Emscripten's musl-flavoured libc. -idirafter puts the
# kernel headers last, so Emscripten's own headers keep priority.
CFLAGS='-Os -I/shim -include /shim/compat.h -idirafter /usr/include -idirafter /usr/include/x86_64-linux-gnu'

[ -f Makefile ] || emconfigure ./configure \
  --host=wasm32-unknown-emscripten \
  --enable-static --disable-shared --disable-python \
  CFLAGS=\"\$CFLAGS\" >/work/configure.log 2>&1

# src only: the tools/ directory has its own machine-type #error and is not needed.
emmake make -C src -j4 >/work/make.log 2>&1

emcc -Os -I include -I /shim -include /shim/compat.h \
  -idirafter /usr/include -idirafter /usr/include/x86_64-linux-gnu \
  /shim/export_bpf.c /shim/stub.c src/.libs/libseccomp.a \
  -o /work/export_bpf.js

node /work/export_bpf.js read write exit_group >/work/sample.hex
"

echo "built: build/export_bpf.wasm"
