var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: "./js/stopwatch.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css!' },
      { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
    ],
  },
  devServer: {
    inline: true,
    port: 10000,
  },
};