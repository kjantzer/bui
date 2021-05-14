import colorizeFavicon from './colorize-favicon'

const UA = navigator.userAgent

export const HandheldScanners = [
    /Build\/MRA58K/i // the android scanners Blackstone uses in production/warehouse
]

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

    get isSmallDevice(){ return this.minScreenSize <= 699 },

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

    get isHandheldScanner(){
        return !!HandheldScanners.find(patt=>patt.test(UA))
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
    get isStandalone(){ return device.isInstalled },

    applyClasses(){
        const html = document.documentElement
        if( !html ) return
        html.classList.toggle('mobile', device.isMobile)
        html.classList.toggle('ios', device.isiOS)
        html.classList.toggle('electron', device.isElectron)
        html.classList.toggle('android', device.isAndroid)
        html.classList.toggle('mac', device.isMac)
        html.classList.toggle('windows', device.isWindows)
        html.classList.toggle('installed', device.isInstalled)
    }
    
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
        this.onChange(this.setTheme.bind(this))
        this.setTheme()
        this.setAccent()
    },

    get theme(){ return localStorage.getItem('theme') },
    get accent(){ return localStorage.getItem('theme-accent') },

    // TODO: rename to `setColorMode` or `setLightDarkMode`
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
        metaThemeColor.content = this.getCssVar('theme-bgd')
        localStorage.setItem('meta-theme-color', metaThemeColor.content)  
    },

    setAccent(accent, secondary){

        const html = document.documentElement
        let colorizeFaviconComposition = localStorage.getItem('theme-colorize-icon')

        if( accent === undefined ){
            accent = localStorage.getItem('theme-accent')
            secondary = localStorage.getItem('theme-secondary')
        }else{
            localStorage.setItem('theme-accent', accent)
            localStorage.setItem('theme-secondary', secondary)
        }

        if( accent ){
            html.style.setProperty('--theme', `var(--${accent}, #${accent})`);
            html.style.setProperty('--theme-chosen', `var(--${accent}, #${accent})`);

            if( secondary ){
                html.style.setProperty('--theme-secondary', `var(--${secondary}, #${secondary})`);
                html.style.setProperty('--theme-secondary-chosen', `var(--${secondary}, #${secondary})`);
            }

            if( colorizeFaviconComposition )
                colorizeFavicon(this.getCssVar('theme'), colorizeFaviconComposition)

        }else{
            html.style.removeProperty('--theme');
            html.style.removeProperty('--theme-chosen');
            html.style.removeProperty('--theme-secondary');
            html.style.removeProperty('--theme-secondary-chosen');

            colorizeFavicon(false)
        }

    },

    getCssVar(name){
        if( name[0] != '-' )
            name = '--'+name
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    }
    
}

