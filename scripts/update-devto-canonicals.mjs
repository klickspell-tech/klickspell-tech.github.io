#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '../src/content/blog');

const apiKey = process.env.DEVTO_API_KEY;

if (!apiKey) {
  console.error('❌ Error: DEVTO_API_KEY environment variable is missing.');
  console.error('Make sure .env contains DEVTO_API_KEY and run with:');
  console.error('  node --env-file=.env scripts/update-devto-canonicals.mjs');
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log('🔄 Fetching published Dev.to articles...');

  const res = await fetch('https://dev.to/api/articles/me/published?per_page=1000', {
    headers: { 'api-key': apiKey }
  });

  if (!res.ok) {
    console.error(`❌ Failed to fetch articles: ${res.status} ${res.statusText}`);
    return;
  }

  const devtoArticles = await res.json();
  console.log(`📋 Found ${devtoArticles.length} published Dev.to articles.`);

  // Read local blog markdown files
  const localFileNames = (await fs.readdir(BLOG_DIR)).filter(f => f.endsWith('.md'));
  const localPosts = await Promise.all(
    localFileNames.map(async (fileName) => {
      const filePath = path.join(BLOG_DIR, fileName);
      const content = await fs.readFile(filePath, 'utf-8');
      const slug = fileName.replace('.md', '');
      const titleMatch = content.match(/^title:\s*["']?(.*?)["']?$/m);
      const devtoMatch = content.match(/^devtoUrl:\s*["']?(.*?)["']?$/m);
      return {
        fileName,
        filePath,
        slug,
        title: titleMatch ? titleMatch[1].trim() : '',
        devtoUrl: devtoMatch ? devtoMatch[1].trim() : '',
        rawContent: content
      };
    })
  );

  let updatedCount = 0;
  let skippedCount = 0;

  for (const article of devtoArticles) {
    // Match with local post
    const match = localPosts.find(lp => 
      (lp.devtoUrl && (article.url.includes(lp.devtoUrl) || lp.devtoUrl.includes(article.url))) ||
      (lp.title && article.title && lp.title.toLowerCase().trim() === article.title.toLowerCase().trim()) ||
      (article.slug && lp.slug.includes(article.slug))
    );

    if (!match) {
      console.warn(`⚠️ Could not match Dev.to article [${article.id}]: "${article.title}"`);
      skippedCount++;
      continue;
    }

    const targetCanonical = `https://klickspell.com/blog/${match.slug}`;
    const alreadyCanonical = article.canonical_url === targetCanonical;

    // Fetch full article markdown to preserve content
    const detailRes = await fetch(`https://dev.to/api/articles/${article.id}`, {
      headers: { 'api-key': apiKey }
    });
    const detail = await detailRes.json();
    let body = detail.body_markdown || '';

    // Check if canonical backlink is in body
    const attributionStr = `\n\n---\n*Originally published at [Klickspell Engineering](${targetCanonical})*`;
    let bodyUpdated = false;

    if (!body.includes('klickspell.com')) {
      body = body.trimEnd() + attributionStr;
      bodyUpdated = true;
    }

    if (alreadyCanonical && !bodyUpdated) {
      console.log(`✓ Already up-to-date [${article.id}]: "${article.title}"`);
      skippedCount++;
      continue;
    }

    console.log(`🚀 Updating [${article.id}]: "${article.title}" -> Canonical: ${targetCanonical}`);

    const putRes = await fetch(`https://dev.to/api/articles/${article.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        article: {
          canonical_url: targetCanonical,
          body_markdown: body
        }
      })
    });

    if (putRes.ok) {
      console.log(`✅ Successfully updated [${article.id}] "${article.title}"`);
      updatedCount++;

      // Also ensure local markdown frontmatter has the exact devtoUrl
      if (!match.devtoUrl || match.devtoUrl !== article.url) {
        let updatedContent = match.rawContent;
        if (match.devtoUrl) {
          updatedContent = updatedContent.replace(/^devtoUrl:.*$/m, `devtoUrl: "${article.url}"`);
        } else {
          updatedContent = updatedContent.replace(/(---[\s\S]*?)(\n---)/, `$1\ndevtoUrl: "${article.url}"$2`);
        }
        await fs.writeFile(match.filePath, updatedContent, 'utf-8');
      }
    } else {
      const err = await putRes.text();
      console.error(`❌ Failed to update [${article.id}]:`, err);
    }

    // Rate-limit safety: 600ms pause
    await sleep(600);
  }

  console.log('\n======================================');
  console.log(`🎉 Done! Updated: ${updatedCount}, Skipped/Unchanged: ${skippedCount}`);
  console.log('======================================');
}

run();
