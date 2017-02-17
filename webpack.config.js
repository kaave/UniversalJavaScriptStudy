const path = require('path');

module.exports = {
  entry: path.join(process.cwd(), 'client.jsx'),
  output: {
    path: './dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
};

