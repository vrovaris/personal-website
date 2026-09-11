---
name: deployment
description: Use when touching CI, GitHub Actions, Cloudflare Pages or Workers configuration, the résumé build, the shell binary release checks, or anything about how code reaches production.
---

# Deployment and CI

Read `simplicity.md` first.

## Principles

- **Deploy from day one.** The site went live blank before it had content, so that a deployment problem is never discovered at the same time as a code problem.
- **`main` is always deployable.** Every PR gets a preview deploy; nothing merges red.
- **CI enforces what a human will forget.** Anything described as "remember to" belongs in a pipeline instead.

## Pipelines on the site repository

1. **Build and preview** — every PR. Fails the merge if the build fails.
2. **Lint gates** (P1-06), blocking:
   - every number in content exists in `profile.json`
   - no banned adjective, and no `citizenship`, `passport`, `visa`, `green card`, `work authorization` anywhere
3. **Accessibility** — axe-core across every route.
4. **Budgets** — Lighthouse CI against the numbers in the plan's §10. A budget that only warns is not a budget.
5. **Résumé** — compiles the general SWE LaTeX variant to `/resume.pdf`. Fails loudly on a LaTeX error rather than shipping yesterday's PDF.

## Pipeline on the private shell repository

Runs on every push, and is the reason the release checks cannot be forgotten:

- build, then **strip all symbols**, no debug info, no DWARF, no source maps, assertions off, no profiling flags
- run `strings` over the artifact and **fail the build** if any coursework file name, function name, or error message survives
- the check must itself be tested: plant a symbol deliberately, confirm the build goes red

Only a verified artifact crosses into the site repository. Never source, never build scripts, never symbol files.

## Cloudflare

- Pages project builds from `main`, custom domain already bound. DNS records were created by Pages; do not hand-edit them.
- Workers deploy via Wrangler from CI, never from a laptop, so that what is deployed always matches what is committed.
- D1 migrations are plain SQL files applied in order and committed. No migration framework.
- Secrets set through Wrangler and Actions secrets only.

## Committed build artifacts

`public/wasm/*.wasm` and `public/traces/*.json` are committed on purpose. CI rebuilds them and fails if the committed copy differs from a fresh build, which keeps a stale artifact from silently shipping.

## Rollback

Pages keeps previous deployments; rolling back is selecting one. Know where that button is before needing it.

## Explaining deployment work

Vitor has deployed on Kubernetes with real pipelines, so CI concepts are familiar ground. What is new is the edge model — no containers, no pods, no long-running processes. Frame it against what he already knows.
