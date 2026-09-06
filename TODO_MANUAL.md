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

## 2. Medium.com Cross-Posting Setup

All 17 articles on Dev.to already point canonical equity to Klickspell. To syndicate to Medium with canonical backlinks:

- [ ] **Generate Medium Integration Token**:
  1. Log into your [Medium.com](https://medium.com/) account.
  2. Visit **Settings > Security and apps** (`https://medium.com/me/settings/security`).
  3. Scroll to the **Integration tokens** section.
  4. Enter description: `Klickspell Site Syndication` and click **Get token**.
  5. Copy the generated token string.

- [ ] **Add to Local `.env`**:
  Open your project's `.env` file (which is gitignored) and add:
  ```bash
  MEDIUM_INTEGRATION_TOKEN=your_token_here
  ```

- [ ] **Publish Articles to Medium**:
  Run the automated syndication script anytime:
  ```bash
  # Creates a draft in your Medium account with canonical URL pointing to Klickspell:
  npm run medium:publish -- --slug=how-we-achieved-99-pagespeed-score-case-study

  # Or publish immediately to public:
  npm run medium:publish -- --slug=how-we-achieved-99-pagespeed-score-case-study --public
  ```

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
