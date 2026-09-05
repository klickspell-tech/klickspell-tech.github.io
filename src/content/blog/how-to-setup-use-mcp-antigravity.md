---
title: "How to Setup and Use MCP (Model Context Protocol) in Antigravity"
description: "A complete step-by-step developer tutorial on configuring and using Model Context Protocol (MCP) servers to connect local databases, tools, and APIs directly into Antigravity."
pubDate: 2026-08-24T00:00:00.000Z
author: "Atul Bhatt"
tags: ["MCP", "AI", "Antigravity", "Developer Tools", "LLMs", "Tutorial"]
canonicalUrl: "https://klickspell.com/blog/how-to-setup-use-mcp-antigravity"
readingTime: "5 min read"
---

<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 12px 32px rgba(0,0,0,0.06);">
  <iframe src="https://www.youtube-nocookie.com/embed/auB8IxYOM0o" title="How to setup and use MCP in antigravity" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

**Model Context Protocol (MCP)** is the open standard that is revolutionizing how AI models and agentic IDEs interface with external data sources, local development environments, and third-party APIs.

Instead of writing brittle custom API adapters for every tool, MCP provides a unified JSON-RPC protocol allowing AI coding assistants like **Antigravity** to seamlessly read databases, inspect local Git repos, run terminal commands, and query live APIs.

In this guide, we cover how to install, configure, and use MCP servers inside Antigravity step-by-step.

---

## What is MCP and Why Does it Matter?

Before MCP, if you wanted your AI coding assistant to query your local SQLite database or your team's GitHub issues, you had to manually copy-paste schema dumps or write bespoke plugins.

MCP acts as a **USB-C port for AI applications**:
- Any MCP-compliant server (PostgreSQL, filesystem, Brave Search, GitHub, Docker) plugs directly into any MCP-compliant AI client.
- Secure, local-first communication over standard IO (`stdio`) or Server-Sent Events (`SSE`).
- Real-time schema discovery and tool execution.

---

## Step 1: Locating the MCP Configuration File

In Antigravity, MCP servers are defined in a central JSON configuration file.

1. Open your Antigravity user settings or navigate to your global configuration directory:
   - **macOS / Linux:** `~/.gemini/config/mcp_config.json`
   - Or locally within your workspace root: `.agents/mcp_config.json`

---

## Step 2: Adding an MCP Server (e.g., PostgreSQL & Filesystem)

Open `mcp_config.json` and add your server definitions:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:password@localhost:5432/my_app_db"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_yourTokenHere"
      }
    }
  }
}
```

---

## Step 3: Verifying and Testing Tools

1. Save the configuration file.
2. Restart or reload your Antigravity agent session.
3. Your agent will automatically discover the exposed tools (e.g., `query_database`, `get_table_schema`, `search_github_issues`).
4. Simply prompt your agent in natural language:
   > *"Inspect the users table in our local database and show me the top 5 most recent signups."*

The agent calls the PostgreSQL MCP server over `stdio`, retrieves the record payload, and renders the result directly in your coding session.

---

## Security Best Practices for MCP

1. **Read-Only Credentials:** Always connect database MCP servers using read-only database roles to prevent accidental drops or deletes.
2. **Environment Variables:** Never commit raw API tokens or credentials into Git repositories. Store sensitive keys in local `.env` files referenced by your MCP config.

---

## Summary

MCP transforms your AI coding assistant from an isolated code completion engine into a fully connected, contextual pairing partner.

*Building custom AI development pipelines, internal MCP servers, or full-stack software applications? [Talk with Klickspell today](https://klickspell.com/#contact).*
