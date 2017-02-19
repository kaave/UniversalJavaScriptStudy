const fs = require('fs');

const nodeModules = (() => {
  const result = {}

  fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => (result[mod] = `commonjs ${mod}`))

  return result
})();

module.exports = {
  context: process.cwd(),
  entry: './entry_points/server.jsx',
  target: 'node',
  output: {
    path: './dist/',
    filename: 'server.js'
  },
  externals: nodeModules,
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
          'isomorphic-style-loader',
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
      }
    ]
  }
};

