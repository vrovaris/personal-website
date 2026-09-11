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
