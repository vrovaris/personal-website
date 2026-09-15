# vrovaris.com — Build Plan (v2)

A delegable plan for a personal site for **Vitor Augusto Hertel Rovaris**. Written so each phase can be handed to a separate agent or session with no extra context.

- **Status:** v2.2. Phase 0 resolved; instructor ruling recorded (D11–D13); compiled artifacts permitted (D17); documentation made provider-portable (D19). One item still open (§12).
- **Read `AGENTS.md` and `docs/DECISIONS.md` before this file.** The decision log outranks this plan; where they disagree, patch the plan.
- **Companion files:** `AGENTS.md` at the repo root (how to work here, any provider), `docs/DECISIONS.md` (append-only decision log), `docs/OPEN_QUESTIONS.md` (unresolved), `docs/practices/*.md` (how to do the work). This file lives at `docs/plan.md`.
- **Sources:** the five résumé variants and LaTeX sources. Two peer portfolio sites were read directly as references; they are described by pattern rather than named, per D28.

**Changes from v1:** concept A confirmed; the citizenship framing is removed entirely (D2); the shell interactive is rebuilt clean-room because the coursework cannot be published (D3, D11); Phases 3 and 4 swap order so the public repo leads; i18n and dark mode are deferred but pre-wired (D5); domain, budget, and résumé variant fixed (D4, D8, D10).

**Changes in v2.1:** the CS 252 instructor confirmed in writing that the coursework cannot be posted, and that writing about it is permitted. Screenshots and recorded sessions are therefore out as well (D11). The new grammar becomes a hand-written recursive-descent parser rather than Flex/Bison, to remove any resemblance to the course template (D12).

---

## 0. How to use this document

1. Read §1–§5 before touching code. They define what the site is and why it looks the way it does.
2. §6–§8 define architecture and content model.
3. §9 is the ticket backlog. Each ticket is self-contained.
4. §10 is the quality bar. A ticket is not done until it clears §10.
5. §11 is the risk register. §12 is what remains unanswered.

### Guardrails for any agent working from this plan

- **Never mention citizenship, passports, visas, or immigration status.** Not in copy, not in metadata, not in an easter egg, not in a joke. This is a hard constraint (D2). Brazilian origin, Portuguese as a first language, and living in Indiana are fine; legal status is not.
- **Never publish CS 252 coursework source**, excerpts, identifiers, file names, or error strings (D3, D11). This is permanent. **Compiled binaries, screenshots, and recorded sessions are permitted** under D17, subject to the release checks in §7.3. Private repo links stay off.
- **Append every decision to `docs/DECISIONS.md` before ending a session** (D19). A session that closed an option and recorded nothing has lost work. Cite decision IDs in pull requests.
- **Do not invent facts.** Every number, date, title, and claim comes from `src/data/profile.json` (§8). If a fact is missing, stop and append the question to `docs/OPEN_QUESTIONS.md`.
- **Do not add features that aren't in this plan.** Propose them in `docs/OPEN_QUESTIONS.md`.
- **No component library, no Tailwind, no template.** Plain CSS with custom properties.
- **No paid dependencies.** Budget is $20/year total and the domain consumes it (D8).
- Accessibility floor in §10 is non-negotiable, including on the interactive pieces.
- No AI chatbot (§5.4).

---

## 1. Positioning

### Who this is for, in priority order

1. **Vitor.** A place to put things he cares about. If it becomes a chore, it dies.
2. **Peers and internet strangers** who might link it, hire him later, or start a conversation.
3. **Recruiters and advisors** who land here after the résumé. They need the facts findable in 15 seconds without the site pretending to be a résumé.

The brief is *less professional, more personal*. The work stays. The framing changes from "here are my accomplishments" to "here is what I find interesting and here is what I built because of it."

### The differentiation problem (read before designing anything)

A peer at the same university has a personal site listing **the same employer (BTG Pactual) and the same student organization (BRASA)**. Anyone who knows one of them will see the other. A site that reads as a variation on it is worse than no site.

| The peer site does | This site must not |
|---|---|
| Single page, expanding accordion timeline | Use an accordion timeline as its primary structure |
| Lowercase conversational hero (`hey, i'm enzo :)`) | Open with a lowercase first-person greeting |
| Company logo row as the visual rhythm | Lean on employer logos for identity |
| Warm off-white, minimal, type-only | Reuse a near-white minimal type-only palette |

A second peer site is multi-page with an AI chat companion, a notes section, and a typing easter egg. Avoid the AI-chat-about-me pattern for the reasons in §5.4.

**What Vitor has that neither has:** he works on isolation boundaries. Sandboxes, syscall filters, namespaces, grammars, constraint systems, code-compliance checking. Nobody else in his cohort can claim that world, and it is the basis of the concept below.

---

## 2. Concept — user space / kernel space

One idea runs through everything Vitor builds: **a boundary, and the rules for what may cross it.**

- Hermes: which syscalls a process may make, what it can see, how much memory it may take.
- The shell: what a line of text is allowed to mean, enforced by a grammar.
- CP-SAT scheduling: which assignments are permissible.
- AutoIC: whether a building is allowed to be what the model says it is.

The site makes that its structure. **Two registers, visibly separated:**

- **User space** is Vitor. Serif prose, warm ground, first person, full sentences, opinions, mistakes, Portuguese when it wants to be.
- **Kernel space** is the machine. Monospace, ink ground, terse and factual — dates, syscalls, traces, exit codes, build metadata.

The dividing line is a real element on the page, not a metaphor in the copy. Things visibly cross it when the visitor causes them to. That single crossing animation is the only orchestrated motion on the site (§4.4).

