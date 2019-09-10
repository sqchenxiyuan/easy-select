const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    'easy-select-file': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public/',
    filename: '[name].js',
    library: 'easySelectFile',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/
      }
    ]
  }
}
