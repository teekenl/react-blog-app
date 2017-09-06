const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app/main.js',
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: "/dist/"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader',
                include: path.resolve(__dirname, 'app'),
                exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};
