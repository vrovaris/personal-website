# Trace format — the contract between `secure-sandbox` and the site

The gate (plan §5.1) shows recordings of real executions replayed against a
policy the visitor builds in the browser. The recordings are produced by a
harness in the **`secure-sandbox`** repository (P3-01) and consumed by the
policy evaluator here (P3-02). Neither repo can see the other, so this file is
the agreement. **Change it in a pull request that both sides can read, not by
editing one implementation.**

Nothing executes in the browser. These files are the only real executions in the
feature, and they happened once, on a real kernel, at capture time.

---

## Files

One JSON file per scenario, in `public/traces/<id>.json`. A `public/traces/index.json`
lists them. Total shipped weight ≤150KB gzipped (P3-01's acceptance criterion).

## Schema

```jsonc
{
  "version": 1,                  // reject on mismatch; do not guess
  "id": "escape-via-execve",     // filename stem, kebab-case, stable forever
  "kind": "attack",              // "attack" | "benign"
  "title": "Spawn a shell with execve",
  "argv": ["/proc/self/exe", "--scenario", "execve"],
  "capturedAt": "2026-09-15",    // date only: a timestamp is not a fact anyone needs
  "kernel": "6.8.0",             // uname -r of the capture host, major.minor.patch
  "escape": ["execve", "execveat"],   // attack only — see "What counts as escape"
  "seq": [
    { "t": 0,    "syscall": "brk",    "args": "NULL",                "ret": "0x5578..." },
    { "t": 1200, "syscall": "openat", "args": "AT_FDCWD, \"/etc/ld.so.cache\", O_RDONLY", "ret": "3" },
    { "t": 1310, "syscall": "execve", "args": "\"/bin/sh\", [\"sh\"], 0x7ffd...", "ret": "-1 EPERM" }
  ]
}
```

### Fields

| field | rule |
|---|---|
| `version` | Integer. The evaluator refuses a file it does not know. |
| `id` | Matches the filename. Never reused for different content. |
| `kind` | `attack` scenarios can be *contained* or *escaped*; `benign` ones detect *broken*. |
| `argv` | What was run. Display only. |
| `capturedAt` | Date, not datetime. |
| `kernel` | So the page can say which kernel these are recordings of. |
| `escape` | Attack only. Syscall names whose success constitutes escape. |
| `seq[].t` | Microseconds **since the first syscall in this trace**, integer. Never absolute. |
| `seq[].syscall` | Bare name, no arguments. **The only field the verdict depends on.** |
| `seq[].args` | Pre-rendered display string, already normalised. Never parsed. |
| `seq[].ret` | Display string. Errors as strace writes them: `-1 EACCES`. |

`syscall` is the entire contract for correctness. Everything else is for the
screen, which means a rendering change in the harness can never alter a verdict.

## What counts as escape

The trap this exists to avoid: an attack trace contains setup syscalls before the
exploit proper. If the visitor denies `brk`, the program dies during startup — a
denied syscall was hit, but calling that *contained* would tell the visitor their
policy stopped an attack when it only stopped a program from starting.

So:

- **contained** — a syscall in `seq` is not permitted, and it occurs at or before
  the first syscall named in `escape`. Report the index.
- **escaped** — every syscall up to and including the first `escape` entry is
  permitted.
- **broken** — a `benign` trace hits a denied syscall at any index.

`escape` is therefore load-bearing and must be set by someone who knows what the
scenario actually does. It belongs in the harness, next to the scenario.

## Normalisation, and why it is not optional

Captured with `strace -f -qq -ttt`. Raw output is neither deterministic nor safe
to publish.

1. **Pointers and addresses** → `0xADDR`. They vary per run under ASLR.
2. **PIDs and TIDs** → `p0`, `p1`, … in first-appearance order.
3. **Timestamps** → microseconds since the trace's first syscall.
4. **Absolute paths under the capture user's home** → `~/…`. A raw trace exposes
   a home directory and a username (D31 point 4).
5. **The username and the hostname** → removed wherever they appear, including
   inside string arguments.
6. **Long string arguments** → truncated to 64 characters with a trailing `…`.

Rules 4 and 5 are a disclosure control, not tidiness, and belong in the private
repo's CI next to the `strings` check (D31). **A trace that has not been through
them must never reach `public/`.**

## Determinism

P3-01's acceptance criterion is that a capture is reproducible. After
normalisation, capturing the same scenario three times must produce identical
`seq` arrays. If it does not — thread interleaving under `-f`, a timing-dependent
path — the scenario is unsuitable for this feature and should be replaced rather
than papered over with a tolerance. A trace the visitor cannot trust is worse
than one fewer scenario.

## What the site promises about these files

Per §5.1 the UI states, in one plain sentence, that traces are recordings and
that nothing runs in the browser. The `kernel` and `capturedAt` fields exist so
that sentence can be specific rather than vague.
