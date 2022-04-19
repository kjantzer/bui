
// extend Backbone for lit-html support
require('./helpers/backbone')

// extend LitElement to fit our needs
require('./helpers/lit')

require('./elements/icon')
require('./elements/btn')
require('./elements/spinner')
require('./elements/spinner-overlay')
require('./elements/uploader')
require('./elements/paper')
require('./elements/timer')
require('./elements/empty-state')
require('./elements/label')
require('./elements/hr')
require('./elements/sub')
require('./elements/carousel')

export const router = require('./router').default

// I dont think I want to do this here
export const Panel = require('./presenters/panel').Panel