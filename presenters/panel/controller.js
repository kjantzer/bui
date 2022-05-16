import {LitElement, html, css} from 'lit'
import Menu from '../menu'
import router from '../../router'
import device from '../../util/device'
import overscroll from '../../util/overscroll'

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
    `}

    get isVisible(){
        let style = window.getComputedStyle(this)
        return style.display != 'none' && !this.hidden
    }

    get name(){
        return this.hasAttribute('name') ? this.getAttribute('name') : undefined
    }

    constructor(){
        super()
        this.panels = new Map()
    }

    connectedCallback(){
        super.connectedCallback()
        
        if( this.name ){
            if( PanelControllers[this.name] )
                console.warn('A panel-controller already exists with the name: ', this.name)
            else
                PanelControllers[this.name] = this
        }

        // TODO: support this in Android? make feature opt in?
        if( this.name == 'root' && device.isiOS ){

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
        <slot></slot>
    `}

    remove(panel, {updateRoute=false}={}){
        
        this.panels.delete(panel)
        this._updatePanels()

        if( updateRoute )
            this._updateRoute()

        if( this.length == 0 )
            this.dispatchEvent(new CustomEvent('panels-closed', {
                bubbles: true,
                composed: true,
                detail: {controller: this}
            }))
    }

    add(panel){

        // let SheetView and Panel work together
        document.body.setAttribute('ontop', 'panel')

        this.panels.delete(panel)
        this.panels.set(panel, panel)

        if( !this.contains(panel) )
            this.append(panel)

        this._updatePanels()
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
            if( panel.route )
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

    _updatePanels(updateRoutes=false){
        let i = 0

        // if( this.length == 0 && updateRoutes )
        //     router.push('')
        // else
        this.panels.forEach((panel)=>{
            
            if( panel.type != 'modal' && panel.type != 'actionsheet' )
                panel.style.zIndex = 100 + i++
            
            let wasOnTop = panel.onTop

            if( i == this.length ){
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

        if( this.length == 0 ){
            
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
                    router.push(panel.route.makePath(panel.route.params))
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

        // let selected = await new Menu(menu).popover(el, {align: 'bottom-start'})
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