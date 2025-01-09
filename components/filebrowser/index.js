/*
    TODO: support keyboard shortcuts for moving up and down list and enter to select/nav
    this ^ feature maybe should be part of b-list?
*/
import { LitElement, html, css } from 'lit'
import RoutedView from '../../app/views/routed'
import '../../app/views/root-titlebar'
import '../../presenters/list'
import Coll from './models'
import './row'
import './breadcrumbs'

customElements.define('b-filebrowser', class extends RoutedView{

    static get title(){ return 'File Browser' }
	static get icon(){ return 'hdd' }
    static get id(){ return 'file-browser' }
    static get path(){ return 'file-browser(/*)' }
    
    get root(){ return '/api/v6/ftp' }
    get key(){ return 'file-browser' }
    get row(){ return 'b-filebrowser-file' }
    get filters(){ return {} }

    openFile(model){}
    itemClick(e){let {model} = e.detail}

    static get listeners(){return {
        coll: {'change:path': 'onPathChange'}
    }}

    constructor(){
        super()
        this.coll = new Coll({root: this.root })
    }

    static get styles(){return [super.styles, css`

        :host {
            grid-template-rows: 1fr !important;
        }

        b-list-header {
            order: 2;
        }

        b-filebrowser-breadcrumbs {
            margin: -1em -.5em;
        }
        
    `]}

    load(id, attrs, state){        
        this.coll.path = state.params._ || []
        if( this.list ) this.list.refresh()
        this.route.update({
            title: this.constructor.title+': '+this.coll.pathString
        })
    }

    render(){return html`

        <b-list
            key="${this.key}"
            row="${this.row}"
            .listOptions=${{_fetchOnLoad: false}}
            .sorts=${sorts}
            .filters=${this.filters}
            .coll=${this.coll}
            @navto=${this.navTo}
            @clickitem=${this.itemClick}
        >
            <b-root-titlebar title="${this.constructor.title}"></b-root-titlebar>
            <b-list-header>
                <b-filebrowser-breadcrumbs slot="name" .host=${this} .coll=${this.coll}></b-filebrowser-breadcrumbs>
            </b-list-header>

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
    name(m){ return String(m.get('name')).toLowerCase() },
    size(m){ return m.get('size') },
    date: {desc: true, sortBy(m){ return m.get('date') }}
}


export default customElements.get('b-filebrowser')