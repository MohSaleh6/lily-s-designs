/* =========================================================================
   Portfolio: occasion filters, the lightbox and add-to-cart.
   Runs on any page that contains .tile elements.
   ========================================================================= */
(function () {
  'use strict';

  /* Two collections share one filter bar: delivered work (.work) and the
     orderable catalogue (.tile). Only the catalogue has prices and a cart,
     so the lightbox branches on which kind it was handed. */
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));
  var workTiles = Array.prototype.slice.call(document.querySelectorAll('.work'));
  var filterables = workTiles.concat(tiles);
  if (!filterables.length) return;

  var LD = window.LD || {};
  var cardById = {};
  (LD.cards || []).forEach(function (c) { cardById[c.id] = c; });
  var workById = {};
  (LD.works || []).forEach(function (w) { workById[w.id] = w; });

  var t = function (key) {
    var pair = (LD.ui && LD.ui[key]) || null;
    return window.I18N ? window.I18N.pick(pair) : (pair ? pair.ar : '');
  };
  var lang = function () { return window.I18N ? window.I18N.lang : 'ar'; };

  /* ---------------------------------------------------------- filters */

  var filters = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var countEl = document.getElementById('galleryCount');
  var emptyEl = document.getElementById('galleryEmpty');
  var activeFilter = 'all';

  function applyFilter(value) {
    activeFilter = value;
    var shown = 0;

    filterables.forEach(function (el) {
      var match = value === 'all' || el.getAttribute('data-occasion') === value;
      el.classList.toggle('is-hidden', !match);
      if (match) shown++;
    });

    /* An occasion with no catalogue entry (henna, say) would otherwise leave
       a heading over an empty grid. */
    var catalogue = document.getElementById('catalogueSection');
    if (catalogue) {
      catalogue.hidden = !tiles.some(function (tile) { return !tile.classList.contains('is-hidden'); });
    }

    filters.forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-filter') === value ? 'true' : 'false');
    });

    if (countEl) countEl.textContent = String(shown);
    if (emptyEl) emptyEl.hidden = shown !== 0;

    /* Keep the URL shareable without adding a history entry per click. */
    if (window.history && window.history.replaceState) {
      var url = window.location.pathname + (value === 'all' ? '' : '#' + value);
      window.history.replaceState(null, '', url);
    }
  }

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      applyFilter(button.getAttribute('data-filter'));
    });
  });

  /* Deep link: portfolio.html#eid opens on that filter. */
  if (filters.length) {
    var hash = (window.location.hash || '').replace('#', '');
    var known = filters.some(function (b) { return b.getAttribute('data-filter') === hash; });
    applyFilter(known ? hash : 'all');
    window.addEventListener('hashchange', function () {
      var next = (window.location.hash || '').replace('#', '') || 'all';
      if (filters.some(function (b) { return b.getAttribute('data-filter') === next; })) applyFilter(next);
    });
  }

  /* --------------------------------------------------------- lightbox */

  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var els = {
    image: document.getElementById('lbImage'),
    title: document.getElementById('lbTitle'),
    desc: document.getElementById('lbDesc'),
    tags: document.getElementById('lbTags'),
    price: document.getElementById('lbPrice'),
    occasion: document.getElementById('lbOccasion'),
    add: document.getElementById('lbAdd'),
    order: document.getElementById('lbOrder'),
    close: document.getElementById('lbClose'),
    prev: document.getElementById('lbPrev'),
    next: document.getElementById('lbNext')
  };

  var currentId = null;
  var lastFocus = null;

  /* The order button is bilingual via data-en/data-ar, which i18n rewrites on
     every language switch. Keep the catalogue wording so it can be restored
     after a delivered piece has borrowed the button. */
  var orderLabel = { en: els.order.getAttribute('data-en'), ar: els.order.getAttribute('data-ar') };
  var workLabel = { en: 'Make me one like this', ar: '\u0646\u0635\u0645\u0651\u0645 \u0644\u0643 \u0645\u062b\u0644\u0647\u0627' };

  function setOrderLabel(pair) {
    els.order.setAttribute('data-en', pair.en);
    els.order.setAttribute('data-ar', pair.ar);
    els.order.textContent = pair[lang()] || pair.ar;
  }

  function visibleTiles() {
    return tiles.filter(function (tile) { return !tile.classList.contains('is-hidden'); });
  }

  function visibleWorks() {
    return workTiles.filter(function (el) {
      return !el.classList.contains('is-hidden') && el.querySelector('.work__media[data-work]');
    });
  }

  var mode = 'card';

  function occasionLabel(id) {
    var match = (LD.occasions || []).filter(function (o) { return o.id === id; })[0];
    return match ? match[lang()] : '';
  }

  function paintWork(id) {
    var wk = workById[id];
    if (!wk) return;
    mode = 'work';
    currentId = id;
    var L = lang();

    els.image.src = wk.src;
    els.image.width = wk.w;
    els.image.height = wk.h;
    els.image.alt = wk[L].title + ' — ' + occasionLabel(wk.occasion);
    els.title.textContent = wk[L].title;
    els.desc.textContent = wk[L].desc;
    els.occasion.textContent = occasionLabel(wk.occasion);
    els.tags.innerHTML = '';

    /* A delivered piece has no price and nothing to add to a cart; the one
       action that matters is commissioning something like it. */
    var priceRow = els.price.closest('.lightbox__price');
    if (priceRow) priceRow.hidden = true;
    els.add.hidden = true;
    els.order.href = 'order.html?occasion=' + encodeURIComponent(wk.occasion) +
                     '&ref=' + encodeURIComponent(wk.id);
    setOrderLabel(workLabel);
  }

  function paint(id) {
    var card = cardById[id];
    if (!card) return;
    mode = 'card';
    var priceRow = els.price.closest('.lightbox__price');
    if (priceRow) priceRow.hidden = false;
    els.add.hidden = false;
    setOrderLabel(orderLabel);
    currentId = id;
    var L = lang();

    els.image.src = 'assets/img/cards/' + card.id + '.svg';
    els.image.alt = card[L].title + ' — ' + occasionLabel(card.occasion);
    els.title.textContent = card[L].title;
    els.desc.textContent = card[L].desc;
    els.price.textContent = String(card.price);
    els.occasion.textContent = occasionLabel(card.occasion);

    els.tags.innerHTML = '';
    (card[L].tags || []).forEach(function (label) {
      var tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = label;
      els.tags.appendChild(tag);
    });

    els.order.href = 'order.html?design=' + encodeURIComponent(card.id);
  }

  function open(id, kind) {
    lastFocus = document.activeElement;
    if (kind === 'work') paintWork(id); else paint(id);
    lightbox.hidden = false;
    requestAnimationFrame(function () { lightbox.classList.add('is-open'); });
    document.body.classList.add('is-locked');
    els.close.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    setTimeout(function () { lightbox.hidden = true; }, 380);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(direction) {
    var isWork = mode === 'work';
    var pool = isWork ? visibleWorks() : visibleTiles();
    if (!pool.length) return;
    var ids = pool.map(function (el) {
      return isWork ? el.querySelector('.work__media[data-work]').getAttribute('data-work')
                    : el.getAttribute('data-card');
    });
    var at = ids.indexOf(currentId);
    var next = (at + direction + ids.length) % ids.length;
    if (isWork) paintWork(ids[next]); else paint(ids[next]);
  }

  tiles.forEach(function (tile) {
    tile.addEventListener('click', function () { open(tile.getAttribute('data-card'), 'card'); });
  });

  workTiles.forEach(function (el) {
    var trigger = el.querySelector('.work__media[data-work]');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      open(trigger.getAttribute('data-work'), 'work');
    });
  });

  els.close.addEventListener('click', close);
  els.prev.addEventListener('click', function () { step(-1); });
  els.next.addEventListener('click', function () { step(1); });

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) close();
  });

  els.add.addEventListener('click', function () {
    if (currentId && window.ldCart) window.ldCart.add(currentId, 1);
  });

  document.addEventListener('keydown', function (event) {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') { close(); return; }
    /* Arrow keys follow the visual direction, so they stay intuitive in RTL. */
    var rtl = document.documentElement.dir === 'rtl';
    if (event.key === 'ArrowRight') step(rtl ? -1 : 1);
    if (event.key === 'ArrowLeft') step(rtl ? 1 : -1);
  });

  lightbox.addEventListener('keydown', function (event) {
    if (event.key !== 'Tab') return;
    var focusables = lightbox.querySelectorAll('a[href], button:not([disabled])');
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  document.addEventListener('languagechange', function () {
    if (!currentId) return;
    if (mode === 'work') paintWork(currentId); else paint(currentId);
  });
})();
