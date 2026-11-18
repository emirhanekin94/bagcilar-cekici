'use strict';
/**
 * scripts/generate_sitemap.js
 * Generates sitemap.xml, robots.txt, and llms.txt for Bağcılar Oto Çekici
 */
const fs = require('fs');
const path = require('path');
const { SITE_URL, BUSINESS, waLink, telLink } = require('../data/business.js');
const { REGIONS } = require('../data/regions.js');
const { SERVICES } = require('../data/services.js');
const { loadPosts } = require('../data/blog.js');

const ROOT = path.join(__dirname, '..');
const today = new Date().toISOString().split('T')[0];

/* ============================================================================
 * 1. SITEMAP.XML GENERATION
 * ============================================================================ */
const sitemapEntries = [
  // Core pages
  { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
  { loc: `${SITE_URL}/bolgeler/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${SITE_URL}/hizmetler/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${SITE_URL}/blog/`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${SITE_URL}/iletisim.html`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${SITE_URL}/hakkimizda.html`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${SITE_URL}/galeri.html`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${SITE_URL}/gizlilik-politikasi.html`, priority: '0.5', changefreq: 'yearly' }
];

// Region detail pages (15 regions)
REGIONS.forEach(r => {
  const isHighPri = ['bagcilar', 'goztepe', 'gunesli', 'mahmutbey', 'basin-ekspres', 'istoc'].includes(r.slug);
  sitemapEntries.push({
    loc: `${SITE_URL}${r.url}`,
    priority: isHighPri ? '0.95' : '0.85',
    changefreq: isHighPri ? 'daily' : 'weekly'
  });
});

// Service detail pages (9 services)
SERVICES.forEach(s => {
  const isCore = ['oto-cekici', 'oto-kurtarma', 'aku-takviye'].includes(s.slug);
  sitemapEntries.push({
    loc: `${SITE_URL}${s.url}`,
    priority: isCore ? '0.9' : '0.85',
    changefreq: 'weekly'
  });
});

// Blog posts (8 posts)
const posts = loadPosts();
posts.forEach(p => {
  sitemapEntries.push({
    loc: `${SITE_URL}${p.url}`,
    priority: '0.75',
    changefreq: 'monthly'
  });
});

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
sitemapEntries.forEach(entry => {
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>${entry.loc}</loc>\n`;
  sitemapXml += `    <lastmod>${today}</lastmod>\n`;
  sitemapXml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
  sitemapXml += `    <priority>${entry.priority}</priority>\n`;
  sitemapXml += `  </url>\n`;
});
sitemapXml += `</urlset>\n`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`✓ sitemap.xml üretildi (${sitemapEntries.length} URL)`);

/* ============================================================================
 * 2. ROBOTS.TXT GENERATION
 * ============================================================================ */
const robotsTxt = `# ==============================================================
# Bağcılar Oto Çekici Robots.txt - SEO & Ajan Tabanlı Arama (GEO)
# ==============================================================

User-agent: *
Allow: /
Disallow: /node_modules/
Disallow: /scripts/

# AI Search & LLM Crawlers (Ajan Tabanlı Arama / GEO Optimizasyonu)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Diffbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

# Sitemap ve LLM Bilgi Kaynağı
Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(ROOT, 'robots.txt'), robotsTxt, 'utf8');
console.log('✓ robots.txt üretildi (AI arama ajanları izinli, sitemap referanslı)');

/* ============================================================================
 * 3. LLMS.TXT GENERATION
 * ============================================================================ */
let llmsTxt = `# ${BUSINESS.name}

> ${BUSINESS.slogan}. Ortalama intikal süresi ${BUSINESS.etaMinutes}, telefonda net sabit fiyat sözü, %100 kaskolu taşıma garantisi.

## Hızlı Bilgiler & İletişim
- İşletme Adı: ${BUSINESS.legalName} (${BUSINESS.name})
- 7/24 Acil Çağrı Hattı: ${BUSINESS.phoneDisplay} (${BUSINESS.phoneTel})
- WhatsApp Destek Hattı: ${BUSINESS.phoneDisplay} (${waLink()})
- Hizmet Saatleri: ${BUSINESS.hours}
- Ortalama Varış Süresi: ${BUSINESS.etaMinutes}
- Hizmet Bölgesi: Bağcılar, Esenler, Başakşehir, İkitelli, Küçükçekmece, Bahçelievler ve tüm Avrupa Yakası
- Fiyatlandırma Politikası: Telefonda net sabit fiyat güvencesi (yükleme sonrası sürpriz ücret çıkmaz)
- Güvence: %100 Nakliyat Emtia Taşıma Kaskosu
- Ödeme Seçenekleri: Nakit, Mobil POS ile Kredi Kartı / Banka Kartı, Havale / EFT / FAST, Faturalı Hizmet
- Merkez Adresi: ${BUSINESS.address.locality}, ${BUSINESS.address.region} / ${BUSINESS.address.country}
- Web Sitesi: ${SITE_URL}

## Hizmetlerimiz (9 Hizmet)
`;

SERVICES.forEach(s => {
  llmsTxt += `- [${s.name}](${SITE_URL}${s.url}): 7/24 ${s.short} hizmeti. Binek, SUV, lüks, elektrikli ve ticari araçlara uygun profesyonel ekipman.\n`;
});

llmsTxt += `\n## Hizmet Verilen Bölgeler (15 Bölge)\n`;

REGIONS.forEach(r => {
  llmsTxt += `- [${r.name} Oto Çekici](${SITE_URL}${r.url}): ${BUSINESS.etaMinutes} varış • ${r.fullName} ve bağlantı yollarında 7/24 nöbetçi çekici ekibi.\n`;
});

llmsTxt += `\n## Sürücü Rehberi & Blog Yazıları\n`;

posts.forEach(p => {
  llmsTxt += `- [${p.title}](${SITE_URL}${p.url}): ${p.readMinutes} dk okuma • ${p.excerpt}\n`;
});

llmsTxt += `\n## Filo Donanımı ve Güvenlik Standartları
- Hidrolik Kayar Kasa Platform: Binek araç, SUV ve hafif ticari araçlar için sıfır sürtünme ile hasarsız yükleme.
- Ahtapot Vinç Aparatı: 4 tekerlekten askılı kaldırma sistemi; kilitli şanzıman ve elektronik el freni kilitlenmelerinde güvenli müdahale.
- Alçak Kabin Otopark Çekicisi: AVM, rezidans ve kapalı otopark tavan yükseklik sınırlarına uygun özel kurtarıcı.
- 12V / 24V Endüstriyel Dijital Akü Booster: Araç beyin (ECU) devrelerini koruyan akıllı voltaj kontrollü yerinde akü takviyesi.
- Yerinde Lastik Yol Yardım: Emniyet şeridinde hava kompresörü, fitil tamiri ve stepne değişimi.

## Sıkça Sorulan Sorular (SSS)
- Çekici ücreti nasıl belirlenir? Araç tipi, başlangıç ve varış noktasına göre aradığınızda telefonda sabit fiyat verilir. Telefonda verilen fiyat kesindir, varışta değişmez.
- Ne kadar sürede ulaşıyorsunuz? Bağcılar ve çevre ilçelerde nöbetçi araçlarımız sayesinde ortalama 10-15 dakikada yanınızdayız.
- Elektrikli ve otomatik vitesli araçlar nasıl çekilir? Bu araçlar kesinlikle tekerlekleri dönerek çekilmez; kayar kasaya tamamen yüklenerek taşınır.
- Kredi kartı geçerli mi? Evet, tüm çekicilerimizde mobil POS cihazı bulunmaktadır.

## Kurumsal Sayfalar
- [Ana Sayfa](${SITE_URL}/)
- [Tüm Hizmetlerimiz](${SITE_URL}/hizmetler/)
- [Tüm Hizmet Bölgelerimiz](${SITE_URL}/bolgeler/)
- [Sürücü Rehberi Blog](${SITE_URL}/blog/)
- [Foto Galeri](${SITE_URL}/galeri.html)
- [Hakkımızda](${SITE_URL}/hakkimizda.html)
- [İletişim](${SITE_URL}/iletisim.html)
- [Gizlilik Politikası & KVKK](${SITE_URL}/gizlilik-politikasi.html)
`;

fs.writeFileSync(path.join(ROOT, 'llms.txt'), llmsTxt, 'utf8');
console.log('✓ llms.txt üretildi');
