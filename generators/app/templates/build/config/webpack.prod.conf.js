let path = require('path')
let fs = require('fs')
let webpack = require('webpack')
let merge = require('webpack-merge')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let utils = require('../utils')
let config = require('./config')
let baseWebpackCOnfig = require('./webpack.base.conf')

let webpackConfig = merge(baseWebpackCOnfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  mode: 'production',
  devtool: false,
  output: {
    path: config.build.asset,
    filename: utils.assetsPath('[name].js?v=[chunkhash:10]'),
    chunkFilename: utils.assetsPath('[name].js?v=[chunkhash:10]')
  },
  node: {
    'fs': 'empty',
    'path': 'empty',
    'process': false
  },
  resolve: {
    // alias:{
    //   'html-minifier':'node-noop'
    // }
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        warnings: false,
        compress: true,
        output: {
          beautify: false
        },
        mangle: {
          reserved: ['$', 'Zepto', 'zepto']
        }
      }
    })],
    splitChunks: {
      chunks: 'all', //"async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'common/js/vendor'
        },
        //打包第三方类库
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: Infinity
        }
      },
      // default: {
      //   minChunks: 2,
      //   priority: -20,
      //   reuseExistingChunk: true
      // }
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    new ExtractTextPlugin(utils.assetsPath('css/[name].css?v=[chunkhash:7]')),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // new UglifyJsPlugin({
    //   parallel: true,
    //   uglifyOptions: {
    //     warnings: false,
    //     compress: false,
    //     output: {
    //       beautify: false
    //     },
    //     mangle: {
    //       reserved: ['$','Zepto','zepto']
    //     }
    //   }
    // })
  ]
})





if (config.build.productionGzip) {
  let CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
if (config.build.bundleAnalyzerReport) {
  let BundleAnalyzerPlugin = require('webpack-bundle-analyzer-plugin').BundleAnalyzerPlugin

  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig
