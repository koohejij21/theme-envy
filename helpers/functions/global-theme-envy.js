/*
  * Establishes our global ThemeEnvy object based on theme.config.js
*/
const path = require('path')
const fs = require('fs-extra')

const themeConfigPath = path.resolve(process.cwd(), 'theme.config.js')
global.ThemeEnvy = fs.existsSync(themeConfigPath) ? require(themeConfigPath) : {}

ThemeEnvy.dependencies = {}
ThemeEnvy.themePath = path.resolve(process.cwd(), (ThemeEnvy.themePath || 'src'))
ThemeEnvy.outputPath = path.resolve(process.cwd(), (ThemeEnvy.outputPath || 'dist'))
