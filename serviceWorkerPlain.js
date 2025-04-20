const STATIC_CACHE = "weather-static-v1";
const API_CACHE = "weather-api-v1";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.json",
  "./src/assets/image.png",
  "./src/index.css",
  "./dist/",
  "./src/main.tsx",
  "./src/App.tsx"
];

const self = this;

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [STATIC_CACHE, API_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - handle requests
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Handle API requests (weather data)
  if (url.pathname.includes("/api/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response
          const responseToCache = response.clone();
          
          // Cache the response with expiration (2 hours)
          caches.open(API_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
            // Delete old cached responses after 2 hours
            setTimeout(() => {
              cache.delete(event.request);
            }, 2 * 60 * 60 * 1000);
          });
          
          return response;
        })
        .catch(() => {
          // If network fails, try to return cached response
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If no cached response, return offline page
            return caches.match("./offline.html");
          });
        })
    );
    return;
  }

  // Handle static assets (cache-first strategy)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If the request is for a page, return offline page
          if (event.request.mode === "navigate") {
            return caches.match("./offline.html");
          }
        });
    })
  );
});
