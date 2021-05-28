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
export {colorScheme, ThemeColors} // legacy support, should direct import