import { site, cards, occasions, plans, addons, faqs, ui } from './content.mjs';
import { icons, occasionIcon } from './icons.mjs';
import { e, a, bt, biAttr, biData, waLink, ornament, head, header, footer, cartDrawer, toastRegion, scripts, pageBanner, ctaBand, faqJsonLd, breadcrumbJsonLd } from './layout.mjs';

/* ----------------------------------------------------------- helpers */

const choice = ({ name, value, label, note, icon, checked = false, id }) => `
        <label class="choice">
          <input type="radio" name="${name}" value="${value}" id="${id}"${checked ? ' checked' : ''}${note && note.price !== undefined ? ` data-price="${note.price}"` : ''}
                 ${biAttr('data-label', label)}>
          <span class="choice__box">
            ${icon ? icon : ''}
            ${bt('span', label, 'class="choice__label"')}
            ${note && note.text ? bt('span', note.text, 'class="choice__note"') : ''}
          </span>
        </label>`;

const checkRow = ({ name, value, title, note, price, type = 'checkbox' }) => `
        <label class="check-row">
          <input type="${type}" name="${name}" value="${value}"${price !== undefined ? ` data-price="${price}"` : ''}
                 ${biAttr('data-label', title)}>
          <span class="check-row__text">
            ${bt('strong', title)}
            ${note ? bt('span', note) : ''}
          </span>
          ${price !== undefined ? `<span class="check-row__price"><span class="num">+${price}</span> ${bt('span', ui.currency)}</span>` : ''}
        </label>`;

/* ------------------------------------------------------- ORDER PAGE */

