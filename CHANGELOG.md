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

---

## 2026-10-20 · Claude (Anthropic)

### Added
- Blog post `german-e-invoicing-erpnext-xrechnung-zugferd.md` (German e-invoicing in ERPNext), written in Atul's first-person style
- Jargon tooltips + glossary for blog posts: `.prose a.term` and `.prose .glossary` in `src/styles/style.css`
- `BLOG_WRITING_GUIDE.md`: how to write blog posts in Atul's human voice, phrases to avoid, tooltip/glossary pattern
- `CLAUDE.md`: points agents to `AI_CONTEXT.md` and, for blog work, `BLOG_WRITING_GUIDE.md`
- `AI_CONTEXT.md` §14: rule 11 (follow the blog writing guide)

### Why
- Blog posts were starting to read as AI-generated; non-technical readers needed jargon explained

---

## 2026-10-22 · Claude (Anthropic)

### Changed — company legal details
- `src/pages/index.astro`: `legalName` "KlickSpell Private Limited" and `foundingDate` 2026-05-25 in the ProfessionalService schema; About copy now says incorporated in May 2026
- `src/pages/atul-bhatt.astro`: same two fields on `worksFor`
- `src/components/Footer.astro`: copyright now reads "© 2026 KlickSpell Private Limited"
- `AI_CONTEXT.md` §2: legal entity details, and a note that the experience stat is not the founding year

### Why
- Klickspell was incorporated on 25 May 2026; the site had no founding date, and the 2020 career start was being misread as one

### Changed — Jaxon Lane case study
- `src/pages/work/jaxon-lane.astro`: three new feature cards from the theme repo history (theme upgrade & loyalty, promotions engine, quiz/guides/conversion features)
- "More than a year into the relationship" now auto-calculates from `partnerSince` (Feb 2025), at build time and again in the browser so it stays current between builds

### Why
- The case study undersold the work in the repo, and a hardcoded duration goes stale

### Changed — site-wide fact check
- `src/pages/work/jaxon-lane.astro`: testimonial was Eden Vidal's quote credited to Jen Yu; replaced with Jen Yu's own quote (as on the homepage)
- `src/pages/work/mogra-media.astro`: "global feature films on Apple TV+ and Prime Video" → "documentaries streaming on…" (matches mogramedia.com/about)
- `src/pages/speed.astro` + `the-2026-shopify-app-bloat-benchmark-study.md`: replaced the misattributed "every 100ms = 1% conversion (Google/Deloitte)" with Deloitte's actual finding (0.1s faster → +8.4% retail conversions), linked to web.dev
- `setup-free-oracle-cloud-24gb-ram-vps.md`, `fix-oracle-cloud-out-of-host-capacity.md`: Oracle's Always Free Ampere allowance is now 2 OCPU / 12 GB / up to 2 instances (was 4 / 24 / 4); added update notes and Oracle docs link; removed unsourced "$100" card hold; title no longer says 24 GB (slug kept)
- `the-origin-of-javascript-from-the-opensource.md`: Netscape open-sourced Communicator/its JS engine in 1998 (not 2002) and that started Mozilla; B's purpose reworded; sources added (Ritchie, Eich & Wirfs-Brock, Mozilla)
- `how-we-overhauled-our-technical-seo-and-schema-architecture.md`: fonts corrected to Instrument Serif/Manrope/DM Mono; ping step now says IndexNow only (Google retired sitemap ping in 2023); llms.txt described as a proposal, not a spec
- GoKwik/checkout posts: GoKwik now claims 20,000+ brands (was 15,000+; Noise removed — not on their site); "up to 40%" conversion; 3.5% Emerging fee applies to all transactions per pricing page; Shopify Help Center link for the draft-order fee exemption
- Sources added: Spiegel Research Center (Judge.me post), GitHub Octoverse 2025 (180M+ developers), Clarity FAQ, Shopify pricing; Shopify "Shopify" plan renamed "Grow"

