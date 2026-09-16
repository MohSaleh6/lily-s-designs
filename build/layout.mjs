import { site, nav, ui } from './content.mjs';
import { icons } from './icons.mjs';

/* ------------------------------------------------------------- helpers */

export const e = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const a = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Bilingual element. The Arabic copy is rendered as the document's initial
 * text (the site opens in Arabic); the English lives in data-en so the toggle
 * is instant and needs no second request.
 */
export const bt = (tag, pair, attrs = '') =>
  `<${tag}${attrs ? ' ' + attrs : ''} data-en="${a(pair.en)}" data-ar="${a(pair.ar)}">${e(pair.ar)}</${tag}>`;

/** Bilingual attribute pairs, e.g. biAttr('placeholder', {en,ar}). */
export const biAttr = (name, pair) =>
  `${name}="${a(pair.ar)}" data-en-${name}="${a(pair.en)}" data-ar-${name}="${a(pair.ar)}"`;

/** Bare data-* pair for elements whose text is written inline. */
export const biData = (pair) => `data-en="${a(pair.en)}" data-ar="${a(pair.ar)}"`;

export const waLink = (text) =>
  `https://wa.me/${site.phoneE164}?text=${encodeURIComponent(text)}`;

const ORNAMENT = `<svg class="ornament" viewBox="0 0 120 22" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true" focusable="false">
  <path d="M2 11h34M84 11h34"/>
  <path d="M60 2 66.4 5.6 70 11l-3.6 5.4L60 20l-6.4-3.6L50 11l3.6-5.4Z"/>
  <path d="M60 6.4 63.8 8.6 66 11l-2.2 2.4-3.8 2.2-3.8-2.2L54 11l2.2-2.4Z"/>
  <path d="M40 11h6M74 11h6"/>
  <circle cx="44" cy="11" r="1.6" fill="currentColor"/><circle cx="76" cy="11" r="1.6" fill="currentColor"/>
</svg>`;

export const ornament = (cls = '') => ORNAMENT.replace('class="ornament"', `class="ornament ${cls}"`.trim());

/* ---------------------------------------------------------------- head */

