/*
  This script will process all liquid files in the src directory and output them to the dist directory.
  Flags:
    -w, --watch: watch for changes and re-run the script
*/

const path = require('path')
const chalk = require('chalk')
const emoji = require('node-emoji')
const { themeEnvy, webpack, tailwind } = require('#Build/functions')
const { distClean } = require('#Helpers')

module.exports = async function(env, opts = {}) {
  const mode = env || 'production'

  // empty dist folder for a clean build, do not log the clean message
  distClean({ quiet: true })

  // our pretty build message
  const relativeDistPath = path.relative(process.cwd(), ThemeEnvy.outputPath)
  console.log(
    emoji.get('hammer'),
    chalk.cyan(`Building ./${relativeDistPath} in`),
    mode === 'development' ? chalk.yellow.bold(mode) : chalk.magenta.bold(mode),
    chalk.cyan('mode')
  )

  require('./requires')

  await themeEnvy({ mode, opts })

  if (ThemeEnvy?.tailwind !== false) await tailwind({ mode, opts })

  await webpack({ mode, opts })

  ThemeEnvy.events.emit('build:complete')
}
