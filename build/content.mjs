/**
 * Every string on the site lives here in both languages.
 * `t(key)` style objects are `{ en, ar }` pairs; the generator emits both
 * into the markup so a language switch never needs a network round-trip.
 */

export const site = {
  name:      { en: "Lily's Designs", ar: 'ليليز ديزاينز' },
  tagline:   { en: 'Bespoke card studio', ar: 'استوديو بطاقات مُصمّمة' },
  phoneLocal: '0798114089',
  phoneIntl:  '+962 79 811 4089',
  phoneE164:  '962798114089',
  instagram:  'lilys.designs1',
  instagramUrl: 'https://www.instagram.com/lilys.designs1/',
  email: 'hello@lilysdesigns.co',
  city: { en: 'Amman, Jordan', ar: 'عمّان، الأردن' },
  hours: { en: 'Sun – Thu · 10:00 – 19:00', ar: 'الأحد – الخميس · ١٠:٠٠ – ١٩:٠٠' },
  currency: { en: 'JOD', ar: 'د.أ' },
  url: 'https://mohsaleh6.github.io/lily-s-designs'
};

export const nav = [
  { href: 'index.html',        en: 'Home',         ar: 'الرئيسية' },
  { href: 'portfolio.html',    en: 'Portfolio',    ar: 'أعمالنا' },
  { href: 'services.html',     en: 'Services',     ar: 'الخدمات والأسعار' },
  { href: 'about.html',        en: 'About',        ar: 'عن الاستوديو' },
  { href: 'testimonials.html', en: 'Testimonials', ar: 'آراء العملاء' },
  { href: 'contact.html',      en: 'Contact & FAQ', ar: 'تواصل والأسئلة' }
];

/* ------------------------------------------------------------- occasions */

export const occasions = [
  { id: 'all',         en: 'All designs',  ar: 'كل التصاميم' },
  { id: 'wedding',     en: 'Weddings',     ar: 'أعراس' },
  { id: 'eid',         en: 'Eid & Ramadan', ar: 'العيد ورمضان' },
  { id: 'birthday',    en: 'Birthdays',    ar: 'أعياد ميلاد' },
  { id: 'graduation',  en: 'Graduations',  ar: 'تخرّج' },
  { id: 'corporate',   en: 'Corporate',    ar: 'شركات' },
  { id: 'newborn',     en: 'New baby',     ar: 'مولود جديد' },
  { id: 'thanks',      en: 'Thank you',    ar: 'شكر وتقدير' }
];

/* ------------------------------------------------------------ instagram

   The studio feed. To publish a real post or reel:
     1. save the image to assets/img/instagram/<name>.jpg
     2. add a row below with `image` pointing at it and `url` set to the
        post's permalink
     3. run `node build/build.mjs`
   Rows with `type: 'reel'` get the play badge. Until a row carries a real
   permalink it links to the profile, so nothing here can 404. */

export const instagramPosts = [
  { id: 'hilal-eid', type: 'post', image: 'assets/img/square/hilal-eid.svg', url: '',
    en: { caption: 'Hilal — this season\u2019s Eid card, gilded and ready to print.' },
    ar: { caption: '\u0647\u0644\u0627\u0644 \u2014 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0639\u064a\u062f \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0633\u0645\u060c \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629.' } },
  { id: 'ward-blush', type: 'post', image: 'assets/img/square/ward-blush.svg', url: '',
    en: { caption: 'Ward — a blush botanical suite for an engagement in Amman.' },
    ar: { caption: '\u0648\u0631\u062f \u2014 \u0637\u0642\u0645 \u0646\u0628\u0627\u062a\u064a \u0648\u0631\u062f\u064a \u0644\u062e\u0637\u0648\u0628\u0629 \u0641\u064a \u0639\u0645\u0651\u0627\u0646.' } },
  { id: 'mabrouk-grad', type: 'reel', image: 'assets/img/square/mabrouk-grad.svg', url: '',
    en: { caption: 'Watch a graduation set come together, from pencil to foil.' },
    ar: { caption: '\u0634\u0627\u0647\u062f \u0637\u0642\u0645 \u0627\u0644\u062a\u062e\u0631\u0651\u062c \u064a\u062a\u0643\u0648\u0651\u0646\u060c \u0645\u0646 \u0627\u0644\u0642\u0644\u0645 \u0625\u0644\u0649 \u0627\u0644\u0637\u0628\u0627\u0639\u0629.' } },
  { id: 'sana-helwa', type: 'post', image: 'assets/img/square/sana-helwa.svg', url: '',
    en: { caption: 'Sana Helwa — petals scattered around an open rose.' },
    ar: { caption: '\u0633\u0646\u0629 \u062d\u0644\u0648\u0629 \u2014 \u0628\u062a\u0644\u0627\u062a \u0645\u062a\u0646\u0627\u062b\u0631\u0629 \u062d\u0648\u0644 \u0648\u0631\u062f\u0629 \u0645\u0641\u062a\u0648\u062d\u0629.' } },
  { id: 'mawlood-mint', type: 'reel', image: 'assets/img/square/mawlood-mint.svg', url: '',
    en: { caption: 'Unboxing a new-baby announcement set, mint on ivory.' },
    ar: { caption: '\u0641\u062a\u062d \u0637\u0642\u0645 \u0625\u0639\u0644\u0627\u0646 \u0645\u0648\u0644\u0648\u062f \u062c\u062f\u064a\u062f\u060c \u0646\u0639\u0646\u0627\u0639\u064a \u0639\u0644\u0649 \u0639\u0627\u062c\u064a.' } },
  { id: 'corporate-navy', type: 'post', image: 'assets/img/square/corporate-navy.svg', url: '',
    en: { caption: 'Fifty corporate Ramadan greetings, packed and out the door.' },
    ar: { caption: '\u062e\u0645\u0633\u0648\u0646 \u0628\u0637\u0627\u0642\u0629 \u062a\u0647\u0646\u0626\u0629 \u0631\u0645\u0636\u0627\u0646\u064a\u0629 \u0644\u0644\u0634\u0631\u0643\u0627\u062a\u060c \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u062a\u0633\u0644\u064a\u0645.' } }
];

