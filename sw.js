var cacheName = 'v0.1';

var music = 'http://7xs1gu.com1.z0.glb.clouddn.com/0.m4a';
var fileToCache = [
    './',
    './index.html',
    './src/style.css',
    './src/app.js',
    './images/icon.png'
];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(fileToCache).then(function(){
                self.skipWaiting();
                console.log('done');
            });
        })
    );
});

self.addEventListener('fetch', function(event){
    if (event.request.url.indexOf(music) === 0) {
        event.respondWith(
            fetch(event.request)
                .then(function(response) {
                    return caches.open(cacheName).then(function(cache) {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});
