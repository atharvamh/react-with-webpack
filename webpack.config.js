const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config({
    path: path.join(__dirname, '.env')
})

// mini-css-extract-plugin creates a seperate main.css file in the build for all styling content
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: __dirname,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.bundle.js",
        publicPath: "/"
    },
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000
    },
    devServer: {
        port: process.env.PORT || 3000,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(scss|sass|css)/,
                exclude: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                exclude: /node_modules/,
                use: ["file-loader?name=[name].[ext]"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html",
            favicon: path.resolve(__dirname, "public/favicon.ico"),
            manifest: path.resolve(__dirname, "public/manifest.json")
        }),
        new webpack.DefinePlugin({
            "process.env": dotenv.parsed
        }),
        new MiniCSSExtractPlugin()
    ]
}