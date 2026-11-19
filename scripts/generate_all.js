'use strict';
/* Tüm HTML sayfalarını üretir: node scripts/generate_all.js */
const fs = require('fs');
const path = require('path');
const P = require('./partials.js');
const { SITE_URL, BUSINESS, waLink, telLink } = require('../data/business.js');
const { REGIONS, CATEGORIES, loadRegionContent, getRegion } = require('../data/regions.js');
const { SERVICES, loadServiceContent, getService } = require('../data/services.js');
const { loadPosts } = require('../data/blog.js');

const ROOT = path.join(__dirname, '..');
const { esc, icon } = P;
const written = [];

function write(rel, html) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, 'utf8');
  written.push(rel);
}

/* ---------- yardımcılar ---------- */
function picture({ desktop, mobile, w, h, mw, mh, alt, eager, cls }) {
  const src = mobile ? `<source media="(max-width: 768px)" srcset="/images/${mobile}" width="${mw || 640}" height="${mh || 480}">` : '';
  const attrs = eager ? 'fetchpriority="high" loading="eager" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<picture>${src}<img${cls ? ` class="${cls}"` : ''} src="/images/${desktop}" width="${w || 720}" height="${h || 960}" alt="${esc(alt)}" ${attrs}></picture>`;
}
function ctaButtons(region, opts) {
  opts = opts || {};
  const where = region ? region.fullName : '';
  const text = where
    ? `Merhaba ${BUSINESS.name}, acil çekiciye ihtiyacım var. Bulunduğum bölge: ${where}. Konumumu hemen ardından paylaşıyorum.`
    : `Merhaba ${BUSINESS.name}, acil çekiciye ihtiyacım var. Konumumu hemen ardından paylaşıyorum.`;
  return `<div class="cta-row${opts.center ? ' cta-center' : ''}">
    <a class="btn btn-call" href="${telLink()}" data-track="call">${icon('phone')}<span>Hemen Ara <b>${BUSINESS.phoneDisplay}</b></span></a>
    <a class="btn btn-wa btn-send-location" href="${waLink(text)}" data-track="wa" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<span>WhatsApp Konum Gönder</span></a>
  </div>`;
}
function statsRow() {
  return `<ul class="stats">
    <li><strong>${BUSINESS.etaMinutes}</strong><span>Ortalama Varış</span></li>
    <li><strong>7/24</strong><span>Nöbetçi Filo</span></li>
    <li><strong>%100</strong><span>Kaskolu Taşıma</span></li>
    <li><strong>${BUSINESS.rating.value} ★</strong><span>Müşteri Puanı</span></li>
  </ul>`;
}
function dateTr(d) {
  const m = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const [y, mo, da] = d.split('-').map(Number);
  return `${da} ${m[mo - 1]} ${y}`;
}
function ctaBand(title, text) {
  return `<section class="cta-band"><div class="container cta-band-inner">
    <div><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
    ${ctaButtons(null)}
  </div></section>`;
}
const GALLERY = [
  ['otomobil-cekici-3', 'Kayar kasa çekici üzerinde yol kenarından alınan siyah sedan araç'],
  ['kazali-arac-cekici-1', 'Kaza sonrası ön kısmı hasarlı beyaz SUV kayar kasa çekiciyle taşınıyor'],
  ['motorsiklet-cekici-1', 'Motosiklet kayar kasaya bağlama kayışlarıyla sabitlenmiş halde'],
  ['e-5-cekici', 'Gece otoyolda uyarı lambaları yanan kayar kasa çekici ve yüklü araç'],
  ['ticari-cekici-3', 'Beyaz panelvan ticari araç çekici kasasında taşınıyor'],
  ['is-makinesi-cekici-1', 'Mini iş makinesi kayar kasa çekiciyle şantiyeye taşınıyor'],
  ['spor-arac-cekici', 'Beyaz spor otomobil alçak açılı kayar kasa ile hasarsız yükleniyor'],
  ['atv-cekici', 'ATV araç çekici kasasına yüklenerek taşınıyor'],
  ['havalimani-cekici', 'Yoğun trafikte gece köprü altında çekici ile araç kurtarma'],
  ['lastik-tamir', 'Lastiği sökülmüş otomobil için yerinde lastik yol yardım'],
  ['aku-takviye', 'Motor bölümünde akü takviye kabloları ile yerinde akü takviye'],
  ['minibus-cekici', 'Beyaz minibüs kayar kasa çekici ile caddeden alınıyor']
];

const posts = loadPosts();
const regionContent = {};
REGIONS.forEach(r => { regionContent[r.slug] = loadRegionContent(r.slug); });
const serviceContent = {};
SERVICES.forEach(s => { serviceContent[s.slug] = loadServiceContent(s.slug); });

