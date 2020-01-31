importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (!workbox) {
  console.log(`Workbox didn't load`);
  // console.log(`Boo! Workbox didn't load 😬`);
} else {

  console.log(`Workbox loaded`);
  // console.log(`Yay! Workbox is loaded 🎉`);
  workbox.setConfig({ debug: false });

  // console.log(`precaching`, self.__precacheManifest);
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'js-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          // Cache for a maximum of 2 week.
          maxAgeSeconds: 14 * 24 * 60 * 60,
        })
      ],
    })
  );

  workbox.routing.registerRoute(
    // Cache CSS files.
    /\.css$/,
    // Use cache but update in the background.
    new workbox.strategies.CacheFirst({
      // Use a custom cache name.
      cacheName: 'css-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          // Cache for a maximum of 2 week.
          maxAgeSeconds: 14 * 24 * 60 * 60,
        })
      ],
    })
  );

  workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
      // Use a custom cache name.
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          // Cache for a maximum of 2 week.
          maxAgeSeconds: 14 * 24 * 60 * 60,
        })
      ],
    })
  );
  workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:html|htm)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
      // Use a custom cache name.
      cacheName: 'html-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          // Cache for a maximum of 2 week.
          maxAgeSeconds: 14 * 24 * 60 * 60,
        })
      ],
    })
  );
  workbox.routing.registerRoute(
    /\//,
    new workbox.strategies.CacheFirst({
      cacheName: 'html-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          // Cache for a maximum of 2 week.
          maxAgeSeconds: 14 * 24 * 60 * 60,
        })
      ],
    })
  );
}