### Why
- Atul asked for every factual claim on the site to be verified and referenced; unverifiable claims were listed for him to confirm rather than changed
- `src/components/Footer.astro`: added CIN and registered office (Bilaspur, Rampur, UP 244921) on every page, per Companies Act website disclosure; source: public MCA data via falconebiz.com
- `src/pages/index.astro`, `src/pages/services/index.astro`, `AI_CONTEXT.md`: "no kickbacks" promise now also says partnerships (GoKwik, Razorpay, Cashfree) are disclosed up front and don't change recommendations, so it matches the disclosures in the checkout posts
- `src/pages/speed.astro` + `style.css`: when Google PageSpeed fails (quota, bad URL, Lighthouse runtime error, timeout, network), the tool now shows the reason (with Google's own message) and a "Try again" button, instead of a made-up score from a hash of the domain or the saved klickspell.com benchmark. Live results no longer fill in invented apps/scripts/metrics when Google returns none. Timeout raised 25s → 60s
- `src/pages/index.astro`: removed "Founder, SourceBae" from Saswat Panda's testimonial and review schema (he is not linked to SourceBae, per Atul)
- `src/pages/index.astro`: Saswat Panda's role set from his LinkedIn (stealth AI startup founder, ex-Microsoft, HBS); unverifiable "Forbes 30 Under 30" removed
- Removed "ex-HP" from Rajesh Durai (homepage testimonial, Skillbridge case study incl. meta/schema, llms-full.txt), per Atul
- `src/pages/index.astro`: Karan Dubey's role now just "ex-Tealbox Digital" (smallest.ai role unconfirmed), per Atul
- `src/pages/index.astro`: Eden Vidal's title "Founder & CEO" → "Co-founder, Under" (Under LinkedIn: founded 2017 by Eden Vidal and Inbal Lapidot Vidal; no CEO title found)
- Team size wording made consistent: 5 engineers (incl. Atul) + 1 product designer (homepage stat label + team teaser, atul-bhatt profile); "20+ projects shipped" confirmed by Atul
- Speed promise reframed site-wide (15 files: homepage, nav, services hub, speed service, headless, quote builder, speed tool, blog in-article CTA, 4 blog CTAs, Mogra, llms.txt/llms-full.txt): blanket "guaranteed/contractual 90+" → a 90+ target agreed in writing after a free audit, with free re-work if Klickspell's own code/recommendations miss it, plus passing real-user Core Web Vitals. Hard promises softened: "<50 ms TBT" → "<200 ms (Lighthouse 'good')", "sub-1.2s LCP & 0ms CLS" → "passing Core Web Vitals", "<0.8s LCP" → "Fast LCP (inside Google's 2.5s 'good' range)", "99+ Core Web Vitals" (not a real metric) → "passing Core Web Vitals". Why: Atul confirmed a 90+ guarantee isn't achievable for every store
- `services/shopify-speed-optimization.astro`: unsourced hero "Slow stores lose 40% of sales" → "A 1-second store converts 2.5x better than a 5-second one" (Portent 2022); new "Why speed matters" section with three sourced stats (Portent 2.5x, Deloitte/Google +8.4%, Vodafone +8% sales)
- Timelines unified site-wide: landing pages 7–14 days, full Webflow sites 2–4 weeks, custom Shopify 3–6 weeks, headless/full-stack 6–10 weeks, speed sprint 2–3 weeks (was 5–10 / 7–14 business days); every call is 30 minutes (was 15/20 min in places, all linking to the 30-min booking). Files: homepage FAQ + schema, services hub, speed service page, 7 blog posts
- `how-we-overhauled-our-technical-seo-and-schema-architecture.md`: contrast bullet corrected from git history (commits b31073a/4dd3802): added `--accent-on-dark #7B98FF` and raised white-on-dark text opacity, not lime/emerald tokens
- `src/components/Footer.astro`: full registered office address (C/o Ramesh Chandra Bhati, Sody Colony, Bilaspur, Rampur, UP 244921), per Atul
- Unsourced stats softened to experience (Q19): 67% return-policy, 75% token savings, 40–60% slower ARM bench, 95% ERPNext fix rate, "thousands per year", "$200/month", "($350)", "$10M+ GMV"
- `work/mogra-media.astro`: corrected to measured live-site facts (local Lighthouse, Oct 2026): "<35 KB JS" → "~25 KB first-party JS" (114 KB incl. CDN jQuery/Slick/Fancybox); "100/100 SEO & Accessibility" → "100/100 SEO" (accessibility measured 86); removed "sub-second", "60 FPS", "award-winning", "cut onboarding time in half"
- `work/cove-and-lane.astro`: removed unmeasured "45+ updates" stat and "measurable drop in checkout drop-offs"; `work/pragya-vijh.astro`: removed unmeasured "high conversion rates" (Atul has no numbers yet)
- Checkout/GoKwik posts + both quizzes: every vendor figure now linked to the vendor's own page, dated "checked 22 Oct 2026". Corrections from those pages: GoKwik network "200M+" → 220M+ (Kwik Pass; same page also says 50M+); GoKwik "40% RTO reduction" not on gokwik.co → removed; True Elements "134%" quote unsourced → removed; Razorpay network "200M+ saved addresses" → "trained on 100M+ shoppers"; Cashfree "up to 30% RTO reduction" → "90%+ reported by a customer"; Razorpay 0% promo is "first 90 days or first ₹5L, accounts activated from 1 July 2026" (was "under ₹5L/month"); "10 GoKwik products" = 9 on gokwik.co + Kwik Finance lending arm
- `partners/look-beyond.astro`: matched to lookbeyond.sg/imprint and /partners: "founded by Julien Look" → "led by Managing Director Julien Look" (imprint linked); "partners from Europe, South Asia and South East Asia" → partners by specialty (linked), since the site lists no regions
- `partners/look-beyond.astro`: removed the "1,900+ products" figure (unconfirmed), per Atul
- `work/pragya-vijh.astro`: added "First six months live" results from the Medusa order export (17 Apr–22 Oct 2026, test orders ≤₹10 excluded): 273 paid orders, ₹1,082 AOV, 15% repeat customers; revenue deliberately not published
- `src/pages/speed.astro`: PageSpeed API calls now use a dedicated, domain-restricted browser API key (own 25k/day quota) instead of the shared anonymous quota
- `src/pages/index.astro`: removed the 3-item `review` array from the ProfessionalService schema to fix Search Console "Multiple reviews without aggregateRating". Self-serving reviews on a business's own site are not eligible for review rich results, so no aggregateRating was added; visible testimonials unchanged
- `work/noukai-tokyo.astro`: checked against the Noukai repo (git history + code). Phase 1 (14 Dec 2025 – 17 Jan 2026) confirmed; Phase 2 corrected to 13 Jun – 24 Aug 2026 (was Jul – 12 Aug); hiatus "late Jan – mid-Jun". Stack fixes: Vite 5 → 6, Hydrogen 2025.7, React 18; removed "React Server Components" (not used); Cloudinary "f_auto,q_auto:best / adaptive bitrate" → separate desktop/mobile 4K files (no transformations in code); lead-capture route `_index.tsx` → `coming-soon.tsx`; Admin API 2024-04 kept, Storefront version dropped; "monorepo" → "codebase" (no workspaces). Confirmed as-is: model-viewer SSR externalization, -30°→330° orbit, ENTER_EXIT_FRACTION 0.22, CSP nonces, Oxygen GitHub Actions deploy
- `work/klickspell-online.astro`: "230+ dishes" (one café's menu, Café Aananda = 233) → "2,000+ menu items across 64 venues" (2,015 MenuItem entries in live JSON-LD, cross-checked against the database). Ranking claims removed: live India SERP (22 Oct 2026) shows klickspell.online outside the top ~27 for "best smoothie bowl in Tapovan", "ceremonial cacao Rishikesh" and "pet friendly cafes in Rishikesh"; section reframed as target searches, with an honest "still early" note. "Mutual PageRank distribution" → "cross-links"

---

## 2026-10-23 · Antigravity

### Added
- `src/content/blog/startup-benefits-free-credits-india-guide.md`: Comprehensive, grounded guide on free cloud credits (Microsoft Founders Hub, AWS Activate, Google for Startups, Oracle Always Free), DPIIT Startup India benefits and tax exemption reality, MSME Udyam registration protections (MSMED Act 45-day payment rule & Section 43B(h)), Razorpay Rize perks, essential SaaS startup discounts, and state startup policies (UP & Uttarakhand). Written in Atul's personal first-person voice with interactive tooltips, complete glossary definitions, and zero AI cliches.
- Every claim, program figure, and statutory rule is cited with inline official links (checked Oct 2026), plus a dedicated "Sources & Official Portals" index before the glossary.

### Why
- Authored a detailed, practical guide outlining all the free credits, grants, legal protections, and startup programs that a bootstrapped tech company in India (like Klickspell) can avail without VC backing, fully backed by verified official sources.

---

## 2026-10-23 · Claude

### Changed
- Brand logo: text wordmark in `Nav.astro` and `Footer.astro` replaced with the new icon + wordmark WebP (`public/assets/klickspell-logo.webp`, transparent, 564×128). Nav shows it at 34px tall; footer uses `klickspell-logo-dark.webp` (30px), a copy with the black "Klick" recoloured white and the blue icon/"spell" left as-is

---

## 2026-10-23 · Antigravity

### Added
- `src/pages/startup-benefits-quiz.astro` (`/startup-benefits-quiz`): Interactive 5-question tool that determines which free cloud credits, DPIIT startup recognition perks, MSME legal protections (MSMED Act 45-day payment rule & Section 43B(h)), and state grants an Indian company is eligible for. Features live real-time scorecards, estimated rupee values unlocked, and a customized 3-step action sequence.
- `src/content/blog/startup-benefits-free-credits-india-guide.md`: Integrated an inline interactive quick-checker component and jump banner linking directly to the full eligibility tool.

### Why
- Enable readers to interactively test their specific company structure, age, and location to immediately see their exact eligibility and avoid application guesswork.
