# Klickspell — Changelog

> Every AI agent session must log meaningful changes here.
> Format: Date · Agent · What changed · Why

---

## Session 001 — May 2026 · Claude (Anthropic)

### Built
- `index.html` — Complete single-file agency website
  - Nav with scroll shadow, mobile burger menu, smooth anchor scroll
  - Hero section with concentric arc rings, floating cards, staggered fade-up animations
  - Dual desktop/mobile copy system (headline, sub, CTA, note all swap at 768px)
  - Clients marquee (8 brand names, pauses on hover)
  - Services section (5 cards, accent bottom-line hover, number spacing expands)
  - Differentiators section (dark bg, 4 items, vertical accent line hover)
  - Portfolio section (8 cards in 12-col grid: 1 featured, 1 regular, 6 half)
  - Process section (4 steps, icon rotates on hover)
  - About section (photo + bio + 3 stats)
  - Tutorials section (6 YouTube cards)
  - CTA section
  - Footer with underline hover on links
  - Custom cursor with lag ring (desktop only)
  - Scroll reveal via IntersectionObserver

- `AI_CONTEXT.md` — Full project context for AI agents
- `BRAND_COPY.md` — Complete brand copy reference
- `CHANGELOG.md` — This file

### Design decisions made
- Single HTML file — no build step, no framework
- Instrument Serif + Manrope + DM Mono typography stack
- OpenRipples-inspired aesthetic (openripples.com was the reference)
- Hover effects calibrated to "subtle and refined" — not flashy
- Cove & Lane as featured hero project card
- All other project cards use styled italic placeholder text (not screenshots)
- WhatsApp as primary CTA (no form, no Calendly yet)

### Known gaps / next steps
- Real screenshots for 7 project cards (only Cove & Lane attempts live screenshot)
- Calendly or contact form integration
- Logo — designer brief created separately, not yet in codebase
- Case study individual pages
- SEO meta tags
- Analytics

---

## Session 002 — [Date] · [Agent]

*(Log your changes here)*

---

## 2026-10-14 · Claude (Anthropic)

### Added
- `src/pages/services/performance-accessibility-retainer.astro` — service page for the monthly Performance & Accessibility retainer (speed, WCAG 2.2 AA, privacy)
  - Sections: drift problem, three areas, "ADA, honestly", process, testing tools, plan builder, FAQ, CTA
  - Plan builder: presets, areas, coverage level, term, one-time projects; live USD price ranges in a sticky summary, mobile price bar, shareable plan link (query params), WhatsApp/email hand-off with the plan prefilled
  - All prices live in the `CARE` object at the top of the file
  - Service + FAQPage + BreadcrumbList schema
- Footer and `public/llms.txt` link to the new page

### Why
- Pitch the retainer bundle publicly and let clients choose their own scope before a call

### Notes
- Builder hands off via WhatsApp/email/Cal rather than the Frappe `request_quotation` endpoint, which only accepts catalog item codes
- Page scores Lighthouse 100 accessibility; it overrides the shared `.service-badge` colour, which fails 4.5:1 contrast site-wide (also on the speed-optimization page)

---

## 2026-10-15 · Claude (Anthropic)

### Changed — `services/performance-accessibility-retainer.astro`
- Prices re-based on market research (freelancer guides, agency pricing, WebAIM/UsableNet data): accessibility Essentials $450–650, Growth $800–1,200, baseline $1,500–2,500; performance baseline $600–900; speed sprint $1,500–3,000 (2–3 weeks)
- Performance area reframed as "speed & code governance"; "Speed only" preset renamed "Speed sprint + watch"
- Added "Why it matters" stats (UsableNet, WebAIM Million 2026, CDC, Deloitte/Google, Vodafone), each linked to its source via the `SOURCES` object
- Added "Your options" table: do nothing vs overlay vs one-off audit vs retainer
- Added "Where to start" scenarios (demand letter, slow store, EU/EAA, weekly launches) that open the builder pre-filled, plus a "not the right fit if" list
- Builder summary and WhatsApp/email message now show the total over the chosen term
- FAQ: demand letters, European Accessibility Act, existing audits, why the accessibility baseline costs more; FTC/accessiBe order cited in "ADA, honestly"

### Why
- Give clients enough evidence and comparison to choose a plan without a call

### Repriced (same day)
- All prices now derive from estimated hours × a `RATE` band ($25–35/hr) via `priced()`, positioned as an India-based studio rather than US-agency pricing
- Hero shows the effective hourly rate; builder shows it next to hours; new FAQ "Why do you cost less than a US or UK agency?"

---

## 2026-10-15 (later) · Claude (Anthropic)

### Changed — retainer page pricing
- `RATE` lowered to $20–30/hr
- New **Lite** level (monitor & report, ~13 hrs/mo for all three areas); Essentials is now the default and "Most stores"; Growth relabelled "Fast-moving stores"
- Presets: added "Starter watch" (Lite) and "Scale-up care" (Growth); "Complete care" and "ADA readiness" now use Essentials; "Plans from" is now $100/mo

### Why
- Price for an offshore studio: clients choose us because we cost less than US/UK agencies
