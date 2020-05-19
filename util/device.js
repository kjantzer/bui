import colorizeFavicon from './colorize-favicon'

const UA = navigator.userAgent

const device = {

    get is_ios(){ return device.isiOS}, // DEPRECATED
    get is_android(){ return device.isAndroid }, // DEPRECATED
    get is_mobile(){ return device.isMobile }, // DEPRECATED

    get isWindows(){ return /Win/.test(UA) },
    get isMac(){ return /Mac/.test(UA) },
    get isLinux(){ return /Linux/.test(UA) },

    get minScreenSize(){
        return window.outerWidth < window.outerHeight ? window.outerWidth : window.outerHeight;
    },

    get isiOS(){
        return /iPad|iPhone|iPod/.test(UA)
        || (device.isMac && navigator.standalone !== undefined ) // iPadOS 13+
    },

    get isiPad(){
        return /iPad/.test(UA) || (!device.isiOS && device.isMac && navigator.standalone !== undefined )
    },

    get isAndroid(){
        return /android/i.test(UA)
    },

    get isTouch(){
        return 'ontouchstart' in window
    },
    
    get isMobile(){
        return device.isiOS || device.isAndroid
    },

    // https://developer.chrome.com/multidevice/user-agent
    get isiOSChrome(){
        return /CriOS/.test(UA)
    },

    get isElectron(){
        return /Electron/.test(UA)
    },

    get electronVersion(){
        let matches = UA.match(/Electron\/([\d\.]+) /)
        return matches ? matches[1] : 0
    },

    get isChromeInstalledApp(){
        return this.isInstalled && /Chrome/.test(UA)
    },

    get isInstalled(){
        return navigator.standalone || window.matchMedia('(display-mode: standalone)').matches
    },

    // alias
    get isStandalone(){ return device.isInstalled }
    
}

export default device

// https://medium.com/@jonas_duri/enable-dark-mode-with-css-variables-and-javascript-today-66cedd3d7845
export const colorScheme = {

    get isDarkMode(){ return window.matchMedia("(prefers-color-scheme: dark)").matches },
    get isLightMode(){ return window.matchMedia("(prefers-color-scheme: light)").matches },
    get isUnset(){ return window.matchMedia("(prefers-color-scheme: no-preference)").matches },

    get isSupported(){ return this.isDarkMode || this.isLightMode || this.isUnset },
    
    onChange(cb){
        // first time, setup watchers
        if( !this._watchers ){
            this._watchers = new Map()

            window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && this._dispatchChange('dark'))
            window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && this._dispatchChange('light'))
        }

        this._watchers.set(cb, cb)
    },
    
    _dispatchChange(mode){
        this._watchers.forEach(cb=>{
            cb(mode)
        })
    },

    apply({colorizeFaviconComposition=''}={}){
        localStorage.setItem('theme-colorize-icon', 
            colorizeFaviconComposition||localStorage.getItem('theme-colorize-icon')||'lighten')
        this.onChange(this.setTheme)
        this.setTheme()
        this.setAccent()
    },

    get theme(){ return localStorage.getItem('theme') },
    get accent(){ return localStorage.getItem('theme-accent') },

    setTheme(theme){

        const html = document.documentElement
        let metaThemeColor = document.head.querySelector('meta[name="theme-color"]')

        // create the meta theme color if not found
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
        if( !metaThemeColor ){
            metaThemeColor = document.createElement('meta')
            metaThemeColor.setAttribute('name', 'theme-color')
            document.head.appendChild(metaThemeColor)
        }

        html.removeAttribute('light')
        html.removeAttribute('dark')

        if( theme === undefined )
            theme = localStorage.getItem('theme') || 'system'
        
        localStorage.setItem('theme', theme)

        if( theme == 'system' )
            theme = this.isDarkMode ? 'dark' : 'light'

        html.setAttribute(theme, '')
        metaThemeColor.content = getComputedStyle(document.body).getPropertyValue('--theme-bgd')
    },

    setAccent(accent){

        const html = document.documentElement
        let colorizeFaviconComposition = localStorage.getItem('theme-colorize-icon')

        if( accent === undefined ){
            accent = localStorage.getItem('theme-accent')
        }else{
            localStorage.setItem('theme-accent', accent)
        }

        if( accent ){
            html.style.setProperty('--theme', `var(--${accent}, #${accent})`);
            html.style.setProperty('--theme-chosen', `var(--${accent}, #${accent})`);

            if( colorizeFaviconComposition )
                colorizeFavicon(getComputedStyle(document.body).getPropertyValue('--theme'), colorizeFaviconComposition)

        }else{
            html.style.removeProperty('--theme');
            html.style.removeProperty('--theme-chosen');

            colorizeFavicon(false)
        }

    }
    
}

