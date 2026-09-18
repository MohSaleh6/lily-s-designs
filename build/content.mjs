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
  email: 'shahd-saleh1@hotmail.com',
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
  { id: 'henna',       en: 'Henna nights', ar: 'حنة' },
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
  { id: 'ramadan-27-arch', type: 'post', image: 'assets/img/work/ramadan-27-arch.jpg', url: '',
    en: { caption: 'Night 27 from the daily Ramadan du\u2019a series.' },
    ar: { caption: '\u0644\u064a\u0644\u0629 \u0627\u0644\u0633\u0627\u0628\u0639 \u0648\u0627\u0644\u0639\u0634\u0631\u064a\u0646 \u0645\u0646 \u0633\u0644\u0633\u0644\u0629 \u0623\u062f\u0639\u064a\u0629 \u0631\u0645\u0636\u0627\u0646 \u0627\u0644\u064a\u0648\u0645\u064a\u0629.' } },
  { id: 'zafaf-omar-sara', type: 'post', image: 'assets/img/work/zafaf-omar-sara.jpg', url: '',
    en: { caption: 'Omar & Sara \u2014 a blush invitation built on their monogram.' },
    ar: { caption: '\u0639\u0645\u0631 \u0648\u0633\u0627\u0631\u0629 \u2014 \u062f\u0639\u0648\u0629 \u0648\u0631\u062f\u064a\u0629 \u0628\u062d\u0631\u0641\u064a \u0627\u0644\u0639\u0631\u0648\u0633\u064a\u0646.' } },
  { id: 'najah-tawjihi-reel', type: 'reel', image: 'assets/img/work/najah-tawjihi-reel-poster.jpg', url: '',
    en: { caption: 'A tawjihi results card, animated \u2014 watch the name resolve.' },
    ar: { caption: '\u0628\u0637\u0627\u0642\u0629 \u0646\u062a\u0627\u0626\u062c \u062a\u0648\u062c\u064a\u0647\u064a \u0645\u062a\u062d\u0631\u0651\u0643\u0629 \u2014 \u0634\u0627\u0647\u062f \u0627\u0644\u0627\u0633\u0645 \u064a\u0638\u0647\u0631.' } },
  { id: 'birthday-norma-bunny', type: 'post', image: 'assets/img/work/birthday-norma-bunny.jpg', url: '',
    en: { caption: 'Some bunny is turning one \u2014 Norma\u2019s first birthday.' },
    ar: { caption: '\u0639\u064a\u062f \u0627\u0644\u0645\u064a\u0644\u0627\u062f \u0627\u0644\u0623\u0648\u0644 \u0644\u0646\u0648\u0631\u0645\u0627\u060c \u0628\u0627\u0644\u0623\u0631\u0646\u0628 \u0648\u0627\u0644\u0646\u062c\u0648\u0645.' } },
  { id: 'mawlood-carousel-reel', type: 'reel', image: 'assets/img/work/mawlood-carousel-reel-poster.jpg', url: '',
    en: { caption: 'An animated announcement for a baby girl, petals and all.' },
    ar: { caption: '\u0628\u0634\u0627\u0631\u0629 \u0645\u0648\u0644\u0648\u062f\u0629 \u0645\u062a\u062d\u0631\u0651\u0643\u0629\u060c \u0628\u0627\u0644\u0648\u0631\u062f \u0648\u0627\u0644\u0628\u062a\u0644\u0627\u062a.' } },
  { id: 'henna-rand-thobe', type: 'post', image: 'assets/img/work/henna-rand-thobe.jpg', url: '',
    en: { caption: 'A henna night drawn around an embroidered thobe.' },
    ar: { caption: '\u0644\u064a\u0644\u0629 \u062d\u0646\u0629 \u0645\u0631\u0633\u0648\u0645\u0629 \u062d\u0648\u0644 \u0627\u0644\u062b\u0648\u0628 \u0627\u0644\u0645\u0637\u0631\u0651\u0632.' } }
];

