const CACHE_VERSION = 'v2';
const STATIC_CACHE_NAME = `abuzz-store-static-${CACHE_VERSION}`;
const IMAGE_CACHE_NAME = `abuzz-store-images-${CACHE_VERSION}`;
const MAX_IMAGE_CACHE_ITEMS = 60; // Max number of product images to cache to prevent memory bloat

const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/abuzz-logo.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Helper to trim cache size and auto-delete old items (FIFO / LRU eviction)
async function trimCache(cacheName, maxItems) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
      const itemsToDelete = keys.slice(0, keys.length - maxItems);
      await Promise.all(itemsToDelete.map((req) => cache.delete(req)));
      console.log(`[SW Cache Auto-Delete] Evicted ${itemsToDelete.length} old cached image(s).`);
    }
  } catch (err) {
    console.warn('[SW Cache Cleanup Error]:', err);
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Automatic deletion of ALL old cache versions during SW activation
self.addEventListener('activate', (event) => {
  const allowedCaches = [STATIC_CACHE_NAME, IMAGE_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!allowedCaches.includes(cacheName)) {
            console.log(`[SW Auto-Delete] Removing old cache bucket: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // Bypass service worker for Next.js internal routes, RSC, API calls, and Firebase
  if (
    requestUrl.pathname.startsWith('/_next/') ||
    requestUrl.pathname.startsWith('/api/') ||
    requestUrl.searchParams.has('_rsc') ||
    requestUrl.hostname.includes('firestore.googleapis.com') ||
    requestUrl.hostname.includes('identitytoolkit.googleapis.com') ||
    requestUrl.hostname.includes('localhost') ||
    requestUrl.hostname.includes('127.0.0.1')
  ) {
    return;
  }

  const isImageRequest = (
    requestUrl.pathname.match(/\.(jpg|jpeg|png|webp|svg|gif|ico)$/i) ||
    requestUrl.hostname.includes('cdn.abuzz.store') ||
    requestUrl.pathname.includes('/products/')
  );

  // Only handle image requests with Stale-While-Revalidate
  if (isImageRequest) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
              trimCache(IMAGE_CACHE_NAME, MAX_IMAGE_CACHE_ITEMS);
            }
            return networkResponse;
          })
          .catch(() => {
            if (cachedResponse) return cachedResponse;
            return new Response('Image unavailable', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({ 'Content-Type': 'text/plain' })
            });
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Let browser natively handle all document navigation & page requests
});
