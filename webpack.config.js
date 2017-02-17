const path = require('path');

module.exports = {
  entry: path.join(process.cwd(), 'client.jsx'),
  output: {
    path: './public/',
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

