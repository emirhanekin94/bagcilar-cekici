(() => {
  'use strict';

  const body = document.body;
  const ds = body ? body.dataset : {};
  const BRAND = (ds.brand || 'Bağcılar Oto Çekici').trim();
  const WA_NUMBER = (ds.wa || '905452565520').replace(/\D/g, '') || '905452565520';
  const GA4_ID = (ds.ga4 || '').trim();
  const ADS_ID = (ds.ads || '').trim();
  const ADS_CALL = (ds.adsCall || '').trim();
  const ADS_WP = (ds.adsWp || '').trim();
  const REGION = (ds.region || '').trim();

  /* ---------- Analytics & Deferred gtag.js Loader ---------- */
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  let gtagLoaded = false;
  const interactionEvents = ['pointerdown', 'click', 'touchstart', 'scroll', 'keydown'];

  function detachGtagListeners() {
    interactionEvents.forEach((evt) => {
      window.removeEventListener(evt, loadGtag, true);
    });
  }

  function loadGtag() {
    if (gtagLoaded || (!GA4_ID && !ADS_ID)) return;
    gtagLoaded = true;
    detachGtagListeners();

    window.gtag('js', new Date());
    if (GA4_ID) window.gtag('config', GA4_ID);
    if (ADS_ID) window.gtag('config', ADS_ID);

    const primaryId = GA4_ID || ADS_ID;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(primaryId);
    (document.head || document.documentElement).appendChild(script);
  }

  if (GA4_ID || ADS_ID) {
    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, loadGtag, { once: true, passive: true, capture: true });
    });
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(loadGtag, { timeout: 4000 });
    }
    window.setTimeout(loadGtag, 4000);
  }

  function trackEvent(eventName, params) {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, Object.assign({ transport_type: 'beacon' }, params || {}));
      }
    } catch (_) {}
  }

  window.gtag_report_conversion = function (sendTo, url) {
    let navigated = false;
    const go = function () {
      if (navigated) return;
      navigated = true;
      if (typeof url === 'function') {
        url();
      } else if (typeof url === 'string' && url) {
        window.location.href = url;
      }
    };
    try {
      if (sendTo && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: sendTo,
          transport_type: 'beacon',
          event_callback: go
        });
      }
    } catch (_) {}
    window.setTimeout(go, 120);
    return false;
  };

  function buildWaUrl(text) {
    return 'https://api.whatsapp.com/send?phone=' + encodeURIComponent(WA_NUMBER) + '&text=' + encodeURIComponent(text);
  }

  /* ---------- Mobile Accordion Navigation ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    const setMenuOpen = (open) => {
      mainNav.classList.toggle('open', open);
      if (body) body.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    };

    navToggle.addEventListener('click', () => {
      setMenuOpen(!mainNav.classList.contains('open'));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (
        mainNav.classList.contains('open') &&
        !mainNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        setMenuOpen(false);
        navToggle.focus();
      }
    });

    const mqNav = window.matchMedia('(min-width: 1024px)');
    const onNavBp = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    if (typeof mqNav.addEventListener === 'function') {
      mqNav.addEventListener('change', onNavBp);
    } else if (typeof mqNav.addListener === 'function') {
      mqNav.addListener(onNavBp);
    }
  }

  /* ---------- Desktop Auto-Expand .quote-details ---------- */
  const quoteDetails = document.querySelectorAll('details.quote-details');
  if (quoteDetails.length) {
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const syncQuoteDetails = (matches) => {
      quoteDetails.forEach((d) => {
        d.open = Boolean(matches);
      });
    };
    syncQuoteDetails(mqDesktop.matches);
    if (typeof mqDesktop.addEventListener === 'function') {
      mqDesktop.addEventListener('change', (e) => syncQuoteDetails(e.matches));
    } else if (typeof mqDesktop.addListener === 'function') {
      mqDesktop.addListener((e) => syncQuoteDetails(e.matches));
    }
  }

  /* ---------- Hero Form Accordion Toggle (Mobile) ---------- */
  document.querySelectorAll('.hero-form-card').forEach((card) => {
    const toggle = card.querySelector('.form-card-header');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const isOpen = card.classList.toggle('open');
        const btnText = card.querySelector('.toggle-btn-text');
        if (btnText) {
          btnText.textContent = isOpen ? 'Formu Kapat' : 'Formu Aç';
        }
      }
    });
  });

  /* ---------- Region Category Chip Filter ---------- */
  document.querySelectorAll('.chips').forEach((chipsWrap) => {
    const chips = chipsWrap.querySelectorAll('.chip[data-filter]');
    if (!chips.length) return;
    const scope = chipsWrap.closest('section') || document;
    const cards = scope.querySelectorAll('.region-card[data-cat]');

    chips.forEach((c) => {
      c.setAttribute('aria-pressed', c.classList.contains('on') ? 'true' : 'false');
    });

    chipsWrap.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip[data-filter]');
      if (!chip || !chipsWrap.contains(chip)) return;

      const filter = chip.dataset.filter || 'all';
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle('on', active);
        c.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.hidden = !show;
        card.classList.toggle('is-hidden', !show);
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Home Region Show All Toggle ---------- */
  const toggleBtn = document.getElementById('btn-toggle-all-regions');
  const extraGrid = document.getElementById('home-extra-regions');
  const toggleLabel = document.getElementById('toggle-regions-label');
  if (toggleBtn && extraGrid) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = extraGrid.hasAttribute('hidden');
      if (isHidden) {
        extraGrid.removeAttribute('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
        if (toggleLabel) toggleLabel.textContent = 'Daha Az Bölge Göster';
      } else {
        extraGrid.setAttribute('hidden', '');
        toggleBtn.setAttribute('aria-expanded', 'false');
        const total = toggleLabel ? (toggleLabel.dataset.total || '17') : '17';
        if (toggleLabel) toggleLabel.textContent = `Tüm Bölgeleri Göster (${total} Bölge)`;
        const sec = document.getElementById('bolgeler');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ---------- Accessible Gallery Lightbox ---------- */
  const lbTriggers = document.querySelectorAll('[data-lightbox]');
  if (lbTriggers.length && body) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Fotoğraf önizleme');
    overlay.hidden = true;

    const dialog = document.createElement('div');
    dialog.className = 'lightbox-dialog';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Kapat');
    closeBtn.innerHTML = '<svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>';

    const figure = document.createElement('figure');
    figure.className = 'lightbox-figure';

    const lbImg = document.createElement('img');
    lbImg.className = 'lightbox-img';
    lbImg.alt = '';

    const lbCap = document.createElement('figcaption');
    lbCap.className = 'lightbox-cap';

    figure.appendChild(lbImg);
    figure.appendChild(lbCap);
    dialog.appendChild(closeBtn);
    dialog.appendChild(figure);
    overlay.appendChild(dialog);
    body.appendChild(overlay);

    let lastFocused = null;

    const openLightbox = (src, alt, triggerEl) => {
      if (!src) return;
      lastFocused = triggerEl || document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || '';
      lbCap.textContent = alt || '';
      overlay.hidden = false;
      overlay.classList.add('open');
      body.classList.add('lb-open');
      closeBtn.focus();
    };

    const closeLightbox = () => {
      if (overlay.hidden) return;
      overlay.classList.remove('open');
      overlay.hidden = true;
      lbImg.removeAttribute('src');
      body.classList.remove('lb-open');
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
      lastFocused = null;
    };

    lbTriggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const innerImg = btn.querySelector('img');
        const alt = btn.dataset.alt || (innerImg ? innerImg.alt : '');
        openLightbox(btn.dataset.lightbox, alt, btn);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (overlay.hidden) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        closeBtn.focus();
      }
    });
  }

  /* ---------- WhatsApp Quote Form ---------- */
  document.querySelectorAll('[data-quote-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const bolgeEl = form.elements.bolge;
      const aracEl = form.elements.arac;
      const durumEl = form.elements.durum;

      const bolge = (bolgeEl && bolgeEl.value ? bolgeEl.value.trim() : '') || REGION || 'Bağcılar ve çevresi';
      const arac = aracEl && aracEl.value ? aracEl.value.trim() : 'Binek araç';
      const durum = durumEl && durumEl.value ? durumEl.value.trim() : 'Arıza / çalışmıyor';
      const formBrand = (form.dataset.brand || BRAND).trim();

      const msg = `Merhaba ${formBrand}, acil çekici fiyat teklifi almak istiyorum. Bölge: ${bolge} | Araç: ${arac} | Durum: ${durum}`;
      const waUrl = buildWaUrl(msg);

      trackEvent('generate_lead', {
        event_category: 'quote_form',
        event_label: bolge,
        vehicle_type: arac,
        issue: durum
      });
      trackEvent('click_whatsapp', {
        event_category: 'engagement',
        event_label: 'quote_form_' + bolge
      });

      if (ADS_WP) {
        window.gtag_report_conversion(ADS_WP, waUrl);
      } else {
        window.setTimeout(() => {
          window.location.href = waUrl;
        }, 120);
      }
    });
  });

  /* ---------- Tracked Call, WhatsApp & Location Click Handler ---------- */
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented) return;

    const target = e.target;
    if (!target || typeof target.closest !== 'function') return;

    const link = target.closest('a[data-track="call"], a[data-track="wa"], a[href^="tel:"], a.btn-send-location');
    if (!link) return;

    const rawHref = link.getAttribute('href') || '';
    const isCall = link.dataset.track === 'call' || /^tel:/i.test(rawHref);
    const isLocationBtn = link.classList.contains('btn-send-location');
    const isWa = !isCall && (link.dataset.track === 'wa' || isLocationBtn || /api\.whatsapp\.com/i.test(rawHref));

    if (isCall) {
      if (!rawHref) return;
      e.preventDefault();
      trackEvent('click_call', {
        event_category: 'engagement',
        event_label: REGION || 'genel'
      });
      if (ADS_CALL) {
        window.gtag_report_conversion(ADS_CALL, rawHref);
      } else {
        window.setTimeout(() => {
          window.location.href = rawHref;
        }, 120);
      }
      return;
    }

    if (isWa) {
      let targetUrl = link.href || '';
      if (isLocationBtn) {
        const locMsg = REGION
          ? `Merhaba ${BRAND}, acil çekiciye ihtiyacım var. Bulunduğum Bölge: ${REGION} (Konumumu hemen ardından paylaşıyorum.)`
          : `Merhaba ${BRAND}, acil çekiciye ihtiyacım var. Konumumu hemen ardından paylaşıyorum.`;
        targetUrl = buildWaUrl(locMsg);
        link.setAttribute('href', targetUrl);
      }
      if (!targetUrl) return;

      e.preventDefault();
      if (isLocationBtn) {
        trackEvent('konum_at_tiklama', {
          event_category: 'engagement',
          event_label: REGION || 'genel'
        });
      }
      trackEvent('click_whatsapp', {
        event_category: 'engagement',
        event_label: REGION || 'genel'
      });

      if (ADS_WP) {
        window.gtag_report_conversion(ADS_WP, targetUrl);
      } else {
        window.setTimeout(() => {
          window.location.href = targetUrl;
        }, 120);
      }
    }
  });
})();
