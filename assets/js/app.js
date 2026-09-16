/* =========================================================================
   Shared behaviour: header, mobile nav, scroll reveals, the hero showcase,
   the cart drawer and toasts. Loaded on every page.
   ========================================================================= */
(function () {
  'use strict';

  var LD = window.LD || {};
  var t = function (key) {
    var pair = (LD.ui && LD.ui[key]) || null;
    return window.I18N ? window.I18N.pick(pair) : (pair ? pair.ar : '');
  };
  var lang = function () { return window.I18N ? window.I18N.lang : 'ar'; };

  /* ------------------------------------------------------------- toast */

  var toastRegion = document.getElementById('toastRegion');
  function toast(message) {
    if (!toastRegion) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
    var span = document.createElement('span');
    span.textContent = message;
    el.appendChild(span);
    toastRegion.appendChild(el);
    setTimeout(function () {
      el.classList.add('is-leaving');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
    }, 3200);
  }
  window.ldToast = toast;

  /* ------------------------------------------------------------ header */

  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -------------------------------------------------------- mobile nav */

  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');
  if (navToggle && primaryNav) {
    var closeNav = function () {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
      document.body.classList.remove('is-locked');
    };
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      if (open) { closeNav(); return; }
      navToggle.setAttribute('aria-expanded', 'true');
      primaryNav.classList.add('is-open');
      document.body.classList.add('is-locked');
    });
    primaryNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1000) closeNav();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ----------------------------------------------------- scroll reveal */

  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (var r = 0; r < revealables.length; r++) revealables[r].classList.add('is-in');
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      for (var q = 0; q < revealables.length; q++) observer.observe(revealables[q]);
    }
  }

  /* -------------------------------------------------------- showcase */

  var showcase = document.getElementById('showcase');
  if (showcase) {
    var slides = Array.prototype.slice.call(showcase.querySelectorAll('.showcase__slide'));
    var caption = document.getElementById('showcaseCaption');
    var dotsWrap = document.getElementById('showcaseDots');
    var index = 0;
    var timer = null;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var cardById = {};
    (LD.cards || []).forEach(function (c) { cardById[c.id] = c; });

    var dots = slides.map(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'showcase__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', (lang() === 'ar' ? 'التصميم ' : 'Design ') + (i + 1));
      dot.addEventListener('click', function () { show(i); restart(); });
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.remove('is-active', 'is-prev', 'is-next');
        if (i === index) slide.classList.add('is-active');
        else if (i === (index - 1 + slides.length) % slides.length) slide.classList.add('is-prev');
        else if (i === (index + 1) % slides.length) slide.classList.add('is-next');
      });
      dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === index); });
      var card = cardById[slides[index].getAttribute('data-card')];
      if (caption && card) caption.textContent = card[lang()].title;
    }

    function restart() {
      if (timer) clearInterval(timer);
      if (reduced) return;
      timer = setInterval(function () { show(index + 1); }, 4800);
    }

    showcase.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    showcase.addEventListener('mouseleave', restart);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (timer) clearInterval(timer); } else { restart(); }
    });
    document.addEventListener('languagechange', function () { show(index); });

    show(0);
    restart();
  }

  /* ------------------------------------------------------------- cart */

  var CART_KEY = 'ld-cart';

  var Cart = {
    items: [],

    load: function () {
      try {
        var raw = localStorage.getItem(CART_KEY);
        this.items = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(this.items)) this.items = [];
      } catch (err) { this.items = []; }
      return this.items;
    },

    save: function () {
      try { localStorage.setItem(CART_KEY, JSON.stringify(this.items)); } catch (err) { /* ignore */ }
      this.render();
      document.dispatchEvent(new CustomEvent('cartchange', { detail: { items: this.items } }));
    },

    add: function (id, qty) {
      var card = (LD.cards || []).filter(function (c) { return c.id === id; })[0];
      if (!card) return;
      var existing = this.items.filter(function (i) { return i.id === id; })[0];
      if (existing) existing.qty += (qty || 1);
      else this.items.push({ id: id, qty: qty || 1 });
      this.save();
      toast(t('addedToCart'));
    },

    setQty: function (id, qty) {
      if (qty <= 0) return this.remove(id);
      this.items.forEach(function (i) { if (i.id === id) i.qty = qty; });
      this.save();
    },

    remove: function (id) {
      this.items = this.items.filter(function (i) { return i.id !== id; });
      this.save();
      toast(t('removedFromCart'));
    },

    total: function () {
      var byId = {};
      (LD.cards || []).forEach(function (c) { byId[c.id] = c; });
      return this.items.reduce(function (sum, item) {
        var card = byId[item.id];
        return sum + (card ? card.price * item.qty : 0);
      }, 0);
    },

    count: function () {
      return this.items.reduce(function (sum, item) { return sum + item.qty; }, 0);
    },

    render: function () {
      var badge = document.getElementById('cartCount');
      var body = document.getElementById('cartBody');
      var foot = document.getElementById('cartFoot');
      var totalEl = document.getElementById('cartTotal');
      var count = this.count();

      if (badge) {
        badge.textContent = String(count);
        badge.classList.toggle('is-visible', count > 0);
      }
      if (!body) return;

      if (!this.items.length) {
        body.innerHTML = '';
        var empty = document.createElement('div');
        empty.className = 'cart-empty';
        empty.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
          'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/>' +
          '<path d="M2 3h2.2l2.3 12.1a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L20 7H5"/></svg>';
        var title = document.createElement('p');
        title.style.fontWeight = '700';
        title.textContent = t('cartEmpty');
        var hint = document.createElement('p');
        hint.style.fontSize = 'var(--step--1)';
        hint.textContent = t('cartEmptyHint');
        empty.appendChild(title);
        empty.appendChild(hint);
        body.appendChild(empty);
        if (foot) foot.hidden = true;
        return;
      }

      var byId = {};
      (LD.cards || []).forEach(function (c) { byId[c.id] = c; });
      var L = lang();
      body.innerHTML = '';

      this.items.forEach(function (item) {
        var card = byId[item.id];
        if (!card) return;
        var line = document.createElement('div');
        line.className = 'cart-line';

        var thumb = document.createElement('span');
        thumb.className = 'cart-line__thumb';
        var img = document.createElement('img');
        img.src = 'assets/img/cards/' + card.id + '.svg';
        img.width = 500; img.height = 700;
        img.loading = 'lazy';
        img.alt = card[L].title;
        thumb.appendChild(img);

        var info = document.createElement('div');
        info.className = 'cart-line__info';
        var name = document.createElement('div');
        name.className = 'cart-line__title';
        name.textContent = card[L].title;
        var meta = document.createElement('div');
        meta.className = 'cart-line__meta';
        meta.textContent = card.price + ' ' + t('currency');
        info.appendChild(name);
        info.appendChild(meta);

        var foot2 = document.createElement('div');
        foot2.className = 'cart-line__foot';

        var qty = document.createElement('span');
        qty.className = 'qty-mini';
        var minus = document.createElement('button');
        minus.type = 'button';
        minus.textContent = '−';
        minus.setAttribute('aria-label', t('decrease'));
        minus.addEventListener('click', function () { Cart.setQty(card.id, item.qty - 1); });
        var value = document.createElement('span');
        value.textContent = String(item.qty);
        var plus = document.createElement('button');
        plus.type = 'button';
        plus.textContent = '+';
        plus.setAttribute('aria-label', t('increase'));
        plus.addEventListener('click', function () { Cart.setQty(card.id, item.qty + 1); });
        qty.appendChild(minus); qty.appendChild(value); qty.appendChild(plus);

        var remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'icon-btn';
        remove.style.inlineSize = '28px';
        remove.style.blockSize = '28px';
        remove.setAttribute('aria-label', t('remove') + ' — ' + card[L].title);
        remove.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
          'stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
        remove.addEventListener('click', function () { Cart.remove(card.id); });

        var price = document.createElement('span');
        price.className = 'cart-line__price';
        price.textContent = (card.price * item.qty) + ' ' + t('currency');

        foot2.appendChild(qty);
        foot2.appendChild(remove);
        foot2.appendChild(price);
        info.appendChild(foot2);

        line.appendChild(thumb);
        line.appendChild(info);
        body.appendChild(line);
      });

      if (foot) foot.hidden = false;
      if (totalEl) totalEl.textContent = String(this.total());
    }
  };

  window.ldCart = Cart;
  Cart.load();
  Cart.render();
  document.addEventListener('languagechange', function () { Cart.render(); });

  /* ----------------------------------------------------- cart drawer */

  var drawer = document.getElementById('cartDrawer');
  var backdrop = document.getElementById('cartBackdrop');
  var openBtn = document.getElementById('cartOpen');
  var closeBtn = document.getElementById('cartClose');

  if (drawer && backdrop && openBtn) {
    var lastFocus = null;

    var openDrawer = function () {
      lastFocus = document.activeElement;
      drawer.hidden = false;
      backdrop.hidden = false;
      /* Next frame, so the transition actually runs. */
      requestAnimationFrame(function () {
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
      });
      document.body.classList.add('is-locked');
      if (closeBtn) closeBtn.focus();
    };

    var closeDrawer = function () {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.classList.remove('is-locked');
      setTimeout(function () {
        drawer.hidden = true;
        backdrop.hidden = true;
      }, 400);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    });

    /* Keep focus inside the drawer while it is open. */
    drawer.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;
      var focusables = drawer.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    });

    window.ldOpenCart = openDrawer;
  }
})();
