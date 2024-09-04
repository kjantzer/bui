/*
    # Make Draggable [DEPRECATED]

    callback will return `{left, top}` in the event detail
    a `dragging:done` event will also be emitted

    TODO / IDEAS
    - cancel on escape
    - leverage code for resizing?
    - limit dragging to parent boundries?
    - provide finer movements while holding `ctrl`

    Initial code pulled from: https://stackoverflow.com/a/21569684/484780

    DEPRECATED - use <b-draggable> element
*/


export default function makeDraggable(el, callback){

    let styles = getComputedStyle(el)

    if( !['relative', 'absolute', 'fixed'].includes(styles.position) )
        el.style.position = 'relative'
    
    let origCursor = el.style.cursor
    el.style.cursor = 'move'

    el.addEventListener('mousedown', startDragging, false)
    el.addEventListener('mouseup', draggingDone, false)
    el.addEventListener('dragging:done', callback, false)

    el.removeDraggable = function(){
        el.style.cursor = origCursor
        el.removeDraggable = null
        el.removeEventListener('mousedown', startDragging, false)
        el.removeEventListener('mouseup', draggingDone, false)
        el.removeEventListener('dragging:done', callback, false)
    }
}

let startDragging = (e)=>{

    if( e.button !== 0 ) return // main button only

    let el = e.currentTarget
    let mouseX = e.clientX
    let mouseY = e.clientY
    let computedStyles = window.getComputedStyle(el)
        
    let elTop = parseFloat(computedStyles.top)
    let elLeft = parseFloat(computedStyles.left)

    var origX = mouseX - elLeft,
        origY = mouseY - elTop;
        
    document.onmousemove = function(e){

        // let mouseDelta = {
        //     x: mouseX - e.clientX,
        //     y: mouseY - e.clientY
        // }

        let x = e.clientX - origX
        let y = e.clientY - origY
        
        el.style.left = x+'px'
        el.style.top = y+'px'
    }
}

let draggingDone = (e)=>{
    
    document.onmousemove = function(){}

    return // NOTE: why was I doing the rest?

    let el = e.currentTarget
    let parent = el.offsetParent
    let computedStyles = window.getComputedStyle(el)

    let elTop = parseFloat(computedStyles.top)
    let elLeft = parseFloat(computedStyles.left)

    // change pixels to percent to support scaling
    // FIXME: only works for absolute...or when default position is top left
    let top = elTop / parent.offsetHeight * 100
    let left = elLeft / parent.offsetWidth * 100

    el.style.left = left+'%'
    el.style.top = top+'%'

    el.dispatchEvent(new CustomEvent('dragging:done', {
        bubbles: true,
        composed: true,
        detail: {left, top}
    }))
}
