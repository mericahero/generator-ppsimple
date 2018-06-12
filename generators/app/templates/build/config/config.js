let path = require('path')
let utils = require('../utils')
let env = require('./env.prod')
let devenv = require('./env.dev')




let conf = {
    'root': '../../', // 项目根路径
    'src': 'src', // 源代码路径
    'js': 'js', // 放JS路径的目录
    'asset': 'asset', // 最终打包路径
    'assetSubDirectory':'static',
    'assetPublicPath': '../../', // 资源在页面中的相对路径
    'needVendor': true, // 是否生成vendor.js
    'devport': 6001, // 调试端口
    'dirStaticCopy': [] // 直接拷贝到资产路径的文件（夹）
}
conf.root = path.resolve(__dirname, conf.root)
conf.entry = `**/${conf.js}/*.js`
conf.src = path.join(conf.root, conf.src)



conf.asset = path.join(conf.root, conf.asset)
module.exports = {
    root: conf.root,
    src: conf.src,
    dirStaticCopy: conf.dirStaticCopy,
    needVendor: conf.needVendor,
    entry: utils.getEntries(conf.entry, conf.src),
    build: {
        env: env.NODE_ENV,
        index: path.resolve(conf.asset, 'index.html'),
        asset: conf.asset,
        assetPublicPath: conf.assetPublicPath,
        assetSubDirectory:conf.assetSubDirectory,
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        // env:devenv.NODE_ENV,
        after: (app) => {},
        // allowedHosts: [],
        before: (app) => {},
        // bonjour: true,
        clientLogLevel: 'info', // none error warning info
        // color: true,
        // compress: true,
        contentBase: './src',
        disableHostCheck: true,
        // filename: '', // 在惰性模式中，此选项可减少编译。 默认在惰性模式，每个请求结果都会产生全新的编译。使用 filename，可以只在某个文件被请求时编译。
        // headers: {},
        // host: '0.0.0.0',
        hot: true,
        // hotOnly: true, // Enables Hot Module Replacement (see devServer.hot) without page refresh as fallback in case of build failures.
        // https: false,
        inline: false, // false to iframe
        // lazy: false,  // 当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”。
        noInfo: true, // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
        open: true, // When open is enabled, the dev server will open the browser.
        openPage: 'index.html', // Specify a page to navigate to when opening the browser.
        // overlay: true,            //  {warnings: true,errors: true}
        // pfx: '',
        // pfxPassphrase: '',
        port: conf.devport,
        // proxy: {},
        // progress: true,    // cli
        // public: "myapp.test:80", 
        publicPath: '/',
        // quiet: true,
        // socket: 'socket',
        stats: {
            colors: true
        },
        useLocalIp: true,
        // watchContentBase: true, // Tell the server to watch the files served by the devServer.contentBase option. File changes will trigger a full page reload.
        // watchOptions: {},
        staticOptions:{

        }
    }
}