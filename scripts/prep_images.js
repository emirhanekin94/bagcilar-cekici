'use strict';
/* Geliştirme aracı: diğer çekici projelerindeki gerçek saha fotoğraflarını (logo hariç)
   bu projeye 800px WebP olarak alır ve hero için mobil (640x480) varyant üretir. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/emirh/Desktop/iş/tuzla/tuzlayolyardim-website/images/';
const OUT = path.join(__dirname, '..', 'images');
fs.mkdirSync(OUT, { recursive: true });

const PHOTOS = [
  'aku-takviye', 'arac-cekici', 'atv-cekici', 'e-5-cekici', 'havalimani-cekici', 'is-makinesi-cekici-1',
  'kamyonet-cekici-1', 'kamyonet-cekici-2', 'kazali-arac-cekici-1', 'kazali-arac-cekici-2', 'kazali-arac-cekici',
  'kurtarma-vinc', 'lastik-tamir', 'luks-arac-cekici-1', 'luks-arac-cekici-2', 'luks-arac-cekici-3', 'luks-arac-cekici',
  'minibus-cekici', 'motorsiklet-cekici-1', 'motorsiklet-cekici-3', 'oto-kurtarici', 'oto-kurtarici-1', 'oto-kurtarma',
  'oto-kurtarma-1', 'otomobil-cekici-1', 'otomobil-cekici-2', 'otomobil-cekici-3', 'otomobil-cekici-4',
  'otoyol-yardim-cekici', 'sehirlerarasi-cekici', 'spor-arac-cekici', 'suv-cekici-1', 'suv-cekici-2', 'suv-cekici',
  'ticari-cekici-1', 'ticari-cekici-3', 'ticari-cekici', 'ozel-cekici'
];
// Hero (bölge + ana sayfa) görselleri için mobil varyant da üretilir
const HEROES = [
  'otomobil-cekici-1', 'suv-cekici-1', 'e-5-cekici', 'ticari-cekici-3', 'luks-arac-cekici-3', 'otoyol-yardim-cekici',
  'oto-kurtarici', 'kamyonet-cekici-1', 'is-makinesi-cekici-1', 'ticari-cekici-1', 'suv-cekici-2', 'havalimani-cekici',
  'luks-arac-cekici', 'oto-kurtarma', 'otomobil-cekici-2', 'otomobil-cekici-4', 'kazali-arac-cekici-1'
];

(async () => {
  const report = [];
  for (const n of PHOTOS) {
    const src = path.join(SRC, n + '.webp');
    if (!fs.existsSync(src)) { console.log('YOK', n); continue; }
    const meta = await sharp(src).metadata();
    const isLandscape = meta.width > meta.height;
    const w = isLandscape ? 800 : 720;
    const outFile = path.join(OUT, n + '.webp');
    await sharp(src).resize({ width: w }).webp({ quality: 70, effort: 5 }).toFile(outFile);
    const m2 = await sharp(outFile).metadata();
    report.push(`${n}.webp ${m2.width}x${m2.height} ${(fs.statSync(outFile).size / 1024).toFixed(0)}KB`);
  }
  for (const n of HEROES) {
    const src = path.join(SRC, n + '.webp');
    const outFile = path.join(OUT, n + '-m.webp');
    await sharp(src).resize(640, 480, { fit: 'cover', position: 'attention' }).webp({ quality: 66, effort: 5 }).toFile(outFile);
    report.push(`${n}-m.webp 640x480 ${(fs.statSync(outFile).size / 1024).toFixed(0)}KB`);
  }
  console.log(report.join('\n'));
})();