The grid motif for the interactive pieces — a panel of cells, some permitted, some denied — is drawn from **Athos Bulcão's azulejo panels in Brasília**: modular blue-and-white tiles, combinatorially arranged, one unit repeated into a pattern that reads as a single object. A seccomp allowlist rendered as a Bulcão panel is this site's identity in one image. Brazilian modernism and a kernel permission table are, structurally, the same drawing.

**The personal half of the boundary** is distance and language: a person who grew up speaking one language and now works in another, 5,000 miles from where he started, who spends his time deciding what to let through. Not legal status (D2). What fills this in concretely depends on §12 Q1.

---

## 3. Information architecture

```
/                     Home. The gate. Hero interactive + who he is in ~120 words.
/work                 Roles and what actually happened in them. Long form, first person.
/work/[slug]          BTG Energy Desk, BTG AI pipeline, BRASA, AutoIC, CS 180 TA.
/things               Built things.
/things/[slug]        One thing, with its live interactive if it has one.
/writing              Essays and notes.
/writing/[slug]
/now                  What he's doing this month. nownownow.com convention.
/colophon             How the site is built, with real measured numbers.
/guestbook            Visitor messages.
/resume.pdf           Built in CI from resume/resume_web.tex (D49).
/404                  ENOENT.
```

Navigation is four items: `things · work · writing · now`. Guestbook and colophon live in the footer.

Routes are locale-prefixed internally from day one (`en` is the default and renders unprefixed). No `/pt/` routes exist and no switcher renders until Portuguese content exists (D5).

---

## 4. Design system

### 4.1 Color

Semantic names, so the later dark mode is a swap and not a refactor (D5). Raw values live in one place and are never referenced directly by components.

```css
:root {
  /* palette — referenced only in this block */
  --plaster:  #EBE5D8;  /* warm plaster, not paper white (D42) */
  --ink:      #101A2B;  /* deep slate-navy */
  --azulejo:  #1F5AA8;  /* Bulcão blue — structure only, never a state (D40) */
  --azulejo-light: #3F82DC;  /* the same blue, cut for the ink ground */
  --slate:    #566070;  /* secondary prose text */

  /* state palette — tuned for the ink ground, the only place it appears (D41) */
  --brick:     #F2603F;
  --ochre:     #D89D58;
  --verdigris: #66D696;
  --bisque:    #E4DCCF;

  /* semantic, user space */
  --ground-user:    var(--plaster);
  --ground-machine: var(--ink);
  --fg-user:        var(--ink);
  --fg-machine:     var(--plaster);
  --fg-muted:       var(--slate);
  --boundary:       var(--ink);
  --focus:          var(--azulejo);
}

/* semantic, machine space — the four states exist here and nowhere else */
.ground-machine {
  --focus:          var(--azulejo-light);
  --state-allowed:  var(--verdigris);
  --state-trapped:  var(--ochre);
  --state-denied:   var(--brick);
  --state-quiet:    var(--bisque);
}
```

State colour is machine-space colour (D41). A light ground cannot carry four
saturated text colours that are both legible and tellable apart: 4.5:1 against
near-white is itself a lightness constraint, so all four land on the same value.
Prose keeps `--fg-user`, `--fg-muted` and `--focus`.

A state colour must clear 4.5:1 against its ground, stay roughly 25 dE from the
other states, **and** sit at least 8 L\* from them. Contrast alone passed two
palettes whose colours were indistinguishable from each other; dE alone passed
one whose colours shared a lightness. `src/styles/tokens.css` is the
implementation.

**How dark mode will work later.** The concept already spends both a light and a dark ground, so a dark theme cannot simply darken everything. It **inverts which side is dark**: `--ground-user` becomes ink, `--ground-machine` becomes plaster. The relationship survives, the identity survives, and the change is six lines under `[data-theme="dark"]`. Wire the `data-theme` attribute and the `prefers-color-scheme` listener in Phase 1; ship one theme.

Rules: blue and ink carry structure; ochre and brick appear only where something is genuinely trapped or denied. No shadows — depth comes from ground color. Radius `0` on anything representing machine state, `2px` on prose-side controls. Two values used with meaning, not one used everywhere.

### 4.2 Type

Two families. The split *is* the concept, so it must be strict.

| Role | Family | Notes |
|---|---|---|
| Prose, headings, Vitor's voice | **Newsreader** (OFL, Google Fonts, variable) | Optical sizing on. 1.55 line-height. Max 68 characters — *not* the CSS `ch` unit, see D43. |
| Machine output, labels, dates, nav, tables, terminals | **Commit Mono** (MIT, confirmed — D37) | Never used for prose paragraphs. |

Scale (rem, 16px base): `0.8125 / 0.9375 / 1 / 1.3125 / 1.75 / 2.625 / 4.25`.

Prohibited, because they are the tells of a generated page:
- All-caps tracked-out eyebrow labels above headings.
- One word of a headline in a different color or weight.
- `→` appended to link text.
- Meta strings joined by middle dots.
- `01 / 02 / 03` markers on anything that is not an actual sequence.

### 4.3 Layout

Asymmetric two-track grid. Narrow left track is kernel space, wide right track is user space. The rule between them is a 1px `--boundary` line running the full height of the document and is the site's most recognizable feature.

```
desktop ≥960px
┌──────────────┬─┬────────────────────────────────────────┐
│ kernel track │ │ user track                             │
│ (mono, 18 ch)│ │ (serif prose, max 68 chars)            │
│              │ │                                        │
│ Aug 2026     │ │ I spent the summer chasing a fifty      │
│ →  present   │ │ million dollar difference between two   │
│ purdue/autoic│ │ reports that were supposed to agree.    │
│              │ │                                        │
│ 371 notes/mo │ │ ...                                    │
│ $140M flow   │ │                                        │
└──────────────┴─┴────────────────────────────────────────┘
                ↑ the boundary

mobile <960px
Tracks stack. Kernel blocks widen into full-width ink bands
between prose. The boundary becomes horizontal rules.

Kernel blocks sit on the ink ground at every width (D44) — above
960px as blocks in the narrow track, below it as full-bleed bands.
The 1px rule is unchanged and now divides two visible grounds.
```

