const webpack = require('webpack');

const { base } = require('./base');

module.exports = Object.assign({}, base, {
  cache: false,
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '\'production\'' }),
    new webpack.LoaderOptionsPlugin({ debug: true })
  ]
});

