
import router from 'bui/app/router'
router.config({
    root: location.hostname.match(/github|gitlab/) ? '/bui/' : '/',
    prefix: '#/'
})

if( !window.goTo )
window.goTo = (path, props, e)=>{
    return router.goTo(path, props||{})
}

import 'bui/util/window.open'
import 'bui/app/error-handler'
import '../elements/icon/legacy/_all'
import './markdown-docs'

import {mountShell} from './shell'
import './sw/index.js'
mountShell(document.querySelector('b-panels[name="root"]'))
