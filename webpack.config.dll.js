/**
 * Created by chaofang on 2017/5/19.
 */
const webpack = require('webpack');
const path = require('path');

const vendors = [
  'prop-types',
  'react',
  'react-apollo',
  'react-dom',
];

module.exports = {
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].dll.js',
    library: '[name]_[chunkhash]',
    sourceMapFilename: '[name].[chunkhash].dll.js.map'
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "dist", "[name]-manifest.dll.json"),
      context: __dirname,
      name: "[name]_[chunkhash]",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|dist|dist_electron|.cache|.happypack)/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  }
};
