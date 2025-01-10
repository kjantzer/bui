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
import './row-group-by'
import './breadcrumbs'

const GROUP_BY = [
    {label: 'Type', val: 'typeSort'},
    {label: 'Date', val: 'dateSort'}
]

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
            margin: -1em -.65em;
        }

        [icon="layers"] { order: -1; }
        
        b-list-group-by { order: -2; }

        b-list-group-by::part(options) {
            display: flex;
        }

        b-list-group-by::part(title) { display: none; }
        b-list-group-by::part(info) { display: none; }
        
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
            groupByRow="b-filebrowser-group-by-row"
            .listOptions=${{selection: true}}
            .sorts=${sorts}
            .filters=${this.filters}
            .coll=${this.coll}
            @navto=${this.navTo}
            @clickitem=${this.itemClick}
            @content-changed=${this.listContentChanged}
        >
            <b-root-titlebar title="${this.constructor.title}"></b-root-titlebar>
            <b-list-header>
                <b-filebrowser-breadcrumbs slot="name" .host=${this} .coll=${this.coll}></b-filebrowser-breadcrumbs>
            </b-list-header>

            <b-toggle-btn icon="layers" lg clear tooltip="Data Grouping" slot="toolbar:after" key=${this.tagName+'-group-by'}></b-toggle-btn>

            <b-list-group-by .values=${GROUP_BY} .defaultValues=${['dateSort']} slot="toolbar:after">
                <b-toggle-view type="show" key=${this.tagName+'-group-by'}></b-toggle-view>
            </b-list-group-by>

        </b-list>
    `}

    listContentChanged(){
        this.style.setProperty('--level-1-sticky', this.coll.dataLevels > 1 ? 'sticky': 'static')
        this.style.setProperty('--level-2-sticky', this.coll.dataLevels > 2 ? 'sticky': 'static')
        this.style.setProperty('--level-3-sticky', this.coll.dataLevels > 3 ? 'sticky': 'static')
    }

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