/* ---------------------------------------------------------------- cards */

export const cards = [
  { id: 'noor-al-zafaf', occasion: 'wedding', palette: 'ivoryLeaf', motif: 'rings', price: 12,
    en: { title: 'Noor Al Zafaf', desc: 'Two interlaced rings held inside an eight-point rosette, pressed in warm gold on heavy ivory stock. Names and date are hand-set in the arch above the seal.' },
    ar: { title: 'نور الزفاف', desc: 'حلقتان متشابكتان داخل نجمة ثمانية، مطبوعتان بلون ذهبي دافئ على ورق عاجي فاخر. تُكتب الأسماء والتاريخ يدوياً في القوس أعلى الختم.' },
    tags: { en: ['Gold foil', 'Ivory stock', 'Bilingual'], ar: ['طباعة ذهبية', 'ورق عاجي', 'ثنائي اللغة'] } },

  { id: 'qamar-wedding', occasion: 'wedding', palette: 'leafDeep', motif: 'bands', price: 15,
    en: { title: 'Qamar Invitation Suite', desc: 'A deep emerald invitation banded with arabesque rules. Supplied as a suite: main invitation, RSVP slip and a matching envelope liner.' },
    ar: { title: 'طقم دعوة قمر', desc: 'دعوة بلون أخضر زمردي عميق مزيّنة بأشرطة أرابيسك. تُسلّم كطقم كامل: الدعوة الأساسية، بطاقة التأكيد، وبطانة مغلّف متناسقة.' },
    tags: { en: ['Suite of 3', 'Emerald', 'Foil rules'], ar: ['طقم من ٣', 'زمردي', 'خطوط ذهبية'] } },

  { id: 'ward-blush', occasion: 'wedding', palette: 'creamRose', motif: 'botanical', price: 11,
    en: { title: 'Ward — Blush Botanical', desc: 'A soft dusty-rose spray of gilded sprigs, drawn to sit behind Arabic calligraphy without competing with it. Popular for engagements and katb ktab.' },
    ar: { title: 'ورد — وردي ناعم', desc: 'باقة من الأغصان المذهّبة بلون وردي هادئ، مرسومة لتكون خلفية للخط العربي دون أن تزاحمه. مفضّلة للخطوبة وكتب الكتاب.' },
    tags: { en: ['Dusty rose', 'Botanical', 'Engagement'], ar: ['وردي باهت', 'نباتي', 'خطوبة'] } },

  { id: 'hilal-eid', occasion: 'eid', palette: 'leafDeep', motif: 'eid', price: 8,
    en: { title: 'Hilal — Eid Greeting', desc: 'The crescent rising between two hanging lanterns over a field of small stars. Our most-ordered Eid card, sold digitally and in print.' },
    ar: { title: 'هلال — بطاقة عيد', desc: 'الهلال يرتفع بين فانوسين معلّقين فوق سماء من النجوم الصغيرة. أكثر بطاقات العيد طلباً لدينا، متوفرة رقمياً ومطبوعة.' },
    tags: { en: ['Best seller', 'Eid', 'Digital + print'], ar: ['الأكثر طلباً', 'عيد', 'رقمي ومطبوع'] } },

  { id: 'fanoos', occasion: 'eid', palette: 'periDeep', motif: 'arch', price: 9,
    en: { title: 'Fanoos — Ramadan Arch', desc: 'A mihrab arch in midnight navy, flanked by two gilded lanterns. Designed for the first night of Ramadan and for corporate Ramadan greetings.' },
    ar: { title: 'فانوس — قوس رمضان', desc: 'قوس محراب بلون كحلي داكن يحيط به فانوسان مذهّبان. صُمّم لليلة الأولى من رمضان ولتهاني الشركات الرمضانية.' },
    tags: { en: ['Ramadan', 'Navy & gold', 'Arch motif'], ar: ['رمضان', 'كحلي وذهبي', 'زخرفة القوس'] } },

  { id: 'eid-mubarak-sand', occasion: 'eid', palette: 'creamLeaf', motif: 'eid', price: 8,
    en: { title: 'Eid Mubarak — Sand', desc: 'A lighter take on the Eid card in sand and antique gold, printed on textured cotton stock that takes a handwritten name beautifully.' },
    ar: { title: 'عيد مبارك — رملي', desc: 'نسخة أفتح من بطاقة العيد بلون رملي وذهبي عتيق، مطبوعة على ورق قطني مُحبّب يستقبل الكتابة اليدوية بشكل جميل.' },
    tags: { en: ['Cotton stock', 'Handwriting-ready'], ar: ['ورق قطني', 'مناسب للكتابة'] } },

  { id: 'sana-helwa', occasion: 'birthday', palette: 'creamRose', motif: 'confetti', price: 7,
    en: { title: 'Sana Helwa', desc: 'Gilded confetti scattered around a solid gold rosette. Cheerful without being loud — the version most people send to mothers and sisters.' },
    ar: { title: 'سنة حلوة', desc: 'قصاصات مذهّبة متناثرة حول نجمة ذهبية صلبة. مبهجة دون صخب — النسخة التي يرسلها معظم الناس للأمهات والأخوات.' },
    tags: { en: ['Confetti', 'Blush', 'Ships same week'], ar: ['قصاصات', 'وردي', 'تسليم خلال الأسبوع'] } },

  { id: 'birthday-plum', occasion: 'birthday', palette: 'periBlush', motif: 'confetti', price: 7,
    en: { title: 'Ihtifal — Plum', desc: 'The same confetti burst in a deeper plum palette, for milestone birthdays. Add a gold-foil age numeral as a finishing touch.' },
    ar: { title: 'احتفال — برقوقي', desc: 'نفس تناثر القصاصات بدرجات برقوقية أعمق، للأعياد المميزة. أضف رقم العمر بالطباعة الذهبية كلمسة أخيرة.' },
    tags: { en: ['Milestone', 'Foil numeral'], ar: ['مناسبة مميزة', 'رقم ذهبي'] } },

  { id: 'mabrouk-grad', occasion: 'graduation', palette: 'leafDeep', motif: 'laurel', price: 9,
    en: { title: 'Mabrouk — Laurel', desc: 'A gold laurel wreath closing around a cap, on midnight navy. Sold singly or as a set of ten for the whole graduating cohort.' },
    ar: { title: 'مبروك — إكليل الغار', desc: 'إكليل غار ذهبي يحيط بقبعة التخرّج على خلفية كحلية داكنة. تُباع مفردة أو بطقم من عشر بطاقات لدفعة التخرّج كاملة.' },
    tags: { en: ['Graduation', 'Set of 10 available'], ar: ['تخرّج', 'يتوفر طقم من ١٠'] } },

  { id: 'grad-emerald', occasion: 'graduation', palette: 'mintIvory', motif: 'laurel', price: 9,
    en: { title: 'Najah — Soft Mint', desc: 'A quieter graduation card in mint and ivory, sized for a photo insert so the card doubles as a keepsake frame.' },
    ar: { title: 'نجاح — نعناعي ناعم', desc: 'بطاقة تخرّج أهدأ بلون نعناعي وعاجي، بمقاس يسمح بإدراج صورة لتتحول البطاقة إلى إطار ذكرى.' },
    tags: { en: ['Photo insert', 'Keepsake'], ar: ['مساحة للصورة', 'تذكار'] } },

  { id: 'corporate-noor', occasion: 'corporate', palette: 'leafDeep', motif: 'grid', price: 6,
    en: { title: 'Shukran — Corporate', desc: 'A restrained interlocking grid that carries a company logo cleanly. Priced per card at volume; minimum order fifty.' },
    ar: { title: 'شكراً — بطاقة شركات', desc: 'شبكة هندسية متداخلة ومتزنة تحمل شعار الشركة بوضوح. السعر لكل بطاقة بالجملة؛ الحد الأدنى خمسون بطاقة.' },
    tags: { en: ['Logo-ready', 'Min. 50', 'Volume pricing'], ar: ['يحمل الشعار', 'حد أدنى ٥٠', 'سعر الجملة'] } },

  { id: 'corporate-navy', occasion: 'corporate', palette: 'periDeep', motif: 'grid', price: 6,
    en: { title: 'Maqam — Executive', desc: 'The executive version on navy with blind-deboss framing. Used for year-end client gifting and board correspondence.' },
    ar: { title: 'مقام — تنفيذية', desc: 'النسخة التنفيذية بلون كحلي مع إطار محفور بارز. تُستخدم لهدايا نهاية العام للعملاء ومراسلات مجلس الإدارة.' },
    tags: { en: ['Deboss', 'Year-end gifting'], ar: ['حفر بارز', 'هدايا نهاية العام'] } },

  { id: 'mawlood-mint', occasion: 'newborn', palette: 'mintIvory', motif: 'botanical', price: 8,
    en: { title: 'Mawlood — Mint', desc: 'A gentle botanical spray for a new arrival, with a blank panel sized for the baby’s name, weight and birth date.' },
    ar: { title: 'مولود — نعناعي', desc: 'باقة نباتية رقيقة للمولود الجديد، مع مساحة فارغة مخصصة لاسم الطفل ووزنه وتاريخ الميلاد.' },
    tags: { en: ['New baby', 'Name panel'], ar: ['مولود جديد', 'مساحة للاسم'] } },

  { id: 'mawlood-blush', occasion: 'newborn', palette: 'creamRose', motif: 'botanical', price: 8,
    en: { title: 'Hana — Blush', desc: 'The blush counterpart, often ordered as a pair so both sides of the family receive a matching announcement.' },
    ar: { title: 'هناء — وردي', desc: 'النسخة الوردية المقابلة، وغالباً ما تُطلب كزوج ليصل الإعلان نفسه لعائلتي الأم والأب.' },
    tags: { en: ['Announcement', 'Order in pairs'], ar: ['إعلان', 'تُطلب كزوج'] } },

  { id: 'shukran-rose', occasion: 'thanks', palette: 'roseDeep', motif: 'botanical', price: 7,
    en: { title: 'Shukran — Deep Rose', desc: 'A thank-you card in deep rose with a gilded spray. Sized A6, it fits a gift box or a bouquet sleeve without folding.' },
    ar: { title: 'شكراً — وردي عميق', desc: 'بطاقة شكر بلون وردي عميق مع باقة مذهّبة. بمقاس A6 تناسب علبة الهدايا أو غلاف الباقة دون طيّ.' },
    tags: { en: ['A6', 'Gift box size'], ar: ['مقاس A6', 'مناسبة لعلبة الهدية'] } },

  { id: 'taqdeer', occasion: 'thanks', palette: 'creamLeaf', motif: 'bands', price: 7,
    en: { title: 'Taqdeer — Appreciation', desc: 'Three arabesque bands framing a central rosette, left deliberately open for a longer handwritten message.' },
    ar: { title: 'تقدير', desc: 'ثلاثة أشرطة أرابيسك تحيط بنجمة مركزية، مع مساحة مفتوحة عن قصد لرسالة يدوية أطول.' },
    tags: { en: ['Room to write', 'Arabesque'], ar: ['مساحة للكتابة', 'أرابيسك'] } },

  { id: 'khotoba-ivory', occasion: 'wedding', palette: 'creamLeaf', motif: 'rings', price: 11,
    en: { title: 'Khotoba — Sand', desc: 'A warmer, sand-toned engagement card. The rosette halo is printed slightly larger so it reads clearly at A6.' },
    ar: { title: 'خطوبة — رملي', desc: 'بطاقة خطوبة بدرجات رملية أدفأ. طُبعت هالة النجمة بحجم أكبر قليلاً لتظهر بوضوح بمقاس A6.' },
    tags: { en: ['Engagement', 'Warm tones'], ar: ['خطوبة', 'ألوان دافئة'] } },

  { id: 'daawa-plum', occasion: 'corporate', palette: 'periBlush', motif: 'bands', price: 6,
    en: { title: 'Da’wa — Event Invite', desc: 'An event invitation panel for launches and galas. Room for venue, time and a QR code block along the lower third.' },
    ar: { title: 'دعوة — بطاقة فعالية', desc: 'بطاقة دعوة لفعاليات الإطلاق والحفلات. تتّسع لاسم المكان والوقت ومربع رمز QR في الثلث السفلي.' },
    tags: { en: ['Events', 'QR ready'], ar: ['فعاليات', 'تدعم رمز QR'] } }
];

