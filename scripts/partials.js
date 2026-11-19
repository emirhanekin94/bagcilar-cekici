'use strict';
/* TEK KAYNAK — tüm sayfalarda ortak bileşenler. Footer, navbar, sabit butonlar ve scriptler
   BURADA tanımlıdır; generate_all.js her sayfaya aynı fonksiyonları basar (unutulma ihtimali sıfır). */
const { SITE_URL, BUSINESS, waLink, telLink } = require('../data/business.js');
const { REGIONS } = require('../data/regions.js');
const { SERVICES } = require('../data/services.js');

const A = BUSINESS.analytics;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function url(p) { return SITE_URL + p; }

/* ---------- İkonlar (Lucide çizgisinde inline SVG) ---------- */
const ICONS = {
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  whatsapp: '<path d="M3 21l1.7-5.1A8.5 8.5 0 1 1 8.2 19.4z"/><path d="M9 10c.4 2 2.3 3.8 4.5 4.5l1.3-1.2 2 .9c-.3 1.2-1.3 1.8-2.3 1.7C10.6 15.6 8 12.4 8 10.4c0-1 .6-1.8 1.4-2l.9 2z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2"/><path d="M15 18h4a1 1 0 0 0 1-1v-4.5L17.5 9H15"/><circle cx="7.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/>',
  life: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M19.1 4.9l-4.2 4.2M9.1 14.9l-4.2 4.2"/>',
  park: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
  hook: '<path d="M12 2v10a4 4 0 1 1-4-4"/><circle cx="12" cy="2" r="0.5"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  wheel: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v7M12 15v7M2 12h7M15 12h7"/>',
  moto: '<circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M12 17h-4l3-6h4l3 6"/><path d="M9 7h3l2 4"/>',
  van: '<path d="M2 17V7a1 1 0 0 1 1-1h11v11"/><path d="M14 9h4l4 4v4h-3"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>',
  tag: '<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/>',
  receipt: '<path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 1 .7V2z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M18 6L6 18M6 6l12 12"/>',
  star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  alert: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.7.6 1 1.4 1 2.3h6c0-.9.3-1.7 1-2.3A7 7 0 0 0 12 2z"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'
};
function icon(name, cls) {
  return `<svg class="ic${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;
}

/* ---------- <head> ---------- */
function head({ title, description, path: pagePath, schema, hero, ogImage, noindex }) {
  const canonical = url(pagePath);
  const preload = hero
    ? `<link rel="preload" as="image" href="/images/${hero.mobile}" media="(max-width: 768px)" fetchpriority="high">
  <link rel="preload" as="image" href="/images/${hero.desktop}" media="(min-width: 769px)" fetchpriority="high">`
    : '';
  const og = ogImage || (hero ? hero.desktop : 'otomobil-cekici-1.webp');
  const schemas = (Array.isArray(schema) ? schema : schema ? [schema] : [])
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ');
  return `<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${url('/images/' + og)}">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="${esc(BUSINESS.name)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="theme-color" content="#0B1F3A">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/site.webmanifest">
  ${preload}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700;800&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700;800&display=swap"></noscript>
  <link rel="stylesheet" href="/css/style.css">
  ${schemas}`;
}

/* ---------- Schema ---------- */
function orgSchema(extra) {
  return Object.assign({
    '@context': 'https://schema.org',
    '@type': ['AutoRepair', 'EmergencyService', 'TowingService'],
    '@id': url('/#business'),
    name: BUSINESS.name,
    url: url('/'),
    telephone: BUSINESS.phoneTel,
    image: url('/images/otomobil-cekici-1.webp'),
    description: BUSINESS.slogan,
    address: { '@type': 'PostalAddress', addressLocality: BUSINESS.address.locality, addressRegion: BUSINESS.address.region, addressCountry: BUSINESS.address.country },
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.latitude, longitude: BUSINESS.geo.longitude },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }],
    areaServed: REGIONS.map(r => ({ '@type': 'AdministrativeArea', name: r.fullName }))
  }, extra || {});
}
function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it[0], item: url(it[1]) }))
  };
}
function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: String(f.a).replace(/<[^>]+>/g, '') } }))
  };
}

/* ---------- Logo ---------- */
function logoMark() {
  return `<svg class="brand-mark" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" focusable="false"><rect width="40" height="40" rx="10" fill="#0B1F3A"/><path d="M20 10v12a6 6 0 1 1-6-6" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/><circle cx="20" cy="9.5" r="3" fill="#DC2626"/></svg>`;
}

/* ---------- Üst şerit + navbar (bölge sayfalarında bölge adı yazar) ---------- */
function topBar(region) {
  const msg = region
    ? `${esc(region.fullName)} ve çevresinde 7/24 nöbetçi çekici, ortalama varış ${BUSINESS.etaMinutes}`
    : `7/24 Nöbetçi Çekici: Bağcılar ve Avrupa Yakası'nda ortalama varış ${BUSINESS.etaMinutes}`;
  return `<div class="top-bar"><div class="container top-bar-inner"><span class="live"><span class="pulse-dot"></span>${msg}</span><a class="top-bar-phone" href="${telLink()}" data-track="call">${BUSINESS.phoneDisplay}</a></div></div>`;
}

function headerNav(ctx) {
  ctx = ctx || {};
  const region = ctx.region;
  const active = ctx.active || '';
  const cls = k => (active === k ? ' class="active"' : '');
  const brandTitle = region ? region.navTitle : BUSINESS.name.toLocaleUpperCase('tr-TR');
  const brandSub = region ? region.navSub : '7/24 Yol Yardım & Kurtarma';
  return `<a class="skip-link" href="#main-content">İçeriğe geç</a>
  ${topBar(region)}
  <header class="site-header">
    <div class="container nav-inner">
      <a href="/" class="brand" aria-label="${esc(BUSINESS.name)} ana sayfa">${logoMark()}<span class="brand-text"><strong>${esc(brandTitle)}</strong><small>${esc(brandSub)}</small></span></a>
      <nav class="main-nav" id="main-nav" aria-label="Ana menü">
        <a href="/"${cls('home')}>Ana Sayfa</a>
        <a href="/hizmetler/"${cls('services')}>Hizmetler</a>
        <a href="/bolgeler/"${cls('regions')}>Bölgeler</a>
        <a href="/galeri.html"${cls('gallery')}>Galeri</a>
        <a href="/blog/"${cls('blog')}>Blog</a>
        <a href="/hakkimizda.html"${cls('about')}>Hakkımızda</a>
        <a href="/iletisim.html"${cls('contact')}>İletişim</a>
        <a class="nav-call" href="${telLink()}" data-track="call">${icon('phone')}<span>${BUSINESS.phoneDisplay}</span></a>
      </nav>
      <button class="nav-toggle" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="main-nav">${icon('menu')}</button>
    </div>
  </header>`;
}

/* ---------- Footer (4 sütun) ---------- */
function footer() {
  const sv = SERVICES.map(s => `<li><a href="${s.url}">${esc(s.name)}</a></li>`).join('');
  const popular = ['bagcilar', 'esenler', 'basaksehir', 'ikitelli', 'bahcelievler', 'merter', 'istoc', 'gunesli'];
  const rg = popular.map(sl => REGIONS.find(r => r.slug === sl)).filter(Boolean)
    .map(r => `<li><a href="${r.url}">${esc(r.name)} Çekici</a></li>`).join('');
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="f-col f-brand">
        <a href="/" class="brand brand-light" aria-label="${esc(BUSINESS.name)}">${logoMark()}<span class="brand-text"><strong>${esc(BUSINESS.name.toLocaleUpperCase('tr-TR'))}</strong><small>7/24 Yol Yardım &amp; Kurtarma</small></span></a>
        <p>Bağcılar merkezli, Avrupa Yakası'nda 7/24 kaskolu ve sabit fiyat güvenceli kayar kasa oto çekici filosu.</p>
      </div>
      <div class="f-col"><h3>Hizmetlerimiz</h3><ul>${sv}</ul></div>
      <div class="f-col"><h3>Popüler Bölgeler</h3><ul>${rg}</ul></div>
      <div class="f-col"><h3>Kurumsal &amp; İletişim</h3><ul>
        <li><a href="/hakkimizda.html">Hakkımızda</a></li>
        <li><a href="/bolgeler/">Tüm Bölgelerimiz</a></li>
        <li><a href="/galeri.html">Galeri</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/iletisim.html">İletişim</a></li>
        <li><a href="/gizlilik-politikasi.html">Gizlilik &amp; KVKK Politikası</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom"><div class="container footer-bottom-inner">
      <div class="fb-left">
        <span class="fb-copy">© 2026 ${esc(BUSINESS.name)}. Tüm hakları saklıdır.</span>
        <span class="fb-dot" aria-hidden="true">·</span>
        <a class="fb-link" href="/gizlilik-politikasi.html">Gizlilik &amp; KVKK Politikası</a>
      </div>
      <div class="fb-credit">
        <span>Crafted with precision by <a href="https://getpin.co" target="_blank" rel="noopener" class="getpin-badge">getpin</a></span>
      </div>
    </div></div>
  </footer>`;
}

/* ---------- Sabit aksiyonlar ---------- */
function stickyActions(region) {
  const where = region ? region.fullName : '';
  const text = where
    ? `Merhaba ${BUSINESS.name}, acil çekiciye ihtiyacım var. Bulunduğum bölge: ${where}. Konumumu hemen paylaşıyorum.`
    : `Merhaba ${BUSINESS.name}, acil çekiciye ihtiyacım var. Konumumu hemen paylaşıyorum.`;
  return `<div class="sticky-actions floating-actions" role="region" aria-label="Acil iletişim">
    <a class="sa-call" href="${telLink()}" data-track="call">${icon('phone')}<span>HEMEN ARA</span></a>
    <a class="sa-wa btn-send-location" href="${waLink(text)}" data-track="wa" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<span>KONUM AT</span></a>
  </div>`;
}

/* ---------- Scriptler (tümü defer) ---------- */
function scripts() {
  return `<script src="/js/main.js" defer></script>
  <script src="/js/anti-fraud.js" defer></script>`;
}

/* ---------- Sayfa iskeleti ---------- */
function bodyAttrs(region) {
  const a = [
    `data-theme="${BUSINESS.themeId}"`,
    `data-brand="${esc(BUSINESS.name)}"`,
    `data-wa="${BUSINESS.whatsappNumber}"`,
    `data-ga4="${esc(A.ga4Id)}"`,
    `data-ads="${esc(A.adsId)}"`,
    `data-ads-call="${esc(A.adsCallConversion)}"`,
    `data-ads-wp="${esc(A.adsWhatsappConversion)}"`
  ];
  if (region) a.push(`data-region="${esc(region.fullName)}"`);
  return a.join(' ');
}

function page({ headHtml, ctx, main, region }) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  ${headHtml}
</head>
<body ${bodyAttrs(region)}>
  ${headerNav(Object.assign({}, ctx, { region }))}
  <main id="main-content">
${main}
  </main>
  ${footer()}
  ${stickyActions(region)}
  ${scripts()}
</body>
</html>
`;
}

/* ---------- Ortak içerik blokları ---------- */
function paras(arr) { return (arr || []).map(p => `<p>${p}</p>`).join('\n'); }

function sectionBlock(s, headingLevel) {
  const tag = headingLevel || 'h2';
  let out = `${s.id ? `<section class="prose-sec" id="${esc(s.id)}">` : '<section class="prose-sec">'}\n<${tag}>${esc(s.h2)}</${tag}>\n${paras(s.paragraphs)}`;
  if (s.list && s.list.length) out += `\n<ul class="check-list">${s.list.map(i => `<li>${i}</li>`).join('')}</ul>`;
  if (s.table) {
    out += `\n<div class="table-wrap"><table><thead><tr>${s.table.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${s.table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  if (s.callout) {
    const t = s.callout.type || 'info';
    const ic = t === 'warn' ? 'alert' : t === 'tip' ? 'bulb' : 'info';
    out += `\n<aside class="callout callout-${t}">${icon(ic)}<div><strong>${esc(s.callout.title)}</strong><p>${s.callout.text}</p></div></aside>`;
  }
  return out + '\n</section>';
}

function faqBlock(faqs, title) {
  return `<section class="faq-sec" aria-labelledby="faq-h">
  <h2 id="faq-h">${esc(title || 'Sıkça Sorulan Sorular')}</h2>
  <div class="faq-list">${faqs.map(f => `<details class="faq"><summary>${esc(f.q)}${icon('chevron')}</summary><div class="faq-a"><p>${f.a}</p></div></details>`).join('')}</div>
</section>`;
}

function waQuoteForm(region, opts) {
  opts = opts || {};
  const options = REGIONS.map(r => `<option value="${esc(r.fullName)}"${region && region.slug === r.slug ? ' selected' : ''}>${esc(r.name)}${r.slug === 'goztepe' ? ' (Bağcılar)' : ''}</option>`).join('');
  const cls = opts.className || 'quote-form';
  const fid = opts.id || 'qf';
  return `<form class="${cls}" data-quote-form data-brand="${esc(BUSINESS.name)}" action="#" onsubmit="return false">
    <div class="qf-row">
      <label for="${fid}-r">Bölge</label>
      <select id="${fid}-r" name="bolge">${region ? '' : '<option value="">Bölge seçin</option>'}${options}</select>
    </div>
    <div class="qf-row">
      <label for="${fid}-a">Araç tipi</label>
      <select id="${fid}-a" name="arac"><option>Binek araç</option><option>SUV / Jeep</option><option>Elektrikli araç</option><option>Motosiklet</option><option>Minibüs / Ticari</option></select>
    </div>
    <div class="qf-row">
      <label for="${fid}-d">Durum</label>
      <select id="${fid}-d" name="durum"><option>Arıza / çalışmıyor</option><option>Kaza yaptı</option><option>Akü bitti</option><option>Lastik patladı</option><option>Otoparkta kaldı</option></select>
    </div>
    <button class="btn btn-wa qf-submit" type="submit">${icon('whatsapp')}<span>WhatsApp'tan Fiyat Al</span></button>
  </form>`;
}

function breadcrumbHtml(items) {
  return `<nav class="breadcrumb" aria-label="Sayfa yolu"><ol>${items.map((it, i) => i === items.length - 1 ? `<li aria-current="page">${esc(it[0])}</li>` : `<li><a href="${it[1]}">${esc(it[0])}</a></li>`).join('')}</ol></nav>`;
}

function regionCard(r, content) {
  const chips = (content.focus || []).slice(0, 3).map(esc).join(' · ');
  return `<a class="region-card" href="${r.url}" data-cat="${r.category}">
    <span class="rc-badge"><span class="pulse-dot"></span>7/24 Nöbetçi</span>
    <h3>${icon('pin')}${esc(r.name)} Çekici</h3>
    <p>${chips}</p>
    <span class="rc-foot"><span>Varış: 10 - 15 Dk</span><span class="rc-go">Hemen İncele ${icon('arrow')}</span></span>
  </a>`;
}

module.exports = {
  esc, url, icon, head, orgSchema, breadcrumbSchema, faqSchema, logoMark, headerNav, footer, stickyActions, scripts,
  page, paras, sectionBlock, faqBlock, waQuoteForm, breadcrumbHtml, regionCard, bodyAttrs
};
