# DECISIONS.md — decision log for vrovaris.com

The permanent record of every decision made on this project, why it was made, and what superseded it. This file outranks chat history, model memory, and anyone's recollection. It is written to be read by **any** assistant or person, on any provider, with no other context.

---

## How to use this file

**Before starting work:** read `AGENTS.md`, then this file top to bottom, then `portfolio-site-plan.md`. If this file and the plan disagree, **this file wins** and the plan gets patched to match.

**Before ending a session:** append every decision made during it. A decision is anything that closes an option — a technology chosen, a scope cut, a ruling received, a constraint discovered, a default set because nobody answered a question. If a session produced no entry here, treat that as a bug in the session.

**Rules:**
1. **Append only.** Never edit or delete a past entry, including your own from ten minutes ago. To change a decision, write a new one that says which ID it supersedes, and mark the old one superseded in the index.
2. **IDs are permanent and never reused.** Next free ID is at the bottom of the index.
3. **Every entry carries:** a date, a one-line statement, the reasoning, and the consequences for the build.
4. **Record the losing option.** Six months from now the useful part is why the other thing was rejected.
5. **Record who or what decided it** — Vitor, an outside authority such as the instructor, or a default taken because nobody answered.
6. **Errata.** A plain factual error inside an entry — a misspelled name, a wrong path — may be corrected in place, but only with a dated `*Errata:*` line naming the old value. Anything that changes what was *decided* gets a new superseding entry instead, never an edit.

**Entry template:**

```
**D## — One-line statement.** *(YYYY-MM-DD · decided by: … · status: active | superseded by D##)*
Reasoning: …
Rejected: …
Consequences: …
```

---

## Index

| ID | Decision | Status |
|---|---|---|
| D1 | Concept A: user space / kernel space | active |
| D2 | Citizenship, passports, visas, status: never mentioned | active, **hard constraint** |
| D3 | CS 252 coursework: source stays private | active, extended by D11, narrowed by D17 |
| D3a | Recorded output of the shell: ask instructor first | superseded by D11, then reversed by D17 |
| D4 | Domain is `vrovaris.com` at Cloudflare Registrar | registrar superseded by D23; domain name still active |
| D5 | English only, light theme only for v1; both pre-wired | active |
| D6 | Photography allowed, one portrait plus four environment shots | active |
| D7 | Personal content undecided | open, blocks P2-04/P2-05 |
| D8 | Budget ceiling $20/year | active |
| D9 | No graduate-school signaling in v1 | active |
| D10 | `/resume.pdf` serves the general SWE variant | active |
| D11 | Instructor ruling: do not post the projects; writing is permitted | active, narrowed by D17 |
| D12 | New grammar is hand-written recursive descent in C | active |
| D13 | CS 307 / CS 407 projects publishable when taken | active, not yet actionable |
| D14 | Clean-room two-role protocol for using the coursework | active |
| D15 | Coursework never enters project files or a memory-enabled session | active |
| D16 | What is and is not reusable from the coursework | active |
| D17 | Compiled artifacts of the shell may be published; source may not | active |
| D18 | Grammar interactive uses the clean-room parser, not the coursework build | active |
| D19 | Documentation protocol and provider portability | active |
| D20 | Modifying the coursework does not change what may be published | active |
| D21 | Three repositories; coursework isolated in a private one | active |
| D22 | Binary ships as a public container image plus checksummed download | active |
| D23 | Registrar is Spaceship; DNS delegated to Cloudflare | active |
| D24 | Infrastructure accounts owned by a permanent personal email | active |
| D25 | Email: Cloudflare Email Routing, `vitor@vrovaris.com` forwarded to Gmail | active |
| D26 | Repository names as created | active, renames the table in D21 |
| D27 | Local layout: four sibling repos under a non-repo parent | active |
| D28 | No machine-local paths or hostnames in committed documents | active |

**Next free ID: D29.**

---

