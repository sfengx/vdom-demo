const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    mode: 'development',

    entry:[ 'webpack-hot-middleware/client?noInfo=true&reload=true', './src/main.js'],

    output: {
        path: path.resolve(__dirname, './dist'),

        filename: 'app.js',

        publicPath: '/',

        library: 'libs'
    },

    module: {

        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            chunks: {},
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]

}