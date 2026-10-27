const CACHE = 'rd-pwa-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(e.request).then((r) =>
        r || fetch(e.request).then((resp) => {
          try { c.put(e.request, resp.clone()); } catch (_) {}
          return resp;
        })
      )
    ).catch(() => fetch(e.request))
  );
});
