const webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: './js/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css!' },
      { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devServer: {
    inline: true,
    port: 10000
  }
};
