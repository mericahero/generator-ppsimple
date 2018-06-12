let utils = require('../utils')
let config = require('./config')
let path = require('path')
let fs=require('fs')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let vueLoaderConfig = require('./vue-loader.conf')

let webpackConfig = {
    entry: config.entry,
    output: {
        path: config.build.asset,
        filename: '[name]_[hash:7].js',
        publicPath: config.build.assetPublicPath
    },
    resolve: {
        extensions: ['.js', '.json', '.'],
        alias: {
            '@': config.src,
            '@common': path.resolve(config.src, 'common'),
            '@commonjs': path.resolve(config.src, 'common/js')
        }
    },
    module: {
        rules: [{
                //   test: /\.(js|vue)$/,
                //   use: [{
                //     loader: 'eslint-loader',
                //     options: {
                //       formatter: require('eslint-friendly-formatter')
                //     }
                //   }],
                //   enforce: 'pre',
                //   include: [config.src],
                //   exclude: /\.min\.(js|css)/
                // },
                // {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: vueLoaderConfig
                }]
            },
            {
                test: /\.js$/,
                include: [/emf/, config.src],
                // exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]

            },
            {
                test: /\.scss$/,
                use: ['style', 'css', 'reolve-url', 'sass'].map(x => ({
                    loader: x + '-loader'
                }))
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('img/[name].[ext]?v=[hash:7]')
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('fonts/[name].[ext]?v=[hash:7]')
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'raw-loader'
                }]
            }
        ]
    }
}

webpackConfig.plugins = webpackConfig.plugins || []
let pages = utils.getEntries('**/*.html', config.src)
    // console.log(pages)
    // console.log(config.entry)
for (var page in pages) {

    if (page.substr(-4) == '.art') continue
    let conf = {
        filename: page + '.html',
        template: pages[page],
        inject: true,
        chunkSortMode: 'dependency',
        minify: {
            removeComments: true,
            removeAttributeQuotes: true,
            collapseWhitespace: false
        },
        chunks: Object.keys(config.entry).filter(x => {
            return x.replace(/js[\/\\]*/, '') === page.replace(/(html)?[\/\\]*/, '')
        }).concat(['common/js/vendor', 'common/js/mainfest'])
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}


try {
  let copydirs = []
  if (fs.existsSync(path.join(config.root, 'static'))) {
    copydirs.push({
      from: path.resolve(config.root, 'static'),
      to: path.join(config.build.asset,'static'),
      ignore: ['.*']
    })
  }
  copydirs = copydirs.concat(config.dirStaticCopy.map(x => {
    return {
      context: path.resolve(config.src),
      from: path.resolve(path.join(config.src, "**", x, "*")),
      to: config.build.asset
    }
  }))
  webpackConfig.plugins.push(
    new CopyWebpackPlugin(copydirs)
  )
} catch (e) {
  console.log("error", e)
}



module.exports = webpackConfig