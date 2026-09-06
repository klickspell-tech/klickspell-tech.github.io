# ⚡ The Complete Shopify Speed & Core Web Vitals Checklist (2026)

[![PageSpeed](https://img.shields.io/badge/PageSpeed-99%2F100-success?style=flat-square)](https://klickspell.com/speed)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](README.md)
[![Studio](https://img.shields.io/badge/Maintained%20By-Klickspell%20Studio-3A5BE0?style=flat-square)](https://klickspell.com)

An exhaustive, engineering-backed checklist to achieve sub-second mobile load times and 90+ Core Web Vitals scores on Shopify without breaking your marketing pixels or tracking apps.

Curated and maintained by **[Atul Bhatt](https://in.linkedin.com/in/mratulbhatt)** & the engineering team at **[Klickspell](https://klickspell.com)**.

---

## 🛠️ Free Interactive Diagnostic
Before optimizing manually, calculate your store's estimated app penalty and JavaScript weight using our free interactive tool:  
👉 **[Shopify Speed & App Bloat Estimator (`klickspell.com/speed`)](https://klickspell.com/speed)**

---

## 📋 Table of Contents
1. [The Real Culprits: Why Shopify Stores Crawl on Mobile](#1-the-real-culprits)
2. [Level 1: Images & Media (Easy Wins)](#level-1-images--media)
3. [Level 2: Typography & Font Delivery](#level-2-typography--font-delivery)
4. [Level 3: Purging "Zombie" App Code](#level-3-purging-zombie-app-code)
5. [Level 4: Conditional Script Scheduling (Advanced)](#level-4-conditional-script-scheduling)
6. [Level 5: Liquid Rendering & Theme DOM Size](#level-5-liquid-rendering--theme-dom-size)
7. [🚨 Beware of "Fake 90+ Score" Cloaking Scams](#-beware-of-fake-90-score-cloaking-scams)

---

## 1. The Real Culprits
Most Shopify store owners believe images are their main bottleneck. In reality, on 4G mobile devices:
- **70% of latency** is caused by third-party app JavaScript execution blocking the main browser thread.
- **20% of latency** is caused by unoptimized or un-preloaded web fonts triggering layout shifts (CLS) and FOIT (Flash of Invisible Text).
- **10% of latency** is caused by uncompressed hero images.

---

## Level 1: Images & Media
- [ ] **Native WebP Conversion**: Ensure all product and banner images use Shopify's built-in format conversion: `{{ image | image_url: width: 1200, format: 'webp' }}`.
- [ ] **Explicit Dimensions**: Every `<img>` tag must have explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
- [ ] **Eager Loading on Hero (LCP)**: The first visible banner or hero slide MUST have `loading="eager"` and `fetchpriority="high"`.
- [ ] **Lazy Loading on Everything Else**: All below-the-fold images (featured collections, footer, reviews) must have `loading="lazy"` and `decoding="async"`.
- [ ] **Replace Heavy GIFs with MP4/WebM**: A 15MB GIF can be replaced with a 400KB muted, autoplaying, looping HTML5 `<video>`.

---

## Level 2: Typography & Font Delivery
- [ ] **Limit Font Weights**: Never load more than 2 font families, and stick to a maximum of 2–3 weights (e.g. Regular 400 and Bold 700).
- [ ] **Self-Host Variable Fonts**: Avoid external calls to `fonts.googleapis.com` or Typekit. Self-host WOFF2 variable fonts directly inside `assets/`.
- [ ] **Preload Key Fonts**: Preload your primary headline font in `theme.liquid`:
  ```html
  <link rel="preload" href="{{ 'custom-font.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
  ```
- [ ] **Enforce `font-display: swap`**: Prevent blank text rendering while fonts download.

---

## Level 3: Purging "Zombie" App Code
When you delete an app in Shopify Admin, **its injected Liquid code and asset tags stay in your theme**.

- [ ] **Check 404/403 Requests**: Open Chrome DevTools > Network tab (Fast 4G, Disable cache) and look for failed requests to old apps you no longer use.
- [ ] **Clean `layout/theme.liquid`**: Search for old tracking scripts, pixel tags, and snippet calls (`{% include 'old-app' %}`) and delete them.
- [ ] **Purge `snippets/`**: Look for orphaned `.liquid` files named after cancelled apps (e.g., `snippets/bold-common.liquid`, `snippets/privy.liquid`).
- [ ] **Read the full guide**: [How to Find & Remove Zombie Shopify App Code](https://klickspell.com/blog/how-to-remove-zombie-shopify-app-code).

---

## Level 4: Conditional Script Scheduling
Never load every app on every page!
- [ ] **Product Reviews**: Load review widgets (Judge.me, Yotpo, Okendo) **only on product pages** (`{% if template contains 'product' %}`).
- [ ] **Customer Support Chat**: Delay customer chat widgets (Gorgias, Zendesk, Tidio) until the user interacts (first scroll, click, or keypress), saving 600ms+ of main-thread work on initial page load.
- [ ] **Event-Driven Tracking**: Ensure marketing pixels (Meta, TikTok, Pinterest) are executed asynchronously and don't block the Critical Rendering Path.

---

## Level 5: Liquid Rendering & Theme DOM Size
- [ ] **Avoid Deep Nested Loops**: Liquid loops (`{% for item in collection.products %}`) that query product metafields can delay Server Response Time (TTFB).
- [ ] **Keep DOM Nodes Below 1,500**: Heavy Mega Menus and deep accordion structures bloat the DOM. Simplify mobile menu structures.
- [ ] **Replace Page Builders with Native Sections**: Eliminate heavy frameworks like PageFly or Shogun by building native Shopify 2.0 sections with clean CSS Grid and vanilla JavaScript.

---

## 🚨 Beware of "Fake 90+ Score" Cloaking Scams
Be extremely cautious of low-cost optimization gigs on Fiverr or Upwork promising *"90+ PageSpeed in 24 hours"*.

### How the Scam Works:
Untrustworthy freelancers often inject bot-sniffing scripts:
```javascript
if (navigator.userAgent.includes('Chrome-Lighthouse')) {
  // Prevent all marketing pixels, apps, and analytics from loading
}
```
While this tricks Google's synthetic bot into awarding a 95+ score, **real human shoppers still experience 6+ seconds of lag**, tracking pixels break, and your Google Search Console field data (CrUX) will continue to fail.

👉 **[Read our detailed breakdown of real Core Web Vitals vs. cloaking scams](https://klickspell.com/services/shopify-speed-optimization)**.

---

## 🤝 Need Help Optimizing Your Store?
If you want guaranteed 90+ Mobile Core Web Vitals engineered cleanly without breaking your marketing stack:
- 🌐 Visit: [klickspell.com](https://klickspell.com)
- ⚡ Try our Speed Tool: [klickspell.com/speed](https://klickspell.com/speed)
- 📅 Book a Diagnostic Audit with Lead Engineer Atul Bhatt: [cal.com/atul-bhatt-klickspell/30min](https://cal.com/atul-bhatt-klickspell/30min)
- 💬 Direct WhatsApp: [+91 92595 98769](https://wa.me/919259598769)

---

## 📄 License
MIT License. Free to use, share, and contribute!
