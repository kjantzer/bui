
// TODO: support mouse long press? https://codepen.io/thetallweeks/pen/uAEGr

export const bindLongpress = (el, {event='contextmenu', delay=500}={}) =>{

    el.addEventListener('touchstart', e=>{
        el._longPressTimeout = setTimeout(() => {

            el.dispatchEvent(new CustomEvent(event, {
                bubbles: true,
                composed: true,
            }))

        }, delay);
    })

    el.addEventListener('touchend', e=>{
        e.stopPropagation()
        clearTimeout(el._longPressTimeout)
    })

    el.addEventListener('touchmove', e=>{
        clearTimeout(el._longPressTimeout)
    })
}