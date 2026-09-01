#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '../src/content/blog');

let inputUser = process.argv[2] || process.env.MEDIUM_USERNAME || 'atulbhatt98';
// Clean input (e.g. 'https://atulbhatt98.medium.com/' or '@atulbhatt98' -> 'atulbhatt98')
const username = inputUser.replace(/^https?:\/\//, '').replace(/\.medium\.com\/?.*$/, '').replace(/^@/, '').replace(/\/.*$/, '').trim();

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Custom rule for medium figures and code blocks
turndownService.addRule('preCode', {
  filter: ['pre'],
  replacement: function (content, node) {
    const code = node.textContent || content;
    return `\n\`\`\`javascript\n${code.trim()}\n\`\`\`\n\n`;
  }
});

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseXMLItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];

    const titleMatch = itemContent.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || itemContent.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) || itemContent.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
    const creatorMatch = itemContent.match(/<dc:creator><!\[CDATA\[([\s\S]*?)\]\]><\/dc:creator>/) || itemContent.match(/<dc:creator>([\s\S]*?)<\/dc:creator>/);

    const categories = [];
    const catRegex = /<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g;
    let catMatch;
    while ((catMatch = catRegex.exec(itemContent)) !== null) {
      categories.push(catMatch[1]);
    }

    if (titleMatch && contentMatch) {
      items.push({
        title: titleMatch[1].replace(/ /g, ' ').replace(/&amp;/g, '&').trim(),
        link: linkMatch ? linkMatch[1].replace(/\?source=.*$/, '').trim() : '',
        pubDate: pubDateMatch ? new Date(pubDateMatch[1]).toISOString() : new Date().toISOString(),
        content: contentMatch[1],
        creator: creatorMatch ? creatorMatch[1].trim() : 'Atul Bhatt',
        categories
      });
    }
  }

  return items;
}

function cleanMediumHTML(html) {
  if (!html) return { markdown: '', coverImage: '', description: '' };

  let cleanHtml = html;

  // Extract cover image if present
  let coverImage = '';
  const imgMatch = cleanHtml.match(/<img[^>]+src=["'](https:\/\/cdn-images-1\.medium\.com\/[^"']+)["']/i) || cleanHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && !imgMatch[1].includes('stat?event=')) {
    coverImage = imgMatch[1];
  }

  // Remove tracking stats pixel
  cleanHtml = cleanHtml.replace(/<img[^>]+stat\?event=[^>]+>/gi, '');

  // Remove trailing "For more such informative posts, don't forget to follow me: ..."
  cleanHtml = cleanHtml.replace(/<p>For more such informative posts[\s\S]*?<\/p>/gi, '');

  // Convert HTML to Markdown
  let md = turndownService.turndown(cleanHtml);

  // Clean description
  const textOnly = cleanHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const description = textOnly.slice(0, 160) + '...';

  // Fix headings with space
  md = md.replace(/^(#{1,6})([^\s#])/gm, '$1 $2');
  md = md.replace(/([^\n])\n(#{1,6}\s+)/g, '$1\n\n$2');

  return { markdown: md.trim(), coverImage, description };
}

async function syncMedium() {
  try {
    await fs.mkdir(BLOG_DIR, { recursive: true });
    console.log(`📡 Fetching articles from Medium for user: @${username}...`);

    const feedUrl = `https://medium.com/feed/@${username}`;
    const res = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Medium feed: ${res.status} ${res.statusText}`);
    }

    const xml = await res.text();
    const items = parseXMLItems(xml);

    console.log(`Found ${items.length} article(s) in Medium RSS feed. Converting to Markdown...`);

    let syncedCount = 0;
    for (const item of items) {
      const baseSlug = slugify(item.title);
      const slug = baseSlug || 'medium-post-' + Date.now();
      const { markdown, coverImage, description } = cleanMediumHTML(item.content);

      const wordCount = markdown.split(/\s+/).length;
      const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
      const readingTime = `${readingTimeMinutes} min read`;

      const tags = item.categories.length > 0 ? item.categories : ['Web Development'];
      const tagsJson = JSON.stringify(tags);

      // Check if file already exists (e.g. from dev.to sync)
      const existingFiles = await fs.readdir(BLOG_DIR);
      const matchingFile = existingFiles.find(f => f.startsWith(baseSlug) || baseSlug.startsWith(f.replace(/\.md$/, '')));

      let filePath = path.join(BLOG_DIR, `${slug}.md`);

      if (matchingFile) {
        // Read existing file and append mediumUrl to frontmatter
        const existingPath = path.join(BLOG_DIR, matchingFile);
        let existingContent = await fs.readFile(existingPath, 'utf-8');
        if (!existingContent.includes('mediumUrl:')) {
          existingContent = existingContent.replace(/canonicalUrl: "[^"]+"/, `$&\nmediumUrl: "${item.link}"`);
          await fs.writeFile(existingPath, existingContent, 'utf-8');
          console.log(`🔗 Linked Medium URL to existing: ${matchingFile}`);
          syncedCount++;
          continue;
        }
      }

      const fileContent = `---
title: "${item.title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
pubDate: ${item.pubDate}
author: "${item.creator}"
tags: ${tagsJson}
mediumUrl: "${item.link}"
canonicalUrl: "https://klickspell.com/blog/${slug}"
${coverImage ? `coverImage: "${coverImage}"` : ''}
readingTime: "${readingTime}"
---

${markdown}
`;

      await fs.writeFile(filePath, fileContent, 'utf-8');
      console.log(`✅ Synced from Medium: ${slug}.md (${item.title})`);
      syncedCount++;
    }

    console.log(`\n🎉 Successfully synced ${syncedCount} Medium article(s)!`);
  } catch (err) {
    console.error(`❌ Error syncing Medium articles:`, err);
    process.exit(1);
  }
}

syncMedium();
