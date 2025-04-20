export const globDirectory = "dist/";
export const globPatterns = [
  "**/*.{html,json,js,css,png,jpg,jpeg,svg,ico}"
];
export const swDest = "dist/serviceWorkerWorkBox.js";
export const sourcemap = false;
export const cleanupOutdatedCaches = true;
export const skipWaiting = true;
export const clientsClaim = true;
export const runtimeCaching = [
  {
    urlPattern: /^https:\/\/api\.openweathermap\.org/,
    handler: "NetworkFirst",
    options: {
      cacheName: "weather-api-cache",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 2 * 60 * 60 // 2 hours
      },
      cacheableResponse: {
        statuses: [0, 200]
      }
    }
  },
  {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
    handler: "CacheFirst",
    options: {
      cacheName: "images",
      expiration: {
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      }
    }
  },
  {
    urlPattern: /\.(?:js|css)$/,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-resources"
    }
  },
  {
    urlPattern: /^https:\/\/fonts\.googleapis\.com/,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "google-fonts-stylesheets"
    }
  },
  {
    urlPattern: /^https:\/\/fonts\.gstatic\.com/,
    handler: "CacheFirst",
    options: {
      cacheName: "google-fonts-webfonts",
      expiration: {
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
      }
    }
  }
]; 