/* =========================================================================
   The custom order wizard.

   Seven steps, validated one at a time, with a live estimate beside them.
   Answers are mirrored into localStorage on every change so a customer can
   close the tab and come back. On submit the order is turned into a numbered
   summary and handed to WhatsApp or email — no card details ever touch this
   site. See CHECKOUT_ENDPOINT below for wiring a real payment gateway.
   ========================================================================= */
(function () {
  'use strict';

  var form = document.getElementById('orderForm');
  if (!form) return;

  var LD = window.LD || {};
  var STORAGE_KEY = 'ld-order-draft';

  /* Set this to a serverless endpoint that creates a Stripe/PayPal Checkout
     session and the wizard will POST the order to it and redirect instead of
     opening WhatsApp. Left null, the studio confirms by message first — which
     is how the business runs today. */
  var CHECKOUT_ENDPOINT = null;

  var MSG = {
    minQty:      { en: 'This package starts at {n} cards.', ar: 'هذه الباقة تبدأ من {n} بطاقة.' },
    perCard:     { en: 'per card', ar: 'للبطاقة' },
    design:      { en: 'Design', ar: 'التصميم' },
    occasion:    { en: 'Occasion', ar: 'المناسبة' },
    pkg:         { en: 'Package', ar: 'الباقة' },
    names:       { en: 'Names', ar: 'الأسماء' },
    message:     { en: 'Message', ar: 'الرسالة' },
    cardLang:    { en: 'Card language', ar: 'لغة البطاقة' },
    date:        { en: 'Date', ar: 'التاريخ' },
    colours:     { en: 'Colours', ar: 'الألوان' },
    notes:       { en: 'Notes', ar: 'ملاحظات' },
    quantity:    { en: 'Quantity', ar: 'الكمية' },
    addonsLabel: { en: 'Add-ons', ar: 'الإضافات' },
    contact:     { en: 'Contact', ar: 'التواصل' },
    name:        { en: 'Name', ar: 'الاسم' },
    phone:       { en: 'WhatsApp', ar: 'واتساب' },
    email:       { en: 'Email', ar: 'البريد' },
    delivery:    { en: 'Delivery', ar: 'التسليم' },
    address:     { en: 'Address', ar: 'العنوان' },
    payment:     { en: 'Payment', ar: 'الدفع' },
    references:  { en: 'Reference files', ar: 'ملفات مرجعية' },
    cartItems:   { en: 'Also in your cart', ar: 'أيضاً في سلتك' },
    edit:        { en: 'Edit', ar: 'تعديل' },
    fromScratch: { en: 'Designed from scratch', ar: 'تصميم من الصفر' },
    files:       { en: '{n} file(s) — send them in the chat', ar: '{n} ملف — أرسلها في المحادثة' },
    subject:     { en: 'New card order', ar: 'طلب بطاقة جديد' },
    intro:       { en: 'Hello Lily, I would like to order a card.', ar: 'مرحباً ليلى، أود طلب بطاقة.' },
    ref:         { en: 'Reference', ar: 'الرقم المرجعي' },
    estimate:    { en: 'Estimated total', ar: 'الإجمالي التقديري' },
    quoteNote:   { en: 'Quote to be confirmed', ar: 'بانتظار عرض السعر' }
  };

  var lang = function () { return window.I18N ? window.I18N.lang : 'ar'; };
  var t = function (key) {
    var pair = (LD.ui && LD.ui[key]) || MSG[key] || null;
    return pair ? (pair[lang()] || pair.ar) : '';
  };
  var m = function (key) { var p = MSG[key]; return p ? (p[lang()] || p.ar) : ''; };

  var byId = {};
  (LD.cards || []).forEach(function (c) { byId[c.id] = c; });
  var planById = {};
  (LD.plans || []).forEach(function (p) { planById[p.id] = p; });
  var addonById = {};
  (LD.addons || []).forEach(function (x) { addonById[x.id] = x; });

  /* ------------------------------------------------------------ state */

  var TOTAL_STEPS = 7;
  var current = 1;
  var attachments = [];

  var panels = Array.prototype.slice.call(form.querySelectorAll('.step-panel'));
  var progressBar = document.getElementById('progressBar');
  var progressItems = Array.prototype.slice.call(document.querySelectorAll('#progressSteps li'));
  var backBtn = document.getElementById('wizardBack');
  var nextBtn = document.getElementById('wizardNext');
  var submitBtn = document.getElementById('wizardSubmit');
  var successPanel = document.getElementById('orderSuccess');
  var wizardNav = document.getElementById('wizardNav');

  var el = function (id) { return document.getElementById(id); };
  /* CSS.escape is everywhere modern, but the fallback keeps older mobile
     browsers from throwing while restoring a saved draft. */
  var q = function (value) {
    return (window.CSS && window.CSS.escape) ? window.CSS.escape(value)
      : String(value).replace(/["\\]/g, '\\$&');
  };
  var val = function (id) { var node = el(id); return node ? node.value.trim() : ''; };
  var checked = function (name) {
    var node = form.querySelector('input[name="' + name + '"]:checked');
    return node ? node.value : '';
  };
  var checkedLabel = function (name) {
    var node = form.querySelector('input[name="' + name + '"]:checked');
    if (!node) return '';
    return node.getAttribute('data-' + lang()) || node.getAttribute('data-label') || node.value;
  };
  var checkedAll = function (name) {
    return Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]:checked'))
      .map(function (n) { return n.value; });
  };

  /* -------------------------------------------------------- estimate */

  function effectiveQty() {
    var plan = planById[checked('package')];
    var qty = parseInt(val('quantity'), 10) || 1;
    if (plan && plan.minQty) qty = Math.max(qty, plan.minQty);
    return qty;
  }

  function unitPrice() {
    var design = byId[checked('style')];
    return design ? design.price : 8;
  }

  function estimate() {
    var pkgId = checked('package');
    var plan = planById[pkgId];
    var lines = [];
    var total = 0;
    var isQuote = !plan || plan.pricing === 'quote';

    if (plan && plan.pricing === 'flat') {
      lines.push({ label: plan.name[lang()], value: plan.price });
      total += plan.price;
    } else if (plan && plan.pricing === 'per-card') {
      var qty = effectiveQty();
      var unit = unitPrice();
      lines.push({ label: plan.name[lang()] + ' × ' + qty, value: unit * qty });
      total += unit * qty;
    }

    checkedAll('addons').forEach(function (id) {
      var addon = addonById[id];
      if (!addon) return;
      lines.push({ label: addon[lang()], value: addon.price });
      total += addon.price;
    });

    var deliveryKey = checked('delivery');
    var deliveryFee = (LD.delivery && LD.delivery[deliveryKey]) || 0;
    if (deliveryFee) {
      lines.push({ label: m('delivery'), value: deliveryFee });
      total += deliveryFee;
    }

    /* Anything already added to the cart travels with the order. */
    var cartItems = (window.ldCart && window.ldCart.items) || [];
    cartItems.forEach(function (item) {
      var card = byId[item.id];
      if (!card) return;
      lines.push({ label: card[lang()].title + ' × ' + item.qty, value: card.price * item.qty });
      total += card.price * item.qty;
    });

    return { lines: lines, total: total, isQuote: isQuote };
  }

  function renderSummary() {
    var list = el('summaryLines');
    var totalEl = el('summaryTotal');
    if (!list) return;

    var result = estimate();
    list.innerHTML = '';

    var facts = [
      { label: m('occasion'), value: checked('occasion') === 'other' ? (val('occasionOther') || checkedLabel('occasion')) : checkedLabel('occasion') },
      { label: m('pkg'), value: checkedLabel('package') },
      { label: m('design'), value: checked('style') === 'from-scratch' ? m('fromScratch') : (byId[checked('style')] ? byId[checked('style')][lang()].title : '') }
    ];

    facts.forEach(function (fact) {
      var li = document.createElement('li');
      var key = document.createElement('span');
      key.textContent = fact.label;
      var value = document.createElement('span');
      value.className = 'val' + (fact.value ? '' : ' val--muted');
      value.textContent = fact.value || t('notChosen');
      li.appendChild(key); li.appendChild(value);
      list.appendChild(li);
    });

    result.lines.forEach(function (line) {
      var li = document.createElement('li');
      var key = document.createElement('span');
      key.textContent = line.label;
      var value = document.createElement('span');
      value.className = 'val num';
      value.textContent = line.value + ' ' + t('currency');
      li.appendChild(key); li.appendChild(value);
      list.appendChild(li);
    });

    if (totalEl) {
      totalEl.textContent = result.isQuote ? '' : String(result.total);
      var amount = totalEl.parentNode;
      if (amount) {
        amount.style.fontSize = result.isQuote ? 'var(--step-0)' : '';
        if (result.isQuote) totalEl.textContent = t('quoteOnRequest');
      }
    }
  }

  /* ------------------------------------------------------ validation */

  function setError(id, show, messageKey) {
    var field = el(id);
    var error = el('err-' + id);
    if (field) field.setAttribute('aria-invalid', show ? 'true' : 'false');
    if (error) {
      if (messageKey && LD.ui && LD.ui[messageKey]) error.textContent = t(messageKey);
      error.classList.toggle('is-shown', show);
    }
    return !show;
  }

  function setGroupError(name, show) {
    var error = el('err-' + name);
    if (error) error.classList.toggle('is-shown', show);
    return !show;
  }

  var PHONE_RE = /^[+()\d][\d\s()+-]{6,19}$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateStep(step) {
    var ok = true;

    if (step === 1) {
      ok = setGroupError('occasion', !checked('occasion')) && ok;
    }
    if (step === 2) {
      ok = setGroupError('package', !checked('package')) && ok;
    }
    if (step === 3) {
      ok = setGroupError('style', !checked('style')) && ok;
    }
    if (step === 4) {
      ok = setError('names', !val('names')) && ok;
      ok = setError('message', !val('message')) && ok;
    }
    if (step === 5) {
      var plan = planById[checked('package')];
      var qty = parseInt(val('quantity'), 10) || 0;
      var tooFew = !!(plan && plan.minQty && qty < plan.minQty);
      var error = el('err-quantity');
      if (tooFew && !error) {
        error = document.createElement('span');
        error.className = 'error-text';
        error.id = 'err-quantity';
        el('quantity').closest('.field').appendChild(error);
      }
      if (error) {
        if (tooFew) error.textContent = m('minQty').replace('{n}', String(plan.minQty));
        error.classList.toggle('is-shown', tooFew);
      }
      if (el('quantity')) el('quantity').setAttribute('aria-invalid', tooFew ? 'true' : 'false');
      ok = !tooFew && ok;
    }
    if (step === 6) {
      ok = setError('customerName', !val('customerName')) && ok;
      ok = setError('customerPhone', !PHONE_RE.test(val('customerPhone'))) && ok;
      var email = val('customerEmail');
      ok = setError('customerEmail', !!email && !EMAIL_RE.test(email)) && ok;
      var needsAddress = checked('delivery') === 'amman' || checked('delivery') === 'shipping';
      ok = setError('address', needsAddress && !val('address')) && ok;
    }
    if (step === 7) {
      var agree = el('agree');
      var agreeError = el('err-agree');
      var missing = !!(agree && !agree.checked);
      if (agreeError) agreeError.classList.toggle('is-shown', missing);
      ok = !missing && ok;
    }

    return ok;
  }

  /* ---------------------------------------------------------- panels */

  function showStep(step, options) {
    var opts = options || {};
    current = Math.min(Math.max(step, 1), TOTAL_STEPS);

    panels.forEach(function (panel) {
      panel.classList.toggle('is-active', Number(panel.getAttribute('data-panel')) === current);
    });

    progressItems.forEach(function (item) {
      var n = Number(item.getAttribute('data-step'));
      item.classList.toggle('is-current', n === current);
      item.classList.toggle('is-done', n < current);
    });

    if (progressBar) {
      progressBar.style.inlineSize = Math.round(((current - 1) / (TOTAL_STEPS - 1)) * 100) + '%';
    }

    if (backBtn) backBtn.hidden = current === 1;
    if (nextBtn) nextBtn.hidden = current === TOTAL_STEPS;
    if (submitBtn) submitBtn.hidden = current !== TOTAL_STEPS;

    if (current === 7) renderReview();

    if (!opts.silent) {
      var panel = panels[current - 1];
      var heading = panel ? panel.querySelector('h2') : null;
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
      var wizard = document.getElementById('wizard');
      if (wizard) {
        var top = wizard.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    }

    save();
  }

  /* ---------------------------------------------------------- review */

  function reviewRow(label, value) {
    if (!value) return '';
    return { label: label, value: value };
  }

  function collectReview() {
    var L = lang();
    var design = byId[checked('style')];
    var addonNames = checkedAll('addons').map(function (id) {
      var addon = addonById[id];
      return addon ? addon[L] : id;
    });

    return [
      {
        step: 1,
        title: m('occasion'),
        rows: [
          reviewRow(m('occasion'), checked('occasion') === 'other' ? val('occasionOther') || checkedLabel('occasion') : checkedLabel('occasion')),
          reviewRow(m('pkg'), checkedLabel('package')),
          reviewRow(m('design'), checked('style') === 'from-scratch' ? m('fromScratch') : (design ? design[L].title : ''))
        ].filter(Boolean)
      },
      {
        step: 4,
        title: m('message'),
        rows: [
          reviewRow(m('cardLang'), checkedLabel('cardLang')),
          reviewRow(m('names'), val('names')),
          reviewRow(m('message'), val('message')),
          reviewRow(m('date'), val('eventDate')),
          reviewRow(m('colours'), val('colours')),
          reviewRow(m('notes'), val('notes'))
        ].filter(Boolean)
      },
      {
        step: 5,
        title: m('quantity'),
        rows: [
          reviewRow(m('quantity'), String(effectiveQty())),
          reviewRow(m('addonsLabel'), addonNames.length ? addonNames.join('، ') : t('none'))
        ].filter(Boolean)
      },
      {
        step: 6,
        title: m('contact'),
        rows: [
          reviewRow(m('name'), val('customerName')),
          reviewRow(m('phone'), val('customerPhone')),
          reviewRow(m('email'), val('customerEmail')),
          reviewRow(m('delivery'), checkedLabel('delivery')),
          reviewRow(m('address'), val('address')),
          reviewRow(m('references'), attachments.length ? m('files').replace('{n}', String(attachments.length)) : '')
        ].filter(Boolean)
      }
    ];
  }

  function renderReview() {
    var host = el('reviewGroups');
    if (!host) return;
    host.innerHTML = '';

    collectReview().forEach(function (group) {
      if (!group.rows.length) return;
      var section = document.createElement('div');
      section.className = 'review-group';

      var heading = document.createElement('h3');
      heading.appendChild(document.createTextNode(group.title));
      var edit = document.createElement('button');
      edit.type = 'button';
      edit.className = 'edit-link';
      edit.textContent = m('edit');
      edit.addEventListener('click', function () { showStep(group.step); });
      heading.appendChild(edit);
      section.appendChild(heading);

      var list = document.createElement('dl');
      group.rows.forEach(function (row) {
        var dt = document.createElement('dt');
        dt.textContent = row.label;
        var dd = document.createElement('dd');
        dd.textContent = row.value;
        list.appendChild(dt); list.appendChild(dd);
      });
      section.appendChild(list);
      host.appendChild(section);
    });

    renderSummary();
  }

  /* ------------------------------------------------------ persistence */

  function save() {
    var data = {
      step: current,
      fields: {},
      addons: checkedAll('addons')
    };
    ['occasion', 'package', 'style', 'cardLang', 'delivery', 'payment'].forEach(function (name) {
      data.fields[name] = checked(name);
    });
    ['occasionOther', 'names', 'message', 'eventDate', 'colours', 'notes', 'quantity',
     'customerName', 'customerPhone', 'customerEmail', 'address'].forEach(function (id) {
      data.fields[id] = val(id);
    });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (err) { /* ignore */ }
  }

  function restore() {
    var data = null;
    try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (err) { data = null; }
    if (!data || !data.fields) return;

    Object.keys(data.fields).forEach(function (key) {
      var value = data.fields[key];
      if (!value) return;
      var radio = form.querySelector('input[name="' + key + '"][value="' + q(value) + '"]');
      if (radio) { radio.checked = true; return; }
      var field = el(key);
      if (field) field.value = value;
    });

    (data.addons || []).forEach(function (id) {
      var box = form.querySelector('input[name="addons"][value="' + q(id) + '"]');
      if (box) box.checked = true;
    });
  }

  /* ------------------------------------------------- order → message */

  function reference() {
    var now = new Date();
    var stamp = String(now.getFullYear()).slice(2) +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0');
    var tail = Math.floor(1000 + Math.random() * 9000);
    return 'LD-' + stamp + '-' + tail;
  }

  function buildSummaryText(ref) {
    var lines = [m('intro'), '', m('ref') + ': ' + ref, ''];

    collectReview().forEach(function (group) {
      if (!group.rows.length) return;
      lines.push('— ' + group.title + ' —');
      group.rows.forEach(function (row) {
        lines.push(row.label + ': ' + row.value);
      });
      lines.push('');
    });

    var result = estimate();
    lines.push(m('payment') + ': ' + checkedLabel('payment'));
    lines.push(m('estimate') + ': ' + (result.isQuote ? m('quoteNote') : result.total + ' ' + t('currency')));
    return lines.join('\n');
  }

  /* ---------------------------------------------------------- wiring */

  /* Occasion → show the free-text field, and narrow the style swatches. */
  function syncOccasion() {
    var value = checked('occasion');
    var otherWrap = el('occasionOtherWrap');
    if (otherWrap) otherWrap.hidden = value !== 'other';

    var choices = Array.prototype.slice.call(document.querySelectorAll('#styleChoices .choice[data-occasion]'));
    var matching = choices.filter(function (c) { return c.getAttribute('data-occasion') === value; });
    /* Only narrow the list when there is something to narrow it to. */
    choices.forEach(function (choice) {
      choice.hidden = matching.length > 0 && choice.getAttribute('data-occasion') !== value;
    });
    /* A hidden option must not stay selected. */
    var selected = form.querySelector('input[name="style"]:checked');
    if (selected && selected.closest('.choice') && selected.closest('.choice').hidden) selected.checked = false;
  }

  function syncPackage() {
    var pkgId = checked('package');
    var plan = planById[pkgId];
    var note = el('corporateNote');
    if (note) note.hidden = pkgId !== 'corporate';

    var quantity = el('quantity');
    if (plan && plan.minQty && quantity) {
      quantity.min = String(plan.minQty);
      if ((parseInt(quantity.value, 10) || 0) < plan.minQty) quantity.value = String(plan.minQty);
    }
  }

  function syncDelivery() {
    var value = checked('delivery');
    var wrap = el('addressWrap');
    if (wrap) wrap.hidden = !(value === 'amman' || value === 'shipping');
  }

  form.addEventListener('change', function (event) {
    if (event.target.name === 'occasion') syncOccasion();
    if (event.target.name === 'package') syncPackage();
    if (event.target.name === 'delivery') syncDelivery();
    renderSummary();
    save();
  });
  form.addEventListener('input', function () { renderSummary(); save(); });

  /* Quantity stepper */
  var quantityInput = el('quantity');
  var stepQty = function (delta) {
    var plan = planById[checked('package')];
    var min = (plan && plan.minQty) || 1;
    var next = (parseInt(quantityInput.value, 10) || min) + delta;
    quantityInput.value = String(Math.min(Math.max(next, 1), 5000));
    renderSummary();
    save();
  };
  if (el('qtyPlus')) el('qtyPlus').addEventListener('click', function () { stepQty(1); });
  if (el('qtyMinus')) el('qtyMinus').addEventListener('click', function () { stepQty(-1); });

  /* Reference uploads — held in the browser and listed in the summary; the
     files themselves are sent in the WhatsApp chat, which is what customers
     already do and avoids storing anyone's photos on a static host. */
  var fileInput = el('refFiles');
  var dropzone = el('dropzone');
  var fileList = el('fileList');
  var MAX_BYTES = 8 * 1024 * 1024;

  function renderFiles() {
    if (!fileList) return;
    fileList.innerHTML = '';
    attachments.forEach(function (file, index) {
      var li = document.createElement('li');
      var name = document.createElement('span');
      name.className = 'file-name';
      name.textContent = file.name;
      var size = document.createElement('span');
      size.className = 'file-size num';
      size.textContent = (file.size / 1024 / 1024).toFixed(1) + ' MB';
      var remove = document.createElement('button');
      remove.type = 'button';
      remove.setAttribute('aria-label', t('remove') + ' — ' + file.name);
      remove.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
      remove.addEventListener('click', function () {
        attachments.splice(index, 1);
        renderFiles();
      });
      li.appendChild(name); li.appendChild(size); li.appendChild(remove);
      fileList.appendChild(li);
    });
  }

  function acceptFiles(files) {
    Array.prototype.slice.call(files).forEach(function (file) {
      if (file.size > MAX_BYTES) {
        if (window.ldToast) window.ldToast(file.name + ' ' + t('fileTooBig'));
        return;
      }
      attachments.push(file);
    });
    renderFiles();
  }

  if (fileInput) {
    fileInput.addEventListener('change', function () { acceptFiles(fileInput.files); fileInput.value = ''; });
  }
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(function (type) {
      dropzone.addEventListener(type, function (event) {
        event.preventDefault();
        dropzone.classList.add('is-dragover');
      });
    });
    ['dragleave', 'drop'].forEach(function (type) {
      dropzone.addEventListener(type, function (event) {
        event.preventDefault();
        dropzone.classList.remove('is-dragover');
      });
    });
    dropzone.addEventListener('drop', function (event) {
      if (event.dataTransfer && event.dataTransfer.files) acceptFiles(event.dataTransfer.files);
    });
  }

  /* Navigation */
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (!validateStep(current)) {
        if (window.ldToast) window.ldToast(t('fixErrors'));
        return;
      }
      showStep(current + 1);
    });
  }
  if (backBtn) {
    backBtn.addEventListener('click', function () { showStep(current - 1); });
  }

  progressItems.forEach(function (item) {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function () {
      var target = Number(item.getAttribute('data-step'));
      if (target < current) showStep(target);
    });
  });

  /* Submit */
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    for (var step = 1; step <= TOTAL_STEPS; step++) {
      if (!validateStep(step)) {
        showStep(step);
        if (window.ldToast) window.ldToast(t('fixErrors'));
        return;
      }
    }

    var ref = reference();
    var text = buildSummaryText(ref);

    if (CHECKOUT_ENDPOINT) {
      /* A real gateway would take over here: POST the order, then redirect to
         the hosted checkout session it returns. */
      var payload = { reference: ref, summary: text, estimate: estimate() };
      fetch(CHECKOUT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (response) { return response.json(); })
        .then(function (data) { if (data && data.url) window.location.href = data.url; });
      return;
    }

    var refEl = el('orderRef');
    if (refEl) refEl.textContent = ref;

    var waButton = el('sendWhatsApp');
    if (waButton) {
      waButton.href = 'https://wa.me/' + LD.site.phoneE164 + '?text=' + encodeURIComponent(text);
    }
    var emailButton = el('sendEmail');
    if (emailButton) {
      emailButton.href = 'mailto:' + LD.site.email +
        '?subject=' + encodeURIComponent(m('subject') + ' — ' + ref) +
        '&body=' + encodeURIComponent(text);
    }
    var copyButton = el('copySummary');
    if (copyButton) {
      copyButton.addEventListener('click', function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            if (window.ldToast) window.ldToast(t('copied'));
          });
        }
      });
    }

    form.hidden = true;
    if (wizardNav) wizardNav.hidden = true;
    if (successPanel) {
      successPanel.classList.add('is-active');
      var heading = successPanel.querySelector('h2');
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
      successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    try { localStorage.removeItem(STORAGE_KEY); } catch (err) { /* ignore */ }
    if (window.ldToast) window.ldToast(t('orderPlaced'));
  });

  /* Deep links from the portfolio and pricing pages. */
  function applyQuery() {
    var params = new URLSearchParams(window.location.search);
    var pkg = params.get('package');
    var design = params.get('design');
    var occasion = params.get('occasion');
    var ref = params.get('ref');

    if (pkg) {
      var pkgInput = form.querySelector('input[name="package"][value="' + q(pkg) + '"]');
      if (pkgInput) pkgInput.checked = true;
    }
    if (occasion) {
      var occPick = form.querySelector('input[name="occasion"][value="' + q(occasion) + '"]');
      if (occPick) { occPick.checked = true; syncOccasion(); }
    }
    /* Arriving from a delivered piece: name it in the brief so the studio
       knows which one they want theirs to look like. */
    if (ref) {
      var piece = (LD.works || []).filter(function (w) { return w.id === ref; })[0];
      var notes = form.querySelector('[name="notes"]');
      if (piece && notes && !notes.value) {
        var L = window.I18N ? window.I18N.lang : 'ar';
        notes.value = (L === 'ar' ? 'أرغب بتصميم مشابه لـ: ' : 'I would like something similar to: ')
          + piece[L].title;
      }
    }
    if (design && byId[design]) {
      var occInput = form.querySelector('input[name="occasion"][value="' + q(byId[design].occasion) + '"]');
      if (occInput) occInput.checked = true;
      syncOccasion();
      var styleInput = form.querySelector('input[name="style"][value="' + q(design) + '"]');
      if (styleInput) styleInput.checked = true;
    }
    return !!(pkg || design || occasion || ref);
  }

  document.addEventListener('languagechange', function () {
    renderSummary();
    if (current === 7) renderReview();
  });

  /* ------------------------------------------------------------- boot */

  restore();
  applyQuery();
  syncOccasion();
  syncPackage();
  syncDelivery();
  renderSummary();
  showStep(1, { silent: true });
  document.addEventListener('cartchange', renderSummary);
})();
