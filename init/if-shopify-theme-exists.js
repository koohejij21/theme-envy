const path = require('path')
const fs = require('fs-extra')
const { directories } = require('#EnsureDirectories')

module.exports = function({ target, dest }) {
  // if we have a valid Shopify theme structure in the target directory move those files to the dest
  const rootDirs = fs.readdirSync(target).filter(res => !res.includes('.'))
  const shopifyThemeExistsInRoot = directories.every(dir => rootDirs.includes(dir))
  if (shopifyThemeExistsInRoot) {
    directories.forEach(dir => {
      fs.moveSync(path.join(target, dir), path.join(dest, dir))
    })
  }
}
