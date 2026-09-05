---
title: "Frappe Docker: Custom Apps Installation Using Quick Build Image"
description: "A complete step-by-step developer guide on building and installing custom Frappe and ERPNext apps using the official frappe_docker quick build image in 2025/2026."
pubDate: 2026-08-10T00:00:00.000Z
author: "Atul Bhatt"
tags: ["Frappe", "ERPNext", "Docker", "DevOps", "Python", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/frappe-docker-custom-apps-quick-build"
readingTime: "6 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/FWGWKC_rZeI" title="Frappe Docker Custom Apps Installation using Quick Build Image | 2025" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

Running Frappe and ERPNext inside Docker is the gold standard for reliable, reproducible deployments. 

However, one of the biggest friction points developers face is **installing custom Frappe apps** on top of the base image. Traditional multi-stage builds often take 15 to 25 minutes to recompile assets and resolve Python wheels every time you add or update an internal app.

With the **Frappe Docker Quick Build Image**, Frappe introduced a streamlined build pipeline that slashes build times down to minutes by leveraging pre-compiled assets.

Here is the exact step-by-step guide to installing custom apps using the Quick Build image.

---

## Why Use the Quick Build Image?

1. **Drastically Faster CI/CD Builds:** Standard builds re-download base node dependencies and re-run yarn compilation from scratch. The quick build image pre-packages frontend tooling.
2. **Deterministic Python Dependencies:** Avoids broken pip sub-dependency conflicts across disparate host machines.
3. **Seamless Site Migration:** Produces production-ready OCI-compliant container images ready to push to GitHub Container Registry (GHCR) or Docker Hub.

---

## Step 1: Clone the Official frappe_docker Repository

Start by cloning the official repository:

```bash
git clone https://github.com/frappe/frappe_docker.git
cd frappe_docker
```

---

## Step 2: Configure `apps.json` for Your Custom Apps

The quick build process relies on a JSON manifest named `apps.json` that defines the custom app git repositories, branches, and build arguments.

Create or edit `apps.json` in the build directory:

```json
[
  {
    "url": "https://github.com/frappe/erpnext",
    "branch": "version-15"
  },
  {
    "url": "https://github.com/your-org/your_custom_app",
    "branch": "main"
  },
  {
    "url": "https://github.com/frappe/hrms",
    "branch": "version-15"
  }
]
```

> **Private Repositories:** If your custom app lives in a private GitHub repo, encode your GitHub Personal Access Token (PAT) into the URL:
> `https://<TOKEN>@github.com/your-org/your_custom_app.git`

---

## Step 3: Trigger the Quick Build Command

Run the build command targeting the quick build image target:

```bash
export APPS_JSON_BASE64=$(base64 -w 0 apps.json)

docker build \
  --build-arg=FRAPPE_PATH=https://github.com/frappe/frappe \
  --build-arg=FRAPPE_BRANCH=version-15 \
  --build-arg=PYTHON_VERSION=3.11.9 \
  --build-arg=NODE_VERSION=18.20.2 \
  --build-arg=APPS_JSON_BASE64=$APPS_JSON_BASE64 \
  --tag my-custom-frappe:version-15 \
  --file images/custom/Containerfile .
```

*Note: On macOS, use `base64 -b 0` or `base64` without flags.*

---

## Step 4: Installing the App onto Your Site

Once the container image is built and running inside your `docker-compose.yml`:

1. Exec into the backend container:
```bash
docker compose exec backend bash
```
2. Install your custom app onto your active tenant site:
```bash
bench --site frontend.localhost install-app your_custom_app
bench --site frontend.localhost migrate
```
3. Clear cache and reload:
```bash
bench --site frontend.localhost clear-cache
```

---

## Summary

The Quick Build image eliminates the headache of containerized Frappe customization, delivering lightning-fast builds and predictable production deployments.

*Need enterprise Frappe/ERPNext custom app engineering, Docker orchestration, or workflow automations? [Schedule a consultation with Klickspell](https://klickspell.com/#contact).*
