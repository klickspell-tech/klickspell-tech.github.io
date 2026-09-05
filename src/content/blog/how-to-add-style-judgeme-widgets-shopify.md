---
title: "How to Add and Style Judge.me Review Widgets in Shopify (OS 2.0 Guide)"
description: "A comprehensive guide on installing Judge.me reviews, embedding App Blocks in Shopify Online Store 2.0 themes, and customizing CSS styles to match your luxury store aesthetic."
pubDate: 2026-08-22T00:00:00.000Z
author: "Atul Bhatt"
tags: ["Shopify", "Judge.me", "Reviews", "Liquid", "CSS", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/how-to-add-style-judgeme-widgets-shopify"
readingTime: "6 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/c5eGyQqOBbg" title="How to Add Judge.me widgets and style them in Shopify" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

Customer reviews and social proof are the lifeblood of e-commerce conversions. Among all Shopify review apps, **Judge.me** remains an industry favorite due to its generous free tier, fast loading speeds, and robust rich-snippet schema support.

However, out-of-the-box review widgets often look generic: bright yellow stars, clashing default fonts, and standard padding that can disrupt a carefully crafted custom Shopify theme.

In this guide, we cover how to install Judge.me using **Shopify Online Store 2.0 App Blocks**, place widgets in high-converting positions, and apply clean CSS overrides to make them look completely bespoke.

---

## The Three Essential Judge.me Widgets

Before touching any code or theme settings, know which widgets drive the highest conversion lift:

1. **Star Rating Badge (Preview Badge):** Placed right under the product title on product pages and on collection grid cards. Builds instant credibility before the customer even scrolls.
2. **Core Review Widget:** The main container showcasing customer ratings, verified buyer badges, user-submitted photos, and review text.
3. **Reviews Carousel / Verified Badge:** Displayed on the homepage or dedicated social proof landing pages to highlight standout feedback.

---

## Step 1: Installing Judge.me & App Embed Activation

1. Install **Judge.me Product Reviews** from the Shopify App Store.
2. Follow the initial onboarding flow to configure your review collection email schedule and company branding.
3. Open **Online Store → Themes → Customize** on your active theme.
4. In the left-hand sidebar, click the **App Embeds** tab (the 4th icon from top).
5. Ensure **Judge.me Core** is toggled **ON**. This loads the base review scripts and styles asynchronously without blocking your page's First Contentful Paint.
6. Click **Save** in the top right corner.

---

## Step 2: Adding App Blocks to OS 2.0 Templates

With Shopify Online Store 2.0 (JSON templates), you no longer need to copy and paste brittle Liquid snippets into `product.liquid` or `main-product.liquid`.

### Adding the Star Rating Badge
1. In the theme customizer top dropdown, select **Products → Default product**.
2. Under the **Product Information** section in the left panel, click **Add block**.
3. Under the **Apps** category, select **Star Rating (Judge.me)**.
4. Drag and reposition the block directly beneath the **Product Title** or **Price**.

### Adding the Full Review Section
1. Scroll down beneath the Product Information section.
2. Click **Add section** → switch to **Apps** → select **Review Widget (Judge.me)**.
3. Reposition the section above or below your related products/cross-sells.

---

## Step 3: Customizing Widgets in Judge.me Dashboard

Before writing custom CSS, tweak the native settings inside the Judge.me app dashboard:

1. Go to **Apps → Judge.me → Settings → Review Widget**.
2. **Star Color:** Replace default yellow with your brand's accent color (e.g., `#163860` for deep indigo, `#C5A059` for champagne gold, or `#111111` for monochrome luxury).
3. **Form Fields:** Enable custom questions (e.g., *Fit*, *Skin Type*, *Quality rating*) to enrich your customer feedback.
4. **Photos & Videos:** Enable user-generated photo uploads to supercharge review authenticity.

---

## Step 4: Styling Judge.me with Custom CSS Overrides

To achieve a true luxury look that seamlessly matches your brand typography, add scoped CSS overrides to your theme's custom CSS file (e.g., `theme.css` or the Custom CSS block in the theme editor):

```css
/* Custom typography & color refinement for Judge.me */
.jdgm-widget {
  font-family: inherit !important;
  color: var(--text-color, #1a1a1a) !important;
}

/* Elegant star rating colors */
.jdgm-star {
  color: #C5A059 !important; /* Champagne gold */
  font-size: 15px !important;
}

/* Luxury button styling for "Write a Review" */
.jdgm-write-rev-link {
  background: transparent !important;
  border: 1px solid #1a1a1a !important;
  color: #1a1a1a !important;
  border-radius: 4px !important;
  padding: 10px 24px !important;
  font-weight: 500 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  font-size: 12px !important;
  transition: all 0.25s ease !important;
}

.jdgm-write-rev-link:hover {
  background: #1a1a1a !important;
  color: #ffffff !important;
}

/* Refined review borders and card spacing */
.jdgm-rev {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08) !important;
  padding: 1.75rem 0 !important;
}

/* Verified Buyer badge styling */
.jdgm-rev__buyer-badge {
  background-color: #f4f4f4 !important;
  color: #4a4a4a !important;
  font-size: 11px !important;
  padding: 2px 8px !important;
  border-radius: 100px !important;
  letter-spacing: 0.03em !important;
}
```

---

## Performance & SEO Considerations

- **Rich Snippets (JSON-LD):** Judge.me automatically outputs `AggregateRating` structured data. Ensure your theme doesn't duplicate `product` microdata to avoid Google Search Console warnings.
- **Lazy Loading:** Judge.me scripts load asynchronously, preventing Core Web Vitals penalties on initial Largest Contentful Paint (LCP).

---

## Summary

When styled with precision, Judge.me widgets look like an organic extension of a premier e-commerce flagship rather than a third-party add-on.

*Looking to redesign your Shopify product pages, implement custom review carousels, or optimize store conversion rates? [Get in touch with Klickspell](https://klickspell.com/#contact) to engineer a high-performing storefront.*
