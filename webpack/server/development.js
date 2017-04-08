const webpack = require('webpack');

const { base } = require('./base');

module.exports = Object.assign({}, base, {
  cache: true,
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '\'development\'' }),
    new webpack.LoaderOptionsPlugin({ debug: false })
  ]
});

