---
name: simplicity
description: Use before writing any code and again before opening any pull request. The hard rules on writing no more code than the task requires, with the specific checks that catch over-engineering.
---

# Write less code

**Hard requirement.** The smallest change that fully solves the ticket is the correct change. Extra code is not free: it is read, maintained, debugged, and explained forever. This is a personal site built by one student between classes, research, and a teaching job. Every line has to earn its place.

## Rules

1. **No abstraction until the third occurrence.** Two similar things stay two similar things. Duplication is cheaper than the wrong abstraction, and it is visible, which the wrong abstraction is not.
2. **No configuration nobody asked for.** No options, flags, themes, or hooks for imagined future needs. Build for what the ticket says.
3. **No error handling for states that cannot occur.** Handle what can actually fail: network, filesystem, user input, third-party APIs. Do not guard against your own code being wrong.
4. **No `catch` that swallows.** Either handle the error meaningfully or let it crash loudly. A silenced error is a bug that ships.
5. **No dependency for something fifty lines of your own code does.** Every package is a supply chain, a bundle-size cost, and a future breaking change. Ask before adding one, and say what it replaces.
6. **No `utils/`, no barrel files, no re-export layers.** Put the function next to its only caller until a second caller exists.
7. **Do not split a function until it is called twice or exceeds a screen.** One readable forty-line function beats four clever ten-line ones that must be assembled in the reader's head.
8. **Delete code, never comment it out.** Git remembers. Commented-out blocks are noise that outlives their author's intent.
9. **No premature optimisation.** No memoisation, caching, or virtualisation without a measurement showing it is needed. Attach the measurement.
10. **If you cannot explain a line's purpose in one sentence, delete it** and see what breaks. Often nothing does.

## Before opening a pull request

Read the whole diff as though someone else wrote it, and answer:

- Which lines could be deleted with no loss of behaviour?
- Which abstraction has exactly one user?
- Which dependency earns its weight?
- Which branch is unreachable?
- Is anything here solving a problem the ticket did not ask about?

Delete what fails. Then state in the PR what you removed on this pass — that line is expected and its absence is a signal that this check was skipped.

## The failure mode this exists to prevent

Agents produce plausible, well-structured, generously abstracted code that is three times the size it needs to be, and it survives review because nothing in it is *wrong*. Size is a defect on its own. Treat it that way.
