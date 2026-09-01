import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

async function copySitemap() {
  try {
    const sitemap0 = path.join(distDir, 'sitemap-0.xml');
    const sitemapTarget = path.join(distDir, 'sitemap.xml');
    
    // Copy sitemap-0.xml (which contains all URLs) to sitemap.xml
    await fs.copyFile(sitemap0, sitemapTarget);
    console.log('✅ Generated dist/sitemap.xml from sitemap-0.xml');
  } catch (err) {
    console.warn('⚠️ Could not copy sitemap:', err.message);
  }
}

copySitemap();
