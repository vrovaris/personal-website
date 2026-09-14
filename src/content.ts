import { getCollection, type CollectionEntry } from 'astro:content';

// The default locale renders unprefixed; no other locale renders at all until
// its content exists (D5, plan §3). Routes must list entries through this, not
// through getCollection directly — it is what keeps a stray pt/ file from
// producing a dead route.
export const DEFAULT_LOCALE = 'en';

type Localised = 'work' | 'things' | 'writing' | 'now';

export async function getLocalised<C extends Localised>(
  collection: C,
  locale: string = DEFAULT_LOCALE,
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection);
  return entries.filter((entry) => entry.id.startsWith(`${locale}/`));
}

// "en/btg-energy-desk" -> "btg-energy-desk", the slug a route renders.
export function toSlug(id: string): string {
  return id.split('/').slice(1).join('/');
}
