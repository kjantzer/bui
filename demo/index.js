
import router from 'bui/app/router'
router.config({
    root: location.hostname.match(/github|gitlab/) ? '/bui/' : '/',
    prefix: '#/'
})

import 'bui/util/window.open'
import 'bui/app/error-handler'
import '../elements/icon/legacy/_all'
import './markdown-docs'

import './header'
import './main'
import './sw/index.js'