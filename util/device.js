
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
    
    get isMobile(){
        return device.isiOS || device.isAndroid
    },

    // https://developer.chrome.com/multidevice/user-agent
    get isiOSChrome(){
        return /CriOS/.test(UA)
    },

    get isInstalled(){
        return navigator.standalone || window.matchMedia('(display-mode: standalone)').matches
    },

    // alias
    get isStandalone(){ return device.isInstalled }
    
}

export default device