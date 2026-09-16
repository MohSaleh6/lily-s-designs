# Lily's Designs — bespoke Arabic greeting card studio

A bilingual (Arabic RTL / English LTR) website for a card design studio in Amman:
portfolio, pricing, a seven-step custom order flow, and contact.

**Live pages:** `index` · `portfolio` · `services` · `order` · `about` · `testimonials` · `contact`

---

## Running it

It is a static site with no runtime dependencies — open `index.html`, or serve the
folder:

```bash
npx http-server -p 8080 .
```

## Editing content

**Do not edit the `.html` files directly.** They are generated. Everything lives in
`build/`:

| File | What is in it |
|---|---|
| `build/content.mjs` | All copy, prices, card catalogue, FAQ, testimonials — every string in both languages |
| `build/art.mjs` | The SVG artwork generator (card designs, brand mark, OG image) |
| `build/pages.mjs` | Home, portfolio, services, about, testimonials |
| `build/pages-order.mjs` | The order wizard and contact page |
| `build/layout.mjs` | Shared head, header, footer, cart drawer, lightbox, structured data |
| `build/icons.mjs` | Inline icon set |

After any change:

```bash
node build/build.mjs
```

This regenerates the seven pages, all 36 SVG assets, `assets/js/data.js`,
`sitemap.xml`, `robots.txt` and `site.webmanifest`.

### Adding a card design

Add an entry to `cards` in `build/content.mjs` and rebuild. The artwork, portfolio
tile, lightbox entry, order-form swatch and cart pricing all follow automatically.
`motif` picks the artwork family (`rings`, `eid`, `confetti`, `laurel`, `grid`,
`arch`, `botanical`, `bands`) and `palette` picks the colourway.

### Changing prices

`plans` and `addons` in `build/content.mjs`. The live order estimate reads the same
numbers, so the pricing page and the wizard cannot disagree.

---

## How it is built

**No framework, no build-time dependencies.** A small Node generator composes the
pages from shared partials so the header, footer and overlays are byte-identical on
every page, then writes plain HTML to the repo root. That keeps the site deployable
straight from GitHub Pages and keeps runtime JavaScript to ~25 KB, uncompressed and
unminified.

**All artwork is original SVG**, drawn programmatically in `build/art.mjs` — girih
rosettes, gold-foil gradients, lanterns, laurels and calligraphic flourishes. Nothing
is fetched from a stock library, so there are no licensing questions, no broken-image
states, and each card file is ~6 KB and sharp at any resolution.

**Bilingual without a round-trip.** Every translatable node ships both languages in
the markup:

```html
<h2 data-en="Pricing" data-ar="الأسعار">الأسعار</h2>
<input data-en-placeholder="Your name" data-ar-placeholder="اسمك">
```

`assets/js/i18n.js` swaps `textContent` and the listed attributes, flips
`<html lang dir>`, and stores the choice. The layout itself is direction-agnostic:
the stylesheet uses logical properties (`margin-inline`, `inset-inline-start`)
throughout, so RTL is not a second set of overrides. Directional icons are mirrored
explicitly; meaningful ones are not.

### Verification

Checked in a real browser (Chromium) across desktop / tablet / mobile in both
languages:

- no console errors, no failed requests, no horizontal overflow, no broken images
- 67 end-to-end interaction assertions — filters, lightbox, cart, the full seven-step
  order run including validation, estimate arithmetic and the generated message
- **zero axe-core violations** (WCAG 2.1 A/AA + best-practice) on all 14 page/language
  combinations
- CLS 0.000 on every page; every image carries explicit `width`/`height`
- all 303 internal links and anchors resolve

---

## Orders and payment

The order form is a real, validated seven-step flow. It builds a numbered order
summary (`LD-YYMMDD-NNNN`) and hands it to WhatsApp with everything pre-written, with
an email fallback and a copy button. Answers are saved to `localStorage` as the
customer goes, so a half-finished order survives a closed tab.

**No card details touch this site.** That is deliberate: the studio confirms the
design, the price and the delivery date in writing before taking money, which is how
the business actually runs.

**To add a hosted checkout** (Stripe, PayPal, or a local gateway), set
`CHECKOUT_ENDPOINT` at the top of `assets/js/order.js` to a serverless endpoint. The
wizard will POST `{ reference, summary, estimate }` and redirect to the `url` in the
response instead of opening WhatsApp. The contact form has the same hook
(`FORM_ENDPOINT` in `assets/js/contact.js`) if a stored inbox is wanted alongside
WhatsApp.

## Studio details

Phone / WhatsApp `+962 79 811 4089` · Instagram [@lilys.designs1](https://www.instagram.com/lilys.designs1/)

Update these in the `site` object in `build/content.mjs` and rebuild — they are used
in the header, footer, contact page, structured data and every generated WhatsApp
link.

## Deploying to GitHub Pages

Settings → Pages → deploy from branch, root folder. `.nojekyll` is committed so the
asset folders are served as-is. Set `site.url` in `build/content.mjs` to the final
domain and rebuild so the canonical tags, sitemap and social images point at it.
