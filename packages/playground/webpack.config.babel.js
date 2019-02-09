const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const reactApePath = path.join(__dirname, '../react-ape');

const config = {
  target: 'web',
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
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    open: true,
    contentBase: __dirname,
    hot: true,
    inline: true,
    compress: false,
    port: 9000,
    watchContentBase: true,
    historyApiFallback: {
      index: path.join(__dirname, 'index.html'),
    },
  },
};

// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(
//     new UglifyJsPlugin({
//       uglifyOptions: {
//         output: {
//           comments: false,
//         },
//         compress: {
//           warnings: false,
//         },
//       },
//     })
//   );
//   config.plugins.push(
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify('production'),
//     })
//   );
//   config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
//   config.plugins.push(new webpack.HashedModuleIdsPlugin());
// }

module.exports = config;
