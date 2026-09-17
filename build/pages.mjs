import { site, nav, cards, occasions, plans, addons, process, testimonials, faqs, ui, instagramPosts, works } from './content.mjs';
import { icons, occasionIcon } from './icons.mjs';
import { e, a, bt, biAttr, biData, waLink, ornament, head, header, footer, cartDrawer, lightbox, toastRegion, scripts, pageBanner, ctaBand, jsonLd, breadcrumbJsonLd } from './layout.mjs';

const occLabel = (id) => occasions.find((o) => o.id === id) || { en: id, ar: id };

/* --------------------------------------------------------- card tile */

export function tile(card, { lazy = true, delay = 0 } = {}) {
  const occ = occLabel(card.occasion);
  return `<button type="button" class="tile reveal" data-card="${card.id}" data-occasion="${card.occasion}"
        ${delay ? `style="--reveal-delay:${delay}ms"` : ''}
        ${biAttr('aria-label', { en: `Open ${card.en.title} — ${occ.en}`, ar: `افتح ${card.ar.title} — ${occ.ar}` })}>
  <span class="tile__media">
    <img src="assets/img/cards/${card.id}.svg" width="500" height="700"
         ${lazy ? 'loading="lazy"' : ''} decoding="async"
         ${biAttr('alt', {
           en: `${card.en.title} — ${occ.en} card design by Lily's Designs`,
           ar: `${card.ar.title} — تصميم بطاقة ${occ.ar} من ليليز ديزاينز`
         })}>
    ${bt('span', occ, 'class="tile__badge"')}
    <span class="tile__view" aria-hidden="true">${icons.expand}</span>
  </span>
  <span class="tile__body">
    ${bt('span', { en: card.en.title, ar: card.ar.title }, 'class="tile__title"')}
    <span class="tile__meta">
      ${bt('span', { en: 'Digital or printed', ar: 'رقمية أو مطبوعة' })}
      <span class="tile__price"><span class="num">${card.price}</span> ${bt('span', ui.currency)}</span>
    </span>
  </span>
</button>`;
}

/* -------------------------------------------------------------- HOME */

export function home() {
  /* One piece per occasion, so the strip shows the range rather than six
     variations on a wedding. */
  const featured = ['zafaf-mohammad-laila', 'henna-rand-thobe', 'ramadan-27-arch',
    'birthday-norma-bunny', 'najah-tawjihi-reel', 'mawlood-carousel-reel']
    .map((id) => works.find((w) => w.id === id));

  const showcaseCards = ['zafaf-wildflower-arch', 'henna-rand-thobe', 'eid-bow-blush',
    'birthday-lily-bunny', 'mawlood-ali-sky']
    .map((id) => works.find((w) => w.id === id));

  const valueProps = [
    { icon: icons.pen, en: { t: 'Drawn, not templated', b: 'Every card starts as a fresh drawing. The girih rosettes, the foil rules and the flourishes are all original artwork — you will not find this card in anyone else’s shop.' },
      ar: { t: 'مرسومة، لا قوالب جاهزة', b: 'كل بطاقة تبدأ كرسمة جديدة. النجوم الهندسية والخطوط الذهبية والزخارف كلها أعمال أصلية — لن تجد هذه البطاقة في أي متجر آخر.' } },
    { icon: icons.layers, en: { t: 'Arabic set properly', b: 'Arabic is not pasted into a Latin layout. Line height, letter joins and the balance between the two scripts are adjusted by hand on every bilingual card.' },
      ar: { t: 'عربية مضبوطة كما ينبغي', b: 'العربية ليست نصاً مُلصقاً في تصميم لاتيني. ارتفاع السطر ووصل الحروف والتوازن بين الخطّين تُضبط يدوياً في كل بطاقة ثنائية اللغة.' } },
    { icon: icons.clock, en: { t: 'A draft in 48 hours', b: 'You see a full-colour draft with your own names already set within two days — not a mock-up with someone else’s text in it.' },
      ar: { t: 'مسودة خلال ٤٨ ساعة', b: 'ترى مسودة ملوّنة كاملة بأسمائك أنت خلال يومين — لا نموذجاً يحمل نصّ شخص آخر.' } },
    { icon: icons.print, en: { t: 'Proofed before printing', b: 'A printed proof is photographed and sent to you before the full run is cut. Nothing goes to press on a guess.' },
      ar: { t: 'نموذج مطبوع قبل الطباعة', b: 'يُصوَّر نموذج مطبوع ويُرسل إليك قبل تنفيذ الكمية كاملة. لا شيء يذهب للمطبعة بالتخمين.' } }
  ];

  const occStrip = occasions.filter((o) => o.id !== 'all').map((o, i) => `
      <a class="card reveal" href="portfolio.html#${o.id}" style="--reveal-delay:${i * 60}ms; text-decoration:none">
        <span class="card__icon">${occasionIcon[o.id] || icons.sparkle}</span>
        ${bt('h3', o)}
        ${bt('p', occBlurb(o.id))}
      </a>`).join('');

  return head({
    page: 'index.html',
    title: { en: 'Bespoke Arabic greeting cards', ar: 'بطاقات تهنئة عربية مُصمّمة خصيصاً' },
    description: {
      en: "Hand-drawn Arabic and English greeting cards for weddings, Eid, birthdays, graduations and corporate gifting. Digital in 48 hours, printed in 5–7 days, delivered across Jordan.",
      ar: 'بطاقات تهنئة عربية وإنجليزية مرسومة يدوياً للأعراس والعيد وأعياد الميلاد والتخرّج وهدايا الشركات. رقمية خلال ٤٨ ساعة، مطبوعة خلال ٥–٧ أيام، مع التوصيل لكل الأردن.'
    },
    keywords: 'بطاقات تهنئة, بطاقات عربية, تصميم بطاقات, دعوات زفاف, بطاقات عيد, بطاقات تخرج, بطاقات شركات, عمان, الأردن, Arabic greeting cards, custom card design, wedding invitations Jordan, Eid cards, graduation cards, corporate cards Amman',
    extraHead: jsonLd()
  }) + header('index.html') + `

