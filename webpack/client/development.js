const webpack = require('webpack')

const { base } = require('./base');

const entry = {};
Object.keys(base.entry).forEach(key => (entry[key] = [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  ...base.entry[key]
]));

module.exports = Object.assign({}, base, {
  entry,
  devtool: 'inline-source-map',
  cache: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              modules: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '\'development\'' }),
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});

