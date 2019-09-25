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