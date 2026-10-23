import {LitElement, html, css} from 'lit'
import Menu from '../menu'
import router from '../../app/router'
import device from '../../util/device'
import overscroll from '../../util/overscroll'
import CollMap from '../../util/collmap'

const PanelControllers = {}

class PanelController extends LitElement {

    static for(name){

        // create a root panel controller if there isn't one
        if( name == 'root' && !PanelControllers[name] ){
            let rootPanelController = document.createElement('b-panels')
            rootPanelController.setAttribute('name', 'root')
            document.body.appendChild(rootPanelController)
            PanelControllers[name] = rootPanelController
        }

        return PanelControllers[name]
    }

    static get styles(){return css`
        :host {
            position: relative;
            /* z-index: 10; */
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
        }

        :host, .core, main, .base, .panels {
            display: grid;
        }
        
        .top {
            position: relative;
        }

        /*.base, .top, .bottom, .left, .right {*/
        slot::slotted(*) {
            pointer-events: auto;
        }

        :host {
            grid-template-rows: auto 1fr auto;
        }

        .core {
            grid-template-columns: auto 1fr auto;
        }

        slot {
            display: block;
        }

        main {
            position: relative;
            grid-template-rows: auto minmax(0, 1fr);
        }

        /* content area of main (below the optional "main-top" slot, ex: b-app-topbar); panels open here */
        .stage {
            position: relative;
            display: grid;
            min-height: 0;
        }

        /* main view brought to the top (see showBase): the panels open then stay open, hidden underneath */
        .panels::slotted([under-base]) {
            content-visibility: hidden; /* skips rendering but keeps state (scroll positions, etc) */
            pointer-events: none;
        }

        /* phones: panels are full screen, so they cover "main-top"; the base view starts below it */
        @media (max-width: 699px) {
            main {
                grid-template-rows: minmax(0, 1fr);
            }

            .main-top, .stage {
                grid-row: 1;
                grid-column: 1;
            }

            /* installed app with the titlebar hidden (ex: narrow desktop window): panels start below the window controls */
            .stage {
                margin-top: env(titlebar-area-height, 0px);
            }

            .main-top {
                align-self: start;
            }

            :host([has-main-top]) .base {
                top: var(--b-panels-main-top-height, 0px);
            }
        }

        .base {
            position: absolute;
            inset: 0;
            isolation: isolate; /* keep the base view's z-indexes (ex: sticky headers) below panels */
        }

        :host([inset]) {
            position: relative;
            height: 100%;
            display: none;
            transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
            width: 0;
        }

        @media (min-width: 1000px) {
            :host([inset]) {
                display: grid;
            }
        }

        :host([inset][num]) {
            width: var(--inset-width, 400px);
        }

        :host([inset][num]) {
            max-width: 90vw;
        }
        
        :host([inset]) ::slotted(b-panel) {
            background: none !important;
            width: var(--inset-width, 400px) !important;
            --panel-animation-shift: 0;
        }

    `}

    get isVisible(){
        let style = window.getComputedStyle(this)
        return style.display != 'none' && !this.hidden && (this.clientHeight || this.clientWidth)
    }

    get name(){
        return this.hasAttribute('name') ? this.getAttribute('name') : undefined
    }

    constructor(){
        super()
        this.panels = new CollMap()
        this.addEventListener('panel-title-updated', (e)=>{
            this.emitEvent('change', {action: 'title-updated', panel: e.detail.panel}, {bubbles: false})
        })
    }

    connectedCallback(){
        super.connectedCallback()

        if( this.getAttribute('inset') )
            this.style.setProperty('--inset-width', this.getAttribute('inset') )
        
        if( this.name ){
            if( PanelControllers[this.name] )
                console.warn('A panel-controller already exists with the name: ', this.name)
            else
                PanelControllers[this.name] = this
        }

        // TODO: support this in Android?
        if( this.name == 'root' && device.isiOS && this.hasAttribute('overscroll') ){

            const overscrollEl = overscroll.watch()
            let topPanel = null

            overscrollEl.addEventListener('overscroll', e=>{

                if( !e.detail ) return
                
                if( this.panels.size > 0 && !topPanel )
                    topPanel = this.panelOnTop

                if( !topPanel || topPanel.opts.disableOverscrollClose === true ) return

                let {top, bottom} = e.detail

                if( top ){
                    topPanel.style.top = Math.abs(top)+'px'
                }else if( bottom && topPanel.fullscreen ){
                    topPanel.style.top = bottom+'px'
                }
                
            })

            overscrollEl.addEventListener('overscrolled', e=>{

                if( !topPanel || topPanel.opts.disableOverscrollClose === true ) return 

                let {top, bottom} = e.detail

                if( bottom && topPanel.fullscreen )
                    topPanel.fullscreen({toggle: false})
                else if( top && topPanel.fullscreen)
                    topPanel.fullscreen({close:true})
                else if( top )
                    topPanel.close()

                setTimeout(()=>{
                    if( topPanel ) topPanel.style.top = 0
                    topPanel = null
                },300)
            })
        }
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        
        if( this.hasAttribute('name') && PanelControllers[this.name] == this )
            delete PanelControllers[this.name]
    }
            
