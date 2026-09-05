---
title: "Why and How to Create Swap Space on Ubuntu (Prevent Server Crashes)"
description: "A practical systems guide on creating and configuring swap space on Ubuntu servers to eliminate Out-Of-Memory (OOM) crashes and optimize Linux kernel swappiness."
pubDate: 2026-08-21T00:00:00.000Z
author: "Atul Bhatt"
tags: ["Linux", "Ubuntu", "DevOps", "SysAdmin", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/why-how-create-swap-space-ubuntu"
readingTime: "5 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/cstj9iSd_n0" title="Why and How To create Swap Space on Ubuntu" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

Have you ever had your server randomly kill your MySQL database, Node.js process, or Next.js build without warning?

When a server's physical RAM fills up, the Linux kernel invokes the **OOM (Out of Memory) Killer**. The kernel identifies the process consuming the most memory and forcefully terminates it to prevent the entire operating system from freezing.

By configuring a **Swap File**, your server uses a portion of its high-speed SSD storage as virtual memory when RAM is under pressure—acting as an essential safety net that prevents fatal downtime.

Here is why you need swap space and how to create it on Ubuntu in under 2 minutes.

---

## Why Every Server Needs Swap Space

1. **Prevents Abrupt Crashes:** Instead of immediately killing your web server or database when traffic spikes, the kernel offloads idle memory pages into swap space.
2. **Allows Heavy Builds:** Compiling frontend assets (`npm run build`, Docker image builds, or Rust/Go binaries) often requires sudden bursts of 2–4 GB RAM that a budget 1 GB VPS cannot handle natively.
3. **Optimizes True RAM Usage:** Moves infrequently accessed system daemons to disk, keeping physical RAM available for fast active caching.

---

## Step 1: Check Current Swap Status

SSH into your server and run:

```bash
sudo swapon --show
free -h
```

If the output is empty or displays `Swap: 0B`, your server has no virtual memory configured.

---

## Step 2: Create a Swap File

As a general rule:
- **1 GB – 2 GB RAM server:** Allocate **2 GB – 4 GB Swap**.
- **4 GB – 8 GB RAM server:** Allocate **4 GB Swap**.
- **16 GB+ RAM server:** Allocate **4 GB – 8 GB Swap**.

Create a 4 GB swap file using `fallocate`:

```bash
sudo fallocate -l 4G /swapfile
```

*(If `fallocate` fails or is unsupported on your filesystem, use `dd`:)*
```bash
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096
```

---

## Step 3: Secure the Swap File Permissions

Only the root superuser should ever read or write to virtual memory:

```bash
sudo chmod 600 /swapfile
```

---

## Step 4: Format and Enable Swap

Format the file into Linux swap format:

```bash
sudo mkswap /swapfile
sudo swapon /swapfile
```

Verify that swap is now active:

```bash
free -h
```
You should now see `Swap: 4.0Gi` active!

---

## Step 5: Make Swap Permanent Across Reboots

If you reboot now, the swap file will turn off. To make it persistent, append it to `/etc/fstab`:

```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## Step 6: Tuning Swappiness & Cache Pressure

The `vm.swappiness` parameter controls how aggressively the kernel swaps memory to disk (range: 0 to 100):
- `100`: Aggressive swapping (slows down performance).
- `60`: Ubuntu desktop default.
- **`10 – 20`**: **Optimal for production web and database servers.** (Only swap when RAM is genuinely exhausted).

Check current swappiness:
```bash
cat /proc/sys/vm/swappiness
```

Set optimal swappiness to 10:
```bash
sudo sysctl vm.swappiness=10
```

Make it permanent by editing `/etc/sysctl.conf`:
```bash
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf
```

---

## Summary

Setting up a swap file takes 120 seconds, costs $0, and protects your production databases and web servers from sudden Out-Of-Memory termination.

*Need your cloud infrastructure, databases, and Linux servers audited and hardened for high traffic? [Reach out to the DevOps team at Klickspell](https://klickspell.com/#contact).*