/* =============== ANA SAYFA =============== */
function buildHome() {
  const hero = { mobile: 'otomobil-cekici-4-m.webp', desktop: 'otomobil-cekici-4.webp' };
  const title = 'Bağcılar Oto Çekici | 7/24 Yol Yardım & Oto Kurtarma';
  const description = 'Bağcılar çekici: kayar kasa ile 7/24 oto çekici, akü takviye ve yol yardım. Esenler, Başakşehir, İkitelli ve Avrupa Yakası’nda 10-15 dk varış. Hemen arayın.';

  const faqs = [
    { q: 'Bağcılar’da çekici ne kadar sürede gelir?', a: 'Bağcılar merkez ve çevre mahallelerde ortalama varış süremiz 10-15 dakikadır. Yoğun saatlerde ve otoyol bağlantılarında konumunuzu aldığımızda net süreyi telefonda söyleriz.' },
    { q: 'Fiyatı nasıl öğrenebilirim?', a: 'Aradığınızda aracın tipi, bulunduğunuz konum ve gideceği adres sorulur; çekici yola çıkmadan önce net fiyat telefonda söylenir. Yükleme sonrası ek ücret çıkmaz.' },
    { q: 'Elektrikli ve otomatik vitesli araçları çekebiliyor musunuz?', a: 'Evet. Bu araçlar tekerlekleri yerde sürüklenerek çekilmez; kayar kasaya tamamen yüklenerek taşınır. Böylece şanzıman ve motor sistemleri zarar görmez.' },
    { q: 'Kapalı otoparktaki araç için hizmet veriyor musunuz?', a: 'Evet, alçak kabin yüksekliği olan araçlarla AVM ve rezidans otoparklarına girebiliyoruz. Otopark yüksekliğini ve rampa durumunu aradığınızda bildirmeniz yeterli.' },
    { q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?', a: 'Nakit, havale/EFT ve mobil POS ile kartlı ödeme alıyoruz. İsteyen müşterilerimize fatura düzenliyoruz.' },
    { q: 'Gece ve hafta sonu hizmet veriyor musunuz?', a: 'Yılın her günü 24 saat nöbetçi ekibimiz vardır. Gece yarısı ve resmi tatillerde de aynı numaradan ulaşabilirsiniz.' }
  ];

  const services = SERVICES.map(s => {
    const c = serviceContent[s.slug];
    return `<a class="svc-card" href="${s.url}">
      <div class="svc-img">${picture({ desktop: s.image + '.webp', w: 720, h: 960, alt: `${s.name} - ${BUSINESS.name}` })}</div>
      <div class="svc-body"><span class="svc-ic">${icon(s.icon)}</span><h3>${esc(s.name)}</h3><p>${esc(c.excerpt)}</p>
      <ul class="mini-list">${c.features.slice(0, 3).map(f => `<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>
      <span class="more">Detayları Gör ${icon('arrow')}</span></div>
    </a>`;
  }).join('');

  const steps = [
    ['İhbar & Konum', 'Aradığınızda araç tipini, konumunuzu ve gideceğiniz yeri söylersiniz; fiyat telefonda netleşir.'],
    ['10-15 Dk Varış', 'Size en yakın nöbetçi çekici hemen yola çıkar. WhatsApp\'tan canlı konum paylaşabilirsiniz.'],
    ['Hasarsız Yükleme', 'Araç vinçle ya da eğimli kasayla yüklenir, kayışlarla dört noktadan sabitlenir.'],
    ['Servise Teslim', 'Aracınızı belirttiğiniz servise, eve ya da otoparka bırakıp faturanızı veririz.']
  ].map((s, i) => `<li><span class="num">${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('');

  const filterBtns = CATEGORIES.map((c, i) => `<button type="button" class="chip${i === 0 ? ' on' : ''}" data-filter="${c.id}">${esc(c.label)}</button>`).join('');
  const regionCards = REGIONS.map(r => P.regionCard(r, regionContent[r.slug])).join('');

  const why = [
    ['clock', 'Hızlı İntikal', 'Bağcılar içinde nöbetçi araçlar farklı noktalarda bekler; en yakın ekip yönlendirilir.'],
    ['shield', '%100 Taşıma Kaskosu', 'Taşıma sırasında aracınız teminat altındadır.'],
    ['tag', 'Telefonda Sabit Fiyat', 'Çekici yola çıkmadan fiyat söylenir, yüklemeden sonra değişmez.'],
    ['truck', 'Sıfır Hasarlı Kayar Kasa', 'Tekerlek sürümeden, aracı kasaya alarak taşıyoruz.'],
    ['users', '7/24 Nöbetçi Ekip', 'Gece, hafta sonu ve bayramda da aynı hat açıktır.'],
    ['receipt', 'Fatura & Mobil POS', 'Nakit, havale ya da kartla ödeme; isteyene fatura.']
  ].map(w => `<li><span class="why-ic">${icon(w[0])}</span><div><h3>${w[1]}</h3><p>${w[2]}</p></div></li>`).join('');

  const gallery = GALLERY.slice(0, 8).map(g => `<button type="button" class="g-item" data-lightbox="/images/${g[0]}.webp" data-alt="${esc(g[1])}"><img src="/images/${g[0]}.webp" width="720" height="960" alt="${esc(g[1])}" loading="lazy" decoding="async"></button>`).join('');

  const reviews = [
    ['Mehmet K.', 'Bağcılar', 'Akşam trafiğinde aracım yolda durdu. Aradıktan kısa süre sonra geldiler, aracı kasaya alıp servise götürdüler. Telefonda söylenen fiyat aynen çıktı.'],
    ['Seda A.', 'Başakşehir', 'Otomatik vitesli arabam için tekerlek sürümeden kasaya aldılar. Çekici şoförü bağlama işini tek tek anlattı.'],
    ['Ercan T.', 'İkitelli', 'Sanayide ticari aracımız arıza yaptı. Kamyonet kasasıyla gelip aynı gün servise teslim ettiler, fatura da verdiler.']
  ].map(r => `<figure class="review"><div class="stars" aria-label="5 yıldız">${icon('star')}${icon('star')}${icon('star')}${icon('star')}${icon('star')}</div><blockquote>${r[2]}</blockquote><figcaption><strong>${r[0]}</strong> · ${r[1]}</figcaption></figure>`).join('');

  const blogCards = posts.slice(0, 3).map(p => `<a class="blog-card" href="${p.url}"><img src="/images/${p.cover}" width="720" height="960" alt="${esc(p.title)}" loading="lazy" decoding="async"><div><span class="meta">${dateTr(p.date)} · ${p.readMinutes} dk okuma</span><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></div></a>`).join('');

  const main = `
<section class="hero hero-home">
  <div class="container hero-grid">
    <div class="hero-copy">
      <span class="eta-badge"><span class="pulse-dot"></span>Bağcılar'da ortalama varış ${BUSINESS.etaMinutes}</span>
      <h1>Bağcılar Çekici: 7/24 Oto Çekici &amp; Yol Yardım</h1>
      <p class="lead">Kayar kasa çekici, oto kurtarma ve akü takviye. Bağcılar'dan Esenler, Başakşehir ve İkitelli'ye kadar nöbetçi ekibimiz hazır; fiyatı çekici yola çıkmadan telefonda söyleriz.</p>
      ${ctaButtons(null)}
      ${statsRow()}
    </div>
    <div class="hero-photo">
      ${picture({ desktop: hero.desktop, mobile: hero.mobile, alt: 'Bağcılar oto çekici kayar kasa ile aracı yüklüyor', eager: true })}
      <span class="photo-badge"><b>15 Dk</b> Varış</span>
    </div>
  </div>
  <div class="container quote-strip">
    <strong>Hızlı fiyat al</strong>
    ${P.waQuoteForm(null, { className: 'quote-form quote-inline', id: 'qh' })}
  </div>
</section>

<section class="section" id="hizmetler"><div class="container">
  <div class="sec-head"><h2>Hizmetlerimiz</h2><p>Yolda kalan araca göre doğru ekipmanla gelir; her hizmetin detay sayfasında teknik bilgi ve sıkça sorulanlar var.</p></div>
  <div class="svc-grid">${services}</div>
</div></section>

<section class="section alt" id="nasil-calisiyoruz"><div class="container">
  <div class="sec-head"><h2>Nasıl Çalışıyoruz?</h2><p>İhbardan teslime kadar dört adım. Her aşamada ne olacağını önceden biliyorsunuz.</p></div>
  <ol class="steps-flow">${steps}</ol>
</div></section>

<section class="section" id="bolgeler"><div class="container">
  <div class="sec-head"><h2>Hizmet Bölgelerimiz</h2><p>${REGIONS.length} bölgede nöbetçi ekip. Bağcılar merkezden yola çıkıyor, komşu ilçelere doğrudan ulaşıyoruz.</p></div>
  <div class="chips" role="group" aria-label="Bölge filtresi">${filterBtns}</div>
  <div class="region-grid">${regionCards}</div>
  <p class="center"><a class="btn btn-outline" href="/bolgeler/">Tüm Bölgeleri Gör ${icon('arrow')}</a></p>
</div></section>

<section class="section alt" id="neden-biz"><div class="container why-grid">
  <div class="why-photo">
    ${picture({ desktop: 'luks-arac-cekici-1.webp', alt: 'Bağcılar çekici filosundan kayar kasa araç taşıma', w: 720, h: 960 })}
    <div class="why-stat"><strong>7/24</strong><span>Nöbetçi ekip, yılın her günü</span></div>
  </div>
  <div><div class="sec-head left"><h2>Neden ${esc(BUSINESS.name)}?</h2><p>Yolda kalmışken ihtiyacınız olan üç şey: hızlı gelen ekip, söylendiği gibi çıkan fiyat ve araca zarar vermeyen taşıma.</p></div>
  <ul class="why-list">${why}</ul></div>
</div></section>

<section class="section" id="galeri"><div class="container">
  <div class="sec-head"><h2>Gerçek Saha Operasyonları</h2><p>Kendi çekicilerimizle, kendi sahamızda çekilmiş operasyon kareleri.</p></div>
  <div class="gallery-grid">${gallery}</div>
  <p class="center"><a class="btn btn-outline" href="/galeri.html">Galerinin Tamamı ${icon('arrow')}</a></p>
</div></section>

<section class="section alt" id="yorumlar"><div class="container">
  <div class="sec-head"><h2>Müşteri Yorumları</h2><p>Google puanımız ${BUSINESS.rating.value} / 5. Aşağıda bölgelerden gelen geri bildirimlerden örnekler yer alıyor.</p></div>
  <div class="review-grid">${reviews}</div>
</div></section>

<section class="section" id="blog"><div class="container">
  <div class="sec-head"><h2>Sürücü Rehberi</h2><p>Çekici çağırmadan önce bilmeniz gerekenler: fiyat, akü, elektrikli araç taşıma ve otoyol güvenliği.</p></div>
  <div class="blog-grid">${blogCards}</div>
  <p class="center"><a class="btn btn-outline" href="/blog/">Tüm Yazılar ${icon('arrow')}</a></p>
</div></section>

<section class="section alt" id="sss"><div class="container narrow">${P.faqBlock(faqs)}</div></section>

<section class="section" id="iletisim"><div class="container contact-grid">
  <div>
    <h2>İletişim &amp; Harita</h2>
    <ul class="contact-list">
      <li>${icon('phone')}<div><strong>Telefon / WhatsApp</strong><a href="${telLink()}" data-track="call">${BUSINESS.phoneDisplay}</a></div></li>
      <li>${icon('clock')}<div><strong>Çalışma Saatleri</strong><span>${BUSINESS.hours}</span></div></li>
      <li>${icon('pin')}<div><strong>Merkez</strong><span>Bağcılar, İstanbul (Avrupa Yakası)</span></div></li>
    </ul>
    ${ctaButtons(null)}
  </div>
  <div class="map-box"><iframe title="Bağcılar harita" src="https://www.google.com/maps?q=Ba%C4%9Fc%C4%B1lar%2C%20%C4%B0stanbul&output=embed" width="600" height="380" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>
${ctaBand('Aracınız yolda mı kaldı?', 'Şimdi arayın; konumunuzu alıp en yakın nöbetçi çekiciyi yönlendirelim.')}
`;

  const schemas = [P.orgSchema(), P.breadcrumbSchema([['Ana Sayfa', '/']]), P.faqSchema(faqs)];
  write('index.html', P.page({ headHtml: P.head({ title, description, path: '/', schema: schemas, hero }), ctx: { active: 'home' }, main }));
}

/* =============== BÖLGELER =============== */
function buildRegionPages() {
  REGIONS.forEach((r, idx) => {
    const c = regionContent[r.slug];
    const hero = { mobile: r.hero + '-m.webp', desktop: r.hero + '.webp' };
    const h1 = c.h1 || `${r.fullName} Çekici & 7/24 ${r.fullName} Oto Kurtarma | En Yakın Oto Çekici`;
    const crumbs = [['Ana Sayfa', '/'], ['Hizmet Bölgeleri', '/bolgeler/'], [r.name, r.url]];
    const fieldImg = GALLERY[(idx * 5 + 2) % GALLERY.length];
    const nearby = (c.nearby || []).map(getRegion).filter(Boolean);

    const badges = [
      ['clock', 'Ortalama Varış', BUSINESS.etaMinutes],
      ['shield', 'Taşıma Kaskosu', '%100 teminat'],
      ['tag', 'Fiyat', 'Telefonda net'],
      ['truck', 'Aparatlı Yükleme', 'Sıfır hasar'],
      ['users', 'Nöbetçi Filo', '7/24 hazır']
    ].map(b => `<li>${icon(b[0])}<span><small>${b[1]}</small><b>${b[2]}</b></span></li>`).join('');

    const steps = c.steps.map((s, i) => `<li><span class="num">${i + 1}</span><div><h3>${esc(s.title)}</h3><p>${s.text}</p></div></li>`).join('');
    const vehicles = c.vehicles.map(v => `<tr><th scope="row">${esc(v.type)}</th><td>${v.note}</td></tr>`).join('');

    const main = `
<section class="hero hero-section hero-region">
  <div class="hero-grid-r">
    <div class="hero-photo">
      ${picture({ desktop: hero.desktop, mobile: hero.mobile, alt: `${r.fullName} çekici kayar kasa ile araç yüklüyor - ${BUSINESS.name}`, eager: true })}
    </div>
    <div class="hero-copy">
      ${P.breadcrumbHtml(crumbs)}
      <span class="eta-badge"><span class="pulse-dot"></span>${esc(r.fullName)} ve çevresinde ortalama varış süremiz 10–15 dakika!</span>
      <h1>${esc(h1)}</h1>
      <p class="lead">${esc(c.lead)}</p>
      ${ctaButtons(r)}
      ${statsRow()}
      <details class="quote-details"><summary>${icon('whatsapp')}<span>Hızlı WhatsApp Fiyat Formu</span>${icon('chevron')}</summary>${P.waQuoteForm(r, { id: 'qr' })}</details>
    </div>
  </div>
</section>
<section class="assure"><div class="container"><ul>${badges}</ul></div></section>

<div class="container content-grid">
  <article class="prose">
    <div class="focus-box"><strong>${esc(r.name)} çevresinde hizmet verdiğimiz noktalar</strong><ul class="chips-static">${c.focus.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>
    ${c.sections.map(s => P.sectionBlock(s)).join('\n')}

    <section class="prose-sec"><h2>${esc(r.name)}'de çekici nasıl ilerliyor?</h2><ol class="steps-v">${steps}</ol></section>

    <section class="prose-sec"><h2>Taşıdığımız araç tipleri</h2>
      <div class="table-wrap"><table class="vehicle-table"><tbody>${vehicles}</tbody></table></div>
    </section>

    <figure class="field">
      <img src="/images/${fieldImg[0]}.webp" width="720" height="960" alt="${esc(fieldImg[1])}" loading="lazy" decoding="async">
      <figcaption><strong>${esc(c.fieldNote.title)}</strong><p>${c.fieldNote.text}</p></figcaption>
    </figure>

    ${P.faqBlock(c.faqs, `${r.name} çekici hakkında sık sorulanlar`)}
  </article>
  <aside class="side-card">
    <h2>${esc(r.name)} nöbetçi çekici</h2>
    <p>Aracınız yolda mı kaldı? Konumunuzu söyleyin, en yakın ekip yola çıksın.</p>
    ${ctaButtons(r)}
    <ul class="side-points"><li>${icon('check')}Fiyat yola çıkmadan telefonda net</li><li>${icon('check')}Kayar kasa, araca zarar yok</li><li>${icon('check')}7/24 nöbetçi ekip</li></ul>
  </aside>
</div>

<section class="section alt"><div class="container">
  <div class="sec-head"><h2>Yakın hizmet bölgelerimiz</h2><p>${esc(r.name)} dışında bu noktalara da doğrudan çekici gönderiyoruz.</p></div>
  <div class="region-grid">${nearby.map(n => P.regionCard(n, regionContent[n.slug])).join('')}</div>
</div></section>
${ctaBand(`${r.name} çevresinde yolda mı kaldınız?`, 'Arayın ya da WhatsApp konumunuzu gönderin, en yakın çekiciyi yönlendirelim.')}
`;

    const title = c.metaTitle;
    const schema = [
      P.orgSchema({ name: `${BUSINESS.name} - ${r.fullName}`, url: P.url(r.url), geo: { '@type': 'GeoCoordinates', latitude: r.geo[0], longitude: r.geo[1] },
        areaServed: { '@type': 'AdministrativeArea', name: r.fullName }, address: { '@type': 'PostalAddress', addressLocality: r.name, addressRegion: 'İstanbul', addressCountry: 'TR' } }),
      P.breadcrumbSchema(crumbs), P.faqSchema(c.faqs)
    ];
    write(`bolgeler/${r.file}`, P.page({ headHtml: P.head({ title, description: c.metaDescription, path: r.url, schema, hero }), ctx: { active: 'regions' }, main, region: r }));
  });

  // Dizin
  const filterBtns = CATEGORIES.map((c, i) => `<button type="button" class="chip${i === 0 ? ' on' : ''}" data-filter="${c.id}">${esc(c.label)}</button>`).join('');
  const crumbs = [['Ana Sayfa', '/'], ['Hizmet Bölgeleri', '/bolgeler/']];

  const regionSteps = [
    ['Konum & Bölge Tespiti', 'Aradığınızda bulunduğunuz cadde, mahalle veya kavşağı bildirirsiniz; nöbetçi çekici ekibimiz lokasyonunuzu anında teyit eder.'],
    ['10-15 Dk Hızlı İntikal', 'Bağcılar arterlerinde bekleyen en yakın kayar kasa çekicimiz trafik durumuna göre 10-15 dakikada yanınıza ulaşır.'],
    ['Kaskolu & Hasarsız Yükleme', 'Aracınız hidrolik platforma sıfır sürtmeyle yüklenir ve 4 noktadan profesyonel kayışlarla kasaya sabitlenir.'],
    ['Servise Güvenli Teslimat', 'Aracınız dilediğiniz servise ya da adrese hasarsız ulaştırılır; mobil POS ile ödeme alınıp fatura teslim edilir.']
  ].map((s, i) => `<li><span class="num">${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('');

  const regionWhy = [
    ['clock', 'Yerel Nöbetçi Filo', 'Bağcılar mahalleleri, İkitelli ve Mahmutbey çevresinde 7/24 hazır bekleyen çekiciler.'],
    ['shield', '%100 Taşıma Kaskosu', 'Aracınız çekici kasasına girdiği andan teslimata kadar tam kapsamlı kasko teminatındadır.'],
    ['tag', 'Telefonda Sabit Fiyat', 'Araç tipini ve mesafeyi öğrendikten sonra net fiyat veririz; sonradan ek ücret talep edilmez.'],
    ['truck', 'Sıfır Eğimli Kayar Kasa', 'Alçak spor araçlar, lüks sedanlar ve elektrikli modeller için tampon korumalı yükleme.'],
    ['route', 'Otoyol & Arter Hakimiyeti', 'TEM, Basın Ekspres ve E-5 bağlantılarını iyi bilen yerel operatörlerle hızlı intikal.'],
    ['receipt', 'Mobil POS & Resmi Fatura', 'Yerinde kredi kartı ile tahsilat ve kurumsal şirketler için KDV\'li fatura.']
  ].map(w => `<li><span class="why-ic">${icon(w[0])}</span><div><h3>${w[1]}</h3><p>${w[2]}</p></div></li>`).join('');

  const regionGallery = GALLERY.slice(0, 8).map(g => `<button type="button" class="g-item" data-lightbox="/images/${g[0]}.webp" data-alt="${esc(g[1])}"><img src="/images/${g[0]}.webp" width="720" height="960" alt="${esc(g[1])}" loading="lazy" decoding="async"></button>`).join('');

  const regionFaqs = [
    { q: 'Bağcılar dışındaki komşu ilçelere de çekici gönderiyor musunuz?', a: 'Evet. Bağcılar merkezli ekibimiz Esenler, Başakşehir, Bahçelievler, Küçükçekmece, Merter, İkitelli ve İSTOÇ başta olmak üzere tüm Avrupa Yakası\'na 7/24 çekici yönlendirmektedir.' },
    { q: 'Çekiciniz aracıma ortalama kaç dakikada ulaşır?', a: 'Bağcılar ve çevresinde ortalama varış süremiz 10 ila 15 dakikadır. Çağrı anında trafik yoğunluğu analiz edilerek net varış süresi telefonda tarafınıza bildirilir.' },
    { q: 'Otoyol veya bağlantı yollarında kaldığımda nasıl konum gönderebilirim?', a: 'Web sitemizdeki WhatsApp Konum Gönder butonuna basarak doğrudan bize canlı konum atabilirsiniz. Operatörümüz en yakın çıkış veya kavşak üzerinden çekiciyi sevk eder.' },
    { q: 'Gece saatlerinde veya resmi tatillerde fiyat farkı uygulanır mı?', a: 'Hayır. 7 gün 24 saat kesintisiz nöbetçi sistemimizle sabit ve şeffaf fiyat politikamız geçerlidir; telefonda teyit edilen ücret dışında ek masraf çıkmaz.' },
    { q: 'Kapalı otoparkta kalan araç için kurtarıcı çağırabilir miyim?', a: 'Evet. Rezidans ve AVM otoparklarına giriş yapabilen alçak kabinli kurtarıcı araçlarımızla kapalı garajlardaki araçları da güvenle çıkarıyoruz.' }
  ];

  const main = `
<section class="page-hero"><div class="container">
  ${P.breadcrumbHtml(crumbs)}
  <h1>Hizmet Bölgelerimiz: ${REGIONS.length} Bölgede 7/24 Oto Çekici</h1>
  <p class="lead">Bağcılar merkezli nöbetçi çekici ekibimiz; Bağcılar mahallelerine, Esenler, Başakşehir, Küçükçekmece, Bahçelievler, Merter hattına ve İSTOÇ, İkitelli, Tekstilkent gibi sanayi bölgelerine doğrudan ulaşır.</p>
  ${ctaButtons(null)}
</div></section>
<section class="section"><div class="container">
  <div class="chips" role="group" aria-label="Bölge filtresi">${filterBtns}</div>
  <div class="region-grid">${REGIONS.map(r => P.regionCard(r, regionContent[r.slug])).join('')}</div>
</div></section>
<section class="section alt" id="nasil-calisiyoruz"><div class="container">
  <div class="sec-head"><h2>Nasıl Çalışıyoruz? 4 Adımlı Bölgesel İntikal</h2><p>Bölgenize en yakın çekiciyi hızla yönlendirip aracınızı güvenle teslim ediyoruz.</p></div>
  <ol class="steps-flow">${regionSteps}</ol>
</div></section>
<section class="section" id="neden-biz"><div class="container why-grid">
  <div class="why-photo">
    ${picture({ desktop: 'otomobil-cekici-2.webp', alt: 'Bağcılar ve çevre bölgelerde nöbetçi oto çekici filosu', w: 720, h: 960 })}
    <div class="why-stat"><strong>10-15 Dk</strong><span>Ortalama Bölgesel Varış</span></div>
  </div>
  <div>
    <div class="sec-head left"><h2>Neden ${esc(BUSINESS.name)}?</h2><p>Bölge genelinde geniş araç ağımız ve kurumsal standartlarımızla yanınızdayız.</p></div>
    <ul class="why-list">${regionWhy}</ul>
  </div>
</div></section>
<section class="section alt" id="galeri"><div class="container">
  <div class="sec-head"><h2>Gerçek Saha Operasyonları</h2><p>Hizmet bölgelerimizden gerçek araç taşıma ve kurtarma anları.</p></div>
  <div class="gallery-grid">${regionGallery}</div>
  <p class="center" style="margin-top:1.5rem;"><a class="btn btn-outline" href="/galeri.html">Tüm Galeriyi İncele ${icon('arrow')}</a></p>
</div></section>
<section class="section" id="sss"><div class="container narrow">${P.faqBlock(regionFaqs, 'Bölge Hizmetleri Hakkında Sıkça Sorulan Sorular')}</div></section>
${ctaBand('Bölgeniz listede yok mu?', 'Yakın noktalara da gidiyoruz; konumunuzu söyleyin, uygun ekibi yönlendirelim.')}
`;
  write('bolgeler/index.html', P.page({
    headHtml: P.head({ title: 'Bağcılar ve Çevresi Çekici Hizmet Bölgeleri | 7/24', description: 'Bağcılar, Esenler, Başakşehir, İkitelli, Bahçelievler, Merter ve İSTOÇ dahil 15 bölgede 7/24 oto çekici. Bölgenizi seçin, ekibimizi hemen yönlendirelim.', path: '/bolgeler/', schema: [P.breadcrumbSchema(crumbs), P.faqSchema(regionFaqs)] }),
    ctx: { active: 'regions' }, main
  }));
}

/* =============== HİZMETLER =============== */
function buildServicePages() {
  SERVICES.forEach(s => {
    const c = serviceContent[s.slug];
    const crumbs = [['Ana Sayfa', '/'], ['Hizmetler', '/hizmetler/'], [s.name, s.url]];
    const rel = (c.relatedRegions || []).map(getRegion).filter(Boolean);
    const steps = c.steps.map((st, i) => `<li><span class="num">${i + 1}</span><div><h3>${esc(st.title)}</h3><p>${st.text}</p></div></li>`).join('');
    const others = SERVICES.filter(o => o.slug !== s.slug).slice(0, 4);
    const main = `
<section class="page-hero has-photo"><div class="container hero-split">
  <div>
    ${P.breadcrumbHtml(crumbs)}
    <h1>${esc(c.h1)}</h1>
    <p class="lead">${esc(c.lead)}</p>
    ${ctaButtons(null)}
    <ul class="feat-pills">${c.features.map(f => `<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>
  </div>
  <div class="hero-photo small">${picture({ desktop: s.image + '.webp', alt: `${s.name} hizmeti - ${BUSINESS.name}`, eager: true })}</div>
</div></section>
<div class="container content-grid">
  <article class="prose">
    ${c.sections.map(x => P.sectionBlock(x)).join('\n')}
    <section class="prose-sec"><h2>Adım adım nasıl yapıyoruz?</h2><ol class="steps-v">${steps}</ol></section>
    ${P.faqBlock(c.faqs, `${s.short} hakkında sık sorulanlar`)}
  </article>
  <aside class="side-card">
    <h2>${esc(s.short)} için arayın</h2>
    <p>Aracınızın tipini ve konumunuzu söyleyin; fiyat telefonda netleşir.</p>
    ${ctaButtons(null)}
    <h3 class="side-sub">Diğer hizmetler</h3>
    <ul class="side-links">${others.map(o => `<li><a href="${o.url}">${esc(o.name)}</a></li>`).join('')}</ul>
  </aside>
</div>
<section class="section alt"><div class="container">
  <div class="sec-head"><h2>${esc(s.short)} hizmeti verdiğimiz bölgeler</h2><p>Bu hizmeti aşağıdaki bölgelere doğrudan gönderiyoruz.</p></div>
  <div class="region-grid">${rel.map(n => P.regionCard(n, regionContent[n.slug])).join('')}</div>
</div></section>
${ctaBand(`${s.short} ihtiyacınız mı var?`, 'Arayın, ekibimiz konumunuza yönlensin.')}
`;
    const schema = [P.orgSchema(), P.breadcrumbSchema(crumbs), P.faqSchema(c.faqs),
      { '@context': 'https://schema.org', '@type': 'Service', name: s.name, provider: { '@id': P.url('/#business') }, areaServed: 'Bağcılar, İstanbul', url: P.url(s.url) }];
    write(`hizmetler/${s.file}`, P.page({ headHtml: P.head({ title: c.metaTitle, description: c.metaDescription, path: s.url, schema, hero: null }), ctx: { active: 'services' }, main }));
  });

  const crumbs = [['Ana Sayfa', '/'], ['Hizmetler', '/hizmetler/']];
  const cards = SERVICES.map(s => {
    const c = serviceContent[s.slug];
    return `<a class="svc-card" href="${s.url}"><div class="svc-img">${picture({ desktop: s.image + '.webp', alt: `${s.name} - ${BUSINESS.name}` })}</div><div class="svc-body"><span class="svc-ic">${icon(s.icon)}</span><h2>${esc(s.name)}</h2><p>${esc(c.excerpt)}</p><span class="more">Detayları Gör ${icon('arrow')}</span></div></a>`;
  }).join('');

  const serviceSteps = [
    ['İhtiyaç Analizi & Doğru Donanım', 'Arıza, kaza, akü bitmesi ya da kapalı otopark durumunuza göre en uygun çekici aracı ve ekipman belirlenir.'],
    ['En Yakın Ekibin Sevki', 'Donanımlı nöbetçi aracımız bulunduğunuz lokasyona vakit kaybetmeden sevk edilir.'],
    ['Güvenli Yükleme & Yerinde Destek', 'Akü takviyesi yerinde tamamlanır; çekilecek araçlar 4 noktadan lashing kayışlarıyla kasaya sabitlenir.'],
    ['Adrese Teslim & Resmi Belgeleme', 'Aracınız yetkili servise ya da belirttiğiniz adrese güvenle indirilir; teslim tutanağı ve faturası verilir.']
  ].map((s, i) => `<li><span class="num">${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('');

  const serviceWhy = [
    ['truck', 'Hidrolik Sıfır Eğim Platform', 'Tampon ve karter sürtmelerini engelleyen hidrolik kayar kasa sistemi.'],
    ['bolt', 'Akım Korumalı Dijital Booster', 'Araç beyin ve elektronik aksamını koruyan 12V/24V regüleli profesyonel takviye.'],
    ['park', 'Alçak Tavan Kapalı Otopark Aracı', '1.95m tavan yüksekliğine sahip AVM ve rezidans otoparklarına uygun kurtarıcı.'],
    ['shield', '%100 Taşıma & Emtia Kaskosu', 'Taşınan her araç yasal nakliye sigortası teminatı altında güvenle nakledilir.'],
    ['tag', 'Telefonda Sabit Fiyat Güvencesi', 'Yola çıkmadan önce net fiyat verilir, varışta veya yükleme sonrası ek maliyet çıkarılmaz.'],
    ['receipt', 'Mobil POS & Kurumsal Fatura', 'Kredi kartı veya havale ile ödeme kolaylığı, şirket araçları için KDV\'li fatura.']
  ].map(w => `<li><span class="why-ic">${icon(w[0])}</span><div><h3>${w[1]}</h3><p>${w[2]}</p></div></li>`).join('');

  const serviceGallery = GALLERY.slice(0, 8).map(g => `<button type="button" class="g-item" data-lightbox="/images/${g[0]}.webp" data-alt="${esc(g[1])}"><img src="/images/${g[0]}.webp" width="720" height="960" alt="${esc(g[1])}" loading="lazy" decoding="async"></button>`).join('');

  const serviceFaqs = [
    { q: 'Aracıma hangi hizmetin uygun olduğunu nasıl belirliyorsunuz?', a: 'Çağrı merkezimizi aradığınızda araç modeli, şanzıman tipi, yürür durumu ve bulunduğu zemin bilgisi alınarak hidrolik kayar kasa, ahtapot vinç ya da yerinde müdahale aracı seçilir.' },
    { q: 'Otomatik vitesli ve elektrikli araçlar nasıl çekilir?', a: 'Otomatik vites ve elektrikli araçlar kesinlikle tekerlekleri dönerek çekilmez. Hidrolik kayar kasaya vinç yardımıyla veya tekerlek patenleriyle tamamen yüklenerek taşınır.' },
    { q: 'Yerinde akü takviyesi aracımın beynine zarar verir mi?', a: 'Hayır. Ekiplerimiz amatör kablolar yerine voltaj regülatörlü dijital booster cihazları kullanır; pik akım koruması sayesinde araç beyni korunur.' },
    { q: 'Şehirlerarası oto çekici ve araç taşıma yapıyor musunuz?', a: 'Evet. İstanbul içi operasyonların yanı sıra Türkiye\'nin tüm illerine çift yönlü, sigortalı ve kaskolu araç taşıma hizmeti sağlıyoruz.' },
    { q: 'Hizmet bedelini kredi kartı ile ödeyebilir miyim?', a: 'Evet. Araçlarımızda mobil POS cihazı bulunmaktadır. Kredi kartı, banka kartı, havale ya da nakit ile ödeme yapabilirsiniz.' }
  ];

  const main = `
<section class="page-hero"><div class="container">
  ${P.breadcrumbHtml(crumbs)}
  <h1>Oto Çekici &amp; Yol Yardım Hizmetlerimiz</h1>
  <p class="lead">Kayar kasa çekiciden akü takviyeye, kapalı otopark kurtarmadan şehirlerarası araç taşımaya kadar dokuz hizmet. Her biri için ayrı ekipman ve ayrı bir iş akışı var.</p>
  ${ctaButtons(null)}
</div></section>
<section class="section"><div class="container"><div class="svc-grid">${cards}</div></div></section>
<section class="section alt" id="nasil-calisiyoruz"><div class="container">
  <div class="sec-head"><h2>Nasıl Çalışıyoruz? Hizmet İşleyiş Adımları</h2><p>İhtiyacınıza en uygun ekipmanı dakikalar içinde kapınıza getiriyoruz.</p></div>
  <ol class="steps-flow">${serviceSteps}</ol>
</div></section>
<section class="section" id="neden-biz"><div class="container why-grid">
  <div class="why-photo">
    ${picture({ desktop: 'kurtarma-vinc.webp', alt: 'Bağcılar Oto Çekici uzman kurtarma ekipmanları', w: 720, h: 960 })}
    <div class="why-stat"><strong>9 Uzman</strong><span>Farklı Hizmet Donanımı</span></div>
  </div>
  <div>
    <div class="sec-head left"><h2>Neden ${esc(BUSINESS.name)}?</h2><p>Geniş filo altyapımız ve uzman operatörlerimizle kaliteli hizmet sunuyoruz.</p></div>
    <ul class="why-list">${serviceWhy}</ul>
  </div>
</div></section>
<section class="section alt" id="galeri"><div class="container">
  <div class="sec-head"><h2>Gerçek Saha Operasyonları</h2><p>Farklı araç tiplerinde gerçekleştirdiğimiz saha çalışmalarından görüntüler.</p></div>
  <div class="gallery-grid">${serviceGallery}</div>
  <p class="center" style="margin-top:1.5rem;"><a class="btn btn-outline" href="/galeri.html">Tüm Galeriyi İncele ${icon('arrow')}</a></p>
</div></section>
<section class="section" id="sss"><div class="container narrow">${P.faqBlock(serviceFaqs, 'Hizmetlerimiz Hakkında Sıkça Sorulan Sorular')}</div></section>
${ctaBand('Hangi hizmet gerekiyor emin değil misiniz?', 'Durumu anlatın, size doğru ekipmanı biz seçelim.')}
`;
  write('hizmetler/index.html', P.page({
    headHtml: P.head({ title: 'Oto Çekici ve Yol Yardım Hizmetleri | Bağcılar 7/24', description: 'Bağcılar kayar kasa oto çekici, oto kurtarma, akü takviye, lastik yardım, motosiklet ve ticari araç çekici. Tüm hizmetler 7/24, fiyat telefonda net.', path: '/hizmetler/', schema: [P.breadcrumbSchema(crumbs), P.faqSchema(serviceFaqs)] }),
    ctx: { active: 'services' }, main
  }));
}

/* =============== BLOG =============== */
function buildBlog() {
  posts.forEach(p => {
    const crumbs = [['Ana Sayfa', '/'], ['Blog', '/blog/'], [p.title, p.url]];
    const toc = p.sections.map(s => `<li><a href="#${esc(s.id)}">${esc(s.h2)}</a></li>`).join('');
    const rs = (p.relatedServices || []).map(getService).filter(Boolean);
    const rr = (p.relatedRegions || []).map(getRegion).filter(Boolean);
    const main = `
<section class="page-hero blog-hero"><div class="container narrow">
  ${P.breadcrumbHtml(crumbs)}
  <h1>${esc(p.title)}</h1>
  <p class="meta">${icon('calendar')}${dateTr(p.date)} · ${p.readMinutes} dk okuma · ${esc(BUSINESS.name)}</p>
</div></section>
<div class="container narrow article">
  <img class="cover" src="/images/${p.cover}" width="720" height="960" alt="${esc(p.title)}" fetchpriority="high" loading="eager" decoding="async">
  <div class="prose">
    ${P.paras(p.intro)}
    <nav class="toc" aria-label="İçindekiler"><strong>${icon('list')}İçindekiler</strong><ol>${toc}</ol></nav>
    ${p.sections.map(s => P.sectionBlock(s)).join('\n')}
    ${P.faqBlock(p.faqs, 'Sık sorulan sorular')}
    <section class="related"><h2>İlgili sayfalar</h2>
      <ul class="side-links">${rs.map(x => `<li><a href="${x.url}">${esc(x.name)}</a></li>`).join('')}${rr.map(x => `<li><a href="${x.url}">${esc(x.name)} Oto Çekici</a></li>`).join('')}</ul>
    </section>
  </div>
</div>
${ctaBand('Çekiciye mi ihtiyacınız var?', 'Arayın ya da WhatsApp\'tan konum gönderin.')}
`;
    const schema = [P.breadcrumbSchema(crumbs), P.faqSchema(p.faqs), {
      '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.metaDescription,
      image: P.url('/images/' + p.cover), datePublished: p.date, dateModified: p.date,
      author: { '@type': 'Organization', name: BUSINESS.name }, publisher: { '@type': 'Organization', name: BUSINESS.name },
      mainEntityOfPage: P.url(p.url)
    }];
    write(`blog/${p.file}`, P.page({ headHtml: P.head({ title: p.metaTitle, description: p.metaDescription, path: p.url, schema, ogImage: p.cover }), ctx: { active: 'blog' }, main }));
  });

  const crumbs = [['Ana Sayfa', '/'], ['Blog', '/blog/']];
  const cards = posts.map(p => `<a class="blog-card" href="${p.url}"><img src="/images/${p.cover}" width="720" height="960" alt="${esc(p.title)}" loading="lazy" decoding="async"><div><span class="meta">${dateTr(p.date)} · ${p.readMinutes} dk okuma</span><h2>${esc(p.title)}</h2><p>${esc(p.excerpt)}</p></div></a>`).join('');

  const blogSteps = [
    ['Dörtlüleri Yakın ve Sağ Şeride Geçin', 'Aracınız arızalandığında panik yapmadan sağ şeride veya emniyet şeridine yanaşın, dörtlü flaşörleri açın.'],
    ['İkaz Reflektörünü Doğru Mesafeye Koyun', 'Şehir içinde 30 metre, otoyolda en az 100-150 metre geriye reflektör yerleştirerek arkadan gelen araçları uyarın.'],
    ['Can Güvenliğini Sağlayıp Bariyer Arkasına Geçin', 'Araç içinde oturmayın; tüm yolcuları çelik bariyerlerin arkasına alarak güvenli alanda bekleyin.'],
    ['Canlı Konum ile Çekici Çağırın', '0545 256 55 20 numaramızı arayarak durumu bildirin ve WhatsApp üzerinden canlı konum gönderin.']
  ].map((s, i) => `<li><span class="num">${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('');

  const blogWhy = [
    ['bulb', 'Gerçek Saha Deneyimi', 'Yılların kurtarma tecrübesiyle hazırlanan, sürücülere yolda rehberlik eden pratik bilgiler.'],
    ['alert', 'Doğru Bilinen Yanlışlar', 'Akü takviyesi ve otomatik vites çekiminde sık yapılan ve masraf açan hataların analizi.'],
    ['route', 'Otoyol Emniyet Kuralları', 'Basın Ekspres ve TEM otoyolu gibi yoğun yollarda hayat kurtaran güvenlik adımları.'],
    ['tag', 'Fiyat ve Hak Bilinci', 'Çekici çağırırken dikkat edilmesi gereken tarife ve fatura standartları rehberi.'],
    ['shield', 'Kaza ve Sigorta Rehberi', 'Kaza tespit tutanağı doldururken yapılan eksiklikler ve kasko hakları hakkında tavsiyeler.'],
    ['phone', '7/24 Kesintisiz Telefon Danışmanlığı', 'Yolda kaldığınızda teknik destek ve doğru yönlendirme için günün her saati arayabilirsiniz.']
  ].map(w => `<li><span class="why-ic">${icon(w[0])}</span><div><h3>${w[1]}</h3><p>${w[2]}</p></div></li>`).join('');

  const blogFaqs = [
    { q: 'Otoyolda aracım bozulduğunda ilk ne yapmalıyım?', a: 'Dörtlü flaşörleri yakın, aracı emniyet şeridine çekin, reflektörü en az 100 metre geriye koyun ve tüm yolcularla birlikte çelik bariyerin arkasında bekleyin.' },
    { q: 'WhatsApp\'tan çekiciye canlı konum nasıl atılır?', a: 'WhatsApp sohbetinde ataş simgesine (iPhone\'da + simgesine) basıp \'Konum\' ve \'Mevcut Konumu Paylaş\' seçeneğini seçerek net koordinatınızı paylaşabilirsiniz.' },
    { q: 'Otomatik vitesli arabayı boşa alıp başka araçla çekebilir miyiz?', a: 'Kesinlikle tavsiye edilmez. Otomatik şanzıman pompası çalışmadığı için dişliler yağsız kalır ve yüksek masraflı şanzıman arızası oluşur; kayar kasaya yüklenmelidir.' },
    { q: 'Kaza tutanağı doldururken en sık yapılan hata nedir?', a: 'Kazalı araçların konumunu ve plakalarını gösteren fotoğrafların araçlar kımıldatılmadan önce çekilmemesi ve karşı tarafın ruhsat/sigorta bilgilerinin eksik yazılmasıdır.' }
  ];

  const main = `
<section class="page-hero"><div class="container">
  ${P.breadcrumbHtml(crumbs)}
  <h1>Sürücü Rehberi: Çekici, Akü ve Yol Yardım Yazıları</h1>
  <p class="lead">Çekici çağırmadan önce bilmeniz gerekenleri, sahada gördüğümüz durumlara göre yazdık.</p>
</div></section>
<section class="section"><div class="container"><div class="blog-grid">${cards}</div></div></section>
<section class="section alt" id="guvenlik-rehberi"><div class="container">
  <div class="sec-head"><h2>Yolda Kalınca İlk 5 Dakika Güvenlik Adımları</h2><p>Aracınız arıza yaptığında veya kaza durumunda can güvenliğinizi korumak için izlemeniz gereken adımlar.</p></div>
  <ol class="steps-flow">${blogSteps}</ol>
</div></section>
<section class="section" id="neden-biz"><div class="container why-grid">
  <div class="why-photo">
    ${picture({ desktop: 'e-5-cekici.webp', alt: 'Otoyol çekici ve yol yardım rehberi', w: 720, h: 960 })}
    <div class="why-stat"><strong>12+ Yıl</strong><span>Saha Bilgisi &amp; Uzmanlık</span></div>
  </div>
  <div>
    <div class="sec-head left"><h2>Neden Bizim Rehberlerimiz?</h2><p>Teorik bilgiler yerine sahadan edindiğimiz gerçek deneyimleri paylaşıyoruz.</p></div>
    <ul class="why-list">${blogWhy}</ul>
  </div>
</div></section>
<section class="section alt" id="hizli-rehber"><div class="container">
  <div class="sec-head"><h2>Hızlı Hizmet &amp; Yol Yardım Rehberi</h2><p>Acil ihtiyaç duyabileceğiniz temel kurtarma ve destek hizmetlerimiz.</p></div>
  <div class="svc-grid">
    <a class="svc-card" href="/hizmetler/oto-cekici.html"><div class="svc-body"><h3>${icon('truck')} Kayar Kasa Oto Çekici</h3><p>Binek, SUV ve elektrikli araçlar için sıfır hasarlı taşıma.</p><span class="more">İncele ${icon('arrow')}</span></div></a>
    <a class="svc-card" href="/hizmetler/aku-takviye.html"><div class="svc-body"><h3>${icon('bolt')} Akü Takviye &amp; Yol Yardım</h3><p>12V/24V pik akım korumalı cihazlarla 15 dakikada yerinde takviye.</p><span class="more">İncele ${icon('arrow')}</span></div></a>
    <a class="svc-card" href="/hizmetler/kapali-otopark-cekici.html"><div class="svc-body"><h3>${icon('park')} Kapalı Otopark Çekici</h3><p>AVM ve rezidans otoparkları için alçak tavanlı özel kurtarıcı.</p><span class="more">İncele ${icon('arrow')}</span></div></a>
  </div>
</div></section>
<section class="section" id="sss"><div class="container narrow">${P.faqBlock(blogFaqs, 'Sürücü Rehberi Sıkça Sorulan Sorular')}</div></section>
${ctaBand('Acil yardım mı gerekiyor?', 'Okumayı sonraya bırakın, önce arayın.')}
`;
  write('blog/index.html', P.page({
    headHtml: P.head({ title: 'Çekici ve Yol Yardım Rehberi | Bağcılar Oto Çekici Blog', description: 'Çekici fiyatları, akü takviye, elektrikli araç taşıma, otoyol güvenliği ve kaza sonrası adımlar. Bağcılar çekici ekibinden sürücü rehberi yazıları.', path: '/blog/', schema: [P.breadcrumbSchema(crumbs), P.faqSchema(blogFaqs)] }),
    ctx: { active: 'blog' }, main
  }));
}

/* =============== STATİK SAYFALAR =============== */
function buildStatic() {
  // Galeri
  let crumbs = [['Ana Sayfa', '/'], ['Galeri', '/galeri.html']];

  const gallerySteps = [
    ['Trafik & Çevre Emniyeti', 'Olay yerinde tepe flaşörleri ve trafik konileriyle güvenlik çemberi oluşturulur.'],
    ['Açı Ayarı & Hassas Rampa', 'Hidrolik kayar kasa zemine sıfır dereceye yakın indirilir, rampa açısı araca göre ayarlanır.'],
    ['4 Noktadan Kayışlı Sabitleme', 'Jantlara ve alt takıma zarar vermeyen korumalı lashing kayışlarıyla araç kasaya kilitlenir.'],
    ['Kaskolu & Hasarsız Ulaşım', 'Sarsıntısız sürüşle hedefe varılır; araç teslim noktasında aynı hassasiyetle indirilir.']
  ].map((s, i) => `<li><span class="num">${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('');

  const galleryWhy = [
    ['truck', 'Sıfır Açılı Hidrolik Platform', 'Yere tam oturan kayar kasa ile spor ve modifiyeli araçlarda bile sıfır sürtme.'],
    ['life', 'Özel Korumalı Jant Kayışları', 'Jant boyasını çizmeyen, fren sistemine baskı yapmayan özel tekstil kayışlar.'],
    ['users', 'Sertifikalı Operatör Kadrosu', 'Vinç kullanımı, dar alan manevrası ve kaza kurtarma alanında tecrübeli personel.'],
    ['shield', 'Tam Kapsamlı Taşıma Kaskosu', 'Kasaya yüklenen her araç nakliye sigortası poliçesiyle güvence altındadır.'],
    ['park', 'Alçak Kabinli Manevra Kabiliyeti', 'Dar sokaklarda ve tavanı alçak kapalı otoparklarda seri hareket kabiliyeti.'],
    ['receipt', 'Fotoğraflı Teslim Tutanağı', 'Araç teslim alınırken ve teslim edilirken karşılıklı güven esasıyla kayıt tutulur.']
  ].map(w => `<li><span class="why-ic">${icon(w[0])}</span><div><h3>${w[1]}</h3><p>${w[2]}</p></div></li>`).join('');

  const galleryFaqs = [
    { q: 'Galerideki fotoğraflar kendi çalışmalarınıza mı ait?', a: 'Evet. Web sitemizde ve galerimizde paylaşılan tüm fotoğraflar Bağcılar ve çevresinde yürüttüğümüz gerçek kurtarma ve çekici operasyonlarına aittir.' },
    { q: 'Aracım çekiciye yüklenirken tampon veya karter sürtmesi olur mu?', a: 'Hayır. Hidrolik kayar kasalarımız yere sıfır dereceye yakın açıyla indiği için alçak spor araçlar dahi en ufak sürtme yaşamadan yüklenir.' },
    { q: 'Tekerleği kilitli veya kazalı araçlar nasıl yükleniyor?', a: 'Şanzımanı kilitli ya da tekerlekleri dönmeyen araçlar için makaralı hidrolik vinç ve tekerlek altı kayar patenler kullanılarak araç hasarsız şekilde kasaya alınır.' },
    { q: 'Taşıma sırasında aracıma bir zarar gelirse sorumluluk kime aittir?', a: 'Çekiciye yükleme başladığı andan teslimata kadar tüm süreç %100 taşıma ve emtia kaskomuzun teminatı altındadır; tüm sorumluluk firmamıza aittir.' }
  ];

  write('galeri.html', P.page({
    headHtml: P.head({ title: 'Çekici Galerisi | Bağcılar Oto Çekici Saha Operasyonları', description: 'Bağcılar çekici filosundan gerçek saha operasyonları: kayar kasa ile araç taşıma, akü takviye, lastik yardım, motosiklet ve ticari araç kurtarma kareleri.', path: '/galeri.html', schema: [P.breadcrumbSchema(crumbs), P.faqSchema(galleryFaqs)] }),
    ctx: { active: 'gallery' },
    main: `<section class="page-hero"><div class="container">${P.breadcrumbHtml(crumbs)}<h1>Gerçek Saha Operasyonları</h1><p class="lead">Fotoğraflara tıklayarak büyütebilirsiniz. Tüm kareler kendi çekici filomuza aittir.</p></div></section>
<section class="section"><div class="container"><div class="gallery-grid">${GALLERY.map(g => `<button type="button" class="g-item" data-lightbox="/images/${g[0]}.webp" data-alt="${esc(g[1])}"><img src="/images/${g[0]}.webp" width="720" height="960" alt="${esc(g[1])}" loading="lazy" decoding="async"></button>`).join('')}</div></div></section>
<section class="section alt" id="nasil-calisiyoruz"><div class="container">
  <div class="sec-head"><h2>Nasıl Çalışıyoruz? Saha Güvenlik Prosedürleri</h2><p>Aracınızın yükleme ve taşıma adımlarında uyguladığımız kurumsal standartlar.</p></div>
  <ol class="steps-flow">${gallerySteps}</ol>
</div></section>
<section class="section" id="neden-biz"><div class="container why-grid">
  <div class="why-photo">
    ${picture({ desktop: 'otomobil-cekici-1.webp', alt: 'Bağcılar çekici aracı ile araç kurtarma', w: 720, h: 960 })}
    <div class="why-stat"><strong>%100</strong><span>Kaskolu Saha Operasyonu</span></div>
  </div>
  <div>
    <div class="sec-head left"><h2>Neden Biz? Donanım ve Saha Güvencelerimiz</h2><p>Saha operasyonlarımızda araç güvenliğini en üst seviyede tutuyoruz.</p></div>
    <ul class="why-list">${galleryWhy}</ul>
  </div>
</div></section>
<section class="section alt" id="sss"><div class="container narrow">${P.faqBlock(galleryFaqs, 'Galeri ve Operasyonlar Hakkında Sıkça Sorulan Sorular')}</div></section>
${ctaBand('Aracınız için çekici mi lazım?', 'Aramanız yeterli; 10-15 dakikada yanınızdayız.')}`
  }));

  // Hakkımızda
  crumbs = [['Ana Sayfa', '/'], ['Hakkımızda', '/hakkimizda.html']];

  const aboutFaqs = [
    { q: 'Taşıma kaskosu neleri kapsar?', a: 'Aracınız çekiciye yüklenmeye başlandığı andan servise ya da teslim adresine indirilene kadar %100 taşıma ve emtia kaskosu teminatı altındadır. Olası kaza, sürtme ya da hasar durumlarında tüm sorumluluk firmamıza ve sigorta poliçemize aittir.' },
    { q: 'Telefonda söylediğiniz fiyat daha sonra değişir mi?', a: 'Kesinlikle değişmez. Bağcılar Oto Çekici olarak aradığınızda araç tipi, konum ve teslim noktasını alarak net fiyat veririz. Aracınız yüklendikten sonra sürpriz ek masraf veya yol parası talep edilmez.' },
    { q: 'Kurumsal firmalar ve şirket araçları için fatura kesiyor musunuz?', a: 'Evet. Filomuzdaki tüm işlemler yasaldır; KDV\'li kurumsal fatura düzenliyoruz. Şirket araçları ve filo kiralama firmaları için mobil POS ile kredi kartı veya banka havalesi kabul edilir.' },
    { q: 'Gece yarısı veya resmi tatillerde fiyat katlanır mı?', a: 'Hayır. 7/24 nöbetçi sistemimiz olduğu için gece, hafta sonu veya bayram günlerinde şeffaf ve adil tarife politikamız devam eder. Fiyatı aradığınızda açıkça teyit edebilirsiniz.' },
    { q: 'Elektrikli veya otomatik vitesli araçlar için özel ekipmanınız var mı?', a: 'Evet. Otomatik vitesli, elektrikli ve elektronik el freni kilitli araçları tekerlekleri yerde sürüklemeden, kayar kasa platformuna özel kızak ve tekerlek altı aparatlarla sıfır hasarla yüklüyoruz.' }
  ];

  const fleetEquipments = [
    { title: 'Hidrolik Kayar Kasa Çekiciler', img: 'otomobil-cekici-1', desc: 'Sıfır açılı hidrolik platform sayesinde yere tam oturur. Alçak spor araçlar, binek otomobiller ve SUV modelleri tampon sürtmesi olmadan tamamen kasaya alınır.', feats: ['Sıfır eğim açısı', '4 noktadan jant bağlama', 'Hasarsız hidrolik makara'] },
    { title: 'Ahtapot & Vinçli Kurtarıcılar', img: 'kurtarma-vinc', desc: 'Şanzımanı kilitli, tekerleği dönmeyen veya dar sokaklarda manevra alanı olmayan araçlar tekerleklerinden askı aparatı ile kaldırılarak taşınır.', feats: ['Tekerlekten kilitli askı', 'Şanzımana sıfır yük', 'Dar alan vinçli müdahale'] },
    { title: 'Kapalı Otopark Çekicisi', img: 'arac-cekici', desc: 'AVM, plaza ve rezidansların 1.90m - 2.10m alçak tavanlı kapalı garajlarına girebilen özel alçak kabinli kurtarma aracı.', feats: ['Alçak kabin tasarımı', 'Dar rampa kabiliyeti', 'Yeraltı garaj müdahalesi'] },
    { title: 'Ticari & Ağır Hizmet Taşıyıcıları', img: 'ticari-cekici-1', desc: 'Minibüs, panelvan, uzun şasi kamyonet ve hafif ticari araçlar için güçlendirilmiş çelik şasi ve yüksek tonajlı taşıma kapasitesi.', feats: ['Yüksek taşıma tonajı', 'Uzun şasi uyumu', 'Hafif ticari filosu'] },
    { title: 'Mobil Yol Yardım & Akü Donanımı', img: 'aku-takviye', desc: '12V/24V pik akım korumalı dijital booster ile yerinde akü takviyesi, profesyonel bijon sökme ve lastik yol yardım ekipmanı.', feats: ['Dijital voltaj regülatörü', 'Elektrikli beyin koruması', 'Yerinde 15 dk müdahale'] }
  ];

  const corporateGuarantees = [
    ['shield', '%100 Taşıma Kaskosu', 'Yükleme anından teslimata kadar aracınız tam kapsamlı taşıma kaskosu ile sigortalanır.'],
    ['tag', 'Telefonda Sabit Fiyat', 'Yola çıkmadan önce onaylanan fiyat geçerlidir; varışta ya da yüklemede ek ücret çıkarılmaz.'],
    ['truck', 'Sıfır Hasar Protokolü', 'Özel korumalı jant kayışları ve profesyonel bağlama aparatlarıyla kaporta ve mekaniğe dokunulmaz.'],
    ['receipt', 'Mobil POS & Resmi Fatura', 'Şirketler ve şahıslar için yerinde kredi kartı ile ödeme ve yasal KDV\'li fatura.'],
    ['users', '7/24 Kesintisiz Nöbetçi Kadro', 'Yılın 365 günü gece ve gündüz direksiyon başında hazır bekleyen yerel personel.'],
    ['route', 'Bölgesel Güzergah Hakimiyeti', 'Bağcılar sokaklarını, sanayi sitelerini ve otoyol arterlerini en iyi bilen yerel ekip.']
  ];

  const aboutMain = `
<section class="page-hero"><div class="container">
  ${P.breadcrumbHtml(crumbs)}
  <span class="eta-badge"><span class="pulse-dot"></span>Avrupa Yakası 7/24 Lisanslı &amp; Kaskolu Çekici Filosu</span>
  <h1>Hakkımızda: Bağcılar Oto Çekici &amp; Yol Yardım Filosu</h1>
  <p class="lead">Bağcılar merkezli modern çekici filomuz, 12 yılı aşkın saha tecrübemiz ve %100 kaskolu taşıma güvencemizle Avrupa Yakası genelinde 7/24 kesintisiz hizmet veriyoruz.</p>
  ${statsRow()}
</div></section>

<section class="section" id="biz-kimiz"><div class="container why-grid">
  <div class="why-photo">
    ${picture({ desktop: 'otomobil-cekici-2.webp', alt: 'Bağcılar Çekici Filosu ve Operasyon Ekibi', w: 720, h: 960 })}
    <div class="why-stat"><strong>12+ Yıl</strong><span>Saha Tecrübesi &amp; Güven</span></div>
  </div>
  <div>
    <div class="sec-head left"><h2>Biz Kimiz? Dürüst Esnaflık ve Güvenilir Yol Arkadaşınız</h2>
    <p>${BUSINESS.name}, 10 yılı aşkın süredir Bağcılar merkezli olarak İstanbul Avrupa Yakası genelinde oto çekici, oto kurtarma ve yol yardım hizmeti sunan profesyonel bir çekici kuruluşudur.</p></div>
    <p style="margin-bottom:1rem;color:var(--muted);line-height:1.65;">Kuruluşumuzdan bu yana temel ilkemiz; yolda kalan sürücülere zor anlarında dürüst esnaflık ahlakıyla yaklaşmak, telefonda net ve değişmeyen fiyat garantisi vermek ve araçları sıfır hasar prensibiyle taşımaktır. Bağcılar mahallelerinden Basın Ekspres, TEM ve E-5 bağlantılarına, İSTOÇ ve İkitelli sanayi sitelerine kadar geniş bir sahada 7/24 nöbetçi araçlarımızla görev yapıyoruz.</p>
    <p style="color:var(--muted);line-height:1.65;">Gelişmiş hidrolik kayar kasa filomuz, alçak tavanlı otopark kurtarıcılarımız ve akım korumalı takviye cihazlarımız ile her senaryoya hazırlıklı tam donanımlı bir acil müdahale filosuyuz.</p>
  </div>
</div></section>

<section class="section alt" id="filomuz"><div class="container">
  <div class="sec-head"><h2>Modern Araç Filomuz &amp; Donanım Altyapımız</h2><p>Her araç tipi ve arıza durumu için özel olarak donatılmış kurtarma araçlarımızla hizmetinizdeyiz.</p></div>
  <div class="svc-grid">
    ${fleetEquipments.map(e => `
      <div class="svc-card">
        <div class="svc-img">${picture({ desktop: e.img + '.webp', w: 720, h: 960, alt: `${e.title} - ${BUSINESS.name}` })}</div>
        <div class="svc-body">
          <h3>${esc(e.title)}</h3>
          <p>${esc(e.desc)}</p>
          <ul class="mini-list">${e.feats.map(f => `<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>
        </div>
      </div>
    `).join('')}
  </div>
</div></section>

<section class="section" id="nasil-calisiyoruz"><div class="container">
  <div class="sec-head"><h2>Nasıl Çalışıyoruz? 4 Aşamalı Kurumsal Süreç</h2><p>Şeffaf, planlı ve sürpriz maliyet barındırmayan profesyonel iş akışımız.</p></div>
  <ol class="steps-flow">
    <li><span class="num">1</span><h3>İhbar &amp; Sabit Fiyat</h3><p>Aradığınızda araç modelini ve konumunuzu alarak çekici yola çıkmadan önce net ve bağlayıcı fiyatı bildiririz.</p></li>
    <li><span class="num">2</span><h3>10-15 Dk Hızlı İntikal</h3><p>Bağcılar ve çevre bağlantı noktalarındaki nöbetçi ekibimiz en kısa güzergah üzerinden konumunuza ulaşır.</p></li>
    <li><span class="num">3</span><h3>Kaskolu &amp; Hasarsız Yükleme</h3><p>Hidrolik kayar platforma alınan aracınız 4 noktadan özel jant kayışlarıyla kasaya güvenle kilitlenir.</p></li>
    <li><span class="num">4</span><h3>Servise Teslim &amp; Fatura</h3><p>Aracınız varış noktasında hasarsız indirilir; mobil POS ile ödeme alınıp KDV'li kurumsal fatura kesilir.</p></li>
  </ol>
</div></section>

<section class="section alt" id="guvenceler"><div class="container">
  <div class="sec-head"><h2>Müşteri Güvencelerimiz &amp; Kurumsal Standartlarımız</h2><p>Bizi bölgenin en çok tercih edilen oto çekici firması yapan somut güvenceler.</p></div>
  <div class="svc-grid">
    ${corporateGuarantees.map(g => `
      <div class="svc-card" style="padding:1.25rem;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:0.75rem;">
          <span class="why-ic">${icon(g[0])}</span>
          <h3 style="margin:0;font-size:1.1rem;">${esc(g[1])}</h3>
        </div>
        <p style="margin:0;font-size:0.92rem;color:var(--muted);">${esc(g[2])}</p>
      </div>
    `).join('')}
  </div>
</div></section>

<section class="section" id="galeri-onizleme"><div class="container">
  <div class="sec-head"><h2>Gerçek Saha Operasyonlarımız</h2><p>Filomuzun sahadaki araç kurtarma, nakliye ve yol yardım çalışmalarından kareler.</p></div>
  <div class="gallery-grid">
    ${GALLERY.slice(0, 8).map(g => `<button type="button" class="g-item" data-lightbox="/images/${g[0]}.webp" data-alt="${esc(g[1])}"><img src="/images/${g[0]}.webp" width="720" height="960" alt="${esc(g[1])}" loading="lazy" decoding="async"></button>`).join('')}
  </div>
  <p class="center" style="margin-top:1.5rem;"><a class="btn btn-outline" href="/galeri.html">Tüm Galeriyi İncele ${icon('arrow')}</a></p>
</div></section>

<section class="section alt" id="sss"><div class="container narrow">${P.faqBlock(aboutFaqs, 'Kurumsal Sıkça Sorulan Sorular')}</div></section>

${ctaBand('Aracınız için güvenilir çekici ekibi mi arıyorsunuz?', '0545 256 55 20 numaralı hattımızdan 7/24 bize ulaşabilir, net fiyat ve varış süresi alabilirsiniz.')}
`;

  write('hakkimizda.html', P.page({
    headHtml: P.head({ title: 'Hakkımızda | Bağcılar Oto Çekici & Yol Yardım Filosu', description: 'Bağcılar Oto Çekici; kayar kasa filosu, 7/24 nöbetçi ekibi, telefonda net fiyat ve %100 taşıma kaskosuyla Avrupa Yakası’nda kurumsal oto çekici ve yol yardım hizmeti verir.', path: '/hakkimizda.html', schema: [P.breadcrumbSchema(crumbs), P.orgSchema(), P.faqSchema(aboutFaqs)] }),
    ctx: { active: 'about' },
    main: aboutMain
  }));

  // İletişim
  crumbs = [['Ana Sayfa', '/'], ['İletişim', '/iletisim.html']];
  write('iletisim.html', P.page({
    headHtml: P.head({ title: 'İletişim | Bağcılar Oto Çekici 7/24 Acil Hat', description: 'Bağcılar Oto Çekici iletişim: 0545 256 55 20 numaralı 7/24 acil hat, WhatsApp konum gönderme ve çalışma saatleri. Bağcılar ve çevresine hemen çekici gönderiyoruz.', path: '/iletisim.html', schema: [P.breadcrumbSchema(crumbs), P.orgSchema()] }),
    ctx: { active: 'contact' },
    main: `<section class="page-hero"><div class="container">${P.breadcrumbHtml(crumbs)}<h1>İletişim</h1><p class="lead">Yolda kaldıysanız aramak en hızlı yoldur. WhatsApp'tan konum da gönderebilirsiniz.</p>${ctaButtons(null)}</div></section>
<section class="section"><div class="container contact-grid"><div>
<ul class="contact-list">
<li>${icon('phone')}<div><strong>Telefon / WhatsApp</strong><a href="${telLink()}" data-track="call">${BUSINESS.phoneDisplay}</a></div></li>
<li>${icon('clock')}<div><strong>Çalışma Saatleri</strong><span>${BUSINESS.hours}</span></div></li>
<li>${icon('pin')}<div><strong>Merkez</strong><span>Bağcılar, İstanbul (Avrupa Yakası)</span></div></li>
</ul>
<p>Mesajınıza aracınızın tipini, bulunduğunuz yeri ve gideceğiniz adresi yazarsanız fiyatı ve varış süresini daha hızlı söyleyebiliriz.</p>
</div><div class="map-box"><iframe title="Bağcılar harita" src="https://www.google.com/maps?q=Ba%C4%9Fc%C4%B1lar%2C%20%C4%B0stanbul&output=embed" width="600" height="380" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div></section>`
  }));

  // Gizlilik / KVKK
  crumbs = [['Ana Sayfa', '/'], ['Gizlilik & KVKK', '/gizlilik-politikasi.html']];
  write('gizlilik-politikasi.html', P.page({
    headHtml: P.head({ title: 'Gizlilik Politikası & KVKK Aydınlatma Metni | Bağcılar Çekici', description: 'Bağcılar Oto Çekici gizlilik, çerez ve KVKK aydınlatma metni: hangi verileri neden topluyoruz, ne kadar saklıyoruz ve haklarınız nelerdir.', path: '/gizlilik-politikasi.html', schema: [P.breadcrumbSchema(crumbs)] }),
    ctx: {},
    main: `<section class="page-hero"><div class="container">${P.breadcrumbHtml(crumbs)}<h1>Gizlilik Politikası &amp; KVKK Aydınlatma Metni</h1><p class="lead">Son güncelleme: 18 Kasım 2026</p></div></section>
<div class="container narrow"><div class="prose">
<section class="prose-sec"><h2>Veri sorumlusu</h2><p>Bu internet sitesinin veri sorumlusu ${BUSINESS.name}'dır (Bağcılar, İstanbul). İletişim için ${BUSINESS.phoneDisplay} numaralı hattımızı arayabilirsiniz.</p></section>
<section class="prose-sec"><h2>Hangi verileri topluyoruz?</h2>
<ul class="check-list"><li>Telefonla ya da WhatsApp'tan bize ilettiğiniz ad, telefon numarası, araç bilgisi ve konum bilgisi.</li><li>Sitede doldurduğunuz hızlı fiyat formundaki bölge, araç tipi ve durum seçimleri (form WhatsApp'a yönlendirir, sunucumuzda saklanmaz).</li><li>Analiz ve reklam ölçümü açıksa çerezler aracılığıyla toplanan anonim ziyaret verileri (sayfa görüntüleme, tıklama, cihaz türü).</li></ul></section>
<section class="prose-sec"><h2>Verileri hangi amaçla kullanıyoruz?</h2>
<p>Verileriniz yalnızca çekici ve yol yardım hizmetini planlamak, fiyat vermek, aracınızı doğru adrese ulaştırmak, fatura düzenlemek ve hizmet kalitesini ölçmek için kullanılır. Pazarlama amaçlı mesaj, açık rızanız olmadan gönderilmez.</p></section>
<section class="prose-sec"><h2>Çerezler ve üçüncü taraf hizmetler</h2>
<p>Sitemiz Google Analytics ve Google Ads gibi ölçüm araçlarını kullanabilir. Bu araçlar tarayıcınıza çerez yerleştirebilir ve ziyaretinizle ilgili anonim istatistik toplayabilir. Çerezleri tarayıcı ayarlarınızdan silebilir ya da engelleyebilirsiniz. Harita bölümü Google Maps'ten, yazı tipleri Google Fonts'tan yüklenir.</p></section>
<section class="prose-sec"><h2>Verilerin saklanması ve paylaşılması</h2>
<p>Verileriniz, hizmetin gerektirdiği süre ve yasal saklama yükümlülükleri boyunca tutulur. Yasal zorunluluk dışında üçüncü kişilerle paylaşılmaz; yalnızca hizmeti yerine getirmek için gereken iş ortaklarına (örneğin aracın teslim edileceği servis) ve yasal merciilere aktarılabilir.</p></section>
<section class="prose-sec"><h2>KVKK kapsamındaki haklarınız</h2>
<p>6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz. Taleplerinizi ${BUSINESS.phoneDisplay} numaralı hattımız üzerinden iletebilirsiniz.</p></section>
</div></div>`
  }));

  // 404
  write('404.html', P.page({
    headHtml: P.head({ title: 'Sayfa Bulunamadı | Bağcılar Oto Çekici', description: 'Aradığınız sayfa bulunamadı. Acil çekici için 7/24 hattımızı arayın ya da ana sayfaya dönün.', path: '/404.html', noindex: true }),
    ctx: {},
    main: `<section class="page-hero"><div class="container narrow center"><h1>Sayfa bulunamadı</h1><p class="lead">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Acil çekici gerekiyorsa beklemeyin:</p>${ctaButtons(null, { center: true })}<p><a href="/">Ana sayfaya dön</a></p></div></section>`
  }));
}

/* =============== sabit dosyalar =============== */
function buildAssets() {
  fs.writeFileSync(path.join(ROOT, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#0B1F3A"/><path d="M20 10v12a6 6 0 1 1-6-6" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/><circle cx="20" cy="9.5" r="3" fill="#DC2626"/></svg>\n`);
  fs.writeFileSync(path.join(ROOT, 'site.webmanifest'), JSON.stringify({
    name: BUSINESS.name, short_name: BUSINESS.shortName, start_url: '/', display: 'standalone',
    background_color: '#ffffff', theme_color: '#0B1F3A', lang: 'tr',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
  }, null, 2) + '\n');
}

buildHome();
buildRegionPages();
buildServicePages();
buildBlog();
buildStatic();
buildAssets();
console.log(`✔ ${written.length} HTML sayfası üretildi.`);
module.exports = { written };
