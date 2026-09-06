#!/usr/bin/env node

/**
 * Klickspell -> Medium.com Automated Syndication Script
 * 
 * Cross-posts any technical article from src/content/blog/ to Medium.com
 * with canonical_url pointing to https://klickspell.com/blog/[slug]
 * to maintain 100% SEO authority and prevent duplicate content penalties.
 * 
 * Usage:
 *   node scripts/publish-to-medium.mjs --slug=how-we-achieved-99-pagespeed-score-case-study
 *   node scripts/publish-to-medium.mjs --slug=install-configure-judgeme-reviews-shopify --public
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dotenv from 'dotenv';

dotenv.config();

const MEDIUM_TOKEN = process.env.MEDIUM_INTEGRATION_TOKEN;

if (!MEDIUM_TOKEN) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: MEDIUM_INTEGRATION_TOKEN is missing in your .env file.');
  console.log('\x1b[33m%s\x1b[0m', '\nHow to get your Medium Integration Token:');
  console.log('1. Log into your Medium.com account.');
  console.log('2. Go to Settings > Security and apps (or https://medium.com/me/settings/security).');
  console.log('3. Scroll to "Integration tokens", generate a new token, and add it to your .env:');
  console.log('   MEDIUM_INTEGRATION_TOKEN=your_token_here\n');
  process.exit(1);
}

// Parse CLI flags
const args = process.argv.slice(2);
let targetSlug = null;
let publishStatus = 'draft';

args.forEach((arg) => {
  if (arg.startsWith('--slug=')) {
    targetSlug = arg.replace('--slug=', '').trim();
  } else if (arg === '--public') {
    publishStatus = 'public';
  } else if (arg === '--draft') {
    publishStatus = 'draft';
  }
});

if (!targetSlug) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Please provide a post slug using --slug=<slug>');
  console.log('Example: node scripts/publish-to-medium.mjs --slug=how-we-achieved-99-pagespeed-score-case-study');
  process.exit(1);
}

const blogDir = path.resolve(process.cwd(), 'src/content/blog');
const filePath = path.join(blogDir, `${targetSlug}.md`);

if (!fs.existsSync(filePath)) {
  console.error('\x1b[31m%s\x1b[0m', `❌ Post file not found: ${filePath}`);
  process.exit(1);
}

const fileContent = fs.readFileSync(filePath, 'utf-8');
const { data: frontmatter, content: rawMarkdown } = matter(fileContent);

const canonicalUrl = frontmatter.canonicalUrl || `https://klickspell.com/blog/${targetSlug}`;
const title = frontmatter.title || targetSlug;

// Limit to 5 tags (Medium constraint)
const tags = (frontmatter.tags || []).slice(0, 5);

// Add canonical attribution to markdown body
const formattedContent = `${rawMarkdown}

---

*This article was originally published on [Klickspell Technical Insights](${canonicalUrl}).*
`;

async function publishToMedium() {
  console.log(`\n🚀 Authenticating with Medium API...`);

  // Step 1: Fetch authenticated user
  const userRes = await fetch('https://api.medium.com/v1/me', {
    headers: {
      Authorization: `Bearer ${MEDIUM_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!userRes.ok) {
    const errText = await userRes.text();
    console.error('\x1b[31m%s\x1b[0m', `❌ Failed to authenticate with Medium API: ${userRes.status} ${errText}`);
    process.exit(1);
  }

  const userData = await userRes.json();
  const userId = userData.data.id;
  const username = userData.data.username;
  console.log(`✅ Authenticated as Medium user: @${username} (${userData.data.name})`);

  // Step 2: Create post
  console.log(`📝 Cross-posting "${title}"...`);
  console.log(`🔗 Canonical URL: ${canonicalUrl}`);
  console.log(`🏷️ Tags: ${tags.join(', ') || 'none'}`);
  console.log(`📌 Publish Status: ${publishStatus}`);

  const postRes = await fetch(`https://api.medium.com/v1/users/${userId}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MEDIUM_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title,
      contentFormat: 'markdown',
      content: formattedContent,
      canonicalUrl,
      tags,
      publishStatus,
    }),
  });

  if (!postRes.ok) {
    const errText = await postRes.text();
    console.error('\x1b[31m%s\x1b[0m', `❌ Failed to publish post to Medium: ${postRes.status} ${errText}`);
    process.exit(1);
  }

  const postData = await postRes.json();
  const mediumPostUrl = postData.data.url;

  console.log('\n\x1b[32m%s\x1b[0m', `🎉 Successfully syndicated to Medium (${publishStatus}):`);
  console.log(`👉 ${mediumPostUrl}\n`);
}

publishToMedium().catch((err) => {
  console.error('\x1b[31m%s\x1b[0m', '❌ Unexpected error:', err);
  process.exit(1);
});