export function head({ title, description, keywords, page, extraHead = '' }) {
  const canonical = `${site.url}/${page}`;
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${a(title.ar)} | ${a(site.name.ar)}</title>
<meta name="description" content="${a(description.ar)}">
<meta name="keywords" content="${a(keywords)}">
<meta name="author" content="${a(site.name.en)}">
<meta name="theme-color" content="#0E4C41">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="ar" href="${canonical}">
<link rel="alternate" hreflang="en" href="${canonical}">
<link rel="alternate" hreflang="x-default" href="${canonical}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${a(site.name.en)}">
<meta property="og:title" content="${a(title.ar)} | ${a(site.name.ar)}">
<meta property="og:description" content="${a(description.ar)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="ar_JO">
<meta property="og:locale:alternate" content="en_US">
<meta property="og:image" content="${site.url}/assets/img/brand/og-card.svg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${a(site.name.en)} — bespoke Arabic greeting cards">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${a(title.en)} | ${a(site.name.en)}">
<meta name="twitter:description" content="${a(description.en)}">
<meta name="twitter:image" content="${site.url}/assets/img/brand/og-card.svg">

<link rel="icon" href="assets/img/brand/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/img/brand/favicon.svg">
<link rel="manifest" href="site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap"></noscript>
<link rel="stylesheet" href="assets/css/styles.css">
<script>document.documentElement.classList.remove('no-js');
(function(){try{var l=localStorage.getItem('ld-lang');if(l==='en'){var d=document.documentElement;d.lang='en';d.dir='ltr';}}catch(e){}})();</script>
${extraHead}
</head>
<body>
${bt('a', { en: 'Skip to main content', ar: 'تخطَّ إلى المحتوى الرئيسي' }, 'class="skip-link" href="#main"')}`;
}

/* -------------------------------------------------------------- header */

export function header(current) {
  const links = nav.map((n) => {
    const isCurrent = n.href === current;
    return bt('a', { en: n.en, ar: n.ar }, `href="${n.href}"${isCurrent ? ' aria-current="page"' : ''}`);
  }).join('\n        ');

  return `
<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <a class="brand" href="index.html" ${biAttr('aria-label', { en: "Lily's Designs — home", ar: 'ليليز ديزاينز — الرئيسية' })}>
      <span class="brand__mark" aria-hidden="true">${brandMark()}</span>
      <span class="brand__text">
        ${bt('span', site.name, 'class="brand__name"')}
        ${bt('span', site.tagline, 'class="brand__tag"')}
      </span>
    </a>

    <nav class="nav" id="primaryNav" ${biAttr('aria-label', { en: 'Primary', ar: 'التنقل الرئيسي' })}>
        ${links}
        ${bt('a', { en: 'Order a card', ar: 'اطلب بطاقتك' }, 'href="order.html" class="btn btn--gold btn--sm nav-cta"')}
    </nav>

    <div class="header-actions">
      <button class="lang-toggle" id="langToggle" type="button"
              ${biAttr('aria-label', { en: 'التبديل إلى العربية', ar: 'Switch to English' })}>
        ${icons.globe}
        <span class="lang-label" data-en="العربية" data-ar="English">English</span>
      </button>
      <button class="icon-btn cart-btn" id="cartOpen" type="button"
              ${biAttr('aria-label', { en: 'Open cart', ar: 'فتح السلة' })}>
        ${icons.cart}
        <span class="cart-btn__count" id="cartCount" aria-hidden="true">0</span>
      </button>
      <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="primaryNav"
              ${biAttr('aria-label', { en: 'Open menu', ar: 'فتح القائمة' })}>
        <span></span>
      </button>
    </div>
  </div>
</header>

<main id="main">`;
}

let markSeq = 0;
export function brandMark() {
  /* Each mark needs its own gradient id: two identical ids in one document
     is invalid, and the second reference becomes ambiguous. */
  const gid = `bm-foil-${++markSeq}`;
  /* Eight-point rosette enclosing an L, drawn inline so the header never
     waits on a network request. */
  return `<svg viewBox="0 0 64 64" width="40" height="40" aria-hidden="true" focusable="false">
  <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#9C7A2E"/><stop offset="20%" stop-color="#D8B45F"/>
    <stop offset="38%" stop-color="#F5E7BC"/><stop offset="55%" stop-color="#C9A34C"/>
    <stop offset="74%" stop-color="#E8D08A"/><stop offset="100%" stop-color="#A8842F"/>
  </linearGradient></defs>
  <path d="M32 3 40.6 13.6 54 11.2 51.6 24.6 62.2 33.2 51.6 41.8 54 55.2 40.6 52.8 32 63.4 23.4 52.8 10 55.2 12.4 41.8 1.8 33.2 12.4 24.6 10 11.2 23.4 13.6Z"
        fill="none" stroke="url(#${gid})" stroke-width="2.1" stroke-linejoin="round"/>
  <path d="M32 15.5 41 24.5 50 33.2 41 41.9 32 50.9 23 41.9 14 33.2 23 24.5Z"
        fill="none" stroke="url(#${gid})" stroke-width="0.9" opacity="0.6"/>
  <path d="M26.5 23.5V41h12" fill="none" stroke="url(#${gid})" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

/* -------------------------------------------------------------- footer */

export function footer() {
  const waHref = waLink('مرحباً ليلى، أود الاستفسار عن تصميم بطاقة.');
  const col = (title, items) => `
      <div class="footer-col">
        ${bt('h3', title)}
        <ul>${items.map((i) => `<li>${bt('a', i, `href="${i.href}"${i.ext ? ' target="_blank" rel="noopener"' : ''}`)}</li>`).join('')}</ul>
      </div>`;

  return `
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand" href="index.html">
          <span class="brand__mark" aria-hidden="true">${brandMark()}</span>
          <span class="brand__text">
            ${bt('span', site.name, 'class="brand__name"')}
            ${bt('span', site.tagline, 'class="brand__tag"')}
          </span>
        </a>
        ${bt('p', {
          en: 'A small card studio in Amman drawing bespoke Arabic and English greeting cards for weddings, Eid, graduations and everything worth marking.',
          ar: 'استوديو صغير في عمّان يرسم بطاقات تهنئة مخصصة بالعربية والإنجليزية للأعراس والعيد والتخرّج وكل ما يستحق أن يُحتفى به.'
        })}
        <div class="socials">
          <a href="${site.instagramUrl}" target="_blank" rel="noopener" ${biAttr('aria-label', { en: 'Instagram', ar: 'إنستغرام' })}>${icons.instagram}</a>
          <a href="${waHref}" target="_blank" rel="noopener" ${biAttr('aria-label', { en: 'WhatsApp', ar: 'واتساب' })}>${icons.whatsapp}</a>
          <a href="tel:+${site.phoneE164}" ${biAttr('aria-label', { en: 'Call the studio', ar: 'اتصل بالاستوديو' })}>${icons.phone}</a>
          <a href="mailto:${site.email}" ${biAttr('aria-label', { en: 'Email the studio', ar: 'راسل الاستوديو' })}>${icons.mail}</a>
        </div>
      </div>

      ${col({ en: 'Explore', ar: 'تصفّح' }, [
        { href: 'portfolio.html', en: 'Portfolio', ar: 'أعمالنا' },
        { href: 'services.html', en: 'Services & pricing', ar: 'الخدمات والأسعار' },
        { href: 'order.html', en: 'Custom order', ar: 'طلب مخصص' },
        { href: 'about.html', en: 'About the studio', ar: 'عن الاستوديو' },
        { href: 'testimonials.html', en: 'Testimonials', ar: 'آراء العملاء' }
      ])}

      ${col({ en: 'Occasions', ar: 'المناسبات' }, [
        { href: 'portfolio.html#wedding', en: 'Wedding invitations', ar: 'دعوات الأعراس' },
        { href: 'portfolio.html#eid', en: 'Eid & Ramadan', ar: 'العيد ورمضان' },
        { href: 'portfolio.html#birthday', en: 'Birthday cards', ar: 'بطاقات أعياد الميلاد' },
        { href: 'portfolio.html#graduation', en: 'Graduation cards', ar: 'بطاقات التخرّج' },
        { href: 'portfolio.html#corporate', en: 'Corporate & bulk', ar: 'الشركات والجملة' }
      ])}

      <div class="footer-col">
        ${bt('h3', { en: 'Studio', ar: 'الاستوديو' })}
        <ul>
          <li><a href="${waHref}" target="_blank" rel="noopener"><span class="num">${site.phoneIntl}</span></a></li>
          <li><a href="mailto:${site.email}">${site.email}</a></li>
          <li>${bt('span', site.city)}</li>
          <li>${bt('span', site.hours)}</li>
          <li>${bt('a', { en: 'Contact & FAQ', ar: 'تواصل والأسئلة الشائعة' }, 'href="contact.html"')}</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      ${bt('span', {
        en: `© ${new Date().getFullYear()} Lily's Designs. All designs are original artwork.`,
        ar: `© ${new Date().getFullYear()} ليليز ديزاينز. جميع التصاميم أعمال أصلية.`
      })}
      ${bt('span', { en: 'Designed and made in Amman, Jordan.', ar: 'صُمّم وصُنع في عمّان، الأردن.' })}
    </div>
  </div>
