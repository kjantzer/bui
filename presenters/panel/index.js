import {LitElement, html, css, unsafeCSS} from 'lit'
import Controller from './controller'
import router from '../../router'
import Route from '../../router/route'
import device from '../../util/device'
import './controller'
import './toolbar'
import '../../elements/btn'
import CollMap from '../../util/collmap'
import isLitHTML from '../../helpers/lit/is-lit-html'

export const PanelDefaults = {
    type: '',
    closeBtn: false,
    title: '',
    width: '100%',
    height: '100%',
    anchor: 'bottom',
    animation: 'rise',
    quickJump: true,
    closeOnEsc: false,
    controller: null, // root controller will be created and used
    disableBackdropClick: false,
    disableOverscrollClose: false
}

let permissionCheck

class RegisteredPanels {

    constructor(){
        this.register = new CollMap()
    }

    set(key, data){
        return this.register.set(key, data)
    }

    get(path){
        return this.register.get(path)
    }

    add(path, view, opts={}){

        // use the path on the defined custom element
        if( path && typeof view != 'string' ){
            let _view = customElements.get(path)
            if( _view ){
                opts = view || {}
                view = path
                path = _view.path
            }       
        }

        if( !path )
            return console.error('Panel.register - missing path for:', view)

        if( this.get(path) ){
            return console.warn(`A panel is already registered for ${path}`)
        }

        if( path && router.routes.includes(router.pathRoot+path) )
            return console.warn('Ignorning panel registration, route already in use')

        if( typeof view == 'string' ){
            let ce = customElements.get(view)
            if( ce ){
                opts.title = opts.title || ce.title
                opts.icon = opts.icon || ce.icon
            }
        }

        this.set(path, {view, opts})

        if( opts.route !== false )
        this.get(path).route = router.add(path, (oldState, newState, dir, opts)=>{

            if( router.routes.filter(route=>route==router.pathRoot+path).length > 1 )
                return console.warn('Ignorning panel open, route already in use')

            if( this._initiate(path) )
                this.get(path).panel._routeChange(oldState, newState, dir)
        }, {
            refObject: this.get(path)
        })
    }

    checkPermission(reg){
        let permission = reg.opts.permission

        if( !permission ) return true

        if( typeof permission == 'function' )
            return permission() !== false

        if( permissionCheck && permissionCheck(permission) == false )
            return false
            
        return true
    }

