// webpack.config.js
const path = require('path');
const HTMLplugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/app.js'),
  },

  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.[chunkhash].js',
  },

  devServer: {
    port: 3000
  },

  plugins: [
    new HTMLplugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [{
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    }, ],
  },
};