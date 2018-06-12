require('./check-versions')()
process.env.NODE_ENV = 'production'
let ora           = require('ora')
let rm            = require('rimraf')
let path          = require('path')
let chalk         = require('chalk')
let webpack       = require('webpack')
let config        = require('./config/config')
let webpackConfig = require('./config/webpack.prod.conf')

let spinner = ora('building for production...')
spinner.start()


rm(path.join(config.build.asset),err=>{
    if(err) throw err
    webpack(webpackConfig,(err1,stats)=>{
        spinner.stop()
        if(err1) throw err1
        process.stdout.write(stats.toString({
            colors:       true,
            modules:      false,
            children:     false,
            chunks:       false,
            chunkModules:  false
        })+'\n\n')

        console.log(chalk.cyan(' Build complete.\n'))
        // console.log(chalk.yellow(
        //     ' Tip: use HTTP server instead of file://'
        // ))
    })
})