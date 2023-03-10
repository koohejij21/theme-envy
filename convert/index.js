/*
  npx theme-envy convert --(source|src|S)=path/to/theme

  converts a Shopify theme to Theme Envy directory structure
    - should be run after theme-envy-import, by using the --convert flag
    - can be run independently, node bin/theme-envy convert --source=path/to/theme, or --src=path/to/theme, or -S=path/to/theme
*/
const path = require('path')
const fs = require('fs-extra')
const { directories, ensureDirectories } = require('#EnsureDirectories')
const { setSettingsSchemaJs, convertSectionsToFeatures, installHooks } = require('#Convert/functions')
const { addThemeEnvyFeatures } = require('#Init/functions')

module.exports = async function(opts = {}) {
  const source = opts.source || './src'
  const sourceTheme = path.resolve(process.cwd(), source)
  // verify source theme exists
  if (!fs.existsSync(sourceTheme)) {
    console.error(`Source theme directory not found: ${sourceTheme}`)
    process.exit(1)
  }

  // validate directory structure of source theme
  directories.forEach(dir => {
    if (!fs.existsSync(path.resolve(sourceTheme, dir))) {
      console.error(`Source theme required directory not found: ${path.resolve(sourceTheme, dir)}`)
      process.exit(1)
    }
  })

  // Create directories _features and _elements
  ensureDirectories({ root: sourceTheme, envy: true })

  if (opts.addThemeEnvy !== false) addThemeEnvyFeatures({ dest: sourceTheme })

  convertSectionsToFeatures({ sourceTheme })

  installHooks()

  // convert settings_schema.json to .js
  setSettingsSchemaJs({ sourceTheme })
}
