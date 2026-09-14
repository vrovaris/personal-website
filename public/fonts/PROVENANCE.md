# Fonts

Both files here are subsets. The unsubsetted originals are not in this repository
(D34); they sit in `fonts-src/`, which is gitignored, and Vitor holds the masters.

| File | Source | Version | Licence |
|---|---|---|---|
| `newsreader.woff2` | Newsreader, Production Type | 1.003 | OFL 1.1 — `OFL.txt` |
| `commit-mono.woff2` | Commit Mono, Eigil Nikolajsen | 1.143 | MIT — `LICENSE-commit-mono.txt` |

Newsreader keeps both variable axes: `wght` 200–800 and `opsz` 6–72. Commit Mono
is static at weight 400. 136.0 KB for the pair, against the 150 KB budget in D34.

Regenerate with `fonttools` (not a project dependency — run it locally):

```
U="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,\
U+2000-206F,U+2074,U+20AC,U+2122,U+2190-21BB,U+2212,U+2215,U+FEFF,U+FFFD"

pyftsubset fonts-src/newsreader.woff2 --unicodes="$U" \
  --layout-features='kern,liga,calt,onum,frac' \
  --flavor=woff2 --output-file=public/fonts/newsreader.woff2

pyftsubset fonts-src/commit-mono.woff2 --unicodes="$U" \
  --layout-features='kern,calt' \
  --flavor=woff2 --output-file=public/fonts/commit-mono.woff2
```

The range is Latin-1, general punctuation, and arrows: 224 codepoints, which
covers Portuguese in full, so D5's deferred locale is not foreclosed.

**Newsreader contains no arrow glyphs** — not a subsetting loss, the master has
none. `→` renders in Commit Mono only, which suits §4.2 since arrows are machine
voice. An arrow in prose falls back to another font and will look wrong.
