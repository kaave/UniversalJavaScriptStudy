const webpack = require('webpack')

module.exports = {
  context: process.cwd(),
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    `./source/entry_points/client.jsx`,
  ],
  output: {
    path: `${__dirname}/../dist/`,
    publicPath: '/',
    filename: 'client.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
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
          'postcss-loader'
        ]
      }
    ]
  }
};

