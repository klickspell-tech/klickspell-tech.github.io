---
title: "German E-Invoicing in ERPNext: XRechnung, ZUGFeRD and How to Validate Them"
description: "How I took on Germany's 2027 e-invoicing mandate for a client running ERPNext: what XRechnung and ZUGFeRD actually are, the open-source app that does the heavy lifting, and a free validation loop to prove your invoices are compliant."
pubDate: 2026-10-20T00:00:00.000Z
author: "Atul Bhatt"
tags: ["ERPNext", "Frappe", "E-Invoicing", "XRechnung", "ZUGFeRD", "Germany", "Compliance"]
canonicalUrl: "https://klickspell.com/blog/german-e-invoicing-erpnext-xrechnung-zugferd"
readingTime: "15 min read"
---

I'm currently building the second phase of an ERPNext setup for a textile printing company in Germany. Most of the work list was what you'd expect: shipping rates, email integration, some workflow fixes. And then there was this one line:

> **E-invoicing (XRechnung + ZUGFeRD).** Mandatory from January 1, 2027.

Every other item could slip by a week if needed. This one couldn't, because it's the law. So the first thing I did was check what we already had for it. The answer was **nothing**. ERPNext was printing a clean PDF invoice and that was it. I even grepped our custom app for `xrechnung`, `zugferd` and `einvoice` just to be sure. Zero results.

I'd never worked with German e-invoicing before, so this post is basically my notes from figuring it out: what the law actually asks for, why I decided not to write the XML generator myself, and how I'm going to **check** that the invoices are correct instead of just hoping they are.