<section class="hero">
  <div class="pattern-field" aria-hidden="true"></div>
  <div class="container hero__grid">
    <div class="hero__text">
      ${bt('p', { en: 'Card studio \u00b7 Amman, Jordan', ar: '\u0627\u0633\u062a\u0648\u062f\u064a\u0648 \u0628\u0637\u0627\u0642\u0627\u062a \u00b7 \u0639\u0645\u0651\u0627\u0646\u060c \u0627\u0644\u0623\u0631\u062f\u0646' }, 'class="eyebrow"')}
      <h1 class="hero__title">
        <span ${biData({ en: 'Because extraordinary moments deserve', ar: '\u0644\u0623\u0646 \u0627\u0644\u0644\u062d\u0638\u0627\u062a \u0627\u0644\u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a\u0629 \u062a\u0633\u062a\u062d\u0642' })}>\u0644\u0623\u0646 \u0627\u0644\u0644\u062d\u0638\u0627\u062a \u0627\u0644\u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a\u0629 \u062a\u0633\u062a\u062d\u0642</span>
        <span class="bloom-ink" ${biData({ en: 'cards worthy of their beauty', ar: '\u0628\u0637\u0627\u0642\u0627\u062a \u062a\u0644\u064a\u0642 \u0628\u062c\u0645\u0627\u0644\u0647\u0627' })}>\u0628\u0637\u0627\u0642\u0627\u062a \u062a\u0644\u064a\u0642 \u0628\u062c\u0645\u0627\u0644\u0647\u0627</span>
      </h1>
      ${bt('p', {
        en: 'We make Arabic and English greeting cards designed especially to hold on to your finest occasions \u2014 weddings, Eid, graduations and new arrivals. Your card is delivered within 48 hours, with revisions guaranteed until it matches your taste.',
        ar: '\u0646\u0642\u062f\u0651\u0645 \u0644\u0643\u0645 \u0628\u0637\u0627\u0642\u0627\u062a \u062a\u0647\u0646\u0626\u0629 \u0639\u0631\u0628\u064a\u0629 \u0648\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629 \u0645\u0635\u0645\u0645\u0629 \u062e\u0635\u064a\u0635\u0627\u064b \u0644\u062a\u062e\u0644\u064a\u062f \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062a \u0627\u0644\u0645\u0645\u064a\u0632\u0629 \u0643\u0627\u0644\u0623\u0639\u0631\u0627\u0633 \u0648\u0627\u0644\u0623\u0639\u064a\u0627\u062f \u0648\u0627\u0644\u062a\u062e\u0631\u0651\u062c \u0648\u0627\u0644\u0645\u0648\u0627\u0644\u064a\u062f \u0627\u0644\u062c\u062f\u062f. \u0646\u062a\u0645\u064a\u0632 \u0628\u0633\u0631\u0639\u0629 \u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u062e\u0644\u0627\u0644 \u0664\u0668 \u0633\u0627\u0639\u0629 \u0645\u0639 \u0636\u0645\u0627\u0646 \u0627\u0644\u062a\u0639\u062f\u064a\u0644\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u0646\u0627\u0633\u0628 \u0630\u0648\u0642\u0643 \u0627\u0644\u0631\u0627\u0642\u064a.'
      }, 'class="lede"')}
      <div class="hero__actions">
        ${bt('a', { en: 'Order your custom card', ar: '\u0627\u0637\u0644\u0628 \u0628\u0637\u0627\u0642\u062a\u0643 \u0627\u0644\u0645\u062e\u0635\u0635\u0629' }, 'class="btn btn--bloom btn--lg" href="order.html"')}
        ${bt('a', { en: 'See the portfolio', ar: '\u0634\u0627\u0647\u062f \u0623\u0639\u0645\u0627\u0644\u0646\u0627' }, 'class="btn btn--ghost btn--lg" href="portfolio.html"')}
      </div>
      <div class="hero__proof">
        <div class="stat"><span class="stat__value num">48h</span>${bt('span', { en: 'Card delivered', ar: '\u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629' }, 'class="stat__label"')}</div>
        <div class="stat"><span class="stat__value num">600+</span>${bt('span', { en: 'Cards delivered', ar: '\u0628\u0637\u0627\u0642\u0629 \u0633\u064f\u0644\u0651\u0645\u062a' }, 'class="stat__label"')}</div>
        <div class="stat"><span class="stat__value num">\u221e</span>${bt('span', { en: 'Revisions guaranteed', ar: '\u0636\u0645\u0627\u0646 \u0627\u0644\u062a\u0639\u062f\u064a\u0644\u0627\u062a' }, 'class="stat__label"')}</div>
      </div>
    </div>

    <div class="showcase" id="showcase" role="group" aria-roledescription="carousel"
         ${biAttr('aria-label', { en: 'Featured card designs \u2014 drag to browse', ar: '\u062a\u0635\u0627\u0645\u064a\u0645 \u0645\u062e\u062a\u0627\u0631\u0629 \u2014 \u0627\u0633\u062d\u0628 \u0644\u0644\u062a\u0635\u0641\u062d' })}>
      <ul class="showcase__track" id="showcaseTrack" tabindex="0"
          ${biAttr('aria-label', { en: 'Card designs, drag or use arrow keys', ar: '\u0627\u0644\u062a\u0635\u0627\u0645\u064a\u0645\u060c \u0627\u0633\u062d\u0628 \u0623\u0648 \u0627\u0633\u062a\u062e\u062f\u0645 \u0623\u0633\u0647\u0645 \u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0641\u0627\u062a\u064a\u062d' })}>
        ${showcaseCards.map((c, i) => `
        <li class="showcase__slide" data-index="${i}" data-card="${c.id}"
            aria-roledescription="slide" aria-label="${i + 1} / ${showcaseCards.length}">
          <img src="${a(c.src)}" width="${c.w}" height="${c.h}" draggable="false"
               ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"
               ${biAttr('alt', { en: `${c.en.title} \u2014 ${occLabel(c.occasion).en}`, ar: `${c.ar.title} \u2014 ${occLabel(c.occasion).ar}` })}>
        </li>`).join('')}
      </ul>
      <button class="showcase__arrow showcase__arrow--prev" id="showcasePrev" type="button"
        ${biAttr('aria-label', { en: 'Previous design', ar: '\u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0633\u0627\u0628\u0642' })}>${icons.chevronL}</button>
      <button class="showcase__arrow showcase__arrow--next" id="showcaseNext" type="button"
        ${biAttr('aria-label', { en: 'Next design', ar: '\u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u062a\u0627\u0644\u064a' })}>${icons.chevronR}</button>
      <p class="showcase__caption" id="showcaseCaption" aria-live="polite">${e(showcaseCards[0].ar.title)}</p>
      <div class="showcase__dots" id="showcaseDots"></div>
      ${bt('p', { en: 'Drag to browse', ar: '\u0627\u0633\u062d\u0628 \u0644\u0644\u062a\u0635\u0641\u062d' }, 'class="showcase__hint"')}
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head center">
      ${ornament()}
      ${bt('p', { en: 'Every occasion', ar: 'لكل مناسبة' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'What are we celebrating?', ar: 'بماذا نحتفل؟' })}
      ${bt('p', { en: 'Pick an occasion and jump straight to the designs made for it.', ar: 'اختر المناسبة وانتقل مباشرة إلى التصاميم المخصصة لها.' }, 'class="lede"')}
    </div>
    <div class="grid grid-4">${occStrip}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      ${bt('p', { en: 'Selected work', ar: 'مختارات من أعمالنا' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'Cards we have already delivered', ar: 'بطاقات سلّمناها بالفعل' })}
      ${bt('p', {
        en: 'Real pieces made for real occasions. Tap any of them to see it up close — and any one of them can be remade in your names.',
        ar: 'أعمال حقيقية لمناسبات حقيقية. اضغط على أي منها لتراه عن قرب — وكلّها يمكن إعادة تصميمها بأسمائك.'
      }, 'class="lede"')}
    </div>
    <div class="work-grid">
      ${featured.map((wk, i) => workTile(wk, i)).join('\n      ')}
    </div>
    <p class="center mt-lg">
      ${bt('a', { en: `View all ${works.length} pieces`, ar: `شاهد كل الـ ${works.length} عملاً` }, 'class="btn btn--ghost" href="portfolio.html"')}
    </p>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head center">
      ${ornament()}
      ${bt('p', { en: 'Why this studio', ar: 'لماذا هذا الاستوديو' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'The difference is in the details', ar: 'الفرق في التفاصيل' })}
    </div>
    <div class="grid grid-4">
      ${valueProps.map((v, i) => `
      <article class="card reveal" style="--reveal-delay:${i * 70}ms">
        <span class="card__icon">${v.icon}</span>
        ${bt('h3', { en: v.en.t, ar: v.ar.t })}
        ${bt('p', { en: v.en.b, ar: v.ar.b })}
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      ${bt('p', { en: 'How it works', ar: 'كيف نعمل' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'From message to mailbox in four steps', ar: 'من الرسالة إلى صندوق البريد في أربع خطوات' })}
    </div>
    <div class="grid grid-4 steps">
      ${process.map((p, i) => `
      <article class="step reveal" style="--reveal-delay:${i * 80}ms">
        ${bt('h3', { en: p.en.title, ar: p.ar.title })}
        ${bt('p', { en: p.en.body, ar: p.ar.body })}
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head center">
      ${ornament()}
      ${bt('p', { en: 'In their words', ar: 'بكلماتهم' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'What customers say', ar: 'ماذا يقول العملاء' })}
    </div>
    <div class="grid quotes">
      ${testimonials.slice(0, 3).map((t, i) => quoteCard(t, i)).join('')}
    </div>
    <p class="center mt-lg">
      ${bt('a', { en: 'Read all reviews', ar: 'اقرأ كل الآراء' }, 'class="btn btn--ghost" href="testimonials.html"')}
    </p>
  </div>
</section>

${instagramSection()}

${ctaBand({
  title: { en: 'Ready to design your card?', ar: 'جاهز لتصميم بطاقتك؟' },
  body: { en: 'Answer six short questions and you will have a draft in your hands within 48 hours.', ar: 'أجب عن ست أسئلة قصيرة وستصلك المسودة خلال ٤٨ ساعة.' },
  primary: { label: { en: 'Start your order', ar: 'ابدأ طلبك' }, href: 'order.html' },
  secondary: { label: { en: 'Ask a question on WhatsApp', ar: 'اسأل عبر واتساب' }, href: waLink('مرحباً ليلى، لدي سؤال عن تصميم بطاقة.'), ext: true }
})}

` + footer() + cartDrawer() + lightbox() + toastRegion() + scripts(['gallery.js']);
}

function occBlurb(id) {
  const map = {
    wedding: { en: 'Invitations, save-the-dates and thank-you cards as a matching suite.', ar: 'دعوات، بطاقات حجز الموعد، وبطاقات شكر كطقم متناسق.' },
    eid: { en: 'Crescents, lanterns and arches for Eid al-Fitr, Eid al-Adha and Ramadan.', ar: 'أهلّة وفوانيس وأقواس لعيد الفطر وعيد الأضحى ورمضان.' },
    birthday: { en: 'Warm, gilded and never childish — for mothers, sisters and friends.', ar: 'دافئة ومذهّبة وغير طفولية أبداً — للأمهات والأخوات والأصدقاء.' },
    graduation: { en: 'Single cards or a set of ten with a different name on each.', ar: 'بطاقة مفردة أو طقم من عشر باسم مختلف على كل واحدة.' },
    henna: { en: 'Invitations and favour tags for the henna night \u2014 thobe embroidery, garnet roses and gold.', ar: '\u062f\u0639\u0648\u0627\u062a \u0648\u0628\u0637\u0627\u0642\u0627\u062a \u0647\u062f\u0627\u064a\u0627 \u0644\u0644\u064a\u0644\u0629 \u0627\u0644\u062d\u0646\u0629 \u2014 \u062a\u0637\u0631\u064a\u0632 \u0627\u0644\u062b\u0648\u0628 \u0648\u0627\u0644\u0648\u0631\u062f \u0627\u0644\u0639\u0646\u0651\u0627\u0628\u064a \u0648\u0627\u0644\u0630\u0647\u0628\u064a.' },
    corporate: { en: 'Your logo, your colours, invoiced properly — from fifty cards up.', ar: 'شعارك وألوانك مع فاتورة رسمية — من خمسين بطاقة فأكثر.' },
    newborn: { en: 'Announcements with room for the name, weight and birth date.', ar: 'إعلانات مع مساحة للاسم والوزن وتاريخ الميلاد.' },
    thanks: { en: 'Appreciation cards sized to slip into a gift box or bouquet.', ar: 'بطاقات شكر بمقاس يناسب علبة الهدية أو باقة الورد.' }
  };
  return map[id] || { en: '', ar: '' };
}

function quoteCard(t, i) {
  const initials = t.en.name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  return `
      <figure class="quote reveal" style="--reveal-delay:${i * 80}ms">
        <div class="quote__media">
          <img src="assets/img/reviews/${t.id}.svg" width="800" height="500" loading="lazy" decoding="async"
               ${biAttr('alt', { en: `Cards delivered to ${t.en.name}`, ar: `بطاقات سُلّمت إلى ${t.ar.name}` })}>
        </div>
        <div class="quote__body">
          <div class="stars" role="img" ${biAttr('aria-label', { en: `${t.rating} out of 5 stars`, ar: `${t.rating} من ٥ نجوم` })}>
            ${Array.from({ length: t.rating }, () => icons.star).join('')}
          </div>
          ${bt('blockquote', { en: `“${t.en.text}”`, ar: `«${t.ar.text}»` }, 'class="quote__text"')}
          <figcaption class="quote__person">
            <span class="avatar" aria-hidden="true">${e(initials)}</span>
            <span>
              ${bt('span', { en: t.en.name, ar: t.ar.name }, 'class="quote__name"')}
              ${bt('span', { en: t.en.role, ar: t.ar.role }, 'class="quote__role"')}
            </span>
          </figcaption>
        </div>
      </figure>`;
}

function instagramSection() {
  return `
<section class="section section--blush">
  <div class="container">
    <div class="section-head center">
      ${bt('p', { en: 'Follow along', ar: '\u062a\u0627\u0628\u0639\u0646\u0627' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'New designs first on Instagram', ar: '\u0627\u0644\u062a\u0635\u0627\u0645\u064a\u0645 \u0627\u0644\u062c\u062f\u064a\u062f\u0629 \u0623\u0648\u0644\u0627\u064b \u0639\u0644\u0649 \u0625\u0646\u0633\u062a\u063a\u0631\u0627\u0645' })}
      ${bt('p', { en: 'Work in progress, printed proofs and finished cards \u2014 posted as they leave the studio.', ar: '\u0623\u0639\u0645\u0627\u0644 \u0642\u064a\u062f \u0627\u0644\u062a\u0646\u0641\u064a\u0630 \u0648\u0646\u0645\u0627\u0630\u062c \u0645\u0637\u0628\u0648\u0639\u0629 \u0648\u0628\u0637\u0627\u0642\u0627\u062a \u062c\u0627\u0647\u0632\u0629 \u2014 \u062a\u064f\u0646\u0634\u0631 \u0641\u0648\u0631 \u062e\u0631\u0648\u062c\u0647\u0627 \u0645\u0646 \u0627\u0644\u0627\u0633\u062a\u0648\u062f\u064a\u0648.' }, 'class="lede"')}
    </div>
    <ul class="ig-strip">
      ${instagramPosts.map((post, i) => {
        const isReel = post.type === 'reel';
        const label = {
          en: `${post.en.caption} \u2014 ${isReel ? 'reel' : 'post'} on Instagram, opens in a new tab`,
          ar: `${post.ar.caption} \u2014 ${isReel ? '\u0631\u064a\u0644' : '\u0645\u0646\u0634\u0648\u0631'} \u0639\u0644\u0649 \u0625\u0646\u0633\u062a\u063a\u0631\u0627\u0645\u060c \u064a\u0641\u062a\u062d \u0641\u064a \u062a\u0628\u0648\u064a\u0628 \u062c\u062f\u064a\u062f`
        };
        return `
      <li class="ig-cell reveal" style="--reveal-delay:${i * 60}ms">
        <a class="ig-item" href="${a(post.url || site.instagramUrl)}" target="_blank" rel="noopener"
           ${biAttr('aria-label', label)}>
          <img src="${a(post.image)}" width="560" height="560" loading="lazy" decoding="async" alt="">
          <span class="ig-item__icon">${isReel ? icons.monitor : icons.instagram}</span>
          ${isReel ? `<span class="ig-item__reel" aria-hidden="true">\u25b6</span>` : ''}
          <span class="ig-item__caption" aria-hidden="true"
                ${biData({ en: post.en.caption, ar: post.ar.caption })}>${e(post.ar.caption)}</span>
        </a>
      </li>`;
      }).join('')}
    </ul>
    <p class="center mt-lg">
      ${bt('a', { en: `Follow @${site.instagram}`, ar: `\u062a\u0627\u0628\u0639 @${site.instagram}` }, `class="btn btn--ghost" href="${site.instagramUrl}" target="_blank" rel="noopener"`)}
    </p>
  </div>
</section>`;
}

/* --------------------------------------------------------- PORTFOLIO */


/* A delivered piece: her real artwork, a photograph of it in place, or an
   animated card reel. Every one carries the same offer — we can make you
   one like it — deep-linked so the order opens on the right occasion with
   the piece already named in the brief. */
function workTile(wk, i) {
  const occ = occLabel(wk.occasion);
  const isVideo = wk.type === 'video';
  const cta = `order.html?occasion=${encodeURIComponent(wk.occasion)}&ref=${encodeURIComponent(wk.id)}`;
  const media = isVideo
    ? `<div class="work__media work__media--video">
         <video src="${a(wk.src)}" controls preload="none" playsinline poster="${a(wk.poster)}"
                width="${wk.w}" height="${wk.h}"
                ${biAttr('aria-label', { en: `${wk.en.title} — animated card`, ar: `${wk.ar.title} — بطاقة متحرّكة` })}></video>
         ${bt('span', { en: 'Reel', ar: 'فيديو' }, 'class="work__badge"')}
       </div>`
    : `<button type="button" class="work__media" data-work="${a(wk.id)}"
               ${biAttr('aria-label', { en: `Open ${wk.en.title} larger`, ar: `افتح ${wk.ar.title} بحجم أكبر` })}>
         <img src="${a(wk.src)}" width="${wk.w}" height="${wk.h}" loading="${i < 4 ? 'eager' : 'lazy'}" decoding="async"
              ${biAttr('alt', { en: `${wk.en.title} — ${occ.en}`, ar: `${wk.ar.title} — ${occ.ar}` })}>
       </button>`;
  return `
      <figure class="work reveal" data-occasion="${a(wk.occasion)}" style="--reveal-delay:${(i % 3) * 70}ms">
        ${media}
        <figcaption class="work__body">
          ${bt('span', occ, 'class="work__occasion"')}
          ${bt('h3', { en: wk.en.title, ar: wk.ar.title }, 'class="work__title"')}
          ${bt('p', { en: wk.en.note, ar: wk.ar.note }, 'class="work__note"')}
          ${bt('a', { en: 'Make me one like this', ar: 'نصمّم لك مثلها' }, `class="work__cta" href="${cta}"`)}
        </figcaption>
      </figure>`;
}

export function portfolio() {
  return head({
    page: 'portfolio.html',
    title: { en: 'Portfolio \u2014 delivered work', ar: '\u0645\u0639\u0631\u0636 \u0627\u0644\u0623\u0639\u0645\u0627\u0644' },
    description: {
      en: `${works.length} pieces delivered to real clients \u2014 wedding and katb ktab invitations, henna nights, Ramadan and Eid cards, birthdays, graduations and new-baby announcements. Any of them can be remade for your occasion.`,
      ar: `${works.length} \u0639\u0645\u0644\u0627\u064b \u0633\u064f\u0644\u0651\u0645\u062a \u0644\u0639\u0645\u0644\u0627\u0621 \u062d\u0642\u064a\u0642\u064a\u064a\u0646 \u2014 \u062f\u0639\u0648\u0627\u062a \u0632\u0641\u0627\u0641 \u0648\u0639\u0642\u062f \u0642\u0631\u0627\u0646\u060c \u0644\u064a\u0627\u0644\u064a \u062d\u0646\u0629\u060c \u0628\u0637\u0627\u0642\u0627\u062a \u0631\u0645\u0636\u0627\u0646 \u0648\u0627\u0644\u0639\u064a\u062f\u060c \u0623\u0639\u064a\u0627\u062f \u0645\u064a\u0644\u0627\u062f\u060c \u062a\u062e\u0631\u0651\u062c\u060c \u0648\u0628\u0634\u0627\u0626\u0631 \u0645\u0648\u0627\u0644\u064a\u062f. \u0648\u0643\u0644\u0651\u0647\u0627 \u064a\u064f\u0639\u0627\u062f \u062a\u0635\u0645\u064a\u0645\u0647\u0627 \u0644\u0645\u0646\u0627\u0633\u0628\u062a\u0643.`
    },
    keywords: '\u0645\u0639\u0631\u0636 \u0628\u0637\u0627\u0642\u0627\u062a, \u062f\u0639\u0648\u0627\u062a \u0632\u0641\u0627\u0641, \u0628\u0637\u0627\u0642\u0627\u062a \u062d\u0646\u0629, \u062f\u0639\u0648\u0629 \u062d\u0646\u0629, \u0628\u0637\u0627\u0642\u0627\u062a \u0631\u0645\u0636\u0627\u0646, \u0628\u0637\u0627\u0642\u0627\u062a \u0639\u064a\u062f, \u0628\u0637\u0627\u0642\u0627\u062a \u062a\u062e\u0631\u062c, \u0639\u0645\u0627\u0646, Arabic card designs, henna night invitation, wedding invitation Jordan, Ramadan cards',
    extraHead: breadcrumbJsonLd('portfolio.html', 'Portfolio')
  }) + header('portfolio.html') + pageBanner({
    crumb: { en: 'Portfolio', ar: '\u0623\u0639\u0645\u0627\u0644\u0646\u0627' },
    eyebrow: { en: `${works.length} pieces delivered`, ar: `${works.length} \u0639\u0645\u0644\u0627\u064b \u0633\u064f\u0644\u0651\u0645` },
    title: { en: 'Work we have delivered', ar: '\u0623\u0639\u0645\u0627\u0644 \u0633\u0644\u0651\u0645\u0646\u0627\u0647\u0627' },
    lede: {
      en: 'Real cards for real occasions \u2014 photographed where they were used, and a few of the animated ones you can send over WhatsApp. Anything here can be remade in your names, your colours and your date.',
      ar: '\u0628\u0637\u0627\u0642\u0627\u062a \u062d\u0642\u064a\u0642\u064a\u0629 \u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062a \u062d\u0642\u064a\u0642\u064a\u0629 \u2014 \u0645\u0635\u0648\u0651\u0631\u0629 \u062d\u064a\u062b \u0627\u0633\u062a\u064f\u062e\u062f\u0645\u062a\u060c \u0648\u0628\u0639\u0636\u0647\u0627 \u0645\u062a\u062d\u0631\u0651\u0643 \u064a\u064f\u0631\u0633\u0644 \u0639\u0628\u0631 \u0648\u0627\u062a\u0633\u0627\u0628. \u0643\u0644 \u0645\u0627 \u062a\u0631\u0627\u0647 \u0647\u0646\u0627 \u064a\u064f\u0639\u0627\u062f \u062a\u0635\u0645\u064a\u0645\u0647 \u0628\u0623\u0633\u0645\u0627\u0626\u0643 \u0648\u0623\u0644\u0648\u0627\u0646\u0643 \u0648\u062a\u0627\u0631\u064a\u062e\u0643.'
    }
  }) + `

<section class="section section--tight">
  <div class="container">
    <div class="filters" role="group" ${biAttr('aria-label', { en: 'Filter by occasion', ar: '\u062a\u0635\u0641\u064a\u0629 \u062d\u0633\u0628 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629' })}>
      ${occasions.map((o) => `${bt('button', o, `type="button" class="filter" data-filter="${o.id}" aria-pressed="${o.id === 'all' ? 'true' : 'false'}"`)}`).join('\n      ')}
    </div>
    <p class="center text-mute" style="margin-block-end:var(--space-md);font-size:var(--step--1)">
      <span id="galleryCount" class="num">${works.length + cards.length}</span>
      ${bt('span', ui.designCount)}
    </p>

    <div class="work-grid" id="workGrid">
      ${works.map((wk, i) => workTile(wk, i)).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--cream" id="catalogueSection">
  <div class="container">
    <div class="section-head center">
      ${ornament()}
      ${bt('p', { en: 'Ready to order', ar: '\u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0637\u0644\u0628' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'Design families you can start from', ar: '\u0639\u0627\u0626\u0644\u0627\u062a \u062a\u0635\u0627\u0645\u064a\u0645 \u062a\u0628\u062f\u0623 \u0645\u0646\u0647\u0627' })}
      ${bt('p', { en: 'Each one is a starting point with a set price \u2014 pick the closest, then tell me what to change.', ar: '\u0643\u0644 \u0648\u0627\u062d\u062f\u0629 \u0646\u0642\u0637\u0629 \u0628\u062f\u0627\u064a\u0629 \u0628\u0633\u0639\u0631 \u0645\u062d\u062f\u0651\u062f \u2014 \u0627\u062e\u062a\u0631 \u0627\u0644\u0623\u0642\u0631\u0628 \u062b\u0645 \u0623\u062e\u0628\u0631\u0646\u064a \u0628\u0645\u0627 \u062a\u0631\u064a\u062f \u062a\u063a\u064a\u064a\u0631\u0647.' }, 'class="lede"')}
    </div>
    <div class="grid gallery" id="gallery">
      ${cards.map((c, i) => tile(c, { lazy: true, delay: (i % 4) * 60 })).join('\n      ')}
      ${bt('p', ui.noResults, 'class="gallery-empty" id="galleryEmpty" hidden')}
    </div>
  </div>
</section>

${ctaBand({
  title: { en: 'Found one you like?', ar: '\u0648\u062c\u062f\u062a \u0645\u0627 \u064a\u0639\u062c\u0628\u0643\u061f' },
  body: { en: 'Anything here can be adapted to your names, colours and occasion. Start the order and tell me what to change.', ar: '\u0623\u064a \u0639\u0645\u0644 \u0647\u0646\u0627 \u064a\u0645\u0643\u0646 \u062a\u0639\u062f\u064a\u0644\u0647 \u0644\u064a\u0646\u0627\u0633\u0628 \u0623\u0633\u0645\u0627\u0621\u0643 \u0648\u0623\u0644\u0648\u0627\u0646\u0643 \u0648\u0645\u0646\u0627\u0633\u0628\u062a\u0643. \u0627\u0628\u062f\u0623 \u0627\u0644\u0637\u0644\u0628 \u0648\u0623\u062e\u0628\u0631\u0646\u064a \u0628\u0645\u0627 \u062a\u0631\u064a\u062f \u062a\u063a\u064a\u064a\u0631\u0647.' },
  primary: { label: { en: 'Start your order', ar: '\u0627\u0628\u062f\u0623 \u0637\u0644\u0628\u0643' }, href: 'order.html' },
  secondary: { label: { en: 'See pricing', ar: '\u0634\u0627\u0647\u062f \u0627\u0644\u0623\u0633\u0639\u0627\u0631' }, href: 'services.html' }
})}

` + footer() + cartDrawer() + lightbox() + toastRegion() + scripts(['gallery.js']);
}

/* ---------------------------------------------------------- SERVICES */

export function services() {
  const plan = (p, i) => `
      <article class="plan${p.featured ? ' plan--featured' : ''} reveal" style="--reveal-delay:${i * 80}ms">
        ${p.featured ? bt('span', { en: 'Most ordered', ar: 'الأكثر طلباً' }, 'class="plan__flag"') : ''}
        ${bt('h3', p.name, 'class="plan__name"')}
        ${bt('p', p.for, 'class="plan__for"')}
        <p class="plan__price">
          ${p.price ? `<span class="plan__amount"><span class="num">${p.price}</span> ${bt('span', ui.currency)}</span>` : `<span class="plan__amount">${bt('span', { en: 'Quote', ar: 'عرض سعر' })}</span>`}
          ${bt('span', p.unit, 'class="plan__unit"')}
        </p>
        <span class="plan__turnaround">${icons.clock}${bt('span', p.turnaround)}</span>
        <ul class="plan__list">
          ${p.includes.en.map((_, k) => bt('li', { en: p.includes.en[k], ar: p.includes.ar[k] })).join('\n          ')}
        </ul>
        ${bt('a', p.id === 'corporate' ? { en: 'Request a quote', ar: 'اطلب عرض سعر' } : { en: 'Choose this package', ar: 'اختر هذه الباقة' },
          `class="btn ${p.featured ? 'btn--bloom' : 'btn--ghost'} btn--block plan__cta" href="order.html?package=${p.id}"`)}
      </article>`;

  return head({
    page: 'services.html',
    title: { en: 'Services & pricing', ar: 'الخدمات والأسعار' },
    description: {
      en: 'Digital cards from 15 JOD delivered in 48 hours, printed cards from 8 JOD each with a 25-card minimum, and corporate runs from 6 JOD per card. Clear turnaround times and what each package includes.',
      ar: 'بطاقات رقمية من ١٥ ديناراً تُسلّم خلال ٤٨ ساعة، بطاقات مطبوعة من ٨ دنانير للبطاقة بحد أدنى ٢٥ قطعة، وطلبات الشركات من ٦ دنانير للبطاقة. مواعيد تسليم واضحة وتفاصيل كل باقة.'
    },
    keywords: 'أسعار تصميم بطاقات, باقات بطاقات, طباعة بطاقات عمان, بطاقات شركات بالجملة, card design prices Jordan, printed cards Amman, corporate card printing',
    extraHead: breadcrumbJsonLd('services.html', 'Services & pricing')
  }) + header('services.html') + pageBanner({
    crumb: { en: 'Services', ar: 'الخدمات' },
    eyebrow: { en: 'Packages & pricing', ar: 'الباقات والأسعار' },
    title: { en: 'Services & pricing', ar: 'الخدمات والأسعار' },
    lede: { en: 'Three ways to work together, priced openly. Every package includes two revision rounds and text set in Arabic, English or both.', ar: 'ثلاث طرق للعمل معاً بأسعار معلنة. كل باقة تشمل جولتَي تعديل ونصاً بالعربية أو الإنجليزية أو كليهما.' }
  }) + `

<section class="section section--tight" ${biAttr('aria-label', { en: 'Packages', ar: 'الباقات' })}>
  <div class="container">
    ${bt('h2', { en: 'Packages', ar: 'الباقات' }, 'class="visually-hidden"')}
    <div class="grid plans">
      ${plans.map(plan).join('')}
    </div>
    ${bt('p', {
      en: 'Prices are in Jordanian Dinar and include the design work. Printing, delivery and finishing options are listed below.',
      ar: 'الأسعار بالدينار الأردني وتشمل أعمال التصميم. خيارات الطباعة والتوصيل واللمسات الإضافية موضحة أدناه.'
    }, 'class="center text-mute mt-lg" style="font-size:var(--step--1)"')}
  </div>
</section>

<section class="section section--cream">
  <div class="container container--narrow">
    <div class="section-head center">
      ${ornament()}
      ${bt('p', { en: 'Finishing touches', ar: 'لمسات إضافية' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'Add-ons', ar: 'الإضافات' })}
      ${bt('p', { en: 'Optional extras you can add at the order step. Prices are per order unless noted.', ar: 'إضافات اختيارية يمكنك اختيارها عند الطلب. الأسعار لكل طلبية ما لم يُذكر غير ذلك.' }, 'class="lede"')}
    </div>
    <div class="card">
      <ul class="addons">
        ${addons.map((x) => `<li>${bt('span', { en: x.en.name, ar: x.ar.name })}<span class="price"><span class="num">${x.price}</span> ${bt('span', ui.currency)}</span></li>`).join('\n        ')}
      </ul>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      ${bt('p', { en: 'What happens next', ar: 'ماذا يحدث بعد ذلك' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'The process, start to finish', ar: 'العملية من البداية للنهاية' })}
    </div>
    <div class="grid grid-4 steps">
      ${process.map((p, i) => `
      <article class="step reveal" style="--reveal-delay:${i * 80}ms">
        ${bt('h3', { en: p.en.title, ar: p.ar.title })}
        ${bt('p', { en: p.en.body, ar: p.ar.body })}
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container container--narrow">
    <div class="section-head center">
      ${bt('p', { en: 'Good to know', ar: 'من الجيد معرفته' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'Common questions about pricing', ar: 'أسئلة شائعة حول الأسعار' })}
    </div>
    <div class="faq">
      ${faqs.slice(0, 4).map((f) => faqItem(f)).join('')}
    </div>
    <p class="center mt-lg">
      ${bt('a', { en: 'See all questions', ar: 'شاهد كل الأسئلة' }, 'class="btn btn--ghost" href="contact.html#faq"')}
    </p>
  </div>
</section>

${ctaBand({
  title: { en: 'Pick a package and start', ar: 'اختر باقة وابدأ' },
  body: { en: 'The order form takes about three minutes and you can save it halfway if you need to check a date.', ar: 'نموذج الطلب يستغرق نحو ثلاث دقائق ويمكنك حفظه في المنتصف إذا احتجت للتأكد من تاريخ ما.' },
  primary: { label: { en: 'Start your order', ar: 'ابدأ طلبك' }, href: 'order.html' },
  secondary: { label: { en: 'Request a bulk quote', ar: 'اطلب عرض سعر للجملة' }, href: 'order.html?package=corporate' }
})}

` + footer() + cartDrawer() + toastRegion() + scripts();
}

function faqItem(f) {
  return `
      <details>
        ${bt('summary', { en: f.en.q, ar: f.ar.q })}
        <div class="faq__answer">${bt('p', { en: f.en.a, ar: f.ar.a })}</div>
      </details>`;
}

/* ------------------------------------------------------------- ABOUT */

export function about() {
  const values = [
    { en: { t: 'Originality first', b: 'No clip-art, no marketplace templates. If a motif appears on your card, it was drawn for this studio.' },
      ar: { t: 'الأصالة أولاً', b: 'لا صور جاهزة ولا قوالب من المتاجر. إذا ظهرت زخرفة على بطاقتك فقد رُسمت في هذا الاستوديو.' } },
    { en: { t: 'Arabic treated as a craft', b: 'Arabic is where I started and where the care goes. Letter joins, spacing and the weight of a name are checked before anything is sent.' },
      ar: { t: 'العربية حرفة لا حشو', b: 'العربية هي نقطة البداية وموضع العناية. وصل الحروف والتباعد وثقل الاسم تُراجع قبل إرسال أي شيء.' } },
    { en: { t: 'Honest timelines', b: 'If a date cannot be met, I say so before you pay rather than after. Most orders arrive ahead of the promised day.' },
      ar: { t: 'مواعيد صادقة', b: 'إذا تعذّر الالتزام بموعد أقول ذلك قبل الدفع لا بعده. ومعظم الطلبات تصل قبل اليوم الموعود.' } },
    { en: { t: 'Small enough to care', b: 'Every order passes through one pair of hands. You always speak to the person drawing your card.' },
      ar: { t: 'صغيرٌ بما يكفي للاهتمام', b: 'كل طلبية تمرّ عبر يدين اثنتين فقط. أنت تتحدث دائماً إلى الشخص الذي يرسم بطاقتك.' } }
  ];

  return head({
    page: 'about.html',
    title: { en: 'About the studio', ar: 'عن الاستوديو' },
    description: {
      en: "The story behind Lily's Designs — a one-person card studio in Amman drawing original Arabic greeting cards, and the design philosophy behind every piece.",
      ar: 'قصة ليليز ديزاينز — استوديو بطاقات بشخص واحد في عمّان يرسم بطاقات تهنئة عربية أصلية، وفلسفة التصميم وراء كل قطعة.'
    },
    keywords: 'عن ليليز ديزاينز, مصممة بطاقات, استوديو تصميم عمان, الخط العربي, about Lily\'s Designs, card designer Amman, Arabic calligraphy design studio',
    extraHead: breadcrumbJsonLd('about.html', 'About')
  }) + header('about.html') + pageBanner({
    crumb: { en: 'About', ar: 'عن الاستوديو' },
    eyebrow: { en: 'The studio', ar: 'الاستوديو' },
    title: { en: 'A card is a small, permanent thing', ar: 'البطاقة شيء صغير يبقى' },
    lede: { en: 'Messages are deleted. Cards end up in a drawer, a frame, or a box that gets opened years later. That is the whole reason this studio exists.', ar: 'الرسائل تُحذف. أما البطاقات فتنتهي في درج أو إطار أو صندوق يُفتح بعد سنوات. وهذا وحده سبب وجود هذا الاستوديو.' }
  }) + `

<section class="section section--tight">
  <div class="container">
    <figure class="crest reveal">
      <img src="assets/img/brand/logo.jpg" width="240" height="240" loading="lazy" decoding="async"
           ${biAttr('alt', { en: "The Lily's Designs mark: a lily-of-the-valley wreath tied with a periwinkle ribbon", ar: '\u0634\u0639\u0627\u0631 \u0644\u064a\u0644\u064a\u0632 \u062f\u064a\u0632\u0627\u064a\u0646\u0632: \u0625\u0643\u0644\u064a\u0644 \u0645\u0646 \u0632\u0646\u0628\u0642 \u0627\u0644\u0648\u0627\u062f\u064a \u0645\u0639\u0642\u0648\u062f \u0628\u0634\u0631\u064a\u0637 \u0628\u0646\u0641\u0633\u062c\u064a' })}>
      ${bt('figcaption', {
        en: 'Lily of the valley for a fresh start, drawn in green and tied in periwinkle \u2014 the same three colours every card is built from.',
        ar: '\u0632\u0646\u0628\u0642 \u0627\u0644\u0648\u0627\u062f\u064a \u0631\u0645\u0632 \u0644\u0644\u0628\u062f\u0627\u064a\u0627\u062a\u060c \u0645\u0631\u0633\u0648\u0645 \u0628\u0627\u0644\u0623\u062e\u0636\u0631 \u0648\u0645\u0639\u0642\u0648\u062f \u0628\u0627\u0644\u0628\u0646\u0641\u0633\u062c\u064a \u2014 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0627\u0644\u062b\u0644\u0627\u062b\u0629 \u0646\u0641\u0633\u0647\u0627 \u0627\u0644\u062a\u064a \u062a\u064f\u0628\u0646\u0649 \u0645\u0646\u0647\u0627 \u0643\u0644 \u0628\u0637\u0627\u0642\u0629.'
      })}
    </figure>
    <div class="split">
      <div class="portrait reveal">
        <img src="assets/img/brand/studio.svg" width="640" height="800" loading="lazy" decoding="async"
             ${biAttr('alt', { en: "A card in progress on the studio desk beside a pen and ink pot", ar: 'بطاقة قيد التنفيذ على طاولة الاستوديو بجانب قلم ومحبرة' })}>
      </div>
      <div class="reveal" style="--reveal-delay:120ms">
        ${bt('p', { en: 'How it started', ar: 'كيف بدأت' }, 'class="eyebrow"')}
        ${bt('h2', { en: 'It began with one wedding invitation', ar: 'بدأت بدعوة زفاف واحدة' })}
        ${bt('p', {
          en: 'A friend needed an invitation in Arabic and English on the same card. Every template she found treated the Arabic as an afterthought — squeezed under the English, the letters cramped, the spacing wrong. So I drew one instead.',
          ar: 'احتاجت صديقة إلى دعوة بالعربية والإنجليزية على البطاقة نفسها. كل قالب وجدته كان يعامل العربية كإضافة لاحقة — محشورة تحت الإنجليزية، حروفها متزاحمة، وتباعدها خاطئ. فرسمتُ واحدة بدلاً من ذلك.'
        })}
        ${bt('p', {
          en: 'Her guests asked who made it. Those questions turned into orders, the orders turned into a studio, and six hundred cards later the rule has not changed: the Arabic is designed first, and the English is fitted around it.',
          ar: 'سأل ضيوفها عمّن صنعها. تحوّلت تلك الأسئلة إلى طلبات، وتحوّلت الطلبات إلى استوديو، وبعد ستمئة بطاقة لم تتغير القاعدة: العربية تُصمَّم أولاً، والإنجليزية تُركَّب حولها.'
        })}
        ${bt('p', {
          en: 'The studio is still one person. That is deliberate — it is the only way to keep every card drawn rather than assembled.',
          ar: 'ما زال الاستوديو شخصاً واحداً. وهذا مقصود — فهو السبيل الوحيد لتبقى كل بطاقة مرسومة لا مُجمَّعة.'
        })}
        <p class="mt-md">
          ${bt('a', { en: 'See the work', ar: 'شاهد الأعمال' }, 'class="btn btn--bloom" href="portfolio.html"')}
        </p>
      </div>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container container--narrow">
    <div class="section-head center">
      ${ornament()}
      ${bt('p', { en: 'Design philosophy', ar: 'فلسفة التصميم' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'Four things I will not compromise on', ar: 'أربعة أمور لا أتنازل عنها' })}
    </div>
    <ul class="values">
      ${values.map((v, i) => `<li class="reveal" style="--reveal-delay:${i * 70}ms">
        ${bt('strong', { en: v.en.t, ar: v.ar.t })}
        ${bt('span', { en: v.en.b, ar: v.ar.b })}
      </li>`).join('')}
    </ul>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      ${bt('p', { en: 'The process', ar: 'طريقة العمل' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'What working together looks like', ar: 'كيف يبدو العمل معاً' })}
    </div>
    <div class="grid grid-4 steps">
      ${process.map((p, i) => `
      <article class="step reveal" style="--reveal-delay:${i * 80}ms">
        ${bt('h3', { en: p.en.title, ar: p.ar.title })}
        ${bt('p', { en: p.en.body, ar: p.ar.body })}
      </article>`).join('')}
    </div>
  </div>
</section>

${ctaBand({
  title: { en: 'Tell me about your occasion', ar: 'أخبرني عن مناسبتك' },
  body: { en: 'Whether it is one card or two hundred, the first step is the same — tell me what we are celebrating.', ar: 'سواء كانت بطاقة واحدة أو مئتين، الخطوة الأولى واحدة — أخبرني بماذا نحتفل.' },
  primary: { label: { en: 'Start your order', ar: 'ابدأ طلبك' }, href: 'order.html' },
  secondary: { label: { en: 'Message on WhatsApp', ar: 'راسلني على واتساب' }, href: waLink('مرحباً ليلى، قرأت عن الاستوديو وأود الاستفسار.'), ext: true }
})}

` + footer() + cartDrawer() + toastRegion() + scripts();
}

/* ------------------------------------------------------ TESTIMONIALS */

export function testimonialsPage() {
  return head({
    page: 'testimonials.html',
    title: { en: 'Testimonials', ar: 'آراء العملاء' },
    description: {
      en: "Reviews from customers across Jordan — wedding invitations, Eid cards, graduation sets and corporate runs, with photos of the delivered cards.",
      ar: 'آراء عملاء من كل الأردن — دعوات أعراس وبطاقات عيد وأطقم تخرّج وطلبات شركات، مع صور للبطاقات المُسلَّمة.'
    },
    keywords: 'آراء العملاء, تقييمات, بطاقات تهنئة الأردن, customer reviews, card design testimonials Jordan',
    extraHead: breadcrumbJsonLd('testimonials.html', 'Testimonials')
  }) + header('testimonials.html') + pageBanner({
    crumb: { en: 'Testimonials', ar: 'آراء العملاء' },
    eyebrow: { en: 'Six hundred cards later', ar: 'بعد ستمئة بطاقة' },
    title: { en: 'What customers say', ar: 'ماذا يقول العملاء' },
    lede: { en: 'Reviews left by people who ordered cards for their own occasions, alongside photographs of what was delivered.', ar: 'آراء تركها أشخاص طلبوا بطاقات لمناسباتهم الخاصة، مع صور لما تم تسليمه.' }
  }) + `

<section class="section section--tight">
  <div class="container">
    <div class="grid quotes">
      ${testimonials.map((t, i) => quoteCard(t, i % 3)).join('')}
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="grid grid-4 center">
      ${[
        { v: '600+', en: 'Cards delivered', ar: 'بطاقة سُلّمت' },
        { v: '5.0', en: 'Average rating', ar: 'متوسط التقييم' },
        { v: '48h', en: 'First draft', ar: 'المسودة الأولى' },
        { v: '94%', en: 'Approved by draft two', ar: 'تُعتمد بحلول المسودة الثانية' }
      ].map((s, i) => `
      <div class="reveal" style="--reveal-delay:${i * 70}ms">
        <span class="stat__value num">${s.v}</span>
        ${bt('span', { en: s.en, ar: s.ar }, 'class="stat__label"')}
      </div>`).join('')}
    </div>
  </div>
</section>

${ctaBand({
  title: { en: 'Add your own occasion to the list', ar: 'أضف مناسبتك إلى القائمة' },
  body: { en: 'Start with the occasion and the rest of the order takes about three minutes.', ar: 'ابدأ بالمناسبة وبقية الطلب تستغرق نحو ثلاث دقائق.' },
  primary: { label: { en: 'Start your order', ar: 'ابدأ طلبك' }, href: 'order.html' },
  secondary: { label: { en: 'Browse the portfolio', ar: 'تصفّح الأعمال' }, href: 'portfolio.html' }
})}

` + footer() + cartDrawer() + toastRegion() + scripts();
}
