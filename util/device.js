/*
    # Device

    Determine certain characteristics of the current device

    - isiOS
    - isAndroid
    - isMobile
    - isWindows
    - isMac
    - isLinux
    - isInstalled (PWA installed)
    - isTouch
    
    see source code more complete list
*/
import {colorScheme, ThemeColors} from './color-scheme'

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

    get minScreenSize(){ return Math.min(window.outerWidth, window.outerHeight) },
    get maxScreenSize(){ return Math.max(window.outerWidth, window.outerHeight) },

    get isSmall(){ return this.minScreenSize <= 599 },
    get isMedium(){ return this.minScreenSize <= 1199 }, // TODO: rename to `isMaxSizeMedium` or similar?
    get isSmallDevice(){ return this.isSmall }, // DEPRECATED

    get isLandscape(){ return window.outerHeight < window.outerWidth },
    get isPortrait(){ return window.outerWidth < window.outerHeight },

    get name(){
        let name = 'PC'
        if( this.isAndroid )
            name = 'Android '+(this.isSmall ? 'Phone' : 'Tablet')
        else if( this.isiname)
            name = this.isSmall ? 'iPhone' : 'iPad'
        else if( this.isMac )
            name = 'Mac'
        else if( this.isWindows )
            name = 'Windows'
        else if( this.isLinux )
            name = 'Linux'

        return name
    },

    get screenDimensions(){
        return screen.width+'x'+screen.height
    },

    get isiOS(){
        return /iPad|iPhone|iPod/.test(UA)
        // FIXME: matches desktop; is this really still needed?
        //|| (device.isMac && navigator.standalone !== undefined ) // iPadOS 13+
    },

    get isiPad(){
        return /iPad/.test(UA) || (!device.isiOS && device.isMac && navigator.standalone !== undefined )
    },

    get isAndroid(){ 
        return /android/i.test(UA) // NOTE: not reliable - particularly on tablets
        || !!window.ContactsManager // as of Jan 2024, only supported on android
    }, 
    get isChromeOS(){ return /CrOS/.test(UA)},

    get isTouch(){
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0
    },
    
    get isMobile(){
        return device.isiOS || device.isAndroid || (device.isChromeOS && this.isTouch)
    },

    get isTablet(){
        return this.minScreenSize >= 600 && this.isTouch
    },

    get isHandheldScanner(){
        return !!HandheldScanners.find(patt=>patt.test(UA))
    },

    // https://developer.chrome.com/multidevice/user-agent
    get isIosChrome(){ return /CriOS/.test(UA) },
    get isiOSChrome(){return this.isIosChrome},

    get isIosSafari(){
        return navigator.vendor.match(/apple/i) &&
            // but NOT other browsers on iOS
             !navigator.userAgent.match(/crios/i) &&
             !navigator.userAgent.match(/fxios/i) &&
             !navigator.userAgent.match(/Opera|OPT\//)
    },

    get isSafari(){ return /Safari/.test(UA)},

    get chromeVersion(){
        return (UA.match(/Chrome\/([\d\.]+) /)||[])[1]
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
        return navigator.standalone 
        || window.matchMedia('(display-mode: standalone)').matches
        || window.matchMedia('(display-mode: window-controls-overlay)').matches
    },

    get isBrowser(){
        return matchMedia("(display-mode: browser)").matches
    },

    // alias
    get isStandalone(){ return device.isInstalled },

    applyClasses(el){
        el = el || document.documentElement
        if( !el ) return
        el.classList.toggle('mobile', device.isMobile)
        el.classList.toggle('ios', device.isiOS)
        el.classList.toggle('electron', device.isElectron)
        el.classList.toggle('android', device.isAndroid)
        el.classList.toggle('chromeos', device.isChromeOS)
        el.classList.toggle('touch', device.isTouch)
        el.classList.toggle('tablet', device.isTablet)
        el.classList.toggle('mac', device.isMac)
        el.classList.toggle('windows', device.isWindows)
        el.classList.toggle('installed', device.isInstalled)
    }
    
}

window.device = device

export default device
export {colorScheme, ThemeColors} // legacy support, should direct import