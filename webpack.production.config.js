var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/unsubscribe_me/resources',
    entry: [
        './js/index.js',
        './css/main.css'
    ],

    output: {
        path: __dirname + '/unsubscribe_me/static/js',
        filename: "bundle.js",
        // publicPath: 'http://localhost:8080/static/'
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        ]
    },

    resolve: {
        // root: __dirname + '/resources/',
        // alias: {
        //   common: 'js/common',
        // },
        extensions: ['', '.js']

    },

    plugins: [

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("../css/styles.css")
        // new ExtractTextPlugin("styles.css")
    ],

  node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
};
