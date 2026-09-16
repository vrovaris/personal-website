/* Spike harness: build a seccomp filter from an allowlist and export it as real
   cBPF. Every instruction that comes out is produced by libseccomp's own
   generator — nothing here reimplements it. */
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <seccomp.h>

int main(int argc, char **argv)
{
	/* libseccomp normally probes the running kernel to decide which features
	   it may use. There is no kernel here, and the stubbed syscall() reports
	   ENOSYS, which pins the API level at 1 and rejects SCMP_ACT_KILL_PROCESS.
	   seccomp_api_set() is the library's supported way to declare the level of
	   the kernel being *targeted* rather than the one being run on — which is
	   exactly the situation: the filter describes a real x86_64 Linux, and the
	   browser is only doing the arithmetic. */
	if (seccomp_api_set(6) < 0) {
		fprintf(stderr, "seccomp_api_set failed\n");
		return 1;
	}

	scmp_filter_ctx ctx = seccomp_init(SCMP_ACT_KILL_PROCESS);
	if (!ctx) { fprintf(stderr, "seccomp_init failed\n"); return 1; }

	for (int i = 1; i < argc; i++) {
		int nr = seccomp_syscall_resolve_name(argv[i]);
		if (nr == __NR_SCMP_ERROR) {
			fprintf(stderr, "unknown syscall: %s\n", argv[i]);
			return 1;
		}
		if (seccomp_rule_add(ctx, SCMP_ACT_ALLOW, nr, 0) < 0) {
			fprintf(stderr, "rule_add failed for %s\n", argv[i]);
			return 1;
		}
	}

	/* The export path is userspace computation plus a write to an fd, which is
	   the whole reason this was worth trying under Emscripten. */
	int fd = open("/bpf.bin", O_WRONLY | O_CREAT | O_TRUNC, 0644);
	if (fd < 0) { perror("open"); return 1; }
	int rc = seccomp_export_bpf(ctx, fd);
	close(fd);
	if (rc < 0) { fprintf(stderr, "seccomp_export_bpf failed: %d\n", rc); return 1; }

	FILE *f = fopen("/bpf.bin", "rb");
	/* static, not automatic: Emscripten defaults to a 64KB stack, so this
	   array as a local blows it and traps before it reads a byte. */
	static unsigned char buf[65536];
	size_t n = fread(buf, 1, sizeof buf, f);
	fclose(f);
	fprintf(stderr, "bytes=%zu instructions=%zu\n", n, n / 8);
	for (size_t i = 0; i < n; i++) printf("%02x", buf[i]);
	printf("\n");

	seccomp_release(ctx);
	return 0;
}
