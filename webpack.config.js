const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          ExtractCssChunks.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
              name: 'fonts/[name]-[hash:8].[ext]',
          },
        }
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html'
    }),
    new ExtractCssChunks(
      {
        filename: '[name].css',
        chunkFilename: '[id].css',
        hot: true,
        orderWarning: true,
        reloadAll: true,
        cssModules: true
      }
    ),
    new OptimizeCssAssetsPlugin()
  ]
}