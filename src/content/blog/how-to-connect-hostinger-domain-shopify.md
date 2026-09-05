---
title: "How to Connect a Hostinger Domain to Shopify (DNS Setup Guide)"
description: "A step-by-step technical guide to pointing your custom Hostinger domain to Shopify: configuring A records, CNAME records, SSL certificate verification, and avoiding propagation delays."
pubDate: 2026-09-02T00:00:00.000Z
author: "Atul Bhatt"
tags: ["Shopify", "DNS", "Hostinger", "Domains", "Store Setup", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/how-to-connect-hostinger-domain-shopify"
readingTime: "5 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/GX7S3_2dXwA" title="Adding Domain To Shopify from Hostinger" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

One of the most exciting milestones when launching a new Shopify store is replacing your temporary `yourstore.myshopify.com` URL with your branded custom domain (e.g., `yourbrand.com`).

**Hostinger** is one of the most widely used and budget-friendly domain registrars globally. However, if you have never configured Domain Name System (DNS) records before, entering the wrong IP address or CNAME record can cause frustrating "Domain Not Found" or "SSL Pending" errors.

In this guide, we walk through the exact DNS configuration required to point any Hostinger domain to Shopify cleanly in under 5 minutes.

---

## The Two Core DNS Records Shopify Requires

To route incoming web traffic and generate free automated SSL certificates, Shopify requires two specific DNS records:

1. **A Record (Root / Apex Domain):** Points your naked domain (`yourbrand.com`) to Shopify's global edge load balancer IP address:
   - **Host / Name:** `@`
   - **Points to / Value:** `23.227.38.65`
   - **TTL:** 300 seconds (or Default)

2. **CNAME Record (Subdomain):** Points your `www` subdomain (`www.yourbrand.com`) to Shopify's hosting endpoint:
   - **Host / Name:** `www`
   - **Points to / Value:** `shops.myshopify.com`
   - **TTL:** 300 seconds (or Default)

---

## Step 1: Add Your Domain in Shopify Admin

1. Open your **Shopify Admin** dashboard.
2. Click **Settings** (gear icon in the bottom-left corner) → **Domains**.
3. Click **Connect existing domain**.
4. Enter your custom domain name (e.g., `yourbrand.com`) without `https://` or `www`.
5. Click **Next**.

Shopify will display the required A Record and CNAME target values. Keep this tab open.

---

## Step 2: Configure DNS Records in Hostinger hPanel

1. Open a new tab and log into your **Hostinger Account** ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Under the **Domains** section, find your domain and click **Manage**.
3. In the left navigation sidebar, click **DNS / Nameservers**.

### A. Updating the A Record
1. In the **DNS Records** table, look for an existing record with **Type:** `A` and **Name:** `@`.
2. Click **Edit** (or delete it and create a new one).
3. Set the target IP address to:
   ```
   23.227.38.65
   ```
4. Click **Update** (or **Save**).

> **Important:** Ensure there is **only ONE** A record pointing to `@`. If you leave an old IP address from Hostinger's parking page or previous hosting, it will create an IP conflict and Shopify won't verify.

### B. Updating the CNAME Record
1. In the DNS Records list, look for an existing record with **Type:** `CNAME` and **Name:** `www`.
2. Edit the target value to point to:
   ```
   shops.myshopify.com
   ```
3. Set TTL to `300` or `14400` and click **Update**.

---

## Step 3: Verify the Connection in Shopify

1. Switch back to your **Shopify Admin → Settings → Domains** tab.
2. Click the green **Verify connection** button.
3. Shopify will query the global DNS servers:
   - If configured correctly, the status changes to **Connected**.
   - If it displays *Action Required*, wait 5 to 15 minutes for worldwide DNS propagation and click verify again.

---

## Step 4: Primary Domain & SSL Certificate Activation

Once verified:
1. Under **Primary domain**, ensure `yourbrand.com` (or `www.yourbrand.com` according to your preference) is set as the primary domain with **Domain redirection enabled**. This ensures all variations seamlessly route to one canonical URL.
2. **SSL Certificate Provisioning:** Shopify will automatically issue a free Let's Encrypt / Cloudflare SSL certificate. Initially, it may show **"SSL Pending"**. This is completely normal and typically resolves to **"SSL Available" (HTTPS)** within 1 to 4 hours.

---

## Troubleshooting Common Issues

- **"SSL Pending" for more than 24 hours:** Check your Hostinger DNS table for extra `CAA` records or duplicate `A` records blocking certificate issuance. Remove conflicting records and re-verify.
- **Email Stops Working:** Connecting your domain to Shopify only touches your web traffic (`A` and `CNAME` records). Do **not** modify or delete your `MX` records (Google Workspace, Zoho, or Titan Mail), or your business email will go down.

---

## Summary

Pointing Hostinger to Shopify requires only two records, but getting them right ensures sub-second edge routing and seamless SSL encryption from day one.

*Need help migrating complex corporate domains, configuring subfolder multi-regional routing, or custom DNS setups? [Book a discovery consultation with Klickspell](https://klickspell.com/#contact).*
