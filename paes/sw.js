// Cache propio de la app PAES (alcance /paes/): abre sin conexión y no toca el cache de otras apps del sitio.
// La lista y la versión las actualiza tools/sync.js.
const CACHE = 'paes-98a7dadc';
const SHELL = ["./","./index.html","./app.css","./app.js","./icons.js","./video.js","./toon.js","./toon-arte.js","./toon-mapas.js","./toon-motor.js","./data/tests.js","./audio/indice.js","./data/bio-1.js","./data/bio-2.js","./data/bio-3.js","./data/bio-4.js","./data/bio-5.js","./data/bio-6.js","./data/fis-1.js","./data/fis-2.js","./data/fis-3.js","./data/fis-4.js","./data/his-1.js","./data/his-2.js","./data/his-3.js","./data/his-4.js","./data/his-5.js","./data/his-6.js","./data/his-7.js","./data/his-8.js","./data/his-9.js","./data/lec-1.js","./data/lec-2.js","./data/m1-1.js","./data/m1-2.js","./data/m1-3.js","./data/m1-4.js","./data/m1-5.js","./data/m1-6.js","./data/m2-1.js","./data/m2-2.js","./data/m2-3.js","./data/qui-1.js","./data/qui-2.js","./data/qui-3.js","./data/toon-ba.js","./data/toon-bb.js","./data/toon-bc.js","./data/toon-bd.js","./data/toon-be.js","./data/toon-bf.js","./data/toon-bg.js","./data/toon-bh.js","./data/toon-bi.js","./data/toon-bj.js","./data/toon-bk.js","./data/toon-fa.js","./data/toon-fb.js","./data/toon-fc.js","./data/toon-fd.js","./data/toon-fe.js","./data/toon-ff.js","./data/toon-fg.js","./data/toon-fh.js","./data/toon-h1.js","./data/toon-h10.js","./data/toon-h11.js","./data/toon-h12.js","./data/toon-h13.js","./data/toon-h14.js","./data/toon-h15.js","./data/toon-h16.js","./data/toon-h17.js","./data/toon-h18.js","./data/toon-h2.js","./data/toon-h3.js","./data/toon-h4.js","./data/toon-h5.js","./data/toon-h6.js","./data/toon-h7.js","./data/toon-h8.js","./data/toon-h9.js","./data/toon-lec1.js","./data/toon-lec2.js","./data/toon-lec3.js","./data/toon-lec4.js","./data/toon-lec5.js","./data/toon-lec6.js","./data/toon-m1a.js","./data/toon-m1b.js","./data/toon-m1c.js","./data/toon-m1d.js","./data/toon-m1e.js","./data/toon-m1f.js","./data/toon-m1g.js","./data/toon-m1h.js","./data/toon-m1i.js","./data/toon-m1j.js","./data/toon-m1k.js","./data/toon-m1l.js","./data/toon-m2a.js","./data/toon-m2b.js","./data/toon-m2c.js","./data/toon-m2d.js","./data/toon-m2e.js","./data/toon-m2f.js","./data/toon-qa.js","./data/toon-qb.js","./data/toon-qc.js","./data/toon-qd.js","./data/toon-qe.js","./data/toon-qf.js","./data/toon-qg.js","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
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