## 2026-09-10 — Phase 0

**D1 — Concept A (user space / kernel space) is chosen.** *(decided by: Vitor · active)*
Reasoning: the boundary between human voice and machine voice matches what Vitor actually builds, and it is structurally unlike the peer site it will inevitably be compared to.
Rejected: B (lab notebook) needs constant posting to stay alive; C (ledger) reads professional, which cuts against the brief.
Consequences: the two-track layout in plan §4.3 is load-bearing. Everything else follows from it.

**D2 — Citizenship, passports, visas, and immigration status are never mentioned.** *(decided by: Vitor · active · **hard constraint**)*
Reasoning: Vitor's instruction, stated as off-limits.
Consequences: the "borders and paperwork" half of Concept A is deleted and replaced with distance and language. Brazilian origin, Portuguese as a first language, and living in Indiana remain available, since they are already public on the résumé. A build lint fails on `citizenship`, `passport`, `visa`, `green card`, `work authorization`. This applies to copy, metadata, alt text, commit messages, and easter eggs.

**D3 — CS 252 coursework source stays private.** *(decided by: Vitor · active, extended by D11, narrowed by D17)*
Reasoning: university copyright and academic integrity.
Consequences: no source, no excerpts. Extended and confirmed by D11. Compiled artifacts later carved out by D17.

**D3a — Recorded terminal output: ask the instructor.** *(superseded by D11, then reversed by D17)*

**D4 — Domain is `vrovaris.com`, at Cloudflare Registrar.** *(decided by: Vitor, from a recommendation · active)*
Rejected: `vitor-rovaris.com`, because hyphens are lost every time an address is spoken aloud.
Consequences: matches the GitHub and LinkedIn handles. At-cost renewal, free WHOIS privacy, same vendor as hosting. Fallbacks in order: `vrovaris.dev`, `vitorrovaris.com`, `vitor-rovaris.com`.

**D5 — English only and one light theme for v1; Portuguese and dark mode deferred.** *(decided by: Vitor · active)*
Consequences, not optional: color tokens are named semantically (`--ground-user`, never `--plaster`) so dark mode is a token swap; `data-theme` and the `prefers-color-scheme` listener are wired in Phase 1 with one theme shipped; content collections carry a locale dimension from day one with only `en` populated; no language switcher renders while there is one locale. Dark mode inverts which side of the boundary is dark rather than darkening everything.

**D6 — Photography allowed.** *(decided by: Vitor · active)*
Consequences: one portrait plus up to four environment shots, user track only, never in kernel space. Budget in plan §7.6.

**D7 — Personal content undecided.** *(open)*
Consequences: blocks P2-04's second post and P2-05 only. Five unblocking prompts in plan §12.

**D8 — Budget ceiling is $20/year.** *(decided by: Vitor · active)*
Consequences: the domain (~$11/year) is the only spend. No paid typefaces — Commit Mono is free and rules out Berkeley Mono at ~$75. Everything else runs on free tiers.

**D9 — No graduate-school signaling in v1.** *(decided by: Vitor · active)*
Consequences: no research page, no publications section, no statement of interests. Revisit after launch.

**D10 — `/resume.pdf` serves the general SWE variant.** *(decided by: Vitor · active)*
Consequences: CI compiles `resume_general_swe.tex`. The `curl` plaintext résumé generates from the same source.

---

## 2026-09-11 — Instructor ruling on CS 252

**D11 — The instructor denied publication of the coursework and granted description of it.** *(decided by: the course instructor, in writing · active, narrowed by D17)*
His ruling, in summary: the CS 252 projects contain template code and material belonging to Purdue and must not be posted publicly; the material is reused across semesters and publishing it would promote academic dishonesty; **writing about the projects and describing what was implemented is explicitly permitted**; he recommends publishing CS 307 and CS 407 projects, personal projects, and open-source contributions instead.
Consequences at the time: no source, no excerpts, no compiled artifact, no screenshots, no recorded sessions, no private repo links; prose only. **Points about compiled artifacts and recordings were narrowed by D17.** The prose permission and the source prohibition are unchanged and permanent.