/* -------------------------------------------------------------- services */

export const plans = [
  {
    id: 'digital',
    featured: false,
    price: 15,
    minQty: 1,
    pricing: 'flat',
    unit: { en: 'per design', ar: 'للتصميم الواحد' },
    turnaround: { en: '48 hours', ar: '٤٨ ساعة' },
    name: { en: 'Digital Card', ar: 'بطاقة رقمية' },
    for: { en: 'For sending on WhatsApp & Instagram', ar: 'للإرسال عبر واتساب وإنستغرام' },
    includes: {
      en: ['One custom design from your chosen template', 'Your names, date and message set in Arabic or English', 'High-resolution PNG + a square version for stories', 'Two rounds of revisions', 'Delivered by WhatsApp within 48 hours'],
      ar: ['تصميم واحد مخصص من القالب الذي تختاره', 'أسماؤك والتاريخ والرسالة بالعربية أو الإنجليزية', 'ملف PNG عالي الدقة + نسخة مربعة للستوري', 'جولتا تعديل', 'يُسلَّم عبر واتساب خلال ٤٨ ساعة']
    }
  },
  {
    id: 'printed',
    featured: true,
    price: 8,
    minQty: 25,
    pricing: 'per-card',
    unit: { en: 'per card · min. 25', ar: 'للبطاقة · حد أدنى ٢٥' },
    turnaround: { en: '5 – 7 days', ar: '٥ – ٧ أيام' },
    name: { en: 'Printed Cards', ar: 'بطاقات مطبوعة' },
    for: { en: 'For weddings, Eid and celebrations', ar: 'للأعراس والعيد والمناسبات' },
    includes: {
      en: ['Everything in the digital package', 'Printed on 300gsm ivory or cotton stock', 'Gold-foil accent on the front panel', 'Matching envelopes included', 'Printed proof photographed before the full run', 'Delivery across Amman, shipping nationwide']
      ,
      ar: ['كل ما في الباقة الرقمية', 'طباعة على ورق عاجي أو قطني ٣٠٠ غرام', 'لمسة ذهبية على الواجهة الأمامية', 'مغلّفات متناسقة مشمولة', 'تصوير نموذج مطبوع قبل تنفيذ الكمية', 'توصيل داخل عمّان وشحن لكل المحافظات']
    }
  },
  {
    id: 'corporate',
    featured: false,
    price: 0,
    minQty: 50,
    pricing: 'quote',
    unit: { en: 'custom quote', ar: 'عرض سعر مخصص' },
    turnaround: { en: '7 – 14 days', ar: '٧ – ١٤ يوم' },
    name: { en: 'Bulk & Corporate', ar: 'الجملة والشركات' },
    for: { en: 'For 50 cards and above', ar: 'للطلبات من ٥٠ بطاقة فأكثر' },
    includes: {
      en: ['Your logo and brand colours matched to the design', 'Volume pricing from 6 JOD per card', 'Optional blind deboss or spot-foil finish', 'Individually addressed envelopes on request', 'Named contact for the whole run', 'Invoice and delivery note provided'],
      ar: ['مطابقة شعارك وألوان علامتك مع التصميم', 'أسعار جملة تبدأ من ٦ دنانير للبطاقة', 'خيار الحفر البارز أو الطباعة الذهبية الموضعية', 'كتابة العناوين على المغلّفات عند الطلب', 'مسؤول تواصل واحد طوال المشروع', 'فاتورة وسند تسليم رسمي']
    }
  }
];

