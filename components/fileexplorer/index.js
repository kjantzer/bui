import { LitElement, html, css } from 'lit-element'
import RoutedView from '../../app/views/routed'
import Coll from './models'
import '../../presenters/list'
import './row'
import './breadcrumbs'

import Panel from 'panel'

customElements.define('b-fileexplorer', class extends RoutedView{

    static get title(){ return 'File Explorer' }
	static get icon(){ return 'hdd' }
    static get id(){ return 'file-explorer' }
    static get path(){ return 'file-explorer(/*)' }

    static get listeners(){return {
        coll: {'change:path': 'onPathChange'}
    }}

    constructor(){
        super()
        this.coll = new Coll()
    }

    static get styles(){return [super.styles, css`
        /* :host {
            display: grid;
            overflow: hidden;
            height: 100%;
        } */
        
    `]}

    // onPathChange(){
    //     this.list.refresh()
    // }

    load(id, attrs, state){        
        this.coll.path = state.params._ || []
        this.list.refresh()
        this.route.update({
            title: 'File Explorer: '+this.coll.pathString
        })
    }

    render(){return html`
        <b-panel-toolbar>
            
            ${this.panel?html`
            <b-fileexplorer-breadcrumbs slot="middle" .host=${this} .coll=${this.coll}></b-fileexplorer-breadcrumbs>
            `:''}

        </b-panel-toolbar>
        <b-list
            key="file-explorer"
            row="b-fileexplorer-file"
            .listOptions=${{fetchOnLoad: false}}
            .sorts=${sorts}
            .coll=${this.coll}
            @navto=${this.navTo}
        >

            ${this.panel?'':html`
            <b-fileexplorer-breadcrumbs slot="toolbar:before" .host=${this} .coll=${this.coll}></b-fileexplorer-breadcrumbs>
            `}

            <b-list-header></b-list-header>
        </b-list>
    `}

    navTo(e){
        let model = e.detail

        if( model.get('type') == 'd' ){
            this.coll.push(model.get('name'))
            goTo(this.route.makePath({_:this.coll.pathString}))
        }
    }

})


const sorts = {
    defaults: ['type', 'name'] ,
    type(m){ return m.get('type') == 'd' ? 0 : 1 },
    name(m){ return m.get('name') }
}


Panel.register('b-fileexplorer', {
    // closeBtn: 'arrow',
    width: '600px',
})