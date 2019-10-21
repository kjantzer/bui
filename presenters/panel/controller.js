import {LitElement, html, css} from 'lit-element'
import Menu from '../menu'
import router from '../../router'

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

    _updatePanels(updateRoutes=false){
        let i = 0

        // if( this.length == 0 && updateRoutes )
        //     router.push('')
        // else
        this.panels.forEach((panel)=>{
            
            if( panel.type != 'modal')
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

        if( this.parentElement ){
            if( this.length == 0 ){
                this.parentElement.classList.remove('b-panel-open')
                this.parentElement.style.overflow = ''
            }else{
                this.parentElement.classList.add('b-panel-open')
                this.parentElement.style.overflow = 'hidden'
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
                description: panel.hash,
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