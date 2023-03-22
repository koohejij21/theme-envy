/**
 * @file collects and concatenates all config/*.js files into a single settings_schema.json file
 */

const path = require('path')
const fs = require('fs-extra')
const { getAll } = require('#Build/functions')
const requiredModules = []
// glob all our config/*.js files
const writeSettingsSchema = () => {
  const configInputPath = path.resolve(ThemeEnvy.themePath, 'config')
  const configOutputPath = path.resolve(ThemeEnvy.outputPath, 'config')

  const settingsSchemaPath = path.resolve(configInputPath, 'settings_schema.js')
  const settingsSchema = require(settingsSchemaPath)
  if (requiredModules.indexOf(settingsSchemaPath) === -1) requiredModules.push(settingsSchemaPath)
  const globbedConfigs = getAll('config')
    .map(file => {
      if (requiredModules.indexOf(file) === -1) requiredModules.push(file)
      return require(file)
    })
    .flat()
    // sort alphabetically by name
    .sort((a, b) => (a.name > b.name) ? 1 : -1)

  const config = [...settingsSchema, ...globbedConfigs].flat()

  fs.ensureDirSync(configOutputPath)
  fs.writeFileSync(path.resolve(configOutputPath, 'settings_schema.json'), JSON.stringify(config, null, 2))
  fs.copyFileSync(path.resolve(configInputPath, 'settings_data.json'), path.resolve(configOutputPath, 'settings_data.json'))
  // update progress bar
  ThemeEnvy.progress.increment('config')
}

writeSettingsSchema()

ThemeEnvy.events.on('watch:start', () => {
  // clear node cache of ThemeRequired modules
  requiredModules.forEach(module => {
    delete require.cache[require.resolve(module)]
  })
  requiredModules.length = 0
  writeSettingsSchema()
})
