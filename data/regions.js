'use strict';
/* TEK KAYNAK — hizmet bölgeleri (meta). Uzun içerik: data/regions/<slug>.js */
const path = require('path');

const CATEGORIES = [
  { id: 'all', label: 'Tüm Bölgeler' },
  { id: 'ana', label: 'Bağcılar & Mahalleleri' },
  { id: 'cevre', label: 'Çevre İlçeler' },
  { id: 'otoyol', label: 'Otoyol & Gişeler' },
  { id: 'sanayi', label: 'Sanayi & Ticaret' }
];

const REGIONS = [
  { slug: 'bagcilar', name: 'Bağcılar', fullName: 'Bağcılar', category: 'ana', hero: 'otomobil-cekici-1', geo: [41.0343, 28.8567] },
  { slug: 'goztepe', name: 'Göztepe', fullName: 'Bağcılar Göztepe', category: 'ana', hero: 'suv-cekici-1', geo: [41.0397, 28.8441] },
  { slug: 'gunesli', name: 'Güneşli', fullName: 'Güneşli', category: 'ana', hero: 'luks-arac-cekici-3', geo: [41.0207, 28.8244] },
  { slug: 'mahmutbey', name: 'Mahmutbey', fullName: 'Mahmutbey', category: 'otoyol', hero: 'e-5-cekici', geo: [41.0556, 28.8325] },
  { slug: 'basin-ekspres', name: 'Basın Ekspres', fullName: 'Basın Ekspres Yolu', category: 'otoyol', hero: 'otoyol-yardim-cekici', geo: [41.0468, 28.8125] },
  { slug: 'istoc', name: 'İSTOÇ', fullName: 'İSTOÇ', category: 'sanayi', hero: 'ticari-cekici-3', geo: [41.0596, 28.8174] },
  { slug: 'yuzyil', name: 'Yüzyıl', fullName: 'Bağcılar Yüzyıl', category: 'ana', hero: 'otomobil-cekici-4', geo: [41.0622, 28.8519] },
  { slug: 'tekstilkent', name: 'Tekstilkent', fullName: 'Tekstilkent', category: 'sanayi', hero: 'kamyonet-cekici-1', geo: [41.0275, 28.8398] },
  { slug: 'ikitelli', name: 'İkitelli', fullName: 'İkitelli', category: 'sanayi', hero: 'ticari-cekici-1', geo: [41.0689, 28.8003] },
  { slug: 'esenler', name: 'Esenler', fullName: 'Esenler', category: 'cevre', hero: 'oto-kurtarici', geo: [41.0434, 28.8756] },
  { slug: 'gungoren', name: 'Güngören', fullName: 'Güngören', category: 'cevre', hero: 'kazali-arac-cekici-1', geo: [41.0253, 28.8728] },
  { slug: 'basaksehir', name: 'Başakşehir', fullName: 'Başakşehir', category: 'cevre', hero: 'is-makinesi-cekici-1', geo: [41.0935, 28.8021] },
  { slug: 'kucukcekmece', name: 'Küçükçekmece', fullName: 'Küçükçekmece', category: 'cevre', hero: 'suv-cekici-2', geo: [40.9922, 28.7731] },
  { slug: 'halkali', name: 'Halkalı', fullName: 'Halkalı', category: 'cevre', hero: 'havalimani-cekici', geo: [41.0238, 28.7754] },
  { slug: 'bahcelievler', name: 'Bahçelievler', fullName: 'Bahçelievler', category: 'cevre', hero: 'luks-arac-cekici', geo: [41.0023, 28.8597] },
  { slug: 'yenibosna', name: 'Yenibosna', fullName: 'Yenibosna', category: 'cevre', hero: 'oto-kurtarma', geo: [40.9981, 28.8353] },
  { slug: 'merter', name: 'Merter', fullName: 'Merter', category: 'cevre', hero: 'otomobil-cekici-2', geo: [41.0007, 28.8962] }
].map(r => Object.assign({}, r, {
  file: `${r.slug}-oto-cekici.html`,
  url: `/bolgeler/${r.slug}-oto-cekici.html`,
  navTitle: `${r.name.toLocaleUpperCase('tr-TR')} ÇEKİCİ`,
  navSub: `7/24 ${r.fullName} Nöbetçi Filosu`
}));

function loadRegionContent(slug) {
  return require(path.join(__dirname, 'regions', slug + '.js'));
}
function getRegion(slug) { return REGIONS.find(r => r.slug === slug); }

module.exports = { REGIONS, CATEGORIES, loadRegionContent, getRegion };
