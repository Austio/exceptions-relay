const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");


module.exports = {
  entry: "./src/index.js",
  output: {
    publicPath: "/"
  },
  module: {
    loaders: [{
      test: /\.css/,
      loader: "style!css"
    }, {
      test: /\.js$/,
      loader: "babel",
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { GRAPHQL_ENDPOINT: JSON.stringify(process.env.GRAPHQL_ENDPOINT) },
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
};
