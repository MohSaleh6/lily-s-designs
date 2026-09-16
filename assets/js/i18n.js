/* =========================================================================
   Bilingual engine (Arabic RTL ⟷ English LTR)

   Every translatable node ships both languages in the markup:
     <h2 data-en="Pricing" data-ar="الأسعار">الأسعار</h2>
   and translatable attributes use a parallel pair:
     <input data-en-placeholder="Your name" data-ar-placeholder="اسمك">

   Switching is therefore instant, works offline, and never leaves a flash of
   the wrong language. The document opens in Arabic; the choice persists.
   ========================================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'ld-lang';
  var ATTRS = ['placeholder', 'aria-label', 'alt', 'title', 'data-label', 'value'];

  var I18N = {
    lang: document.documentElement.lang === 'en' ? 'en' : 'ar',

    /** Look up a UI string that was authored as a data-en/data-ar pair. */
    pick: function (pair) {
      if (!pair) return '';
      return pair[this.lang] != null ? pair[this.lang] : (pair.ar || pair.en || '');
    },

    isRTL: function () { return this.lang === 'ar'; },

    /** Numbers stay in Latin digits so prices and phone numbers stay legible. */
    num: function (n) { return String(n); },

    money: function (n) {
      var currency = this.lang === 'ar' ? 'د.أ' : 'JOD';
      return String(n) + ' ' + currency;
    },

    apply: function (root) {
      var scope = root || document;

      /* Text content */
      var nodes = scope.querySelectorAll('[data-en][data-ar]');
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var value = el.getAttribute('data-' + this.lang);
        if (value == null) continue;
        /* Only replace text when the element has no element children, so a
           heading made of several translated spans is never flattened. */
        if (el.children.length === 0) el.textContent = value;
      }

      /* Translatable attributes */
      for (var k = 0; k < ATTRS.length; k++) {
        var attr = ATTRS[k];
        var sel = '[data-' + this.lang + '-' + attr + ']';
        var withAttr = scope.querySelectorAll(sel);
        for (var j = 0; j < withAttr.length; j++) {
          var node = withAttr[j];
          node.setAttribute(attr, node.getAttribute('data-' + this.lang + '-' + attr));
        }
      }
    },

    set: function (lang, options) {
      var opts = options || {};
      this.lang = lang === 'en' ? 'en' : 'ar';
      var html = document.documentElement;
      html.lang = this.lang;
      html.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
      try { localStorage.setItem(STORAGE_KEY, this.lang); } catch (err) { /* private mode */ }

      this.apply();
      document.dispatchEvent(new CustomEvent('languagechange', {
        detail: { lang: this.lang, silent: !!opts.silent }
      }));
    },

    toggle: function () { this.set(this.lang === 'ar' ? 'en' : 'ar'); }
  };

  window.I18N = I18N;

  function init() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (err) { /* ignore */ }
    /* The inline head script already flipped the root element; this only
       rewrites the content so both stay in step. */
    I18N.set(stored === 'en' ? 'en' : 'ar', { silent: true });

    var toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', function () { I18N.toggle(); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
