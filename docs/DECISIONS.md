# DECISIONS.md — decision log for vrovaris.com

The permanent record of every decision made on this project, why it was made, and what superseded it. This file outranks chat history, model memory, and anyone's recollection. It is written to be read by **any** assistant or person, on any provider, with no other context.

---

## How to use this file

**Before starting work:** read `AGENTS.md` at the repository root, then this file top to bottom, then `docs/plan.md`. If this file and the plan disagree, **this file wins** and the plan gets patched to match.

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
| D29 | Human in the loop: plan-approve-build-walkthrough, and a hard simplicity rule | active |
| D30 | Practice documents, shared by symlink between providers | active |
| D31 | What never enters the public repository | active |
| D32 | Repo private until launch; docs under `docs/` | active |
| D33 | Symlinks are tracked; machine-local Claude state is not | active |
| D34 | Font budget raised to 150KB; both Newsreader axes kept | active, amends plan §10 and P1-02 |
| D35 | Astro 7 rather than Astro 5; adapter and wrangler follow | active; collections item closed by D46 |
| D36 | State colours revalued per ground, scoped by selector | colours superseded by D41; scoping mechanism active |
| D37 | Commit Mono is MIT; licences ship; masters stay untracked | active, answers Q7 |
| D38 | User-ground trapped and quiet revised for mutual distinguishability | superseded by D40, then D41 |
| D39 | Prose body is --size-l; scale itself unchanged | active, clarifies plan §4.2 |
| D40 | Allowed is green; denied saturated; quiet cool; blue is structure | colours superseded by D41; focus rule active |
| D41 | State colours exist only in machine space | active, supersedes colours in D36/D38/D40 |
| D42 | User ground is warm plaster, not cool white | active, amends plan §4.1 |
| D43 | 68ch means 68 characters, not the CSS ch unit | active, clarifies plan §4.2 and §4.3 |
| D44 | Kernel blocks are ink at every width, not just mobile | active, amends plan §4.3 |
| D45 | Rule sits flush at the kernel edge, not mid-gutter | active, refines D44 |
| D46 | Locale in the directory; getLocalised is the only accessor | active, implements P1-04 |

**Next free ID: D47.**

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


---

## 2026-09-11 — How agents work

**D29 — Agents stop for approval before building and explain their work afterwards, and are held to a hard simplicity requirement.** *(decided by: Vitor · active)*
Reasoning: Vitor reviews every line and intends to understand how the site works rather than accumulate code he cannot maintain. Separately, the characteristic failure of agent-written code is not incorrectness but volume — plausible, well-structured, generously abstracted code that passes review because nothing in it is *wrong* and then has to be carried forever.
Consequences:
1. **Three checkpoints per ticket:** a plan posted before any code and waiting for a reply; a stop at the first surprise instead of a silent workaround; a walkthrough in the PR covering what changed, how it works, why this way, what to read closely, and the strongest honest criticism of the work.
2. **Simplicity is a hard constraint, not a preference.** The rules live in `docs/practices/simplicity.md`. Size is a defect independent of correctness.
3. **Roughly 300 lines of new code per PR is a ceiling.** Approaching it means the ticket should be split.
4. **No refactor mixed with a feature.** No drive-by fixes.
5. **If Vitor cannot follow the code after one explanation, the code gets simplified** — not explained again. That rule points at the code, never at the reader, and is the most reliable over-engineering signal available.
6. Explanations assume a systems programmer who writes C and Python and has not used the web framework. Explain the framework; never explain the fundamentals.

**D30 — Practice documents live in `docs/practices/` and are shared with Claude Code by symlink.** *(decided by: recommendation · active · serves D19)*
Reasoning: skills are a Claude Code convention; the work will move to another provider later. Duplicating the content into a provider-specific folder guarantees the two copies drift.
Consequences:
- Canonical content is `docs/practices/<name>.md`, plain Markdown with a small YAML header that other tools ignore harmlessly.
- `.claude/skills/<name>/SKILL.md` is a **symlink** to the canonical file. `setup-practices.sh` creates them. Editing a skill means editing the canonical file; there is never a second copy.
- `AGENTS.md` lists the documents and when to read each, so an assistant with no skill mechanism still finds them.
- Seven documents at launch: `simplicity`, `code-review`, `frontend`, `backend`, `deployment`, `native-wasm`, `content-writing`. A new one needs a reason beyond wanting somewhere to put a note.


