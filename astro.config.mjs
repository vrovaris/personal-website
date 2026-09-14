// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://vrovaris.com',
  // No route uses sessions; without this the adapter declares a SESSION KV
  // binding that would have to exist in the account before a deploy succeeds.
  session: false,
  integrations: [mdx(), react()],
  adapter: cloudflare(),
});
