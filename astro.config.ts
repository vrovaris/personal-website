import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://vrovaris.com',
  prefetch: { prefetchAll: true },
  fonts: [
    // text and headings
    { provider: fontProviders.google(), name: 'Newsreader', cssVariable: '--font-serif', weights: ['200 800'], styles: ['normal', 'italic'], subsets: ['latin'] },
    // labels, dates, tabs (MIT, licence in public/fonts/)
    {
      provider: fontProviders.local(),
      name: 'Commit Mono',
      cssVariable: '--font-mono',
      options: { variants: [{ src: ['./src/assets/fonts/commit-mono.woff2'], weight: 400, style: 'normal' }] },
    },
    // handwritten notes
    { provider: fontProviders.google(), name: 'Kalam', cssVariable: '--font-hand', weights: [400, 700], subsets: ['latin'] },
  ],
});