Text is left-aligned throughout. Nothing is centered except the 404.

### 4.4 Motion

One orchestrated moment, user-triggered: when the visitor causes something to cross the boundary (toggles a syscall, parses a command, posts to the guestbook), a single element animates across the rule, 240ms, `cubic-bezier(.2,0,0,1)`.

Everything else: no scroll reveals, no fade-and-slide-up on sections, no hover lift. Hover is a color change. `prefers-reduced-motion: reduce` swaps the crossing for an instant state change.

### 4.5 Voice

- English is conversational and specific. When Portuguese arrives later it is a rewrite, not a translation.
- Numbers stay exact and sourced. "$50M discrepancy" beats "large discrepancy" and it's true.
- Strings to avoid: `passionate`, `driven`, `detail-oriented`, `results-oriented`, `team player`, `hit the ground running`. Guidance for the writer, not enforced by lint (D48).
- Failure states speak in the interface's voice. The 404 is `ENOENT` with a real errno table, not "Oops!".

---

## 5. The interactive pieces

Three planned, one stretch. Each is a lazy-loaded island that degrades to something readable with JS off.

### 5.1 The Gate — a seccomp policy you can actually get wrong

*Home hero and `/things/hermes`. Hermes is public (D3), so this is the piece that leads.*

A Bulcão-style panel of syscall cells. The visitor toggles which syscalls are permitted. Below, the seven attack scenarios from Hermes' existing test suite run against that policy and report one of three verdicts:

- **contained** — the exploit hit a denied syscall and took `SIGSYS`
- **escaped** — the policy let it through
- **broken** — the policy is so tight that legitimate programs also die

The tension between *escaped* and *broken* is the whole lesson, and no other portfolio site teaches it.

**What is real and what is not.** State both in the UI:

- **Real: the traces.** In the `secure-sandbox` repo, add a harness that runs the 7 attack scenarios plus 3 benign programs under `strace -f -qq -ttt` and emits JSON: `{scenario, argv, seq:[{t, syscall, args_summary, ret}]}`. Ship those files with the site. They are recordings of real executions on a real kernel, and the repo they come from is public and linkable.
- **Real: the BPF program.** *Spike:* compile `libseccomp` to WASM with Emscripten and call `seccomp_export_bpf()` into MEMFS to produce genuine cBPF from the visitor's allowlist, disassembled on screen. The export path is userspace plus a write to an fd, which MEMFS handles. *Fallback:* a TS emitter mirroring libseccomp's instruction ordering, labeled as a reimplementation.
- **Not real: the execution.** Traces are replayed against the policy in the browser; nothing runs. One line of copy says so. Do not imply otherwise.

Clicking a cell triggers the crossing animation and replays from the point of divergence, not from the top.

### 5.2 The Grammar — a clean-room parser, in the browser

*`/things/grammar`, and referenced from the shell write-up.*

Type a shell line. Watch it become a program: tokens highlight live, the parse tree renders as SVG, and a process plan shows the fork/pipe/dup2/execve/waitpid sequence with the fd wiring drawn.

**Two constraints shaped this.**

First, **the coursework cannot ship** (D3). Publishing a WASM build of the university shell is publishing it. So this interactive is built on a **new parser written from scratch for the web**: a few hundred lines of Flex/Bison covering pipelines, redirects, background execution, quoting, and command substitution, in its own public MIT-licensed repo. It shares no code with the coursework. This is a feature rather than a workaround — it becomes a small project of its own, and it can be scoped exactly to what renders well.

Second, **Emscripten has no `fork()` and no POSIX signals**, so no shell can actually execute in the browser. Parsing, though, is pure computation and compiles cleanly. So the parse is genuinely his C code running in WASM, and the process plan is a model generated in TS from the AST. One line of UI copy says which is which. That honesty is more interesting than a fake terminal, because the reader sees exactly where the parser's knowledge ends and the kernel's begins.

The CS 252 shell still gets a `/things` page. Under D17 it carries **a runnable compiled build, screenshots, and a recorded session, but no source and no repository link**. Vitor may keep adding features to it — a `Ctrl+L` shortcut was the example — and that changes nothing about publishability: additions sit on top of Purdue's template, so the result stays a derivative and the source stays private (D20). Each rebuild re-runs the release checks. The page's centre of gravity is still the writing, because that is the part the instructor explicitly approved and because a system explained well reads better here than a demo would.

A constraint that D17 does not remove: Emscripten has no `fork()` and no POSIX signals, so **no full shell runs in a browser regardless of permission**. The binary is therefore a native download, which is where the permission is actually worth something — `fork()` exists there. A real in-browser shell needs the v86 route in §5.5.

**Clean-room requirement (D12).** CS 252 hands out a starter grammar, so the new parser must not resemble it in structure, rule naming, or AST shape. It is therefore a **hand-written recursive-descent parser in C**, not Flex/Bison: structurally unrelated to the template, and a stronger signal than a generated parser. Derive the grammar from the POSIX shell specification. Do not open the coursework while building it.

**Why not just compile the coursework parser instead (D18).** D17 makes that technically possible and it would save roughly 12 hours. It is still the weaker option: a closed-source artifact cannot be linked to a repository, so this page would have nothing for a reader to look at; the instructor specifically recommended publishing work Vitor made himself; and the clean-room parser is a new public MIT project rather than a repackaging of coursework. The plan therefore keeps P4-01. Vitor can overrule this — see §12 Q2.

