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
  npm run sync:devto atulbhattsystem32
`);
  process.exit(1);
}

function cleanMarkdown(raw) {
  if (!raw) return '';

  let md = raw;

  // 1. Remove Dev.to frontmatter if present
  if (md.startsWith('---')) {
    const endFrontmatter = md.indexOf('---', 3);
    if (endFrontmatter !== -1) {
      md = md.slice(endFrontmatter + 3).trim();
    }
  }

  // 2. Fix headings missing a space after '#' (e.g. '###1. Title' -> '### 1. Title', '##What' -> '## What')
  md = md.replace(/^(#{1,6})([^\s#])/gm, '$1 $2');

  // 3. Ensure a blank line before headings so markdown parsers always recognize them
  md = md.replace(/([^\n])\n(#{1,6}\s+)/g, '$1\n\n$2');

  // 4. Convert Dev.to liquid embed tags
  // CodeSandbox
  md = md.replace(/{%\s*codesandbox\s+([^\s%]+)\s*%}/g, '<iframe src="https://codesandbox.io/embed/$1" style="width:100%; height:500px; border:0; border-radius: 6px; overflow:hidden; margin: 1.5rem 0;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>');

  // Replit
  md = md.replace(/{%\s*replit\s+([^\s%]+)\s*%}/g, '<iframe src="https://replit.com/$1?embed=true" width="100%" height="500px" style="border:0; border-radius:6px; margin: 1.5rem 0;"></iframe>');

  // YouTube
  md = md.replace(/{%\s*youtube\s+([^\s%]+)\s*%}/g, '<iframe width="100%" height="450" src="https://www.youtube.com/embed/$1" style="border:0; border-radius:8px; margin:1.5rem 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

  // GitHub
  md = md.replace(/{%\s*github\s+([^\s%]+)\s*%}/g, '[View on GitHub ↗]($1)');

  // Twitter
  md = md.replace(/{%\s*twitter\s+([^\s%]+)\s*%}/g, '[View on Twitter/X ↗](https://twitter.com/i/status/$1)');

  // Generic link / embed fallback
  md = md.replace(/{%\s*link\s+([^\s%]+)\s*%}/g, '$1');
  md = md.replace(/{%\s*embed\s+([^\s%]+)\s*%}/g, '$1');

  return md.trim();
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
    console.log(`Found ${articles.length} article(s). Downloading & formatting full markdown...`);

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

      const rawMarkdown = detail.body_markdown || item.body_markdown || detail.description || '';
      const formattedMarkdown = cleanMarkdown(rawMarkdown);

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

${formattedMarkdown}
`;

      const filePath = path.join(BLOG_DIR, `${slug}.md`);
      await fs.writeFile(filePath, fileContent, 'utf-8');
      console.log(`✅ Formatted & Synced: ${slug}.md (${title})`);
      syncedCount++;
    }

    console.log(`\n🎉 Successfully synced & formatted ${syncedCount} article(s) to src/content/blog/!`);
  } catch (err) {
    console.error(`❌ Error syncing from Dev.to:`, err);
    process.exit(1);
  }
}

syncDevto();
