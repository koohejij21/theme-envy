/**
  * @private
  * @file Runs webpack during ThemeEnvy build
  * @param {Object} options - options object
  * @param {string} options.mode - webpack mode, either 'development' or 'production'
  * @param {Object} options.opts - options object
  * @param {Boolean} options.opts.watch - whether or not to run webpack in watch mode
  * @returns {Promise}
  */

const webpack = require('webpack')

module.exports = function({ mode, opts }) {
  return new Promise((resolve, reject) => {
    const watch = opts.watch || false

    const webpackConfig = require('#Build/theme-envy.config.js')
    // run webpack
    // set our webpack mode
    webpackConfig.mode = mode
    // set our webpack optimization
    webpackConfig.optimization.minimize = mode === 'production'
    // set our webpack watch flag
    webpackConfig.watch = watch
    // merge our theme config named entries into webackConfig.entry
    webpackConfig.entry = { ...webpackConfig.entry, ...ThemeEnvy.entry }
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(stats, err)
        reject(err)
      }
      // Done processing - finish up progress bar and make up for our initial increment
      ThemeEnvy.progress.increment('webpack')
      resolve(stats)
    })
  })
}