*Quick note: words with a <a class="term" href="#glossary" data-tip="Like this one. Hover for a quick definition, or click to jump to the full glossary at the end.">dotted underline</a> have a short explanation when you hover over them. On mobile, tap them to jump to the [glossary](#glossary) at the end. There's a lot of German and invoice jargon in this topic, so don't worry if it's new to you. It was new to me too.*

---

## So What Changed in Germany?

Germany passed a law called the <a class="term" href="#g-wachstumschancengesetz" data-tip="The 2024 German 'Growth Opportunities Act'. Among many tax changes, it made structured e-invoices mandatory for domestic B2B sales.">*Wachstumschancengesetz*</a>, and it changed what an "e-invoice" (*E-Rechnung*) means. This was the part that surprised me most: **a PDF sent by email is not an e-invoice anymore.** Legally it's now an "other invoice" (*sonstige Rechnung*). A real e-invoice has to be structured data that software can read, following the European standard <a class="term" href="#g-en16931" data-tip="The European standard that defines which fields an electronic invoice must contain and how they relate to each other.">**EN 16931**</a>.

For invoices between German businesses (<a class="term" href="#g-b2b" data-tip="Business-to-business: one company selling to another. B2C means selling to private consumers.">B2B</a>), it's rolled out in steps:

| Date | What changes |
|---|---|
| **Jan 1, 2025** | Every German business must be able to **receive** e-invoices. |
| **Jan 1, 2027** | Businesses with prior-year turnover above **€800,000** must **issue** e-invoices. |
| **Jan 1, 2028** | Everyone must issue them. |

My client falls in the 2027 group. We also have go-live and staff training planned for December, so realistically there's no buffer at all.

Invoices to private customers (B2C) and small invoices up to €250 are not covered. That became one of my first questions to the client: do we send e-invoices to every customer, or only to businesses? The answer changes how much work this is.

---

## XRechnung vs. ZUGFeRD

Honestly, the acronyms took me a whole evening to sort out. Here's how I understand them now:

- **EN 16931** is the European standard. It doesn't define a file, it defines the *fields* an invoice has (seller, buyer, lines, tax, payment terms) and gives each one an ID, called a <a class="term" href="#g-bt" data-tip="Every field in EN 16931 has a numbered ID, like BT-1 for the invoice number. Validation errors refer to these numbers.">business term</a>. For example `BT-1` is the invoice number and `BT-10` is the buyer reference.
- <a class="term" href="#g-xrechnung" data-tip="Germany's national e-invoice format: a pure XML file with no visual layout, built on EN 16931 with extra German rules.">**XRechnung**</a> is the German version of that standard (a <a class="term" href="#g-cius" data-tip="Core Invoice Usage Specification: a country's stricter version of EN 16931 that adds its own rules on top.">*CIUS*</a>, if you want the official term). It's **only XML**, written in either <a class="term" href="#g-ubl-cii" data-tip="UBL and CII are two XML 'languages' for writing the same invoice data. Both are allowed for XRechnung.">UBL or CII</a> format, plus some extra German rules. No human is meant to read it directly.
- <a class="term" href="#g-zugferd" data-tip="A hybrid invoice: a normal-looking PDF for humans with the machine-readable XML file embedded inside it.">**ZUGFeRD**</a> (the French call the same thing **Factur-X**) is a mix of both: a <a class="term" href="#g-pdfa3" data-tip="An archive-safe PDF format that is allowed to carry attached files, which is how the XML travels inside a ZUGFeRD invoice.">PDF/A-3</a> that looks like a normal invoice, with the XML file hidden inside it. It has different profiles: `MINIMUM`, `BASIC WL`, `BASIC`, `EN16931`, `EXTENDED` and `XRECHNUNG`.

> One thing to watch out for: ZUGFeRD `MINIMUM` and `BASIC WL` **don't count** as e-invoices under German law, because they leave out too much data. If you go with ZUGFeRD, use `EN16931` or higher.

For my client, ZUGFeRD looks like the easier switch. Their customers are used to getting a PDF, and with ZUGFeRD they still get one. The difference is that their accounting software can now read the data inside it.

---

## What ERPNext Already Had

Before writing any code, I went through the client's ERPNext data and compared it with what EN 16931 needs. This part was actually good news:

- **Seller tax ID.** Required on every XRechnung. We were already printing it on every invoice, so the data was there.
- **Buyer VAT ID.** Only a small number of customers had one. I panicked a bit at first, but then realised it mainly matters for EU customers and <a class="term" href="#g-reverse-charge" data-tip="A rule where the customer, not the seller, pays the VAT to the tax office. The invoice shows no VAT but must say why.">reverse charge</a> cases, and those were exactly the customers who *had* it filled in.
- **Credit notes and cancellations** (<a class="term" href="#g-storno" data-tip="German for cancelling or correcting an invoice. You never edit or delete an issued invoice; you issue a credit note that refers to it.">*Storno*</a>, *Rechnungskorrektur*). ERPNext already handles these with `is_return` and `return_against`. They map to invoice type codes (`380` for an invoice, `381` for a credit note) and a reference to the original invoice (`BT-25`). So it's mapping, not building something new.
- **Tax rates.** The client uses only 19%, plus 0% for VAT-exempt customers. No mixed rates to deal with.
- **Early-payment discount (<a class="term" href="#g-skonto" data-tip="German for an early-payment discount, e.g. 2% off if paid within 14 days.">Skonto</a>).** This one needs work. XRechnung wants it in a fixed text format inside the payment terms, like `#SKONTO#TAGE=14#PROZENT=2.00#`, not as a normal sentence.

Some things I couldn't figure out from the data, so I sent them to the client:

1. Do we send XRechnung for every invoice, or only to businesses?
2. Does the full credit-note history need to be inside the XML, or just a reference to the correct original invoice?
3. What exact reverse-charge text (<a class="term" href="#g-section-sign" data-tip="§ is the 'section sign'. §13b UStG means section 13b of the German VAT Act (Umsatzsteuergesetz).">§13b UStG</a>) does their tax advisor want on the invoice?

> If you're wondering about the **§** symbol like I was: it's the "section sign", and Germans read it as "Paragraf". **§13b UStG** simply means *section 13b of the Umsatzsteuergesetz*, the German VAT Act. You'll see it everywhere in German tax and invoice discussions.

The third question is not something I want to decide as a developer. In EN 16931, reverse charge needs a specific <a class="term" href="#g-vat-category" data-tip="A short code on each invoice line saying how VAT applies: S for standard rate, AE for reverse charge, E for exempt, and so on.">VAT category code</a> (`AE`) and a reason text. If the text is wrong, that's a tax problem, so it should come from the tax advisor.

---

## Why I'm Not Building It From Scratch

My first estimate for building XRechnung and ZUGFeRD support myself was around **17 working days**. Writing XML is the easy part. The hard part is that the official checks contain hundreds of rules (written in something called <a class="term" href="#g-schematron" data-tip="A rule language for checking XML files. The official XRechnung checks (like 'line amounts must add up to the total') are written in it.">Schematron</a>), and your XML has to pass all of them.

While researching, I found **[eu_einvoice](https://github.com/alyf-de/eu_einvoice)** by ALYF. It's an open-source <a class="term" href="#g-frappe-app" data-tip="A plug-in package for the Frappe framework that ERPNext runs on. It adds features without changing ERPNext itself.">Frappe app</a>, also available on the Frappe Cloud marketplace. Here's what it does:

- Creates **CII XML** from a normal ERPNext **Sales Invoice**.
- Supports the **XRECHNUNG**, **EN16931**, **BASIC** and **EXTENDED** profiles.
- Puts the XML inside the invoice PDF as **ZUGFeRD** (for the non-XRechnung profiles).
- Has a **version-15** branch, which matches our ERPNext v15 setup.
- Adds a **Download eInvoice** option to the Sales Invoice `...` menu.

What it doesn't do is **UBL** output or sending through <a class="term" href="#g-peppol" data-tip="A European network for sending e-invoices directly between companies' accounting systems, like email for invoices.">**Peppol**</a>. For a client that sells mainly inside Germany that's fine, because CII is a valid XRechnung format. If you need Peppol, you'll have to plan that separately.

Installing it on a dev bench is the usual process for any custom app:

```bash
bench get-app https://github.com/alyf-de/eu_einvoice --branch version-15
bench --site yoursite.local install-app eu_einvoice
bench --site yoursite.local migrate
```

> If you run Frappe with Docker in production, you can't just `get-app` into a running container. You have to build it into your image. I wrote about that in [Frappe Production: Install Custom Apps with Docker](/blog/frappe-production-install-custom-apps-docker).

My plan was simple: install the app, then make sure our **custom fields** show up correctly in the XML (Skonto, the <a class="term" href="#g-factoring" data-tip="Selling your unpaid invoices to a finance company, which then collects the payment. The customer must pay the finance company, not you.">factoring</a> bank details, the VAT-exempt flag). But before installing anything, I decided to read the app's code. And I'm glad I did.

---

## Where Our Setup and the App Don't Match

The app expects a fairly standard Sales Invoice. Ours is heavily customised, like most real ERPNext setups I've seen. I read the app's Sales Invoice code next to our own code and found **five places** where they'll clash.

To be clear, these are from reading code. I haven't run them through the validator yet, so I'll update this post once I have. But each of them would produce an invoice that's either rejected or wrong.

### 1. Shipping and handling aren't real invoice lines

This is the big one. In our setup, shipping and handling costs are not item rows. They're calculated from fields on the invoice and added straight into the net total, with an extra "Actual" tax row so the <a class="term" href="#g-ledger" data-tip="The accounting books. Every invoice posts entries there, and debits and credits must balance.">ledger</a> balances. The printed invoice shows them as lines anyway, so nobody ever noticed anything.

E-invoices are much stricter about the maths. The app takes the net total as the sum of the lines, and treats "Actual" tax rows as extra charges. So with €1,000 of items, €30 handling and €20 shipping:

- The lines add up to **€1,000**, but the stated line total is **€1,050**. That fails <a class="term" href="#g-br-rules" data-tip="Numbered business rules in EN 16931. A validator reports exactly which rule an invoice breaks, e.g. BR-CO-10.">`BR-CO-10`</a>.
- A charge total of **€50** shows up with nothing behind it. That fails `BR-CO-12`.
- The tax base becomes **€1,100**, so base plus VAT doesn't equal the grand total anymore. That fails `BR-CO-15`.

So **every invoice with shipping or handling would be rejected**. The fix I'm going with is to add shipping and handling as proper service item rows on the Sales Invoice, with their own income account. The printed invoice will look exactly the same as before.

I did think about the quicker option: just fixing the totals inside the XML after it's generated. But then the e-invoice would show different numbers than what's in the books, and for an invoice I really don't want that.

### 2. Rows that are only there for the printout

Our quotations and invoices have rows that aren't really items: section headings, notes, print-only lines, and **alternative** items the customer was offered but isn't paying for. They have zero quantity or are left out of the totals.

The app turns *every* row into an invoice line. So the headings would become empty €0 lines, and worse, the alternatives would show up as billed items on the customer's e-invoice. These rows need to be removed from the XML, and the notes should go into the invoice's notes section instead.

### 3. Discount rows

Our textile and print discounts are lines with a negative amount. Good news here: the app already handles this by turning them into a positive price with a negative quantity, which passes rule `BR-27`. I just need to test it.

### 4. The factoring bank account

Some of the client's invoices are paid to a factoring company instead of the client directly, so the bank account is picked per invoice with a custom field. The app gets the bank account (IBAN) from somewhere else, the payment settings. Without a fix, those invoices would tell the customer to pay into the wrong account. 😬 We'll overwrite the bank details in the XML and add the notice text the factoring company requires.

### 5. Skonto

Our payment terms use a percentage discount, which the app supports. But there's a condition in the code that decides whether the `#SKONTO#` line is written, and from reading it, I think it might skip normal Skonto cases. I'm not sure yet. If it does, the discount would just silently disappear from the e-invoice, and the customer's accountant would probably notice before we do. So this is one of the first things I'll test.

### Customising the app without breaking things

The app gives you two <a class="term" href="#g-hooks" data-tip="Points where a Frappe app lets your own code run, e.g. just before or after the e-invoice is generated.">hooks</a> on the Sales Invoice: `before_einvoice_generation` and `after_einvoice_generation`. Something I didn't expect: they also run during the invoice's normal `validate`. So if you change the *invoice itself* inside a hook, that change gets saved to the database. My approach is to only change the **XML** in the after hook, and fix actual data problems (like the shipping rows above) in our own code.

Two more things I learned along the way:

- **Don't re-send old invoices as e-invoices.** Invoices already sent as PDFs stay as they are. If you send them again as e-invoices, you could end up owing the VAT twice because of <a class="term" href="#g-14c" data-tip="A German VAT rule: if you show VAT on an invoice, you owe it, even if it was shown by mistake or twice.">§14c UStG</a>. Credit notes in 2027 for invoices from 2026 are a case I've passed on to the tax advisor.
- **There's setup work, not just code.** You need to import <a class="term" href="#g-code-lists" data-tip="Official lists of short codes an e-invoice must use, e.g. C62 for 'piece' or 58 for SEPA bank transfer.">code lists</a> (units like `C62`, VAT category codes, payment codes like `58` for SEPA transfer), and to create PDF/A-3 files for ZUGFeRD the server needs <a class="term" href="#g-ghostscript" data-tip="Free software that converts and processes PDFs. Here it turns the invoice PDF into the archive-safe PDF/A-3 format.">Ghostscript</a> and an sRGB colour profile installed.

---

## How I'm Going to Validate It

This was the biggest lesson for me: **an e-invoice that looks right means nothing.** The customer's software will check it against the official rules and reject it if anything fails. So I wanted a way to check every invoice myself before changing anything.

### 1. KoSIT Validator (the official one)

The **<a class="term" href="#g-kosit" data-tip="The German public coordination office for IT standards, which maintains XRechnung and its official validator.">KoSIT</a> Validator** is the official checking tool from the German office that maintains XRechnung. It's a Java tool, and you run it together with the XRechnung configuration files (which contain all the rules):

```bash
java -jar validator-standalone.jar \
  -s scenarios.xml \
  -r /path/to/xrechnung-configuration \
  -h \
  invoice.xml
```

The `-h` flag creates an HTML report you can actually read. If KoSIT says the invoice passes, you can trust it. I'm treating this one as the final answer, and later I'd like to run it automatically in CI.

### 2. Free online validators (for quick checks)

When I don't want to set up Java just to check one file:

- **Docuflair** ([invoice.docuflair.com](https://invoice.docuflair.com)): free, no sign-up, works with XRechnung and ZUGFeRD.
- **B2Brouter**: free validator, and it has an online viewer too.
- **easybill**: a few free checks per day.

> Only upload **test invoices** to online tools. Real invoices have customer names, addresses and bank details in them.

### 3. Viewers (to see what the customer sees)

An XRechnung file is just XML, so you need a viewer to check that the *content* is right too, not only the format:

- **[Quba Viewer](https://github.com/ZUGFeRD/quba-viewer)**: a free desktop app that opens both XRechnung files and ZUGFeRD PDFs.
- **KoSIT xrechnung-visualization**: the official <a class="term" href="#g-xslt" data-tip="Stylesheets that transform XML into another format, here into a readable HTML or PDF invoice.">XSLT</a> stylesheets for turning XRechnung into HTML or PDF.

### My testing loop

Every change goes through the same three steps:

1. **Generate** the e-invoice from a realistic Sales Invoice in ERPNext.
2. **Validate** it with KoSIT (or Docuflair if I just want a quick check).
3. **Open** it in Quba and compare it line by line with the PDF the customer gets today.

I'm putting together a small set of test invoices for this: a normal one, one with Skonto, a VAT-exempt one, an EU reverse-charge one, and a credit note. Each one triggers different rules, and all of them have to pass before go-live.

---

## Also Check Your Old Accounting Software

The client used Lexware before ERPNext, and its export had an **"eRechnung"** column. If you're moving from another system, look for something like this. It tells you which customers were *already* getting e-invoices, and those are the ones you really can't break on the first day.

---

## My Checklist

If you're dealing with the same deadline on ERPNext, this is the list I'm working from:

1. **Check which group you're in.** Over €800k turnover means you have to send e-invoices from January 2027.
2. **Choose a format.** ZUGFeRD `EN16931` if your customers want a PDF, XRechnung for public authorities and anyone who asks for pure XML.
3. **Compare your data** with EN 16931: tax IDs, credit-note references, payment terms, Skonto.
4. **Ask the tax advisor early** about reverse charge and exempt invoices, and get the answers in writing. Not in December.
5. **Start with `eu_einvoice`** instead of building from zero.
6. **Read its code next to your own customisations** before installing it. Shipping charges, print-only rows and custom bank logic are where it broke for us.
7. **Set up a validation loop** with KoSIT and a viewer, and test every type of invoice.

I'll write a follow-up once these fixes are done and the invoices actually pass the validator. That's when I'll know which of my guesses above were right. 😅

If you're working on this too and found something I missed, let me know. Till then, happy invoicing👍

---

## Glossary

<dl class="glossary" id="glossary">
  <dt id="g-wachstumschancengesetz">Wachstumschancengesetz</dt>
  <dd>The German "Growth Opportunities Act" of 2024. It is mostly a package of tax changes, but one of them changed the rules for invoices: from 2025, an invoice between two German businesses is only an "e-invoice" if it is structured data that software can read. A PDF, even one sent by email, no longer counts.</dd>

  <dt id="g-en16931">EN 16931</dt>
  <dd>The European standard for electronic invoices. Think of it as a checklist of every field an invoice can have (seller, buyer, each line, tax totals, payment terms) and the rules that connect them, such as "the line amounts must add up to the net total". It describes <em>what</em> an invoice contains, not the file format. XRechnung and ZUGFeRD are two ways of writing it down.</dd>

  <dt id="g-b2b">B2B and B2C</dt>
  <dd>Business-to-business and business-to-consumer. The German e-invoicing rules apply to invoices between businesses in Germany. Invoices to private customers (B2C) are not covered.</dd>

  <dt id="g-bt">Business term (BT) IDs</dt>
  <dd>Every field in EN 16931 has a short numbered ID: <code>BT-1</code> is the invoice number, <code>BT-10</code> the buyer's reference, <code>BT-25</code> the number of the invoice being corrected. Validators and specifications always refer to fields by these numbers, no matter what the field is called in your ERP.</dd>

  <dt id="g-xrechnung">XRechnung</dt>
  <dd>Germany's official e-invoice format. It is a pure XML file with no visual layout: software reads it and imports it into the customer's accounting system. It is required for invoices to German public authorities and is one of the accepted formats for business invoices.</dd>

  <dt id="g-cius">CIUS</dt>
  <dd>Core Invoice Usage Specification. EN 16931 is quite general, so each country can publish a stricter version with extra rules. XRechnung is Germany's version. Every valid XRechnung is a valid EN 16931 invoice, but not the other way round.</dd>

  <dt id="g-ubl-cii">UBL and CII</dt>
  <dd>Two different XML formats for writing down the same EN 16931 invoice data. UBL comes from the OASIS standards body, CII from the UN. Both are allowed for XRechnung. ZUGFeRD always uses CII, which is also what <code>eu_einvoice</code> creates.</dd>

  <dt id="g-zugferd">ZUGFeRD and Factur-X</dt>
  <dd>A hybrid invoice: a normal PDF that a person can open and read, with the XML version of the same invoice attached inside the file. The receiver's software reads the XML and ignores the picture. ZUGFeRD (German) and Factur-X (French) are the same format with two names. Its "profiles" decide how much data the XML contains. <code>MINIMUM</code> and <code>BASIC WL</code> contain too little to count as an e-invoice in Germany, so use <code>EN16931</code> or higher.</dd>

  <dt id="g-pdfa3">PDF/A-3</dt>
  <dd>A version of PDF made for long-term archiving. Fonts and colours are embedded so the file looks the same years later, and unlike older PDF/A versions, it can contain attached files. That is what allows the XML to be carried inside a ZUGFeRD invoice.</dd>

  <dt id="g-section-sign">§ (section sign) and §13b UStG</dt>
  <dd>The <strong>§</strong> symbol is the "section sign", used to refer to a specific section of a law. Germans read it as "Paragraf". <strong>UStG</strong> is the <em>Umsatzsteuergesetz</em>, the German VAT Act, so <strong>§13b UStG</strong> means "section 13b of the VAT Act", which is the section about reverse charge.</dd>

  <dt id="g-reverse-charge">Reverse charge</dt>
  <dd>For some sales, for example many sales to businesses in other EU countries, the seller doesn't charge VAT. Instead, the buyer reports and pays it to their own tax office. The invoice shows 0% VAT and must include a notice explaining why. In an e-invoice, this uses the VAT category code <code>AE</code> plus a reason text.</dd>

  <dt id="g-storno">Storno and Rechnungskorrektur</dt>
  <dd>German terms for cancelling or correcting an invoice. Once an invoice is sent, you can't edit or delete it. Instead you issue a new document (a credit note or corrected invoice) that refers back to the original by its number. In ERPNext this is a Sales Invoice marked as a return against the original.</dd>

  <dt id="g-skonto">Skonto</dt>
  <dd>An early-payment discount, very common in Germany. For example: "2% off if paid within 14 days, otherwise the full amount within 30 days". XRechnung expects it in a fixed text pattern like <code>#SKONTO#TAGE=14#PROZENT=2.00#</code> so the customer's software can apply it automatically.</dd>

  <dt id="g-vat-category">VAT category code</dt>
  <dd>A short code on every invoice line that says how VAT applies to it. The common ones are <code>S</code> (standard rate), <code>Z</code> (zero rate), <code>E</code> (exempt), <code>AE</code> (reverse charge) and <code>K</code> (delivery to another EU country). Several rules depend on it. For example, a line marked <code>AE</code> must have 0% VAT and a reason text.</dd>

  <dt id="g-schematron">Schematron</dt>
  <dd>A language for writing checks against an XML file, such as "the sum of all lines must equal the line total". The official XRechnung and EN 16931 rules are published as Schematron files, so every validator runs exactly the same checks.</dd>

  <dt id="g-frappe-app">Frappe app</dt>
  <dd>ERPNext is built on the Frappe framework, and new features are added as separate "apps" installed on a site, similar to plug-ins. <code>eu_einvoice</code> is one of these: it adds e-invoicing without changing ERPNext's own code.</dd>

  <dt id="g-peppol">Peppol</dt>
  <dd>A European network for sending e-invoices directly from one company's accounting system to another's, without email. It's optional for B2B in Germany today, but common in other countries and with some larger customers.</dd>

  <dt id="g-factoring">Factoring</dt>
  <dd>A way of financing where a business sells its unpaid invoices to a factoring company and gets the money right away. The customer then pays the factoring company instead, so those invoices must show the factoring company's bank account and a notice saying the invoice has been transferred.</dd>

  <dt id="g-ledger">Ledger</dt>
  <dd>The company's accounting books. Every invoice creates entries there (income, VAT owed, the amount the customer owes), and debits and credits must balance. An e-invoice should always show exactly the amounts that were booked.</dd>

  <dt id="g-br-rules">Business rules (BR-…)</dt>
  <dd>The numbered checks in EN 16931 and XRechnung. <code>BR-</code> rules are basic requirements, <code>BR-CO-</code> rules check calculations (for example <code>BR-CO-10</code>: the line total must equal the sum of the lines), and <code>BR-DE-</code> rules are German additions. When a validator rejects an invoice, it tells you exactly which rule failed.</dd>

  <dt id="g-hooks">Hooks</dt>
  <dd>Points where a Frappe app lets other apps run their own code, for example "just before the e-invoice is created" or "just after". They let you adjust <code>eu_einvoice</code>'s output for your setup without editing its code.</dd>

  <dt id="g-14c">§14c UStG</dt>
  <dd>A rule in the German VAT Act: if VAT is shown on an invoice, the seller owes it to the tax office, even if it was shown by mistake or on a second copy of the same sale. That's why sending old invoices again as e-invoices is risky.</dd>

  <dt id="g-code-lists">Code lists</dt>
  <dd>Official lists of short codes that an e-invoice must use instead of free text, so software anywhere can understand them. For example, <code>C62</code> means "one piece" (unit), <code>58</code> means "SEPA bank transfer" (payment method), and <code>S</code> means "standard VAT rate".</dd>

  <dt id="g-ghostscript">Ghostscript</dt>
  <dd>Free, widely used software for working with PDF files. On an ERPNext server it's needed to convert the invoice into PDF/A-3 (together with an sRGB colour profile), so the ZUGFeRD XML can be added to it.</dd>

  <dt id="g-kosit">KoSIT</dt>
  <dd>Koordinierungsstelle für IT-Standards, the German public office that maintains the XRechnung standard. It publishes the official validator and the stylesheets for viewing XRechnung files.</dd>

  <dt id="g-xslt">XSLT</dt>
  <dd>A standard way to convert an XML file into another format. KoSIT publishes XSLT stylesheets that turn an XRechnung file into a readable HTML page or PDF.</dd>
</dl>

*Facing the German e-invoicing deadline on ERPNext or Frappe? [Talk to us at Klickspell](https://klickspell.com/#contact), we're happy to help you get XRechnung and ZUGFeRD working before it becomes mandatory.*
