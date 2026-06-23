const CACHE_VERSION = 'v1';
const CACHE_STATIC = `paraiso-static-${CACHE_VERSION}`;
const CACHE_IMAGES = `paraiso-images-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/negocios.js',
  '/style.css',
  '/assets/logo-paradiso.svg',
  '/assets/negocios/placeholder-logo.svg',
  '/assets/negocios/la-cafetera/Cafetera.jpeg',
  '/assets/negocios/dejamu/image_495.png',
  '/assets/negocios/satomi-bento/SATOMI-1.png',
  '/assets/negocios/cafe-pintado/images.png',
  '/assets/negocios/el-obelisco/Elobelisco.jpg',
  '/assets/negocios/el-bochinche/images.jpg',
  '/assets/negocios/cali-coffee-tour/images.jpg',
  '/assets/negocios/sabor-peruano/logo.jpg',
  '/assets/negocios/uepa-ve/Mira ve.png',
  '/assets/negocios/bandeja-coreana/logo.jpg',
  '/assets/negocios/monster-park/logo.jpeg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_STATIC && k !== CACHE_IMAGES)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar same-origin
  if (url.origin !== self.location.origin) return;

  // HTML: Network First con fallback a cache
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_STATIC).then((c) => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Imágenes de menú: Cache First, luego red y guardar
  if (url.pathname.includes('/menu-')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE_IMAGES).then((c) => c.put(request, clone));
          return res;
        });
      })
    );
    return;
  }

  // Assets estáticos: Cache First
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
