const CACHE_NAME = 'code3d-v7';

// Ficheiros a guardar em cache na instalação
const PRECACHE = [
    '/',
    '/index.html',
    '/app.js',
    '/manifest.json',
    // Three.js via CDN — também cacheado na primeira visita
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/STLExporter.js',
    // Fontes Google
    'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&display=swap'
];

// ── INSTALL: pré-carrega tudo ─────────────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE))
            .then(() => self.skipWaiting())
    );
});

// ── ACTIVATE: apaga caches antigas ───────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// ── FETCH: cache-first, network fallback ─────────────────
self.addEventListener('fetch', event => {
    // Ignora requests não-GET
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request)
                .then(response => {
                    // Só cacheia respostas válidas
                    if (!response || response.status !== 200) return response;

                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, clone);
                    });

                    return response;
                })
                .catch(() => {
                    // Fallback offline: devolve index.html para navegação
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                });
        })
    );
});