export const addons = [
  { id: 'rush',      price: 12, en: { name: 'Rush turnaround (24 hours)' }, ar: { name: 'تنفيذ سريع (٢٤ ساعة)' } },
  { id: 'calligraphy', price: 10, en: { name: 'Hand-lettered Arabic name on each card' }, ar: { name: 'كتابة الاسم بالخط العربي يدوياً على كل بطاقة' } },
  { id: 'envelope', price: 8,  en: { name: 'Lined envelopes in a matching pattern' }, ar: { name: 'مغلّفات مبطّنة بنفس الزخرفة' } },
  { id: 'wax',      price: 15, en: { name: 'Wax seal with your initials' }, ar: { name: 'ختم شمعي بالأحرف الأولى من اسمك' } },
  { id: 'extra-revision', price: 6, en: { name: 'Additional revision round' }, ar: { name: 'جولة تعديل إضافية' } },
  { id: 'delivery', price: 3,  en: { name: 'Delivery inside Amman' }, ar: { name: 'توصيل داخل عمّان' } }
];

/* ---------------------------------------------------------------- process */

export const process = [
  { en: { title: 'Tell me the occasion', body: 'Send the occasion, the names and roughly how many cards you need. A photo of anything you like is welcome.' },
    ar: { title: 'أخبريني بالمناسبة', body: 'أرسلي المناسبة والأسماء وعدد البطاقات تقريباً. وصورة لأي تصميم أعجبك مرحّب بها.' } },
  { en: { title: 'A first draft', body: 'Within 48 hours you receive a full-colour draft with your text already set, not a blank template.' },
    ar: { title: 'المسودة الأولى', body: 'خلال ٤٨ ساعة تصلك مسودة ملوّنة كاملة مع نصّك مكتوباً بالفعل، لا قالب فارغ.' } },
  { en: { title: 'We refine it together', body: 'Two revision rounds are included. Colour, spacing, the calligraphy weight — we keep going until it reads right.' },
    ar: { title: 'نعدّلها معاً', body: 'جولتا تعديل مشمولتان. اللون، التباعد، سماكة الخط — نستمر حتى تصبح كما ينبغي.' } },
  { en: { title: 'Print and deliver', body: 'I photograph a printed proof before the full run, then deliver in Amman or ship anywhere in Jordan.' },
    ar: { title: 'الطباعة والتسليم', body: 'أصوّر نموذجاً مطبوعاً قبل تنفيذ الكمية كاملة، ثم أسلّم داخل عمّان أو أشحن لأي محافظة.' } }
];

