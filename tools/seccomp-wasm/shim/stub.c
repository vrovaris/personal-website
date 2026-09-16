#include <errno.h>
long syscall(long number, ...) { errno = ENOSYS; return -1; }
