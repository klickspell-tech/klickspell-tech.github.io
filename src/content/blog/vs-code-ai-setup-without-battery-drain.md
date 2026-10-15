---
title: "Antigravity Was Draining My Laptop Battery, So I Went Back to Plain VS Code"
description: "Antigravity was eating my battery and RAM. Here's the lighter setup I use instead: plain VS Code, Continue with Gemini Flash, Claude Code, and the Antigravity extension to utilize a Google AI Pro subscription."
pubDate: 2026-10-15T00:00:00.000Z
author: "Atul Bhatt"
tags: ["VS Code", "AI", "Claude Code", "Gemini", "Continue", "Google Antigravity", "Developer Tools", "Productivity"]
canonicalUrl: "https://klickspell.com/blog/vs-code-ai-setup-without-battery-drain"
readingTime: "8 min read"
---

I moved a lot of my work into Google Antigravity, and two things got noticeably worse straight away. My battery drained much faster than it did with plain VS Code, and RAM usage went way up.

That's a bad trade on a laptop. So I rebuilt my setup around plain VS Code. I still have an AI assistant in the editor and an agent that can work across the whole repo, but without an editor that's busy in the background all the time. This post covers why AI editors like Antigravity use so much power, two Gemini API errors I ran into along the way, and the exact config I ended up with.

## Why the AI editors use so much power

Antigravity, Cursor and Windsurf all do a lot of work you never asked for. They index your workspace in the background, run agent loops, and in Antigravity's case can open a browser to check what the agent built. That's all useful when you need it. Most of the time I'm just reading code or writing one function, and none of it needs to be running.

I'm not the only one seeing this. Antigravity users have reported [its language server process eating so much memory the editor hangs](https://discuss.ai.google.dev/t/solved-antigravity-hangs-due-to-language-server-windows-x64-high-memory-consumption/116025). Cursor has the same kind of complaints. Its forum has a steady stream of threads: [around 4GB of RAM and 20% CPU while sitting idle](https://forum.cursor.com/t/high-cpu-ram-usage-from-window-process-while-cursor-is-completely-idle/156742), [memory climbing past 20GB during indexing on a large repo](https://forum.cursor.com/t/cursor-2-2-43-suddenly-eats-all-ram-20gb-and-freezes-laptop/147417), and [heavy battery drain on an M4 MacBook](https://forum.cursor.com/t/excessive-battery-drain-on-mac-m4-recent-development/147641).

These are individual reports, not benchmarks, and your machine will behave differently. But the pattern makes sense. If the editor isn't constantly doing AI work in the background, the battery lasts.

## The setup: two tools, two jobs

I stopped trying to make one model do everything. Now I split the work:

