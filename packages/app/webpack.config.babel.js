const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const reactApePath = path.join(__dirname, '../react-ape');

const config = {
  mode: 'development',
  entry: [path.resolve(sourcePath, 'App.js')],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: 'auto',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'App',
      template: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath,
      reactApePath,
      path.resolve(__dirname, 'node_modules'),
      // yarn-workspaces
      path.resolve(__dirname, '../../node_modules'),
    ],
  },
  externals: [
    sourcePath,
    reactApePath,
    path.resolve(__dirname, 'node_modules'),
    // yarn-workspaces
    path.resolve(__dirname, '../../node_modules'),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [reactApePath, sourcePath],
        options: {
          rootMode: 'upward',
        },
      },
    ],
  },
  devServer: {
    compress: false,
    host: '0.0.0.0',
    open: true,
    port: 8080,
    hot: true,
  },
};

module.exports = config;
