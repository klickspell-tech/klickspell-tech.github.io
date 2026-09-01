#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '../src/content/blog');

const username = process.argv[2] || process.env.DEVTO_USERNAME || 'atulbhattsystem32';

if (!username) {
  console.log(`
Usage:
  npm run sync:devto <username>
  or
  node scripts/sync-devto.mjs <username>

Example:
  npm run sync:devto mratulbhatt
`);
  process.exit(1);
}

async function syncDevto() {
  try {
    await fs.mkdir(BLOG_DIR, { recursive: true });
    console.log(`📡 Fetching articles from Dev.to for user: ${username}...`);

    const listRes = await fetch(`https://dev.to/api/articles?username=${encodeURIComponent(username)}&per_page=100`);
    if (!listRes.ok) {
      throw new Error(`Failed to fetch articles: ${listRes.status} ${listRes.statusText}`);
    }

    const articles = await listRes.json();
    console.log(`Found ${articles.length} article(s). Downloading full markdown...`);

    let syncedCount = 0;
    for (const item of articles) {
      const detailRes = await fetch(`https://dev.to/api/articles/${item.id}`);
      if (!detailRes.ok) {
        console.warn(`⚠️ Could not fetch article #${item.id}: ${item.title}`);
        continue;
      }

      const detail = await detailRes.json();
      const slug = detail.slug || item.slug || String(item.id);
      const title = (detail.title || item.title || '').replace(/"/g, '\\"');
      const description = (detail.description || item.description || '').replace(/"/g, '\\"');
      const pubDate = new Date(detail.published_at || item.published_at || Date.now()).toISOString();
      const tags = Array.isArray(detail.tags) ? detail.tags : (detail.tag_list || []);
      const tagsJson = JSON.stringify(tags);
      const devtoUrl = detail.url || item.url || '';
      const coverImage = detail.cover_image || item.cover_image || '';
      const readingTime = `${detail.reading_time_minutes || item.reading_time_minutes || 5} min read`;
      const author = detail.user?.name || item.user?.name || 'Atul Bhatt';

      // Strip existing frontmatter from dev.to body_markdown if present
      let rawMarkdown = detail.body_markdown || item.body_markdown || detail.description || '';
      if (rawMarkdown.startsWith('---')) {
        const endFrontmatter = rawMarkdown.indexOf('---', 3);
        if (endFrontmatter !== -1) {
          rawMarkdown = rawMarkdown.slice(endFrontmatter + 3).trim();
        }
      }

      const fileContent = `---
title: "${title}"
description: "${description}"
pubDate: ${pubDate}
author: "${author}"
tags: ${tagsJson}
devtoUrl: "${devtoUrl}"
canonicalUrl: "https://klickspell.com/blog/${slug}"
${coverImage ? `coverImage: "${coverImage}"` : ''}
readingTime: "${readingTime}"
---

${rawMarkdown}
`;

      const filePath = path.join(BLOG_DIR, `${slug}.md`);
      await fs.writeFile(filePath, fileContent, 'utf-8');
      console.log(`✅ Synced: ${slug}.md (${title})`);
      syncedCount++;
    }

    console.log(`\n🎉 Successfully synced ${syncedCount} article(s) to src/content/blog/!`);
  } catch (err) {
    console.error(`❌ Error syncing from Dev.to:`, err);
    process.exit(1);
  }
}

syncDevto();
