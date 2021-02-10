
import router from 'bui/router'
router.config({
    root: location.hostname.match(/github|gitlab/) ? '/bui/' : '/',
    prefix: '#/'
})

import 'bui/util/window.open'
import '../elements/icons/_all'
import './markdown-docs'

import './header'
import './main'
import './sw/index.js'