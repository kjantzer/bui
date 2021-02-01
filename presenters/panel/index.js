import {LitElement, html, css, unsafeCSS} from 'lit-element'
import Controller from './controller'
import router from '../../router'
import Route from '../../router/route'
import device from '../../util/device'
import './controller'
import './toolbar'
import '../../elements/btn'

export const PanelDefaults = {
    type: '',
    closeBtn: false,
    title: '',
    width: '100%',
    height: '100%',
    anchor: 'right',
    animation: '',
    quickJump: true,
    closeOnEsc: false,
    controller: null, // root controller will be created and used
    disableBackdropClick: false,
    disableOverscrollClose: false
}

class RegisteredPanels {

    constructor(){
        this.register = new Map()
    }

    get shortcuts(){

        let shortcuts = []

        this.register.forEach(reg=>{

            let {view, route, opts} = reg

            view = customElements.get(view)
            opts = Object.assign({}, opts)

            if( !view ) return
            if( !opts.shortcuts&&!opts.shortcut ) return

            // use title/icon on the view if it gives it
            if( !opts.title && view.title ) opts.title = view.title
            if( !opts.icon && view.icon ) opts.icon = view.icon

            if( opts.shortcuts === true || opts.shortcut === true ){
                shortcuts.push({
                    title: opts.title,
                    icon: opts.icon||'',
                    url: route.rootPath
                })
            }

            if( opts.shortcuts && Array.isArray(opts.shortcuts) )
            opts.shortcuts.forEach(s=>{

                shortcuts.push(Object.assign({}, opts, {
                    description: '',
                    url: route.makePath(s.args||{})
                }, s))

            })

        })

        return shortcuts
    }


    set(key, data){
        return this.register.set(key, data)
    }

    get(path){
        return this.register.get(path)
    }

    add(path, view, opts={}){
        if( this.get(path) ){
            return console.warn(`A panel is already registered for ${path}`)
        }

        this.set(path, {view, opts})

        if( opts.route !== false )
        this.get(path).route = router.add(path, (oldState, newState, dir)=>{
            if( this._initiate(path) )
                this.get(path).panel._routeChange(oldState, newState, dir)
        })
    }

    _initiate(path){
        let registered = this.get(path)

        if( !registered ){
            console.error(`Panel for ${path} not found`)
            return false
        }

        // first time this panel is being requested
        if( !registered.panel ){

            if( typeof registered.view == 'function' ){
                registered.panel = new Panel()
                registered.panel.html = registered.view
            }
            else
                registered.panel = new Panel(registered.view, (registered.opts||{}))

            if( registered.route )
                registered.panel.route = registered.route

            // copy properties to panel
            if( registered.opts ){
                for(let key in registered.opts ){
                    if( key != 'route' )
                        registered.panel[key] = registered.opts[key]
                }
            }
        }

        return true
    }

    open(path){
        if( !this._initiate(path) ) return

        let registered = this.get(path)
        
        if( registered.route )
            router.goTo(registered.route)
        else
            registered.panel.open()
    }
    
}

export const register = new RegisteredPanels()

export const Modal = function(view, opts={}){
    opts = Object.assign({
        type: 'modal',
    }, opts)

    if( opts.closeBtn && opts.closeOnEsc === undefined )
        opts.closeOnEsc = true

    return new Panel(view, opts).open()
}

export const ActionSheet = function(view, opts={}){
    opts = Object.assign({
        type: 'actionsheet',
    }, opts)

    if( opts.closeOnEsc === undefined )
        opts.closeOnEsc = true

    return new Panel(view, opts).open()
}

export class Panel extends LitElement {

    static get properties(){return {
        title: {type: String},
        width: {type: String},
        height: {type: String},
        anchor: {type: String, reflect: true},
        type: {type: String, reflect: true},
        animation: {type: String, reflect: true}
    }}

    static register(path, view, opts){
        // move register to end of call stack
        setTimeout(()=>{
            register.add(path, view, opts)
        })
    }

    static open(path){
        register.open(path)
    }

    static get animationTime(){ return 300 }
    