### 5.2a Clean-room protocol — how the private coursework is used without being republished

Vitor will share the CS 252 codebase privately with an agent so that prior work can inform the site. That is workable, and it is not what the instructor prohibited — he prohibited *posting* the projects, not looking at his own code. But it only stays workable under a two-role split, because **an agent that has read the coursework cannot be the agent that writes the new parser.** Once the implementer has seen the protected original, "written from scratch" stops being true, and the one defense against a resemblance claim is gone. This is the standard clean-room arrangement: one side reads and specifies, the other side implements from the specification alone.

**Role A — the reader (one session, sees the coursework).** Produces exactly two artifacts, both prose:

1. **Site and résumé copy.** Accurate technical description of what was implemented, for `/things/shell` and the résumé bullets. This is the output the instructor explicitly approved.
2. **`SPEC.md`** — a functional specification for the new parser. Behavior only.

**Role B — the implementer (separate session, never sees the coursework).** Builds P4-01 from `SPEC.md` and the POSIX shell specification only. Its prompt states that it has not seen the coursework and must refuse to accept it if offered.

**What `SPEC.md` may contain:** the list of shell constructs to support; example inputs paired with the tree shape they should produce, written in neutral notation invented for the spec; precedence and associativity rules; quoting and escaping semantics; error cases that must be reported; the JSON schema for `--dump-ast`.

**What `SPEC.md` may not contain, and Role A must be told this explicitly:** source code or pseudocode in any quantity; file names, function names, type names, macro names, or variable names from the coursework; struct or union layouts; grammar rule or token names; error message strings; the order in which the original does anything internally; any sentence of the form "the original does X, so do X." If a behavior cannot be described functionally without reproducing expression, it is dropped from the new parser's scope.

`SPEC.md` is committed to the new public repo, dated, with a line stating it was written as a functional specification and contains no coursework material. That file is the provenance record. It also happens to be good documentation.

**Storage rules, and one specific trap.** Do not add the coursework to this project's files, and do not paste it into any chat attached to a project with memory enabled — project files and memory persist, which is the opposite of what is wanted here. Use a separate, non-retained session, and verify that setting yourself rather than assuming it. Nothing derived from Role A's *input* leaves that session; only the two prose artifacts do.

**What is reusable in practice:** the feature list, the hard-won knowledge of which edge cases matter, and the test *cases* as behavioral descriptions. **What is not reusable at all:** the Purdue template files, any provided build system or test harness, the Flex and Bison sources, and any code Vitor wrote against the template's interfaces. The template is Purdue's material, not his, so it cannot be relicensed MIT no matter who typed the surrounding lines.

### 5.3 The Guestbook

Last 30 messages, 200 characters each, one per visitor. Bruno Simon's "whispers" pattern: new messages push out old ones, so the wall is always current and never becomes a moderation swamp.

Cloudflare Worker plus D1, Turnstile on submit, a salted hash of the IP for rate limiting and never the IP itself, manual takedown via an admin token. Typing `sudo` in a message gets a reply in kernel voice.

### 5.4 Explicitly rejected: the AI chat companion

Danilo has one. So does nearly every portfolio built since 2024. It answers questions nobody asked and invents facts about the person it represents, which is the exact failure mode Vitor cares about avoiding everywhere else. Skip it. If he wants it later, the only version worth building shows its retrieval and refuses when nothing matches. Phase 6 at the earliest.

### 5.5 Stretch: the real thing (Phase 6)

Boot a real Linux kernel in the browser with **v86** on a Buildroot i686 image with `CONFIG_SECCOMP`, namespaces, and cgroups v2 enabled, Hermes preinstalled. Visitors run `hermes ./escape_02` and watch a real `SIGSYS`.

Why v86 and not WebVM/CheerpX: CheerpX does not run a Linux kernel, it emulates Linux-compatible syscalls. No real kernel means no real seccomp, namespaces, or cgroups — the exact things Hermes demonstrates. v86 emulates hardware and boots a genuine kernel, so those features are genuinely present.

Cost: a 20–40MB image, desktop only, and a real chance it eats a month. Gate it behind an explicit click with the download size on the button. **Do not attempt before Phases 1–5 ship.**

### 5.6 Easter eggs (Phase 5, four maximum)

1. **`curl vrovaris.com`** returns an ANSI-colored plaintext résumé generated from `resume/resume_web.tex` (D49). A Worker sniffs `User-Agent`/`Accept`. Build this one first; it is the best of the four.
2. `/dev/null` — a real route returning 204 and an empty body.
3. 404 as an errno table with `ENOENT` highlighted.
4. `/humans.txt`, written properly.

No Konami code.

---

## 6. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 7** + islands (D35) | Zero JS by default; heavy WASM loads only where needed. Also not Next.js, which both reference sites use. |
| Islands | React 19, inside islands only | The gate and the grammar need state. Nothing else does. |
| Styling | Plain CSS + custom properties, one `tokens.css` | The design dies if it inherits a utility framework's defaults. |
| Content | Astro content collections, MDX | Type-checked frontmatter, locale-ready. |
| Native → WASM | Emscripten for the parser and libseccomp | Built in CI, artifacts committed to `public/wasm/`. |
| Hosting | **Cloudflare Pages** + Workers | Needed for the `curl` easter egg and the guestbook at the edge. Free tier. |
| Data | Cloudflare D1 | Guestbook only. |
| Domain | **vrovaris.com** at Spaceship, DNS delegated to Cloudflare (D23) | $3.80 first year on a promo code, ~$10.18/year after, free WHOIS privacy. Nameservers point at Cloudflare so Pages, Workers, and D1 work. |
| Analytics | Cloudflare Web Analytics | No cookies, no consent banner, free. |
| Tests | Playwright + axe-core, Lighthouse CI | The islands are the risky part. |
| Résumé | GitHub Action compiles `resume/resume_web.tex` → `/resume.pdf` (D49) | Single source of truth; the PDF cannot go stale. |

