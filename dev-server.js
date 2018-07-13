const express = require('express');

var app = express();
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');

var compiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(compiler, {
    // publicPath与webpack.config.js保持一致
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./'));

app.listen(8080, function () {
    console.log('App (dev) is now running on port 8080!');
});