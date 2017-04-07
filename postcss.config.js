module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: [
        'last 2 versions',
        'ie >= 9',
        'ios >= 8'
      ]
    }
  }
};
