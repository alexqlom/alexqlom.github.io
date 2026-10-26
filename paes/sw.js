// Cache propio de la app PAES (alcance /paes/): abre sin conexión y no toca el cache de otras apps del sitio.
// La lista y la versión las actualiza tools/sync.js.
const CACHE = 'paes-1dfa6851';
const SHELL = ["./","./index.html","./app.css","./app.js","./icons.js","./video.js","./toon.js","./toon-arte.js","./toon-mapas.js","./toon-motor.js","./data/tests.js","./audio/indice.js","./data/bio-1.js","./data/bio-2.js","./data/bio-3.js","./data/bio-4.js","./data/bio-5.js","./data/bio-6.js","./data/fis-1.js","./data/fis-2.js","./data/fis-3.js","./data/fis-4.js","./data/his-1.js","./data/his-2.js","./data/his-3.js","./data/his-4.js","./data/his-5.js","./data/his-6.js","./data/his-7.js","./data/his-8.js","./data/his-9.js","./data/lec-1.js","./data/lec-2.js","./data/m1-1.js","./data/m1-2.js","./data/m1-3.js","./data/m1-4.js","./data/m1-5.js","./data/m1-6.js","./data/m2-1.js","./data/m2-2.js","./data/m2-3.js","./data/qui-1.js","./data/qui-2.js","./data/qui-3.js","./data/toon-h1.js","./data/toon-h10.js","./data/toon-h11.js","./data/toon-h12.js","./data/toon-h13.js","./data/toon-h14.js","./data/toon-h15.js","./data/toon-h16.js","./data/toon-h2.js","./data/toon-h3.js","./data/toon-h4.js","./data/toon-h5.js","./data/toon-h6.js","./data/toon-h7.js","./data/toon-h8.js","./data/toon-h9.js","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('paes-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // con señal, la versión más nueva; sin señal, la guardada
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put('./index.html', copy));
      return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
