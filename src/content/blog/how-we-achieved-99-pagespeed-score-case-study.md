---
title: "How We Achieved a 99 PageSpeed Score: A Real-World Web Performance Case Study"
description: "How we optimized Klickspell from the low 70s to a 99/100 PageSpeed score on desktop and 98/100 on mobile—covering WebP conversion, CSS inlining, self-hosted variable fonts, and eliminating forced reflows."
pubDate: 2026-09-06T00:00:00.000Z
author: "Atul Bhatt"
tags: ["Web Performance", "Core Web Vitals", "Lighthouse", "Astro", "PageSpeed"]
canonicalUrl: "https://klickspell.com/blog/how-we-achieved-99-pagespeed-score-case-study"
readingTime: "7 min read"
devtoUrl: "https://dev.to/atulbhattsystem32/how-we-achieved-a-99-pagespeed-score-a-real-world-web-performance-case-study-3e3n"
---

Most web agencies and SaaS websites suffer from a silent conversion killer: **terrible mobile performance**.

It’s surprisingly easy to get a 95+ score on desktop when running Lighthouse on an M3 MacBook over high-speed fiber. But when you switch that toggle to **Mobile**—where Google simulates an emulated budget Android device throttled to a 1.6 Mbps 4G connection with 150ms round-trip latency—the score crumbles into the 40s–70s.

When we audited the initial release of [Klickspell](https://klickspell.com), we hit a familiar plateau: our desktop score was 99, but mobile was lagging with sluggish paint times, render-blocking chains, and cumulative layout shifts.

We didn't want a "good enough" 85. We wanted **98–99 on Mobile** and **99 on Desktop** with **0 ms Total Blocking Time (TBT)** and **zero layout shift (CLS: 0)**.

Here is the exact, step-by-step engineering playbook we followed to get there.

---

## The Audit: Diagnosing the Bottlenecks

Before touching a single line of code, we ran a thorough audit using Google PageSpeed Insights and Chrome DevTools. Here were the primary culprits flagged:

1. **Massive Image Payloads:** 30 uncompressed raster graphics totaling **49.08 MB**.
2. **Render-Blocking CSS & Chained Requests:** An external stylesheet (`style.css`) caused a 606 ms round-trip delay.
3. **GitHub Pages 10-Minute Cache Warning:** Static files served with `Cache-Control: max-age=600`, triggering Lighthouse's "Use efficient cache lifetimes" penalty.
4. **Forced Reflow / Layout Thrashing:** A JavaScript breakpoint handler reading `window.innerWidth` during initial page parse.
5. **1,450 ms LCP Element Render Delay:** Above-the-fold entrance animations delaying text paint.
6. **External Font Network Round-Trips:** 67 KiB of Google Fonts across 10 weights requested over external connections.

Let's break down how we solved each of these.

---

## 1. Asset Optimization: 49 MB ➔ 3.3 MB (93.2% Reduction)

The biggest payload culprit was high-resolution PNG and JPG images in project mockups and case studies. Serving raw raster images to a mobile device on a 4G network is an immediate death sentence for page speed.

We ran a batch conversion using Google's `cwebp` encoder at quality 82:

```bash
for img in public/assets/**/*.png; do
  cwebp -q 82 "$img" -o "${img%.png}.webp"
done
```

### The Rules We Applied to Every Image:
* **Format:** Converted all 30 raster graphics to `.webp`.
* **Dimensions:** Added explicit `width` and `height` attributes to all `<img>` tags to give the browser aspect-ratio context, eliminating Cumulative Layout Shift.
* **Lazy Loading:** Added `loading="lazy"` and `decoding="async"` to every single below-the-fold image across the homepage, team page, and case studies.

**Result:** Total image weight dropped from **49.08 MB down to 3.33 MB**—a **45.75 MB saving**.

---

## 2. Inlining Critical CSS to Kill the Render-Blocking Chain

PageSpeed reported:
> *“Chained requests / Network dependency tree: ...css/style.css (606 ms)”*  
> *“Use efficient cache lifetimes — Est savings of 8 KiB (Cache TTL: 10m)”*

### The Problem:
Loading styles via an external link (`<link rel="stylesheet" href="/assets/css/style.css" />`) forces the browser to halt HTML parsing, initiate a new TCP connection, and download the stylesheet before painting the very first pixel. Furthermore, GitHub Pages enforces a default `Cache-Control: max-age=600` (10 minutes) on static files, which triggers Lighthouse caching warnings.

### The Fix:
Because our global stylesheet was compact (~9 KiB gzipped), we configured Astro to inline all CSS directly into the HTML document:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://klickspell.com',
  build: {
    format: 'file',
    inlineStylesheets: 'always' // Inlines CSS directly into <style> in <head>
  }
});
```

And in `BaseLayout.astro`, we imported the CSS directly:
```astro
---
import '../styles/style.css';
---
```

**Result:**
- **0 external render-blocking requests.** The browser receives the markup and styling in a single HTTP response.
- **Cache warning eliminated.** Because `style.css` is no longer a separate file, the 10-minute cache lifetime alert vanished.

---

## 3. Eliminating Forced Reflow / Layout Thrashing

In the diagnostic report, Lighthouse highlighted:
> *“Avoid forced reflow: BaseLayout.astro:101:23”*

When inspecting the code, we found this innocent-looking helper:

```javascript
// ❌ THE PROBLEM: Layout Thrashing in JS
function swapCTA() {
  const isMobile = window.innerWidth <= 768; // Triggers synchronous layout calculation
  document.getElementById('hero-cta-d').style.display = isMobile ? 'none' : 'inline-flex';
  document.getElementById('hero-cta-m').style.display = isMobile ? 'inline-flex' : 'none';
}
swapCTA();
window.addEventListener('resize', swapCTA);
```

### Why This Hurts:
Querying `window.innerWidth` forces the browser engine to stop and compute geometry synchronously before the DOM is even painted. When executed alongside DOM modifications (`.style.display`), it causes **layout thrashing**.

### The Fix: Pure CSS Media Queries
We deleted the entire JavaScript function and replaced it with pure CSS:

```css
/* ✅ THE SOLUTION: Zero-JS Responsive Toggle */
#hero-cta-d, #cta-d { display: inline-flex; }
#hero-cta-m, #cta-m { display: none; }

