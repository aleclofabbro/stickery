import * as Routing from 'workbox-routing'
// import * as Startegies from 'workbox-strategies'
// import * as Expiration from 'workbox-expiration'
import 'workbox-sw'
// import * as Precaching from 'workbox-precaching'
import { ImagesDB } from '../src/srv/db/db'

const imagesDB = new ImagesDB()
// declare var self: ServiceWorkerGlobalScope

// console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@`)
if (!workbox) {
  console.log(`Workbox didn't load`)
  // console.log(`Boo! Workbox didn't load 😬`);
} else {
  console.log(`Workbox loaded`)
  // console.log(`Yay! Workbox is loaded 🎉`);
  workbox.setConfig({ debug: false })

  // console.log(`precaching`, self.__precacheManifest);
  //@ts-ignore
  // Precaching.precacheAndRoute(self.__precacheManifest || [])
  // Routing.registerRoute(new RegExp('/.*'), {
  Routing.registerRoute(new RegExp('.*/_/images/.*'), {
    handle: async (req) => {
      // console.log('#####', req.url.pathname)
      const id = req.url.pathname
      const img = await imagesDB.imageData.get(id)
      const meta = await imagesDB.imageMeta.get(id)
      // console.log('#####', img, meta)
      if (!(img && meta)) {
        return new Response('BABABA')
      }
      const opts: FilePropertyBag = { lastModified: meta.lastModified, type: meta.type }

      const file = new File([img.blob as BlobPart], meta.name, opts)
      return new Response(file)
    }
  })
  // Routing.registerRoute(
  //   /\.js$/,
  //   new Startegies.CacheFirst({
  //     cacheName: 'js-cache',
  //     plugins: [
  //       new Expiration.Plugin({
  //         maxEntries: 20,
  //         // Cache for a maximum of 2 week.
  //         maxAgeSeconds: 14 * 24 * 60 * 60
  //       })
  //     ]
  //   })
  // )

  // Routing.registerRoute(
  //   // Cache CSS files.
  //   /\.css$/,
  //   // Use cache but update in the background.
  //   new Startegies.CacheFirst({
  //     // Use a custom cache name.
  //     cacheName: 'css-cache',
  //     plugins: [
  //       new Expiration.Plugin({
  //         maxEntries: 20,
  //         // Cache for a maximum of 2 week.
  //         maxAgeSeconds: 14 * 24 * 60 * 60
  //       })
  //     ]
  //   })
  // )

  // Routing.registerRoute(
  //   // Cache image files.
  //   /\.(?:png|jpg|jpeg|svg|gif)$/,
  //   // Use the cache if it's available.
  //   new Startegies.CacheFirst({
  //     // Use a custom cache name.
  //     cacheName: 'image-cache',
  //     plugins: [
  //       new Expiration.Plugin({
  //         maxEntries: 20,
  //         // Cache for a maximum of 2 week.
  //         maxAgeSeconds: 14 * 24 * 60 * 60
  //       })
  //     ]
  //   })
  // )
  // Routing.registerRoute(
  //   // Cache image files.
  //   /\.(?:html|htm)$/,
  //   // Use the cache if it's available.
  //   new Startegies.CacheFirst({
  //     // Use a custom cache name.
  //     cacheName: 'html-cache',
  //     plugins: [
  //       new Expiration.Plugin({
  //         maxEntries: 20,
  //         // Cache for a maximum of 2 week.
  //         maxAgeSeconds: 14 * 24 * 60 * 60
  //       })
  //     ]
  //   })
  // )
  // Routing.registerRoute(
  //   /\//,
  //   new Startegies.CacheFirst({
  //     cacheName: 'html-cache',
  //     plugins: [
  //       new Expiration.Plugin({
  //         maxEntries: 20,
  //         // Cache for a maximum of 2 week.
  //         maxAgeSeconds: 14 * 24 * 60 * 60
  //       })
  //     ]
  //   })
  // )
}
