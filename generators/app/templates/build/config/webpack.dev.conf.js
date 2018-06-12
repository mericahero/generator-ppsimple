let utils = require('../utils')
let path = require('path')
let webpack = require('webpack')
let merge = require('webpack-merge')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
let VConsolePlugin = require('vconsole-webpack-plugin')

let config = require('./config')
let baseWebpackConfig = require('./webpack.base.conf')

Object.keys(baseWebpackConfig.entry).forEach(k => {
    baseWebpackConfig.entry[k] = ['./build/config/dev-client'].concat(baseWebpackConfig.entry[k])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.sourceMap
        })
    },
    mode: 'development',
    devtool: '#source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),
        new FriendlyErrorsPlugin(),
        new VConsolePlugin({
            enable: true
        })
    ],
    devServer: config.dev
})