/* ---------------------------------------------------------------- works

   Real work delivered to real clients: photographs, finished artwork and
   animated card reels. This is the portfolio — the illustrated `cards`
   below are the design families a new order is built from.

   To add a piece: drop the file in assets/img/work/ (or assets/video/ for
   an mp4 plus a poster frame), add a row here with its real pixel
   dimensions, and rebuild. `occasion` must match an id in `occasions`. */

export const works = [
  { id: 'zafaf-mohammad-laila', type: 'image', occasion: 'wedding', src: 'assets/img/work/zafaf-mohammad-laila.jpg', w: 900, h: 1191,
    en: { title: "Mohammad & Laila", note: "A wedding invitation framed in olive and deep green foliage, the names set inside a gilded frame." },
    ar: { title: "محمد وليلى", note: "دعوة زفاف بإطار من أوراق الزيتون والأخضر الداكن، والأسماء داخل إطار ذهبي." } },
  { id: 'zafaf-wildflower-arch', type: 'image', occasion: 'wedding', src: 'assets/img/work/zafaf-wildflower-arch.jpg', w: 900, h: 1178,
    en: { title: "Wildflower Arch", note: "A wedding invitation under a white arch with violet wildflowers, headed by the verse of mawadda wa rahma." },
    ar: { title: "قوس الأزهار البرية", note: "دعوة زفاف بقوس أبيض وأزهار برية بنفسجية، مع آية «وجعل بينكم مودّة ورحمة»." } },
  { id: 'zafaf-omar-sara', type: 'image', occasion: 'wedding', src: 'assets/img/work/zafaf-omar-sara.jpg', w: 900, h: 1173,
    en: { title: "Omar & Sara", note: "A blush wedding invitation built on the couple's monogram, with time, venue and date set beneath." },
    ar: { title: "عمر وسارة", note: "دعوة زفاف وردية بحرفَي العروسين، وأيقونات الوقت والمكان والتاريخ أسفلها." } },
  { id: 'katb-ktab-hadeel', type: 'image', occasion: 'wedding', src: 'assets/img/work/katb-ktab-hadeel.jpg', w: 900, h: 1184,
    en: { title: "Katb Ktab — Mohammad & Hadeel", note: "A katb ktab invitation in a bold hand with garnet roses, made for the smaller family gathering." },
    ar: { title: "عقد قران محمد وهديل", note: "دعوة عقد قران بخط عريض وورود عنّابية، للاحتفال العائلي المصغّر." } },
  { id: 'welcome-ameen-shahd', type: 'image', occasion: 'wedding', src: 'assets/img/work/welcome-ameen-shahd.jpg', w: 900, h: 1171,
    en: { title: "Welcome Sign — Ameen & Shahd", note: "A large-format welcome sign in pink peonies and a flowing English script." },
    ar: { title: "لوحة ترحيب — أمين وشهد", note: "لوحة ترحيب بمقاس كبير، بورود البيوني الوردية وخط إنجليزي منساب." } },
  { id: 'thanks-dancefloor', type: 'image', occasion: 'wedding', src: 'assets/img/work/thanks-dancefloor.jpg', w: 900, h: 1182,
    en: { title: "Dance Floor Card", note: "A table card thanking guests and inviting them to the dance floor." },
    ar: { title: "بطاقة حلبة الرقص", note: "بطاقة شكر توضع على الطاولات تدعو الضيوف إلى حلبة الرقص." } },
  { id: 'thanks-ahmad-rand', type: 'image', occasion: 'wedding', src: 'assets/img/work/thanks-ahmad-rand.jpg', w: 900, h: 1277,
    en: { title: "Thank You — Ahmad & Rand", note: "A thank-you card in white roses and eucalyptus, sized to sit on the guest's plate." },
    ar: { title: "بطاقة شكر — أحمد ورند", note: "بطاقة شكر بالورد الأبيض والأوكالبتوس، بمقاس يناسب طبق الضيف." } },
  { id: 'thanks-table-gold', type: 'image', occasion: 'wedding', src: 'assets/img/work/thanks-table-gold.jpg', w: 900, h: 1180,
    en: { title: "The Card on the Table", note: "The thank-you card printed and placed on a gold charger at the venue." },
    ar: { title: "البطاقة على طاولة الحفل", note: "بطاقة الشكر مطبوعة وموضوعة على صحن ذهبي في القاعة." } },
  { id: 'thanks-table-flowers', type: 'image', occasion: 'wedding', src: 'assets/img/work/thanks-table-flowers.jpg', w: 900, h: 1179,
    en: { title: "Table Setting", note: "The guest table once dressed, with the thank-you card in place." },
    ar: { title: "تنسيق الطاولة", note: "طاولة الضيوف بعد التنسيق، وبطاقة الشكر في مكانها." } },
  { id: 'thanks-table-candles', type: 'image', occasion: 'wedding', src: 'assets/img/work/thanks-table-candles.jpg', w: 900, h: 1188,
    en: { title: "Among the Candles", note: "The same card on another table, among candles and white roses." },
    ar: { title: "بين الشموع والورد", note: "البطاقة نفسها على طاولة أخرى بين الشموع وباقات الورد الأبيض." } },
  { id: 'welcome-ameen-printed', type: 'image', occasion: 'wedding', src: 'assets/img/work/welcome-ameen-printed.jpg', w: 900, h: 1198,
    en: { title: "The Welcome Sign, Installed", note: "The welcome sign printed and mounted on a flower-dressed easel." },
    ar: { title: "لوحة الترحيب في القاعة", note: "لوحة الترحيب بعد الطباعة والتركيب على حامل مزيّن بالورد." } },
  { id: 'henna-rand-thobe', type: 'image', occasion: 'henna', src: 'assets/img/work/henna-rand-thobe.jpg', w: 900, h: 1201,
    en: { title: "Rand's Henna", note: "A henna-night invitation built around an embroidered Palestinian thobe and garnet roses, drawn for the bride." },
    ar: { title: "حنة رند", note: "دعوة حنة بالثوب الفلسطيني المطرّز والورد العنّابي، مرسومة خصيصاً للعروس." } },
  { id: 'henna-rand-favour', type: 'image', occasion: 'henna', src: 'assets/img/work/henna-rand-favour.jpg', w: 900, h: 1188,
    en: { title: "Henna Card & Favour", note: "The henna card printed and paired with a perfume bottle as the guest favour." },
    ar: { title: "بطاقة الحنة مع الهدية", note: "بطاقة الحنة مطبوعة ومرفقة بزجاجة عطر كهدية للضيوف." } },
  { id: 'najah-mohammad', type: 'image', occasion: 'graduation', src: 'assets/img/work/najah-mohammad.jpg', w: 900, h: 1184,
    en: { title: "Mohammad's Graduation", note: "A secondary-school graduation invitation in blue and blush roses with the graduation cap." },
    ar: { title: "حفل نجاح محمّد", note: "دعوة حفل نجاح بالثانوية العامة، بورود زرقاء ووردية وقبّعة التخرّج." } },
  { id: 'birthday-norma-bunny', type: 'image', occasion: 'birthday', src: 'assets/img/work/birthday-norma-bunny.jpg', w: 900, h: 1190,
    en: { title: "Norma Turns One", note: "A first-birthday invitation with a bunny and stars on a pink ground." },
    ar: { title: "عيد ميلاد نورما الأول", note: "دعوة عيد ميلاد أول بالأرنب والنجوم على خلفية وردية." } },
  { id: 'birthday-norma-setup', type: 'image', occasion: 'birthday', src: 'assets/img/work/birthday-norma-setup.jpg', w: 900, h: 1187,
    en: { title: "The Party, Printed", note: "The party signage printed and set among the pink balloon arches." },
    ar: { title: "الحفل بعد الطباعة", note: "لوحات الحفل مطبوعة ومركّبة بين أقواس البالونات الوردية." } },
  { id: 'birthday-lily-bunny', type: 'image', occasion: 'birthday', src: 'assets/img/work/birthday-lily-bunny.jpg', w: 900, h: 1178,
    en: { title: "Lily Turns One", note: "An invitation under a blush arch with a watercolour bunny and a fine English script." },
    ar: { title: "عيد ميلاد ليلى الأول", note: "دعوة بقوس وردي وأرنب مائي، بخط إنجليزي رفيع." } },
  { id: 'birthday-zaid-construction', type: 'image', occasion: 'birthday', src: 'assets/img/work/birthday-zaid-construction.jpg', w: 900, h: 1195,
    en: { title: "Zaid Turns Three", note: "A construction-site invitation, made for a third birthday." },
    ar: { title: "عيد ميلاد زيد الثالث", note: "دعوة بموضوع الورشة والآليات، للأطفال في عمر الثالثة." } },
  { id: 'baby-shower-zaid', type: 'image', occasion: 'newborn', src: 'assets/img/work/baby-shower-zaid.jpg', w: 900, h: 1181,
    en: { title: "Baby Shower — Zaid", note: "A baby-shower invitation with watercolour animals and eucalyptus branches." },
    ar: { title: "بيبي شاور — زيد", note: "دعوة بيبي شاور بحيوانات مائية وأغصان الأوكالبتوس." } },
  { id: 'mawlood-mohammad', type: 'image', occasion: 'newborn', src: 'assets/img/work/mawlood-mohammad.jpg', w: 900, h: 1194,
    en: { title: "New Arrival — Mohammad", note: "A birth announcement in soft blue, with a du'a and the baby's name set large." },
    ar: { title: "مولود جديد — محمّد", note: "بشارة مولود بالأزرق الهادئ، مع دعاء واسم المولود بخط كبير." } },
  { id: 'mawlood-ali-sky', type: 'image', occasion: 'newborn', src: 'assets/img/work/mawlood-ali-sky.jpg', w: 900, h: 1286,
    en: { title: "You Lit Up the World — Ali", note: "A birth announcement with hot-air balloons and bears on a pale blue sky." },
    ar: { title: "نوّرت الدنيا — علي", note: "بشارة مولود بالمناطيد والدببة على سماء زرقاء فاتحة." } },
  { id: 'eid-bow-blush', type: 'image', occasion: 'eid', src: 'assets/img/work/eid-bow-blush.jpg', w: 900, h: 1192,
    en: { title: "Eidkum Mubarak — Blush Ribbon", note: "An Eid card framed in pink ribbon and watercolour blooms." },
    ar: { title: "عيدكم مبارك — الشريطة الوردية", note: "بطاقة عيد بإطار من الشرائط الوردية والأزهار المائية." } },
  { id: 'eid-bow-cream', type: 'image', occasion: 'eid', src: 'assets/img/work/eid-bow-cream.jpg', w: 900, h: 1193,
    en: { title: "Eidkum Mubarak — Flower Frame", note: "A quieter take on the Eid card, a flowered frame on striped paper." },
    ar: { title: "عيدكم مبارك — إطار الورد", note: "نسخة أهدأ من بطاقة العيد، بإطار مزهر على ورق مخطط." } },
  { id: 'eid-adha-blue', type: 'image', occasion: 'eid', src: 'assets/img/work/eid-adha-blue.jpg', w: 900, h: 1181,
    en: { title: "Eid Al-Adha Mubarak", note: "An Eid al-Adha card in blue and silver, built around a full table of hospitality." },
    ar: { title: "عيد أضحى مبارك", note: "بطاقة عيد أضحى بالأزرق والفضي، بمشهد ضيافة كامل." } },
  { id: 'ramadan-27-arch', type: 'image', occasion: 'eid', src: 'assets/img/work/ramadan-27-arch.jpg', w: 900, h: 1190,
    en: { title: "Ramadan 27 — The Du'a Arch", note: "From the daily Ramadan du'a series: a flowered arch around the du'a of the 27th night." },
    ar: { title: "٢٧ رمضان — قوس الدعاء", note: "من سلسلة أدعية رمضان اليومية: قوس مزهر يحيط بدعاء ليلة السابع والعشرين." } },
  { id: 'ramadan-23-lantern', type: 'image', occasion: 'eid', src: 'assets/img/work/ramadan-23-lantern.jpg', w: 900, h: 1122,
    en: { title: "Ramadan 23 — The Lantern", note: "The du'a of the 23rd inside a blue-grey arch, with a lantern and candles." },
    ar: { title: "٢٣ رمضان — الفانوس", note: "دعاء اليوم الثالث والعشرين داخل قوس رمادي أزرق، مع فانوس وشموع." } },
  { id: 'ramadan-23-sand', type: 'image', occasion: 'eid', src: 'assets/img/work/ramadan-23-sand.jpg', w: 900, h: 1117,
    en: { title: "Ramadan 23 — Sand Pattern", note: "Another version of the same day's du'a on a quiet sand-coloured Islamic pattern." },
    ar: { title: "٢٣ رمضان — النقش الرملي", note: "نسخة أخرى من دعاء اليوم نفسه على نقش إسلامي رملي هادئ." } },
  { id: 'ramadan-21-sajjada', type: 'image', occasion: 'eid', src: 'assets/img/work/ramadan-21-sajjada.jpg', w: 900, h: 1106,
    en: { title: "Ramadan 21 — The Prayer Rug", note: "The du'a of light for the 21st, with a prayer rug and hanging lanterns." },
    ar: { title: "٢١ رمضان — سجادة الصلاة", note: "دعاء النور ليوم الحادي والعشرين، مع سجادة صلاة وفوانيس معلّقة." } },
  { id: 'ramadan-20-blossom', type: 'image', occasion: 'eid', src: 'assets/img/work/ramadan-20-blossom.jpg', w: 900, h: 1119,
    en: { title: "Ramadan 20 — Spring Blossom", note: "The qunut du'a for the 20th, among pink blossom branches and a crescent." },
    ar: { title: "٢٠ رمضان — أزهار الربيع", note: "دعاء القنوت ليوم العشرين، بين أغصان الأزهار الوردية والهلال." } },
  { id: 'zafaf-ahmad-rand-reel', type: 'video', occasion: 'wedding', src: 'assets/video/zafaf-ahmad-rand-reel.mp4',
    poster: 'assets/img/work/zafaf-ahmad-rand-reel-poster.jpg', w: 405, h: 720,
    en: { title: "Animated Wedding Invitation", note: "An animated wedding invitation in white roses, eucalyptus and candlelight — sent as a video over WhatsApp." },
    ar: { title: "دعوة زفاف متحرّكة", note: "دعوة زفاف متحرّكة بالورد الأبيض والأوكالبتوس والشموع — تُرسل كفيديو عبر واتساب." } },
  { id: 'mawlood-carousel-reel', type: 'video', occasion: 'newborn', src: 'assets/video/mawlood-carousel-reel.mp4',
    poster: 'assets/img/work/mawlood-carousel-reel-poster.jpg', w: 405, h: 720,
    en: { title: "Animated Birth Announcement", note: "An animated announcement for a baby girl, pink roses and a carousel, with petals falling through it." },
    ar: { title: "بشارة مولودة متحرّكة", note: "بشارة مولودة متحرّكة بالورد الوردي والمرجيحة الدوّارة، مع تساقط البتلات." } },
  { id: 'najah-tawjihi-reel', type: 'video', occasion: 'graduation', src: 'assets/video/najah-tawjihi-reel.mp4',
    poster: 'assets/img/work/najah-tawjihi-reel-poster.jpg', w: 405, h: 720,
    en: { title: "Animated Tawjihi Card", note: "An animated tawjihi results card: branch shadows drift across, then the graduate's name resolves." },
    ar: { title: "بطاقة توجيهي متحرّكة", note: "بطاقة نجاح توجيهي متحرّكة، يظهر فيها ظل الأغصان ثم اسم الخرّيجة." } },
  { id: 'najah-door-reel', type: 'video', occasion: 'graduation', src: 'assets/video/najah-door-reel.mp4',
    poster: 'assets/img/work/najah-door-reel-poster.jpg', w: 405, h: 720,
    en: { title: "Animated Graduation Card — The Door", note: "An animated graduation card: a white door opens slowly to reveal a du'a and the graduate's name, dated 18.8.2026." },
    ar: { title: "بطاقة نجاح متحرّكة — الباب", note: "بطاقة نجاح متحرّكة: باب أبيض ينفتح تدريجياً ليكشف دعاء التوفيق واسم الخرّيج، بتاريخ ١٨.٨.٢٠٢٦." } },
  { id: 'zafaf-roses-couple-reel', type: 'video', occasion: 'wedding', src: 'assets/video/zafaf-roses-couple-reel.mp4',
    poster: 'assets/img/work/zafaf-roses-couple-reel-poster.jpg', w: 405, h: 720,
    en: { title: "Animated Wedding Invitation — Red Roses", note: "An animated wedding invitation framed in red roses and a gold chandelier, with an illustrated couple and the line ‘the day love was made for’." },
    ar: { title: "دعوة زفاف متحرّكة — ورد أحمر", note: "دعوة زفاف متحرّكة بإطار من الورد الأحمر وثريا ذهبية، مع رسمة للعروسين وعبارة «في يوم خُلق للحب»." } },
  { id: 'zafaf-firstdance-reel', type: 'video', occasion: 'wedding', src: 'assets/video/zafaf-firstdance-reel.mp4',
    poster: 'assets/img/work/zafaf-firstdance-reel-poster.jpg', w: 405, h: 726,
    en: { title: "The First Dance", note: "An animated illustration of the couple in a red gown and black tie, dancing — suited to elegant wedding invitations and thank-you cards." },
    ar: { title: "رقصة العروسين", note: "رسمة متحرّكة للعروسين بفستان أحمر وبدلة سوداء، تناسب دعوات الزفاف وبطاقات الشكر الأنيقة." } },
  { id: 'qaat-alafrah-reel', type: 'video', occasion: 'wedding', src: 'assets/video/qaat-alafrah-reel.mp4',
    poster: 'assets/img/work/qaat-alafrah-reel-poster.jpg', w: 405, h: 720,
    en: { title: "The Hall Doors Open", note: "Grand doors open slowly onto a rose-wrapped column and chandeliers — a welcome video meant to run at the hall entrance." },
    ar: { title: "أبواب قاعة الأفراح", note: "أبواب قاعة تُفتح تدريجياً لتكشف عموداً من الورد والثريات — فيديو ترحيب يُعرض على مدخل القاعة." } },
  { id: 'mawlood-deer-reel', type: 'video', occasion: 'newborn', src: 'assets/video/mawlood-deer-reel.mp4',
    poster: 'assets/img/work/mawlood-deer-reel-poster.jpg', w: 405, h: 726,
    en: { title: "Birth Announcement — Deer & Rabbit", note: "An animated birth announcement in cherry blossom, a small glowing door, a deer and a rabbit, reading ‘the first joy of a happy life’." },
    ar: { title: "بشارة مولود — الغزال والأرنب", note: "بشارة مولود متحرّكة بأزهار الكرز وباب مضيء صغير، مع غزال وأرنب، وعبارة «يا أول مولود الحياة السعيدة»." } },
  { id: 'henna-rand-jerusalem-reel', type: 'video', occasion: 'henna', src: 'assets/video/henna-rand-jerusalem-reel.mp4',
    poster: 'assets/img/work/henna-rand-jerusalem-reel-poster.jpg', w: 405, h: 720,
    en: { title: "Rand's Henna — Scent of Jerusalem", note: "An animated version of Rand's henna invitation: a girl in an embroidered thobe before Jerusalem's skyline, under ‘from the scent of Jerusalem and the fragrance of flowers’." },
    ar: { title: "حنة رند — عبق القدس", note: "نسخة متحرّكة من دعوة حنة رند: فتاة بالثوب المطرّز أمام معالم مقدسية، تحت عبارة «من عبق القدس وعطر الأزهار»." } },
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
    tags: { en: ['Events', 'QR ready'], ar: ['فعاليات', 'تدعم رمز QR'] } },

  { id: 'hinnawi-garnet', occasion: 'henna', palette: 'roseDeep', motif: 'henna', price: 10,
    en: { title: 'Hinnawi — Garnet Night', desc: 'A henna-night card built around a single hand in trailing mandala and gold bangles, flanked by candles. Room below for the bride’s name and date.' },
    ar: { title: 'حنّاوي — ليلة عنّابية', desc: 'بطاقة حنة تدور حول يد واحدة بنقشة مندالا وأساور ذهبية، يحيط بها شمعتان. مساحة أسفلها لاسم العروس والتاريخ.' },
    tags: { en: ['Henna night', 'Hand motif'], ar: ['ليلة حنة', 'زخرفة اليد'] } }
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
