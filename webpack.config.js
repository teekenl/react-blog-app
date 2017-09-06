const path = require('path');
module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    devServer: {
        port: 7777
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};
