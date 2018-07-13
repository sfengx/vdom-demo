const express = require('express');

var app = express();
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');

var compiler = webpack(webpackDevConfig);

var devMiddleware = webpackDevMiddleware(compiler, {
    // publicPath与webpack.config.js保持一致
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
})

var hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {}
});

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(devMiddleware);

app.use(hotMiddleware);

app.use(express.static('./'));

app.listen(8080, function () {
    console.log('App (dev) is now running on port 8080!');
});