---

## 2026-09-11 — What never enters the public repository

**D31 — Four categories stay out of `personal-website`, and three of them are easy to leak by accident.** *(decided by: recommendation · active · extends D28)*

**1. Secrets, always and everywhere.** `.env`, `.dev.vars`, Wrangler secrets, the guestbook IP salt, bearer tokens, private keys, certificates. If one is ever committed, rotating it is mandatory; deleting the commit is not sufficient, because history is permanent.

**2. Anything coursework-derived.** Source, headers, `.y` and `.l` files, build scripts, test harnesses, tarballs, core dumps. Covered by D3, D11, D21.

**3. Personal contact data in published artifacts.** The résumé LaTeX sources carry a phone number and a personal email. Compiling one of them in public CI publishes both the source and a PDF containing them, permanently and machine-readably, to a site that scrapers visit.
- Maintain a **web variant** of the résumé with the phone number removed and the contact line reduced to `vitor@vrovaris.com` plus the links. That variant is what CI compiles and what `/resume.pdf` serves.
- The full version with the phone number stays local or in a private repo and is what Vitor sends directly to recruiters.
- Only the one variant being built belongs in the repo. The other four stay out.
- `profile.json` already excludes the phone number. This closes the same gap for the PDF.

**4. Identifying strings inside published artifacts.** Two specific ones, both easy to miss because the file is "just output":
- **`strace` traces** for the gate contain absolute paths. A raw trace exposes a home directory and username. The capture harness normalises addresses and pids already; it must also normalise home paths and usernames, and the check belongs in CI next to the `strings` check.
- **Screenshots and terminal recordings** of the shell show a prompt, which typically contains a username and the department server's hostname — exactly what D28 keeps out of committed documents. Scrub the prompt to something neutral before publishing any recording, or record against a local build.

**Also worth avoiding, for hygiene rather than safety:** committing the shell binary itself. Git history is permanent and a binary that gets rebuilt grows the repository forever. Publish it as a release asset or through the container registry (D22) and have the site link to it, rather than checking it in.


---

## 2026-09-11 — Repository visibility and document layout

**D32 — `personal-website` stays private until the site launches, and every agent-facing document except `AGENTS.md` and `CLAUDE.md` moves under `docs/`.** *(decided by: Vitor · active)*
Reasoning: today the repository is entirely planning and no site. A visitor would see a long plan for something that does not exist, which reads as a person who plans more than they build — a fair inference while it is true. The plan also spells out every easter egg and the whole design concept, which is worth encountering rather than reading about. Neither problem is about the AI-tooling files themselves: `AGENTS.md` is an ordinary convention, and the practice documents are engineering standards that would serve a human contributor with no agent involved.
Rejected: deleting or hiding the documents. The decision log in particular is the strongest artifact in the repository and should be public eventually.
Consequences:
1. `personal-website` is **private** during the build and flips public at launch, when the ratio inverts and the log reads as a record of how the site was built rather than a promise about what it might be.
2. Root holds only `README.md`, `AGENTS.md`, and `CLAUDE.md`. Everything else agent-facing lives under `docs/`. `AGENTS.md` and `CLAUDE.md` stay at the root because that is where the tools look for them.
3. `portfolio-site-plan.md` is renamed `docs/plan.md`.
4. `docs/practices/` is unchanged, so the skill symlinks still resolve.
5. **A real `README.md` is written before the repository goes public** — three paragraphs on what the site is and a link to it. The first file a visitor opens should not be a plan.
6. Use `git mv` for the move so history follows the files.


---

## 2026-09-11 — What gets tracked inside `.claude/`

**D33 — The symlinks are committed; machine-local assistant state is not.** *(decided by: Vitor, with a recommendation · active)*
Reasoning: a symlink is a fifteen-byte blob holding a path, so tracking costs nothing, and it is what makes a fresh clone work without a setup step. Leaving them untracked means `setup-practices.sh` has to be re-run on every machine and after every clone — precisely the manual step that gets forgotten when switching machines or providers, which would undercut D19.
Consequences:
- **Tracked:** `CLAUDE.md` and `.claude/skills/<name>/SKILL.md`. These are configuration, not build output.
- **Ignored:** `.claude/settings.local.json` and any other machine-local assistant state.
- Verify with `git ls-files -s`; mode `120000` is a symlink. Mode `100644` means something materialized them as regular files whose contents are a path string, which would silently break both the skills and `CLAUDE.md`.
- `setup-practices.sh` is idempotent and only needs re-running if a link is missing or broken.


---

## 2026-09-11 — The font budget

**D34 — The ≤40KB font budget is raised to ≤150KB; Newsreader ships with both axes intact, subset to Latin-1.** *(2026-09-11 · decided by: Vitor · active · amends plan §10, the P1-02 acceptance criteria, and `practices/frontend.md`)*

Reasoning: the budget and the design contradicted each other and the contradiction only surfaced when the real files were measured. Plan §4.2 requires optical sizing on, and §10 capped all fonts at 40KB. Measured on the delivered files — Newsreader variable at 195.3KB (`wght` 200–800, `opsz` 6–72) and Commit Mono static at 36.1KB — no configuration satisfies both. A second variable axis roughly doubles the `gvar` table, so `opsz` costs about 27KB that no amount of glyph subsetting recovers. Vitor's ruling: the byte cap goes, the optical sizing stays.

Measured options, Newsreader + Commit Mono, both subset to Latin-1:

| Configuration | Total | Verdict |
|---|---|---|
| As delivered, no subsetting | 231.4KB | Rejected: 95KB of it is coverage the site will never render |
| Both axes kept, Latin-1 | **136.1KB** | **Chosen** |
| `opsz` pinned 18, `wght` 400–700 | 30.4KB | Rejected: met the old cap by deleting optical sizing |
| Fully static, `wght` 400 only | 33.7KB | Rejected: headings get synthetic bold, which is a visible tell |

Rejected: pinning `opsz` to stay under 40KB, which is what the old cap forced. Newsreader's `opsz` range is 6–72 and the scale in §4.2 tops out at 4.25rem (68px), where a display optical cut is doing real work on a serif — finer hairlines, tighter spacing. Paying 27KB to keep the concept's primary typeface behaving correctly at display sizes is the right trade once the cap is not treated as sacred. Also rejected: shipping the files unsubsetted, since dropping unused scripts costs one local command and no dependency.

Consequences:
1. **The font line in plan §10 and in `practices/frontend.md` now reads ≤150KB.** The other three numbers on that line — 100KB JS, 60KB CSS, 300KB images — are unchanged.
2. **P1-02's acceptance criterion changes from `fonts ≤40KB total` to `fonts ≤150KB total`.** Every other criterion on that ticket stands, including `size-adjust` for FOUT.
3. **Newsreader keeps `wght` 200–800 and `opsz` 6–72.** `font-optical-sizing: auto` is the default and is left on; §4.2 is now honoured rather than quietly broken.
4. **Subsetting is to Latin-1 plus general punctuation**, which covers Portuguese in full and so does not foreclose D5's deferred locale. The subset is produced once with `fonttools` on a local machine and the outputs are committed; no build-time font dependency enters the repo, and no font is downloaded — the source files were supplied by Vitor.
5. **Provenance is committed next to the fonts**: the source filenames, their version strings, and the exact subsetting command, because the unsubsetted originals do not live in this repository.
6. **The real enforcement moves to the LCP and CLS targets in §10, which are unchanged.** Fonts load with `font-display: swap` behind `size-adjust`-matched fallbacks, so they do not block first paint. If LCP on simulated 4G regresses past 1.5s, the fix is the font stack, not a further budget amendment.
7. **150KB has roughly 14KB of headroom and no room for an italic.** A Newsreader italic is a second variable file of comparable weight; adding one needs a new entry here, not a quiet edit to the number.


---

## 2026-09-11 — Framework major

**D35 — The site is built on Astro 7, not Astro 5.** *(2026-09-11 · decided by: Vitor · active · amends plan §6, P1-01, and `practices/frontend.md`)*

