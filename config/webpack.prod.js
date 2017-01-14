
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');


module.exports = webpackMerge(commonConfig, {
  debug: false,
  devtool: 'source-map',

  plugins: [
    new DedupePlugin(),
    new UglifyJsPlugin({
      beautify: false, //prod
      mangle: { screw_ie8 : true }, //prod
      compress: { screw_ie8: true }, //prod
      comments: false //prod
    })
  ]
});