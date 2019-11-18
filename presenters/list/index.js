import { LitElement, html, css } from 'lit-element'
import DataSource from './data/source'
import Filters from './data/filters'
import Sorts from './data/sorts'
import './toolbar'
import './infinite-list'
import '../../elements/spinner-overlay'


customElements.define('b-list', class extends LitElement {

    constructor(){
        super()

        this.onKeydown = this.onKeydown.bind(this)
        this.onKeyup = this.onKeyup.bind(this)
        this.divider = this.divider.bind(this)
    }

    get coll(){ return this.__coll }
    set coll(coll){
        let didChange = !!this.__coll && this.__coll != coll
        this.__coll = coll
        this.dataSource.coll = coll

        if( didChange )
            this.refresh() // I think this is ok to do here
    }

    set key(key){ this.__key = key }
    get key(){
        return this.__key || this.getAttribute('key')
    }

    get filters(){
        if( !this.__filters )
            this.filters = {}

        return this.__filters
    }
    set filters(filters){
        if( !this.__filters ){    
            this.__filters = new Filters()
            this.filters.key = this.key
            this.filters.list = this
            this.dataSource.filters = this.filters
            this.filters.on('change', this.onFilterChange.bind(this))
        }

        this.filters.use(filters)
    }

    get sorts(){ return this.__sorts }
    set sorts(sorts){
        if( !this.__sorts ){
            this.__sorts = new Sorts()
            this.sorts.key = this.key
            this.sorts.list = this
            this.dataSource.sorts = this.sorts
            this.sorts.on('change', this.onSortChange.bind(this))
        }
        
        this.sorts.use(sorts)
    }

    get dataSource(){
        if( !this.__dataSource ){
            this.__dataSource = new DataSource(this.listOptions)
            this.__dataSource.on('change:count', count=>{
                this.toolbar.count = count
            })
        }
        return this.__dataSource
    }

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-rows: auto auto 1fr;
            overflow: hidden;
            flex: 1;
            position: relative;
            --searchBgd: #f5f5f5;
            --toolbarShadow: rgba(0,0,0,.2) 0 0 6px;
        }

        slot[name="header"] {
            display: block;
        }

        b-spinner-overlay {
            --spinnerBgd: rgba(255,255,255,.5);
            --spinnerSize: 6em;
        }

        b-list-toolbar {
            box-shadow: var(--toolbarShadow);
            padding: .25em .5em;
            z-index: 10;
        }

        b-list-toolbar b-btn {
            color: var(--toolbarTextColor);
        }

        b-infinite-list {
            display: block;
            flex: 1;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
        }

        b-infinite-list > [selected] {
            position: relative;
        }

        b-infinite-list > [selected]:before {
            position: absolute;
            content: '';
            border: solid 1.4em #E3F2FD;
            border-left-width: 2em;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
        }

        contract-draft-row { /* FIXME: remove? */
            padding: 2em;
        }

        contract-draft-row:not(:last-child) {
            border-bottom: solid 1px rgba(0,0,0,.1);
        }

        /* .queuing-overlay {
            display: none;
            background: rgba(255,255,255,.8);
            color: #888;
            z-index: 1000;
        }

        :host([queuing]) .queuing-overlay {
            display: flex;
        } */
    `}

    get spinner(){
        return this.__spinner = this.__spinner 
                            || this.querySelector('[slot="spinner"]')
                            || this.shadowRoot.querySelector('b-spinner-overlay')
    }

    render(){return html`

        <style>${this.customStyles||''}</style>
        
        <slot name="spinner">
            <b-spinner-overlay></b-spinner-overlay>
        </slot>
        
        <b-list-toolbar .filters=${this.filters} .sorts=${this.sorts} 
            @filter-term-changed=${this.onFilterTermChange}>
            <slot name="toolbar:before" slot="before"></slot>
            <slot name="toolbar:after" slot="after"></slot>
            <slot name="toolbar:refresh" slot="refresh-btn">
                <b-btn text pill icon="arrows-ccw" @click=${this.refresh}></b-btn>
            </slot>
            <!-- <b-label slot="after" class="queuing-label">Queuing filters, release to apply</b-label> -->
        </b-list-toolbar>
        <slot name="header"></slot>
        <b-infinite-list
            row="${this.rowElement}"
            empty="${this.emptyElement}"
            .divider=${this.divider}
            .dataSource=${this.dataSource}
        ></b-infinite-list>
    `}

    connectedCallback(){
        super.connectedCallback()

        window.addEventListener('keydown', this.onKeydown, true)
        window.addEventListener('keyup', this.onKeyup, true)

        let host = this.getRootNode().host

		if( host ){
            this.host = host
            host.list = host.list || this
        }
    }

    disconnectedCallback(){
        super.disconnectedCallback()

        window.removeEventListener('keydown', this.onKeydown, true)
        window.removeEventListener('keyup', this.onKeyup, true)

        if( this.host && this.host.list == this )
            delete this.host
    }

    onKeydown(e){
        if( e.target !== document.body ) return
        if( !e.metaKey && !e.ctrlKey ) return
        this.queuing = true
    }

    onKeyup(e){
        if( this.queuing && !this.filters.queuedChanges )
            this.queuing =  false
    }

    get queuing(){ return this.filters && this.filters.queuing }
    set queuing(doQueue){
        if( !this.filters ) return

        this.filters.queuing = doQueue

        doQueue ? this.setAttribute('queuing', '') : this.removeAttribute('queuing')
    }

    get rowElement(){ return this.getAttribute('row') || ''}
    get emptyElement(){ return this.getAttribute('empty') || ''}

    get toolbar(){
        return this.shadowRoot.querySelector('b-list-toolbar')
    }

    get list(){
        return this.shadowRoot.querySelector('b-infinite-list')
    }

    divider(prevModel, model){

        let divider = this.getAttribute('divider')
        
        divider = divider && customElements.get(divider)

        if( divider && divider.shouldDisplay && divider.shouldDisplay(prevModel, model, this) ){
            divider = new divider(prevModel, model, this)
            divider.list = this
            divider.model = model
            divider.prevModel = prevModel
            return divider
        }

        return null
    }

    async firstUpdated(){
        this.spinner.show = true
        this.toolbar.count = await this.dataSource.length()
        this.spinner.show = false
    }

    async refresh(){
        this.spinner.show = true
        this.dataSource.reset()
        this.list.reset()
        this.toolbar.count = await this.dataSource.length()
        this.spinner.show = false
    }

    async reload(){
        this.dataSource.refilter()
        this.list.reset()
        this.toolbar.count = await this.dataSource.length()
    }

    async onFilterTermChange(changes){

        // TODO: probably need an opt in feature
        if( this.listOptions && this.listOptions.fetch == 'more' ){
            this.dataSource.reset()
        }

        this.dataSource.applyFilters()
        this.list.reset()
        this.toolbar.count = await this.dataSource.length()
    }

    async onFilterChange(changes){
        
        if( this.filters.needsDatabaseFetch(changes) ){
            this.spinner.show = true
            this.dataSource.reset()
        }

        this.dataSource.applyFilters()
        this.list.reset()
        this.toolbar.count = await this.dataSource.length()
        this.spinner.show = false
    }

    async onSortChange(){

        if( this.sorts.sortOnDB === true ){
            this.spinner.show = true
            this.dataSource.reset()
        }else{
            this.dataSource.sort()
        }
        
        this.list.reset()
        this.toolbar.count = await this.dataSource.length()
        this.spinner.show = false
    }

})

export default customElements.get('b-list')