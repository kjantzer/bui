import { LitElement, html, css } from 'lit'

const NotifControllers = {}

customElements.define('b-notifs', class extends LitElement{

    static get(name='main'){

        if( name == 'main' && !NotifControllers[name] ){
            let controller = document.createElement('b-notifs')
            controller.setAttribute('name', 'main')
            document.body.appendChild(controller)
            NotifControllers[name] = controller
        }

        return NotifControllers[name]
    }

    static get properties(){return {
        // older notifs in an anchor collapse behind the newest ones (expand on hover); `0` turns off
        collapseAfter: {type: Number},
    }}

    get name(){
        return this.hasAttribute('name') ? this.getAttribute('name') : undefined
    }

    constructor(){
        super()
        this.collapseAfter = 3
        this._hovered = {}

        if( this.name ){
            if( NotifControllers[this.name] )
                console.warn('A `b-notifs` controller already exists with the name: ', this.name)
            else
                NotifControllers[this.name] = this
        }
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        if( this.name )
            delete NotifControllers[this.name]
    }

    connectedCallback(){
        super.connectedCallback()
        if( this.name && !NotifControllers[this.name] )
            NotifControllers[this.name] = this
    }

    notifsIn(slot){
        return Array.from(this.children).filter(el=>el.tagName == 'B-NOTIF' && el.slot == slot)
    }

    /*
        Hovering any notif in an anchor pauses all of them (and expands a collapsed stack)

        Entering is a `pointerenter` on a notif. Leaving is decided by where the pointer actually is,
        not `pointerleave`, which also fires when the stack moves under a still pointer
        (ex: clicking to close a notif, the next one slides up under the pointer)
    */
    isHovered(slot){ return !!this._hovered[slot] }

    setHovered(slot, hovered){
        clearTimeout(this._hoverTimeout)

        if( !hovered ){
            this._setHovered(slot, false)
            return
        }

        // moved straight to a different anchor
        for( let other in this._hovered )
            if( other != slot && this._hovered[other] ) this._setHovered(other, false)

        this._setHovered(slot, true)
    }

    _setHovered(slot, hovered){
        if( !!this._hovered[slot] == hovered ) return
        this._hovered[slot] = hovered

        this.notifsIn(slot).forEach(notif=>{
            notif.toggleAttribute('expanded', hovered)
            hovered ? notif.hold('hover') : notif.release('hover')
        })

        let anyHovered = Object.values(this._hovered).some(h=>h)

        if( anyHovered && !this._trackingPointer ){
            this._trackingPointer = true
            window.addEventListener('pointermove', this.onPointerMove)
            document.documentElement.addEventListener('pointerleave', this.onPointerLeaveWindow)
        }else if( !anyHovered && this._trackingPointer ){
            this._trackingPointer = false
            window.removeEventListener('pointermove', this.onPointerMove)
            document.documentElement.removeEventListener('pointerleave', this.onPointerLeaveWindow)
        }
    }

    // includes closing notifs so the space a notif is collapsing out of still counts
    pointerIsOver(slot, x, y){
        return this.notifsIn(slot).some(el=>{
            let r = el.getBoundingClientRect()
            return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
        })
    }

    onPointerMove = (e)=>{
        if( e.pointerType != 'mouse' ) return

        for( let slot in this._hovered ){
            if( !this._hovered[slot] ) continue

            if( this.pointerIsOver(slot, e.clientX, e.clientY) ){
                clearTimeout(this._hoverTimeout)
                this._hoverTimeout = null
            }
            // debounced so crossing the gap between notifs doesn't flicker
            else if( !this._hoverTimeout )
                this._hoverTimeout = setTimeout(()=>{
                    this._hoverTimeout = null
                    this._setHovered(slot, false)
                }, 150)
        }
    }

    onPointerLeaveWindow = ()=>{
        for( let slot in this._hovered )
            this.setHovered(slot, false)
    }

    // oldest notifs past `collapseAfter` tuck behind the oldest expanded one
    updateStack(slot){
        let notifs = this.notifsIn(slot).filter(el=>!el.hasAttribute('closing'))

        // nothing left to hover
        if( this._hovered[slot] && !notifs.length )
            this.setHovered(slot, false)

        let collapse = this.collapseAfter > 0 ? Math.max(notifs.length - this.collapseAfter, 0) : 0

        notifs.forEach((notif, i)=>{
            let depth = collapse - i // 1 = right behind the first expanded notif

            if( depth > 0 ){
                notif.setAttribute('stacked', depth > 2 ? 'hidden' : '')
                notif.style.setProperty('--stack-depth', Math.min(depth, 3))
            }else{
                notif.removeAttribute('stacked')
                notif.style.removeProperty('--stack-depth')
            }
        })
    }

    // screen readers: the live regions exist before notifs show so announcements are reliable
    announce(text, assertive=false){
        if( !text ) return

        let region = this.shadowRoot?.querySelector(assertive ? '.sr-assertive' : '.sr-polite')
        if( !region ) return

        region.textContent = ''
        requestAnimationFrame(()=>region.textContent = text)
    }

    static get styles(){return css`
        :host {
            display: block;
            pointer-events: none;

            overflow: hidden;
            position:absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 1200;
            --padding: var(--b-notif-padding, 1em);
        }

        :host([name="main"]) {
            position: fixed;
            top: env(safe-area-inset-top);
            left: env(safe-area-inset-left);
            bottom: env(safe-area-inset-bottom);
            right: env(safe-area-inset-right);
        }

        slot {
            position: absolute;
            display: flex;
        }

        slot[name="top"],
        slot[name="bottom"] {
            width: 100%;
            align-items: center;
        }

        slot[name*="top"] {
            top: 0;
            flex-direction: column;
            padding-top: var(--padding);
        }

        slot[name*="bottom"] {
            bottom: 0;
            flex-direction: column-reverse;
            padding-bottom: var(--padding);
        }

        slot[name*="left"] {
            left: 0;
            padding-left: var(--padding);
            align-items: flex-start;
        }

        slot[name*="right"] {
            right: 0;
            padding-right: var(--padding);
            align-items: flex-end;
        }

        .sr {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(50%);
            white-space: nowrap;
        }

        @media (max-width:599px) {
            slot {
                padding: 0 !important;
                position: static !important;
                --b-notif-width: 100%;
            }

            .top,
            .bottom {
                position: absolute;
                display: flex;
                flex-direction: column;
                width: 100%;
                padding: var(--padding);
                box-sizing: border-box;
            }

            .top { top: 0; }
            .bottom { bottom: 0; }
        }
    `}

    render(){return html`
        <div class="bottom">
            <slot name="bottom-left"></slot>
            <slot name="bottom"></slot>
            <slot name="bottom-right"></slot>
        </div>

        <div class="top">
            <slot name="top-left"></slot>
            <slot name="top"></slot>
            <slot name="top-right"></slot>
        </div>

        <div class="sr sr-polite" role="status" aria-live="polite"></div>
        <div class="sr sr-assertive" role="alert" aria-live="assertive"></div>
    `}

})

export default customElements.get('b-notifs')
