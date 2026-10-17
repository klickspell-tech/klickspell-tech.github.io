// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeResponsiveTables from './src/lib/rehype-responsive-tables.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://klickspell.com',
  redirects: {
    '/work/the-blissful-soul': '/work/pragya-vijh',
    '/blog/how-we-achieved-a-99-pagespeed-score-a-real-world-web-performance-case-study-3e3n': '/blog/how-we-achieved-99-pagespeed-score-case-study'
  },
  build: {
    format: 'file',
    inlineStylesheets: 'always'
  },
  markdown: {
    rehypePlugins: [rehypeResponsiveTables]
  },
  integrations: [sitemap()]
});
