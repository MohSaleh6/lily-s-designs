/* =========================================================================
   Portfolio: occasion filters, the lightbox and add-to-cart.
   Runs on any page that contains .tile elements.
   ========================================================================= */
(function () {
  'use strict';

  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));
  if (!tiles.length) return;

  var LD = window.LD || {};
  var cardById = {};
  (LD.cards || []).forEach(function (c) { cardById[c.id] = c; });

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

    tiles.forEach(function (tile) {
      var match = value === 'all' || tile.getAttribute('data-occasion') === value;
      tile.classList.toggle('is-hidden', !match);
      if (match) shown++;
    });

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

  function visibleTiles() {
    return tiles.filter(function (tile) { return !tile.classList.contains('is-hidden'); });
  }

  function occasionLabel(id) {
    var match = (LD.occasions || []).filter(function (o) { return o.id === id; })[0];
    return match ? match[lang()] : '';
  }

  function paint(id) {
    var card = cardById[id];
    if (!card) return;
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

  function open(id) {
    lastFocus = document.activeElement;
    paint(id);
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
    var pool = visibleTiles();
    if (!pool.length) return;
    var ids = pool.map(function (tile) { return tile.getAttribute('data-card'); });
    var at = ids.indexOf(currentId);
    var next = (at + direction + ids.length) % ids.length;
    paint(ids[next]);
  }

  tiles.forEach(function (tile) {
    tile.addEventListener('click', function () { open(tile.getAttribute('data-card')); });
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
    if (currentId) paint(currentId);
  });
})();
