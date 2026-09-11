---
name: backend
description: Use when building anything that runs on a server or at the edge — Cloudflare Workers, D1 queries, the guestbook API, the curl résumé endpoint, rate limiting, spam protection, or secret handling.
---

# Backend

Read `simplicity.md` first.

The site is static. Two Workers exist, and only two are planned: the guestbook API and the `curl` résumé endpoint. Anything that would add a third needs an argument in `docs/OPEN_QUESTIONS.md` before it is built.

## Principles

- **Static by default.** If it can be computed at build time, compute it at build time. A dynamic endpoint is a thing that can be down, abused, or rate-limited at 3am.
- **No ORM, no query builder, no framework.** D1 takes SQL. Write SQL, with bound parameters, always.
- **No server-side sessions, no user accounts, no auth flow.** Nobody logs in to this site. If a design seems to need login, the design is wrong.

## Guestbook

- Schema is one table. Resist a second.
- Hard caps in code, not in configuration: 200 characters per message, 30 messages displayed, one per visitor.
- **Store a salted hash of the IP, never the IP.** The salt is a secret, not a constant in the source.
- Turnstile verified server-side on every submit. A client-side-only check is decorative.
- Treat every field as hostile. Escape on output; never build HTML by concatenation.
- Rate limit by hashed IP with a fixed window. Simple and adequate.
- Moderation is a delete endpoint behind a bearer token. No admin UI.

## The curl résumé endpoint

Sniff `User-Agent` and `Accept`, return ANSI-coloured plaintext to terminal clients and let everything else fall through to the normal page. Generated from the same LaTeX source as the PDF so the two can never drift.

## Secrets

- Secrets live in Wrangler secrets and GitHub Actions secrets. Never in the repository, never in `wrangler.toml`, never in a client bundle.
- `.dev.vars` is gitignored and stays that way.
- If a secret is ever committed, rotating it is mandatory — deleting the commit is not sufficient, because history is permanent.

## Errors

Return real status codes. A failed submit returns 4xx or 5xx and the interface says so in the site's own voice. Never return 200 with a body meaning "it did not work".

Log failures server-side. Do not log message contents or anything that identifies a visitor.

## Explaining backend work

Vitor has shipped event-driven services with RabbitMQ, Celery, Kubernetes, and PostgreSQL, so the concepts are familiar. What is new is the edge runtime: Workers are not Node, the request lifetime is short, there is no local filesystem, and D1 is not Postgres. Explain the differences from what he already knows, not the fundamentals.
