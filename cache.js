var Cache = {
  VERSION: 'V12',
  FILES: [
    '/',
    '/index.html',
    '/index.html?launcher=true',
    '/index.html/#/',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/roboto/v16/Hgo13k-tfSpn0qi1SFdUfbO3LdcAZYWl9Si6vvxL-qU.woff',
    'https://fonts.gstatic.com/s/roboto/v16/CrYjSnGjrRCn0pd9VQsnFOvvDin1pK8aKteLpeZ5c0A.woff',
    'https://fonts.gstatic.com/s/roboto/v16/RxZJdnzeo3R5zSexge8UUbO3LdcAZYWl9Si6vvxL-qU.woff',
    'https://fonts.gstatic.com/s/roboto/v16/d-6IYplOFocCacKzxwXSOLO3LdcAZYWl9Si6vvxL-qU.woff',
    'https://fonts.gstatic.com/s/materialicons/v27/2fcrYFNaTjcS6g4U3t-Y5RV6cRhDpPC5P4GCEJpqGoc.woff',
    'manifest.json',
    'static/image/launcher-icon-1x.png',
    'static/image/launcher-icon-2x.png',
    'static/image/launcher-icon-4x.png',
  ],
  init: function() {
    self.addEventListener('install', this.onInstall.bind(this));
    self.addEventListener('fetch', this.onFetch.bind(this));
    self.addEventListener('activate', event => {
      event.waitUntil(self.clients.claim());
    });
    self.addEventListener('foreignfetch', function(e) {
      e.respondWith(fetch(e.request).then(response => ({ response: response })));
    });
  },
  onInstall: function(event) {
    console.log('onInstall');
    caches.keys().then(function(cachesNames) {
      return Promise.all(cachesNames.map(function(cacheName) {
        return caches.delete(cacheName).then(function() {
          console.log("Cache with name " + cacheName + " is deleted");
        });
      }))
    }).then(function() {
      console.log("All " + " caches are deleted");
    });
    event.waitUntil(caches.open(this.VERSION).then(this.onOpen.bind(this)));
  },
  onOpen: function(cache) {
    console.log('onOpen');

    return cache.addAll(this.FILES).then(() => self.skipWaiting());
  },
  onFetch: function(event) {
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  }

};
Cache.init();
