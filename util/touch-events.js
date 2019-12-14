
export const bindLongpress = (el, {
    touchOnly=true,
    event='contextmenu',
    delay=500
}={}) =>{

    if( !el ) return

    let isTouch = touchOnly || 'ontouchstart' in window

    el.addEventListener(isTouch?'touchstart':'mousedown', e=>{

        el._longPressTimeout = setTimeout(() => {

            el._didLongPress = true
            el.dispatchEvent(new CustomEvent(event, {
                bubbles: true,
                composed: true,
            }))

        }, delay);

        return false
    })

    el.addEventListener(isTouch?'touchend':'mouseup', e=>{
        e.stopPropagation()
        clearTimeout(el._longPressTimeout)
        return false
    })

    el.addEventListener(isTouch?'touchmove':'mousemove', e=>{
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