    _initiate(path){
        let registered = this.get(path)

        if( !registered ){
            console.error(`Panel for ${path} not found`)
            return false
        }

        if( this.checkPermission(registered) == false )
            return

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

    get shortcuts(){
        return this.toMenu({onlyShortcuts:true})
    }

    get menu(){
        return this.toMenu()
    }

    toMenu({
        onlyShortcuts=false,
        relatedShortcuts=true,
        checkPermission=true
    }={}){

        let menu = []

        this.register.forEach(reg=>{

            let {view, route, opts} = reg

            view = customElements.get(view)
            opts = Object.assign({}, opts)

            if( !view ) return
            if( onlyShortcuts && !opts.shortcuts&&!opts.shortcut ) return
            if( checkPermission && this.checkPermission(reg) == false ) return

            // use title/icon on the view if it gives it
            if( !opts.title && view.title ) opts.title = view.title
            if( !opts.icon && view.icon ) opts.icon = view.icon

            let shortcuts = opts.shortcuts || view.shortcuts

            if( shortcuts && Array.isArray(shortcuts) ){
                shortcuts = shortcuts.map(s=>{
                    return Object.assign({}, opts, {
                        parent: opts.title,
                        sortTitle: opts.title+' '+s.title,
                        description: '',
                        url: route.makePath(s.args||{})
                    }, s)
                })
            }else{
                shortcuts = []
            }

            if( !onlyShortcuts || opts.shortcuts === true || opts.shortcut === true ){
                menu.push({
                    title: opts.title,
                    sortTitle: opts.title,
                    icon: opts.icon||'',
                    url: route.rootPath,
                    shortcuts
                })
            }

            if( relatedShortcuts && onlyShortcuts && shortcuts.length > 0 )
                menu.push(...shortcuts )
        })

        menu = menu.sort((a,b)=>a.sortTitle>b.sortTitle?1:-1)
        
        return menu
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

    static set permissionCheck(fn){
        if( typeof fn != 'function' )
            throw new Error('permissionCheck should be a function')

        permissionCheck = fn
    }

    static get properties(){return {
        title: {type: String},
        width: {type: String, reflect: true},
        height: {type: String, reflect: true},
        anchor: {type: String, reflect: true},
        type: {type: String, reflect: true},
        vid: {type: String, reflect: true},
        animation: {type: String, reflect: true},
        closebtn: {type: String, reflect: true}
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

    static get animationTime(){ return 200 }
    
    constructor(view, opts={}){
        super()

        let defaultOpts = Object.assign({}, PanelDefaults)

        if( opts.type == 'modal' ){
            defaultOpts.width = ''
            defaultOpts.height = ''
            defaultOpts.anchor = 'center'
            defaultOpts.animation = 'scale'
        
        }else if( opts.type == 'actionsheet' ){
            defaultOpts.width = '100%'
            defaultOpts.height = ''
            defaultOpts.anchor = 'bottom'
            
        }else{

            if( opts.width && opts.width != '100%' )
                defaultOpts.anchor = 'right'

            // change to slide animation if view has width set (makes more sense)
            if( !opts.animation && opts.width )
                opts.animation = 'slide'
        }

        opts = Object.assign(defaultOpts, opts)

        this.animation = opts.animation
        this.vid = opts.vid
        this.type = opts.type
        this.closebtn = opts.closeBtn
        this.title = opts.title
        this.width = opts.width
        this.height = opts.height
        this.anchor = opts.anchor
        this.panelController = opts.controller
        this._closeFromEvent = this._closeFromEvent.bind(this)

        this.opts = opts

        if( isLitHTML(view ) || typeof view == 'function' ){
            this.html = view

        }else if( typeof view == 'string' ){
            this.view = document.createElement(view)

        }else if( view instanceof HTMLElement ){
            this.view = view
        }
    }

    onKeydown(e){

        let _lastKeyDown = new Date().getTime()

        // too fast of data entry, must be a barcode scanner
        if( this._lastKeyDown && _lastKeyDown - this._lastKeyDown <= 50 )
            return

        this._lastKeyDown = _lastKeyDown

        if( !this.onTop ) return

        if( this.opts.closeOnEsc && e.key == 'Escape' )
            this.close()

        if( !this.opts.disableBackdropClick && document.activeElement.tagName == 'BODY'){

            // Mac=option key; Windows=alt key
            if( e.altKey && (e.key == 'w' || e.key == '∑') )
                this.close()

            if( e.shiftKey && e.key == 'Tab' ){
                e.preventDefault()
                this.panelController && this.panelController.quickJump()
            }
        }

        this.opts.onKeydown&&this.opts.onKeydown(e)
        this.view?.onKeydown&&this.view.onKeydown(e)
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
            
            this.open({oldState, newState, dir})
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
        <div part="backdrop" class="backdrop"></div>
        <main part="main" style="${this.width?`width:${this.width};`:''}${this.height?`height:${this.height};`:''}">
            <b-btn icon="close" squareicon pill class="modal-close-btn" @click=${this.close} ?hidden=${this.closebtn!==true}></b-btn>
            <slot></slot>
            <div class="inlinehtml">
                ${this.html}
            </div>
        </main>
    `}

    animate(effect, {timeout=1000}={}){
        if( !effect ) return
        let main = this.shadowRoot.querySelector('main')
        main.classList.add(effect, 'animate')
        setTimeout(function(){
            main.classList.remove(effect, 'animate')
        },timeout)
    }

    bounce(){ this.animate('bounce') }
    shake(){ this.animate('shake') }
    pulseBack(){ this.animate('pulseback', {timeout: 220}) }

    set html(fn){ this.__html = fn}
    get html(){ return this.__html && typeof this.__html == 'function' ? this.__html.call(this) : (this.__html||'')}

    set view(view){
        if( this.view ){
            this.view.removeAttribute('in-panel')
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
            this.view.setAttribute('in-panel', '')
            this.appendChild(this.view)
            this._linkToolbar()
        }
    }
    get view(){ return this.__view}

    get isOpen(){ return this.hasAttribute('open')}
    get onTop(){ return this.hasAttribute('ontop') 
            || (['modal', 'actionsheet'].includes(this.type) && this.parentElement.lastElementChild == this) }

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
                this.toolbar = this.shadowRoot?.querySelector('b-panel-toolbar') || this.querySelector('b-panel-toolbar')
            
            if( this.toolbar ){
                
                if( this.closebtn )
                    this.toolbar.closebtn = this.closebtn

                this.toolbar.panel = this
                this.toolbar.title = this.title
            }
            
        },0)
    }

    get panelController(){return this.__panelController}
    set controller(val){ this.panelController = val }
    set panelController(val){

        if( val === 'keep' ) return
        
        if( typeof val === 'string' ){
            let _val = val
            val = Controller.for(val)
            if( !val )
                console.warn('Panel controller `'+_val+'` does not exist, root will be used')
        }

        let didChangeControllers = this.__panelController && val != this.__panelController
        
        // remove from existing controller
        if( didChangeControllers )
            this.__panelController.remove(this, {updateRoute: false, silent: true})

        this.__panelController = val
    }

    async open(...args){

        if( this.view && this.view.willOpen ){
            if( await this.view.willOpen(this.route.state) === false ){
                if( this.route && this.panelController )
                    this.panelController._updateRoute()
                return false;
            }
        }

        // route requested custom controller
        if( this.route && this.route.state.props.controller )
            this.controller = this.route.state.props.controller

        // else attempt to use the controller in the opts again
        else if( this.opts.controller ){
            this.controller = this.opts.controller

            // if custom controller doesn't exists yet, delay for 300ms, then try again
            // this is because the controller is likely embeded in another view that 
            // is in the process of opening (like in another panel)
            if( !this.panelController )
                await new Promise(resolve=>setTimeout(_=>resolve(), 300))

            // now try to set controller again
            this.controller = this.opts.controller
        }

        if( this.route && this.route.state.props.width ){
            this.width = this.route.state.props.width
            
            if( this.animation != 'slide ')
                this._animationOrig = this.animation
            
            if( this.anchor != 'bottom' )
                this._anchorOrig = this.anchor

            this.animation = 'slide'
            this.anchor = 'bottom'

        }else{

            if( this._animationOrig ){
                this.animation = this._animationOrig
                delete this._animationOrig
            }

            if( this._anchorOrig ){
                this.anchor = this._anchorOrig
                delete this._anchorOrig
            }
        }

        // if no controller set (or doesn't exist) or it's currently NOT visible
        // , use the root controller
        if( !this.panelController || !this.panelController.isVisible )
            this.panelController = Controller.for('root')

        this._onKeydown = this._onKeydown || this.onKeydown.bind(this)
        window.removeEventListener('keydown', this._onKeydown, true)
        window.addEventListener('keydown', this._onKeydown, true)

        this.removeEventListener('close-panel', this._closeFromEvent)
        this.addEventListener('close-panel', this._closeFromEvent)

        this.panelController.add(this)

        if( this.view && this.view.onRouteChange ){
            if( args[0] && args[0].newState)
                this.view.onRouteChange(args[0].oldState, args[0].newState, args[0].dir)
            else
                this.view.onRouteChange(undefined, this.route.state)
        }

        setTimeout(()=>{
            this.setAttribute('open', '')

            if( this.view && this.view.onOpen ){
                if( this.route )
                    args.unshift(this.route.state) // DEPRECATED, view should implement `onRouteChange`
                this.view.onOpen(...args)
            }

        },100)

        return this
    }

    set title(str){
        this.__title = str
        this.route&&this.route.update({title: str})
        if(this.toolbar) this.toolbar.title = str
        this.emitEvent('panel-title-updated', {panel: this}, {composed: false})
    }
    get title(){ return this.__title }

    get params(){
        return this.route ? this.route.state.params : {}
    }
    
    _closeFromEvent(e){
        e.stopPropagation()
        e.preventDefault()
        this.close()
    }

    async close(e){

        if( !this.isOpen ) return

        if( this.opts.onClose && await this.opts.onClose(e) === false )
            return
        
        if( this.view && this.view.onClose && await this.view.onClose(e) === false )
            return

        this.route&&this.route.update({didExit: true})
        this._close()

        // put the view back to it's original DOM location (if it had one)
        if( this.__viewOriginalPlacement ){
            this.__viewOriginalPlacement.replaceWith(this.view)
            delete this.__viewOriginalPlacement
        }

        return this
    }

    _close(immediate=false){
        window.removeEventListener('keydown', this._onKeydown, true)
        this.removeAttribute('open')
        this.panelController.remove(this, {updateRoute: !!this.route})

        this.removeEventListener('close-panel', this._closeFromEvent)
        
        if( immediate ){
            this.remove()
            this.view?.onClosed?.()
        }else
        setTimeout(()=>{
            this.remove()
            this.view?.onClosed?.()
        }, Panel.animationTime)
    }

    static get styles(){return css`
        :host {
            contain: layout;
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
            --radius: var(--b-panel-radius, 8px);
            --radius-top: var(--radius);
            --radius-bottom: 0;
            --panel-animation-shift: 45px;
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
            display: grid;
            grid-template-rows: 1fr;
            max-height: 100%;
            background: var(--b-panel-bgd, #fff);
            box-shadow: var(--b-panel-shadow, var(--theme-shadow-2));
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

        /* why was this disabled? */
        /* :host([type="actionsheet"][anchor="top"]) > main {
            padding-top: env(safe-area-inset-top);
        } */

        :host([type="actionsheet"][anchor="bottom"]) > main {
            padding-bottom: env(safe-area-inset-bottom);
            /* border-radius: var(--radius) var(--radius) 0 0; */
        }

        :host([open]) {
            opacity: 1;
        }

        :host([open]) > main {
            opacity: 1;
        }

        :host([open]) > main:not(.animate) {
            transform: none !important;
        }

        :host([anchor="right"]) > main {
            transform: translateX(var(--panel-animation-shift));
            height: 100%;
            border-radius: var(--radius) 0 0 var(--radius);
        }

        :host([anchor="left"]) > main {
            right: auto;
            left: 0;
            transform: translateX(calc(-1 * var(--panel-animation-shift)));
            height: 100%;
            border-radius: 0 var(--radius) var(--radius) 0;
        }

        :host([anchor="center"]) > main,
        :host([anchor="center-left"]) > main,
        :host([anchor="top"]) > main,
        :host([anchor="bottom"]) > main {
            position: relative;
            margin: auto;
            transform: translateY(var(--panel-animation-shift));
        }

        :host([anchor="center-left"]) > main {
            transform: translate(-50%, 45px);
            margin: auto 0;
            margin-left: 30%;
        }

        :host([anchor="center-left"][open]) > main {
            transform: translate(-50%, 0) !important;
        }

        :host([anchor="center"][animation="drop"]) > main,
        :host([anchor="top"][animation="drop"]) > main,
        :host([anchor="bottom"][animation="drop"]) > main {
            position: relative;
            margin: auto;
            transform: translateY(calc(-1 * var(--panel-animation-shift)));
        }

        :host([animation="rise"]) > main {
            position: relative;
            margin: auto;
            transform: translateY(var(--panel-animation-shift));
        }

        :host([anchor^="center"]) > main {
            border-radius: var(--radius);
        }

        :host([anchor^="center"][animation="scale"]) > main {
            transform: scale(.5);
        }

        :host([anchor="center-left"][animation="scale"]) > main {
            transform: translate(-50%, 0) scale(.5);
        }

        :host([anchor^="center"][animation="fade"]) > main {
            transform: none;
        }

        :host([anchor="top"]) > main {
            margin-top: 0 !important;
            transform: translateY(calc(-1 * var(--panel-animation-shift)));
            border-radius: 0 0 var(--radius) var(--radius);
        }

        :host([name="root"][anchor="top"]) > main {
            padding-top: var(--gutter-safe-top);
        }

        :host([anchor="bottom"]) > main {
            margin-bottom: 0;
        }

        :host([anchor="bottom"]) {
            --b-panel-toolbar-close-btn-rotation: 90deg;
        }

        :host([anchor="top"]) {
            --b-panel-toolbar-close-btn-rotation: -90deg;
        }

        :host([anchor="left"]) {
            --b-panel-toolbar-close-btn-rotation: 180deg;
        }

        :host([anchor="right"]) {
            --b-panel-toolbar-close-btn-rotation: 0deg;
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
            flex-shrink: 0;
            transform: translate(50%, -50%);
            pointer-events: all;
        }

        main > slot::slotted(*) {
            width: 100%;
            pointer-events: all;
            overflow: hidden;
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

        :host([inset][height="100%"][anchor="right"]) main {
            height: calc(100% - (calc(2 * var(--inset-margin, .5em)))) !important;
            width: calc(100% - var(--inset-margin, .5em)) !important;
            right: var(--inset-margin, .5em);
            top: var(--inset-margin, .5em);
            border-radius: var(--b-panel-inset-radius, 12px);
            --radius: var(--b-panel-inset-radius, 12px);
        }

        .inlinehtml {
            display: contents;
        }

        .inlinehtml > * {
            pointer-events: all;
        }

        .inlinehtml > *:first-child {
            border-top-left-radius: var(--radius);
            border-top-right-radius: var(--radius);
        }

        .inlinehtml > *:last-child {
            border-bottom-left-radius: var(--radius);
            border-bottom-right-radius: var(--radius);
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
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                transform: translate3d(0, 0, 0);
            }

            40%,
            43% {
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                transform: translate3d(0, -30px, 0);
            }

            70% {
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                transform: translate3d(0, -15px, 0);
            }

            90% {
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

        /* https://animista.net/play/attention/pulsate/pulsate-bck */
        @keyframes pulsate-bck {
        0% {
            -webkit-transform: scale(1);
                    transform: scale(1);
        }
        50% {
            -webkit-transform: scale(0.95);
                    transform: scale(0.95);
        }
        100% {
            -webkit-transform: scale(1);
                    transform: scale(1);
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

        .pulseback {
            animation: pulsate-bck 200ms ease-in-out both;
        }
    `}
}

customElements.define('b-panel', Panel)

export default customElements.get('b-panel')