    constructor(view, opts={}){
        super()

        let defaultOpts = Object.assign({}, PanelDefaults)

        if( opts.type == 'modal' ){
            defaultOpts.width = ''
            defaultOpts.height = ''
            defaultOpts.anchor = 'center'
            defaultOpts.animation = 'scale'
        }

        if( opts.type == 'actionsheet' ){
            defaultOpts.width = '100%'
            defaultOpts.height = ''
            defaultOpts.anchor = 'bottom'
        }

        opts = Object.assign(defaultOpts, opts)

        this.animation = opts.animation
        this.type = opts.type
        this.closeBtn = opts.closeBtn
        this.title = opts.title
        this.width = opts.width
        this.height = opts.height
        this.anchor = opts.anchor
        this.panelController = opts.controller

        this.opts = opts

        if( typeof view == 'function' ){
            this.html = view

        }else if( typeof view == 'string' ){
            this.view = document.createElement(view)

        }else if( view instanceof HTMLElement ){
            this.view = view
        }
    }

    onKeydown(e){
        if( !this.onTop ) return

        if( this.opts.closeOnEsc && e.key == 'Escape' )
            this.close()

        this.opts.onKeydown&&this.opts.onKeydown(e)
        this.view.onKeydown&&this.view.onKeydown(e)
    }

    // DEPRECATED: hash changed to path
    get hash(){ 
        console.warn('Panel: `.hash` is deprecated; use `.path`');
        this.path
    }

    get path(){
        return this.route&&this.route.state.props.path
    }

    get route(){ return this.__route}
    set route(route){

        if( this.route ){
            return console.warn('Panel routes can only be set once')
        }

        this.__route = route instanceof Route ? route : router.add(route, this._routeChange.bind(this))
    }

    _routeChange(oldState, newState, dir){

        // console.log(this.title, dir, oldState, newState);

        let detail = {
            oldState: oldState,
            newState: newState
        }

        if( newState ){

            newState.update({title: this.title})

            if( !this.isOpen && dir == 'forward' )
                newState.update({didEnter: true})
            
            this.open()
            detail.opened = true
        }

        if( oldState && !newState ){

            if( (oldState.isAfter && oldState.props.didEnter)
            || (oldState.isBefore && oldState.props.didExit) ){
                this._close(device.isiOS)
                detail.closed = true
            }

            // if( (oldState.isBefore && oldState.props.didEnter)
            // || (oldState.isAfter && oldState.props.didExit) )
            //     this.open()

        }

        if( oldState && newState ){
            
            // console.log('same view, but new state', newState.params);

            // if( this.view && this.view.onOpen ){
            //     this.view.onOpen(this.route.state)
            // }
        }

        this.dispatchEvent(new CustomEvent('route-changed', {
			bubbles: true,
			composed: true,
			detail: detail
		}))
    }

    render(){return html`
        <div class="backdrop"></div>
        <main style="${this.width?`width:${this.width};`:''}${this.height?`height:${this.height};`:''}">
            <b-btn icon="cancel-1" pill class="modal-close-btn" @click=${this.close} ?hidden=${this.closeBtn!==true}></b-btn>
            <slot></slot>
            <div class="inlinehtml">
                ${this.html}
            </div>
        </main>
    `}

    animate(effect){
        if( !effect ) return
        let main = this.shadowRoot.querySelector('main')
        main.classList.add(effect)
        setTimeout(function(){
            main.classList.remove(effect)
        },1000)
    }

    bounce(){
        this.animate('bounce')
    }

    shake(){
        this.animate('shake')
    }

    set html(fn){ this.__html = fn}
    get html(){ return this.__html ? this.__html.call(this) : ''}

    set view(view){
        if( this.view ){
            this.view.panel = null
            this.view.remove()
        }

        if( this.toolbar ){
            this.toolbar.panel = null
            this.toolbar = null
        }
            
        this.__view = view;
        
        if( this.view ){

            // already in the DOM, add a placeholder so we can put this view back after closing
            if( this.view.parentElement ){
                this.__viewOriginalPlacement = document.createElement('span')
                this.__viewOriginalPlacement.classList.add('panel-view-placeholder')
                this.__viewOriginalPlacement.style.position = 'absolute'
                this.view.replaceWith(this.__viewOriginalPlacement)
            }

            this.view.panel = this
            this.appendChild(this.view)
            this._linkToolbar()
        }
    }
    get view(){ return this.__view}

