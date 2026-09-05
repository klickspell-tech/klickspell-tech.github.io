---
title: "How to Install ERPNext on ARM64 (Apple Silicon & Ampere) Using Docker"
description: "A complete step-by-step guide to installing and running ERPNext on ARM64 / aarch64 architecture (Apple M1/M2/M3/M4 Macs and Oracle Ampere VPS) using Docker."
pubDate: 2026-08-14T00:00:00.000Z
author: "Atul Bhatt"
tags: ["ERPNext", "Frappe", "ARM64", "Docker", "Apple Silicon", "DevOps", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/install-erpnext-arm64-docker"
readingTime: "6 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/lBECptxlMPY" title="How to Install ERPNext on ARM arch64 using Docker" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

ARM64 architecture (`aarch64`) has taken over modern computing—from developer laptops powered by **Apple Silicon (M1, M2, M3, M4)** to cost-effective cloud servers like **Oracle Cloud Ampere A1** and **AWS Graviton**.

Historically, installing ERPNext on ARM64 chips was frustrating: binary Python wheel incompatibilities, node compilation failures, and MariaDB architecture mismatch errors.

Fortunately, with official multi-arch Docker images, running ERPNext natively on ARM64 is now smooth and blazing fast without emulation overhead. Here is the full guide.

---

## Why Native ARM64 Beats x86 Emulation (Rosetta)

Running x86 Docker images through Rosetta or QEMU translation causes:
- 40% to 60% slower bench command execution.
- High CPU usage and battery drain.
- Random segfaults during Node/wkhtmltopdf compilation.

Running native `linux/arm64` images delivers 100% native CPU performance and instant container startup times.

---

## Prerequisites

1. **Docker Desktop** (on macOS) or **Docker Engine + Docker Compose v2** (on Linux ARM64).
2. Minimum 4 GB RAM allocated to Docker (8 GB recommended for ERPNext).
3. Git installed.

---

## Step 1: Clone the frappe_docker Repository

```bash
git clone https://github.com/frappe/frappe_docker.git
cd frappe_docker
```

---

## Step 2: Configure the Environment File

Copy the sample environment file:

```bash
cp example.env .env
```

Open `.env` and verify key parameters:
```ini
FRAPPE_VERSION=version-15
ERPNEXT_VERSION=version-15
DB_PASSWORD=your_secure_mariadb_password
ADMIN_PASSWORD=your_secure_admin_password
SITES=frontend.localhost
```

---

## Step 3: Launch Native ARM64 Containers

Run the compose stack targeting the native ARM64 images:

```bash
docker compose -f compose.yaml \
  -f overrides/compose.mariadb.yaml \
  -f overrides/compose.redis.yaml \
  -f overrides/compose.noproxy.yaml \
  up -d
```

Verify that all containers are running native ARM architecture:
```bash
docker inspect --format '{{.Architecture}}' $(docker compose ps -q backend)
# Should return: arm64
```

---

## Step 4: Create Your First ERPNext Tenant Site

Execute the site creation command inside the backend container:

```bash
docker compose exec backend bench new-site frontend.localhost \
  --db-root-password your_secure_mariadb_password \
  --admin-password your_secure_admin_password \
  --install-app erpnext
```

---

## Step 5: Access ERPNext in Your Browser

Open your browser and navigate to:
```
http://localhost:8080
```

Log in with:
- **Username:** `Administrator`
- **Password:** `your_secure_admin_password`

Complete the initial Setup Wizard (select Company Name, Currency, Fiscal Year, and Charts of Accounts), and your fully native ARM64 ERPNext system is ready to use!

---

## Summary

Native ARM64 Docker deployments provide the best price-to-performance ratio in cloud hosting today and offer a buttery-smooth local development experience on Apple Silicon.

*Need custom ERPNext architecture, multi-tenant setups, or enterprise Frappe integrations? [Connect with the full-stack ERP engineers at Klickspell](https://klickspell.com/#contact).*
