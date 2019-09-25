// This is the "Offline page" service worker

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "ToDo-replace-this-name.html";

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", function (event) {
  console.log("[PWA Builder] Install Event processing");

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("[PWA Builder] Cached offline page during install");

      if (offlineFallbackPage === "ToDo-replace-this-name.html") {
        return cache.add(new Response("TODO: Update the value of the offlineFallbackPage constant in the serviceworker."));
      }

      return cache.add(offlineFallbackPage);
    })
  );
});

// If any fetch fails, it will show the offline page.
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(function (error) {
      // The following validates that the request was for a navigation to a new document
      if (
        event.request.destination !== "document" ||
        event.request.mode !== "navigate"
      ) {
        return;
      }

      console.error("[PWA Builder] Network request Failed. Serving offline page " + error);
      return caches.open(CACHE).then(function (cache) {
        return cache.match(offlineFallbackPage);
      });
    })
  );
});

// This is an event that can be fired from your page to tell the SW to update the offline page
self.addEventListener("refreshOffline", function () {
  const offlinePageRequest = new Request(offlineFallbackPage);

  return fetch(offlineFallbackPage).then(function (response) {
    return caches.open(CACHE).then(function (cache) {
      console.log("[PWA Builder] Offline page updated from refreshOffline event: " + response.url);
      return cache.put(offlinePageRequest, response);
    });
  });
});


// var CACHE_NAME = 'otimigas-app';

// var urlsToCache = [
//     '/',
//     '/index.html',
//     '/manifest.js',
// ];

// self.addEventListener('install', function (event) {
//     // Perform install steps
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(function (cache) {
//                 return cache.addAll(urlsToCache);
//             })
//     );
// });

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {
//                 // Cache hit - return response
//                 if (response) {
//                     return response;
//                 }
//                 return fetch(event.request);
//             }
//             )
//     );
// });

// self.addEventListener('activate', function activator(event) {
//     event.waitUntil(
//       caches.keys().then(function (keys) {
//         return Promise.all(keys
//           .filter(function (key) {
//             return key.indexOf(CACHE_NAME) !== 0;
//           })
//           .map(function (key) {
//             return caches.delete(key);
//           })
//         );
//       })
//     );
//   });