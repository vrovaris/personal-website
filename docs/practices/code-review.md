---
name: code-review
description: Use at the start and end of every ticket. Defines how work is proposed, explained, and handed to Vitor for review — the plan-first checkpoint, the walkthrough format, and the rules for keeping changes small enough to actually review.
---

# Working with a human in the loop

Vitor reviews everything and intends to understand it. He is a systems programmer: assume he reads C, knows POSIX, and has never used Astro. Explain the framework, not the fundamentals.

The goal is not approval. The goal is that he could rewrite any file in this repository from memory of why it exists.

## Three checkpoints per ticket

**1. Plan, before writing code.** Post and stop:

- what you are going to build, in two or three sentences
- the files you will create or change, as a list
- the one design choice that had a real alternative, and why you picked yours
- anything in the plan or decision log that turned out to be wrong or underspecified

Wait for a reply. Plumbing tickets need a paragraph; anything touching layout, data shape, or the interactive islands needs the full form.

**2. Stop at the first surprise.** If a file does not exist where the plan says, a library behaves differently than expected, or a ticket's acceptance criteria cannot be met as written — stop and say so. Do not route around it. A silent workaround is the single most expensive thing you can do here, because it looks like success.

**3. Walkthrough, after writing code.** In the PR description:

- **What changed**, file by file, one line each
- **How it works**, in prose, for someone who has not used this framework
- **Why this way** for any choice a reasonable engineer would question
- **Read this closely** — name the two or three spots where a bug would hide or where you are least confident
- **What I would challenge** if I were reviewing this instead of writing it

That last section is not optional and not a formality. Write the strongest honest criticism of your own work.

## Keeping changes reviewable

- One ticket per pull request. Never two.
- **Roughly 300 lines of new code is a ceiling.** Approaching it means stopping and asking whether the ticket should be split.
- Never mix a refactor with a feature. If something needs restructuring, that is its own PR with its own review.
- No drive-by fixes of unrelated code. Note them in `docs/OPEN_QUESTIONS.md`.
- Commit messages reference the ticket ID.

## Answering questions

When Vitor asks why a piece of code exists, answer plainly and without defending it.

**If he cannot follow the code after one explanation, the code is too complicated. Simplify it — do not explain harder.** This is the most reliable signal available for whether something is over-built, and it points at the code, never at the reader.

If he is wrong about something, say so directly and show why. Agreement he did not earn is worthless to him.