    get isOpen(){ return this.hasAttribute('open')}
    get onTop(){ return this.hasAttribute('ontop') || (this.type == 'modal' && this.parentElement.lastElementChild == this) }

    firstUpdated(){
        this._linkToolbar()
        
        this.shadowRoot.querySelector('.backdrop').addEventListener('click', e=>{
            
            if( this.opts.onBackdropClick && this.opts.onBackdropClick() === false )
                return

            if( this.opts.disableBackdropClick !== true )
                this.close()
        })
    }

    _linkToolbar(){
        setTimeout(()=>{
            
            if( this.view && this.view.shadowRoot )
                this.toolbar = this.view.shadowRoot.querySelector('b-panel-toolbar')
            else
                this.toolbar = this.shadowRoot.querySelector('b-panel-toolbar') || this.querySelector('b-panel-toolbar')
            
            if( this.toolbar ){
                this.toolbar.panel = this
                this.toolbar.title = this.title
            }
            
        },0)
    }

    get panelController(){return this.__panelController}
    set controller(val){ this.panelController = val }
    set panelController(val){
        
        if( typeof val === 'string' ){
            let _val = val
            val = Controller.for(val)
            if( !val )
                console.warn('Panel controller `'+_val+'` does not exist, root will be used')
        }

        this.__panelController = val
    }

    async open(...args){
        
        if( this.route && this.route.state.props.controller )
            this.controller = this.route.state.props.controller

        // if no controller set, use the root controller
        if( !this.panelController ){
            this.panelController = Controller.for('root')
        }

        if( this.view && this.view.willOpen ){
            if( await this.view.willOpen(this.route.state) === false )
                return false;
        }

        this._onKeydown = this._onKeydown || this.onKeydown.bind(this)
        window.removeEventListener('keydown', this._onKeydown, true)
        window.addEventListener('keydown', this._onKeydown, true)

        this.panelController.add(this)

        setTimeout(()=>{
            this.setAttribute('open', '')

            if( this.view && this.view.onOpen ){
                if( this.route )
                    args.unshift(this.route.state)
                this.view.onOpen(...args)
            }

        },100)

        return this
    }

    set title(str){
        this.__title = str
        this.route&&this.route.update({title: str})
        if(this.toolbar) this.toolbar.title = str
    }
    get title(){ return this.__title }

    get params(){
        return this.route ? this.route.state.params : {}
    }

    async close(){

        if( this.opts.onClose && await this.opts.onClose() === false )
            return
        
        if( this.view && this.view.onClose && await this.view.onClose() === false )
            return

        this.route&&this.route.update({didExit: true})
        this._close()

        if( this.route)
            this.panelController._updateRoute()

        // put the view back to it's original DOM location (if it had one)
        if( this.__viewOriginalPlacement ){
            this.__viewOriginalPlacement.replaceWith(this.view)
            delete this.__viewOriginalPlacement
        }

        return this
    }

    _close(immediate=false){
        window.removeEventListener('keydown', this._onKeydown, true)
        this.panelController.remove(this)
        this.removeAttribute('open')
        
        if( immediate )
            this.remove()
        else
        setTimeout(()=>{
            this.remove()
        }, Panel.animationTime)
    }

