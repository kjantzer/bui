import device from '../util/device'

const documentHeight = () => {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
}

if( device.isiOS && !device.isInstalled ){
    window.addEventListener('resize', documentHeight)
    documentHeight()
}