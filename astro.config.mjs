// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeResponsiveTables from './src/lib/rehype-responsive-tables.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://klickspell.com',
  build: {
    format: 'file',
    inlineStylesheets: 'always'
  },
  markdown: {
    rehypePlugins: [rehypeResponsiveTables]
  },
  integrations: [sitemap()]
});
