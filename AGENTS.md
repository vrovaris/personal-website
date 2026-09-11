# AGENTS.md

Operating instructions for any AI assistant or human contributor working on **vrovaris.com**, the personal site of Vitor Augusto Hertel Rovaris.

This file is provider-neutral by design. Work starts in Claude Code and will move to other tools later, so nothing important lives in a chat log or in a model's memory. If your tool looks for a differently named file, point it here rather than copying this content — `CLAUDE.md` and any equivalent should contain one line: *"See AGENTS.md."* A fork of this file is a bug.

---

## Read these first, in this order

| # | File | What it is |
|---|---|---|
| 1 | `AGENTS.md` | This file. How to work here. |
| 2 | `DECISIONS.md` | Every decision, why, and what superseded it. **Outranks everything else.** |
| 3 | `portfolio-site-plan.md` | The design and the ticket backlog. |
| 4 | `src/data/profile.json` | The only source of biographical facts. |
| 5 | `OPEN_QUESTIONS.md` | What nobody has answered yet. |

If `DECISIONS.md` and the plan disagree, the decision log wins and the plan gets patched in the same pull request.

---

## Hard constraints

These are not preferences. Breaking one is a defect regardless of how good the result looks.

1. **Never mention citizenship, passports, visas, immigration, or work authorization.** Not in copy, metadata, alt text, commit messages, or jokes. (D2)
2. **Never publish CS 252 coursework source**, excerpts, identifiers, file names, or error strings. Compiled binaries are permitted under the release checks in D17; source is not, ever, no matter how much of it has been rewritten. (D3, D11, D17, D20)
3. **The coursework lives in its own private repository.** Never add it to the site repo, never as a submodule or subtree, never in any form. Git history is permanent, so this cannot be undone by a later commit. (D21)
4. **Work from inside one repository directory, never from the parent.** The four repos are siblings under a plain `vrovaris.com/` folder. A session started at the parent can read `shell-private/`, which breaks the clean-room split. If your working directory contains more than one of the four repos, stop and restart in the right one. (D27)
5. **If you have read the coursework, you may not implement the new parser.** Reader and implementer are separate sessions. (D14)
6. **Never invent a biographical fact.** If it is not in `profile.json`, stop and append the question to `OPEN_QUESTIONS.md`.
7. **No Tailwind, no component library, no template, no paid dependency.** Plain CSS with custom properties. Budget is $20/year and the domain spends it. (D8)
8. **Accessibility floor in plan §10 is non-negotiable**, including on the interactive pieces.
9. **No AI chatbot.** (plan §5.4)

---

## How to work a ticket

1. Pick one ticket ID from plan §9. Implement only that.
2. If you hit a decision the plan does not cover, make the smallest reasonable call, and **append it to `DECISIONS.md` before you finish**. A decision is anything that closes an option: a library chosen, a scope cut, a default taken because nobody answered.
3. If you cannot resolve it, append to `OPEN_QUESTIONS.md` and keep going on the rest.
4. Before opening a pull request, verify every item in plan §10 that applies and paste the checklist into the description.
5. Cite decision IDs in the pull request for anything that changes or relies on one.

**A session that produced no `DECISIONS.md` entry and no `OPEN_QUESTIONS.md` entry either did nothing or lost something. Check which.**

---

## Handing off to a different provider

Everything needed is in the five files above. There is no hidden state, no memory to export, and no chat history worth reading. When switching tools:

1. Point the new tool's convention file at `AGENTS.md`.
2. Confirm the new assistant can state, unprompted, the three hard constraints about citizenship, coursework source, and the reader/implementer split. If it cannot, it has not read the files.
3. Check the index in `DECISIONS.md` for entries marked open or pending; those are the live questions.
4. Do not re-litigate settled decisions because a new model would have chosen differently. Supersede them properly, with a new entry, or leave them alone.

---

## The four repositories (D21, D26, D27)

They are siblings under a plain `vrovaris.com/` directory which is **not** a repository. Open the one you are working in, never the parent.


| Repo | Visibility | Contents |
|---|---|---|
| `personal-website` | public | the site |
| `grammar` | public, MIT | the clean-room parser |
| `shell-private` | **private, permanently** | CS 252 coursework |
| `secure-sandbox` | public | the Hermes project |

The sandbox project is called **Hermes** in all prose; `secure-sandbox` is only the repository name. `shell-private` is never a submodule, subtree, or vendored copy of `personal-website` — only a verified binary crosses between them.

## Repository conventions

- Commit messages reference the ticket ID: `P4-01: recursive-descent parser for pipelines`.
- One ticket per pull request.
- `SPEC.md` in the grammar repo is a provenance record. Do not edit it to match the implementation; if they diverge, the implementation is wrong or the spec needs a dated amendment.
- Never commit anything from `/mnt` paths, uploads, or a session scratch directory into the repository.
