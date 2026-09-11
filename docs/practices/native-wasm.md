---
name: native-wasm
description: Use when compiling C to WebAssembly with Emscripten, building the grammar parser or libseccomp for the browser, or debugging why a native library will not work in a web context.
---

# Native code in the browser

Read `simplicity.md` first.

## The constraint that shapes everything

**Emscripten has no `fork()` and no POSIX signals.** This is not a configuration problem and no flag fixes it. Consequences:

- A shell cannot execute in the browser. Pipelines, job control, and `SIGCHLD` reaping are all unavailable.
- **Parsing is pure computation and compiles cleanly.** That is why the grammar interactive compiles only a parser and renders the process plan as a model built in TypeScript from the AST.
- Any UI touching this states in one plain sentence which part is real and which is a model. Never imply execution that is not happening.
- A real in-browser Linux needs a hardware emulator booting an actual kernel, which is fenced off as a stretch goal. Emulating syscalls without a kernel does not provide seccomp, namespaces, or cgroups, so it cannot demonstrate the sandbox.

## Build rules

- Build in CI, commit the artifact, and have CI rebuild and diff it. A committed artifact that no longer matches its source is worse than no artifact.
- Budget: 200KB gzipped per module. Over budget means cutting scope, not raising the budget.
- `-Os`, assertions off, no source maps, no DWARF in anything published. This is both a size decision and, for the shell, a disclosure one.
- Malformed input returns a structured error. A WASM trap kills the module and takes the page's interactivity with it.
- Export the minimum surface. One entry point taking a string and returning JSON is usually the whole API.
- Test in Safari, Firefox, and Chrome. Safari is where WASM problems appear.

## The grammar module

A hand-written recursive-descent parser in C, written from scratch from the POSIX shell specification, sharing no code with and bearing no structural resemblance to the university coursework. Not Flex or Bison — a different technique is deliberate, so no resemblance argument can be made.

If you have read the coursework, you cannot work on this module. That is not a style preference.

## The libseccomp spike

Timeboxed at four hours. Success means genuine cBPF bytecode exported in the browser. Failure means a TypeScript emitter that mirrors the same instruction ordering, labelled honestly as a reimplementation. Do not let a spike become a project.

## Explaining this work

Vitor writes C and knows POSIX well — that part needs no explanation. What is new is the compilation target and its boundaries: what a WASM module can and cannot reach, why there is no process model, how memory crosses between JavaScript and C. Explain that, not the C.
