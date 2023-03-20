/*
  * Sets up our process build event object
  * This is used to emit events during the build process
  * watch:start - emitted when a watch event is triggered and resets the node cache in ThemeRequire
*/
const EventEmitter = require('events')
ThemeEnvy = ThemeEnvy || {}
ThemeEnvy.events = new EventEmitter()
