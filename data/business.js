'use strict';
/* TEK KAYNAK — firma bilgileri. Değişiklikten sonra: node scripts/generate_all.js && node scripts/generate_sitemap.js */

// DOMAIN: Gerçek domain belli olunca sadece bu satırı değiştir.
const SITE_URL = 'https://www.bagcilarotocekici.com';

const BUSINESS = {
  name: 'Bağcılar Oto Çekici',
  shortName: 'Bağcılar Çekici',
  legalName: 'Bağcılar Oto Çekici & Yol Yardım',
  slogan: '7/24 Bağcılar, Esenler, Başakşehir ve Çevresinde Oto Çekici & Yol Yardım',
  themeId: 'kurumsal-guven',
  phoneDisplay: '0545 256 55 20',
  phoneTel: '+905452565520',
  whatsappNumber: '905452565520',
  hours: '7 Gün 24 Saat Kesintisiz',
  etaMinutes: '10-15 Dk',
  rating: { value: '5.0' },
  address: {
    locality: 'Bağcılar',
    region: 'İstanbul',
    country: 'TR'
  },
  geo: { latitude: 41.0343, longitude: 28.8567 },
  sameAs: [],
  // ---- Google Ads & Analytics: reklam açılınca SADECE aşağıdaki satırları doldur ----
  analytics: {
    ga4Id: '',                 // Örn: 'G-XXXXXXXXXX'
    adsId: '',                 // Örn: 'AW-XXXXXXXXXX'
    adsCallConversion: '',     // Örn: 'AW-XXXXXXXXXX/AbCdEfGhIjKlMnOp'
    adsWhatsappConversion: ''  // Örn: 'AW-XXXXXXXXXX/QrStUvWxYz123456'
  }
};

function waLink(text) {
  return `https://api.whatsapp.com/send?phone=${BUSINESS.whatsappNumber}&text=${encodeURIComponent(text || `Merhaba ${BUSINESS.name}, acil çekiciye ihtiyacım var. Konumumu paylaşıyorum.`)}`;
}
function telLink() { return `tel:${BUSINESS.phoneTel}`; }

module.exports = { SITE_URL, BUSINESS, waLink, telLink };

