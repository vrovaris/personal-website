---
name: content-writing
description: Use when writing or editing any prose that ships — page copy, project write-ups, essays, microcopy, error messages, alt text, or OG descriptions.
---

# Writing for the site

The brief is less professional, more personal. The work stays; the framing changes from "here are my accomplishments" to "here is what I find interesting and here is what I built because of it."

## Facts

Every number, date, title, and claim comes from `profile.json`. **If it is not there, stop and ask.** Do not estimate, round, or infer. A fabricated detail on a personal site is worse than a missing one, and CI will fail the build anyway.

The kernel track carries the numbers. The prose track explains them and never repeats them.

## Voice

- Conversational and specific. Vitor consistently prefers plain, concise language and pushes back on overstatement — write under, not over.
- Exact numbers beat vague scale. "$50M discrepancy" is both more interesting and more true than "a large discrepancy".
- **Banned strings**, enforced by lint: `passionate`, `driven`, `detail-oriented`, `results-oriented`, `team player`, `hit the ground running`. More broadly, no adjective Vitor applies to himself. Show the work instead.
- Never `citizenship`, `passport`, `visa`, `green card`, `work authorization`. Hard constraint, applies to alt text and metadata too.
- No third-party names: instructors, peers, classmates, and their sites are described by role, never named.
- Failure states speak in the interface's voice. The 404 is `ENOENT` with a real errno table, not "Oops!".
- A simulation is labelled as a simulation, in the UI, in one plain sentence.

## Structure

- Each `/work` entry is a story with a problem in it, not a list of responsibilities.
- Open on the thing itself. No greeting, no "welcome to my site", no throat-clearing.
- Short paragraphs. Long enough to hold an idea, short enough to survive a phone screen.
- Avoid the tells: em-dash asides, "not X, but Y" constructions, colon-then-reveal sentences, and stock transitions like "worth noting".

## Drafting

Vitor prefers to write his own drafts and get targeted criticism between iterations rather than receive a finished rewrite he did not ask for. Unless a ticket explicitly says to draft, critique what exists and point at what is weak.

When something must be drafted from scratch, mark it clearly as a starting point and flag every place a real detail is missing, rather than inventing one to smooth the sentence.
