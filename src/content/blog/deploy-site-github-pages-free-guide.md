---
title: "How to Deploy Your Website to GitHub Pages for Free (2025/2026 Guide)"
description: "A complete step-by-step guide to hosting HTML/CSS/JS websites and modern single-page applications for free on GitHub Pages with custom domains and SSL."
pubDate: 2026-09-03T18:00:00.000Z
author: "Atul Bhatt"
tags: ["GitHub", "Hosting", "Web Development", "DevOps", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/deploy-site-github-pages-free-guide"
readingTime: "5 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/XLQaKc-Ph8U" title="How to deploy your Site to Github Pages For Free (2025)" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

You built a personal portfolio, landing page, or frontend web project, and now you want to share a live URL with clients, friends, or hiring managers.

Instead of paying $5 to $15 a month for shared web hosting, **GitHub Pages** lets you host static websites (HTML, CSS, JavaScript, Astro, React, or Vue builds) **100% free forever** directly from your GitHub repository.

In this tutorial, we cover how to publish your site to GitHub Pages in under 3 minutes, plus how to attach a custom domain.

---

## Method 1: The Quick "main branch / root" Method (For Pure HTML/CSS/JS)

If your repository contains an `index.html` file right at the root:

1. Open your repository on **GitHub.com**.
2. Go to **Settings** (tab at the top right of your repository).
3. In the left navigation sidebar under *Code and automation*, click **Pages**.
4. Under **Build and deployment → Source**:
   - Select **Deploy from a branch**.
   - **Branch:** Select `main` (or `master`).
   - **Folder:** Select `/ (root)`.
5. Click **Save**.

Within 60 to 90 seconds, GitHub's automated bot will build and publish your site at:
`https://your-username.github.io/your-repository-name/`

---

## Method 2: Deploying from a Build Output Directory (e.g. `dist` or `/docs`)

If you use a build tool like Vite, Astro, or React:

### Option A: The `/docs` Folder
1. Configure your build tool to output to `docs/` instead of `dist/` (e.g., in `vite.config.js`: `build: { outDir: 'docs' }`).
2. Run `npm run build` and push the `docs/` folder to GitHub.
3. In **Settings → Pages**, choose branch: `main` and folder: `/docs`.

### Option B: The `gh-pages` Branch (Automated)
Install the standard `gh-pages` utility:
```bash
npm install --save-dev gh-pages
```

Add deploy scripts to your `package.json`:
```json
"scripts": {
  "build": "vite build",
  "deploy": "gh-pages -d dist"
}
```

Run:
```bash
npm run deploy
```
This automatically compiles your build and pushes the static assets to an isolated `gh-pages` branch. In **Settings → Pages**, simply select the `gh-pages` branch!

---

## Step 3: Connecting a Custom Domain (e.g., `yourname.com`)

Want to use your own domain instead of `github.io`?

1. In **Settings → Pages**, scroll to **Custom domain**.
2. Type your domain (e.g., `portfolio.yourbrand.com` or `yourbrand.com`) and click **Save**.
3. In your DNS manager (Cloudflare, GoDaddy, Hostinger, Namecheap):
   - **For Subdomains (e.g., `portfolio.brand.com`):** Add a `CNAME` record pointing to `your-username.github.io`.
   - **For Apex Domains (e.g., `brand.com`):** Add 4 `A` records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. Back on GitHub Pages settings, check **"Enforce HTTPS"** to ensure automatic free SSL encryption.

---

## Summary

GitHub Pages is the fastest, zero-cost method to get frontend code live on the web with enterprise-grade CDN distribution.

*Need custom high-converting landing pages, Webflow builds, or bespoke web applications? [Explore Klickspell's services](https://klickspell.com/#services).*
