---
title: "Setup Forever Free 24 GB RAM ARM-Based Cloud Server on Oracle (Free VPS Guide)"
description: "How to set up a forever free cloud VPS with 4 OCPU cores, 24 GB RAM, and 200 GB SSD storage on Oracle Cloud Infrastructure Ampere ARM architecture."
pubDate: 2026-08-19T00:00:00.000Z
author: "Atul Bhatt"
tags: ["Oracle Cloud", "VPS", "DevOps", "Linux", "Cloud", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/setup-free-oracle-cloud-24gb-ram-vps"
readingTime: "6 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/BUxyD-IXP1s" title="Setup Forever Free Oracle 24 GB RAM ARM-based Ampere Cloud | Forever Free VPS" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

Most cloud providers (AWS, Google Cloud, DigitalOcean) offer free tiers that expire after 12 months or limit you to 1 GB of RAM and 1 tiny vCPU—barely enough to compile a modern Node.js application.

Oracle Cloud Infrastructure (OCI) completely disrupts the industry with their **Always Free Tier**:
- **4 OCPU Cores** on high-frequency Ampere Altra ARM processors.
- **24 GB of RAM**.
- **200 GB of NVMe-backed Block Storage**.
- **Up to 4 separate instances** (you can run 1 monster 24 GB server or split it across multiple smaller VMs).
- **10 TB of outbound data transfer** per month.

Here is the complete step-by-step tutorial to provisioning and hardening your forever-free 24 GB RAM cloud server.

---

## Step 1: Create Your Oracle Cloud Free Tier Account

1. Visit [oracle.com/cloud/free](https://www.oracle.com/cloud/free/) and click **Start for free**.
2. **Select Your Home Region Carefully:** This cannot be changed later! Pick the data center closest to you or your target audience (e.g., *US East, Frankfurt, London, or Mumbai*).
3. Complete identity verification. A credit/debit card is required for fraud prevention, but you will not be charged as long as you stay within Always Free limits.

---

## Step 2: Configure Virtual Cloud Network (VCN)

Before launching compute, set up basic networking:
1. Go to **Networking → Virtual Cloud Networks**.
2. Click **Start VCN Wizard** → select **Create VCN with Internet Connectivity**.
3. Accept default CIDR blocks (`10.0.0.0/16`) and click **Create**. This automatically creates an Internet Gateway and Public Subnet.

---

## Step 3: Launch Your Ampere A1 Compute Instance

1. In the OCI Console, go to **Compute → Instances** and click **Create instance**.
2. **Name:** Give your server a name (e.g., `prod-server-arm`).
3. **Image and Shape:**
   - Click **Edit**.
   - **Operating System:** Select **Canonical Ubuntu 24.04** or **22.04 LTS (Minimal AArch64)**.
   - **Shape:** Click **Change shape** → switch to **Ampere (ARM-based Processor)** → select **VM.Standard.A1.Flex**.
   - Drag the sliders to:
     - **Number of OCPUs:** `4`
     - **Amount of Memory (GB):** `24`
4. **Networking:** Select the Public Subnet created in Step 2 and ensure **"Assign a public IPv4 address"** is checked.
5. **Add SSH Keys:**
   - Choose **Generate a key pair for me** (and download both private and public keys), or paste your existing `id_rsa.pub` public key.
6. Click **Create**.

Your instance will transition from *Provisioning* to a bright green *Running* status in about 60 seconds.

---

## Step 4: Connecting via SSH

Open your local terminal and connect using the default `ubuntu` username:

```bash
chmod 400 /path/to/your/private_key.key
ssh -i /path/to/your/private_key.key ubuntu@<YOUR_PUBLIC_IP>
```

---

## Step 5: Essential Firewall & Port Configuration

Oracle Cloud instances use two layers of firewalls: **OCI Security Lists (Cloud level)** and **iptables/ufw (OS level)**.

To open HTTP (port 80) and HTTPS (port 443) for web servers:

### 1. In OCI Console:
1. Go to your **Subnet** → click **Default Security List**.
2. Click **Add Ingress Rules**:
   - **Source CIDR:** `0.0.0.0/0`
   - **IP Protocol:** `TCP`
   - **Destination Port Range:** `80, 443`
3. Click **Add Ingress Rules**.

### 2. In Ubuntu OS:
Oracle's default Ubuntu images come pre-configured with restrictive iptables rules. Open the ports inside the OS:

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

---

## What Can You Run on a 24 GB RAM Server?

With 24 GB of RAM and 4 ARM cores, you can comfortably run:
- A full production **ERPNext + MariaDB + Redis stack**.
- Multi-container Docker workloads running Next.js, Postgres, and Celery workers.
- Self-hosted developer tools (Gitea, Jenkins, N8N, Portainer).
- High-concurrency WebSockets and backend microservices.

---

## Summary

Oracle's Always Free tier is the undisputed champion of developer cloud hosting. With proper security list configuration, you have enterprise-grade compute ready for production workloads indefinitely.

*Need help setting up cloud infrastructure, Docker clusters, or migrating to ARM architectures? [Schedule a technical consultation with Klickspell](https://klickspell.com/#contact).*
