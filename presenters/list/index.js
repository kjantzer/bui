import { LitElement, html, css } from 'lit-element'
import DataSource from './data/source'
import Filters from './data/filters'
import Sorts from './data/sorts'
import Layouts from './data/layouts'
import './toolbar'
import './toolbar/selection-bar'
import './infinite-list'
import '../../elements/spinner-overlay'
import '../../helpers/lit-element/selectors'
import Selection from '../selection'

customElements.define('b-list', class extends LitElement {

    constructor(){
        super()

        this.onKeydown = this.onKeydown.bind(this)
        this.onKeyup = this.onKeyup.bind(this)
        this.createRow = this.createRow.bind(this)
        this.createEmptyElement = this.createEmptyElement.bind(this)
        this.createDivider = this.createDivider.bind(this)
    }

    get coll(){ return this.__coll }
    set coll(coll){
        let didChange = this.__collHasBeenSetOnce && this.__coll != coll
        this.__coll = coll
        this.dataSource.coll = coll
        this.__collHasBeenSetOnce = true

        // I think this is ok to do here
        if( didChange )
            this.shouldFetchData ? this.refresh() : this.reload() 
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

    get layout(){ return this.layouts&&this.layouts.active}
    set layout(val){ if(this.layouts) this.layouts.active = val}
    get layouts(){
        if( !this.__layouts && this.listOptions && this.listOptions.layouts){
            this.__layouts = new Layouts(this.listOptions.layouts)
            this.layouts.key = this.key
            this.layouts.list = this
            this.setAttribute('layout', this.layout)
            this.layouts.on('change', layout=>{
                this.setAttribute('layout', this.layout)
                this.update()
                this.reload()
            })
        }

        return this.__layouts
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
            grid-template-rows: auto auto 1fr auto;
            overflow: hidden;
            flex: 1;
            position: relative;
        }

        slot[name="header"],
        slot[name="footer"] {
            display: block;
            overflow-x: auto;
        }

        slot[name="header"]::-webkit-scrollbar,
        slot[name="footer"]::-webkit-scrollbar {
            display: none;
            width: 0 !important;
            height: 0 !important;
        }

        b-spinner-overlay {
            --spinnerSize: 6em;
        }

        b-list-toolbar {
            box-shadow: var(--list-toolbar-shadow, rgba(0,0,0,.2) 0 0 6px);
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

        b-infinite-list[selection-on] {
            user-select: none;
        }

        b-infinite-list > [isselected] {
            position: relative;
            z-index: 0;
        }

        b-infinite-list > [isselected]:before {
            position: absolute;
            content: '';
            background: var(--theme, #2196F3);
            opacity: .1;
            /* border: solid 1.4em #E3F2FD;
            border-left-width: 2em; */
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            z-index: -1;
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
        
        <b-list-toolbar .filters=${this.filters} .sorts=${this.sorts} .layouts=${this.layouts}
            @filter-term-changed=${this.onFilterTermChange}>
            <slot name="toolbar:before" slot="before"></slot>
            <slot name="toolbar:after" slot="after"></slot>
            <slot name="toolbar:refresh" slot="refresh-btn">
                <b-btn text pill icon="arrows-ccw" @click=${this.refresh}></b-btn>
            </slot>
            <!-- <b-label slot="after" class="queuing-label">Queuing filters, release to apply</b-label> -->
            <b-list-selection-bar>
                <slot name="actions:left" slot="left"></slot>
                <slot name="actions:right" slot="right"></slot>
            </b-list-selection-bar>
        </b-list-toolbar>

        <slot name="header"></slot>
        <b-infinite-list
            .empty="${this.createEmptyElement}"
            .row="${this.createRow}"
            .divider=${this.createDivider}
            .dataSource=${this.dataSource}
            fetch-on-load=${(this.listOptions&&this.listOptions.fetchOnLoad)}
            layout="${this.layout}"
        ></b-infinite-list>
        <slot name="footer"></slot>
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
    get emptyElement(){ return this.getAttribute('empty') || 'b-empty-state'}

    get toolbar(){
        return this.shadowRoot.querySelector('b-list-toolbar')
    }

    get list(){
        return this.shadowRoot.querySelector('b-infinite-list')
    }

    createRow(model){

        let row = customElements.get(this.rowElement)

        if( row ){
            row = new row()
            row.model = model
            row.list = this
            return row
        }
    }

    createEmptyElement(){
        this.emptyView = this.emptyView || document.createElement(this.emptyElement)
        this.emptyView.list = this
        this.emptyView.dataSource = this.dataSource
        
        let term = this.dataSource.filters&&this.dataSource.filters.term
        this.emptyView.value = term ? `No results for “${term}”` : (this.getAttribute('placeholder') || 'No results')
        this.emptyView.requestUpdate()
        return this.emptyView
    }

    createDivider(prevModel, model){

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

        // defer to end of callstack to let infinite list view render and begin fetching
        setTimeout(async ()=>{
            this.spinner.show = true
            try{
                this.toolbar.count = await this.dataSource.length()
            }catch(err){}

            this.spinner.show = false
            
        })

        this.header = this.$$('[name="header"]').assignedNodes()[0]
        this.footer = this.$$('[name="footer"]').assignedNodes()[0]

        if( this.header || this.footer )
        this.list.addEventListener('scroll', e=>{
            
            if( this.header )
                this.header.scrollLeft = e.currentTarget.scrollLeft

            if( this.footer )
                this.footer.scrollLeft = e.currentTarget.scrollLeft
            
            if( e.currentTarget.scrollLeft == 0 )
                this.removeAttribute('scrolled-x')
            else
                this.setAttribute('scrolled-x', '')
        })

        // TODO: unbind on disconnect?
        this.selection = new Selection(this.list, this.rowElement, Object.assign({
            toolbar: this.shadowRoot.querySelector('b-list-selection-bar'),
        }, (this.selectionOptions||{})))
        
        this.addEventListener('selection:begin', e=>{
            e.stopPropagation()
            this.selection.begin(e)
        })
    }

    async refresh(){
        this.spinner.show = true
        try{
            this.selection.end()
            this.dataSource.reset()
            this.list.reset()
            this.toolbar.count = await this.dataSource.length()
        }catch(err){}
        this.spinner.show = false
    }

    async reload(){
        this.selection.end()
        this.dataSource.refilter()
        this.list.reset(this.shouldFetchData)
        this.toolbar.count = await this.dataSource.length()
    }

    get shouldFetchData(){
        return this.dataSource.hasFetched || this.listOptions&&this.listOptions.fetchOnLoad
    }

    async onFilterTermChange(changes){

        // TODO: probably need an opt in feature
        if( this.listOptions && this.listOptions.fetch == 'more' ){
            this.dataSource.reset()
        }

        this.dataSource.applyFilters()
        this.list.reset(this.shouldFetchData)
        this.toolbar.count = await this.dataSource.length()
    }

    async onFilterChange(changes){
        
        if( this.filters.needsDatabaseFetch(changes) ){
            this.spinner.show = true
            this.dataSource.reset()
        }

        this.dataSource.applyFilters()
        this.list.reset(this.shouldFetchData)
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
        
        this.list.reset(this.shouldFetchData)
        this.toolbar.count = await this.dataSource.length()
        this.spinner.show = false
    }

})

export default customElements.get('b-list')