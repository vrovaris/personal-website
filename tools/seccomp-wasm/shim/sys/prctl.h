/* Emscripten's libc is musl-flavoured and glibc's <sys/prctl.h> opens with
   __BEGIN_DECLS, which musl does not define. libseccomp needs two things from
   this header: the PR_* constants, which live in the libc-agnostic kernel
   header, and a declaration of prctl(). Nothing calls prctl() on the BPF export
   path — it is used to install a filter, which the browser never does. */
#ifndef SECCOMP_WASM_SHIM_SYS_PRCTL_H
#define SECCOMP_WASM_SHIM_SYS_PRCTL_H
#include <linux/prctl.h>
int prctl(int option, ...);
#endif
