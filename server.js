import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const compiler = webpack({
  entry: path.resolve(__dirname, 'src', 'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      }
    ]
  },
  output: { filename: '/app.js', path: '/', publicPath: '/js/' }
});

const appServer = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/js/',
  stats: { colors: true }
});

appServer.use('/', express.static(path.resolve(__dirname, 'public')));
appServer.listen(3000);
