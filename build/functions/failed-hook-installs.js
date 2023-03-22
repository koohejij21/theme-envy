/**
 * @private
 * @file checks for failed hook installs and exits with an error
 */

const chalk = require('chalk')
const logSymbols = require('#LogSymbols')

module.exports = function() {
  const unusedHookInstalls = Object.keys(ThemeEnvy.hooks).filter(hook => !ThemeEnvy.hooks[hook].replaced)
  if (!unusedHookInstalls || unusedHookInstalls.length === 0) return
  console.error(`
${logSymbols.error} ${chalk.red.bold('Error:')}
The following hook injections failed because there is no corresponding hook tag in the theme:
${chalk.red(unusedHookInstalls.join('\n'))}
`)
  process.exit()
}
