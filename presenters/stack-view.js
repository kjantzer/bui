/*
    Stack View - a list (or any root content) that slides in a detail view on top of it, within the same view
    (like iOS navigation). Details can push more details; the back btn (or `pop()`) slides them out.

    ```html
    <b-stack-view title="Sidebars">
        <b-btn slot="toolbar" ...>root toolbar actions</b-btn>
        <div>root content (ex: lists of items)</div>
    </b-stack-view>
    ```

    ```js
    stack.push(el, {
        title: 'Warehouse',                  // string or function (re-read on requestUpdate)
        actions: ()=>html`<b-btn>Use</b-btn>` // optional, right side of the detail's toolbar
    })
    stack.pop()      // the top detail
    stack.popAll()   // back to the root
    ```

    - the pushed element gets `.stack` (this) and can call `this.stack.requestUpdate()` when its title/actions change
    - `close-btn` attribute: the root toolbar has a close btn (emits `close-panel`, like other views in panels)
    - a detail can stop `pop()` by returning false from `willPop()` (ex: unsaved changes)
    - touch: swipe from the left edge to go back (the detail follows the finger)

    Routes (like <b-nav-view>'s sections): give pushed views a `path` and the url follows the stack;
    opening a url (or going back/forward) rebuilds it

    ```html
    <b-stack-view rootpath="sidebars" .routes=${[
        {path: 'sidebar/:id', open: async ({id})=>({el, opts})}, // (falsy: not found, stays on the root)
    ]}>
    ```
    ```js
    stack.push(el, {title, path: 'sidebar/12'}) // url: /sidebars/sidebar/12
    ```

    Root content scrolls itself (give it `overflow: auto`); detail elements fill their layer (also scroll themselves)
*/
import { LitElement, html, css } from 'lit'
import router from '../app/router'

const DURATION = 250
const EDGE = 24 // px from the view's left edge where a swipe goes back