Reasoning: the plan named Astro 5 when 5 was current. A clean install in September 2026 resolves 7.3.2, and the Cloudflare adapter pins the choice — each adapter major supports exactly one Astro major, so the framework version and the adapter version are one decision, not two.

| `@astrojs/cloudflare` | requires |
|---|---|
| 12.6.13 | `astro ^5.7.0` |
| 13.7.0 | `astro ^6.3.0`, `wrangler ^4.83.0` |
| **14.3.1** | **`astro ^7.2.0`, `wrangler ^4.125.0`** |

Rejected: pinning to Astro 5 with adapter 12. It is coherent and available, but it starts a site two majors behind on a runtime that has moved twice since, and the migration debt would come due during Phase 3 or 4 rather than on day one when the repository is empty.

Consequences:
1. **Installed:** `astro 7.3.2`, `@astrojs/cloudflare 14.3.1`, `@astrojs/react 6.0.5`, `react`/`react-dom` 19.3.0. `wrangler 4.131.0` enters as a devDependency to satisfy the adapter's peer requirement — the first dependency in the project the plan did not name.
2. **TypeScript is pinned to `^6`, not `^7`.** `@astrojs/check` accepts `^5 || ^6`; TypeScript 7 installs by default and breaks it. Unpin when `@astrojs/check` supports 7.
3. **P1-04 must verify the content collection API against Astro 7 rather than assume the plan's wording.** Collections changed across these majors. This is the only ticket the version move actually touches, and the risk is deferred there, not resolved here.
4. **The adapter nests the build output at `dist/client/`, not `dist/`.** Cloudflare Pages must be configured with that output directory or it deploys nothing.
5. **The adapter generates a `wrangler.json` declaring a `SESSION` KV binding and an `IMAGES` binding.** Neither exists in the account and neither is used while every route is static. If the first deploy fails on a missing binding, this is why.
6. **`esbuild` and `workerd` need their install scripts approved**, recorded in `pnpm-workspace.yaml` so a fresh clone and CI do not hit the same prompt. `workerd` is Cloudflare's runtime and local preview does not work without it.
7. **Node is pinned to >=22.12.0**, Astro 7's floor, in `package.json` and in CI. Cloudflare Pages needs `NODE_VERSION` set to match.


---

## 2026-09-12 — Contrast and font licensing

**D36 — State colours carry a different value on each ground, scoped by selector rather than renamed.** *(2026-09-12 · decided by: Vitor · active · amends plan §4.1)*

Reasoning: measured against the two grounds, four of §4.1's colours fail the 4.5:1 floor that plan §10 calls non-negotiable. §10 anticipated the wrong pair — it warned about ochre and brick on plaster; brick on plaster passes at 5.74, and the two worst failures are on the ink ground, which §10 does not mention at all. `--state-allowed` on the kernel track is the one that matters most, since the gate uses it constantly.

| | on plaster | on ink |
|---|---|---|
| azulejo `#1F5AA8` | 5.91 | **2.56** |
| ochre `#C9873A` | **2.60** | 5.82 |
| brick `#A8341F` | 5.74 | **2.64** |
| bisque `#DCD3C4` | **1.29** | 11.75 |

Corrected values, same hue, moved only far enough to clear 4.5:1: `--ochre-deep #946229` (4.51) and `--bisque-deep #7D6A4A` (4.52) for the user ground; `--azulejo-light #3F82DC` (4.51) and `--brick-light #DC573F` (4.55) for the machine ground.

Rejected: distinct token names per ground (`--state-allowed-on-machine`). Explicit, but it pushes the decision into every component and doubles what the two-track layout in P1-03 has to reason about.

Consequences: `:root` holds the user-ground values and a single `.ground-machine` selector revalues the same four names, so a component writes `--state-allowed` and is correct on either side of the boundary. The corrected hexes are palette entries in `tokens.css`, so "zero raw hex outside the palette block" still holds. Dark mode (D5) stays a swap of which selector carries which set.

**D37 — Commit Mono is MIT, not OFL; both licences ship with the fonts and the unsubsetted masters stay out of the repository.** *(2026-09-12 · decided by: recommendation, taken as the default · active · answers Q7, closes the open question in plan §4.2)*

