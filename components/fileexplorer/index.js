/*
    TODO: support keyboard shortcuts for moving up and down list and enter to select/nav
    this ^ feature maybe should be part of b-list?
*/
import { LitElement, html, css } from 'lit-element'
import RoutedView from '../../app/views/routed'
import '../../app/views/root-titlebar'
import '../../presenters/list'
import Coll from './models'
import './row'
import './breadcrumbs'

import Panel from 'panel'

customElements.define('b-fileexplorer', class extends RoutedView{

    static get title(){ return 'File Explorer' }
	static get icon(){ return 'hdd' }
    static get id(){ return 'file-explorer' }
    static get path(){ return 'file-explorer(/*)' }
    
    get root(){ return '/api/ftp' }
    get key(){ return 'file-explorer' }
    get row(){ return 'b-fileexplorer-file' }

    openFile(model){}

    static get listeners(){return {
        coll: {'change:path': 'onPathChange'}
    }}

    constructor(){
        super()
        this.coll = new Coll({root: this.root })
    }

    static get styles(){return [super.styles, css`

        :host {
            grid-template-rows: 1fr;
        }

        b-list-header {
            padding-left: .5rem;
            padding-right: .5rem;
            order: 2;
        }

        b-fileexplorer-breadcrumbs {
            padding: .5rem;
            padding-bottom: 0;
            order: 1;
        }
        
    `]}

    load(id, attrs, state){        
        this.coll.path = state.params._ || []
        this.list.refresh()
        this.route.update({
            title: this.constructor.title+': '+this.coll.pathString
        })
    }

    render(){return html`

        <b-list
            key="${this.key}"
            row="${this.row}"
            .listOptions=${{fetchOnLoad: false}}
            .sorts=${sorts}
            .coll=${this.coll}
            @navto=${this.navTo}
        >
            <b-root-titlebar title="${this.constructor.title}"></b-root-titlebar>
            <b-list-header></b-list-header>
            <b-fileexplorer-breadcrumbs slot="header" .host=${this} .coll=${this.coll}></b-fileexplorer-breadcrumbs>

        </b-list>
    `}

    navTo(e){
        let {model} = e.detail

        if( model.get('type') == 'd' ){
            this.openDir(model)
        }else{
            this.openFile(model)
        }
    }

    openDir(model){
        this.coll.push(model.get('name'))
        goTo(this.route.makePath({_:this.coll.pathString}))
    }

})


const sorts = {
    defaults: ['type', 'name'] ,
    type(m){ return m.get('type') == 'd' ? 0 : 1 },
    name(m){ return m.get('name') },
    size(m){ return m.get('size') },
    date: {desc: true, sortBy(m){ return m.get('date') }}
}


Panel.register('b-fileexplorer', {
    width: '800px',
    height: '96vh',
    anchor: 'center',
    shortcut: true // TEMP
})