### Budget (D8)

| Item | Cost |
|---|---|
| `vrovaris.com` at Spaceship | **$3.80 year one**, ~$10.18/year after |
| Cloudflare Pages, Workers, D1, Turnstile, Web Analytics | $0 on free tiers, by a wide margin |
| Newsreader, Commit Mono | $0 |
| GitHub Actions | $0 for public repos |
| **Total** | **~$11/year** |

Year one lands near $4. Renewals sit near $10. $20 is enough with room to spare. The only thing that would break it is a paid typeface — Berkeley Mono is around $75 one-time, MonoLisa more. Commit Mono is free and good, so skip them. Verify the domain's first-year and renewal price at checkout; some registrars discount year one and triple the renewal, which is why Cloudflare Registrar is specified.

### Repository layout

```
vrovaris.com/
├─ src/
│  ├─ data/profile.json          # SINGLE SOURCE OF TRUTH for all facts
│  ├─ content/
│  │  ├─ work/en/*.mdx           # pt/ exists but stays empty until D5 is revisited
│  │  ├─ things/en/*.mdx
│  │  ├─ writing/en/*.mdx
│  │  └─ now/en.mdx
│  ├─ islands/{gate,grammar,guestbook}/
│  ├─ layouts/ components/ pages/
│  └─ styles/tokens.css
├─ public/
│  ├─ wasm/{grammar,seccomp}.{js,wasm}
│  ├─ traces/*.json              # captured strace output from the Hermes repo
│  ├─ img/                       # AVIF, per §7.6 budget
│  └─ resume.pdf                 # CI artifact
├─ workers/{curl-resume,guestbook}/
├─ tools/{capture-traces,tex-to-ansi}/
├─ docs/
│  ├─ plan.md                  (this file)
│  ├─ DECISIONS.md
│  ├─ OPEN_QUESTIONS.md
│  └─ practices/*.md
├─ .claude/skills/<name>/SKILL.md   (symlinks into docs/practices/)
├─ AGENTS.md
├─ CLAUDE.md -> AGENTS.md
└─ README.md
```

**Four repositories, deliberately separate (D21).** The coursework lives alone in a private repo so it cannot reach the site's git history through a mis-scoped `git add` or an agent working in the site directory.

| Repo | Visibility | Contents |
|---|---|---|
| `personal-website` | public | the site. Never contains shell source, and must never have contained it. |
| `shell-private` | **private, permanently** | CS 252 coursework plus Vitor's own modifications. |
| `grammar` | public, MIT | the clean-room parser (§5.2). |
| `secure-sandbox` | public | the Hermes project; the gate's traces come from here. The project is called Hermes everywhere in prose; `secure-sandbox` is only the repo name (D26). |

Never a submodule, subtree, or vendored copy between the first two — a submodule pointer in a public repo advertises the private repo and invites access requests. Only a verified binary crosses the boundary, copied in alone. Git history is permanent, so the rule is that the public repo must never *have had* the source; if it ever does, the fix is a fresh repository, not a revert.

---

## 7. Content plan

### 7.1 Home
Not a greeting. One sentence stating what he actually does, then the gate above the fold on desktop. Kernel track carries status, location, three links, résumé. Roughly 120 words of prose.

### 7.2 `/work` entries
One per role, written as a story with a problem in it. The kernel track carries the numbers; the prose track never repeats them, it explains them.

| Slug | Period | Kernel-track facts (from the résumés) |
|---|---|---|
| `btg-energy-desk` | Jun–Aug 2026 | 371 notes/mo · $140M/mo · $0.01–$236M · $50M reconciled · 3 systems · Python, RabbitMQ, Celery, K8s, PostgreSQL |
| `btg-ai-pipeline` | Jun–Aug 2025 | 20,000+ signatures · 80% efficiency · AWS Lambda, SQS |
| `brasa` | Oct 2024–Aug 2026 | analyst → manager (4) → director (13) · 20,000+ members · 12 years of data · NPS +120 |
| `autoic` | Aug 2026–present | OUR Scholars 2026–27 · NSF-funded · NLP + BIM + code compliance |
| `cs180-ta` | Aug 2026–present | labs of 25 · 761 students this term |

### 7.3 `/things` entries
- `hermes` — public repo linked, hosts the gate (§5.1).
- `grammar` — new clean-room parser, public repo linked, hosts the grammar interactive (§5.2).
- `shell` — the CS 252 coursework. Long-form technical writing, plus a **compiled native binary, screenshots, and a recorded session** (D17). No source, no excerpts, no repo link, ever.
  **Distribution (D22):** primary channel is a **public container image** — one copy-pasteable `docker run` line, isolated execution, no source. A package can be public while its source repository stays private. Secondary is a raw stripped binary with a published SHA-256. Linux `x86_64` first, `arm64` if it builds clean, macOS only if it compiles unmodified. Asking visitors to download and execute an unsigned binary is a bad look on a site whose other headline feature is a sandbox.
  **Release checks, blocking, before anything ships:** strip all symbols, no debug info, no DWARF, no source maps, `ASSERTIONS=0`, no `--profiling`; then run `strings` over the artifact and confirm no coursework file name, function name, or error message survives. These run in the **private** repo's CI on every push (D21), so the check is enforced continuously rather than remembered at publish time.
- `scheduler` — 25 doctors, CP-SAT, LGPD-safe data model. No repo link unless the client agrees.
- `this-site` — points at the colophon.

