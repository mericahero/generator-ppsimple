let merge = require('webpack-merge')
let prodEnv = require('./env.prod')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
