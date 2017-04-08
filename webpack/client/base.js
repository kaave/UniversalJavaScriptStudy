const
  webpack = require('webpack'),
  path = require('path');

module.exports = {
  base: {
    context: process.cwd(),
    entry: {
      app: ['./source/entry_points/client.jsx']
    },
    output: {
      path: path.join(__dirname, '..', '..', 'dist'),
      publicPath: '/',
      filename: '[name].js'
    }
  }
};

