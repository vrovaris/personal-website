# OPEN_QUESTIONS.md

Anything an agent could not resolve, and anything waiting on Vitor. Append; do not delete. When a question is answered, record the answer as a numbered entry in `DECISIONS.md` and strike the line here with a pointer to the ID.

---

## Waiting on Vitor

**Q1 — Personal content.** Blocks P2-04's second post and P2-05 only. Five prompts, one line each is enough:
1. What are you doing this month that has nothing to do with a résumé?
2. What have you changed your mind about in the last year?
3. What do you read, listen to, or play that you would defend in an argument?
4. What is the last thing you built that had no purpose?
5. What is something about home that people in Indiana consistently get wrong?

**Q3 — Confirm or overrule D18.** Keep the clean-room parser as the grammar interactive's engine (current default, ~12 hours), or compile the coursework parser to WASM and drop P4-01. Recommendation: keep it.

~~**Q5 — Email on the domain.**~~ Answered by D25 (Email Routing). Original text: Two options, both free, neither blocking. (a) Lock it down: null MX plus strict SPF and DMARC, so nobody can spoof mail from `@vrovaris.com`. (b) Enable Cloudflare Email Routing, take `vitor@vrovaris.com`, forward to Gmail, then add DMARC. Option (b) is receive-only — sending as that address from Gmail needs an SMTP relay, which is extra work and possibly a paid tier. Record the answer as D25.

**Q4 — Optional follow-up to the instructor.** Two lines confirming a compiled binary with no source is acceptable. He was asked and answered around it. Nothing blocks on this; it converts D17 from an interpretation into a written record.

## Closed

- ~~**Q2 — Recorded shell output.**~~ Denied by D11, then reversed by D17.

## Raised by agents during work

*(append below — include the ticket ID you were on)*

**Q6 — Where does the résumé source live, and what is it called?** *(raised during P1-01; blocks nothing until P1-07)*
`resume_web.tex` sits untracked at the repository root. Two conflicts: D32 says the root holds only `README.md`, `AGENTS.md`, and `CLAUDE.md`, and D10 names the CI input `resume_general_swe.tex`, not `resume_web.tex`. The file's contents are correct — no phone number, `vitor@vrovaris.com` as the only contact — so D31 point 3 is satisfied and this is purely about name and location. Plan §6's repository layout shows `public/resume.pdf` as a CI artifact but gives the `.tex` source no home. Suggest `resume/` or `tools/resume/`, and either renaming the file or amending D10 to match.

~~**Q7 — Font licences are not in the repository.**~~ Answered by D37 — Newsreader is OFL 1.1, Commit Mono is MIT (not OFL), both licence files now ship in `public/fonts/`. Original text: *(raised during P1-01; actionable in P1-02)*
Both self-hosted faces ship without a licence file. Newsreader is OFL, which requires the licence to travel with the font. Commit Mono's current terms need confirming — plan §4.2 already flags "confirm current license at download". Suggest `public/fonts/OFL.txt` plus whatever Commit Mono requires, referenced from `/colophon` when P2-06 is built.

**Q8 — React is installed with no island to hydrate.** *(raised during P1-01)*
P1-01 lists React islands as scaffold scope, so `@astrojs/react` is installed. The build emits a 220KB React bundle into `dist/client/_astro/` that no page references — verified: the built page contains no `<script>` tag at all, so visitors download none of it and the ≤100KB JS budget is untouched. It is dead weight in the deployed output until the first island lands in Phase 3. Leave it, or drop the integration until the gate needs it and reinstall then?

**Q9 — No ticket sets up the test tooling that §10 requires.** *(raised during P1-01)*
Plan §10 requires axe-core clean on every route in CI, and §6 names Playwright, axe-core, and Lighthouse CI in the stack. No Phase 1 ticket installs any of them, and the CI workflow added in P1-01 only builds and type-checks. Either a Phase 1 ticket is missing, or the tooling belongs with the first route that has real content in Phase 2. Flagging so the §10 checklist does not silently go unenforced until someone notices at launch.

**Q10 — `noindex` must come out at launch.** *(raised during P1-01)*
`src/pages/index.astro` carries `<meta name="robots" content="noindex">` so the placeholder and the preview deploys stay out of search results while the repository is private (D32). It is correct now and wrong the moment the site launches. Whoever flips the repo public removes this line in the same pull request. Cloudflare Access protection on preview URLs was not available when P1-01 was set up, so this meta tag is currently the only thing keeping unfinished deploys out of search results.

**Q11 — Enable Cloudflare Access on preview deploys before Phase 2 starts.** *(raised during P1-01; Vitor asked to be reminded)*
Access protection was not available when the Worker was set up, so preview URLs are public to anyone holding one. Today that exposes a single line of placeholder text, which is why P1-01 shipped without it. Phase 2 is when previews start carrying real content — the writing, the work entries, the photography — and D32 keeps the repository private for exactly that reason. The blocker is usually a prerequisite rather than the Worker setting: Cloudflare Dashboard → Zero Trust → complete the one-time team-domain setup, free for up to 50 users so D8 is unaffected, after which the Access toggle becomes available. Do this before the first P2 ticket, not during it.

**Q12 — LCP is 1.6s against §10's 1.5s target; revisit with real content.** *(raised during P1-02)*
Measured on the placeholder page under Lighthouse mobile throttling. CLS was fixed to 0 by matching fallback advance widths rather than x-heights, but LCP sat at 1.6s on a 2.6KB page, which points at simulated network setup cost rather than payload — there is almost nothing to download. The font preload was removed as a first experiment, on the reasoning that preloading 121KB at highest priority costs roughly 0.6s of simulated bandwidth while the browser is trying to paint, and buys nothing structural now that CLS is 0.
Do not optimise further against a placeholder. Re-measure once Phase 2 has real content and real images, **on the deployed Worker rather than localhost**, and read the LCP breakdown (TTFB / load delay / load time / render delay) before changing anything. If TTFB dominates, no font work will help. If it is still over 1.5s with real content, the levers in order are: put the preload back and compare, pin the `opsz` axis to cut Newsreader by roughly 70KB (D34 documents the trade), or split display and text instances.

**Q13 — Revisit the boundary layout's proportions once real content fills it.** *(raised during P1-03)*
The grid was tuned against a demo page: 18-character kernel track, 68-character prose measure, 32px gutter, ink blocks at `0.5rem 0.75rem` padding. Vitor accepted it while noting he will likely want adjustments once Phase 2 content is in place — real dates, counters and prose behave differently from placeholder text, particularly kernel blocks whose content runs longer than the track is wide. Levers in rough order of effect: block padding, `--measure-kernel`, `--gutter`, then the rule's placement (D45). The rule being continuous is not a lever; it is the identity (D1).

**Q14 — Three things flip together at launch, and forgetting any one is visible.** *(raised during P1-05)*
When `personal-website` goes public (D32), all of these change in the same pull request:
1. Remove `<meta name="robots" content="noindex">` from `src/pages/index.astro` — Q10.
2. Set `this-site` in `src/data/profile.json` to `repo: "https://github.com/vrovaris/personal-website"` and `repoPublic: true`. The Zod refine in `src/profile.ts` rejects the URL while the flag is false, so they must move together (D47).
3. Write the real `README.md` — D32 consequence 5 says the first file a visitor opens must not be the plan.
Unrelated to this list and never changing: the shell's repo stays `null` permanently (D3, D21, D26).
