const path = require("path")

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        "select-file": "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/public/",
        filename: "[name].js",
        library: "selectFile",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader?cacheDirectory=true",
                exclude: /node_modules/
            },
        ]
    },
}