require('./check-versions')()

let webpack = require('webpack')
let WebpackDevServer = require('webpack-dev-server')
let opn = require('opn')

let webpackConfig = require('./config/webpack.dev.conf')
let express=require('express')
let config = require('./config/config')
let options = config.dev


// WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);

let compiler = webpack(webpackConfig)
let server = new WebpackDevServer(compiler, options)
let port = process.env.PORT || options.port
server.app.use('static',express.static('../static'))

server.listen(port, '0.0.0.0', (x) => {
    
    console.log(`Starting server at ${port} ...`);
    opn(`http://127.0.0.1:${port}`)
});