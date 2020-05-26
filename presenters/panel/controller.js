import {LitElement, html, css} from 'lit-element'
import Menu from '../menu'
import router from '../../router'
import device from '../../util/device'

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

        // TODO: support his in Android? make feature opt in?
        if( this.name == 'root' && device.isiOS ){
            let overflowScrollAt = 0
            let topPanel = null

            window.addEventListener('touchend', e=>{
                if( overflowScrollAt < -40 ){
                    topPanel&&topPanel.close()
                    setTimeout(()=>{
                        if( topPanel ) topPanel.style.top = 0
                        topPanel = null
                    },300)
                }else{
                    topPanel = null
                }
            })

            window.addEventListener('scroll', e=>{

                if( this.panels.size > 0 && !topPanel )
                    topPanel = this.panelOnTop
                
                if( !topPanel || topPanel.opts.disableOverscrollClose === true ) return

                overflowScrollAt = document.scrollingElement.scrollTop
                
                if( overflowScrollAt < 0 && topPanel ){
                    topPanel.style.top = (Math.abs(overflowScrollAt) * 1) + 'px'
                }
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

    remove(panel){
        this.panels.delete(panel)
        this._updatePanels()
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

    _updatePanels(updateRoutes=false){
        let i = 0

        // if( this.length == 0 && updateRoutes )
        //     router.push('')
        // else
        this.panels.forEach((panel)=>{
            
            if( panel.type != 'modal' && panel.type != 'actionsheet' )
                panel.style.zIndex = i++
            
            if( i == this.length ){
                panel.setAttribute('ontop', '')

                // if( updateRoutes && panel.route && !panel.route.isCurrent ){
                //     console.log(panel.route);
                //     // router.push(panel.route.path)
                // }

            }else{
                panel.removeAttribute('ontop')
            }
        })

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
            
            // TEMP - improve interoperability with Groundwork
            if( window.app && app.sv('sheets').sheets.length > 0 )
                app.sv('sheets').setHash()
            else
                router.push('')

            this.dispatchEvent(new CustomEvent('panels-closed', {
                bubbles: true,
                composed: true,
                detail: {controller: this}
            }))
        
        }else
        this.panels.forEach((panel)=>{

            if( panel.onTop && panel.route && !panel.route.isCurrent ){
                // console.log(panel.route, panel.route.state.path);
                router.push(panel.route)
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

    async quickJump(el){
        
        let menu = this.map(panel=>{
            return {
                label: panel.title,
                icon: panel.icon||'window',
                description: panel.path,
                panel: panel
            }
        })

        menu.shift() // remove first menu as its the open view

        let ts = new Date().getTime()

        // quick jump is already open
        if( el.popover ){

            // if quick jump triggered within a second, auto switch to the last opened view
            if( el.quickJumpOpened && ts - el.quickJumpOpened <= 1000 && menu.length > 0){
                el.popover.close()
                menu[0].panel.open()
            }
            
            return
        }

        el.quickJumpOpened = ts

        if( menu.length == 0 )
            menu.push({text: 'No other views open'})

        menu.unshift({divider: 'Quick Jump Menu'}, 'divider')

        let selected = await new Menu(menu).popover(el, {align: 'bottom-start'})

        if( selected )
            selected.panel.open()
    }
}

customElements.define('b-panels', PanelController)

export default customElements.get('b-panels')