    render(){return html`
        <slot class="top" name="top"></slot>
        <div class="core">
            <slot class="left" name="left"></slot>
            <main>
                <slot class="main-top" name="main-top" @slotchange=${this.mainTopChanged}></slot>
                <div class="stage">
                    <slot class="base" part="base" name="base" @active-changed=${this.baseActiveChanged}></slot>
                    <slot class="panels" part="panels"></slot>
                </div>
            </main>
            <slot class="right" name="right"></slot>
        </div>
        <slot class="bottom" name="bottom"></slot>
    `}

    mainTopChanged(e){
        this.toggleAttribute('has-main-top', e.currentTarget.assignedElements().length > 0)
    }

    baseActiveChanged(e){
        console.log('changed?', e);
    }

    remove(panel, {silent=false, updateRoute=false}={}){

        if( panel.onTop ){
            panel.removeAttribute('ontop')

            if( !silent && panel.view && panel.view.didBecomeInactive )
                setTimeout(()=>{panel.view.didBecomeInactive()})
        }
        
        this.panels.delete(panel)
        delete panel.index
        panel.removeAttribute('under-base')
        this._updatePanels()

        if( updateRoute )
            this._updateRoute()

        this.emitEvent('change', {action: 'remove', panel}, {bubbles: false})

        if( this.length == 0 )
            this.dispatchEvent(new CustomEvent('panels-closed', {
                bubbles: true,
                composed: true,
                detail: {controller: this}
            }))
    }

    add(panel){

        // re-opening a panel hidden by showBase brings them back; other panels (ex: search) open over the base
        if( panel.hasAttribute('under-base') )
            this.restoreHidden()

        // let SheetView and Panel work together
        // TODO: remove long term - done for Blackstone Catalog v5
        document.body.setAttribute('ontop', 'panel')

        // keep track of order in which opened
        // cause this.panels is in order of layering
        if( panel.index === undefined )
            panel.index = this.panels.size > 0 ? this.panels.last.index + 1 : 0

        this.panels.delete(panel)
        this.panels.set(panel, panel)

        panel.toggleAttribute('inset', this.hasAttribute('inset'))

        if( !this.contains(panel) )
            this.append(panel)

        this._updatePanels()

        this.emitEvent('change', {action: 'add', panel}, {bubbles: false})
    }

    // panels not hidden by showBase
    get visiblePanels(){ return this.map(panel=>panel).filter(panel=>!panel.hasAttribute('under-base')) }

    get baseOnTop(){ return this.visiblePanels.length == 0 }

    // show the main ("base") view above the open panels without closing them;
    // they come back when one is opened again (ex: its route is visited); panels opened meanwhile show normally
    showBase(){
        if( this.baseOnTop ) return

        let panel = this.panelOnTop
        if( panel ){
            panel.removeAttribute('ontop')
            setTimeout(()=>panel.view?.didBecomeInactive?.())
        }

        this.panels.forEach(panel=>panel.setAttribute('under-base', ''))
        this.setAttribute('base-on-top', '')
        router.push('')
        this.emitEvent('change', {action: 'base-on-top'}, {bubbles: false})
    }

    restoreHidden(){
        this.panels.forEach(panel=>panel.removeAttribute('under-base'))
        this.removeAttribute('base-on-top')
    }

    get panelOnTop(){
        let onTop = null
        this.panels.forEach(panel=>{
            if( !onTop && panel.hasAttribute('ontop') )
                onTop = panel
        })
        return onTop
    }

    get panelOnTopWithRoute(){
        let onTop = null
        this.panels.forEach(panel=>{
            if( panel.route && !panel.hasAttribute('under-base') )
                onTop = panel
        })
        return onTop
    }

