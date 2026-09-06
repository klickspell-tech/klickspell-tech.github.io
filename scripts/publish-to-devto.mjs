#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const apiKey = process.env.DEVTO_API_KEY;

if (!apiKey) {
  console.error('❌ Error: DEVTO_API_KEY environment variable is missing in .env');
  process.exit(1);
}

const fileArg = process.argv[2];
const isDraft = process.argv.includes('--draft');

if (!fileArg) {
  console.log(`
Usage:
  node --env-file=.env scripts/publish-to-devto.mjs <path-to-blog-md-file> [--draft]

Example:
  node --env-file=.env scripts/publish-to-devto.mjs src/content/blog/how-we-achieved-99-pagespeed-score-case-study.md
`);
  process.exit(1);
}

const targetFile = path.resolve(process.cwd(), fileArg);

async function run() {
  try {
    const raw = await fs.readFile(targetFile, 'utf-8');
    const slug = path.basename(targetFile, '.md');

    // Parse simple frontmatter
    const fmMatch = raw.match(/^---([\s\S]*?)---\n([\s\S]*)$/);
    if (!fmMatch) {
      console.error('❌ Invalid markdown file: No YAML frontmatter found.');
      process.exit(1);
    }

    const fm = fmMatch[1];
    let body = fmMatch[2].trim();

    const getFmValue = (key) => {
      const m = fm.match(new RegExp(`^${key}:\\s*["']?(.*?)["']?$`, 'm'));
      return m ? m[1].trim() : '';
    };

    const title = getFmValue('title');
    const description = getFmValue('description');
    const coverImage = getFmValue('coverImage');
    const canonicalUrl = getFmValue('canonicalUrl') || `https://klickspell.com/blog/${slug}`;

    // Extract tags: either array or comma separated
    let tags = [];
    const tagsMatch = fm.match(/^tags:\s*\[(.*?)\]/m);
    if (tagsMatch) {
      tags = tagsMatch[1]
        .split(',')
        .map((t) => t.replace(/['"]/g, '').trim().toLowerCase().replace(/[^a-z0-9]/g, ''))
        .filter(Boolean)
        .slice(0, 4); // Dev.to allows max 4 tags
    }

    if (!title) {
      console.error('❌ Error: Post must have a title in frontmatter.');
      process.exit(1);
    }

    // Append canonical footer backlink if not present
    const backlink = `\n\n---\n*Originally published with benchmarks and deep dives at [Klickspell Engineering](${canonicalUrl})*`;
    if (!body.includes('klickspell.com')) {
      body += backlink;
    }

    console.log(`🚀 Publishing "${title}" to Dev.to...`);
    console.log(`- Canonical URL: ${canonicalUrl}`);
    console.log(`- Tags: ${tags.join(', ')}`);
    console.log(`- Status: ${isDraft ? 'Draft' : 'Published'}`);

    const payload = {
      article: {
        title,
        body_markdown: body,
        published: !isDraft,
        canonical_url: canonicalUrl,
        description,
        tags
      }
    };

    if (coverImage && coverImage.startsWith('http')) {
      payload.article.main_image = coverImage;
    }

    const res = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`❌ Dev.to API Error (${res.status}):`, err);
      process.exit(1);
    }

    const result = await res.json();
    console.log(`\n🎉 Published successfully to Dev.to!`);
    console.log(`🔗 URL: ${result.url}`);
    console.log(`🆔 ID: ${result.id}`);

    // Update local frontmatter with devtoUrl
    let updatedRaw = raw;
    if (raw.includes('devtoUrl:')) {
      updatedRaw = updatedRaw.replace(/^devtoUrl:.*$/m, `devtoUrl: "${result.url}"`);
    } else {
      updatedRaw = updatedRaw.replace(/(---[\s\S]*?)(\n---)/, `$1\ndevtoUrl: "${result.url}"$2`);
    }

    await fs.writeFile(targetFile, updatedRaw, 'utf-8');
    console.log(`📝 Updated local file with devtoUrl: ${result.url}`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

run();
