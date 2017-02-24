const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: process.cwd(),
  entry: './entry_points/client.jsx',
  output: {
    path: './dist/',
    filename: 'client.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[name]-[local]-[hash:base64:5]',
                modules: true
              }
            },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ]
};

