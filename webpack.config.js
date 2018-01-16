const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.ProvidePlugin({
      Vue: ['../../node_modules/vue/dist/vue.esm.js', 'default'],
    }),
  ],
};


module.exports = config;