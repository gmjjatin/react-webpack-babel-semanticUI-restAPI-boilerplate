const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log(__dirname)
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // this handles .css translation
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },


      // this handles images
      {
          test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
          use: 'file-loader?name=[name].[ext]?[hash]'
      },

      // the following rules handle font extraction
      {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
          test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
      },
      {
          test: /\.otf(\?.*)?$/,
          use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // this handles the bundled .css output file
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