    topMostPanel(){
        let topPanels = []

        // go though all panel controllers looking for the top panel with a route
        for( let key in PanelControllers ){
            let controller = PanelControllers[key]
            let panel = controller.panelOnTopWithRoute

            // found a top panel with route
            if( panel )
                topPanels.push(panel)

            // stop looking at controllers created AFTER this one (since it's more likely to be nested)
            if( controller == this )
                break;
        }

        return topPanels.pop()
    }

    _updatePanels(){
        let i = 0

        // the top panel that isn't hidden by showBase
        let top = this.visiblePanels[0] // most recent first

        this.panels.forEach((panel)=>{
            
            if( panel.type != 'modal' && panel.type != 'actionsheet' )
                panel.style.zIndex = 100 + i++
            
            let wasOnTop = panel.onTop

            if( panel == top ){
                panel.setAttribute('ontop', '')

                if( !wasOnTop && panel.view )
                    panel.view.didBecomeActive&&panel.view.didBecomeActive()

                // if( updateRoutes && panel.route && !panel.route.isCurrent ){
                //     console.log(panel.route);
                //     // router.push(panel.route.path)
                // }

            }else{
                panel.removeAttribute('ontop')
                if( wasOnTop )
                    setTimeout(()=>{
                        if( panel.view && panel.view.didBecomeInactive )
                            panel.view.didBecomeInactive()
                    })
            }
        })

        if( this.length > 0 )
            this.setAttribute('num', this.length)
        else
            this.removeAttribute('num')

        // no hidden panels left
        if( !this.map(panel=>panel).some(panel=>panel.hasAttribute('under-base')) )
            this.removeAttribute('base-on-top')

        let hostEl = this.getRootNode()
        hostEl = hostEl.host || hostEl.body || hostEl

        if( hostEl ){
            if( this.length == 0 ){
                hostEl.classList.remove('b-panel-open')
                hostEl.style.overflow = ''
            }else{
                hostEl.classList.add('b-panel-open')
                hostEl.style.overflow = 'hidden'
            }
        }
    }

    _updateRoute(){
        let i = 0

        // no panels showing (all closed or hidden by showBase)
        if( this.baseOnTop ){
            
            // TEMP - legacy support for Blackstone Catalog v5
            if( window.app && window.app.sv && app.sv('sheets').sheets.length > 0 )
                app.sv('sheets').setHash()
            else{

                let topPanel = this.topMostPanel()
                let path = ''

                if( topPanel ){
                    if( topPanel.view.makePath )
                        path = topPanel.view.makePath()
                    else
                        path = topPanel.route.makePath() // FIXME: this should be able to use params (or view override)
                }

                router.push(path)
            }

        }else
        this.panels.forEach((panel)=>{

            if( panel.onTop && panel.route && (!panel.route.isCurrent || panel.route.state.props.didExit) ){
                // console.log(panel.route, panel.route.state.path);
                // if( panel.route.isCurrent || panel.route.state.props.didExit )
                    router.push(panel.route.makePath(panel.route.params), {
                        title: panel.title
                    })
                // else
                //     router.push(panel.route)
            }
        })
    }

    get length(){
        return this.panels.size
    }

    map(fn){
        let resp = []
        this.panels.forEach(p=>resp.push(fn(p)))
        return resp.reverse() // most recent first
    }

    // FIXME: not that great of an implementation
    async quickJump(el){

        if( this.name != 'root'  ) return 
        
        let menu = this.map(panel=>{
            return {
                label: panel.title,
                icon: panel.icon||'window',
                description: panel.path,
                panel: panel
            }
        })

        let ts = new Date().getTime()

        // quick jump is already open
        if( this.quickJumpOpened )
            return

        if( menu.length == 0 )
            return this.quickJumpOpened = null
            // menu.push({text: 'No other views open'})

        menu[0].selected = true // the open panel

        menu.unshift({divider: 'Open Views'}, 'divider')

        this.quickJumpOpened = ts

        // let selected = await new Menu(menu).popOver(el, {align: 'bottom-start'})
        let selected = await new Menu(menu, {autoSelectFirst: true}).modal({
            onClose:()=>{
                this.quickJumpOpened = null
            }
        })

        if( selected )
            selected.panel.open()
    }
}

customElements.define('b-panels', PanelController)

export default customElements.get('b-panels')