export function order() {
  const styleCards = cards;

  const stepLabels = [
    { en: 'Occasion', ar: 'المناسبة' },
    { en: 'Package', ar: 'الباقة' },
    { en: 'Style', ar: 'التصميم' },
    { en: 'Details', ar: 'التفاصيل' },
    { en: 'Quantity', ar: 'الكمية' },
    { en: 'Your details', ar: 'بياناتك' },
    { en: 'Review', ar: 'المراجعة' }
  ];

  return head({
    page: 'order.html',
    title: { en: 'Order your custom card', ar: 'اطلب بطاقتك المخصصة' },
    description: {
      en: 'A guided seven-step order form for custom Arabic greeting cards: choose the occasion, package, style, your text, quantity and add-ons, then confirm by WhatsApp or secure payment link.',
      ar: 'نموذج طلب مُرشد من سبع خطوات للبطاقات العربية المخصصة: اختر المناسبة والباقة والتصميم ونصّك والكمية والإضافات، ثم أكّد عبر واتساب أو رابط دفع آمن.'
    },
    keywords: 'طلب بطاقة مخصصة, تصميم بطاقة حسب الطلب, نموذج طلب, custom card order, order Arabic greeting card, bespoke card Jordan',
    extraHead: breadcrumbJsonLd('order.html', 'Custom order')
  }) + header('order.html') + pageBanner({
    crumb: { en: 'Custom order', ar: 'طلب مخصص' },
    eyebrow: { en: 'Seven short steps', ar: 'سبع خطوات قصيرة' },
    title: { en: 'Order your custom card', ar: 'اطلب بطاقتك المخصصة' },
    lede: { en: 'Roughly three minutes. Your answers are saved in this browser as you go, so you can leave and come back without losing anything.', ar: 'نحو ثلاث دقائق. تُحفظ إجاباتك في هذا المتصفح أثناء تقدّمك، فيمكنك المغادرة والعودة دون فقدان أي شيء.' }
  }) + `

<section class="section section--tight">
  <div class="container">
    <div class="order-layout">

      <div class="wizard" id="wizard">
        <!-- progress -->
        <div class="progress">
          <div class="progress__track"><div class="progress__bar" id="progressBar"></div></div>
          <ol class="progress__steps" id="progressSteps">
            ${stepLabels.map((s, i) => `<li${i === 0 ? ' class="is-current"' : ''} data-step="${i + 1}">
              <span class="dot">${i + 1}</span>${bt('span', s, 'class="text"')}
            </li>`).join('\n            ')}
          </ol>
        </div>

        <form id="orderForm" novalidate>

        <!-- 1 · Occasion -->
        <section class="step-panel is-active" data-panel="1" ${biAttr('aria-label', { en: 'Step 1: Occasion', ar: 'الخطوة ١: المناسبة' })}>
          <div class="step-panel__head">
            ${bt('h2', { en: 'What are we celebrating?', ar: 'بماذا نحتفل؟' })}
            ${bt('p', { en: 'This decides the motifs I start from — crescents, rings, laurels or something quieter.', ar: 'هذا يحدّد الزخارف التي أبدأ منها — أهلّة أو حلقات أو أكاليل أو شيء أهدأ.' })}
          </div>
          <fieldset style="border:0;padding:0;margin:0">
            ${bt('legend', { en: 'Choose an occasion', ar: 'اختر المناسبة' }, 'class="visually-hidden"')}
            <div class="choices">
              ${occasions.filter((o) => o.id !== 'all').map((o) => choice({
                name: 'occasion', value: o.id, id: `occ-${o.id}`, label: o, icon: occasionIcon[o.id] || icons.sparkle
              })).join('')}
              ${choice({ name: 'occasion', value: 'other', id: 'occ-other', label: { en: 'Something else', ar: 'مناسبة أخرى' }, icon: icons.sparkle })}
            </div>
          </fieldset>
          <p class="error-text" id="err-occasion" ${biData(ui.pickOne)}>${e(ui.pickOne.ar)}</p>

          <div class="field mt-md" id="occasionOtherWrap" hidden>
            ${bt('label', { en: 'Tell me the occasion', ar: 'أخبرني بالمناسبة' }, 'for="occasionOther"')}
            <input type="text" id="occasionOther" name="occasionOther"
                   ${biAttr('placeholder', { en: 'e.g. a retirement, a new home, an anniversary', ar: 'مثلاً: تقاعد، بيت جديد، ذكرى سنوية' })}>
          </div>
        </section>

        <!-- 2 · Package -->
        <section class="step-panel" data-panel="2" ${biAttr('aria-label', { en: 'Step 2: Package', ar: 'الخطوة ٢: الباقة' })}>
          <div class="step-panel__head">
            ${bt('h2', { en: 'Digital, printed, or both?', ar: 'رقمية أم مطبوعة أم الاثنتان؟' })}
            ${bt('p', { en: 'Digital cards arrive as files on WhatsApp. Printed cards are cut, foiled and delivered.', ar: 'البطاقات الرقمية تصل كملفات عبر واتساب. أما المطبوعة فتُقص وتُطبع ذهبياً وتُسلَّم.' })}
          </div>
          <fieldset style="border:0;padding:0;margin:0">
            ${bt('legend', { en: 'Choose a package', ar: 'اختر الباقة' }, 'class="visually-hidden"')}
            <div class="choices">
              ${plans.map((p) => choice({
                name: 'package', value: p.id, id: `pkg-${p.id}`,
                label: p.name,
                icon: p.id === 'digital' ? icons.monitor : p.id === 'printed' ? icons.print : icons.building,
                note: {
                  price: p.price,
                  text: p.price
                    ? { en: `from ${p.price} JOD · ${p.turnaround.en}`, ar: `من ${p.price} د.أ · ${p.turnaround.ar}` }
                    : { en: `custom quote · ${p.turnaround.en}`, ar: `عرض سعر · ${p.turnaround.ar}` }
                }
              })).join('')}
            </div>
          </fieldset>
          <p class="error-text" id="err-package" ${biData(ui.pickOne)}>${e(ui.pickOne.ar)}</p>

          <div class="card mt-md" id="corporateNote" hidden>
            ${bt('h3', { en: 'Bulk & corporate orders', ar: 'طلبات الجملة والشركات' })}
            ${bt('p', {
              en: 'For fifty cards and above I price the run individually — stock, finish, logo handling and delivery all affect it. Finish this form and you will receive a written quote within one working day, with no obligation.',
              ar: 'للطلبات من خمسين بطاقة فأكثر أسعّر كل مشروع على حدة — نوع الورق واللمسة النهائية والتعامل مع الشعار والتوصيل كلها تؤثر. أكمل هذا النموذج وسيصلك عرض سعر مكتوب خلال يوم عمل واحد دون أي التزام.'
            })}
          </div>
        </section>

        <!-- 3 · Style -->
        <section class="step-panel" data-panel="3" ${biAttr('aria-label', { en: 'Step 3: Style', ar: 'الخطوة ٣: التصميم' })}>
          <div class="step-panel__head">
            ${bt('h2', { en: 'Pick a starting design', ar: 'اختر تصميماً للانطلاق' })}
            ${bt('p', { en: 'Nothing here is fixed — colours, motifs and proportions all change to suit you. This just tells me where to begin.', ar: 'لا شيء هنا نهائي — الألوان والزخارف والنسب كلها تتغير لتناسبك. هذا فقط يخبرني من أين أبدأ.' })}
          </div>
          <fieldset style="border:0;padding:0;margin:0">
            ${bt('legend', { en: 'Choose a starting design', ar: 'اختر تصميم البداية' }, 'class="visually-hidden"')}
            <div class="choices swatches" id="styleChoices">
              ${styleCards.map((c) => `
              <label class="choice" data-occasion="${c.occasion}">
                <input type="radio" name="style" value="${c.id}" data-price="${c.price}"
                       ${biAttr('data-label', { en: c.en.title, ar: c.ar.title })}>
                <span class="choice__box swatch__box">
                  <img src="assets/img/cards/${c.id}.svg" width="500" height="700" loading="lazy" decoding="async"
                       ${biAttr('alt', { en: `${c.en.title} card design`, ar: `تصميم بطاقة ${c.ar.title}` })}>
                  ${bt('span', { en: c.en.title, ar: c.ar.title }, 'class="choice__label"')}
                </span>
              </label>`).join('')}
              <label class="choice">
                <input type="radio" name="style" value="from-scratch" data-price="0"
                       ${biAttr('data-label', { en: 'Design from scratch', ar: 'تصميم من الصفر' })}>
                <span class="choice__box">
                  ${icons.pen}
                  ${bt('span', { en: 'Design from scratch', ar: 'تصميم من الصفر' }, 'class="choice__label"')}
                  ${bt('span', { en: 'Describe it in the next step', ar: 'صِفه في الخطوة التالية' }, 'class="choice__note"')}
                </span>
              </label>
            </div>
          </fieldset>
          <p class="error-text" id="err-style" ${biData(ui.pickOne)}>${e(ui.pickOne.ar)}</p>
          <p class="text-mute mt-md" style="font-size:var(--step--1)" ${biData({
            en: 'Designs are filtered to your occasion where possible — choose “Design from scratch” if none of these fit.',
            ar: 'تُصفّى التصاميم حسب مناسبتك قدر الإمكان — اختر «تصميم من الصفر» إذا لم يناسبك أي منها.'
          })}>تُصفّى التصاميم حسب مناسبتك قدر الإمكان — اختر «تصميم من الصفر» إذا لم يناسبك أي منها.</p>
        </section>

        <!-- 4 · Details -->
        <section class="step-panel" data-panel="4" ${biAttr('aria-label', { en: 'Step 4: Card details', ar: 'الخطوة ٤: تفاصيل البطاقة' })}>
          <div class="step-panel__head">
            ${bt('h2', { en: 'What should the card say?', ar: 'ماذا تقول البطاقة؟' })}
            ${bt('p', { en: 'Write the text exactly as you want it printed, including spelling. I will set it, not rewrite it.', ar: 'اكتب النص تماماً كما تريده مطبوعاً، بما في ذلك الإملاء. سأقوم بتنسيقه لا بإعادة صياغته.' })}
          </div>

          <div class="field">
            ${bt('label', { en: 'Card language', ar: 'لغة البطاقة' }, 'id="cardLangLabel"')}
            <div class="choices" role="radiogroup" aria-labelledby="cardLangLabel">
              ${choice({ name: 'cardLang', value: 'ar', id: 'cl-ar', label: { en: 'Arabic only', ar: 'عربية فقط' }, checked: true })}
              ${choice({ name: 'cardLang', value: 'en', id: 'cl-en', label: { en: 'English only', ar: 'إنجليزية فقط' } })}
              ${choice({ name: 'cardLang', value: 'both', id: 'cl-both', label: { en: 'Both on one card', ar: 'الاثنتان على بطاقة واحدة' } })}
            </div>
          </div>

          <div class="field">
            ${bt('label', { en: 'Names to appear on the card', ar: 'الأسماء التي ستظهر على البطاقة' }, 'for="names"')}
            <input type="text" id="names" name="names" required
                   ${biAttr('placeholder', { en: 'e.g. Layla & Karim, or Omar Al-Haddad', ar: 'مثلاً: ليلى وكريم، أو عمر الحدّاد' })}>
            ${bt('span', { en: 'Write them exactly as they should be spelled — including any hamza or shadda.', ar: 'اكتبها تماماً كما ينبغي أن تُكتب — بما في ذلك الهمزة أو الشدّة.' }, 'class="hint"')}
            <span class="error-text" id="err-names" ${biData(ui.required)}>${e(ui.required.ar)}</span>
          </div>

          <div class="field">
            ${bt('label', { en: 'The message on the card', ar: 'الرسالة على البطاقة' }, 'for="message"')}
            <textarea id="message" name="message" required
                      ${biAttr('placeholder', { en: 'e.g. With our warmest wishes on your wedding day — from the Haddad family', ar: 'مثلاً: بأحرّ التهاني بمناسبة زفافكما — من عائلة الحدّاد' })}></textarea>
            ${bt('span', { en: 'Two or three lines works best on a card this size.', ar: 'سطران أو ثلاثة هي الأنسب لبطاقة بهذا المقاس.' }, 'class="hint"')}
            <span class="error-text" id="err-message" ${biData(ui.required)}>${e(ui.required.ar)}</span>
          </div>

          <div class="grid grid-2" style="gap:0 var(--space-sm)">
            <div class="field">
              ${bt('label', { en: 'Date of the occasion', ar: 'تاريخ المناسبة' }, 'for="eventDate"')}
              <input type="date" id="eventDate" name="eventDate">
              ${bt('span', { en: 'Optional — but it tells me how fast we need to move.', ar: 'اختياري — لكنه يخبرني بمدى السرعة المطلوبة.' }, 'class="hint"')}
            </div>
            <div class="field">
              ${bt('label', { en: 'Colours you have in mind', ar: 'الألوان التي تفكر بها' }, 'for="colours"')}
              <input type="text" id="colours" name="colours"
                     ${biAttr('placeholder', { en: 'e.g. emerald and gold, or blush tones', ar: 'مثلاً: زمردي وذهبي، أو درجات وردية' })}>
              ${bt('span', { en: 'Optional. Leave blank and I will match the design you chose.', ar: 'اختياري. اتركه فارغاً وسأعتمد ألوان التصميم الذي اخترته.' }, 'class="hint"')}
            </div>
          </div>

          <div class="field">
            ${bt('label', { en: 'Anything else I should know', ar: 'أي شيء آخر ينبغي أن أعرفه' }, 'for="notes"')}
            <textarea id="notes" name="notes"
                      ${biAttr('placeholder', { en: 'Fonts you like, things to avoid, how the card will be given…', ar: 'خطوط تفضّلها، أشياء تتجنّبها، كيف ستُقدَّم البطاقة…' })}></textarea>
          </div>
        </section>

        <!-- 5 · Quantity & add-ons -->
        <section class="step-panel" data-panel="5" ${biAttr('aria-label', { en: 'Step 5: Quantity and add-ons', ar: 'الخطوة ٥: الكمية والإضافات' })}>
          <div class="step-panel__head">
            ${bt('h2', { en: 'How many, and any extras?', ar: 'كم العدد، وهل من إضافات؟' })}
            ${bt('p', { en: 'Digital orders are priced per design. Printed orders are priced per card, with the package minimum applied.', ar: 'الطلبات الرقمية تُسعَّر لكل تصميم. أما المطبوعة فتُسعَّر لكل بطاقة مع تطبيق الحد الأدنى للباقة.' })}
          </div>

          <div class="field">
            ${bt('label', { en: 'Number of cards', ar: 'عدد البطاقات' }, 'for="quantity"')}
            <div class="stepper">
              <button type="button" id="qtyMinus" ${biAttr('aria-label', ui.decrease)}>−</button>
              <input type="number" id="quantity" name="quantity" value="1" min="1" max="5000" step="1"
                     ${biAttr('aria-label', { en: 'Number of cards', ar: 'عدد البطاقات' })}>
              <button type="button" id="qtyPlus" ${biAttr('aria-label', ui.increase)}>+</button>
            </div>
            ${bt('span', { en: 'Printed orders start at 25 cards; corporate pricing begins at 50.', ar: 'الطلبات المطبوعة تبدأ من ٢٥ بطاقة؛ وأسعار الشركات تبدأ من ٥٠.' }, 'class="hint" id="qtyHint"')}
          </div>

          <div class="field">
            ${bt('label', { en: 'Finishing touches', ar: 'لمسات إضافية' })}
            <div id="addonList">
              ${addons.map((x) => checkRow({
                name: 'addons', value: x.id, price: x.price,
                title: { en: x.en.name, ar: x.ar.name },
                note: addonNote(x.id)
              })).join('')}
            </div>
          </div>
        </section>

        <!-- 6 · Your details -->
        <section class="step-panel" data-panel="6" ${biAttr('aria-label', { en: 'Step 6: Your details', ar: 'الخطوة ٦: بياناتك' })}>
          <div class="step-panel__head">
            ${bt('h2', { en: 'How do I reach you?', ar: 'كيف أصل إليك؟' })}
            ${bt('p', { en: 'Drafts and proofs are sent on WhatsApp by default. Your details are used for this order only.', ar: 'تُرسل المسودات والنماذج عبر واتساب افتراضياً. تُستخدم بياناتك لهذه الطلبية فقط.' })}
          </div>

          <div class="grid grid-2" style="gap:0 var(--space-sm)">
            <div class="field">
              ${bt('label', { en: 'Your name', ar: 'اسمك' }, 'for="customerName"')}
              <input type="text" id="customerName" name="customerName" required autocomplete="name"
                     ${biAttr('placeholder', { en: 'First and last name', ar: 'الاسم الأول واسم العائلة' })}>
              <span class="error-text" id="err-customerName" ${biData(ui.required)}>${e(ui.required.ar)}</span>
            </div>
            <div class="field">
              ${bt('label', { en: 'WhatsApp number', ar: 'رقم واتساب' }, 'for="customerPhone"')}
              <input type="tel" id="customerPhone" name="customerPhone" required autocomplete="tel" inputmode="tel"
                     placeholder="07 9811 4089" dir="ltr">
              <span class="error-text" id="err-customerPhone" ${biData(ui.invalidPhone)}>${e(ui.invalidPhone.ar)}</span>
            </div>
          </div>

          <div class="field">
            ${bt('label', { en: 'Email address', ar: 'البريد الإلكتروني' }, 'for="customerEmail"')}
            <input type="email" id="customerEmail" name="customerEmail" autocomplete="email" dir="ltr"
                   ${biAttr('placeholder', { en: 'Optional — for invoices and receipts', ar: 'اختياري — للفواتير والإيصالات' })}>
            <span class="error-text" id="err-customerEmail" ${biData(ui.invalidEmail)}>${e(ui.invalidEmail.ar)}</span>
          </div>

          <div class="field">
            ${bt('label', { en: 'Reference images', ar: 'صور مرجعية' })}
            ${bt('span', { en: 'Anything that helps — a colour you like, a photo of the venue, handwriting you want matched. Up to 8 MB each.', ar: 'أي شيء يساعد — لون يعجبك، صورة للمكان، خط يد تريد مطابقته. حتى ٨ ميغابايت للملف.' }, 'class="hint"')}
            <label class="dropzone" id="dropzone" for="refFiles">
              ${icons.upload}
              ${bt('strong', { en: 'Choose files or drop them here', ar: 'اختر ملفات أو أفلتها هنا' })}
              ${bt('small', { en: 'JPG, PNG or PDF — optional', ar: 'JPG أو PNG أو PDF — اختياري' })}
              <input type="file" id="refFiles" name="refFiles" multiple accept="image/*,.pdf" class="visually-hidden">
            </label>
            <ul class="file-list" id="fileList"></ul>
          </div>

          <div class="field">
            ${bt('label', { en: 'Delivery', ar: 'التسليم' }, 'id="deliveryLabel"')}
            <div class="choices" role="radiogroup" aria-labelledby="deliveryLabel">
              ${choice({ name: 'delivery', value: 'whatsapp', id: 'dl-wa', checked: true, icon: icons.whatsapp, label: { en: 'Send on WhatsApp', ar: 'الإرسال عبر واتساب' }, note: { text: { en: 'Digital files', ar: 'ملفات رقمية' } } })}
              ${choice({ name: 'delivery', value: 'amman', id: 'dl-amman', icon: icons.truck, label: { en: 'Delivery in Amman', ar: 'توصيل داخل عمّان' }, note: { text: { en: '3 JOD', ar: '٣ د.أ' } } })}
              ${choice({ name: 'delivery', value: 'shipping', id: 'dl-ship', icon: icons.pin, label: { en: 'Ship to a governorate', ar: 'شحن إلى محافظة' }, note: { text: { en: 'Quoted by courier', ar: 'حسب سعر الشحن' } } })}
              ${choice({ name: 'delivery', value: 'pickup', id: 'dl-pickup', icon: icons.gift, label: { en: 'Collect from the studio', ar: 'الاستلام من الاستوديو' }, note: { text: { en: 'Free', ar: 'مجاناً' } } })}
            </div>
          </div>

          <div class="field" id="addressWrap" hidden>
            ${bt('label', { en: 'Delivery address', ar: 'عنوان التسليم' }, 'for="address"')}
            <textarea id="address" name="address"
                      ${biAttr('placeholder', { en: 'Area, street, building, and any landmark that helps', ar: 'المنطقة، الشارع، المبنى، وأي معلَم يساعد' })}></textarea>
            <span class="error-text" id="err-address" ${biData(ui.required)}>${e(ui.required.ar)}</span>
          </div>
        </section>

        <!-- 7 · Review -->
        <section class="step-panel" data-panel="7" ${biAttr('aria-label', { en: 'Step 7: Review and confirm', ar: 'الخطوة ٧: المراجعة والتأكيد' })}>
          <div class="step-panel__head">
            ${bt('h2', { en: 'Check everything over', ar: 'راجع كل شيء' })}
            ${bt('p', { en: 'Nothing is charged at this step. You confirm the details, then I send a written confirmation and the payment link or details.', ar: 'لا يُخصم أي مبلغ في هذه الخطوة. أنت تؤكّد التفاصيل، ثم أرسل تأكيداً مكتوباً ورابط الدفع أو تفاصيله.' })}
          </div>

          <div class="review-groups" id="reviewGroups"></div>

          <div class="field mt-md">
            ${bt('label', { en: 'How would you like to pay?', ar: 'كيف تفضّل الدفع؟' }, 'id="payLabel"')}
            <div class="pay-methods" role="radiogroup" aria-labelledby="payLabel">
              ${payMethod('link', icons.card, { en: 'Secure payment link', ar: 'رابط دفع آمن' }, { en: 'A Stripe or PayPal link is sent to you once the design is approved. Card details never pass through this site.', ar: 'يُرسل إليك رابط Stripe أو PayPal بعد اعتماد التصميم. لا تمرّ بيانات بطاقتك عبر هذا الموقع إطلاقاً.' }, true)}
              ${payMethod('cliq', icons.bank, { en: 'Bank transfer or CliQ', ar: 'تحويل بنكي أو كليك' }, { en: 'Account details are sent with the confirmation message.', ar: 'تُرسل تفاصيل الحساب مع رسالة التأكيد.' })}
              ${payMethod('cod', icons.cash, { en: 'Cash on delivery', ar: 'نقداً عند الاستلام' }, { en: 'Available inside Amman for printed orders.', ar: 'متاح داخل عمّان للطلبات المطبوعة.' })}
            </div>
          </div>

          <label class="check-row">
            <input type="checkbox" id="agree" name="agree" required>
            <span class="check-row__text">
              ${bt('strong', { en: 'I understand nothing is printed before I approve a proof', ar: 'أفهم أنه لن تُطبع أي بطاقة قبل موافقتي على النموذج' })}
              ${bt('span', { en: 'Printed orders are split 50% to begin and 50% on delivery. Cancel free of charge any time before approval.', ar: 'الطلبات المطبوعة تُقسّم ٥٠٪ عند البدء و٥٠٪ عند التسليم. يمكن الإلغاء مجاناً في أي وقت قبل الموافقة.' })}
            </span>
          </label>
          <p class="error-text" id="err-agree" ${biData(ui.required)}>${e(ui.required.ar)}</p>
        </section>

        <!-- nav -->
        <div class="wizard__nav" id="wizardNav">
          ${bt('button', { en: 'Back', ar: 'رجوع' }, 'type="button" class="btn btn--ghost" id="wizardBack" hidden')}
          ${bt('button', { en: 'Continue', ar: 'التالي' }, 'type="button" class="btn btn--bloom" id="wizardNext"')}
          ${bt('button', { en: 'Confirm order', ar: 'تأكيد الطلب' }, 'type="submit" class="btn btn--bloom" id="wizardSubmit" hidden')}
        </div>
        </form>

        <!-- success -->
        <div class="order-success" id="orderSuccess">
          <div class="center">
            <span class="success-mark">${icons.checkCircle}</span>
            ${bt('h2', { en: 'Your order summary is ready', ar: 'ملخّص طلبك جاهز' })}
            ${bt('p', { en: 'Send it to the studio with the button below and you will have a written confirmation, a price and a delivery date the same working day.', ar: 'أرسله إلى الاستوديو بالزر أدناه وستحصل على تأكيد مكتوب وسعر وموعد تسليم في يوم العمل نفسه.' }, 'class="lede"')}
            ${bt('p', { en: 'Your reference number', ar: 'رقمك المرجعي' }, 'class="text-mute" style="margin-block-start:var(--space-md);margin-block-end:0"')}
            <span class="order-ref" id="orderRef">—</span>
            <div class="lightbox__actions" style="justify-content:center">
              <a class="btn btn--bloom btn--lg" id="sendWhatsApp" target="_blank" rel="noopener"
                 href="${waLink('مرحباً ليلى، أود طلب بطاقة.')}">
                ${icons.whatsapp}${bt('span', { en: 'Send order on WhatsApp', ar: 'أرسل الطلب عبر واتساب' })}
              </a>
              ${bt('a', { en: 'Send by email instead', ar: 'أرسله بالبريد الإلكتروني' }, `class="btn btn--ghost btn--lg" id="sendEmail" href="mailto:${site.email}"`)}
            </div>
            ${bt('button', { en: 'Copy the summary', ar: 'انسخ الملخّص' }, 'type="button" class="btn btn--ghost btn--sm mt-md" id="copySummary"')}
            ${bt('p', {
              en: 'Keep this reference — quote it in any message and I will find your order straight away.',
              ar: 'احتفظ بهذا الرقم المرجعي — اذكره في أي رسالة وسأجد طلبك فوراً.'
            }, 'class="text-mute mt-md" style="font-size:var(--step--1)"')}
          </div>
        </div>
      </div>

      <!-- live summary -->
      <aside class="summary" id="orderSummary" ${biAttr('aria-label', { en: 'Order summary', ar: 'ملخّص الطلب' })}>
        ${bt('h3', { en: 'Your order', ar: 'طلبك' })}
        <ul class="summary__lines" id="summaryLines"></ul>
        <div class="summary__total">
          ${bt('span', ui.estimatedTotal)}
          <span class="amount"><span id="summaryTotal" class="num">0</span> ${bt('span', ui.currency)}</span>
        </div>
        ${bt('p', {
          en: 'An estimate, not an invoice. Printing, paper stock and shipping are confirmed in writing before anything is charged.',
          ar: 'هذا تقدير وليس فاتورة. تُؤكَّد تكاليف الطباعة ونوع الورق والشحن كتابةً قبل خصم أي مبلغ.'
        }, 'class="summary__note"')}
      </aside>

    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container container--narrow">
    <div class="section-head center">
      ${ornament()}
      ${bt('h2', { en: 'Questions before you order', ar: 'أسئلة قبل الطلب' })}
    </div>
    <div class="faq">
      ${[faqs[0], faqs[1], faqs[5], faqs[7]].map((f) => `
      <details>
        ${bt('summary', { en: f.en.q, ar: f.ar.q })}
        <div class="faq__answer">${bt('p', { en: f.en.a, ar: f.ar.a })}</div>
      </details>`).join('')}
    </div>
  </div>
</section>

` + footer() + cartDrawer() + toastRegion() + scripts(['order.js']);
}