@media (max-width: 768px) {
  #hero-cta-d, #cta-d { display: none !important; }
  #hero-cta-m, #cta-m { display: inline-flex !important; }
}
```

**Result:** 0 ms JavaScript execution, zero layout recalculations, and an instant response during viewport changes.

---

## 4. Killing the 1,450 ms LCP Element Render Delay

In our mobile LCP breakdown, Lighthouse reported:
> *“Element render delay: 1,450 ms — `<p class="hero-note-mobile">`”*

### Why Was Text Rendering Delayed?
We had styled our hero section with subtle entrance animations:

```css
/* ❌ Starts at opacity: 0 with sequential delays */
.hero-headline-mobile { animation: fadeUp .7s .1s ease both; }
.hero-sub-mobile      { animation: fadeUp .7s .2s ease both; }
.hero-actions         { animation: fadeUp .7s .3s ease both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Because `fadeUp` starts at `opacity: 0` with sequential delays up to 0.4s, the throttled mobile CPU kept the text transparent or moving during the first 1.4 seconds. **Lighthouse measures LCP at the moment an element finishes animating to its final state and opacity.**

### The Fix:
On desktop, smooth animations add polish. On mobile, instant clarity matters more. We disabled entrance animations for mobile hero elements:

```css
@media (max-width: 768px) {
  .hero-headline-mobile,
  .hero-sub-mobile,
  .hero-note-mobile,
  .hero-actions {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .floating-cards { display: none !important; }
}
```

**Result:** Text paints at **100% opacity on frame zero**. Mobile LCP dropped from **2.7s down to 1.4s**.

---

## 5. Self-Hosting Fonts: Erasing Third-Party Latency

Our initial setup loaded typography from Google Fonts:
```html
<!-- 3 external requests, 2 DNS lookups, 67 KiB payload -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" />
```

On slow 4G mobile connections, negotiating SSL handshakes with `fonts.googleapis.com` and `fonts.gstatic.com` and downloading 10 separate font weights consumed **~1.8 seconds**.

### The Solution:
1. **Switch to a Variable Font:** Downloaded a single `manrope-variable.woff2` (just **24 KB**) that natively supports every weight from 200 to 800.
2. **Self-Host Everything:** Placed the font files in `/assets/fonts/` directly on our own domain.
3. **Preload Critical Typography:**

```html
<!-- BaseLayout.astro -->
<link rel="preload" href="/assets/fonts/manrope-variable.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/assets/fonts/instrument-serif-regular.woff2" as="font" type="font/woff2" crossorigin />
```

And in CSS:
```css
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url('/assets/fonts/manrope-variable.woff2') format('woff2');
}
```

**Result:**
- **0 third parties** in the entire Lighthouse network tab.
- First Contentful Paint (FCP) dropped from **2.7s down to 1.1s**.

---

## 6. Zero JavaScript on the Mobile Main Thread

Modern browsers on touch devices already have hardware-accelerated 120Hz momentum scrolling. Loading smooth-scrolling libraries (like Lenis) or custom cursor tracking loops on mobile achieves nothing while draining battery and hogging the main thread.

We refactored our client scripts to run **strictly on desktop devices with fine pointers**:

```javascript
// Run custom cursor and Lenis only on desktop mouse devices
if (window.matchMedia('(pointer: fine)').matches) {
  import('/assets/js/lenis.mjs').then(({ default: Lenis }) => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    // ...
  });
} else {
  // Pure native scroll listener for mobile
  window.addEventListener('scroll', () => {
    document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}
```

Additionally, we deferred our third-party Cal.com scheduling embed until first user interaction (`scroll`, `touchstart`, or idle):

```javascript
function loadCal() {
  if (window._calLoaded) return;
  window._calLoaded = true;
  // Initialize embed script...
}
['scroll', 'touchstart', 'mousemove', 'click'].forEach(evt => 
  window.addEventListener(evt, loadCal, { once: true, passive: true })
);
```

**Result:** **Total Blocking Time (TBT) dropped to a flat 0 ms**.

---

## The Final Numbers

| Metric | Before Optimization | After Optimization | Improvement |
| :--- | :---: | :---: | :---: |
| **Mobile Performance** | 91 / 100 | **98 / 100** | **+7 Points** |
| **Desktop Performance** | 99 / 100 | **99 / 100** | **Rock Solid** |
| **First Contentful Paint (Mobile)** | 2.7 s | **1.1 s** | **59% Faster** |
| **Largest Contentful Paint (Mobile)** | 2.7 s | **1.4 s** | **48% Faster** |
| **Total Blocking Time (TBT)** | 54 ms | **0 ms** | **100% Non-blocking** |
| **Cumulative Layout Shift (CLS)** | 0.003 | **0** | **Zero Shift** |
| **Total Asset Payload** | ~50 MB | **~3.4 MB** | **93% Reduction** |
| **Third-Party Requests on Load** | 4 | **0** | **Completely Eliminated** |

---

## Key Lessons for Web Engineers

1. **Test mobile first and believe the throttling:** Desktop scores are forgiving. If your site doesn't load fast on an emulated 4G budget device, your real-world mobile visitors are leaving.
2. **Inline small CSS:** If your stylesheet is under 15–20 KB gzipped, inlining eliminates an entire round-trip network waterfall.
3. **Beware of entrance animations:** Any CSS animation starting with `opacity: 0` or moving layout elements above the fold will artificially inflate your LCP time.
4. **Self-host your fonts:** Google Fonts is great for rapid prototyping, but self-hosting variable `.woff2` files eliminates external handshakes and saves 300–800ms.
5. **Keep mobile JS-free:** If an interaction (like smooth scrolling or mouse rings) doesn't apply to touchscreens, don't ship a single byte of it to mobile devices.

Performance isn't an afterthought or a plugin you toggle on at the end—it’s an engineering discipline baked into every component, style, and asset.

---

### Audit Your Website or Store Speed

Want to inspect your mobile Core Web Vitals under realistic 4G throttling and identify third-party script bloat? Test your live URL using our free [Website Speed & App Bloat Estimator](/speed).

If you manage a high-traffic Shopify store or marketing website and want a guaranteed 90+ mobile PageSpeed score without sacrificing your analytics, pixels, or conversion apps, explore our [Shopify Speed Optimization Sprint](/services/shopify-speed-optimization) or [schedule a discovery call](https://cal.com/atul-bhatt-klickspell/30min).
