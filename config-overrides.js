const WorkboxPlugin = require('workbox-webpack-plugin');
const {
  override,
  addWebpackPlugin
} = require("customize-cra");

module.exports = override(
  addWebpackPlugin(
    new WorkboxPlugin.InjectManifest({
      swSrc: './public/sw.js',
    })
  )
);