Reasoning: plan §4.2 carried "confirm current license at download" against Commit Mono and nobody had. Its repository licence file is MIT, copyright 2023 Eigil Nikolajsen — not OFL, which is what a font is usually assumed to be. Newsreader is OFL 1.1, copyright 2020 The Newsreader Project Authors, read from the font's own name table rather than assumed. Both licences require their notice to travel with the files, and neither was present.

Consequences:
1. `public/fonts/OFL.txt` and `public/fonts/LICENSE-commit-mono.txt` ship alongside the fonts. Both were fetched from their authoritative sources, not reproduced from memory.
2. `public/fonts/PROVENANCE.md` records source, version, licence, and the exact subsetting commands, per D34 consequence 5.
3. **The unsubsetted originals live in `fonts-src/`, which is gitignored.** Subsetting overwrites what is in `public/fonts/`, so without this the only copies of the masters would have been destroyed the first time the subset ran. They are Vitor's files and he holds the masters.
4. `/colophon` (P2-06) credits both faces and links these files.


---

## 2026-09-12 — Revising the user-ground colours

**D38 — The user-ground values for `--state-trapped` and `--state-quiet` are replaced; contrast alone was the wrong target.** *(2026-09-12 · decided by: Vitor, from review · active · supersedes the user-ground half of D36; D36's machine-ground values and its scoping mechanism stand)*

Reasoning: D36 corrected four colours by moving each the minimum distance needed to clear 4.5:1 while holding its hue. On the ink ground that worked. On the plaster ground it produced `#946229` and `#7D6A4A` — two mid-browns that clear the contrast floor against the *background* and fail against *each other*. Vitor called them on sight; measured, they sit at ΔE 22.3, under the ~25 where two colours stop being tellable apart. A state colour that cannot be distinguished from another state colour does not do its job, and no contrast ratio detects that, because the ratio only ever looks at one pair.

| | old | new | contrast | ΔE to the other |
|---|---|---|---|---|
| `--state-trapped` | `#946229` | **`#8A5A15`** | 4.51 → **5.13** | 22.3 → **42.7** |
| `--state-quiet` | `#7D6A4A` | **`#6B6560`** | 4.52 → **4.99** | " | " |

The separation comes from chroma, not lightness: trapped stays saturated ochre (chroma 47), quiet drops to near-neutral warm grey (chroma 4). One is orange, one is grey, and no amount of squinting merges them. Both also gained contrast, which answers the second half of the report — at 4.51 the old pair sat exactly on the floor, which is a pass and still hard to read.

Rejected: a search that maximised perceptual distance, which drove trapped to `#4A351C` at 10:1 — excellent numbers, no longer recognisably ochre. Optimising a colour system on one metric is what produced the defect in the first place.

Consequences:
1. The palette entry `--bisque-deep` is renamed **`--warm-grey`**, because `#6B6560` is no longer bisque in any meaningful sense and a name that lies is worse than a new name. `--bisque` itself is untouched and still carries `--state-quiet` on the machine ground, where it measures 11.75.
2. **Contrast is a floor, not the specification.** Any future palette change checks each colour against its ground *and* against the other states on that ground. ΔE ≥ 25 is the working threshold.
3. D36's mechanism — `:root` for user ground, `.ground-machine` revaluing the same names — is unchanged and is what made this a two-value edit.

**D39 — Prose body is `--size-l` (1.3125rem), not `--size-m`.** *(2026-09-12 · decided by: recommendation after Vitor reported the body text reading small · active · clarifies plan §4.2, does not change the scale)*
Reasoning: §4.2's scale is sound but says nothing about which step body prose takes, and 1rem was the obvious-looking default. Newsreader's x-height is 0.4260em where a typical text face sits near 0.50, so at 16px it renders a 6.8px x-height against Georgia's 7.7px — a fifth smaller than the same nominal size in almost any other face. `--size-l` gives 8.95px, equivalent to a 17px sans, which is ordinary editorial prose sizing at a 68ch measure.
Rejected: adding 1.125rem to the scale, which matches Georgia-at-16px exactly but amends §4.2 to solve something an existing step already solves.
Consequences: the seven scale values in §4.2 are unchanged. Machine voice set beside body prose uses `--size-m`, not `--size-s` — Commit Mono's x-height is 0.540, so 16px of it optically matches 21px of Newsreader. Sizing the two families by their nominal size rather than their x-height is what makes a serif-plus-mono pairing look wrong.

**D40 — Allowed becomes green, denied gains saturation, quiet goes cool; blue is structure only.** *(2026-09-12 · decided by: Vitor, from review · active · supersedes the colour values in D36 and D38; plan §4.1's palette block is amended)*
Reasoning: three separate findings from looking at the rendered styleguide. `--state-allowed` was azulejo, and blue state on a deep slate-navy ground reads as blue-on-blue no matter what the ratio says — 4.51:1 was a passing number for an unusable pairing. Moving allowed to green also resolves a tension already in §4.1, which says blue and ink carry *structure*: blue was doing double duty as structure and as a state, and now does neither job ambiguously. Separately, brick was not saturated enough to read as an alarm, and the revised quiet from D38 still sat too close to ochre — both are warm mid-tones, and dropping chroma alone was not enough.

| token | ground | was | now | contrast |
|---|---|---|---|---|
| `--state-allowed` | plaster | `#1F5AA8` | `#17703C` | 5.91 → 5.33 |
| `--state-allowed` | ink | `#3F82DC` | `#4CC17E` | 2.56 → **7.67** |
| `--state-denied` | plaster | `#A8341F` | `#B82508` | 5.74 → 5.51 |
| `--state-denied` | ink | `#DC573F` | `#F2603F` | 4.55 → 5.41 |
| `--state-quiet` | plaster | `#6B6560` | `#566070` | 4.99 → 5.52 |

Separation could not come from brightening ochre — `#A0690A` reads better but falls to 4.03:1, under the floor. It came from moving quiet to a cool slate, opposing ochre in hue rather than only in chroma. Worst pair on either ground is now ΔE 42.9 (plaster) and 36.2 (ink), against 22.3 when the defect was reported.

Rejected: keeping allowed blue and deepening the ground instead, which would have broken §4.1's ink.

Consequences:
1. New palette entries `--verdigris #17703C` and `--verdigris-light #4CC17E`; `--warm-grey` from D38 is renamed `--slate` and revalued; `--brick` is revalued in the palette block itself rather than gaining a variant.
2. **`--azulejo` no longer backs any `--state-*` token.** It now carries `--focus`, a new semantic name, so the focus ring stays blue and structural on both grounds. Blue is structure, exactly as §4.1 says.
3. Plan §4.1's palette block no longer matches `tokens.css` and is amended by this entry. The rule in §4.1 that "ochre and brick appear only where something is genuinely trapped or denied" is unchanged.

**D41 — State colours exist only in machine space.** *(2026-09-13 · decided by: Vitor · active · supersedes the colour values in D36, D38 and D40; amends plan §4.1)*
Reasoning: three attempts to make four state colours work on the plaster ground all failed on Vitor's eye, and the third attempt showed why it was never going to work. Requiring 4.5:1 against a near-white ground *is* a lightness constraint, so four colours tuned to clear it all land at the same lightness — measured, they sat at L\* 40 to 42, and small text is read by lightness before hue. The usable band on plaster is L\* 9 to 46, 37 points for four colours; on ink it is 54 to 100, 46 points, and a dark ground carries saturation far better. Vitor had already said the machine-ground set looked right.

This also resolves a concept problem rather than a rendering one. §4.1 says ochre and brick appear only where something is trapped or denied — those are kernel states. The gate is a kernel-space interactive. Putting machine state exclusively in machine space sharpens D1's boundary instead of fighting it.

Final values, all on the ink ground, spread deliberately across the lightness band rather than bunched at the contrast floor:

| token | value | contrast | L\* |
|---|---|---|---|
| `--state-denied` | `#F2603F` | 5.41 | 59.5 |
| `--state-trapped` | `#D89D58` | 7.37 | 69.1 |
| `--state-allowed` | `#66D696` | 9.65 | 77.9 |
| `--state-quiet` | `#E4DCCF` | 12.81 | 88.1 |

Worst pair: ΔE 41.0, 8.9 L\* apart. The previous machine-ground set would have shipped trapped and denied 2.2 L\* apart — orange against red at identical value, the worst case for red-green colour blindness — which contrast ratios and ΔE both passed.

Rejected: spreading lightness on the plaster ground (option A), which reached a 15-point gap but turned ochre into a dark brown and left green and red at the same value.

Consequences:
1. **`--state-*` is defined only inside `.ground-machine`.** Referencing one on the user ground resolves to nothing and breaks visibly. That is deliberate — it caught a wrong reference in the styleguide immediately.
2. `.ground-machine` now sets ground, foreground, focus and the four states together: one class means "you are in machine space".
3. The user ground keeps `--fg-user`, `--fg-muted` (`#566070`, 5.52:1) and `--focus`. Prose does not need state colour.
4. **Contrast is a floor; lightness spread and ΔE are the specification.** Every future palette change checks all three. Two defects reached Vitor because only the first was checked.
5. Per-ground variants remain only for `--focus`, so blue stays structural on both grounds (D40).

**D42 — The user ground is warm plaster `#EBE5D8`, not the cool white `#EDEFF2`.** *(2026-09-13 · decided by: Vitor · active · amends plan §4.1)*
Reasoning: Vitor found the original ground too intense to read against. It was a cool white — measured, L\* 94.4 with a b\* of −1.7, meaning slightly blue. The replacement is L\* 91.1 with b\* +7.0: three points less bright and decisively warm. It is also closer to what the name always claimed, since lime plaster is warm and the cool white was the odd part.
Rejected: `#F3EFE7` (warmer but no less bright, so it would not have fixed the complaint) and `#E7E0D2` (deeper, but `--fg-muted` falls to 4.84:1, close enough to the floor to leave no margin).
Consequences: every user-ground foreground re-verified — `--fg-user` 13.89:1, `--fg-muted` 5.07:1, `--focus` 5.42:1, all passing. No state colour is affected, since D41 confined those to the ink ground. Dark mode (D5) inverts the grounds, so the warm plaster becomes the machine ground there and its pairings get checked again at that point.

**D43 — `68ch` is not a 68-character measure; the prose track is `27.75em`.** *(2026-09-13 · decided by: recommendation, taken as the default · active · clarifies plan §4.2 and §4.3)*
Reasoning: §4.2 and §4.3 both specify "max 68ch" for prose, meaning a 68-character line. The CSS `ch` unit is not that — it is the advance width of the digit "0", which in Newsreader is 0.5500em while the frequency-weighted average letter is 0.4081em. Taken literally, `68ch` sets a 785px line carrying about **92 characters**, a third past the measure the plan is asking for and outside the 45-75 range the number was chosen from.
Consequences: `--measure-prose: 27.75em` — 68 × 0.4081em — giving 583px at the 21px body size and a genuine 68-character line. Being in `em` rather than `px`, it scales if the prose size changes. The same trap applies to the 18ch kernel track, already avoided in P1-03 for a different reason: `ch` on the grid container resolves against the prose font, not the mono one, so `--measure-kernel` is written as `calc(18 * 0.6 * var(--size-m))` using Commit Mono's measured 0.600em advance.
Note for anyone reading §4.2 later: "68ch" in the plan means 68 characters, not the CSS unit. The plan is patched to say so.

**D44 — Kernel blocks carry the ink ground on desktop too, not only in the mobile stack.** *(2026-09-13 · decided by: Vitor, from review · active · amends plan §4.3)*
Reasoning: §4.3 says kernel blocks "become" ink bands below 960px, which reads as *not* ink above it, and that is how P1-03 was first built — the desktop kernel track was mono type on plaster, separated by the 1px rule. Rendered, the concept only survived on phones: Vitor reported the dark ground disappearing on a normal Mac screen. D1 calls the two-track layout load-bearing, and the boundary between user space and machine space is the site's identity; having it visible only at the narrowest viewport inverts which screen the design works on.
Rejected: filling the entire kernel track with ink as a continuous column. It states the territory idea most strongly and would have made the whole track machine ground, but it replaces §4.3's "1px rule is the most recognizable feature" with a dark column, and on a wide screen the centred document places that column some 300px in from the screen edge rather than anchored to it — a floating stripe, not a territory. Also rejected: anchoring that column to the viewport edge, which fixes the floating but abandons the centred layout.
Consequences:
1. `.kernel` carries `--ground-machine` at every width. Only its size changes across the breakpoint: a block in the narrow track above 960px, a full-bleed band below it.
2. **`.kernel` shares the machine-ground token definition with `.ground-machine` in `tokens.css` rather than copying it**, so D41's state colours resolve inside a kernel block. One definition of what machine ground means; the layout keeps placement and type.
3. The 1px rule survives unchanged, so §4.3's headline feature is intact and now separates two visible grounds rather than two typefaces.
4. The mobile `border-block` is removed as dead weight — it drew ink on ink. The band's own edge is the horizontal rule §4.3 asks for.
5. Text in a kernel block is `--fg-machine` on `--ground-machine`, 13.89:1. A focus ring inside one is `--azulejo-light`, 4.51:1, above the 3:1 floor for non-text.

**D45 — The rule sits at the kernel track's edge, flush against the ink blocks, not mid-gutter.** *(2026-09-13 · decided by: Vitor, from review · active · refines D44)*
Reasoning: once kernel blocks became ink (D44), the 1px rule sat 16px away from each block's right edge, so every annotated row showed two parallel vertical divisions doing the same job. Vitor read it as odd and asked whether the rule was still needed at all. It is, but not where it was.
The rule earns its place in the gaps, not beside the blocks. Where a kernel block exists, the block edge already divides the tracks. Where none exists — a page with no kernel content, or a long run of prose between annotations — the rule is the only thing marking that there are two territories, and D1 makes that boundary the site's identity. Deleting it would leave "prose with dark blocks to the left of it", which is a common pattern and not this one.
Rejected: removing the rule and letting the blocks imply the boundary by sharing a right edge. Cheaper, and wrong on exactly the pages with sparse kernel content. Also rejected: dropping the blocks and returning to type-only kernel space, which is what D44 was raised to fix.
Consequences: `background-position` moves from `--pad + --measure-kernel + --gutter / 2` to `--pad + --measure-kernel`. Blocks now press flush against the rule and read as one boundary; the full 32px gutter falls between the rule and the prose. The rule stays continuous and full-height, so §4.3's headline feature is unchanged in behaviour, only in placement.

**D46 — Locale lives in the directory, not in the schema, and `getLocalised()` is the only sanctioned way to list entries.** *(2026-09-13 · decided by: recommendation, approved by Vitor · active · implements P1-04, closes the collections half of D35)*
Reasoning: P1-04's acceptance criteria are that adding a `pt/` file later needs no schema change and that no dead `/pt/` routes ship. A `locale` field in frontmatter satisfies neither cleanly — it is part of the schema by definition, every author has to set it, and it can disagree with the directory the file sits in. Folding the locale into the entry id removes the possibility: `src/content/work/en/x.mdx` loads as `en/x`, and the schema never mentions locale at all.
Verified rather than assumed, with a temporary probe that was deleted afterwards: with both `en/probe` and `pt/probe` present, `getCollection('work')` returned both and `getLocalised('work')` returned only the `en` entry. A missing required field failed the build and named the field.
Consequences:
1. `glob({ pattern: '**/*.mdx', base: './src/content/<name>' })` for all four collections, so the locale directory becomes the id prefix.
2. **Routes list entries through `getLocalised()` in `src/content.ts`, never `getCollection` directly.** That helper is what keeps a stray `pt/` file from rendering; calling `getCollection` in a route is the way this rule gets broken.
3. Schema fields come from plan §7 and nothing more — no `draft` or `order` until a Phase 2 page needs one.
4. `things.repo` is optional and must stay absent for the shell entry: no repository link, ever (D3, D26).
5. **Astro 7 API specifics**, none of which match the plan's wording: the config is `src/content.config.ts`, loaders come from `astro/loaders`, `z` from `astro:content` is deprecated in favour of `astro/zod`, and `z.string().url()` is deprecated in favour of `z.url()`. Using the plan's assumed API produces eight deprecation warnings.
6. Empty collections emit one `glob-loader` warning each until Phase 2 adds content. Warnings, not errors; they disappear as entries land.