</footer>

<div class="fab-region" role="complementary" ${biAttr('aria-label', { en: 'Quick contact', ar: 'تواصل سريع' })}>
  <a class="wa-fab" href="${waHref}" target="_blank" rel="noopener"
     ${biAttr('aria-label', { en: 'Chat on WhatsApp', ar: 'تواصل عبر واتساب' })}>
    ${icons.whatsapp}${bt('span', { en: 'Chat with us', ar: 'راسلنا' })}
  </a>
</div>`;
}

/* --------------------------------------------------- shared overlay bits */

export function cartDrawer() {
  return `
<div class="drawer-backdrop" id="cartBackdrop" hidden></div>
<aside class="drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-labelledby="cartTitle" hidden>
  <div class="drawer__head">
    ${bt('h2', ui.cartTitle, 'id="cartTitle"')}
    <button class="icon-btn" id="cartClose" type="button" ${biAttr('aria-label', ui.closeCart)}>${icons.close}</button>
  </div>
  <div class="drawer__body" id="cartBody"></div>
  <div class="drawer__foot" id="cartFoot" hidden>
    <div class="drawer__total">
      ${bt('span', ui.subtotal)}
      <span class="amount"><span id="cartTotal" class="num">0</span> ${bt('span', ui.currency)}</span>
    </div>
    ${bt('a', ui.checkout, 'href="order.html" class="btn btn--gold btn--block" id="cartCheckout"')}
    ${bt('p', { en: 'Card designs are confirmed by message before payment — nothing is charged automatically.', ar: 'تُؤكَّد التصاميم عبر الرسائل قبل الدفع — لا يُخصم أي مبلغ تلقائياً.' }, 'class="text-mute" style="font-size:.74rem;margin-block-start:.6rem"')}
  </div>
