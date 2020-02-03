const WorkboxPlugin = require('workbox-webpack-plugin');
const {
  override,
  addWebpackPlugin,
  // adjustWorkbox
} = require("customize-cra");

module.exports = override(

  // addWebpackPlugin(
  //   new WorkboxPlugin.InjectManifest({
  //     swSrc: './sw/sw.js',
  //     swDest: 'sw.js',

  //   })
  // ),
  addWebpackPlugin(
    new WorkboxPlugin.InjectManifest({
      swSrc: './public/sw.js',
    })
  )
  // // adjust the underlying workbox
  // adjustWorkbox(wb =>
  //   Object.assign(wb, {
  //     skipWaiting: true,
  //     exclude: (wb.exclude || []).concat("index.html")
  //   })
  // )
);
