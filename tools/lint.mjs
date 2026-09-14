// Fails the build if anything imports src/data/profile.json directly.
//
// Plan §8 requires every fact to read from that file through one validated
// accessor; src/profile.ts is it. A raw import bypasses the Zod schema, so a
// malformed edit would render instead of failing, and it bypasses the rule that
// a non-public repo carries no link (D47). This is the only lint rule the
// project keeps — the fact-checking and banned-word rules were cut (D48).

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const ACCESSOR = 'src/profile.ts';
const IMPORT = /(?:from|import|require)\s*\(?\s*['"][^'"]*data\/profile\.json['"]/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(ts|tsx|js|mjs|jsx|astro|md|mdx)$/.test(entry.name)) yield path;
  }
}

const offenders = [];
for await (const path of walk(join(ROOT, 'src'))) {
  const rel = relative(ROOT, path);
  if (rel === ACCESSOR) continue;
  const source = await readFile(path, 'utf8');
  for (const match of source.matchAll(IMPORT)) {
    const line = source.slice(0, match.index).split('\n').length;
    offenders.push(`${rel}:${line}`);
  }
}

if (offenders.length > 0) {
  console.error(
    `\nprofile.json must be read through ${ACCESSOR}, never imported directly:\n` +
      offenders.map((o) => `  ${o}`).join('\n') +
      `\n\nImport { profile } from that module instead.\n`,
  );
  process.exit(1);
}
