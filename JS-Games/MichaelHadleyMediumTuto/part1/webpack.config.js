'use strict';

const webpack = require('webpack');
const path = require('path');
const config = require('./config.json');

module.exports = {
    mode: config.mode,
    entry: './src/game.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'project.bundle.js'
    },
    module: {
        rules: [
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: '/node_modules/'
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', 'json'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ],
};
