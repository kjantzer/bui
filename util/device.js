
const UA = navigator.userAgent

const device = {

    get is_ios(){ return device.isiOS}, // DEPRECATED
    get is_android(){ return device.isAndroid }, // DEPRECATED
    get is_mobile(){ return device.isMobile }, // DEPRECATED

    get isWindows(){ return /Win/.test(UA) },
    get isMac(){ return /Mac/.test(UA) },
    get isLinux(){ return /Linux/.test(UA) },

    get isiOS(){
        return /iPad|iPhone|iPod/.test(UA) && !window.MSStream
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