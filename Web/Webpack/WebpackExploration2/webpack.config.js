const path = require('path');
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        library: 'BIMData',
        libraryTarget: 'var',
    },
    plugins: [
        new EsmWebpackPlugin()
    ]
};