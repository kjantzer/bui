
const device = {

    get is_ios(){
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    },

    get is_android(){
        return /android/i.test(navigator.userAgent)
    },

    get is_mobile(){
        return device.is_ios || device.is_android
    }
}

export default device