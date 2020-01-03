import device from './device'

const windowOpen = window.open

// better window opening for chrome installed apps
window.open = function(url, windowName, windowFeatures={}){
    
    windowFeatures = Object.assign({
        resizable:true,
        toolbar: device.isChromeInstalledApp ? false : true,
        scrollbars: true,
        menubar: device.isChromeInstalledApp ? false : true,
        status: true,
        directories: true,
        height: document.body.offsetHeight,
        width: document.body.offsetWidth,
        left: window.screenLeft + 44,
        top: window.screenTop + 44
    }, windowFeatures)

    let winFeatures = []
    for(let key in windowFeatures){
        let val = windowFeatures[key]
        if( val === true ) val = '1'
        if( val === false ) val = '0'
        winFeatures.push(key+'='+val)
    }
    winFeatures = winFeatures.join(',')
    
    // timeout to let 'event' clear so that installed app window will be used and not a new chrome browser tab
    setTimeout(()=>{
        windowOpen(url, windowName, winFeatures)
    })
}