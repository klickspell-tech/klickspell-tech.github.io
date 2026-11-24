// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeResponsiveTables from './src/lib/rehype-responsive-tables.mjs';
import rehypeBlogContent from './src/lib/rehype-blog-content.mjs';
import fs from 'node:fs';

// Sitemap <lastmod> for blog posts from their own frontmatter (updatedDate, else pubDate) and for
// /blog from the newest post. Other pages get none: a guessed date is worse than no date, since
// Google stops trusting lastmod on a site where it isn't accurate.
const blogDir = new URL('./src/content/blog/', import.meta.url);
const postDates = new Map(
  fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => {
    const fm = fs.readFileSync(new URL(f, blogDir), 'utf8').split(/^---\s*$/m)[1] || '';
    const pick = (k) => (fm.match(new RegExp(`^${k}:\\s*["']?([^"'\\r\\n]+)`, 'm')) || [])[1];
    const d = new Date(pick('updatedDate') || pick('pubDate'));
    return [f.replace(/\.md$/, ''), isNaN(d.getTime()) ? null : d];
  }).filter(([, d]) => d)
);
const newestPost = new Date(Math.max(...[...postDates.values()].map(Number)));

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
    rehypePlugins: [rehypeResponsiveTables, rehypeBlogContent]
  },
  integrations: [sitemap({
    serialize(item) {
      const path = new URL(item.url).pathname.replace(/\/$/, '');
      const post = path.match(/^\/blog\/([^/]+)$/);
      if (post && postDates.has(post[1])) item.lastmod = postDates.get(post[1]).toISOString();
      else if (path === '/blog') item.lastmod = newestPost.toISOString();
      return item;
    },
  })],
  // Hide the Astro dev toolbar pill on localhost (it never ships to staging/production anyway)
  devToolbar: { enabled: false }
});
