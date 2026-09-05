---
title: "How to Add Products, Create Variants & Set Compare-At Prices in Shopify"
description: "A complete walkthrough of Shopify product catalog management: creating multi-attribute variants, setting up compare-at sale pricing, inventory tracking, and SEO title tags."
pubDate: 2026-09-01T00:00:00.000Z
author: "Atul Bhatt"
tags: ["Shopify", "E-Commerce", "Product Management", "Pricing", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/shopify-add-products-variants-compare-at-prices"
readingTime: "6 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/0EBASbgfVUg" title="How to Add Products, Create Variants & Set Compare-At Prices in Shopify | Full Tutorial" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

Adding products to Shopify sounds straightforward until you encounter the real-world complexities of e-commerce: **multi-dimensional variants** (size, color, material), **inventory tracking**, **SKU naming conventions**, and setting up **compare-at prices** to trigger sale badges without breaking your analytics.

Whether you are launching your first store or onboarding new catalog merchandise, this tutorial breaks down the exact workflow to create clean, high-converting product pages in Shopify.

---

## Step 1: Add a New Product and Essential Details

1. In your Shopify admin, navigate to **Products** and click **Add product**.
2. **Title:** Use clear, keyword-rich product names (e.g., *Men's Organic Pima Cotton Crewneck* instead of simply *T-Shirt 01*).
3. **Description:** Write compelling product copy structured with scannable headers:
   - *Key Benefits & Materials*
   - *Sizing & Fit Advice*
   - *Care Instructions*
4. **Media:** Upload high-resolution images (recommended minimum: 2048 × 2048 px) or 3D models/videos. Ensure the primary image has a clean, consistent background.

---

## Step 2: Understanding "Price" vs. "Compare-At Price"

One of the most frequent points of confusion for new Shopify store owners is the difference between these two fields:

- **Price:** The actual amount the customer pays at checkout right now.
- **Compare-At Price:** The original, higher retail price before the discount.

### How to Trigger the Sale Badge:
For Shopify themes to automatically display a "Sale" badge or strike-through price:
$$\text{Compare-At Price} > \text{Price}$$

*Example:*
- **Price:** `$38.00`
- **Compare-At Price:** `$54.00`
- **Result:** The storefront displays ~~$54.00~~ **$38.00** with an eye-catching **Save $16 (30% OFF)** badge.

> **Caution:** Never set the *Price* higher than the *Compare-At Price*, or Shopify will hide both badges and your profit calculation reports will become skewed.

---

## Step 3: Setting Up Multi-Option Product Variants

If your product comes in different sizes, colors, flavors, or finishes:

1. Scroll down to the **Variants** section and click **+ Add options like size or color**.
2. **Option 1 (e.g., Size):** Enter option values like *Small*, *Medium*, *Large*, *XL*.
3. **Option 2 (e.g., Color):** Enter color names like *Charcoal*, *Navy*, *Oatmeal*.
4. Shopify automatically creates a matrix grid of all combined variants (e.g., *Small / Charcoal*, *Small / Navy*, etc.).

---

## Step 4: Assigning Images and SKUs to Each Variant

A common conversion killer is when a customer selects "Navy" on the product page, but the main image remains showing "Charcoal".

1. In the **Variant Table**, click the image icon next to each variant.
2. Select the specific photo corresponding to that exact color/style.
3. **SKU (Stock Keeping Unit):** Assign a structured SKU (e.g., `TSH-ORG-NVY-S`). Clean SKUs simplify warehouse fulfillment and barcode scanning.
4. **Inventory Quantity:** Enter current on-hand stock for each variant. Ensure **"Track quantity"** is checked.

---

## Step 5: Search Engine Listing (SEO) Optimization

At the bottom of the product page, locate **Search engine listing**:
1. Click **Edit**.
2. **Page Title:** Keep under 60 characters and include your primary keyword + brand name.
3. **Meta Description:** Keep under 155 characters with a compelling call-to-action (e.g., *"Crafted from 100% organic cotton with a tailored fit. Enjoy free shipping on orders over $50."*).
4. **URL Handle:** Keep URLs clean and hyphenated (e.g., `/products/mens-organic-cotton-crewneck`).

---

## Summary

Taking the extra two minutes to assign variant imagery, set accurate weights, and format compare-at pricing properly turns a basic product listing into an automated conversion engine.

*Need custom variant swatch selectors, sticky Add-to-Cart bars, or automated bulk inventory integrations? [Connect with the Shopify engineers at Klickspell](https://klickspell.com/#contact).*
