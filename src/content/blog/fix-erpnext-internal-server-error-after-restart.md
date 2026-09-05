---
title: "Fix: Internal Server Error in ERPNext After Server Restart (Easy Install Script)"
description: "A comprehensive troubleshooting guide to diagnosing and fixing the dreaded 500 Internal Server Error in ERPNext after a VPS reboot or server restart."
pubDate: 2026-08-16T00:00:00.000Z
author: "Atul Bhatt"
tags: ["ERPNext", "Frappe", "Troubleshooting", "Linux", "DevOps", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/fix-erpnext-internal-server-error-after-restart"
readingTime: "5 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/ftBlFJWMWyY" title="Internal Server Error in ERP Next After Server Restart | Easy Install Script" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

You reboot your Ubuntu VPS, navigate to your ERPNext domain, and instead of the familiar login screen, you are greeted with:
> **500 Internal Server Error**  
> *The server encountered an internal error or misconfiguration and was unable to complete your request.*

This is one of the most common issues on ERPNext instances deployed via the official easy install script or standard bench setups. In this guide, we diagnose the root causes and provide the exact commands to restore your ERPNext system immediately.

---

## Why Does This Happen After a Reboot?

When a Linux server restarts, several interdependent systemd and supervisor services must initialize in a specific sequence:
1. **MariaDB / MySQL Server:** If MariaDB fails to bind its socket or hasn't finished recovery, Frappe cannot query site configuration.
2. **Redis Services:** Frappe requires three distinct Redis instances (`redis-cache`, `redis-queue`, `redis-socketio`). If one fails, the WSGI app crashes.
3. **Supervisor Workers:** Gunicorn worker processes may crash or timeout if spawned before Redis or MariaDB are healthy.
4. **Supervisor Auto-Start:** The supervisor daemon itself may not be enabled to start on system boot.

---

## Step 1: Check Supervisor & Service Status

SSH into your server and check the status of all Frappe services:

```bash
sudo supervisorctl status
```

In a healthy system, you should see all processes in the `RUNNING` state:
```
frappe-bench-workers:frappe-bench-frappe-schedule               RUNNING
frappe-bench-workers:frappe-bench-frappe-default-worker-0       RUNNING
frappe-bench-workers:frappe-bench-frappe-short-worker-0         RUNNING
frappe-bench-workers:frappe-bench-frappe-long-worker-0          RUNNING
frappe-bench-web:frappe-bench-frappe-web                       RUNNING
frappe-bench-web:frappe-bench-node-socketio                     RUNNING
```

If any service is `FATAL`, `BACKOFF`, or `STOPPED`, proceed to the fixes below.

---

## Step 2: Verify MariaDB and Redis Status

Check if MariaDB and Redis are active:

```bash
sudo systemctl status mariadb
sudo systemctl status redis-server
```

If MariaDB is stopped, start and enable it:
```bash
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

If you encounter `Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'`, check your disk space:
```bash
df -h
```
*(If your root disk partition is 100% full due to unrotated logs, MariaDB cannot start until you free up space!)*

---

## Step 3: Restarting Frappe Bench Processes Cleanly

Switch to your frappe user account:

```bash
su - frappe
cd /home/frappe/frappe-bench
```

Restart all workers and web processes via supervisor:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl restart all
```

Or using bench directly:
```bash
bench restart
```

---

## Step 4: Reload Nginx Reverse Proxy

Nginx acts as the frontend reverse proxy forwarding traffic to Gunicorn port `8000`:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

If `nginx -t` reports syntax errors in your site configuration, re-generate the config files:
```bash
bench setup nginx
sudo systemctl reload nginx
```

---

## Step 5: Enable Auto-Start on System Boot

To prevent this issue from happening on future reboots, ensure all supervisor and bench services are enabled on system boot:

```bash
sudo systemctl enable supervisor
sudo systemctl enable mariadb
sudo systemctl enable redis-server
sudo systemctl enable nginx
```

---

## Summary

Following this diagnostic checklist will resolve 95% of post-reboot ERPNext 500 errors in under 3 minutes.

*Need proactive 24/7 server monitoring, automated database backups, or custom ERPNext maintenance retainers? [Talk to the DevOps team at Klickspell](https://klickspell.com/#contact).*
