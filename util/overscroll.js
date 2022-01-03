/*
    Overscroll watcher

    TODO: what should happen if imported and called more than once per scrollEl?
*/
export function watch({
    scrollEl=document.scrollingElement,
    threshold= -40
}={}){

    const overscroll = {top: 0, bottom: 0}

    let scrollEventEl = scrollEl == document.scrollingElement ? window : scrollEl

    function onScroll(e){

        overscroll.top = scrollEl.scrollTop
        overscroll.bottom = scrollEl.offsetHeight - (scrollEl.scrollHeight + scrollEl.scrollTop)

        if( overscroll.top >= 0 ) overscroll.top = 0
        if( overscroll.bottom >= 0 ) overscroll.bottom = 0

        if( overscroll.top < 0 || overscroll.bottom < 0 )
            window.requestAnimationFrame(()=>{
                scrollEventEl.dispatchEvent(new CustomEvent('overscroll', {composed: true, detail: overscroll}) )
            })
    }

    function onEnd(e){
        if( overscroll.top < threshold || overscroll.bottom < threshold ){
            scrollEventEl.dispatchEvent(new CustomEvent('overscrolled', {detail: overscroll}) )
            overscroll.top = 0
            overscroll.bottom = 0
        }else{
            overscroll.top = 0
            overscroll.bottom = 0
            scrollEventEl.dispatchEvent(new CustomEvent('overscrolled', {detail: overscroll}) )
        }
    }

    scrollEventEl.addEventListener('scroll', onScroll)
    scrollEventEl.addEventListener('touchend', onEnd)

    return scrollEventEl
}

export default {watch}