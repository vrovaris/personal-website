import { z } from 'astro/zod';
import data from './data/profile.json';

// The single source of every biographical fact on the site (plan §8). Validated
// here rather than trusted, so a malformed edit fails the build instead of
// rendering wrong. Components import `profile` from this module and never the
// JSON directly — a lint rule in P1-06 enforces what this module only encourages.

const fact = z.object({
  value: z.string(),
  unit: z.string(),
  // Where the number came from. Every fact needs one; "resume" means it is in
  // resume/resume_web.tex and can be checked against it.
  source: z.string(),
});

const schema = z.object({
  name: z.string(),
  links: z.object({
    github: z.url(),
    linkedin: z.url(),
    email: z.email(),
  }),
  education: z.object({
    school: z.string(),
    degree: z.string(),
    start: z.string().regex(/^\d{4}-\d{2}$/),
    end: z.string().regex(/^\d{4}-\d{2}$/),
    gpa: z.string(),
  }),
  roles: z
    .object({
      slug: z.string(),
      org: z.string(),
      title: z.string(),
      start: z.string().regex(/^\d{4}-\d{2}$/),
      end: z.union([z.string().regex(/^\d{4}-\d{2}$/), z.literal('present')]),
      facts: z.array(fact),
    })
    .array(),
  things: z
    .object({
      slug: z.string(),
      stack: z.array(z.string()),
      repo: z.url().nullable(),
      repoPublic: z.boolean(),
    })
    // A repository that is not public must carry no link. The shell's is null
    // permanently (D3, D21, D26); this-site's flips at launch (D32). Enforcing
    // it here means no component can leak one by forgetting to check the flag.
    .refine((t) => t.repoPublic || t.repo === null, {
      message: 'a non-public repo must have repo: null',
    })
    .array(),
  languages: z.array(z.string()),
});

export const profile = schema.parse(data);
