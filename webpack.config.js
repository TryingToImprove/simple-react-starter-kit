var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')

var sassLoaders = [
  "css-loader",
  "autoprefixer-loader?browsers=last 2 version",
  "sass?includePaths[]=" + path.resolve(__dirname, "src"),
];

module.exports = {
    entry: [
        path.resolve(__dirname, "src/scripts/App.js")
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
        publicPath: "/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            inject: false
        })
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=0' },
            { test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("style", sassLoaders.join("!"))},
            { test: /\.html$/, exclude: /node_modules/, loader: "html" }
        ]
    },

    resolve: {
        extensions: ["", ".html", ".js", ".scss"],
        alias: {
            stylesheet: "../stylesheet"
        }
    },

    devServer: {
        contentBase: "./dist",
        inline: true
    }
}