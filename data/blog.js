'use strict';
/* TEK KAYNAK — blog (sıra). İçerik: data/blog/<slug>.js */
const path = require('path');

const BLOG_SLUGS = [
  'bagcilar-en-yakin-oto-cekici-rehberi',
  'oto-cekici-fiyatlari-nasil-hesaplanir',
  'aku-neden-biter-yerinde-aku-takviye',
  'otomatik-vitesli-ve-elektrikli-arac-nasil-cekilir',
  'otoyolda-ariza-guvenlik-adimlari',
  'kaza-sonrasi-cekici-cagirma-rehberi',
  'kapali-otoparkta-kalan-arac-nasil-cikarilir',
  'lastik-patlarsa-yol-yardim-rehberi'
];

function loadPosts() {
  return BLOG_SLUGS
    .map(slug => Object.assign({ slug, file: `${slug}.html`, url: `/blog/${slug}.html` },
      require(path.join(__dirname, 'blog', slug + '.js'))))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

module.exports = { BLOG_SLUGS, loadPosts };
