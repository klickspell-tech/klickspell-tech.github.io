#!/usr/bin/env node

/**
 * Klickspell Structured Data (Schema.org / JSON-LD) Auditor
 * 
 * Inspects all HTML pages built in dist/ and validates:
 * - Proper Schema.org @context and @type
 * - Complete required fields for Google Rich Snippets
 * - TechArticle, FAQPage, BreadcrumbList, WebApplication, Service schemas
 * 
 * Usage:
 *   npm run audit:schemas
 */

import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(distDir)) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: dist/ directory not found. Please run "npm run build" first.');
  process.exit(1);
}

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`\n🔍 Auditing Schema.org Structured Data across ${htmlFiles.length} pages...\n`);

let totalSchemas = 0;
let errors = 0;
let warnings = 0;
const typeCounts = {};

htmlFiles.forEach((file) => {
  const relPath = path.relative(distDir, file);
  const html = fs.readFileSync(file, 'utf-8');

  // Match all JSON-LD scripts
  const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];

  if (matches.length === 0) {
    return;
  }

  matches.forEach((match) => {
    totalSchemas++;
    let schema;
    try {
      schema = JSON.parse(match[1]);
    } catch (e) {
      console.error('\x1b[31m%s\x1b[0m', `❌ Syntax Error in JSON-LD on ${relPath}: ${e.message}`);
      errors++;
      return;
    }

    const schemasToValidate = Array.isArray(schema) ? schema : [schema];

    schemasToValidate.forEach((s) => {
      const type = s['@type'] || 'Unknown';
      typeCounts[type] = (typeCounts[type] || 0) + 1;

      // Validate Context
      if (!s['@context'] || !s['@context'].includes('schema.org')) {
        console.warn('\x1b[33m%s\x1b[0m', `⚠️ ${relPath}: Missing or invalid @context for @type "${type}"`);
        warnings++;
      }

      // Type-specific validations
      if (type === 'TechArticle' || type === 'Article') {
        if (!s.headline) {
          console.error('\x1b[31m%s\x1b[0m', `❌ ${relPath}: TechArticle missing "headline"`);
          errors++;
        }
        if (!s.datePublished) {
          console.error('\x1b[31m%s\x1b[0m', `❌ ${relPath}: TechArticle missing "datePublished"`);
          errors++;
        }
        if (!s.author) {
          console.error('\x1b[31m%s\x1b[0m', `❌ ${relPath}: TechArticle missing "author"`);
          errors++;
        }
        if (!s.publisher) {
          console.error('\x1b[31m%s\x1b[0m', `❌ ${relPath}: TechArticle missing "publisher"`);
          errors++;
        }
      } else if (type === 'BreadcrumbList') {
        if (!Array.isArray(s.itemListElement) || s.itemListElement.length === 0) {
          console.error('\x1b[31m%s\x1b[0m', `❌ ${relPath}: BreadcrumbList missing valid "itemListElement"`);
          errors++;
        } else {
          s.itemListElement.forEach((item, idx) => {
            if (typeof item.position !== 'number' || !item.name) {
              console.warn('\x1b[33m%s\x1b[0m', `⚠️ ${relPath}: Breadcrumb item #${idx + 1} missing position or name`);
              warnings++;
            }
          });
        }
      } else if (type === 'FAQPage') {
        if (!Array.isArray(s.mainEntity) || s.mainEntity.length === 0) {
          console.error('\x1b[31m%s\x1b[0m', `❌ ${relPath}: FAQPage missing "mainEntity"`);
          errors++;
        } else {
          s.mainEntity.forEach((faq, idx) => {
            if (!faq.name || !faq.acceptedAnswer || !faq.acceptedAnswer.text) {
              console.error('\x1b[31m%s\x1b[0m', `❌ ${relPath}: FAQ #${idx + 1} missing question or answer text`);
              errors++;
            }
          });
        }
      } else if (type === 'WebApplication') {
        if (!s.name || !s.url) {
          console.error('\x1b[31m%s\x1b[0m', `❌ ${relPath}: WebApplication missing "name" or "url"`);
          errors++;
        }
      }
    });
  });
});

console.log('📊 Schema Type Breakdown:');
Object.entries(typeCounts).forEach(([type, count]) => {
  console.log(`   • ${type}: ${count}`);
});

console.log('\n----------------------------------------');
if (errors === 0 && warnings === 0) {
  console.log('\x1b[32m%s\x1b[0m', `✅ 100% Passed! All ${totalSchemas} schema blocks are valid and Rich Snippet ready.`);
  console.log('----------------------------------------\n');
  process.exit(0);
} else if (errors === 0) {
  console.log('\x1b[33m%s\x1b[0m', `⚠️ Passed with ${warnings} minor warning(s). Zero critical errors.`);
  console.log('----------------------------------------\n');
  process.exit(0);
} else {
  console.error('\x1b[31m%s\x1b[0m', `❌ Failed with ${errors} critical error(s) and ${warnings} warning(s).`);
  console.log('----------------------------------------\n');
  process.exit(1);
}
