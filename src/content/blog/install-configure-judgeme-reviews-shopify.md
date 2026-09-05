---
title: "How to Install & Configure Judge.me in Shopify to Collect Customer Reviews"
description: "A comprehensive operational guide to setting up Judge.me Product Reviews: configuring automated review request emails, collecting photo reviews, spam filtering, and Google rich snippets."
pubDate: 2026-09-04T12:00:00.000Z
author: "Atul Bhatt"
tags: ["Shopify", "Judge.me", "Reviews", "Social Proof", "CRO", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/install-configure-judgeme-reviews-shopify"
readingTime: "6 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/sQTov44RTQU" title="Install & Configure Judge.me in Shopify – Collect & Show Customer Reviews" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

E-commerce conversion rates are directly proportional to consumer trust. Studies consistently show that products with **at least 5 verified customer reviews** experience a **270% increase in purchase likelihood** compared to products with zero reviews.

Among review platforms, **Judge.me** stands out as the highest-rated Shopify review app because it provides automated email requests, photo and video collection, and Google Rich Snippet schema even on its free plan.

While our companion guide covers [how to style Judge.me widgets with custom CSS](/blog/how-to-add-style-judgeme-widgets-shopify), this guide walks through the **backend installation, automated email configuration, and review collection strategy** to maximize verified buyer responses.

---

## Step 1: Install Judge.me & Run Initial Setup

1. Search for **Judge.me Product Reviews** in the Shopify App Store and click **Add app**.
2. Approve permissions to connect Judge.me to your orders and customer directory.
3. In the initial onboarding wizard:
   - Select your primary theme.
   - Choose your widget installation preference (select **Automatic Installation** for OS 2.0 themes).
   - Confirm your review language (e.g., English, Japanese, German).

---

## Step 2: Optimizing Review Request Email Timing

The number one reason merchants struggle to collect reviews is sending review requests too early or too late.

1. In your Shopify admin, open **Apps → Judge.me**.
2. In the top navigation, go to **Requests → Timing and Conditions**.
3. **Delivery-Based Trigger (Recommended):** If you use integrated tracking carriers (FedEx, UPS, USPS, DHL, Shiprocket), set the trigger to:
   - *Send review request: 3 to 5 days after order is DELIVERED.*
4. **Fulfillment-Based Trigger (Fallback):** If carrier tracking is manual:
   - Domestic orders: *Send 7 to 10 days after order is fulfilled.*
   - International orders: *Send 14 to 21 days after order is fulfilled.*

> **Key Rule:** Never ask for a review before the customer has opened and used the product. Requesting reviews while an order is still in transit generates negative 1-star shipping complaints instead of product praise.

---

## Step 3: Customizing the Review Request Email Template

1. Navigate to **Requests → Email Templates**.
2. Click **Edit** on the default Single Product Review template.
3. Customize the content:
   - **Sender Name:** Use your real brand name or founder's name (e.g., *Atul from Klickspell*).
   - **Subject Line:** Make it friendly and engaging rather than transactional:
     - *Bad:* "Review your order #1042"
     - *Good:* "How is your new serum feeling? We'd love your feedback!"
   - **Logo & Accent Colors:** Upload your high-resolution logo and set the star rating button color to match your brand palette.
4. **In-Email Review Form:** Ensure "In-Email Review Form" is enabled so customers can submit ratings directly inside Gmail or Apple Mail without visiting an external web page.

---

## Step 4: Incentivizing User-Generated Photos & Videos

Reviews containing real customer photos convert **3× higher** than plain text reviews.

1. Go to **Settings → Review Widget → Photos & Videos**.
2. Check **Enable photo reviews** and **Enable video reviews**.
3. Under **Rewards & Coupons**, you can configure an automated thank-you email offering a 10% or 15% discount coupon code on their next purchase once a verified photo review is approved.

---

## Step 5: Content Moderation & Spam Filtering

Protecting your store from malicious or competitor spam:

1. Navigate to **Settings → Review Curation**.
2. **Auto-publish reviews:**
   - Configure **Auto-publish only 4-star and 5-star reviews**.
   - Reviews with 1 to 3 stars will remain in your **Pending** dashboard, giving your customer support team an opportunity to contact the customer and resolve the issue before the review goes public.
3. **Profanity Filter:** Keep profanity and spam phrase filters toggled **ON**.

---

## Step 6: SEO & Google Rich Snippets

Judge.me automatically injects schema markup (`AggregateRating`) into your product pages:

1. Check **Settings → Advanced → Rich Snippets**.
2. Ensure JSON-LD rich snippets are active.
3. This allows Google search results to display golden star ratings and review counts right underneath your organic search listings, driving significantly higher click-through rates (CTR).

---

## Summary

A properly automated Judge.me setup turns every completed customer order into an ongoing engine of social proof, high organic search CTRs, and repeat orders.

*Need custom theme integration, headless review APIs, or a complete Shopify conversion rate optimization overhaul? [Schedule a consultation with Klickspell](https://klickspell.com/#contact).*