**D12 — The new grammar is a hand-written recursive-descent parser in C, not Flex/Bison.** *(decided by: recommendation, accepted by Vitor · active)*
Reasoning: CS 252 supplies a starter grammar, so a Flex/Bison rewrite risks resembling the template in structure and rule naming. A different parsing technique removes the resemblance argument entirely.
Rejected: Flex/Bison, despite matching the coursework's toolchain, for exactly that reason.
Consequences: derive the grammar from the POSIX shell specification. A hand-rolled parser is also a stronger portfolio signal than a generated one. Compiles to WASM with `emcc` on the same terms.

**D13 — CS 307 and CS 407 projects are publishable when taken.** *(decided by: instructor's recommendation · active, not yet actionable)*
Consequences: add to `/things` when those courses happen. Nothing to do in 2026.

---

## 2026-09-11 — Clean-room protocol

**D14 — The coursework may be shared privately with an agent, under a two-role split.** *(decided by: Vitor, protocol recommended · active)*
Reasoning: sharing privately is not what the instructor prohibited; he prohibited posting. But an agent that has read the coursework cannot then write the new parser, because "written from scratch" would stop being true and the resemblance defense would be gone.
Consequences: **Role A** reads the coursework in a separate non-retained session and outputs exactly two prose artifacts — site and résumé copy, and `SPEC.md`. **Role B** never sees the coursework, builds from `SPEC.md` and the POSIX spec, and confirms in its PR that it never received the coursework. `SPEC.md` is behavior only, bound by the exclusion list in plan §5.2a, reviewed by Vitor before Role B sees it, and committed to the public repo with a dated provenance line.

**D15 — The coursework never enters project files or a memory-enabled session.** *(decided by: recommendation, accepted by Vitor · active)*
Reasoning: project files and assistant memory persist, which defeats the purpose.
Consequences: use a separate non-retained session and verify that setting directly rather than assuming it.

**D16 — What is reusable and what is not.** *(active)*
Reusable: the feature list, knowledge of which edge cases matter, test cases expressed as behavior.
Not reusable in any form: Purdue template files, any provided build system or test harness, the Flex and Bison sources, and code written against the template's interfaces. The template is Purdue's material and cannot be relicensed MIT regardless of who wrote the surrounding lines.

---

## 2026-09-11 — Compiled artifacts, and documentation for portability

**D17 — Compiled binaries of the shell may be published; source may not.** *(decided by: Vitor · active · narrows D11, reverses D3a)*
Reasoning: Vitor's determination that distributing a compiled artifact without source does not hand students a solution and therefore does not fall under the prohibition.
**Caveat on the record:** the instructor did not answer this question specifically. He was asked about a compiled version and replied only that the projects should not be posted and that writing about them is permitted. A binary is also a derivative work of Purdue's template code, so distributing it distributes their material in object form. **Recommended:** a two-line follow-up email confirming this in writing, which costs nothing and converts an interpretation into a record.
Consequences:
- A compiled native binary of the shell may ship as a release artifact. Screenshots and recorded terminal sessions are permitted too, since they reveal strictly less than a binary does. This reverses D3a and narrows D11's point 2.
- **Source, excerpts, and identifiers remain prohibited. Unchanged.**
- Mandatory build hygiene before any binary is published: strip all symbols, no debug info, no DWARF, no Emscripten source maps, `ASSERTIONS=0`, no `--profiling`, run `strings` on the artifact and confirm no coursework file names, function names, or error strings survive. This is a release-blocking check, not a nice-to-have.
- Note a constraint that permission does not remove: Emscripten has no `fork()` and no POSIX signals, so a **full** shell cannot run in a browser regardless of what is allowed. Only the parse-only subset compiles usefully to WASM. A real in-browser shell needs the v86 route in plan §5.5.

**D18 — The grammar interactive uses the clean-room parser, not a compiled coursework build.** *(decided by: recommendation, pending Vitor's confirmation · active as default)*
Reasoning: D17 makes a WASM build of the coursework parser technically possible, which would save roughly 12 hours. It is still the weaker option. A closed-source artifact cannot be linked to a repository, so `/things/grammar` would have nothing to show; the instructor explicitly recommended publishing work Vitor created himself; and the clean-room parser is a new public MIT project rather than a repackaging of coursework.
Rejected: shipping the coursework parser as the interactive's engine.
Consequences: P4-01 stands as planned. The D17 permission gets used where it is uniquely valuable instead — a downloadable native binary of the full shell on `/things/shell`, which works precisely because it runs natively where `fork()` exists.

**D19 — Documentation protocol and provider portability.** *(decided by: Vitor · active)*
Reasoning: work will start in Claude Code and move to another provider later. Nothing important may live in a chat log, a model's memory, or a provider-specific file format.
Consequences:
- `AGENTS.md` at the repo root is the canonical entry point for any assistant on any provider. `CLAUDE.md` is a one-line pointer to it, never a fork of it.
- This file is the decision log, append-only, with the protocol at the top.
- Every session appends its decisions here before ending. Every pull request that changes a decision cites the ID.
- `OPEN_QUESTIONS.md` holds anything an agent could not resolve.
- All four files are plain Markdown with no provider-specific syntax, no tool-call transcripts, and no assumptions about which assistant is reading.

---

## 2026-09-11 — Repository separation and the binary's distribution

**D20 — Modifying the coursework does not change what may be published.** *(decided by: recommendation, accepted implicitly · active)*
Reasoning: Vitor may add features to the shell (a `Ctrl+L` clear-screen shortcut was the example). Additions are his own work, but they sit on top of Purdue's template, so the result is a derivative of it. Rewriting parts of a work does not launder the parts that remain.
Consequences: **source stays private permanently, no matter how much of it Vitor rewrites.** Compiled artifacts remain publishable under D17. Every modification session invalidates the previous release check, so the strip-and-`strings` verification runs again before any rebuilt binary ships. If Vitor ever wants a genuinely publishable shell, the route is a new implementation from scratch, not incremental replacement of the coursework.

**D21 — Three repositories, with the coursework isolated in its own private one.** *(decided by: Vitor's proposal, accepted · active)*
Reasoning: Vitor proposed separating the shell's repository from the site's. It is the right call, for a narrower reason than it might appear. It does not change what may be published — that is settled by D11, D17, and D20. What it buys is **blast radius**: the source cannot reach the public site's git history by way of a mistaken `git add`, a mis-scoped `.gitignore`, or an agent working the site directory.

Layout:

| Repo | Visibility | Contents |
|---|---|---|
| `vrovaris-com` | public | the site. Never contains shell source, and must never have contained it. |
| `shell` | **private, permanently** | CS 252 coursework and Vitor's modifications. Never public, never a submodule or subtree of the site. |
| `grammar` | public, MIT | the clean-room parser (D12, D14). |
| `hermes` | public | already exists. |

Consequences, all binding:
1. **Never a submodule, subtree, or vendored copy.** A submodule pointer in a public repo advertises the private repo's existence and invites requests for access. The two repositories never reference each other in version control.
2. **Git history is permanent.** If the source lands in the public repo even once and is removed in the next commit, it is still there. The rule is that the public repo must never *have had* it, not that it must not currently contain it. If it ever happens, the fix is a fresh repository, not a revert.
3. **The private repo owns the release checks.** CI there builds, strips, and runs the `strings` verification on every push, so the check is enforced continuously rather than remembered at publish time.
4. **Only a verified artifact crosses the boundary**, by hand or by a job that copies the binary alone into the site's `public/downloads/`. No source, no build scripts, no symbol files, no `.map`, no core dumps.
5. **Repository visibility is a foot-gun.** Flipping `shell` public publishes everything instantly and irreversibly. Enable whatever branch and visibility protections the host offers, and never store the coursework in a repo that also hosts something Vitor might want to open up later.

**D22 — Distribution channel for the binary.** *(decided by: recommendation · active)*
Reasoning: visitors will not download and execute an unsigned binary from a personal website, and asking them to is a bad look on a site whose other headline feature is a sandbox. A container image is one copy-pasteable command, runs isolated, distributes the binary without source, and reads as competence rather than as a request for trust.
Consequences: publish a public container image (a package can be public even when its source repository is private) as the primary channel, with a raw stripped binary and a published SHA-256 as the secondary. Target Linux `x86_64` first and `arm64` if it builds clean; skip macOS unless it compiles without modification, since the shell relies on Linux-flavoured POSIX behaviour. The `/things/shell` page shows the `docker run` line, the checksum, and nothing that resembles source.


---

## 2026-09-11 — Registrar

**D23 — `vrovaris.com` is registered at Spaceship, with DNS delegated to Cloudflare.** *(decided by: Vitor · active · supersedes the registrar half of D4; the domain name itself is unchanged)*
Reasoning: a promo code brings year one to $3.80. Renewal is about $10.18, which is within pennies of Cloudflare Registrar's at-cost price, so nothing is lost long-term. WHOIS privacy is free and custom nameservers are supported.
Rejected: Cloudflare Registrar, which would have kept registration and hosting with one vendor and skipped the nameserver step. Not worth the price difference.
Consequences:
1. **Nameservers must be pointed at Cloudflare**, or Pages, Workers, and D1 do not work. Add the domain as a free zone in Cloudflare, take the two assigned nameservers, set them as custom nameservers at Spaceship.
2. **Disable DNSSEC at Spaceship before switching nameservers.** Spaceship enables it by default on its own nameservers; leaving it on through a nameserver change breaks resolution until the DS record clears. Re-enable it from Cloudflare afterwards.
3. **Auto-renew on.** A lapsed portfolio domain is worse than the $10. Note the renewal price so year two is not a surprise.
4. **Two-factor on the registrar account.** It is the root of everything else; hosting can be rebuilt, a lost domain cannot.
5. No defensive registrations. One domain, per D8.


---

## 2026-09-11 — Account ownership

**D24 — Every infrastructure account is registered to a permanent personal email, never a university address.** *(decided by: recommendation · active)*
Reasoning: one Cloudflare account will eventually own the DNS zone, Pages project, Workers, the guestbook D1 database, Turnstile, and analytics. Purdue addresses stop working after graduation, and account recovery on a dead mailbox is painful at exactly the moment the site matters most. The same applies to the registrar account and the GitHub organisation.
Consequences: use the same personal address across Spaceship, Cloudflare, and GitHub. Two-factor on all three. The registrar account is the root of the chain — hosting can be rebuilt from the repo, a lost domain cannot.


---

## 2026-09-11 — Email

**D25 — `vitor@vrovaris.com` via Cloudflare Email Routing, forwarded to Gmail.** *(decided by: Vitor · active · answers Q5)*
Rejected: the lockdown option (null MX plus `v=spf1 -all`), which would have made the domain accept no mail at all.
Consequences:
1. **Email Routing writes its own MX and SPF records.** Do not create them by hand. The null MX and `v=spf1 -all` from the lockdown option are now wrong and must not be added.
2. **Exactly one SPF record per domain.** A second TXT starting `v=spf1` breaks validation with a permanent error. Email Routing's record is the only one.
3. **DMARC is still added manually:** TXT at `_dmarc`, content `v=DMARC1; p=reject;`.
4. Receive-only. Sending as this address from Gmail needs an SMTP relay. If that ever happens, the relay must be added to SPF and DKIM **before** `p=reject` starts rejecting the mail.
5. `profile.json` uses `vitor@vrovaris.com` as the public contact address once routing is verified.


---

## 2026-09-11 — Repository names

**D26 — The four repositories are named as created.** *(decided by: Vitor · active · renames the table in D21, all D21 rules unchanged)*

| Repo | Visibility | Contents | Called what in prose |
|---|---|---|---|
| `personal-website` | public | the site | the site |
| `grammar` | public, MIT | clean-room recursive-descent parser | the grammar |
| `shell-private` | **private, permanently** | CS 252 coursework and Vitor's modifications | the shell |
| `secure-sandbox` | public | the sandbox project | **Hermes** |

*Errata (2026-09-11): the private repository was first recorded here as `private-shell`. Its actual name is `shell-private`.*

Consequences: the project is still called **Hermes** in all site copy, résumé bullets, and writing; `secure-sandbox` is only the repository name. Do not look for a repo named `hermes`. Every rule in D21 carries over unchanged: `shell-private` is never a submodule or subtree of `personal-website`, only a verified binary crosses between them, and `personal-website` must never *have had* coursework source in its history.


---

## 2026-09-11 — Local working layout

**D27 — The four repositories are siblings under a plain parent directory that is not itself a repository.** *(decided by: Vitor · active)*

```
vrovaris.com/            <- plain directory, NOT a git repository
├─ personal-website/     <- repo
├─ grammar/              <- repo
├─ shell-private/        <- repo, private
└─ secure-sandbox/       <- repo
```

Reasoning: siblings under a shared parent keep the coursework out of the site's git history, which is what D21 actually requires. Nesting `shell-private` inside `personal-website` was the only arrangement that had to be avoided.

Consequences, all binding:
1. **Always start an agent inside a specific repository directory, never at `vrovaris.com/`.** An agent opened at the parent can read `shell-private/`, which breaks the clean-room split in D14 — the parser implementer must never see the coursework. This is now the most likely way that rule gets violated, because it happens by opening the wrong folder rather than by any deliberate act.
2. **The same applies to editors and IDE workspaces.** A workspace rooted at the parent indexes the coursework, and any assistant feature in that editor can then read it. Open the repo, not the parent.
3. **Never run `git init` at the parent.** Nothing needs it, and nested repositories behave confusingly enough to invite a mistake.
4. **Keep the parent outside iCloud-synced locations.** macOS syncs Desktop and Documents to iCloud by default on many setups, which would push the private coursework to a cloud account. `~/code/vrovaris.com` or `~/dev/vrovaris.com` is safe; `~/Documents/vrovaris.com` may not be. Check System Settings before deciding.


---

## 2026-09-11 — Keeping the public docs clean

**D28 — No machine-local paths, usernames, or internal hostnames in any committed document.** *(decided by: recommendation · active)*
Reasoning: `AGENTS.md`, `DECISIONS.md`, `portfolio-site-plan.md`, and `OPEN_QUESTIONS.md` are committed to `personal-website`, which is public. A home directory layout, a login, or a university server hostname in those files is a small, permanent, unnecessary disclosure, and git history makes it unremovable.
Consequences:
- Refer to locations by role, not by path: "the parent directory", "the private repo", "the department file server". Never `~/Users/...`, never a `@` login, never a specific internal hostname.
- The same applies to commit messages, pull request descriptions, and anything an agent writes into these files.
- Transfer commands and local setup steps stay out of the repository entirely. They belong in a scratch note on Vitor's machine.
- **No third-party names.** Instructors, peers, classmates, colleagues, and their personal websites are referred to by role, never by name or URL. Paraphrasing a private email in a public repository is discourteous even when the content is neutral, and a design note that reads as criticism of a friend's site is worse. Describe the pattern, not the person.
- Directory naming convention on disk: lowercase, hyphenated, no spaces, for the benefit of `make`, Emscripten, and any tool that mishandles quoting.
