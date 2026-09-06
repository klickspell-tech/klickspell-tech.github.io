# Klickspell — Founder Manual Action Checklist

This checklist contains all external platform tasks that require your personal account logins and credentials. All code, schemas, and automation scripts have already been built and verified on the site.

---

## 1. Google Search Console (GSC)

- [ ] **Submit XML Sitemap**:
  1. Open [Google Search Console](https://search.google.com/search-console).
  2. Select property `https://klickspell.com` (or `sc-domain:klickspell.com`).
  3. Navigate to **Indexing > Sitemaps** in the left sidebar.
  4. In "Add a new sitemap", enter: `sitemap-index.xml` (or `sitemap.xml`) and click **Submit**.
  5. Confirm the status turns green ("Success").

- [ ] **Request Priority Indexing for New Pages**:
  In the top GSC search bar ("Inspect any URL in https://klickspell.com"), inspect and click **"Request Indexing"** for:
  - `https://klickspell.com/` (Home)
  - `https://klickspell.com/speed` (Interactive Speed & App Bloat Estimator)
  - `https://klickspell.com/services/shopify-speed-optimization` (Shopify Speed Service)
  - `https://klickspell.com/services/custom-shopify-development` (Custom Shopify Development)
  - `https://klickspell.com/services/headless-commerce` (Headless Commerce Service)
  - `https://klickspell.com/blog/how-we-achieved-99-pagespeed-score-case-study` (99 PageSpeed Case Study)

---

## 2. Medium.com Cross-Posting (1-Click Official Importer)

Medium closed their API to new developers and removed "Integration tokens" from account settings. However, Medium provides an official, 1-click **"Import a story"** tool that **automatically preserves your canonical link equity**:

- [ ] **Import Article to Medium**:
  1. Open Medium's official importer: **[medium.com/p/import](https://medium.com/p/import)** (or click your profile icon in the top right > **Stories > Import a story**).
  2. Paste your live Klickspell article URL:
     ```
     https://klickspell.com/blog/how-we-achieved-99-pagespeed-score-case-study
     ```
  3. Click **Import**.
  4. Medium will instantly pull the article, images, code blocks, and headline into your Medium editor.
  5. **Crucial SEO Check**: Click the **...** menu in the top right of the editor > **More settings > Advanced settings > Customize canonical link**. You will see Medium has automatically set the canonical URL to `https://klickspell.com/blog/how-we-achieved-99-pagespeed-score-case-study`.
  6. Click **Publish** to publish or schedule on Medium. All Google SEO rank and backlink authority will flow directly to Klickspell!

---

## 3. Bing Webmaster Tools & IndexNow Verification

IndexNow is automated on every `git push origin main` via `.github/workflows/deploy.yml`.

- [ ] **Verify Bing Webmaster Setup**:
  1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
  2. Click **Import from Google Search Console** (1-click verification).
  3. Under **IndexNow**, view the submitted URL history.
  4. Confirm that all 74 URLs submitted with key `fd4dfc0ead334bea837199b0e19f58aa` show **Submitted / Accepted** (HTTP 202).

---

## 4. Cal.com & Conversion Flow Verification

- [ ] **Verify Cal.com Event Link**:
  1. Visit your Cal.com dashboard at [app.cal.com](https://app.cal.com/).
  2. Confirm your event slug matches: `atul-bhatt-klickspell/30min`.
  3. Ensure Google Calendar or Outlook is synced to prevent double-booking.
  4. Verify email or WhatsApp notifications are enabled so you are instantly notified when a store founder books a call.

- [ ] **WhatsApp Business Line**:
  Confirm that `+91 92595 98769` is active on WhatsApp Business with automated quick replies or greeting messages.

---

## 5. Summary of Automated Verification Commands

You can run these anytime locally to verify the health of your site:

```bash
# Verify all 150 Schema.org blocks pass Google Rich Snippets standards:
npm run audit:schemas

# Re-submit all 74 site URLs to IndexNow (Bing, Yandex, Naver):
npm run indexnow

# Cross-post article to Dev.to with canonical backlink:
npm run devto:publish -- --slug=your-post-slug

# Cross-post article to Medium with canonical backlink:
npm run medium:publish -- --slug=your-post-slug
```
