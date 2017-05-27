const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    vender: [
      'react',
      'react-dom',
      'react-apollo'
    ],
    app: [
      'react-hot-loader/patch',
      './client/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', ',jsx']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [{
        loader: 'graphql-tag/loader'
      }]
    }]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/vendor-manifest.dll.json')
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve('./dist/vendor.87e2bcd9c0dcec566399.dll.js')
    }),
    new HtmlWebpackPlugin({
      title: '后台管理系统',
      inject: true,
      template: './client/index.html',
      filename: 'index.html',
      chunksSortMode: 'auto',
      minify: false,  // HTML压缩
      hash: false,    // 防缓存随机串
      xhtml: true,
      chunks: ['manifest', 'vendor', 'app'],
      cache: true,
      showErrors: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9001,
    hot: true,
    publicPath: '/'
  }
}