- **Chat and small edits:** the [Continue](https://www.continue.dev/) extension, pointed at Gemini 3.8 Flash using a free Google AI Studio key. It's fast, and nothing runs until I ask it something.
- **Big tasks** (refactors, "go figure out why this test is flaky", changes across many files): [Claude Code](https://code.claude.com/docs/en/overview) using a Claude Pro subscription (via CLI or extension), or the **Google Antigravity extension for VS Code** if you already pay for Google AI Pro.

The editor stays lightweight, and the expensive model only runs when I've deliberately given it a job.

## Two Gemini API errors to watch out for

Before the config, here are the two errors I hit while connecting Continue to Gemini.

### The 404: "model no longer available"

```text
"error": {
  "code": 404,
  "message": "This model models/gemini-2.5-flash is no longer available to new users. Please update your code to use models/gemini-3.8-flash..."
}
```

Google [now limits the 2.5 models to people who were already using them](https://ai.google.dev/gemini-api/docs/models). If your AI Studio key is recent and your config, or a tutorial you copied it from, says `gemini-2.5-flash` or `gemini-2.5-pro`, you'll get an error like this. The message tells you which model to use instead. Read it before you start debugging anything else.

### The 429 with `limit: 0`

```text
"error": {
  "code": 429,
  "message": "Quota exceeded for metric: ..._requests, limit: 0, model: gemini-3.1-pro-preview"
}
```

This one is more confusing. I pay for Google AI Pro, so I assumed I'd have access to the Pro model through the API.

That isn't how it works. Google's own [AI plans page](https://ai.google.dev/gemini-api/docs/google-ai-plans) says the subscription only raises your limits inside the AI Studio website, and that using the Gemini API with a key "is billed and managed separately." The [pricing page](https://ai.google.dev/gemini-api/docs/pricing) lists no free tier at all for `gemini-3.1-pro-preview` or `gemini-4-argon`. On a key with no billing attached, your quota for those models is zero. It isn't a rate limit you can wait out.

**The fix for Continue:** use Gemini 3.8 Flash, which does have a free tier. It's fast and good enough for the quick questions and edits I send it from the editor.

**How to actually use your Google AI Pro subscription in VS Code:** If you want to use the Pro model without setting up pay-as-you-go API billing, don't use an API key in Continue. Instead, install the official **Google Antigravity extension for VS Code** and sign in with your Google account. Account-level authentication taps directly into your Google AI Pro subscription quota right inside plain VS Code (covered in step 5 below).

## Setting it up

### 1. Get a Gemini API key

Go to [Google AI Studio](https://aistudio.google.com/), sign in, click **Get API key**, and create one. Keep it somewhere safe.

### 2. Install and configure Continue

In VS Code, open Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`), search for **Continue** and install it.

Then open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run:

```text
Continue: Open config.yaml
```

Replace the contents with this and paste in your key:

```yaml
name: Main Config
version: 1.0.0
schema: v1

models:
  - name: Gemini 3.8 Flash
    provider: gemini
    model: gemini-3.8-flash
    apiKey: YOUR_AI_STUDIO_API_KEY_HERE
    roles:
      - chat
      - edit
      - apply
```

Save the file and reload the window (`Developer: Reload Window` from the command palette). Open the Continue panel, ask it something about the file you're in, and you should get an answer back from Flash.

If you get the 404 from earlier, check the model name in AI Studio and update the config.

**What about tab autocomplete?** You can add `autocomplete` to the roles list above, but Continue's own [autocomplete docs](https://docs.continue.dev/customize/model-roles/autocomplete) warn that chat models "will often perform poorly" at it, even with a lot of prompting. They recommend models built for code completion, like Codestral or Qwen2.5-Coder (which you can run locally with Ollama). Try Flash if you like, but don't be surprised if the suggestions are hit and miss.

### 3. Add Claude Code to the terminal

Open the integrated terminal (`` Ctrl+` `` / `` Cmd+` ``) and install Claude Code. On macOS, Linux or WSL, Anthropic [recommends the native installer](https://code.claude.com/docs/en/setup):

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

On Windows PowerShell it's `irm https://claude.ai/install.ps1 | iex`. If you'd rather use npm, `npm install -g @anthropic-ai/claude-code` still works (it needs Node.js 22 or later), but npm installs can't always update themselves the way the native one does.

Then run it:

```bash
claude
```

It opens a browser window to sign in. Choose your Claude.ai account, not the API Console, so usage counts against your subscription and you aren't billed per token. Claude Code needs a paid plan (Pro, Max, Team or Enterprise). The free Claude.ai plan doesn't include it.

After that you can give it real work straight from the terminal:

```text
> Go through the TypeScript in this repo, get rid of the implicit anys, and run the tests when you're done.
```

It reads the files, makes the changes, runs the commands and shows you what it did. When it finishes it stops using resources, which is the whole point of this setup.

### 4. Add the Claude Code extension too

I don't always want to work in the terminal, so I also use the official [Claude Code extension for VS Code](https://code.claude.com/docs/en/vs-code). Search for "Claude Code" in the Extensions view (it's published by Anthropic) and install it. You need VS Code 1.94 or later.

Once it's installed, a Spark icon appears at the top right of the editor whenever a file is open. Click it to open Claude in a panel. It signs in with the same Claude.ai account as the CLI, and you don't need an API key.

What I like about the extension compared to the terminal:

- Changes show up as diffs in the editor, so I can review them properly before accepting.
- I can select a few lines and @-mention them, and Claude gets exactly that range.
- I can look over Claude's plan and edit it before it starts changing files.
- I can have several conversations open in separate tabs for different tasks.

My rough rule: the extension when I want to watch and review changes as they happen, the terminal when I'm handing off a bigger job and checking back later.

### 5. Option: Use the Google Antigravity extension to utilize Google AI Pro

If you subscribe to Google AI Pro (or Google One with Gemini Advanced) rather than Claude Pro, you don't need to leave VS Code or pay for API credits to use Gemini Pro. You can install the official **Google Antigravity extension for VS Code**.

This gives you a middle ground: you get Google's agentic harness, implementation plans, and access to Gemini Pro, but inside your standard VS Code installation rather than running the standalone Antigravity IDE with all its heavy background services.

Here is how to set it up:

1. In VS Code, open Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`).
2. Search for **Google Antigravity** (published by Google) and install it.
3. Click the **Antigravity** icon in the Activity Bar on the left.
4. Click **Sign In with Google** and choose the account tied to your Google AI Pro subscription.

Once signed in:

- **Subscription-backed quota:** It uses your Google AI Pro subscription allowance directly instead of requiring an API key with credit card billing.
- **Agent mode & implementation plans:** You can ask it to tackle multi-step coding tasks across your repo. It drafts a plan, shows you diffs, and asks for approval before modifying code.
- **Better on battery:** Because it runs as a standard extension in stock VS Code rather than the standalone Antigravity IDE, your editor doesn't spin up full background browser previews or heavy language server indexing while you're just typing or reading code.

If you already pay for Google AI Pro, this is the most seamless way to put it to work in your editor without getting hit by the `limit: 0` API wall.

## What changes if you turn on billing?

If you attach a billing account to your AI Studio project, you move to the paid tiers ([Tier 1 and up](https://ai.google.dev/gemini-api/docs/rate-limits)):

- The `limit: 0` wall goes away and you can use the Pro and Gemini 4 models through the API.
- Your rate limits go up, and they keep rising as you spend more. Google doesn't publish the exact numbers per model in its docs. You can see your current limits in AI Studio.
- Your data is handled differently. According to the [pricing page](https://ai.google.dev/gemini-api/docs/pricing), Google may use what you send on the **free** tier to improve its products, and doesn't on the paid tier. If you're pasting client code into Continue, think about that before you stay on the free key.

Even with billing on, I'd keep everyday editor questions on Flash. At the time of writing it's $0.75 per million input tokens and $3.75 per million output tokens (rising to $1.50 and $7.50 in January 2027). The Pro and Gemini 4 models cost several times more, and editor requests add up quickly.

## Wrapping up

I don't think AI-native editors are bad. If you're plugged in at a desk all day, the extra power use may not matter to you. But if you're on battery a lot and you already pay for Google AI Pro or Claude Pro, you don't need another subscription or an editor that runs your laptop hot.

Plain VS Code, Continue with Gemini Flash, and Claude Code or the Antigravity VS Code extension for the heavy lifting. It's a much lighter setup than running the standalone Antigravity IDE, you make full use of the subscriptions you already pay for, and the AI only does work when I ask it to.

*Model names, prices and limits change often. Everything here was checked against Google's and Anthropic's docs in October 2026.*