/* ----------------------------------------------------------- testimonials */

export const testimonials = [
  { id: 'r1', rating: 5, palette: 'creamRose',
    en: { name: 'Rania K.', role: 'Wedding, Abdoun', text: 'She set our names in Arabic and English on the same card and neither one looked like an afterthought. Guests kept the cards.' },
    ar: { name: 'رانيا ك.', role: 'عرس، عبدون', text: 'كتبت أسماءنا بالعربية والإنجليزية على نفس البطاقة ولم تبدُ أي منهما إضافة لاحقة. احتفظ الضيوف بالبطاقات.' } },
  { id: 'r2', rating: 5, palette: 'leafDeep',
    en: { name: 'Omar H.', role: 'Corporate, 180 cards', text: 'We needed 180 Ramadan cards with our logo in nine days. The proof photo arrived on day three and the run was early.' },
    ar: { name: 'عمر ح.', role: 'شركة، ١٨٠ بطاقة', text: 'احتجنا ١٨٠ بطاقة رمضانية بشعارنا خلال تسعة أيام. وصلت صورة النموذج في اليوم الثالث وسُلّمت الكمية قبل الموعد.' } },
  { id: 'r3', rating: 5, palette: 'periDeep',
    en: { name: 'Layal S.', role: 'Graduation set', text: 'I ordered ten graduation cards and asked for a different name on each. Every single one was spelled correctly in Arabic.' },
    ar: { name: 'ليال س.', role: 'طقم تخرّج', text: 'طلبت عشر بطاقات تخرّج باسم مختلف على كل واحدة. كُتب كل اسم بالعربية بشكل صحيح تماماً.' } },
  { id: 'r4', rating: 5, palette: 'creamLeaf',
    en: { name: 'Dana M.', role: 'Eid — digital', text: 'The digital Eid card came back the same evening. I sent it to about sixty people and three of them asked me who designed it.' },
    ar: { name: 'دانا م.', role: 'عيد — رقمية', text: 'وصلت بطاقة العيد الرقمية في المساء نفسه. أرسلتها لحوالي ستين شخصاً وسألني ثلاثة منهم عن المصمّمة.' } },
  { id: 'r5', rating: 5, palette: 'periBlush',
    en: { name: 'Sara A.', role: 'New baby', text: 'She matched the card to the nursery colours from one photo. The blush version is now framed on the wall.' },
    ar: { name: 'سارة ع.', role: 'مولود جديد', text: 'طابقت البطاقة مع ألوان غرفة الطفل من صورة واحدة. النسخة الوردية الآن معلّقة في إطار على الحائط.' } },
  { id: 'r6', rating: 5, palette: 'mintIvory',
    en: { name: 'Huda T.', role: 'Engagement, Jabal Amman', text: 'I changed my mind about the colour twice. She redrew it both times without once making me feel difficult.' },
    ar: { name: 'هدى ت.', role: 'خطوبة، جبل عمّان', text: 'غيّرت رأيي باللون مرتين. أعادت الرسم في المرتين دون أن تشعرني ولو للحظة أنني مزعجة.' } }
];