customElements.define('b-stack-view', class extends LitElement{

    static properties = {
        title: {type: String},
        closeBtn: {type: Boolean, attribute: 'close-btn'},
        rootpath: {type: String}, // url of the root (routes are relative to it)
        routes: {attribute: false} // [{path, open(params) => {el, opts} }]
    }

    static styles = css`
        :host {
            position: relative;
            display: grid;
            overflow: hidden;
            height: 100%;
            min-height: 0;
            background: var(--theme-bgd);
        }

        .layer {
            position: absolute;
            inset: 0;
            display: grid;
            grid-template-rows: auto 1fr;
            min-height: 0;
            background: var(--theme-bgd);
            transition: transform ${DURATION}ms cubic-bezier(.3, .7, .3, 1), opacity ${DURATION}ms;
        }

        /* a detail slides in from the right */
        .layer.detail {
            transform: translateX(100%);
            box-shadow: -8px 0 24px -12px rgba(0,0,0,.25);
        }

        .layer.detail.shown {
            transform: none;
        }

        /* covered layers shift left a little (and fade), like iOS */
        .layer.covered {
            transform: translateX(-25%);
            opacity: .4;
            pointer-events: none;
        }

        .layer.hidden {
            visibility: hidden;
        }

        /* (following a swipe back) */
        :host([dragging]) .layer {
            transition: none;
        }

        header {
            display: flex;
            align-items: center;
            gap: .5rem;
            min-height: 3rem;
            padding: .5rem 1rem;
            box-sizing: border-box;
        }

        header .title {
            flex: 1;
            min-width: 0;
            font-family: var(--font-display);
            font-size: var(--font-size-md, 1.1892em);
            line-height: 1.1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        header .actions {
            display: flex;
            align-items: center;
            gap: .35rem;
        }

        /* bigger icon in the same size btn (like panel toolbars) */
        header .nav::part(main) {
            padding: .25em;
        }

        header .nav::part(icon) {
            --size: 1.3em;
        }

        header .nav {
            margin-left: -.5rem;
        }

        .body {
            display: grid;
            min-height: 0;
            overflow: hidden;
        }

        .body > *, ::slotted(:not([slot])) {
            min-height: 0;
        }
    `

    constructor(){
        super()
        this.layers = [] // pushed: {el, opts, shown}

        this.addEventListener('touchstart', this.onTouchStart.bind(this), {passive: false})
        this.addEventListener('touchmove', this.onTouchMove.bind(this), {passive: false})
        this.addEventListener('touchend', this.onTouchEnd.bind(this))
        this.addEventListener('touchcancel', this.onTouchEnd.bind(this))
    }

    get depth(){ return this.layers.length }
    get top(){ return this.layers[this.layers.length-1]?.el }

    // `opts.path`: (relative to rootpath) the url while it's shown
    push(el, opts={}){
        el.stack = this
        if( opts.path && !opts.fromRoute ) this.pushUrl(opts.path, opts.title)
        let layer = {el, opts, shown: false}
        this.layers = [...this.layers, layer]
        this.requestUpdate()

        // (after it renders off screen, so it slides in)
        this.updateComplete.then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
            layer.shown = true
            this.requestUpdate()
        })))

        return el
    }

    // `beforeLeave`: called once it's set to slide out (ex: clear a swipe's inline styles, so it slides from there)
    // `fromRoute`: the url already changed (back/forward), so it's left as is
    async pop({beforeLeave, fromRoute=false}={}){
        let layer = this.layers[this.layers.length-1]
        if( !layer ) return false

        // (a view can stop it, ex: unsaved changes)
        if( await layer.el.willPop?.() === false ){
            if( fromRoute && layer.opts.path ) this.pushUrl(layer.opts.path, layer.opts.title) // (put its url back)
            return false
        }

        // the url of what's shown now
        if( !fromRoute && this.rootpath ){
            let below = this.layers[this.layers.length-2]
            this.pushUrl(below?.opts.path || '', below?.opts.title)
        }

        layer.shown = false
        this.requestUpdate()
        await this.updateComplete
        beforeLeave?.()

        await new Promise(r=>setTimeout(r, DURATION))
        this.layers = this.layers.filter(l=>l!=layer)
        this.requestUpdate()
        return true
    }

    async popAll(opts){
        while( this.layers.length )
            if( !await this.pop(opts) ) return false
        return true
    }

    /*
        Routes
    */
    pushUrl(path, title){
        if( !this.rootpath ) return
        title = typeof title == 'function' ? title() : title
        router.push(joinPath(this.rootpath, path), {title: [this.title, title].filter(Boolean).join(': ')})
    }

    updated(changed){
        if( changed.has('routes') && this.routes && this.rootpath && !this._routes )
            this.addRoutes()
    }

    addRoutes(){
        let root = router.add(this.rootpath, (oldState, newState)=>{
            if( newState ) this.popAll({fromRoute: true})
        })

        this._routes = this.routes.map(def=>{
            let route = router.add(joinPath(this.rootpath, def.path), (oldState, newState)=>{
                if( newState ) this.openRoute(def, newState)
            })

            // already at its url
            let state = router.states && route.matches(router.states.current)
            if( state ) this.openRoute(def, state)

            return route
        })

        this._routes.push(root)
    }

    // the url changed to one of the routes: back to its layer if it's open (ex: going back), else open it
    async openRoute(def, state){
        let path = state.path.replace(/^\/+/, '')
        let at = this.layers.findIndex(l=>l.opts.path && joinPath(this.rootpath, l.opts.path) == path)

        if( at > -1 ){
            while( this.layers.length > at+1 )
                if( !await this.pop({fromRoute: true}) ) return
            return
        }

        if( !await this.popAll({fromRoute: true}) ) return

        let view = await def.open(state.params)
        if( !view?.el ) return

        let opts = {...view.opts, fromRoute: true}
        opts.path ||= path.slice(joinPath(this.rootpath, '').length+1)
        this.push(view.el, opts)
    }

    // under a layer that's shown (not one still sliding in or out)
    isCovered(i){
        return this.layers.slice(i+1).some(l=>l.shown)
    }

    /*
        Swipe back: from the left edge, when a detail is shown. Edge touches stay here: not the panel's swipe
        to close or the app sidebar's edge swipe (taps there are clicked for, since their touch is canceled)
    */
    get swipeLayers(){
        let layers = [...this.renderRoot.querySelectorAll('.layer')]
        return {top: layers[layers.length-1], below: layers[layers.length-2]}
    }

    onTouchStart(e){
        if( !this.layers.some(l=>l.shown) || e.touches.length > 1 ) return

        let t = e.touches[0]
        if( t.clientX - this.getBoundingClientRect().left > EDGE ) return

        e.stopPropagation()
        e.preventDefault()

        this._swipe = {x: t.clientX, y: t.clientY, time: Date.now(), target: e.composedPath()[0], width: this.offsetWidth}
    }

    onTouchMove(e){
        let s = this._swipe
        if( !s ) return
        e.stopPropagation()

        let t = e.touches[0]
        let dx = t.clientX - s.x
        let dy = t.clientY - s.y

        if( !s.dragging ){
            if( s.ignore || (Math.abs(dx) < 10 && Math.abs(dy) < 10) ) return
            if( Math.abs(dy) > Math.abs(dx) || dx < 0 ) return s.ignore = true
            s.dragging = true
            this.setAttribute('dragging', '')
        }

        e.preventDefault()

        s.progress = Math.min(1, Math.max(0, dx / s.width))
        s.lastX = t.clientX
        s.lastTime = Date.now()

        let {top, below} = this.swipeLayers
        top.style.transform = `translateX(${s.progress * 100}%)`
        if( below ){
            below.style.transform = `translateX(${-25 * (1 - s.progress)}%)`
            below.style.opacity = .4 + .6 * s.progress
        }
    }

    onTouchEnd(e){
        let s = this._swipe
        this._swipe = null
        if( !s ) return
        e.stopPropagation()

        if( !s.dragging ){
            // a tap at the edge (its touch was canceled, so the browser won't click)
            let t = e.changedTouches?.[0]
            if( !s.ignore && e.type == 'touchend' && t && Math.abs(t.clientX - s.x) < 10 && Math.abs(t.clientY - s.y) < 10 )
                s.target?.click?.()
            return
        }

        this.removeAttribute('dragging')

        let {top, below} = this.swipeLayers
        let clear = ()=>{
            top.style.removeProperty('transform')
            below?.style.removeProperty('transform')
            below?.style.removeProperty('opacity')
        }

        // a quick flick decides it; otherwise past a third of the way
        let velocity = (s.lastX - s.x) / Math.max(1, s.lastTime - s.time)
        if( velocity > .5 || s.progress > 1/3 )
            this.pop({beforeLeave: clear}).then(popped=>popped || clear())
        else
            clear()
    }

    close(){
        this.dispatchEvent(new CustomEvent('close-panel', {bubbles: true, composed: true}))
    }

    render(){
        let rootCovered = this.layers.some(l=>l.shown)
        let topShown = this.layers.findLastIndex(l=>l.shown)

        return html`
        <div class="layer root ${rootCovered?'covered':''} ${topShown > 0 ? 'hidden' : ''}">
            <header part="header">
                ${this.closeBtn?html`
                    <b-btn clear lg pill class="nav" icon="close" title="Close" @click=${this.close}></b-btn>
                `:''}
                <span class="title">${this.title}</span>
                <div class="actions"><slot name="toolbar"></slot></div>
            </header>
            <div class="body"><slot></slot></div>
        </div>

        ${this.layers.map((layer, i)=>{
            let {title, actions} = layer.opts
            return html`
            <div class="layer detail ${layer.shown?'shown':''} ${this.isCovered(i)?'covered':''} ${i < topShown-1 ? 'hidden' : ''}">
                <header part="header">
                    <b-btn clear lg pill class="nav" icon="chevron_left" title="Back" @click=${()=>this.pop()}></b-btn>
                    <span class="title">${typeof title == 'function' ? title() : title}</span>
                    <div class="actions">${actions?.() || ''}</div>
                </header>
                <div class="body">${layer.el}</div>
            </div>
        `})}
    `}

})

const joinPath = (root, path)=>[root.replace(/\/+$/, ''), path].filter(Boolean).join('/')

export default customElements.get('b-stack-view')
