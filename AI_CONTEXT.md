# Klickspell — AI Agent Context Document

> Read this entire file before writing a single line of code.
> This document is the source of truth for the Klickspell project.

---

## 1. Who is this for?

**Atul Bhatt** — Founder of Klickspell.
- Freelance web developer based in Rudrapur, Uttarakhand, India
- Running a small agency (Klickspell) with interns and employees
- Stack: Shopify, Frappe/ERPNext, DevOps, AI-integrated workflow
- YouTube channel: atoolsera.com (Shopify + Frappe tutorials)
- Existing portfolio site: atoolsera.com/shopify

---

## 2. What is Klickspell?

Klickspell is a **Shopify development agency** based in Rudrapur, Uttarakhand.

**Core positioning:**
- We build custom Shopify stores — not templates
- Every custom section is fully editable from the Shopify customizer (no developer needed for basic changes)
- We advise on app integrations honestly — based on client needs and budget, not referral fees
- We build for client independence, not dependency

**Primary stamp (never change this):**
> "The craft in every click."

**Hero line:**
> "We build the store you actually imagined."

**Mobile hero line:**
> "Your store, truly yours."

---

## 3. Brand Identity

### Colors (CSS variables — do not change without explicit instruction)
```css
--bg: #F2F0EC;          /* Warm off-white — main background */
--bg-card: #ECEAE5;     /* Slightly darker card background */
--text: #141412;        /* Near-black for primary text */
--text-mid: #4A4845;    /* Secondary text */
--text-light: #9A9790;  /* Muted/tertiary text */
--accent: #3A5BE0;      /* Primary accent blue */
--accent-hover: #2A47C0; /* Darker blue for hover states */
--accent-light: rgba(58,91,224,0.08); /* Light accent for backgrounds */
--border: rgba(20,20,18,0.1); /* Subtle border color */
--white: #FFFFFF;
--radius: 16px;
--radius-sm: 10px;
--ease: cubic-bezier(0.4, 0, 0.2, 1);
```

### Typography
- **Display/Headings:** `Instrument Serif` (Google Fonts) — elegant, editorial, warm
- **Body/UI:** `Manrope` (Google Fonts) — clean, modern, readable
- **Monospace/Labels:** `DM Mono` (Google Fonts) — used for eyebrows, numbers, stamps

### Design reference
- Inspired by OpenRipples (openripples.com) — light off-white background, large confident typography, floating UI cards, clean nav
- Aesthetic: refined minimal, not brutalist or flashy
- Hover effects: subtle and elegant — never flashy or distracting

---

## 4. Current Site Structure (index.html)

The site is a **single HTML file** with embedded CSS and JS. All sections in order:

| Section | ID | Description |
|---|---|---|
| Nav | `#nav` | Fixed, blur backdrop, scroll shadow, mobile burger |
| Mobile menu | `#mobileMenu` | Slide-in mobile nav |
| Hero | `.hero` | Concentric arc rings, floating cards, dual desktop/mobile copy |
| Clients marquee | `.clients` | Scrolling brand names, pauses on hover |
| Services | `#services` | 5 service cards in a grid |
| Differentiators | `.diff-section` | Dark section, 4 key differentiators |
| Portfolio | `#work` | 8 project cards, featured + regular + half grid |
| Process | `.process-section` | 4-step how we work |
| About | `#about` | Photo + stats + bio |
| Tutorials | `#tutorials` | 6 YouTube tutorial cards |
| CTA | `.cta-section` | Final call to action |
| Footer | `footer` | Links, stamp, copyright |

---

## 5. Portfolio Projects (all 8 live sites)

| Project | URL | Niche | Card type |
|---|---|---|---|
| Cove & Lane | https://coveandlane.in/ | Fashion & Apparel | Featured (hero card, 7 cols) |
| Jaxon Lane | https://jaxonlane.com/ | Skincare | Regular (5 cols) |
| Taarz | https://taarz.in/ | Fashion | Half (6 cols) |
| Haycure Wellness | https://haycurewellness.com/ | Wellness & Beauty | Half |
| Noukai Tokyo | https://noukaitokyo.com/ | Beauty Rituals | Half |
| Under Design | https://store.weareunder.design/ | Creative Merch | Half |
| Easy Rugs | https://easyrugs.in/ | Home Decor | Half |
| Bounce Back Drinks | https://bouncebackdrinks.com/ | Food & Beverage | Half |

**Note on screenshots:**
- Cove & Lane (featured card) uses a live screenshot API — falls back to placeholder text if API fails
- All other cards use styled italic placeholder text in `--text-light` color
- Future task: add real OG image screenshots for all project cards

---

## 6. Mobile vs Desktop Copy Differences

The site has **intentionally different copy** for mobile and desktop. Do not merge these.

| Element | Desktop | Mobile |
|---|---|---|
| Hero headline | "We build the store you actually imagined." | "Your store, truly yours." |
| Hero sub | Full 2-sentence version | Shorter 1-sentence version |
| Hero CTA | "Tell us what you're building →" | "💬 Chat on WhatsApp" |
| Hero note | "Schedule a free 30-min call · No commitment" | "Free 30-min call · No commitment" |
| CTA title | "Ready to build the store you actually imagined?" | "Let's build your store right." |
| CTA sub | Full version | Trimmed version |
| CTA button | "Tell us what you're building →" | "💬 Chat on WhatsApp" |

The swap is handled in JS via `swapCTA()` function — triggers at `768px` breakpoint.