    static get styles(){return css`
        :host {
            pointer-events: initial;
            display: flex;
            position: absolute;
            overflow: visible;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--b-panel-overlay, rgba(0,0,0,.4)); /* overlay */
            opacity: 0;
            transition: opacity ${Panel.animationTime}ms cubic-bezier(0.4, 0, 0.2, 1),
                        background-color ${Panel.animationTime}ms cubic-bezier(0.4, 0, 0.2, 1);
            --radius: var(--b-panel-radius, 5px);
            --radius-top: var(--radius);
            --radius-bottom: 0;
        }

        :host([type="modal"]) {
            z-index: 1000; /* always on top */
        }

        :host([type="actionsheet"]) {
            z-index: 1001 !important;
        }

        :host > main {
            pointer-events: none;
            position: absolute;
            right: 0;
            min-width: min(80vw, 300px);
            min-height: 1em;
            max-width: var(--max-width, 100%);
            max-height: var(--max-height, 100%);
            overflow: visible;
            display: flex;
            flex-direction: column;
            background: var(--b-panel-bgd, #fff);
            box-shadow: var(--b-panel-shadow, var(--theme-shadow, rgba(0,0,0,.2)) 0 3px 10px);
            border-radius: var(--radius-top) var(--radius-top) var(--radius-bottom) var(--radius-bottom);
            transition: ${Panel.animationTime}ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([type="modal"]) > main {
            max-height: var(--max-height, 96%);
            max-width: var(--max-width, 96%);
        }

        :host([type="actionsheet"]) main {
            max-width: var(--b-panel-actionsheet-max-w, 500px);
            margin-bottom: 0;
            max-height: var(--b-panel-actionsheet-max-h, 70vh);
            /* --radius: 12px; */
        }

        :host([type="actionsheet"]) > main {
            transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* :host([type="actionsheet"][anchor="top"]) > main {
            padding-top: env(safe-area-inset-top);
        } */

        :host([type="actionsheet"][anchor="bottom"]) > main {
            padding-bottom: env(safe-area-inset-bottom);
        }

        :host([open]) {
            opacity: 1;
        }

        :host([open]) > main {
            opacity: 1;
            transform: none !important;
        }

        :host([anchor="right"]) > main {
            transform: translateX(100px);
            height: 100%;
        }

        :host([anchor="left"]) > main {
            right: auto;
            left: 0;
            transform: translateX(-100px);
            height: 100%;
        }

        :host([anchor="center"]) > main,
        :host([anchor="top"]) > main,
        :host([anchor="bottom"]) > main {
            position: relative;
            margin: auto auto;
            transform: translateY(100px);
        }

        :host([anchor="center"]) > main {
            border-radius: var(--radius);
        }

        :host([anchor="center"][animation="scale"]) > main {
            transform: scale(.5);
        }

        :host([anchor="center"][animation="fade"]) > main {
            transform: none;
        }

        :host([anchor="top"]) > main {
            margin-top: 0;
            transform: translateY(-100px);
            border-radius: 0 0 var(--radius) var(--radius);
        }

        :host([anchor="bottom"]) > main {
            margin-bottom: 0;
        }

        .backdrop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .modal-close-btn {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 10000;
            transform: translate(50%, -50%);
        }

        main > slot::slotted(*) {
            width: 100%;
            pointer-events: all;
            /* display: grid;
            grid-template-rows: auto 1fr; */
        }

        main > slot::slotted(.dialog) {
            font-size: 1.1em;
        }

        main > slot::slotted(b-embed) {
            border-radius: var(--radius);
            overflow: hidden;
        }

        main {
            display: grid;
        }

        main > section {
            padding: 1em;
        }

        .inlinehtml {
            display: contents;
        }

        .inlinehtml > * {
            pointer-events: all;
        }

        @media print {
            :host {
                background: none;
                position: static;
            }

            :host(:not([ontop])) {
                display: none !important;
            }

            :host > main {
                width: 100% !important;
                border-radius: 0;
                box-shadow: none;
            }
        }

        @keyframes bounce {
            from,
            20%,
            53%,
            80%,
            to {
                -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }

            40%,
            43% {
                -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                -webkit-transform: translate3d(0, -30px, 0);
                transform: translate3d(0, -30px, 0);
            }

            70% {
                -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                -webkit-transform: translate3d(0, -15px, 0);
                transform: translate3d(0, -15px, 0);
            }

            90% {
                -webkit-transform: translate3d(0, -4px, 0);
                transform: translate3d(0, -4px, 0);
            }
        }

        @keyframes shake {
            from,
            to {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }

            15%,
            45%,
            75% {
                -webkit-transform: translate3d(-10px, 0, 0);
                transform: translate3d(-10px, 0, 0);
            }

            30%,
            60%,
            90% {
                -webkit-transform: translate3d(10px, 0, 0);
                transform: translate3d(10px, 0, 0);
            }
        }

        .bounce {
            animation-name: bounce;
            transform-origin: center bottom;
            animation-duration: 1s;
            animation-fill-mode: both;
        }

        .shake {
            animation-name: shake;
            animation-duration: 700ms;
            animation-fill-mode: both;
        }
    `}
}

customElements.define('b-panel', Panel)

export default customElements.get('b-panel')