function payMethod(value, icon, title, note, checked = false) {
  return `
        <label class="check-row">
          <input type="radio" name="payment" value="${value}"${checked ? ' checked' : ''}
                 ${biAttr('data-label', title)}>
          <span class="channel__icon" style="inline-size:34px;block-size:34px;border-radius:9px">${icon}</span>
          <span class="check-row__text">
            ${bt('strong', title)}
            ${bt('span', note)}
          </span>
        </label>`;
}

function addonNote(id) {
  const map = {
    rush: { en: 'Draft within 24 hours instead of 48. Subject to availability.', ar: 'المسودة خلال ٢٤ ساعة بدل ٤٨. حسب توفّر الموعد.' },
    calligraphy: { en: 'Per order, for up to 25 names. Larger sets are quoted.', ar: 'لكل طلبية حتى ٢٥ اسماً. الكميات الأكبر بعرض سعر.' },
    envelope: { en: 'Envelopes lined with the same girih pattern as the card.', ar: 'مغلّفات مبطّنة بنفس الزخرفة الهندسية للبطاقة.' },
    wax: { en: 'A custom brass seal, yours to keep after the order.', ar: 'ختم نحاسي مخصص يبقى لك بعد انتهاء الطلبية.' },
    'extra-revision': { en: 'Beyond the two rounds already included.', ar: 'إضافة إلى الجولتين المشمولتين أصلاً.' },
    delivery: { en: 'Usually same-day once the cards are ready.', ar: 'عادةً في اليوم نفسه فور جهوزية البطاقات.' }
  };
  return map[id];
}