---

## 7. Key JavaScript Behaviours

```js
// 1. Custom cursor (desktop only, hidden on mobile via CSS)
// - Small dot follows mouse immediately
// - Larger ring follows with 0.12 lag coefficient
// - Both expand on hover of interactive elements

// 2. Nav scroll state
// nav.classList.toggle('scrolled', scrollY > 40)
// Adds subtle box-shadow when scrolled

// 3. Mobile menu
// Burger button toggles .open class on both burger and menu
// Menu links close the menu on click

// 4. CTA swap (mobile/desktop)
// swapCTA() runs on load and resize
// Breakpoint: 768px

// 5. Scroll reveal
// .reveal elements animate in via IntersectionObserver
// threshold: 0.08, rootMargin: '0px 0px -40px 0px'
// Stagger delays: .reveal-delay-1 (.1s), .reveal-delay-2 (.2s), .reveal-delay-3 (.3s)

// 6. Smooth scroll
// All internal anchor links use scrollIntoView({ behavior: 'smooth' })
```

---

## 8. Hover Effects Summary (all refined/subtle)

| Element | Effect |
|---|---|
| Nav logo | Accent underline slides in from left |
| Nav links | Underline grows from left |
| Nav CTA | Shifts to accent blue, slight lift |
| Hero eyebrow pill | Border turns blue, subtle glow |
| Floating cards | Border turns blue, shadow lifts |
| Service cards | Bottom accent line slides up, number spacing expands, bg turns white |
| Diff items | Vertical accent line slides from top, number turns blue |
| Project cards | Image scales to 1.04, arrow rotates 45° and turns blue, niche tag fades in |
| Process icons | Rotate -6deg, scale 1.05, bg turns accent blue |
| About photo | Desaturation lifts (grayscale 15% → 0%), badge lifts 4px |
| Stats | Lifts 2px |
| Tutorial cards | Lifts 2px, icon scales and turns blue |
| Footer links | Accent underline grows |
| Cursor | Dot expands, ring grows on any interactive element |

---

## 9. Contact / CTA Links

All CTAs link to WhatsApp:
```
https://wa.me/919259598769
```

Portfolio link: `https://atoolsera.com/shopify`
About photo: `https://atoolsera.com/headshot-2024.jpg`

---

## 10. What Still Needs to Be Built

### High priority
- [ ] Real project screenshots for all 8 portfolio cards (currently 7 use placeholders)
- [ ] Actual klickspell.com domain deployment
- [ ] Contact/inquiry form or Calendly embed (currently WhatsApp only)
- [ ] Logo — designer brief exists separately, add when ready
- [ ] Case studies — individual project pages with process, screenshots, results
- [ ] SEO meta tags — title, description, OG image, canonical URL

### Medium priority
- [ ] Blog / content section (Shopify tips, case studies)
- [ ] Testimonials section — add when client reviews collected
- [ ] Google Analytics or Plausible tracking
- [ ] Sitemap and robots.txt
- [ ] Performance audit — image optimization, lazy loading

### Nice to have
- [ ] Dark mode toggle
- [ ] Filter/sort on portfolio (by niche)
- [ ] Animated counter for stats (8+, 3+, 12+)
- [ ] Page transition animations
- [ ] Multi-page version (separate /services, /work, /about pages)

---

## 11. What NOT to Change (without explicit instruction)

- Brand stamp: **"The craft in every click."** — permanent, never edit
- Color palette — especially `--accent: #3A5BE0` and `--bg: #F2F0EC`
- Typography trio: Instrument Serif + Manrope + DM Mono
- Mobile/desktop copy split — intentional design decision
- Hover effect intensity — already calibrated to "subtle and refined"
- WhatsApp CTA link

---

## 12. Tech Stack & Constraints

- **Single HTML file** — all CSS and JS embedded, no external files except Google Fonts CDN
- **No framework** — vanilla HTML/CSS/JS only
- **No build step** — file should work by opening in a browser directly
- **No localStorage or sessionStorage** — not supported in this environment
- **Google Fonts CDN** — Instrument Serif, Manrope, DM Mono
- **No jQuery** — vanilla JS only
- **Target browsers** — modern (Chrome, Safari, Firefox, Edge) — no IE support needed
- **Breakpoints** — primary mobile breakpoint at `768px`, tablet at `900px`

---

## 13. File Structure

```
klickspell-project/
├── index.html          ← Main site (single file, all CSS + JS embedded)
├── AI_CONTEXT.md       ← This file — read before doing anything
├── BRAND_COPY.md       ← All copy: taglines, brand story, service descriptions, bios
└── CHANGELOG.md        ← Track changes made by each agent session
```

---

## 14. Agent Instructions

When working on this project:

1. **Read AI_CONTEXT.md first** — every session, no exceptions
2. **Check CHANGELOG.md** — understand what's already been done
3. **Write to CHANGELOG.md** — log every meaningful change you make
4. **Preserve the single-file constraint** — unless explicitly asked to split into multiple files
5. **Match the existing hover effect intensity** — subtle, not flashy
6. **Test mobile breakpoints** — always check 375px and 768px after any CSS change
7. **Never change the brand stamp** — "The craft in every click."
8. **When adding new sections** — follow the existing section pattern: eyebrow → title → content
9. **When adding new colors** — add to `:root` as a CSS variable, never hardcode
10. **When unsure about copy** — refer to BRAND_COPY.md, never invent new brand language
