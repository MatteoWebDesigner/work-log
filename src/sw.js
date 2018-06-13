importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

workbox.routing.registerRoute(
    new RegExp('/.*'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'cache',
    })
);