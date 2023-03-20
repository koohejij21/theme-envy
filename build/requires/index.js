require('./globals')

const requires = [
  './assets',
  './config',
  './locales',
  './scripts',
  './snippets',
  './templates',
]

requires.forEach((requirePath) => {
  require(requirePath)
  ThemeEnvy.progressBar.increment()
})
