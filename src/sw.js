importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

workbox.setConfig({ debug: false });

workbox.routing.registerRoute(
    new RegExp('/.*'),
    workbox.strategies.networkFirst({
      cacheName: 'cache',
    })
);