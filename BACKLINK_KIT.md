# Backlink Kit — klickspell.com

> Ready-to-use material for earning backlinks: current status, what to do first, copy to paste into profiles, outreach emails and a tracker.
> Strategy and the full list of tactics live in [DOMAIN_AUTHORITY_TODO.md](DOMAIN_AUTHORITY_TODO.md). This file holds the working material. Status below was checked on **24 Nov 2026**.

---

## 1. Where we stand

| Item | Status (24 Nov 2026) | Next step |
|---|---|---|
| Client sites linking to klickspell.com | **0 of 18**. Only our own klickspell.online links back. (Under Design didn't load; a site whose footer is built in JavaScript could hide a link.) | Section 4: ask each client |
| dev.to canonical URLs | **17 of 17 set** to klickspell.com | Done |
| Medium canonical URLs (9 posts) | Couldn't check, Medium blocks automated requests | Check by hand, see [CANONICAL_URL_TODO.md](CANONICAL_URL_TODO.md) |
| Clutch | Submitted, under review (Clutch blocks automated checks) | Get 1–2 client reviews so it goes live |
| GoodFirms | **No profile** | Create, using section 3 |
| DesignRush, Product Hunt | Unknown (they block automated checks) | Check while logged in |
| LinkedIn company page | Exists (`linkedin.com/company/klickspell`) | Confirm it's ours, then add to site schema `sameAs` |
| GitHub organisation `klickspell-tech` | Exists | Add website URL to the org profile and to `sameAs` |
| Astro showcase | Not submitted, as far as we know | Section 5 |

---

## 2. Do these first

Ranked by how much each link is worth against the effort.

1. **Client mentions (up to 18 sites).** Relevant brands linking to the agency that built them is the strongest signal we can get, and it's work we've already done. See section 4.
2. **Astro showcase.** klickspell.com is built with Astro. astro.build is a high-authority site and listing is free. See section 5.
3. **Shopify Partner Directory.** Complete the profile in the Partner Dashboard and link klickspell.com. It's the directory Shopify merchants actually search.
4. **GoodFirms, DesignRush, Sortlist.** Paste the profile from section 3. Keep every detail identical everywhere.
5. **Launch the free tools.** The Speed & App Bloat Estimator on Product Hunt, and the App Bloat Benchmark study as a regular Hacker News submission. See section 6.
6. **Journalist queries.** Featured.com and Qwoted, 2–3 answers a week. See section 7.
7. **Medium canonicals.** Five minutes per post, listed in CANONICAL_URL_TODO.md.

---

## 3. Company profile (paste into every directory)

Search engines cross-check these details between sites, so use exactly this everywhere.

| Field | Value |
|---|---|
| Name | Klickspell |
| Legal name (only where a form asks for it) | KlickSpell Private Limited |
| Website | https://klickspell.com |
| Location | Rudrapur, Uttarakhand, India (team works remotely) |
| Phone / WhatsApp | +91 92595 98769 |
| Email | atul.bhatt@klickspell.com |
| Founded (company) | 2026 (incorporated 25 May 2026). Don't give 2020; that's when Atul's career started |
| Founder | Atul Bhatt |
| Team size | 2–10 |
| Logo | https://klickspell.com/assets/klickspell-logo.webp |
| Tagline | The craft in every click. |
| Services | Custom Shopify development · Shopify speed optimization · Headless commerce (Medusa.js, Hydrogen) · Webflow sites · Landing pages · Custom web apps & ERPNext |

**Short description (under 160 characters):**
> We build the digital products, Webflow sites, and stores you actually imagined, and hand them back fully yours.

**Long description:**
> Klickspell is a web engineering studio building custom Shopify stores, Medusa.js headless commerce, Webflow marketing sites and tailored web applications. Every section we build is editable from your platform's customizer or CMS, so your team doesn't call a developer for everyday changes. We help you choose platforms and apps based on what you actually need and can afford, not on referral fees, and every project ends with full documentation and a clean handover. You talk directly to the people building your product. We work with brands in India, the US, the UK, Israel and Japan.

**Portfolio links to add where a directory allows them:** [Jaxon Lane](https://klickspell.com/work/jaxon-lane) · [Noukai Tokyo](https://klickspell.com/work/noukai-tokyo) · [Pragya Vijh](https://klickspell.com/work/pragya-vijh) · [Cove & Lane](https://klickspell.com/work/cove-and-lane) · [Bambrew](https://klickspell.com/work/bambrew)

---

## 4. Client mentions

### What to ask for, best first

1. **A mention with a link on their About, Press, Partners or Credits page**, or in a blog or LinkedIn post about the build. A link in context counts for the most.
2. **A footer credit** next to the copyright line. Use the brand name only as the link text ("Klickspell" or "Built by Klickspell"). Never keyword text like "best Shopify developer India"; Google treats keyword-rich footer links spread across many sites as link spam.
3. **A review** on Clutch or the Shopify Partner Directory. It doesn't add a link on their site, but it gets our profiles approved and ranked.

### Footer credit snippet

Shopify (`sections/footer.liquid`, next to the copyright):

```liquid
<a href="https://klickspell.com" target="_blank" rel="noopener">Built by Klickspell</a>
```

Webflow or plain HTML: the same `<a>` tag. Don't add `rel="nofollow"`, and keep the link visible (not hidden or the same colour as the background).

### Email template

Send it from Atul's own email. Change the bracketed parts, and add one real line about the client so it doesn't read like a mass mail. Offer something back, and give them a few easy options: any one of them helps.

> **Subject:** Quick favour (and a free speed check) for [Brand]
>
> Hi [first name],
>
> Hope things are good at [Brand]. [One real line: how the last launch went, a number you saw, something they said.]
>
> We finally wrote up the work we did together: [case study link]. Have a look when you get a minute, and tell me if anything is wrong or you'd rather we left something out.
>
> As a thank-you, I'd like to run a free speed check on [store] and send you the two or three quickest fixes. No strings attached.
>
> I also wanted to ask a small favour. Would you be open to any one of these?
>
> 1. A small mention with a link on your About or Credits page, or a "Built by Klickspell" line in the footer. We can add the footer one for you, it takes five minutes.
> 2. A short review of working with us on Clutch: [Clutch review link]
> 3. Two or three lines we can use as a testimonial on our website, with your name and role.
>
> Any one of these helps us a lot. And totally fine if none of them work for you, it won't change anything on our side.
>
> Thanks,
> Atul

- No case study yet: drop the "We finally wrote up…" paragraph.
- Big brands that won't want an agency name on their site: keep only options 2 and 3.
- Agency clients (Tealbox Digital, Mogra Media): option 1 becomes "listing Klickspell as your development partner". Skip anyone whose work was white-label or under an NDA.
- No reply after a week: one short reminder, then leave it.

### Clients

| Client | Site | Our case study | Status |
|---|---|---|---|
| Jaxon Lane | jaxonlane.com | /work/jaxon-lane | Not asked |
| Noukai Tokyo | noukaitokyo.com | /work/noukai-tokyo | Not asked |
| Pragya Vijh | pragyavijh.com | /work/pragya-vijh | Not asked |
| Cove & Lane | coveandlane.in | /work/cove-and-lane | Not asked |
| Bambrew | bambrew.in | /work/bambrew | Not asked |
| Mogra Media | mogramedia.com | /work/mogra-media | Not asked |
| Skillbridge | skillbridge.net | /work/skillbridge | Not asked |
| DealShare | about.dealshare.in | /work/dealshare | Not asked |
| CallSara AI | callsara.ai | /work/callsara-ai | Not asked |
| Tealbox Digital | tealbox.digital | — | Not asked |
| Nuva Gurukul | nuvagurukul.com | — | Not asked |
| Easy Rugs | easyrugs.in | — | Not asked |
| SourceBae | sourcebae.com | — | Not asked |
| ARBC | arbc.in | — | Not asked |
| Bounce Back Drinks | bouncebackdrinks.com | — | Not asked |
| Under Design | store.weareunder.design | — | Not asked |
| Haycure Wellness | haycurewellness.com | — | Not asked |
| Taarz | taarz.in | — | Not asked |

---

## 5. Ecosystem listings

- **Astro showcase** ([astro.build/showcase](https://astro.build/showcase)). Submit klickspell.com through the submit link on that page. (A client's Astro site listed there links to the client, not to us, so only our own site is worth submitting.)
- **Shopify Partner Directory** ([shopify.com/partners/directory](https://www.shopify.com/partners/directory)). Set it up from the Partner Dashboard. Profile copy is in section 3; ask Shopify clients for reviews there.
- **Medusa.** Check the partner/agency page on medusajs.com. Pragya Vijh (Medusa v2 + Next.js + Cal.com) is the case study to lead with.
- **Frappe / ERPNext.** frappe.io lists service partners. Check the current criteria before applying.
- **Tool vendors we use in client builds** (Recharge, Klaviyo, Judge.me, Awin). Most have agency partner directories or publish implementation stories. Lead with Jaxon Lane (Recharge subscriptions and the Awin migration).

---

## 6. Launch posts for the free tools and the study

Only post where self-promotion is allowed, and post as Atul, not as a brand account.

**Product Hunt: Speed & App Bloat Estimator** (https://klickspell.com/speed)
- Tagline (60 characters max): *See how much speed your Shopify apps are costing you*
- First comment: why Atul built it (the client problem behind it, in his own words), what it measures, what it doesn't, and that it's free with no signup.

**Hacker News: App Bloat Benchmark** (https://klickspell.com/blog/the-2026-shopify-app-bloat-benchmark-study)
- Title, plain and factual: *Measuring how 25 Shopify apps affect mobile page speed*
- Be ready to answer method questions (devices, throttling, sample size) in the comments.

**Reddit** (r/shopify and similar): read each subreddit's rules first. Share the findings in the post itself and link only as the source. A plain "check out our tool" post usually gets removed.

---

## 7. Journalist queries (digital PR)

- Sign up on **Featured.com** and **Qwoted**. Connectively, the old HARO linked in the roadmap, has shut down.
- **Topics Atul can answer with real experience:** Shopify speed and Core Web Vitals, app bloat, Shopify subscriptions (Recharge), headless commerce (Medusa, Hydrogen), checkout for Indian D2C stores.
- When an answer mentions GoKwik, Razorpay or Cashfree, **say that Klickspell is a referral partner** of them (see AI_CONTEXT.md).
- Answer within a few hours of the query going out, keep it to 2–3 specific sentences with one real number or example, and sign it "Atul Bhatt, Founder, Klickspell (klickspell.com)".

---

## 8. More directories and citations

Mostly lower value, but they build trust and send some traffic. Use the section 3 copy.

| Directory | URL |
|---|---|
| Google Business Profile | business.google.com |
| Bing Places | bingplaces.com |
| Sortlist | sortlist.com |
| TechBehemoths | techbehemoths.com |
| Crunchbase | crunchbase.com |
| Startup India profile (if DPIIT-recognised) | startupindia.gov.in |

---

## 9. Don't

- Don't buy links, packages ("100 backlinks for $20"), or guest posts on sites that exist to sell them. Google penalises these, and recovery takes months.
- Don't use link exchanges at scale, comment or forum spam, or private blog networks.
- Don't use keyword-stuffed link text in footers, widgets or profiles. Use the brand name or the page title.
- Don't hide client credit links (tiny text, same colour as the background). A link people can't see is treated as spam.

---

## 10. Tracker

The live tracker is the shared sheet **[Klickspell Backlinks](https://claude.ai/artifact/EGHunPVKbHXyK2bAjVZubb)**: every target above with its type, priority, status, owner, the page it should link to, where to submit, the date asked and the live link. Update the Status column as you go; the counts at the top add up by themselves. Check new links in Search Console → Links → Top linking sites.
