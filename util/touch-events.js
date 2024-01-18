
export const bindLongpress = (el, {
    touchOnly=true,
    event='contextmenu',
    delay=500,
    detail={} // event detail to be passed
}={}) =>{

    if( !el ) return

    let isTouch = touchOnly || 'ontouchstart' in window

    el.addEventListener(isTouch?'touchstart':'mousedown', e=>{

        let {clientX, clientY} = e.touches?.[0] || e

        // ignore right+click (https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
        if( !isTouch && e.button !== 0 ) return

        el._longPressTimeout = setTimeout(() => {

            detail.target = el
            detail.clientX = clientX
            detail.clientY = clientY

            let customEvent = new CustomEvent(event, {
                bubbles: true,
                composed: true,
                detail
            })

            customEvent.clientX = clientX
            customEvent.clientY = clientY
            
            el._didLongPress = true
            el.dispatchEvent(customEvent)

        }, delay);

        return false
    })

    el.addEventListener(isTouch?'touchend':'mouseup', e=>{
        e.stopPropagation()
        clearTimeout(el._longPressTimeout)
        return false
    })

    el.addEventListener(isTouch?'touchmove':'mousemove', e=>{
        // e.movementX not supported on iOS
        let delta = e.movementX == undefined ? 1 : Math.max(Math.abs(e.movementX), Math.abs(e.movementY))
        if( delta > 0 )
            clearTimeout(el._longPressTimeout)
    })

    
    el.addEventListener('click', e=>{
        
        if( el._didLongPress ){
            delete el._didLongPress
            e.stopPropagation()
            e.preventDefault()
            return false;
        }

        delete el._didLongPress

    }, true)
}

export const bindLongPress = bindLongpress // alias
