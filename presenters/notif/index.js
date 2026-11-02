import { LitElement, html, css } from 'lit'
import {unsafeHTML} from 'lit/directives/unsafe-html.js'
import Controller from './controller'
import style from './style'
import TYPES from './types'
import * as anim from './animations'
import '../dialog/element'
import '../../elements/spinner'
import Button from '../dialog/btn'
import isLitHTML from '../../helpers/lit/isLitHTML'

// open notifs by `nid`
const NOTIFS = new Map()
let uid = 0

// pointer down on these won't start a swipe
const NO_SWIPE = 'input, textarea, select, [contenteditable], b-btn, b-dialog-btn, form-control, text-field, b-audio'

const stripTags = str=>typeof str == 'string' ? str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : ''

customElements.define('b-notif', class extends LitElement{

    static get styles(){return style}

    static get properties(){ return {
        nid: {type: String, reflect: true},
        msg: {type: String},
        title: {type: String},
        pretitle: {type: String},
        btns: {type: Array},
        icon: {type: String},
        color: {type: String, reflect: true},
        accent: {type: String, reflect: true},
        edge: {type: Boolean, reflect: true},
        width: {type: String},
        animation: {type: String, reflect: true},
        compact: {type: Boolean, reflect: true},
        closeBtn: {type: Boolean},
        progress: {type: Boolean, reflect: true},
    }}

    constructor(opts={}){
        super()

        let controller = Controller.get(opts.controller || 'main')

        this.opts = Object.assign({
            nid: 'notif-'+(++uid),
            msg: '',
            icon: '',
            btns: [],
            color: 'inverse',
            edge: false,
            compact: false, // one line pill (icon, message, buttons)
            progress: false, // show a bar counting down `autoClose`
            closeBtn: undefined, // default: shown when `closeOnClick` is off and there's no cancel btn
            assertive: false, // screen readers interrupt to announce (errors/warnings)

            animation: 'slide',
            animationForReplace: 'morph',

            autoClose: 4000,
            closeOnClick: true,

            anchor: 'top-right',

            onClose(){},
            onClick(){}
        }, (TYPES[opts.type]||{}), (controller?.defaults||{}), opts)

        let props = this.constructor.properties

        for( let key in this.opts ){
            if( props[key] != undefined )
                this[key] = this.opts[key]
        }

        if( this.closeBtn === undefined )
            this.closeBtn = !this.opts.closeOnClick && !this.opts.view

        this.slot = this.opts.anchor
        this.motionDir = anim.direction(this.opts.anchor)
        this.setAttribute('swipe-axis', this.motionDir.axis)

        this._remaining = this.opts.autoClose || 0
        this._holds = new Set()

        this.addEventListener('click', this.onClick, false)
        this.addEventListener('pointerenter', this.onPointerEnter)
        this.addEventListener('pointerdown', this.onPointerDown)
        this.addEventListener('pointermove', this.onPointerMove)
        this.addEventListener('pointerup', this.onPointerUp)
        this.addEventListener('pointercancel', this.onPointerUp)

        this.onWindowFocus = this.onWindowFocus.bind(this)
        this.onWindowBlur = this.onWindowBlur.bind(this)

        if( this.opts.view ){
            this.opts.view.notif = this
            this.opts.view.setAttribute('in-notif', '')
            this.setAttribute('view', '')
        }

        this.resizeObserver = new ResizeObserver(()=>{
            if( !this.hasAttribute('closing') )
                this.style.setProperty('--h', this.offsetHeight+'px')
        })

        let existingNotif = NOTIFS.get(this.nid)

        NOTIFS.set(this.nid, this)

        if( existingNotif?.isConnected ){
            existingNotif.replaceWith(this)
            return
        }

        if( controller )
            controller.appendChild(this)
    }

    get controller(){ return this.parentElement?.tagName == 'B-NOTIFS' ? this.parentElement : null }

    get isClosing(){ return !!this._closing }

    connectedCallback(){
        super.connectedCallback()

        window.addEventListener('blur', this.onWindowBlur)
        window.addEventListener('focus', this.onWindowFocus)

        if( this.opts.width )
            this.style.width = this.opts.width

        this.resizeObserver.observe(this)

        // first render (and the custom view's) happens in a microtask, before paint, so the first keyframe shows without a flash
        if( !this._entered ){
            this._entered = true
            Promise.all([this.updateComplete, this.opts.view?.updateComplete]).then(()=>this.enter())
        }
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        window.removeEventListener('blur', this.onWindowBlur)
        window.removeEventListener('focus', this.onWindowFocus)
        this.resizeObserver.disconnect()
        this._stopTimer()

        if( NOTIFS.get(this.nid) == this && !this.isConnected )
            NOTIFS.delete(this.nid)
    }

    /*
        Enter
    */
    enter(){
        if( this._closing ) return

        let replaced = this._replaced
        delete this._replaced

        if( replaced && this.opts.animationForReplace == 'morph' ){
            let {host, content} = anim.morph(replaced.height, this.offsetHeight)
            this._enterAnims = [
                ...(host ? anim.play(this, [host]) : []),
                ...anim.play(this.$main, [content])
            ]
        }else{
            let name = replaced ? this.opts.animationForReplace : this.animation
            this._enterAnims = anim.play(this, anim.enter(name, this.motionDir))
        }

        // fill:both kept the last keyframe; drop it so css (stacking, swipe) is in control again
        anim.finished(this._enterAnims).then(()=>{
            if( !this._closing ) this._enterAnims.forEach(a=>a.cancel())
        })

        this.controller?.updateStack(this.slot)
        this.controller?.announce(this.announceText, this.opts.assertive)

        if( !document.hasFocus() )
            this._holds.add('blur')

        if( this.controller?.isHovered(this.slot) ){
            this._holds.add('hover')
            this.setAttribute('expanded', '')
        }

        this.startProgress()
        this._runTimer()
    }

    get $main(){ return this.shadowRoot.querySelector('main') }

    get announceText(){
        let src = this.opts.view || this
        return [src.pretitle, src.title, src.msg ?? src.body].map(stripTags).filter(s=>s).join('. ')
    }

    /*
        Close
    */
    close(btn){
        if( !this._closing )
            this._closing = this._close(btn)
        return this._closing
    }

    async _close(btn){

        this.setAttribute('closing', '')

        // a new notif with this `nid` should enter fresh, not replace this one
        if( NOTIFS.get(this.nid) == this )
            NOTIFS.delete(this.nid)

        this._stopTimer()
        this.controller?.updateStack(this.slot)

        if( this.isConnected ){
            // continue from where the notif is right now (mid enter or mid swipe)
            let computed = getComputedStyle(this)
            let from = {opacity: Number(computed.opacity), transform: computed.transform, swiped: this._swiped}

            if( this._swiped ){
                from.transform = this.motionDir.axis == 'x' ? `translateX(${this._dragOffset}px)` : `translateY(${this._dragOffset}px)`
                this.style.translate = ''
                this.style.opacity = ''
            }

            this._enterAnims?.forEach(a=>a.cancel())

            // collapsed in the stack: just fade, its space is a small peek
            let stacked = this.hasAttribute('stacked') && !this.hasAttribute('expanded')

            let anims = anim.play(this, stacked ? anim.exit('fade', this.motionDir, from) : [
                ...anim.exit(this.animation, this.motionDir, from),
                anim.collapse(this)
            ])

            await anim.finished(anims)
        }

        let controller = this.controller
        this.remove()
        controller?.updateStack(this.slot)
        this.opts.onClose(this)

        if( this.opts.view && this.opts.view.notif == this ){
            delete this.opts.view.notif
            this.opts.view.removeAttribute('in-notif')
        }

        return btn
    }

    // a new notif with the same `nid` takes this one's place
    replaceWith(el){
        el._replaced = {height: this.offsetHeight}

        this._stopTimer()
        super.replaceWith(el)

        this.opts.onClose(this)

        if( this.opts.view && this.opts.view.notif == this )
            delete this.opts.view.notif
    }

    /*
        Auto close timer
        holds (hover, touch, drag, blur) pause it and keep the time remaining
    */
    autoClose(start=true){

        // legacy: `autoClose(false)` stops, `autoClose(ms)` restarts with a new delay
        if( start === false ){
            this._stopTimer()
            this._remaining = 0
            this._progressAnim?.cancel()
            return
        }

        this._stopTimer()
        this._remaining = start === true ? this.opts.autoClose : start
        this.opts.autoClose = this._remaining
        this.startProgress()
        this._runTimer()
    }

    hold(reason){
        this._holds.add(reason)
        this._stopTimer()
    }

    release(reason){
        this._holds.delete(reason)
        this._runTimer()
    }

    _runTimer(){
        if( this._timeout || this._holds.size || !this._remaining || this._closing || !this.isConnected ) return

        this._timerAt = Date.now()
        this._timeout = setTimeout(()=>this.close(), this._remaining)
        this._progressAnim?.play()
    }

    _stopTimer(){
        if( !this._timeout ) return

        clearTimeout(this._timeout)
        this._timeout = null
        this._remaining = Math.max(this._remaining - (Date.now() - this._timerAt), 0)
        this._progressAnim?.pause()
    }

    startProgress(){
        this._progressAnim?.cancel()
        this._progressAnim = null

        let bar = this.shadowRoot.querySelector('.progress > div')
        if( !bar || !this._remaining ) return

        this._progressAnim = bar.animate({transform: ['scaleX(1)', 'scaleX(0)']}, {duration: this._remaining, fill: 'both'})
        this._progressAnim.pause()
    }

    onWindowBlur(){
        this.hold('blur')
    }

    onWindowFocus(){
        // came back to the window; make sure there's time to see the notif before it closes
        if( this._remaining && this._remaining < 2000 ){
            this._remaining = 2000
            if( this._progressAnim )
                this._progressAnim.currentTime = Math.max(this.opts.autoClose - 2000, 0)
        }

        this.release('blur')
    }

    /*
        Pointer: hover pauses the stack (the controller decides when the pointer leaves), touch pauses this notif, swipe to dismiss
    */
    onPointerEnter(e){
        if( e.pointerType == 'mouse' )
            this.controller?.setHovered(this.slot, true)
    }

    onPointerDown(e){
        if( e.pointerType == 'mouse' || this._closing ) return

        this.hold('touch')

        if( e.composedPath().find(el=>el.matches?.(NO_SWIPE)) ) return

        this._drag = {id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), active: false}
    }

    onPointerMove(e){
        let drag = this._drag
        if( !drag || drag.id != e.pointerId ) return

        let dx = e.clientX - drag.x
        let dy = e.clientY - drag.y
        let [main, cross] = this.motionDir.axis == 'x' ? [dx, dy] : [dy, dx]

        if( !drag.active ){
            // scrolling the other way; let it go
            if( Math.abs(cross) > 10 && Math.abs(cross) > Math.abs(main) ){
                this._drag = null
                return
            }

            if( Math.abs(main) < 8 ) return

            drag.active = true
            this.setPointerCapture(e.pointerId)
            this.setAttribute('dragging', '')
        }

        // free toward the edge, resisted the other way
        let offset = main * this.motionDir.sign > 0 ? main : main * .2
        this._dragOffset = offset

        let size = this.motionDir.axis == 'x' ? this.offsetWidth : this.offsetHeight
        this.style.translate = this.motionDir.axis == 'x' ? `${offset}px 0` : `0 ${offset}px`
        this.style.opacity = Math.max(1 - Math.abs(offset) / size, .2)
    }

    onPointerUp(e){
        let drag = this._drag
        this._drag = null

        if( e.pointerType != 'mouse' )
            this.release('touch')

        if( !drag?.active ) return

        this.removeAttribute('dragging')
        this._suppressClick = true
        setTimeout(()=>this._suppressClick = false)

        let offset = this._dragOffset * this.motionDir.sign
        let velocity = offset / (performance.now() - drag.t) // px/ms
        let size = this.motionDir.axis == 'x' ? this.offsetWidth : this.offsetHeight

        if( offset > size * .35 || (velocity > .5 && offset > 20) ){
            this._swiped = true
            this.close()
            return
        }

        // snap back
        let translate = this.style.translate
        this.style.translate = ''
        this.style.opacity = ''
        this.animate({translate: [translate, '0 0']}, {duration: 200, easing: anim.EASE})
    }

    /*
        Click
    */
    onClick(btn){

        if( btn instanceof Event ){
            if( this._suppressClick ) return
            btn = undefined
        }

        if( this.opts.onClick(this, btn) !== false && this.opts.closeOnClick )
            this.close(btn)
    }

    onContentClick(e){
        let btn = e.composedPath().find(el=>el.tagName == 'B-DIALOG-BTN')
        if( !btn ) return // clicking the notif itself (handled by onClick)

        e.stopPropagation()
        this.onClick(btn.isCancelBtn ? false : btn)
    }

    onCloseBtn(e){
        e.stopPropagation()
        this.opts.onClick(this, false)
        this.close(false)
    }

    /*
        Render
    */
    willUpdate(changed){
        if( changed.has('btns') )
            this._btnEls = (this.btns||[]).map(b=>b?new Button(b):'')
    }

    render(){return html`
        <main part="main">
            <slot>
                ${this.opts.view ? this.opts.view : this.renderContent()}
            </slot>

            ${this.progress && this.opts.autoClose ? html`
                <div class="progress" part="progress"><div></div></div>
            `:''}
        </main>
    `}

    renderContent(){return html`
        <div class="content" part="content" @click=${this.onContentClick}>
            ${this.icon ? html`
                <div class="icon" part="icon">${this.renderIcon()}</div>
            `:''}

            <div class="text" part="text">
                ${!this.compact && this.pretitle ? html`<div class="pretitle">${this._renderStr(this.pretitle)}</div>`:''}
                ${!this.compact && this.title ? html`<div class="title">${this._renderStr(this.title)}</div>`:''}
                ${this.msg ? html`
                    <div class="msg" title=${this.compact ? stripTags(this.msg) : ''}>${this._renderStr(this.msg)}</div>
                `:''}
            </div>

            ${this._btnEls?.length ? html`
                <div class="btns" part="btns">${this._btnEls}</div>
            `:''}

            ${this.closeBtn ? html`
                <b-btn class="close-btn" clear pill icon="close" aria-label="Close" @click=${this.onCloseBtn}></b-btn>
            `:''}
        </div>
    `}

    renderIcon(){
        if( this.icon == 'spinner' )
            return html`<b-spinner spin></b-spinner>`

        if( isLitHTML(this.icon) )
            return this.icon

        return html`<b-icon square name=${this.icon}></b-icon>`
    }

    _renderStr(str){
        if( isLitHTML(str) )
            return str
        return unsafeHTML(String(str))
    }

})

export default customElements.get('b-notif')

let notifClass = customElements.get('b-notif')

for( let key in TYPES ){
    if( !notifClass[key] )
        notifClass[key] = (msg, opts={})=>{

            opts = {...opts}

            // string or lit-html
            if( typeof msg == 'string' || isLitHTML(msg) )
                opts.msg = msg

            if( msg instanceof Error )
                opts.msg = msg.message

            let Notif = customElements.get('b-notif')
            return new Notif(Object.assign({}, TYPES[key], opts))
        }
}
