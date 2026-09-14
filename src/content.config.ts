import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Locale lives in the directory, not in the schema: src/content/work/en/x.mdx
// loads with the id "en/x". Adding a pt/ file later is a new file and nothing
// else — no schema touches locale, so it cannot drift from the directory it
// sits in. Read entries through getLocalised() in src/content.ts (D46).
const localised = (name: string) =>
  glob({ pattern: '**/*.mdx', base: `./src/content/${name}` });

const work = defineCollection({
  loader: localised('work'),
  schema: z.object({
    title: z.string(),
    period: z.string(),
    // The kernel-track facts from plan §7.2. The prose never repeats them.
    kernel: z.array(z.string()),
    summary: z.string(),
  }),
});

const things = defineCollection({
  loader: localised('things'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // No repo field: profile.json owns repo links and whether each is public,
    // so there is one place a private URL could leak from, not two (D47).
  }),
});

const writing = defineCollection({
  loader: localised('writing'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.date(),
  }),
});

const now = defineCollection({
  loader: localised('now'),
  schema: z.object({
    updated: z.date(),
  }),
});

export const collections = { work, things, writing, now };
