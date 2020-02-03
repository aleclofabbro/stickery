const path = require('path');
module.exports = {
  entry: "./sw.ts",
  output: {
    filename: "public/sw.js",
    path: path.resolve(__dirname, '..')
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  }
}
