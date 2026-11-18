'use strict';
/* TEK KAYNAK — hizmetler (meta). Uzun içerik: data/services/<slug>.js */
const path = require('path');

const SERVICES = [
  { slug: 'oto-cekici', name: 'Oto Çekici (Kayar Kasa)', short: 'Oto Çekici', image: 'otomobil-cekici-3', icon: 'truck' },
  { slug: 'oto-kurtarma', name: 'Oto Kurtarma', short: 'Oto Kurtarma', image: 'oto-kurtarma-1', icon: 'life' },
  { slug: 'kapali-otopark-cekici', name: 'Kapalı Otopark Çekici', short: 'Kapalı Otopark', image: 'luks-arac-cekici-2', icon: 'park' },
  { slug: 'ahtapot-cekici', name: 'Ahtapot Çekici', short: 'Ahtapot Çekici', image: 'kurtarma-vinc', icon: 'hook' },
  { slug: 'aku-takviye', name: 'Akü Takviye', short: 'Akü Takviye', image: 'aku-takviye', icon: 'bolt' },
  { slug: 'lastik-yol-yardim', name: 'Lastik Yol Yardım', short: 'Lastik Yardım', image: 'lastik-tamir', icon: 'wheel' },
  { slug: 'motosiklet-cekici', name: 'Motosiklet Çekici', short: 'Motosiklet', image: 'motorsiklet-cekici-1', icon: 'moto' },
  { slug: 'ticari-arac-cekici', name: 'Ticari Araç Çekici', short: 'Ticari Araç', image: 'ticari-cekici-3', icon: 'van' },
  { slug: 'sehirlerarasi-arac-tasima', name: 'Şehirlerarası Araç Taşıma', short: 'Şehirlerarası', image: 'sehirlerarasi-cekici', icon: 'route' }
].map(s => Object.assign({}, s, { file: `${s.slug}.html`, url: `/hizmetler/${s.slug}.html` }));

function loadServiceContent(slug) { return require(path.join(__dirname, 'services', slug + '.js')); }
function getService(slug) { return SERVICES.find(s => s.slug === slug); }

module.exports = { SERVICES, loadServiceContent, getService };
