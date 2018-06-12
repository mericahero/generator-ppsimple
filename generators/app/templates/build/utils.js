let path = require('path')
let glob = require('glob')
let fs = require('fs')
let chalk = require('chalk')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  return path.posix.join('./', _path)
}

/**
 * 获取符合条件的entries
 * 
 * @method getEntries 
 * @param {String} expr 表达式数组
 * @param {String} base 基础路径
 * @param {String} replaced 替换掉的字符串
 */
exports.getEntries = function (expr, base, replaceed) {
  let entries = {}
  let globpaths = [expr]

  let dirs = process.argv.slice(2)
  if (dirs.length > 0) {
    for (var i = 0, l = dirs.length; i < l; ++i) {
      dir = dirs[i]
      if (fs.existsSync(path.join(base, dir))) continue
      console.log(chalk.red(`path ${path.join(base, dir)} not exist, please verify your input!`))
      throw new Error(`dir not exsit`)
    }
    // 如果外面传了需要编译的路径，就组合到entry中
    globpaths = dirs.map(dir => path.join(base, dir, expr))
  }else{
    globpaths = globpaths.map(dir => path.join(base, dir))
  }
 
  
  for(var i=0,l=globpaths.length;i<l;++i){
    let globPath=globpaths[i]
    glob.sync(globPath).forEach(function (entry) {
      let moduleName = entry.match(/(\w+).\w+$/)[1];
      if (base) {
        // 获取相对路径
        let temp = path.relative(base, entry)
        moduleName = temp.replace(path.extname(entry), '')
      }
      if (replaceed) {
        let idx = moduleName.indexOf(replaceed)
        if (idx >= 0) {
          let pre = moduleName.substring(0, idx)
          let after = moduleName.substring(idx + replaceed.length).replace(/^[\\\/]*/, '')
          moduleName = pre + after
        }
      }
      entries[moduleName] = entry
    })
  }
  
  return entries;
}

exports.cssLoaders = function(options){
  options = options || {}

  let cssLoader = {
    loader:'css-loader',
    options: {
      minimize : process.env.NODE_EVN == 'production',
      sourceMap: options.sourceMap
    }
  }


  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract && false) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: ['vue-style-loader']
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }

}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}