### 7.4 `/writing`
Ship with two pieces so the section isn't empty. One technical, which he already knows cold: a write-up of one Hermes escape attempt and why the naive policy failed. One personal, subject unknown (§12 Q1).

### 7.5 `/now`
Blocked on §12 Q1. Ship a short honest version rather than nothing.

### 7.6 Photography (D6)
One portrait plus up to four environment shots. Not corporate headshots; the useful ones are a desk mid-work, something from São Paulo, something from West Lafayette in a season that looks like Indiana. Placed in the user track only — kernel space never carries photographs, which keeps the split legible.

Budget: AVIF with JPEG fallback, max 1600px on the long edge, ≤120KB each, `loading="lazy"` below the fold, explicit `width`/`height` to hold layout. Total image weight on any route ≤300KB.

---

## 8. `profile.json` — the source of truth

Every fact on the site reads from this file. Nothing is hardcoded in a component. This is what stops any agent, or future Vitor at 2am, from drifting the numbers.

```jsonc
{
  "name": "Vitor Augusto Hertel Rovaris",
  "links": { "github": "...", "linkedin": "...", "email": "..." },  // no phone number on the site
  "education": {
    "school": "Purdue University",
    "degree": "B.S. Computer Science, Systems Software and Security",
    "start": "2024-08", "end": "2028-05", "gpa": "3.84/4.0"
  },
  "roles": [ { "slug": "...", "org": "...", "title": "...",
               "start": "YYYY-MM", "end": "YYYY-MM|present",
               "facts": [ { "value": "371", "unit": "notes/month", "source": "resume" } ] } ],
  "things": [ { "slug": "...", "stack": [], "repo": null, "repoPublic": false } ],
  "languages": [ "Portuguese (native)", "English", "German", "Spanish" ]
}
```

One lint rule (P1-06, D48): fail the build if anything outside `src/profile.ts`
imports `src/data/profile.json`, which would bypass the Zod schema and the rule
that a non-public repo carries no link (D47).

The fact-checking and banned-word rules originally specified here were cut (D48).
They were guidance for whoever is writing, not conditions a build should fail on —
`driven` is banned by §4.5 and also the correct word for an *event-driven*
integration. **D2 is unaffected as a constraint and still absolute; what it loses
is mechanical enforcement.** Nobody should read D2's "a build lint fails on…" and
expect that lint to exist.

---

## 9. Backlog

Estimates are focused hours for one competent agent or one focused Vitor session.

### Phase 1 — Foundation — 10–14h

**P1-01 — Scaffold.** Astro 7 (D35), TS strict, React islands, Cloudflare Pages adapter. Deploy a blank page to production on day one so deployment is never a late surprise.
*AC:* `main` auto-deploys; PR previews work; clean build.

**P1-02 — Tokens and type.** §4.1 and §4.2 as `tokens.css`, semantic names only outside the palette block. Wire `data-theme` and the `prefers-color-scheme` listener but ship light only. Self-host Commit Mono, subset Newsreader. Build a `/styleguide` route, excluded from the sitemap.
*AC:* zero raw hex outside the palette block; no component references `--plaster` or `--ink` directly; fonts ≤150KB total (D34); FOUT handled with `size-adjust`.

**P1-03 — The boundary layout.** §4.3 as a layout component plus the mobile stack. Highest-risk CSS in the project; do it before content.
*AC:* correct at 320/768/960/1440; the rule is continuous and does not break across sections; tab order follows prose order, not visual order.

**P1-04 — Content collections, locale-ready.** Schemas for `work`, `things`, `writing`, `now`. Locale dimension present, `en` only populated, no switcher rendered.
*AC:* adding a `pt/` file later requires no schema change; no dead `/pt/` routes ship.

**P1-05 — `profile.json` + typed accessor.**
*AC:* Zod-validated at build; one exported helper; components cannot import the raw JSON.

**P1-06 — Lint rule.** The one rule from §8 (D48).
*AC:* CI fails on a planted raw import of `profile.json`.

**P1-07 — Résumé CI.** Action compiles `resume/resume_web.tex` → `public/resume.pdf` (D10, D49) and opens a pull request.
*AC:* PDF served at `/resume.pdf`; the job fails loudly on LaTeX errors.

---

### Phase 2 — Content — 12–16h

**P2-00 — Role A, prose extraction** (§5.2a). Separate non-retained session with the CS 252 codebase. Output: the shell page's technical copy and the résumé wording. *AC:* every claim traceable to the code; zero identifiers, file names, or code fragments in the output; session not attached to a project with memory. **P2-00b — Shell binary release** *(worked in the private `shell-private` repo, D21, D26)*. Build, strip, verify with `strings`, publish a public container image plus a checksummed binary (D22). *AC:* `strings` output contains no coursework identifier; the check fails the build when a symbol is planted deliberately; the image runs from a clean machine with one command; nothing but the artifact crosses into the site repo. **P2-01** Home. **P2-02** `/work` index + 5 entries. **P2-03** `/things` index + 5 entries, with the shell page carrying no link and no code. **P2-04** `/writing` + the technical post + RSS *(second post blocked on Q1)*. **P2-05** `/now` *(blocked on Q1)*. **P2-06** `/colophon` with measured numbers, not estimates. **P2-07** 404 errno page. **P2-08** OG images generated at build with Satori, using the two-track layout. **P2-09** Photography pass per §7.6.

*AC across Phase 2:* every page reads correctly with JS off; no fact absent from `profile.json`; §10 clean.

---

### Phase 3 — The Gate — 16–22h *(moved ahead of the grammar: public repo, strongest signal)*

