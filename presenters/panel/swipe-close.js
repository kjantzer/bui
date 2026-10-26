/*
    # Panel Swipe to Close

    On small screens and touch-only devices (ex: a tablet), panels shown as a bottom sheet
    (`anchor: 'bottom'`) can be dragged down to close (like iOS sheets). A grabber is shown at
    the top of the sheet (`swipe-close` attr).

    On touch-only devices, panels that slide in from the right (`anchor: 'right'`) can be
    dragged right to close (`swipe-close-right` attr; they keep their close btns)

    - drag starts anywhere in the panel, but only when the content under the finger is
      scrolled to the start (top for a sheet, left for a right panel; otherwise it scrolls as normal)
    - drags in other directions are ignored
    - release past a distance or with a quick flick closes; otherwise it snaps back

    Opt out per panel with `swipeClose: false`, or for an element (and its children)
    with the `no-swipe-close` attribute (ex: a map, signature pad)
*/

const SMALL_SCREEN = '(max-width: 599px)'
const TOUCH_ONLY = '(any-pointer: fine)' // (not matching = touch only)
const LOCK_DISTANCE = 8 // px moved before deciding the drag direction
const CLOSE_DISTANCE = 140 // px (or 25% of the sheet height, whichever is smaller)
const CLOSE_VELOCITY = .6 // px/ms
const SNAP_MS = 200
const SCREEN_EDGE = 24 // px; right panel drags starting this close to the screen's left edge are left alone

const touchOnly = ()=>!window.matchMedia?.(TOUCH_ONLY).matches

// the direction the panel can be dragged to close: 'down', 'right', or null
export function swipeCloseDir(panel){
    if( panel.opts?.swipeClose === false || panel.type == 'modal' ) return null

    if( panel.anchor == 'bottom' && (window.matchMedia?.(SMALL_SCREEN).matches || touchOnly()) )
        return 'down'

    if( panel.anchor == 'right' && touchOnly() )
        return 'right'

    return null
}

export function canSwipeClose(panel){ return swipeCloseDir(panel) == 'down' }

export function updateSwipeClose(panel){
    let dir = swipeCloseDir(panel)
    panel.toggleAttribute('swipe-close', dir == 'down')
    panel.toggleAttribute('swipe-close-right', dir == 'right')
}

// is the drag starting in content that is scrolled (should scroll instead of close)?
function startsInScrolledContent(path, main, dir){
    for( let el of path ){
        if( el == main ) return false
        if( !(el instanceof Element) ) continue

        if( el.hasAttribute('no-swipe-close') ) return true
        if( el.matches('input[type="range"], textarea, select') ) return true

        let [scrolled, size, client, prop] = dir == 'right'
            ? [el.scrollLeft, el.scrollWidth, el.clientWidth, 'overflowX']
            : [el.scrollTop, el.scrollHeight, el.clientHeight, 'overflowY']

        if( scrolled > 0 && size > client ){
            let overflow = getComputedStyle(el)[prop]
            if( overflow == 'auto' || overflow == 'scroll' ) return true
        }
    }
    return false
}

// open panels follow the window size and pointer (ex: a desktop window made narrow and wide again
// shows/hides the grabber and views' close btns); weak refs so closed, removed panels aren't kept
const panels = new Set()
const updatePanels = ()=>{
    for( let ref of panels ){
        let panel = ref.deref()
        if( !panel ) panels.delete(ref)
        else if( panel.isOpen ) updateSwipeClose(panel)
    }
}
window.matchMedia?.(SMALL_SCREEN).addEventListener?.('change', updatePanels)
window.matchMedia?.(TOUCH_ONLY).addEventListener?.('change', updatePanels)

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

        let dir = panel.hasAttribute('swipe-close') ? 'down' : panel.hasAttribute('swipe-close-right') ? 'right' : null
        if( !dir || !panel.isOpen || e.touches.length > 1 ) return
        if( e.swipeClosePanel ) return // (a panel inside this one has it)
        if( startsInScrolledContent(e.composedPath(), main, dir) ) return

        let {clientX, clientY} = e.touches[0]
        if( dir == 'right' && clientX < SCREEN_EDGE ) return // (the app sidebar's edge swipe)

        e.swipeClosePanel = panel
        drag = {dir, x: clientX, y: clientY, d: 0, t: Date.now(), state: 'pending'}
    }, {passive: true})

    main.addEventListener('touchmove', e=>{
        if( !drag || drag.state == 'cancelled' ) return

        let {clientX, clientY} = e.touches[0]
        let right = drag.dir == 'right'
        let dx = clientX - drag.x
        let dy = clientY - drag.y
        let [along, across] = right ? [dx, dy] : [dy, dx]

        if( drag.state == 'pending' ){
            if( Math.abs(dx) < LOCK_DISTANCE && Math.abs(dy) < LOCK_DISTANCE ) return

            // only a drag mostly in the close direction (down, or right) closes; anything else is left to scroll
            if( along <= 0 || Math.abs(across) > Math.abs(along) ){
                drag.state = 'cancelled'
                return
            }

            drag.state = 'dragging'
            // start from here so the panel doesn't jump by the lock distance
            drag.x = clientX
            drag.y = clientY
            along = 0
            drag.t = Date.now()
            main.style.transition = 'none'
        }

        e.preventDefault() // stop the content from scrolling/bouncing while dragging the panel

        // track speed of the latest movement (for "flick" to close)
        let now = Date.now()
        along = Math.max(0, along)
        drag.velocity = (along - drag.d) / Math.max(1, now - drag.t)
        drag.t = now
        drag.d = along

        main.style.translate = right ? `${drag.d}px 0` : `0 ${drag.d}px`
    }, {passive: false})

    function onEnd(){
        if( !drag || drag.state != 'dragging' ){
            drag = null
            return
        }

        let right = drag.dir == 'right'
        let rect = main.getBoundingClientRect()
        let size = right ? rect.width : rect.height
        let flicked = drag.velocity > CLOSE_VELOCITY && Date.now() - drag.t < 100
        let shouldClose = drag.d > Math.min(CLOSE_DISTANCE, size * .25) || flicked

        main.style.transition = `translate ${SNAP_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`

        if( shouldClose ){
            main.style.translate = right ? `${size}px 0` : `0 ${size}px`
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
