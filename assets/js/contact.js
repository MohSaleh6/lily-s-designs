/* =========================================================================
   Contact form → WhatsApp.

   A static site has nowhere to POST a message, and a mailto: link loses most
   mobile visitors. So the form is validated here and handed to WhatsApp with
   the whole message pre-written — which is where these conversations happen
   anyway. Swap FORM_ENDPOINT in for a Formspree/Netlify handler if the studio
   ever wants a stored inbox as well.
   ========================================================================= */
(function () {
  'use strict';

  var form = document.getElementById('contactForm');
  if (!form) return;

  var LD = window.LD || {};
  var FORM_ENDPOINT = null;

  var lang = function () { return window.I18N ? window.I18N.lang : 'ar'; };
  var t = function (key) {
    var pair = (LD.ui && LD.ui[key]) || null;
    return pair ? (pair[lang()] || pair.ar) : '';
  };

  var TOPIC = {
    general:  { en: 'General question', ar: 'سؤال عام' },
    custom:   { en: 'Custom design', ar: 'تصميم مخصص' },
    bulk:     { en: 'Bulk or corporate order', ar: 'طلب جملة أو شركات' },
    existing: { en: 'An existing order', ar: 'طلبية قائمة' },
    other:    { en: 'Something else', ar: 'موضوع آخر' }
  };

  var LABEL = {
    name:    { en: 'Name', ar: 'الاسم' },
    phone:   { en: 'WhatsApp', ar: 'واتساب' },
    topic:   { en: 'Subject', ar: 'الموضوع' },
    message: { en: 'Message', ar: 'الرسالة' },
    intro:   { en: 'Hello Lily,', ar: 'مرحباً ليلى،' }
  };
  var m = function (key) { var p = LABEL[key]; return p[lang()] || p.ar; };

  var PHONE_RE = /^[+()\d][\d\s()+-]{6,19}$/;

  function setError(id, show) {
    var field = document.getElementById(id);
    var error = document.getElementById('err-' + id);
    if (field) field.setAttribute('aria-invalid', show ? 'true' : 'false');
    if (error) error.classList.toggle('is-shown', show);
    return !show;
  }

  var value = function (id) {
    var node = document.getElementById(id);
    return node ? node.value.trim() : '';
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var ok = true;
    ok = setError('cName', !value('cName')) && ok;
    ok = setError('cPhone', !PHONE_RE.test(value('cPhone'))) && ok;
    ok = setError('cMessage', !value('cMessage')) && ok;

    if (!ok) {
      if (window.ldToast) window.ldToast(t('fixErrors'));
      var firstError = form.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.focus();
      return;
    }

    var topicKey = value('cTopic') || 'general';
    var topic = TOPIC[topicKey] ? (TOPIC[topicKey][lang()] || TOPIC[topicKey].ar) : topicKey;

    var text = [
      m('intro'), '',
      m('name') + ': ' + value('cName'),
      m('phone') + ': ' + value('cPhone'),
      m('topic') + ': ' + topic, '',
      m('message') + ': ' + value('cMessage')
    ].join('\n');

    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: value('cName'), phone: value('cPhone'), topic: topicKey, message: value('cMessage') })
      });
    }

    window.open('https://wa.me/' + LD.site.phoneE164 + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    if (window.ldToast) window.ldToast(t('messageSent'));
    form.reset();
  });

  /* Clear a field's error as soon as the visitor starts fixing it. */
  form.addEventListener('input', function (event) {
    if (event.target.id) setError(event.target.id, false);
  });
})();
