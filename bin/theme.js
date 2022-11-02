#!/usr/bin/env node

'use strict'

/*
* Controls the other theme- files in this /bin directory
* Execute from client theme where softlimit-framework-2 is installed as a package with:
* npx theme <command> ...
* npx theme build development|production --watch|-w
* npx theme ignore none|push|pull
* npx theme pull-json // retrieves all JSON files from a theme and pulls into src
* npx theme clean // empties the dist folder
* npx theme new feature|element ...
* npx theme prep // used during npm run start to determine whether we need a fresh build
*/

const path = require('path')
const yargs = require('yargs')
const chalk = require('chalk')
// eslint-disable-next-line no-unused-vars
const argv = yargs(process.argv.slice(2))
  .option('watch', {
    alias: 'w',
    type: 'boolean',
    default: false
  })
  .option('target', {
    alias: 't',
    describe: 'Path to target destination of src folder and config files',
    type: 'string',
    default: './',
    nargs: 1
  })
  .command('$0 <script> [args]', 'Theme Scripts', {
    script: {
      description: 'Available scripts: ["build", "clean", "ignore", "prep", "pull-json", "new"]. Each script has additional info with the "--help" or "-h" flag.',
      type: 'string'
    },
    args: {
      description: 'Script arguments',
      type: 'array'
    }
  },
  (argv) => {
    console.log(
      chalk.green.bold('Starting Softlimit script'),
      chalk.bgGreen(`theme ${argv.script}\n`)
    )
    const themeScript = require(path.resolve(__dirname, `theme-${argv.script}`))
    themeScript(argv.args, {
      direct: true,
      watch: argv.watch,
      target: argv.target
    })
  })
  .help('h')
  .showHelpOnFail(true)
  .argv
