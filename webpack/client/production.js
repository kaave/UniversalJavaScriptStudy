const
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const { base } = require('./base');

module.exports = Object.assign({}, base, {
  cache: false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                modules: true,
                minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '\'production\'' }),
    new webpack.LoaderOptionsPlugin({ debug: false }),
    new ExtractTextPlugin('[name].css'),
    new UglifyJSPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});

