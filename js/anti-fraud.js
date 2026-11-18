(() => {
  'use strict';

  const STORAGE_KEY = 'bagcilar_ads_clicks';
  const WINDOW_MS = 2 * 60 * 60 * 1000;
  const MAX_CLICKS = 2;
  const DEBOUNCE_MS = 800;

  function safeGtagEvent(name, params) {
    try {
      const payload = Object.assign({ transport_type: 'beacon' }, params || {});
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, payload);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(['event', name, payload]);
      }
    } catch (_) {}
  }

  /* ---------- Paid-Click Fraud Tracking (2-Hour Window) ---------- */
  try {
    const params = new URLSearchParams(window.location.search || '');
    const isPaidClick =
      params.has('gclid') ||
      params.has('wbraid') ||
      params.has('gbraid') ||
      params.has('gad_source') ||
      (params.get('utm_medium') || '').toLowerCase() === 'cpc';

    if (isPaidClick) {
      const now = Date.now();
      let clicks = [];
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        if (Array.isArray(parsed)) {
          clicks = parsed.filter(
            (ts) => typeof ts === 'number' && Number.isFinite(ts) && now - ts <= WINDOW_MS
          );
        }
      } catch (_) {
        clicks = [];
      }

      clicks.push(now);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clicks));
      } catch (_) {}

      if (clicks.length > MAX_CLICKS) {
        safeGtagEvent('suspected_click_fraud', {
          event_category: 'security',
          event_label: window.location.pathname,
          click_count: clicks.length
        });
      }
    }
  } catch (_) {}

  /* ---------- Capture-Phase <800ms Rapid Click Debounce ---------- */
  let lastCtaClickAt = 0;

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      const cta = target.closest(
        'a[href^="tel:"], a[href*="whatsapp.com"], a[href*="wa.me"], [data-track="call"], [data-track="wa"], .btn-send-location'
      );
      if (!cta) return;

      const now = Date.now();
      if (now - lastCtaClickAt < DEBOUNCE_MS) {
        lastCtaClickAt = now;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return;
      }
      lastCtaClickAt = now;
    },
    true
  );

  /* ---------- Accessible Hidden Honeypot Trap ---------- */
  function injectHoneypot() {
    if (!document.body || document.querySelector('.af-honeypot')) return;

    const trap = document.createElement('a');
    trap.href = '#bot-verify';
    trap.className = 'af-honeypot';
    trap.setAttribute('aria-hidden', 'true');
    trap.setAttribute('tabindex', '-1');
    trap.setAttribute('rel', 'nofollow');
    trap.textContent = 'Hızlı Teklif Doğrulama';
    trap.style.cssText =
      'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:auto;';

    trap.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      safeGtagEvent('bot_trap_triggered', {
        event_category: 'security',
        event_label: window.location.pathname
      });
    });

    document.body.appendChild(trap);
  }

  if (document.body) {
    injectHoneypot();
  } else {
    document.addEventListener('DOMContentLoaded', injectHoneypot, { once: true });
  }
})();
