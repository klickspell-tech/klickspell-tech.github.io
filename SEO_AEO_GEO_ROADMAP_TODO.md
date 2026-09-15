# SEO, AEO & GEO Growth Roadmap — Action Checklist (klickspell.com)

> **Objective:** Increase qualified inbound leads by improving visibility across traditional search (SEO), AI-generated direct answers (AEO), and AI chat/search citations (GEO — ChatGPT, Perplexity, Gemini, Google AI Overviews).
> **Timeline:** 6 months from **Month 1 = September 2026**, reviewed monthly.
> **Owner:** Atul Bhatt, Founder.

This checklist tracks the full roadmap and has been cross-checked against the live codebase (as of 2026-09-15) so items already shipped are marked done. See also [DOMAIN_AUTHORITY_TODO.md](file:///Users/atul/Documents/Projects/KlickSpell-Site/DOMAIN_AUTHORITY_TODO.md) (backlink/DA-specific tactics) and [TODO_MANUAL.md](file:///Users/atul/Documents/Projects/KlickSpell-Site/TODO_MANUAL.md) (founder-login-required tasks) — several items below intentionally point back to those files instead of duplicating them.

---

## 📊 Goals & KPIs

| Goal | Metric | Baseline (Month 0) | Target (Month 6) |
|---|---|---|---|
| More organic traffic | Monthly organic sessions | Measure at kickoff | +100% |
| Rank for buying-intent terms | Top-10 rankings for 15 target keywords | 0–2 | 8+ |
| Get cited by AI engines | Appearances across 20 tracked prompts (ChatGPT, Perplexity, Google AI Overview) | 0 | 8+ |
| Directory presence | Listings with reviews (Clutch, GoodFirms, Google Business) | 1 | 4+ |
| Leads | Monthly qualified calls booked (Cal.com) / WhatsApp inquiries | Measure at kickoff | +50% |

**Tracking method:** Keyword + AI-prompt tracking spreadsheet (see Phase 1 below), re-checked monthly.

---

## 🏗️ Phase 1 — Foundation Fixes (Month 1 / Sept 2026)

- [ ] **Build `/services/webflow-development`** — standalone indexable page with FAQ + `Service` schema (currently Webflow only exists as a homepage anchor section, no dedicated URL).
- [ ] **Build `/services/custom-web-apps-erp`** — standalone indexable page with FAQ + `Service` schema (currently only a homepage anchor section; ERPNext/Frappe expertise is otherwise proven in blog posts only).
- [ ] **Add pricing bands ("Starting from ₹X") to remaining service pages:**
  - [x] `/services/headless-commerce` — pricing language already present.
  - [ ] `/services/custom-shopify-development` — no pricing band yet, only "fixed-price roadmap" mention.
  - [ ] `/services/shopify-speed-optimization` — no pricing band yet.
  - [ ] New Webflow + Custom Web Apps/ERP pages — add pricing at build time.
- [x] **Organization schema sitewide** — already verified present on `index.astro`, all 3 live service pages, `blog/[slug].astro`, `blog/index.astro`, `blog/topic/[topic].astro`, `team.astro`, `speed.astro`, and all `/work/*` case studies.
- [x] **Person schema (Atul Bhatt) as blog author** — already implemented once in `blog/[slug].astro` (applies to every post automatically), including `knowsAbout` E-E-A-T credentials.
- [ ] **Google Search Console sitemap + priority indexing** — tracked in [TODO_MANUAL.md §1](file:///Users/atul/Documents/Projects/KlickSpell-Site/TODO_MANUAL.md) (still open).
- [ ] **Build keyword + AI-prompt tracking spreadsheet; run baseline check** (see lists in §5 and §6 below — no tracking sheet exists yet).
- [ ] **GoodFirms profile** — claim and complete (not started).
- [ ] **Clutch profile** — already submitted and awaiting review; once approved, add to `sameAs` schema per [DOMAIN_AUTHORITY_TODO.md Phase 3](file:///Users/atul/Documents/Projects/KlickSpell-Site/DOMAIN_AUTHORITY_TODO.md).

**Milestone:** Every core service has its own indexable, schema-marked, priced page. Baseline metrics captured.

---

## ✍️ Phase 2 — Content for Intent (Month 2 / Oct 2026)

- [ ] **Comparison guide:** "Shopify vs Webflow vs Custom: How to Choose" — not yet published.
- [ ] **Cost guide:** "How Much Does a Shopify Store Cost in India (2026)" — not yet published.
- [x] **Case study: Jaxon Lane** (Shopify, US brand) — already live at [`/work/jaxon-lane`](file:///Users/atul/Documents/Projects/KlickSpell-Site/src/pages/work/jaxon-lane.astro).
- [x] **Case study: Skillbridge** (Custom web app/EdTech) — already live at [`/work/skillbridge`](file:///Users/atul/Documents/Projects/KlickSpell-Site/src/pages/work/skillbridge.astro).
- [ ] **Tutorial** — publish next in the existing Shopify/Webflow how-to cadence.
- [ ] **Request 2–3 client reviews** for Clutch/GoodFirms/Google (tracked jointly with [DOMAIN_AUTHORITY_TODO.md Phase 3](file:///Users/atul/Documents/Projects/KlickSpell-Site/DOMAIN_AUTHORITY_TODO.md)).
- [ ] **Case study: SourceBae** (Talent Marketplace) — genuinely missing, no page exists yet.
- [ ] **Re-run keyword + AI-prompt tracking check.**

**Milestone:** 3 full case studies live (2 of 3 already shipped — only SourceBae remains), 2 new intent-driven articles published, first directory reviews collected.

---

## 🔗 Phase 3 — Off-Page Authority (Month 3 / Nov 2026)

> Heavily overlaps with [DOMAIN_AUTHORITY_TODO.md Phase 2 & 5](file:///Users/atul/Documents/Projects/KlickSpell-Site/DOMAIN_AUTHORITY_TODO.md) — treat that file as the source of truth for backlink/PR tactics and use this list only for the content/reporting cadence specific to this roadmap.

- [ ] Pitch 2–3 Indian startup/SaaS publications for a guest post or founder interview.
- [ ] Join 2 relevant Shopify/Webflow community forums (genuine participation, not spam).
- [ ] Publish 1 more comparison/cost-guide article.
- [ ] Pursue 1 podcast or YouTube collab appearance.
- [ ] Secure at least 1 earned backlink/mention from outreach.
- [ ] Publish 1 more tutorial (maintain cadence).
- [ ] Re-run keyword + AI-prompt tracking check; compare to Month 1 baseline.
- [ ] Review Cal.com/WhatsApp lead source data — identify best-converting page.

**Milestone (90-day mark):** At least 1 earned backlink/mention secured, measurable movement in AI-citation tracking vs. baseline, clear data on which pages convert best.

---

## 🔁 Phase 4 — Scale & Systemize (Months 4–6 / Dec 2026 – Feb 2027)

**Recurring monthly cadence (repeat each month):**
- [ ] Publish 2 new content pieces (tutorial / comparison / case study — rotate based on what performed best in Phase 2–3).
- [ ] Request 1–2 fresh reviews on Clutch/GoodFirms/Google Business.
- [ ] Re-run the keyword + AI-prompt tracking spreadsheet; log movement.
- [ ] Pursue 1 outreach effort for a backlink, guest post, or collab.

**Month 4 focus — ⚠️ needs re-targeting:** Roadmap originally called for 2 new case studies — **Cove & Lane and The Blissful Soul (headless build)** — but both are **already live** ([`/work/cove-and-lane`](file:///Users/atul/Documents/Projects/KlickSpell-Site/src/pages/work/cove-and-lane.astro), [`/work/the-blissful-soul`](file:///Users/atul/Documents/Projects/KlickSpell-Site/src/pages/work/the-blissful-soul.astro)). Pick a replacement headless-commerce case study target (e.g. Noukai Tokyo already exists too — consider Mogra Media or Pragya Vijh if not yet fully written up, or source a new client).
- [ ] Confirm Noukai Tokyo, Mogra Media, and Pragya Vijh case studies are complete/published (all pages exist — verify content depth).
- [ ] Identify and write up 1 genuinely new headless-commerce case study for Month 4.

**Month 5 focus:** Revisit and refresh the 3 oldest blog posts with updated info, better formatting (FAQ blocks, direct-answer openers) — refreshed content often re-ranks faster than new content.
- [ ] Identify the 3 oldest published posts by date.
- [ ] Refresh each with FAQ block + direct-answer opener.

**Month 6 focus:** Full audit — compare all KPIs against Month 0 baseline, identify the 2–3 highest-performing pages/tactics, and set the next 6-month plan based on real data rather than assumptions.
- [ ] Run full KPI audit vs. baseline.
- [ ] Draft next 6-month plan.

---

## 🎯 Target Keywords (starting list — refine after Month 1 tracking)

- Shopify developer India
- headless commerce agency
- Webflow agency for SaaS
- custom Shopify theme development
- Shopify speed optimization service
- ERPNext/Frappe development agency
- website development agency Uttarakhand
- how much does a Shopify store cost India
- best web development agency for startups India

## 🤖 Target AI Prompts (for GEO tracking — run monthly in ChatGPT, Perplexity, Google AI Overview)

- "Best Shopify developer for a startup in India"
- "Headless commerce agency using Medusa.js"
- "Webflow vs Shopify for a SaaS marketing site"
- "How much does a custom Shopify store cost"
- "Recommend a web development studio for a small e-commerce brand"

---

## 📝 Notes

- Prioritize substance over volume — one well-structured, schema-marked, FAQ-rich page beats five thin ones, both for Google and for AI citation.
- Every new page should follow the same pattern already proven on the Headless Commerce page: direct-answer intro, FAQ block, Service schema.
- Re-evaluate this roadmap at the Month 3 and Month 6 marks using real tracking data — treat the keyword/prompt list as a living document, not fixed targets.
- Keep this file in sync with [DOMAIN_AUTHORITY_TODO.md](file:///Users/atul/Documents/Projects/KlickSpell-Site/DOMAIN_AUTHORITY_TODO.md) and [TODO_MANUAL.md](file:///Users/atul/Documents/Projects/KlickSpell-Site/TODO_MANUAL.md) — don't duplicate a task in more than one file; link to it instead.
