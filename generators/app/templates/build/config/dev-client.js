/* eslint-disable */
// require('eventsource-polyfill')


// var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true&path=http://localhost:6001/__webpack_hmr')

// __webpack_require__.p = "http://localhost:6001/"

// hotClient.subscribe(function (event) {
//   if (event.action === 'reload') {
//     window.location.reload()
//   }
// })


if (module.hot) {
  module.hot.addStatusHandler(function (status) {
    debugger
    if (status == 'ready') {
      location.reload()
    }
  })
}