**P3-00 — Trace format contract** (D57). `docs/trace-format.md`, agreed before either side is written, because the harness and the evaluator live in repositories that cannot see each other.
*AC:* settles normalisation, determinism, and what counts as escape; both P3-01 and P3-02 build against it.

**P3-01 — Trace capture harness** in the `secure-sandbox` repo. `strace -f -qq -ttt` over 7 attack scenarios and 3 benign programs → JSON, checked in.
*AC:* deterministic across runs after normalizing addresses and pids; ≤150KB gzipped shipped.

**P3-02 — Policy evaluator.** Replay a trace against an allowlist; return `contained | escaped | broken` plus the divergence index.
*AC:* unit-tested over 10 traces × 4 reference policies; verified once by hand against the real kernel.

**P3-03 — Spike: libseccomp → WASM.** Timebox 4h. Success is real cBPF from `seccomp_export_bpf()`; failure falls back to the TS emitter, labeled.
*AC:* either path produces a disassembly a systems person would recognize as correct.

**P3-04 — The panel.** Bulcão grid, the crossing animation, three verdicts, the honesty line, link to the public Hermes repo.
*AC:* fully keyboard-operable; verdicts announced via `aria-live`; readable at 320px; respects reduced motion.

---

### Phase 4 — The Grammar — 18–24h *(larger than v1: the parser is now written from scratch)*

**P4-00 — Role A, `SPEC.md`** (§5.2a). Same session as P2-00 or another non-retained one. Produce the functional specification for the new parser.
*AC:* passes a self-check against the exclusion list in §5.2a; contains no identifier, rule name, struct layout, or error string from the coursework; every construct has at least two worked input/tree examples; reviewed by Vitor before it reaches Role B.

**P4-01 — New grammar repo.** From-scratch **hand-written recursive-descent parser in C** (not Flex/Bison, per D12) covering pipelines, redirects, background execution, quoting, and command substitution. MIT, public, no code shared with and no structural resemblance to the coursework (D3, D11, D12).
*AC:* `./grammar --dump-ast` emits valid JSON for a 20-case fixture set; unit tests pass; error recovery reports position and expected token; README states plainly that it was written from scratch for the website; `SPEC.md` committed with its provenance line; the implementing session confirms in the PR that it never received the coursework.

**P4-02 — WASM build.** `emcc` target, committed artifact, CI rebuild-and-diff check.
*AC:* ≤200KB gzipped; runs in Safari, Firefox, Chrome; malformed input returns a structured error rather than trapping.

**P4-03 — Island: tokens + parse tree.** Hand-rolled SVG, no D3.
*AC:* live update under 16ms for a 20-token line; tree keyboard-navigable and announced as a nested list.

**P4-04 — Island: process plan.** fd wiring diagram and syscall sequence generated in TS from the AST, with the one-line note that the parse is real and the plan is a model.
*AC:* pipelines, background `&`, redirects, and command substitution each render distinctly.

---

### Phase 5 — Social and edges — 8–12h

**P5-01** Guestbook Worker + D1 + Turnstile + hashed-IP rate limit. **P5-02** Guestbook UI, 30-message wall. **P5-03** `curl` résumé Worker. **P5-04** `/dev/null` and `/humans.txt`. **P5-05** Analytics. **P5-06** Full accessibility and performance pass against §10.

---

### Phase 6 — Stretch (do not start early)

**P6-01** v86 + Buildroot + Hermes (§5.5). **P6-02** Portuguese content and the language switcher (D5). **P6-03** Dark mode (§4.1; should be a few hours if Phase 1 was done right). **P6-04** CP-SAT toy for `/things/scheduler`, scoped hard. **P6-05** Retrieval-visible Q&A, only if he still wants it.

---

### Minimum shippable cut

Phases 1 and 2, plus **Phase 3**, plus P5-03. Roughly 40–50 hours, or three focused weekends. Phase 3 rather than 4 because Hermes is public and needs no new repository. Ship that, then keep going. A site that goes live at 70% beats a perfect one still on a branch in March.

---

## 10. Definition of done

**Performance**
- Initial route ≤100KB JS, ≤150KB fonts (D34), ≤60KB CSS, ≤300KB images. Islands excluded but each lazy-loads behind viewport or click.
- LCP <1.5s on simulated 4G; CLS <0.02; INP <200ms.
- Anything over 1MB sits behind an explicit click with the byte count on the button.

**Accessibility**
- Keyboard operable end to end, including the gate and the grammar. Visible focus ring, never `outline: none`.
- axe-core clean on every route in CI.
- Contrast ≥4.5:1 on both grounds. Verify ochre and brick on plaster and darken if they fail.
- `prefers-reduced-motion` respected. Interactive results announced, not only drawn.
- Every page usable and comprehensible with JS off.

**Process (D29)**
- The plan was posted and approved before code was written.
- The PR contains the walkthrough: what changed, how it works, why this way, what to read closely, what you would challenge.
- New code is under roughly 300 lines, or the ticket was split.
- No refactor mixed into a feature PR, no drive-by fixes.
- The diff was re-read for deletable lines, and the PR says what came out.

**Correctness and constraints**
- No fact absent from `profile.json`.
- Any simulation labeled as one, in the UI, in one plain sentence.
- Nothing derived from the shell coursework is published (D3).
- No citizenship, passport, visa, or status reference anywhere (D2).

---

