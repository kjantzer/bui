/*
    # Panel Swipe to Close

    On small screens, panels shown as a bottom sheet (`anchor: 'bottom'`) can be dragged
    down to close (like iOS sheets). A grabber is shown at the top of the sheet.

    - drag starts anywhere in the sheet, but only when the content under the finger is
      scrolled to the top (otherwise the content scrolls as normal)
    - horizontal drags and upward drags are ignored
    - release past a distance or with a quick flick closes; otherwise it snaps back

    Opt out per panel with `swipeClose: false`, or for an element (and its children)
    with the `no-swipe-close` attribute (ex: a map, signature pad)
*/

const SMALL_SCREEN = '(max-width: 599px)'
const LOCK_DISTANCE = 8 // px moved before deciding the drag direction
const CLOSE_DISTANCE = 140 // px (or 25% of the sheet height, whichever is smaller)
const CLOSE_VELOCITY = .6 // px/ms
const SNAP_MS = 200

export function canSwipeClose(panel){
    return panel.opts?.swipeClose !== false
        && panel.anchor == 'bottom'
        && panel.type != 'modal'
        && !!window.matchMedia?.(SMALL_SCREEN).matches
}

// is the drag starting in content that is scrolled down (should scroll instead of close)?
function startsInScrolledContent(path, main){
    for( let el of path ){
        if( el == main ) return false
        if( !(el instanceof Element) ) continue

        if( el.hasAttribute('no-swipe-close') ) return true
        if( el.matches('input[type="range"], textarea, select') ) return true

        if( el.scrollTop > 0 && el.scrollHeight > el.clientHeight ){
            let overflow = getComputedStyle(el).overflowY
            if( overflow == 'auto' || overflow == 'scroll' ) return true
        }
    }
    return false
}

// open panels follow the window size (ex: a desktop window made narrow and wide again shows/hides the
// grabber and views' close btns); weak refs so closed, removed panels aren't kept
const panels = new Set()
window.matchMedia?.(SMALL_SCREEN).addEventListener?.('change', ()=>{
    for( let ref of panels ){
        let panel = ref.deref()
        if( !panel ) panels.delete(ref)
        else if( panel.isOpen ) panel.toggleAttribute('swipe-close', canSwipeClose(panel))
    }
})

export default function bindSwipeClose(panel){

    let main = panel.shadowRoot.querySelector('main')
    if( !main ) return

    panels.add(new WeakRef(panel))

    let drag = null

    function reset(){
        main.style.transition = ''
        main.style.translate = ''
        drag = null
    }

    main.addEventListener('touchstart', e=>{
        drag = null

        if( !panel.hasAttribute('swipe-close') || !panel.isOpen || e.touches.length > 1 ) return
        if( startsInScrolledContent(e.composedPath(), main) ) return

        let {clientX, clientY} = e.touches[0]
        drag = {x: clientX, y: clientY, dy: 0, t: Date.now(), state: 'pending'}
    }, {passive: true})

    main.addEventListener('touchmove', e=>{
        if( !drag || drag.state == 'cancelled' ) return

        let {clientX, clientY} = e.touches[0]
        let dx = clientX - drag.x
        let dy = clientY - drag.y

        if( drag.state == 'pending' ){
            if( Math.abs(dx) < LOCK_DISTANCE && Math.abs(dy) < LOCK_DISTANCE ) return

            // only a downward, mostly vertical drag closes; anything else is left to scroll
            if( dy <= 0 || Math.abs(dx) > Math.abs(dy) ){
                drag.state = 'cancelled'
                return
            }

            drag.state = 'dragging'
            drag.y = clientY // start from here so the sheet doesn't jump by the lock distance
            dy = 0
            drag.t = Date.now()
            main.style.transition = 'none'
        }

        e.preventDefault() // stop the content from scrolling/bouncing while dragging the sheet

        // track speed of the latest movement (for "flick" to close)
        let now = Date.now()
        dy = Math.max(0, dy)
        drag.velocity = (dy - drag.dy) / Math.max(1, now - drag.t)
        drag.t = now
        drag.dy = dy

        main.style.translate = `0 ${drag.dy}px`
    }, {passive: false})

    function onEnd(){
        if( !drag || drag.state != 'dragging' ){
            drag = null
            return
        }

        let height = main.getBoundingClientRect().height
        let flicked = drag.velocity > CLOSE_VELOCITY && Date.now() - drag.t < 100
        let shouldClose = drag.dy > Math.min(CLOSE_DISTANCE, height * .25) || flicked

        main.style.transition = `translate ${SNAP_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`

        if( shouldClose ){
            main.style.translate = `0 ${height}px`
            drag = null
            setTimeout(async ()=>{
                // view/panel may refuse to close (ex: unsaved changes) - put the sheet back
                await panel.close()
                if( panel.isOpen )
                    main.style.translate = '0 0'
                setTimeout(reset, SNAP_MS + 100)
            }, SNAP_MS)
        }else{
            main.style.translate = '0 0'
            setTimeout(reset, SNAP_MS)
        }
    }

    main.addEventListener('touchend', onEnd)
    main.addEventListener('touchcancel', onEnd)
}
