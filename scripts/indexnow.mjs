import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

export async function submitToIndexNow() {
  const HOST = 'klickspell.com';
  const KEY = '3a5be02498769c82b083584efd8c289d';
  const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
  
  try {
    const sitemapPath = path.join(distDir, 'sitemap.xml');
    let xmlContent;
    try {
      xmlContent = await fs.readFile(sitemapPath, 'utf-8');
    } catch {
      const altPath = path.join(distDir, 'sitemap-0.xml');
      xmlContent = await fs.readFile(altPath, 'utf-8');
    }

    const locRegex = /<loc>(https:\/\/klickspell\.com\/[^<]*)<\/loc>/g;
    const urlList = [];
    let match;
    while ((match = locRegex.exec(xmlContent)) !== null) {
      if (!urlList.includes(match[1])) {
        urlList.push(match[1]);
      }
    }

    if (urlList.length === 0) {
      console.log('ℹ️ IndexNow: No URLs found in sitemap to submit.');
      return;
    }

    console.log(`📡 IndexNow: Submitting ${urlList.length} URLs for ${HOST}...`);

    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList
    };

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      console.log(`✅ IndexNow: Successfully submitted ${urlList.length} URLs (Status: ${res.status})`);
    } else {
      const errText = await res.text();
      console.warn(`⚠️ IndexNow response status ${res.status}: ${errText}`);
    }
  } catch (err) {
    console.warn(`⚠️ IndexNow submission skipped: ${err.message}`);
  }
}

// If executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  submitToIndexNow();
}