</aside>`;
}

export function lightbox() {
  return `
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-labelledby="lbTitle" hidden>
  <div class="lightbox__panel">
    <button class="lightbox__close" id="lbClose" type="button" ${biAttr('aria-label', ui.close)}>${icons.close}</button>
    <button class="lightbox__nav lightbox__nav--prev" id="lbPrev" type="button" ${biAttr('aria-label', ui.prev)}>${icons.chevronL}</button>
    <button class="lightbox__nav lightbox__nav--next" id="lbNext" type="button" ${biAttr('aria-label', ui.next)}>${icons.chevronR}</button>
    <div class="lightbox__media"><img id="lbImage" alt="" width="500" height="700" decoding="async" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E"></div>
    <div class="lightbox__body">
      <p class="eyebrow" id="lbOccasion"></p>
      <h3 id="lbTitle"></h3>
      <div class="lightbox__tags" id="lbTags"></div>
      <p id="lbDesc" class="text-mute"></p>
      <p class="lightbox__price"><span id="lbPrice" class="num"></span> ${bt('span', ui.currency)}</p>
      <div class="lightbox__actions">
        <button class="btn btn--gold" id="lbAdd" type="button" ${biData(ui.addToCart)}>${e(ui.addToCart.ar)}</button>
        ${bt('a', ui.orderThis, 'class="btn btn--ghost" id="lbOrder" href="order.html"')}
      </div>
    </div>
  </div>
</div>`;
}

export function toastRegion() {
  return `<div class="toast-region" id="toastRegion" role="status" aria-live="polite"></div>`;
}

export function scripts(extra = []) {
  return `
<script src="assets/js/i18n.js" defer></script>
<script src="assets/js/data.js" defer></script>
<script src="assets/js/app.js" defer></script>
${extra.map((s) => `<script src="assets/js/${s}" defer></script>`).join('\n')}
</body>
</html>`;
}

/* ------------------------------------------------------- page scaffold */

export function pageBanner({ eyebrow, title, lede, crumb }) {
  return `
<section class="page-banner">
  <div class="pattern-field" aria-hidden="true"></div>
  <div class="container container--narrow">
    <ol class="breadcrumb">
      <li>${bt('a', { en: 'Home', ar: 'الرئيسية' }, 'href="index.html"')}</li>
      <li>${bt('span', crumb, 'aria-current="page"')}</li>
    </ol>
    ${ornament()}
    ${eyebrow ? bt('p', eyebrow, 'class="eyebrow center-line" style="justify-content:center"') : ''}
    ${bt('h1', title)}
    ${bt('p', lede, 'class="lede"')}
  </div>
</section>`;
}

export function ctaBand({ title, body, primary, secondary }) {
  return `
<section class="section section--tight">
  <div class="container">
    <div class="cta-band reveal">
      <div class="pattern-field" aria-hidden="true"></div>
      ${ornament()}
      ${bt('h2', title)}
      ${bt('p', body, 'class="lede"')}
      <div class="btn-row">
        ${bt('a', primary.label, `class="btn btn--gold btn--lg" href="${primary.href}"`)}
        ${bt('a', secondary.label, `class="btn btn--light" href="${secondary.href}"${secondary.ext ? ' target="_blank" rel="noopener"' : ''}`)}
      </div>
    </div>
  </div>
</section>`;
}

/* --------------------------------------------------- structured data */

export function jsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#studio`,
    name: site.name.en,
    alternateName: site.name.ar,
    description: 'Bespoke Arabic and English greeting card design — weddings, Eid, birthdays, graduations and corporate gifting.',
    url: site.url,
    telephone: `+${site.phoneE164}`,
    email: site.email,
    image: `${site.url}/assets/img/brand/og-card.svg`,
    logo: `${site.url}/assets/img/brand/favicon.svg`,
    priceRange: 'JOD 6 – JOD 500',
    currenciesAccepted: 'JOD',
    paymentAccepted: 'Cash, Bank transfer, CliQ, Credit Card',
    address: { '@type': 'PostalAddress', addressLocality: 'Amman', addressCountry: 'JO' },
    areaServed: { '@type': 'Country', name: 'Jordan' },
    sameAs: [site.instagramUrl],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '10:00', closes: '19:00'
    }],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '6', bestRating: '5' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Card design packages',
      itemListElement: [
        { '@type': 'Offer', name: 'Digital Card', price: '15', priceCurrency: 'JOD' },
        { '@type': 'Offer', name: 'Printed Cards', price: '45', priceCurrency: 'JOD' },
        { '@type': 'Offer', name: 'Bulk & Corporate', priceCurrency: 'JOD', priceSpecification: { '@type': 'PriceSpecification', minPrice: '6', priceCurrency: 'JOD' } }
      ]
    }
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function faqJsonLd(faqs) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.en.q,
      acceptedAnswer: { '@type': 'Answer', text: f.en.a }
    }))
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function breadcrumbJsonLd(page, label) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/index.html` },
      { '@type': 'ListItem', position: 2, name: label, item: `${site.url}/${page}` }
    ]
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}