/* ----------------------------------------------------- CONTACT PAGE */

export function contact() {
  const waHref = waLink('مرحباً ليلى، أود الاستفسار عن تصميم بطاقة.');
  const channel = (cls, icon, label, value, href, ext = true) => `
        <a class="channel ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>
          <span class="channel__icon">${icon}</span>
          <span class="channel__text">
            ${bt('span', label, 'class="channel__label"')}
            <span class="channel__value">${value}</span>
          </span>
          <span class="channel__arrow" aria-hidden="true">${icons.arrow}</span>
        </a>`;

  return head({
    page: 'contact.html',
    title: { en: 'Contact & FAQ', ar: 'تواصل والأسئلة الشائعة' },
    description: {
      en: "Reach Lily's Designs on WhatsApp at +962 79 811 4089 or Instagram @lilys.designs1, and read answers on turnaround, revisions, delivery across Jordan and payment.",
      ar: 'تواصل مع ليليز ديزاينز عبر واتساب على ٠٧٩٨١١٤٠٨٩ أو إنستغرام @lilys.designs1، واقرأ إجابات عن مواعيد التسليم والتعديلات والتوصيل داخل الأردن والدفع.'
    },
    keywords: 'تواصل, واتساب, أسئلة شائعة, توصيل, تعديلات, contact card designer Jordan, WhatsApp order cards, FAQ delivery revisions',
    extraHead: faqJsonLd(faqs) + breadcrumbJsonLd('contact.html', 'Contact & FAQ')
  }) + header('contact.html') + pageBanner({
    crumb: { en: 'Contact', ar: 'تواصل' },
    eyebrow: { en: 'We reply the same day', ar: 'نردّ في اليوم نفسه' },
    title: { en: 'Get in touch', ar: 'تواصل معنا' },
    lede: { en: 'WhatsApp is fastest — usually within a couple of hours during studio hours. Everything else reaches the same inbox.', ar: 'واتساب هو الأسرع — عادةً خلال ساعتين ضمن ساعات العمل. وكل الوسائل الأخرى تصل إلى البريد نفسه.' }
  }) + `

<section class="section section--tight">
  <div class="container">
    <div class="contact-layout">

      <div class="contact-card reveal">
        ${bt('h2', { en: 'Send a message', ar: 'أرسل رسالة' })}
        ${bt('p', { en: 'For a full order, the order form collects everything in one go. This form is for questions.', ar: 'للطلبات الكاملة، يجمع نموذج الطلب كل شيء دفعة واحدة. هذا النموذج للأسئلة.' }, 'class="text-mute"')}

        <form id="contactForm" class="mt-md" novalidate>
          <div class="grid grid-2" style="gap:0 var(--space-sm)">
            <div class="field">
              ${bt('label', { en: 'Your name', ar: 'اسمك' }, 'for="cName"')}
              <input type="text" id="cName" name="cName" required autocomplete="name">
              <span class="error-text" id="err-cName" ${biData(ui.required)}>${e(ui.required.ar)}</span>
            </div>
            <div class="field">
              ${bt('label', { en: 'WhatsApp number', ar: 'رقم واتساب' }, 'for="cPhone"')}
              <input type="tel" id="cPhone" name="cPhone" required autocomplete="tel" inputmode="tel" placeholder="07 9811 4089" dir="ltr">
              <span class="error-text" id="err-cPhone" ${biData(ui.invalidPhone)}>${e(ui.invalidPhone.ar)}</span>
            </div>
          </div>

          <div class="field">
            ${bt('label', { en: 'What is it about?', ar: 'ما موضوع رسالتك؟' }, 'for="cTopic"')}
            <select id="cTopic" name="cTopic">
              ${[
                { v: 'general', en: 'A general question', ar: 'سؤال عام' },
                { v: 'custom', en: 'A custom design', ar: 'تصميم مخصص' },
                { v: 'bulk', en: 'A bulk or corporate order', ar: 'طلب جملة أو شركات' },
                { v: 'existing', en: 'An order I already placed', ar: 'طلبية سبق أن قدّمتها' },
                { v: 'other', en: 'Something else', ar: 'شيء آخر' }
              ].map((o) => bt('option', { en: o.en, ar: o.ar }, `value="${o.v}"`)).join('\n              ')}
            </select>
          </div>

          <div class="field">
            ${bt('label', { en: 'Your message', ar: 'رسالتك' }, 'for="cMessage"')}
            <textarea id="cMessage" name="cMessage" required
                      ${biAttr('placeholder', { en: 'Tell me the occasion, the date and roughly how many cards you need.', ar: 'أخبرني بالمناسبة والتاريخ وعدد البطاقات تقريباً.' })}></textarea>
            <span class="error-text" id="err-cMessage" ${biData(ui.required)}>${e(ui.required.ar)}</span>
          </div>

          ${bt('button', { en: 'Send on WhatsApp', ar: 'أرسل عبر واتساب' }, 'type="submit" class="btn btn--bloom btn--block"')}
          ${bt('p', {
            en: 'The message opens in WhatsApp with everything filled in — you press send. Nothing is stored on this site.',
            ar: 'تُفتح الرسالة في واتساب وكل شيء مكتوب فيها — ما عليك سوى الضغط على إرسال. ولا يُخزَّن أي شيء على هذا الموقع.'
          }, 'class="text-mute mt-md" style="font-size:.78rem"')}
        </form>
      </div>

      <div class="stack reveal" style="--reveal-delay:100ms">
        <div class="channels">
          ${channel('channel--whatsapp', icons.whatsapp, { en: 'WhatsApp — fastest', ar: 'واتساب — الأسرع' }, `<span class="num">${site.phoneIntl}</span>`, waHref)}
          ${channel('channel--instagram', icons.instagram, { en: 'Instagram', ar: 'إنستغرام' }, `@${site.instagram}`, site.instagramUrl)}
          ${channel('', icons.phone, { en: 'Call the studio', ar: 'اتصل بالاستوديو' }, `<span class="num">${site.phoneLocal}</span>`, `tel:+${site.phoneE164}`, false)}
          ${channel('', icons.mail, { en: 'Email', ar: 'البريد الإلكتروني' }, site.email, `mailto:${site.email}`, false)}
        </div>

        <div class="card mt-md">
          <span class="card__icon">${icons.clock}</span>
          ${bt('h3', { en: 'Studio hours', ar: 'ساعات العمل' })}
          ${bt('p', site.hours)}
          ${bt('p', { en: 'Messages sent outside these hours are answered first thing the next working day.', ar: 'الرسائل خارج هذه الساعات يُرد عليها أول يوم العمل التالي.' })}
          <p class="mt-md" style="margin-block-end:0">
            <span class="card__icon" style="display:inline-grid;vertical-align:middle;margin:0 0 0 .5rem;inline-size:34px;block-size:34px">${icons.pin}</span>
            ${bt('span', site.city, 'style="font-weight:700;color:var(--leaf-deep)"')}
          </p>
          ${bt('p', { en: 'Collection by appointment. Delivery across Amman and shipping to every governorate.', ar: 'الاستلام بموعد مسبق. توصيل داخل عمّان وشحن لكل المحافظات.' }, 'class="text-mute" style="font-size:var(--step--1)"')}
        </div>
      </div>

    </div>
  </div>
</section>

<section class="section section--cream" id="faq">
  <div class="container container--narrow">
    <div class="section-head center">
      ${ornament()}
      ${bt('p', { en: 'Answers', ar: 'إجابات' }, 'class="eyebrow center-line" style="justify-content:center"')}
      ${bt('h2', { en: 'Frequently asked questions', ar: 'الأسئلة الشائعة' })}
      ${bt('p', { en: 'Turnaround, revisions, delivery and payment — the eight things people ask most.', ar: 'مواعيد التسليم والتعديلات والتوصيل والدفع — أكثر ثمانية أسئلة يطرحها الناس.' }, 'class="lede"')}
    </div>
    <div class="faq">
      ${faqs.map((f) => `
      <details>
        ${bt('summary', { en: f.en.q, ar: f.ar.q })}
        <div class="faq__answer">${bt('p', { en: f.en.a, ar: f.ar.a })}</div>
      </details>`).join('')}
    </div>
  </div>
</section>

${ctaBand({
  title: { en: 'Still deciding? Send a photo', ar: 'ما زلت متردداً؟ أرسل صورة' },
  body: { en: 'Send a picture of anything you like — a colour, a pattern, an invitation you saw — and I will tell you what is possible before you commit to anything.', ar: 'أرسل صورة لأي شيء يعجبك — لون أو زخرفة أو دعوة رأيتها — وسأخبرك بما يمكن تنفيذه قبل أن تلتزم بأي شيء.' },
  primary: { label: { en: 'Message on WhatsApp', ar: 'راسلنا على واتساب' }, href: waHref, ext: true },
  secondary: { label: { en: 'Start an order', ar: 'ابدأ طلباً' }, href: 'order.html' }
})}

` + footer() + cartDrawer() + toastRegion() + scripts(['contact.js']);
}
