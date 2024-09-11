
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

import './header'
import './main'
import './sw/index.js'