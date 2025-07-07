// A unique name for the cache
const CACHE_NAME = 'daily-planner-2025-v2';

// The list of files to be cached for offline use
const URLS_TO_CACHE = [
  './', // The main HTML file (index.html)
  'manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:wght@700&display=swap'
  // Font files loaded by the above CSS will be cached by the browser when fetched.
];

// Install event: opens the cache and adds the core files to it.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Fetch event: serves requests from the cache first (cache-first strategy).
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the request is in the cache, return the cached response
        if (response) {
          return response;
        }
        // If not in cache, fetch from the network
        return fetch(event.request);
      })
  );
});

// Activate event: cleans up old caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
