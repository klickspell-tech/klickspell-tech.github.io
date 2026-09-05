---
title: "Frappe: Production Install of Custom Apps with Docker (Easy Step-by-Step Guide)"
description: "How to safely install and deploy custom Frappe and ERPNext applications in a multi-container Docker production environment using Docker Compose and Traefik/Nginx."
pubDate: 2026-08-12T00:00:00.000Z
author: "Atul Bhatt"
tags: ["Frappe", "ERPNext", "Docker", "Production", "DevOps", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/frappe-production-install-custom-apps-docker"
readingTime: "6 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/hbSMiJTooJI" title="Frappe: Production Install of Custom Apps with Docker - Easy Guide" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

Moving from a local Frappe development environment to a live Docker production setup can feel daunting. In production, you aren't simply running `bench get-app` inside a live container—ephemeral containers mean any changes made inside an active container will disappear upon restart!

To deploy custom apps in production, your custom apps must be baked directly into the custom Docker image and orchestrated via **Docker Compose** alongside Redis, MariaDB, and Traefik reverse proxies.

Here is the straightforward, production-grade guide to deploying custom Frappe apps with Docker.

---

## The Production Docker Workflow

Unlike monolithic bench installs, production Docker deployments use separated microservice containers:
- `backend` (Gunicorn Python WSGI)
- `frontend` (Nginx serving static assets and proxying requests)
- `websocket` (Node.js socketio service)
- `queue-default`, `queue-short`, `queue-long` (Background Celery workers)
- `scheduler` (Cron tasks)

All these services share the same custom image containing your app code and static assets.

---

## Step 1: Bake Your Custom App into the Production Image

In your deployment repository:

1. Create a `compose.yaml` and reference your custom Dockerfile or pre-built image tag.
2. Ensure your custom image includes both your custom app and official apps like ERPNext or HRMS.
3. Build and tag your image locally or via GitHub Actions:
```bash
docker compose build
```

---

## Step 2: Running the Database Migrations

Once your containers are started:

```bash
docker compose up -d
```

You must run migrations to create the custom DocTypes, fields, and permissions in your MariaDB database:

```bash
docker compose exec backend bench --site yourdomain.com install-app your_custom_app
docker compose exec backend bench --site yourdomain.com migrate
```

---

## Step 3: Rebuilding Assets for Production Nginx

If your custom app includes client scripts, custom web views, or bundled Vue/React bundles:

```bash
docker compose exec backend bench build --app your_custom_app
docker compose exec backend bench --site yourdomain.com clear-cache
```

Restart the frontend and backend services to ensure Gunicorn workers reload python bytecode:

```bash
docker compose restart backend frontend websocket
```

---

## Key Production Gotchas

1. **Volume Persistence:** Never store custom app code in ephemeral root directories. Persistent files, logs, and private/public uploads must be mounted to named Docker volumes (`sites`).
2. **Database Backups:** Always run `bench --site yourdomain.com backup --with-files` before executing migrations on live production databases.
3. **Environment Variables:** Keep secret database passwords and encryption keys in `.env` files with restricted `600` file permissions.

---

## Summary

Containerizing Frappe apps for production ensures seamless horizontal scaling, instant rollbacks, and zero host dependency conflicts.

*Looking for dedicated Frappe & ERPNext cloud deployment, server migration, or custom ERP development? [Connect with the engineers at Klickspell](https://klickspell.com/#contact).*