/* ------------------------------------------------------------------- FAQ */

export const faqs = [
  { en: { q: 'How long does an order take?', a: 'A digital card is delivered within 48 hours. Printed orders take 5 to 7 days from the moment you approve the design. Bulk and corporate runs of 50 cards or more need 7 to 14 days. If your date is sooner than that, add the 24-hour rush option and message me before ordering so I can confirm the slot.' },
    ar: { q: 'كم تستغرق تنفيذ الطلبية؟', a: 'البطاقة الرقمية تُسلَّم خلال ٤٨ ساعة. الطلبات المطبوعة تحتاج من ٥ إلى ٧ أيام من لحظة موافقتك على التصميم. طلبات الجملة والشركات من ٥٠ بطاقة فأكثر تحتاج من ٧ إلى ١٤ يوماً. إذا كان موعدك أقرب من ذلك، أضيفي خيار التنفيذ السريع خلال ٢٤ ساعة وراسليني قبل الطلب لتأكيد توفّر الموعد.' } },
  { en: { q: 'How many revisions are included?', a: 'Two rounds are included in every package. In practice most orders are approved on the first or second draft. If you need more, each additional round is 6 JOD and there is no limit on how many you can add.' },
    ar: { q: 'كم عدد التعديلات المشمولة؟', a: 'جولتا تعديل مشمولتان في كل الباقات. عملياً معظم الطلبات تُعتمد من المسودة الأولى أو الثانية. إذا احتجت المزيد، كل جولة إضافية بـ ٦ دنانير ولا يوجد حد لعدد الجولات.' } },
  { en: { q: 'Do you write the Arabic text yourself?', a: 'Yes. Every Arabic line is set by hand and checked letter by letter, including names with unusual spellings. Send me the exact spelling you want — if a name can be written more than one way, I will send both and let you choose.' },
    ar: { q: 'هل تكتبين النص العربي بنفسك؟', a: 'نعم. كل سطر عربي يُكتب يدوياً ويُراجَع حرفاً حرفاً، بما في ذلك الأسماء ذات الكتابة غير المألوفة. أرسل لي الإملاء الذي تريده تماماً — وإذا كان الاسم يُكتب بأكثر من صورة، سأرسل لك الصورتين لتختار.' } },
  { en: { q: 'Where do you deliver?', a: 'Delivery inside Amman is 3 JOD and usually same-day once the cards are ready. Shipping to other governorates goes through a courier and takes one to two working days. Digital cards have no delivery charge — they arrive on WhatsApp.' },
    ar: { q: 'إلى أين توصّلون؟', a: 'التوصيل داخل عمّان بـ ٣ دنانير وعادةً في نفس اليوم فور جهوزية البطاقات. الشحن لباقي المحافظات عبر شركة توصيل ويستغرق يوماً إلى يومي عمل. البطاقات الرقمية بلا رسوم توصيل — تصلك عبر واتساب.' } },
  { en: { q: 'What is the minimum order?', a: 'There is no minimum for digital cards — one design is a complete order. Printed cards start at 25 pieces, and corporate pricing begins at 50.' },
    ar: { q: 'ما هو الحد الأدنى للطلب؟', a: 'لا يوجد حد أدنى للبطاقات الرقمية — تصميم واحد يُعدّ طلبية كاملة. البطاقات المطبوعة تبدأ من ٢٥ قطعة، وأسعار الشركات تبدأ من ٥٠ قطعة.' } },
  { en: { q: 'How do I pay?', a: 'Once the order details are confirmed I send a payment link or accept a bank transfer, Cliq, or cash on delivery inside Amman. Printed orders are split: half to begin, half on delivery. Nothing is printed before you have seen and approved a proof.' },
    ar: { q: 'كيف أدفع؟', a: 'بعد تأكيد تفاصيل الطلب أرسل لك رابط دفع، أو تحويل بنكي، أو كليك، أو الدفع نقداً عند الاستلام داخل عمّان. الطلبات المطبوعة تُقسّم: نصف المبلغ عند البدء ونصفه عند التسليم. ولا يُطبع شيء قبل أن ترى النموذج وتوافق عليه.' } },
  { en: { q: 'Can you match a design I saw elsewhere?', a: 'I can work in the same spirit — a colour family, a layout, a mood — but I will not copy another designer’s artwork. Send the reference as a starting point and you will get something closer to your own occasion anyway.' },
    ar: { q: 'هل يمكن تنفيذ تصميم رأيته في مكان آخر؟', a: 'أستطيع العمل بنفس الروح — عائلة ألوان، توزيع، أو أجواء معيّنة — لكنني لا أنسخ عمل مصمّم آخر. أرسل الصورة كنقطة انطلاق وستحصل على تصميم أقرب لمناسبتك أنت على أي حال.' } },
  { en: { q: 'Can I cancel or change an order?', a: 'Yes, free of charge at any point before you approve the final proof. After approval a printed run cannot be cancelled, because the stock is already cut and foiled. Digital orders can be refunded in full until the final file is sent.' },
    ar: { q: 'هل يمكن إلغاء الطلب أو تعديله؟', a: 'نعم، مجاناً في أي وقت قبل موافقتك على النموذج النهائي. بعد الموافقة لا يمكن إلغاء الطلبات المطبوعة لأن الورق يكون قد قُصّ وطُبع ذهبياً. الطلبات الرقمية تُسترد كاملة حتى إرسال الملف النهائي.' } }
];

