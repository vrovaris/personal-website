---
name: frontend
description: Use when building or changing anything the visitor sees — Astro pages and layouts, React islands, CSS, typography, motion, images, or accessibility. Covers this site's design tokens, its two-track layout, and the rules that keep it from looking templated.
---

# Frontend

Read `simplicity.md` first. Everything below is subordinate to it.

## Stack rules

- **Astro 5**, zero JS by default. A React island is justified only when a component holds state that changes after load. Three islands are planned: the gate, the grammar, the guestbook. A fourth needs an argument.
- **Plain CSS with custom properties.** No Tailwind, no CSS-in-JS, no component library, no UI kit. The site's identity dies the moment it inherits a framework's defaults, and that is the entire point of building it by hand.
- **One `tokens.css`.** Raw hex values appear there and nowhere else.
- Islands are lazy-loaded behind viewport or click, never eagerly hydrated.

## Colour

Components reference semantic names only: `--ground-user`, `--ground-machine`, `--fg-user`, `--fg-machine`, `--boundary`, `--state-allowed`, `--state-quiet`, `--state-trapped`, `--state-denied`.

A component that references `--plaster` or `--ink` directly is a bug, because dark mode is implemented later by swapping which side of the boundary is dark. Semantic naming is what makes that a six-line change instead of a refactor.

No shadows anywhere. Depth comes from ground colour. Radius is `0` on anything representing machine state and `2px` on prose-side controls — two values used with meaning, not one value used everywhere.

## Type

Two families, strictly separated, because the separation *is* the concept:

- **Newsreader** for prose, headings, anything in Vitor's voice. Max 68ch, 1.55 line-height.
- **Commit Mono** for machine output, labels, dates, nav, tables, terminals. Never for prose paragraphs.

Scale: `0.8125 / 0.9375 / 1 / 1.3125 / 1.75 / 2.625 / 4.25` rem.

## Banned patterns

These are the visual tells of generated work. Any one of them fails review:

- All-caps tracked-out eyebrow labels above headings
- One word of a headline in a different colour or weight
- `→` appended to link text
- Meta strings joined by middle dots
- `01 / 02 / 03` markers on anything that is not a real sequence
- Identical rounded cards in a grid
- Scroll-triggered fade-and-slide-up reveals
- Hover lift on cards
- Centred body text

## Layout

Asymmetric two-track grid: narrow mono kernel track, wide serif prose track, a continuous 1px rule between them running the full document height. Below 960px the tracks stack and the rule becomes horizontal.

Tab order follows prose order, not visual order. Verify by tabbing, not by reading the markup.

## Motion

Exactly one orchestrated moment, and it is always user-triggered: an element crossing the boundary, 240ms, `cubic-bezier(.2,0,0,1)`. Everything else is a colour change on hover. `prefers-reduced-motion: reduce` replaces the crossing with an instant state change.

## Non-negotiable floor

- Keyboard operable end to end, including the islands. Visible focus ring; never `outline: none`.
- axe-core clean in CI on every route.
- Contrast at least 4.5:1 on both grounds. Ochre and brick on plaster are the pair most likely to fail — check them.
- Every page readable and comprehensible with JavaScript disabled.
- Initial route: ≤100KB JS, ≤40KB fonts, ≤60KB CSS, ≤300KB images. LCP under 1.5s on simulated 4G, CLS under 0.02.
- Images: AVIF with fallback, explicit `width` and `height`, `loading="lazy"` below the fold.

## Explaining frontend work

Vitor writes C and Python. Assume he has not used Astro, islands, or modern CSS layout, and explain those. Do not explain what a function is.
