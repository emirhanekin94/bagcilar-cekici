'use strict';

/**
 * Bağcılar Oto Çekici — Sıfır bağımlılıklı yerel geliştirme sunucusu.
 * Kullanım: node server.js veya npm start
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { URL } = require('url');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

function safeJoin(root, requestPath) {
  const decoded = decodeURIComponent(requestPath);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  return path.join(root, normalized);
}

function tryResolve(urlPath) {
  const candidates = [];
  if (urlPath === '/') {
    candidates.push('/index.html');
  } else if (urlPath.endsWith('/')) {
    candidates.push(urlPath + 'index.html');
  } else {
    candidates.push(urlPath);
    candidates.push(urlPath + '.html');
    candidates.push(urlPath + '/index.html');
    candidates.push('/bolgeler' + urlPath);
    candidates.push('/bolgeler' + urlPath + '.html');
    candidates.push('/hizmetler' + urlPath);
    candidates.push('/hizmetler' + urlPath + '.html');
    candidates.push('/blog' + urlPath);
    candidates.push('/blog' + urlPath + '.html');
  }

  for (const candidate of candidates) {
    const filePath = safeJoin(ROOT, candidate);
    if (filePath.startsWith(ROOT) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return filePath;
    }
  }
  return null;
}

function sendFile(req, res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send404(res);
      return;
    }
    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const acceptEncoding = req.headers['accept-encoding'] || '';
    if (/\bgzip\b/.test(acceptEncoding) && /text|javascript|json|svg|xml/.test(contentType)) {
      res.setHeader('Content-Encoding', 'gzip');
      zlib.gzip(data, (zErr, zData) => {
        if (zErr) {
          res.statusCode = 200;
          res.end(data);
        } else {
          res.statusCode = 200;
          res.end(zData);
        }
      });
      return;
    }

    res.statusCode = 200;
    res.end(data);
  });
}

function send404(res) {
  const notFoundPath = path.join(ROOT, '404.html');
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (fs.existsSync(notFoundPath)) {
    fs.createReadStream(notFoundPath).pipe(res);
  } else {
    res.end('<h1>404 - Sayfa Bulunamadı</h1><p><a href="/">Ana sayfaya dön</a></p>');
  }
}

function startServer(port) {
  const server = http.createServer((req, res) => {
    let urlPath;
    try {
      urlPath = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;
    } catch (e) {
      urlPath = '/';
    }

    const checkDir = safeJoin(ROOT, urlPath);
    if (fs.existsSync(checkDir) && fs.statSync(checkDir).isDirectory() && !urlPath.endsWith('/')) {
      res.statusCode = 301;
      res.setHeader('Location', urlPath + '/');
      res.end();
      return;
    }

    const filePath = tryResolve(urlPath);
    if (!filePath) {
      send404(res);
      return;
    }
    sendFile(req, res, filePath);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} kullanımda, ${port + 1} deneniyor...`);
      startServer(port + 1);
    } else {
      console.error('Sunucu hatası:', err);
    }
  });

  server.listen(port, () => {
    console.log(`\n==================================================`);
    console.log(`🚛 Bağcılar Oto Çekici Yerel Sunucusu Yayında!`);
    console.log(`🌐 Adres: http://localhost:${port}`);
    console.log(`Durdurmak için: Ctrl + C`);
    console.log(`==================================================\n`);
  });
}

startServer(Number(PORT));
