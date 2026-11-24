// FAQ content shared by the FAQ section (components/Faq.astro) and the FAQPage JSON-LD.
// Google requires FAQ markup to match the questions and answers visible on the page, so both are
// built from the same list: edit a question here and the section and the schema change together.

export interface FaqItem { q: string; a: string }

/** General questions: the FAQ on the home and services pages (FAQPage schema on the home page only). */
export const defaultFaqs: FaqItem[] = [
  {
    q: 'What platforms and stacks does Klickspell specialize in?',
    a: 'We engineer across five primary verticals: Custom Shopify theme and Hydrogen headless development, Webflow for SaaS & marketing sites, Headless Commerce (Medusa.js + Cal.com integrations), High-Converting Lead Landing Pages, and Custom Web Applications / ERP Systems (Frappe/ERPNext).',
  },
  {
    q: 'How long does a project take?',
    a: "High-converting landing pages typically go live in 7–14 days and full Webflow sites in 2–4 weeks. Custom Shopify stores take 3–6 weeks from approved designs, and headless or full-stack builds 6–10 weeks, depending on complexity. You'll receive a committed milestone timeline in your scope proposal.",
  },
  {
    q: 'How much does a project cost?',
    a: "Every project is scoped and quoted individually based on what you actually need, with no rigid packages or surprise invoices. You'll know the complete cost before we write a single line of code.",
  },
  {
    q: 'Will I be able to edit the site myself after launch?',
    a: 'Yes, that is central to how we build. Whether on Shopify, Webflow, or a custom CMS, all sections are built to be easily editable (text, imagery, layout blocks) by non-technical team members without developer calls.',
  },
  {
    q: 'Can you build custom headless commerce or custom integrations (like Medusa.js & Cal.com)?',
    a: 'Yes. When off-the-shelf platforms are too restrictive, we build headless commerce backends with Medusa.js, integrate Cal.com scheduling workflows, and create custom APIs tailored to your exact business logic.',
  },
  {
    q: 'Do you offer support after the site goes live?',
    a: "Yes. Every project ends with full documentation and a recorded walkthrough. If you'd like ongoing peace of mind, we also provide maintenance retainers and day-to-day store/site management.",
  },
  {
    q: 'Do you work with clients outside India?',
    a: "Yes. We've shipped products for brands across the US, UK, Israel, Japan, and India. We operate asynchronously with high communication fidelity and align calls with your local timezone.",
  },
];

/** FAQPage JSON-LD for a list of questions shown on the page. */
export const faqPageSchema = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
