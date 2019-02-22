const path = require('path');
const webpack = require('webpack');

const sourcePath = path.join(__dirname, 'src');
const reactApePath = path.join(__dirname, '../react-ape');

const config = {
  mode: 'development',
  entry: [path.resolve(sourcePath, 'App.js')],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: [reactApePath, sourcePath],
      },
    ],
  },
  plugins: [new webpack.NamedModulesPlugin()],
  devServer: {
    compress: false,
    host: '0.0.0.0',
    open: true,
    port: 9000,
    historyApiFallback: {
      index: path.join(__dirname, 'index.html'),
    },
  },
};

module.exports = config;
