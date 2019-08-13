const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    'select-file': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public/',
    filename: '[name].js',
    library: 'EasySelect',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
