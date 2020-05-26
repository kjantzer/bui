
import router from 'bui/router'
router.config({
    root: location.hostname.match(/github|gitlab/) ? '/bui/' : '/',
    prefix: '#/'
})

import './markdown-docs'

import './header'
import './main'