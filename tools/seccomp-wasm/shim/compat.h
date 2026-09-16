/* Force-included into every libseccomp translation unit. musl/Emscripten has no
   syscall(), because wasm has no syscalls. libseccomp calls it only to install a
   filter via seccomp(2) — the export path we want is pure computation plus a
   write to an fd. A stub definition is linked in so the archive resolves; if it
   is ever reached it returns -ENOSYS rather than pretending to have worked. */
#ifndef SECCOMP_WASM_COMPAT_H
#define SECCOMP_WASM_COMPAT_H
long syscall(long number, ...);
#endif
