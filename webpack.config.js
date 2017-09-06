const path = require('path');

module.exports = {
    entry: './app/main.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader',
                include: path.join(__dirname, 'app'),
                exclude: /node_modules/,
                query: {
                        presets: ['es2015', 'react']
                }
            },
            { test: /\.jsx$/, loader: 'babel-loader',
                include: path.join(__dirname, 'app'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
