var cacheName = 'v0.2.1';

var fileToCache = [
    './',
    './index.html',
    './src/style.css',
    './src/app.js',
    './images/icon.png',
    './images/cover.jpg',
    './images/loading.svg',
    'https://ogufah3ag.qnssl.com/0.mp3'
];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(fileToCache).then(function(){
                self.skipWaiting();
            });
        })
    );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request)
        })
    )
});