## 11. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Scope kills it; nothing ships | **High** | High | The cut line in §9. Deploy day one. Phase 6 fenced. |
| Reads as a variant of the peer site | Medium | High | §1 rules; concept A is structurally different. Show a draft to someone who knows both sites. |
| Coursework leaks via the new parser | Low | **Severe** | Clean-room rule in D3b; the new repo starts from an empty directory, not a copy. If in doubt, do not reuse a single line. |
| Role A's spec leaks expression into Role B | Medium | **Severe** | §5.2a exclusion list, plus Vitor reviews `SPEC.md` before handing it over. When in doubt, cut the item from scope. |
| Coursework persists somewhere it shouldn't (project files, memory, a shared repo) | Medium | High | §5.2a storage rules: non-retained session, never attached to a project with memory, verify the setting rather than assuming it. |
| A published binary leaks coursework identifiers via symbols or strings | Medium | High | D17 release checks, automated in CI as a blocking step, not run by hand. |
| D17 rests on an interpretation the instructor never confirmed | Medium | Medium | Send the two-line follow-up email. Costs nothing, converts an interpretation into a record. Until then the binary is a judgement call, not a permission. |
| Decisions lost when switching providers | Medium | High | D19: `AGENTS.md` plus an append-only `docs/DECISIONS.md`. Nothing important lives in a chat log or model memory. |
| New parser resembles the CS 252 starter grammar | Medium | **Severe** | D12: hand-written recursive descent, derived from the POSIX spec, built without opening the coursework. If a rule feels familiar, rewrite it. |
| libseccomp WASM spike fails | Medium | Low | Timeboxed, TS fallback planned. |
| Grammar repo grows into a second shell project | Medium | Medium | Fixed feature list in P4-01. Anything beyond it is a separate project. |
| Guestbook gets spammed | Medium | Medium | Turnstile, 200-char cap, 30-message ceiling, admin takedown. |
| v86 eats a month | High if attempted early | High | Fenced to Phase 6. |
| Site goes stale | High over 12 months | Medium | `/now` with a build-time staleness banner after 90 days. |

---

## 12. Still open

Only two things block work, and only on specific tickets.

**Q1 — Personal content (blocks P2-04's second post and P2-05).** The site is flat without it and the plan cannot invent it. Five prompts, one line each is enough to unblock:
1. What are you doing this month that has nothing to do with a résumé?
2. What have you changed your mind about in the last year?
3. What do you read, listen to, or play that you would defend in an argument?
4. What is the last thing you built that had no purpose?
5. What is something about São Paulo, or Curitiba, or wherever home is, that people in Indiana consistently get wrong?

~~**Q2 — D3a.**~~ Closed as denied by D11, then reversed by D17.

**Q3 — Confirm or overrule D18 (affects roughly 12 hours of Phase 4).** The plan keeps the clean-room parser as the grammar interactive's engine and uses the D17 permission for a native binary download instead. The alternative is to compile the coursework parser to WASM and drop P4-01. Recommendation is to keep P4-01, for the reasons in §5.2.

**Q4 — Optional, recommended:** send the instructor a two-line follow-up confirming that a compiled binary with no source is acceptable. He was asked and did not answer that specific point. Nothing blocks on it, but it converts D17 from an interpretation into a record.

Everything else in §12 of v1 is now recorded in `docs/DECISIONS.md`.

---

## Appendix A — Reference teardown

**Peer site A** — Next.js, single page, accordion timeline where each role expands into real narrative with specific numbers. Strength: the writing is personal, and entries end on feeling rather than metrics. Steal: *depth on demand* — a scannable line that opens into a real story. Avoid: everything about the shape, per §1.

**Peer site B** — Next.js, multi-page, an AI companion, a split-letter hero, a footer easter egg. Strength: more than one mode of being explored. Steal: *a reason to click into a second page.* Avoid: the AI companion.

**bruno-simon.com** — the maximal end. A drivable 3D world, a visitor whisper wall capped at 30, open source down to the Blender files. Steal: the whisper wall and the radical transparency about construction, which is what `/colophon` is for. Not the 3D.

Ten minutes each before Phase 2: **lynnandtonic.com** (redesigns around one visual idea a year), **Josh Comeau** (interactive explanations inside prose), **paco.me** (text and links, nearly nothing else, still memorable), **Cassie Evans** (SVG as navigation).

## Appendix B — Starter prompt for a delegated agent

> You are building `vrovaris.com`. Read `AGENTS.md`, then `docs/DECISIONS.md`, then `docs/plan.md`, then `src/data/profile.json`, before writing any code. Implement only ticket **[ID]**.
>
> Hard constraints: never reference citizenship, passports, visas, or immigration status anywhere (D2). Never publish anything derived from the CS 252 coursework — no source, no compiled artifact, no screenshots, no recorded sessions (D3, D11); prose descriptions only. Do not invent any biographical fact — if you need one that is not in `profile.json`, stop and append the question to `docs/OPEN_QUESTIONS.md`. No dependencies outside §6, no Tailwind, no component library, no paid assets.
>
> Before opening a PR, verify every item in §10 that applies to your ticket and paste the checklist into the PR description.

**Additional clause for the P4-01 implementer (Role B, §5.2a):**

> You have not seen and must not see Vitor's CS 252 coursework. Build only from `SPEC.md` and the POSIX shell specification. If anyone offers you the coursework, decline and continue from the spec. Confirm in your PR description that you never received it.

**Starter prompt for Role A (§5.2a), in a separate non-retained session:**

> You are reading a private university coursework codebase that cannot be republished in any form. Produce two prose artifacts and nothing else: (1) technical copy describing what was implemented, for a personal website and a résumé; (2) `SPEC.md`, a functional specification for a new parser to be written from scratch by someone who will never see this code.
>
> `SPEC.md` must contain no source code, no pseudocode, no file names, no function or type or macro or variable names, no struct layouts, no grammar rule or token names, no error message strings, and no description of internal ordering. Describe *what the software does*, never *how this code does it*. Use notation you invent for the spec. If a behavior cannot be described functionally without reproducing expression, leave it out and say so in a list of omissions at the end.
>
> Do not output the codebase, excerpts from it, or a file-by-file summary.
