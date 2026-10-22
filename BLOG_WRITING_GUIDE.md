# Klickspell — Blog Writing Guide

> Read this before writing or editing any post in `src/content/blog/`.
> Posts are published as **Atul Bhatt**, in first person. They must read like Atul wrote them, not like AI output.

---

## 1. Atul's voice

Use the older, self-written posts as the reference (for example `hot-reload-fails-dom-adds-an-additional-iframe-45e7.md` and `not-5-but-6-things-to-ask-before-joining-a-new-organisation-if-youre-a-dev-or-sde-2a99.md`). Do **not** copy the style of the polished 2026 posts.

- **First person and personal.** Say why Atul cared about the problem and how he ran into it ("everyone in my team was facing this issue…", "I'd never worked with this before").
- **Talk to the reader directly.** "If you're dealing with the same thing…", "You feel me right?"
- **Be honest about what isn't known yet.** "I'm not sure yet", "I haven't tested this", "I'll update this post once I do". Never present plans or guesses as finished results.
- **Simple, everyday sentences.** Short words over fancy ones. Explain things the way you'd explain them to a colleague.
- **Blockquote asides** (`> …`) for side notes, warnings and "if you're wondering…" moments.
- **Bold** for the few phrases that really matter, not every other line.
- **A light emoji now and then is fine** (😅, 👍, 😬), at most two or three per post.
- **Casual sign-off**, in his old style: "Till then, happy debugging👍", plus an invite to comment or share what was missed.

## 2. Phrases and patterns that make a post feel AI-written (avoid)

- Dramatic setups: "The trap:", "Here's the thing:", "The Part Nobody Talks About", "Or so I thought", "That last one matters more than it looks", "Here's the short version I wish I'd had".
- Neat aphorisms as closers ("It's not about X, it's about Y", "the one thing you can't allow").
- Brochure words: "seamless", "robust", "leverage", "unlock", "game-changer", "in today's fast-paced world", "dive in", "navigate the landscape".
- Over-polished, perfectly symmetrical structure where every section has the same shape and every list has exactly three items.
- Em dashes everywhere. Prefer full stops, commas or brackets.
- Bolding the start of every bullet by default.
- Claiming certainty or results that haven't happened.

## 3. Make it real

- Include at least one **real, specific detail** only Atul would know: the moment the problem showed up, a number, an error message, what the client said, what went wrong first. If you don't have one, **ask Atul** instead of inventing it.
- Never invent experiences, test results, quotes or numbers.
- Client work is **anonymised** by default ("a textile printing company in Germany"). Don't name clients, their partners or their internal field/function names unless Atul says so.
- Facts about laws, standards, dates and commands must be accurate. Flag anything you're unsure of to Atul before publishing.

## 4. Explain jargon (tooltips + glossary)

Readers may not be technical. For any term a normal reader might not know (acronyms, German/legal terms, tool names):

- Wrap its **first meaningful use** in a tooltip link:
  ```html
  <a class="term" href="#g-slug" data-tip="One-line plain-English definition.">Term</a>
  ```
  No double quotes inside `data-tip`. Don't put terms inside headings.
- Add a matching entry to a **Glossary** section at the end of the post (before the closing CTA):
  ```html
  <dl class="glossary" id="glossary">
    <dt id="g-slug">Term</dt>
    <dd>Longer, friendly explanation (2–4 sentences). Use <code> / <strong> HTML here, not Markdown.</dd>
  </dl>
  ```
- Add a short note near the top telling readers that dotted terms can be hovered or tapped.
- Styles live in `src/styles/style.css` (`.prose a.term`, `.prose .glossary`). Reference example: `german-e-invoicing-erpnext-xrechnung-zugferd.md`.
- Every `href="#g-…"` must have a matching `<dt id="g-…">`. Run `npx astro build` and check before finishing.

## 5. Format checklist

- Front-matter per `src/content/config.ts`: `title`, `description`, `pubDate`, `author: "Atul Bhatt"`, `tags`, `canonicalUrl` (`https://klickspell.com/blog/<slug>`), `readingTime`.
- `---` between major sections, `##` for sections, `###` for sub-points.
- Link related Klickspell posts where it genuinely helps.
- End with the Klickspell CTA in italics, written casually, e.g. *Facing X? [Talk to us at Klickspell](https://klickspell.com/#contact), we're happy to help.*
- Log the new or changed post in `CHANGELOG.md`.