/* ------------------------------------------------------------- UI strings */
/* Consumed by the runtime scripts (cart, wizard, lightbox, toasts). */

export const ui = {
  currency:            { en: 'JOD', ar: 'د.أ' },
  addToCart:           { en: 'Add to cart', ar: 'أضف إلى السلة' },
  addedToCart:         { en: 'Added to your cart', ar: 'أُضيفت إلى سلتك' },
  removedFromCart:     { en: 'Removed from cart', ar: 'أُزيلت من السلة' },
  cartEmpty:           { en: 'Your cart is empty', ar: 'سلتك فارغة' },
  cartEmptyHint:       { en: 'Browse the portfolio and add a design to begin.', ar: 'تصفّح أعمالنا وأضف تصميماً للبدء.' },
  cartTitle:           { en: 'Your cart', ar: 'سلّتك' },
  subtotal:            { en: 'Subtotal', ar: 'المجموع' },
  checkout:            { en: 'Continue to order', ar: 'متابعة الطلب' },
  viewCart:            { en: 'View cart', ar: 'عرض السلة' },
  closeCart:           { en: 'Close cart', ar: 'إغلاق السلة' },
  remove:              { en: 'Remove', ar: 'إزالة' },
  increase:            { en: 'Increase quantity', ar: 'زيادة الكمية' },
  decrease:            { en: 'Decrease quantity', ar: 'إنقاص الكمية' },
  orderThis:           { en: 'Order this design', ar: 'اطلب هذا التصميم' },
  noResults:           { en: 'No designs in this category yet — try another occasion.', ar: 'لا توجد تصاميم في هذا التصنيف بعد — جرّب مناسبة أخرى.' },
  showingAll:          { en: 'Showing all designs', ar: 'عرض كل التصاميم' },
  designCount:         { en: 'designs', ar: 'تصميم' },
  prev:                { en: 'Previous design', ar: 'التصميم السابق' },
  next:                { en: 'Next design', ar: 'التصميم التالي' },
  close:               { en: 'Close', ar: 'إغلاق' },
  required:            { en: 'This field is required', ar: 'هذا الحقل مطلوب' },
  invalidEmail:        { en: 'Enter a valid email address', ar: 'أدخل بريداً إلكترونياً صحيحاً' },
  invalidPhone:        { en: 'Enter a valid phone number', ar: 'أدخل رقم هاتف صحيح' },
  pickOne:             { en: 'Please choose an option to continue', ar: 'اختر خياراً للمتابعة' },
  fixErrors:           { en: 'Please complete the highlighted fields', ar: 'يرجى إكمال الحقول المظللة' },
  fileTooBig:          { en: 'is larger than 8 MB and was not attached', ar: 'أكبر من ٨ ميغابايت ولم يُرفق' },
  fileAdded:           { en: 'Reference added', ar: 'أُضيف المرجع' },
  step:                { en: 'Step', ar: 'خطوة' },
  of:                  { en: 'of', ar: 'من' },
  notChosen:           { en: 'Not chosen yet', ar: 'لم يُختر بعد' },
  none:                { en: 'None', ar: 'لا شيء' },
  quoteOnRequest:      { en: 'Quote on request', ar: 'عرض سعر عند الطلب' },
  estimatedTotal:      { en: 'Estimated total', ar: 'الإجمالي التقديري' },
  sendingOrder:        { en: 'Preparing your order…', ar: 'جارٍ تجهيز طلبك…' },
  orderPlaced:         { en: 'Order summary ready', ar: 'ملخّص الطلب جاهز' },
  messageSent:         { en: 'Thank you — your message is ready to send', ar: 'شكراً لك — رسالتك جاهزة للإرسال' },
  langSwitched:        { en: 'Switched to English', ar: 'تم التحويل إلى العربية' },
  copy:                { en: 'Copy', ar: 'نسخ' },
  copied:              { en: 'Copied to clipboard', ar: 'تم النسخ' }
};
