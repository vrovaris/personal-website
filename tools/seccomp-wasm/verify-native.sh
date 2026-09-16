#!/bin/sh
# Proves the WASM build is faithful, not merely plausible: builds the same
# libseccomp 2.6.1 and the same harness natively for x86_64, runs both against
# the same policies, and compares the exported bytes.
#
# Run ./build.sh first. Usage: ./verify-native.sh
set -eu

HERE=$(cd "$(dirname "$0")" && pwd)
mkdir -p "$HERE/build-native"

POLICY="read write open close stat fstat mmap mprotect munmap brk rt_sigaction \
rt_sigprocmask ioctl access execve exit_group futex clock_gettime openat newfstatat"

docker run --rm --platform linux/amd64 \
  -v "$HERE/build:/work" -v "$HERE/build-native:/nat" -v "$HERE/shim:/shim:ro" \
  -w /nat emscripten/emsdk:latest sh -c "
set -eu
apt-get update -qq >/dev/null 2>&1
apt-get install -y -qq build-essential gperf >/dev/null 2>&1

if [ ! -d libseccomp-2.6.1 ]; then
  wget -q https://github.com/seccomp/libseccomp/releases/download/v2.6.1/libseccomp-2.6.1.tar.gz
  tar xzf libseccomp-2.6.1.tar.gz
fi
cd libseccomp-2.6.1
[ -f Makefile ] || ./configure --enable-static --disable-shared --disable-python >/nat/configure.log 2>&1
make -C src -j4 >/nat/make.log 2>&1

# No shim natively: glibc has sys/prctl.h and syscall(), and arch.c takes its
# __x86_64__ branch because __EMSCRIPTEN__ is undefined — which also shows the
# one-line modification does not change native behaviour.
gcc -Os -I include /shim/export_bpf.c src/.libs/libseccomp.a -o /nat/export_bpf_native

for P in 'read write exit_group' '$POLICY'; do
  W=\$(node /work/export_bpf.js \$P 2>/dev/null)
  N=\$(/nat/export_bpf_native \$P 2>/dev/null)
  if [ \"\$W\" = \"\$N\" ]; then
    echo \"  \$(echo \$P | wc -w) syscalls: identical, \$((\${#W}/16)) instructions\"
  else
    echo \"  \$(echo \$P | wc -w) syscalls: DIFFER\"; echo \"    wasm:   \$W\"; echo \"    native: \$N\"; exit 1
  fi
done
"
