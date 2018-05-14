const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const isProd = process.env.NODE_ENV != undefined;
const scssDev = ['style-loader', 'css-loader', 'sass-loader'];
const scssProd = ExtractTextPlugin.extract({
  use: [
    { loader: 'css-loader', options: { minimize: true, sourceMap: true, discardComments: { removeAll: true } } },
    { loader: 'sass-loader', options: { sourceMap: true } },
  ],
});
const cssDev = ['style-loader', 'css-loader'];
const cssProd = ExtractTextPlugin.extract({ use: 'css-loader' });
const scssConfig = isProd ? scssProd : scssDev;
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssConfig,
      },
      {
        test: /\.(scss|sass)$/,
        use: scssConfig,
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          useRelativePath: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    historyApiFallback: {
      index: 'another.html',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: !isProd,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/layouts/index.pug',
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/js/service-worker/sw.js'),
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /([\\/]node_modules[\\/]|[\\/]src[\\/]js[\\/]vendor[\\/])/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
