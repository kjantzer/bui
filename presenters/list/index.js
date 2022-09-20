import { LitElement, html, css } from 'lit'
import DataSource from './data/source'
import Filters from './data/filters'
import Sorts from './data/sorts'
import Layouts from './data/layouts'
import './toolbar'
import './toolbar/selection-bar'
import './infinite-list'
import '../../elements/spinner-overlay'
import '../../helpers/lit/selectors'
import Selection from '../selection'
import Scrollbars from '../../helpers/scrollbars'

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
            this.__dataSource.on('changed', async ()=>{
                this.toolbar.count = await this.__dataSource.length()
            })
        }
        return this.__dataSource
    }

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-rows: auto auto 1fr auto;
            grid-template-columns: auto 1fr auto;
            overflow: hidden;
            flex: 1;
            position: relative;
            z-index: 10;
            grid-template-areas:
                "toolbar toolbar toolbar"
                "sidebarleft header sidebarright"
                "sidebarleft list sidebarright"
                "sidebarleft footer sidebarright";

        }

        [part="list"] { grid-area: list; }
        [part="toolbar"] { grid-area: toolbar; }
        [part="header"] { grid-area: header; }
        [part="footer"] { grid-area: footer; }
        [part="sidebar:left"] { grid-area: sidebarleft; }
        [part="sidebar:right"] { grid-area: sidebarright; }

        slot[name="header"],
        slot[name="footer"] {
            display: grid;
            overflow-x: auto;
        }

        slot[name="header"]::slotted(*),
        slot[name="footer"]::slotted(*) {
            overflow-y: auto;
            order: 10;
        }

        /* this doesn't seem to work */
        slot[name="header"]::slotted(*::-webkit-scrollbar),
        slot[name="footer"]::slotted(*::-webkit-scrollbar) {
            display: none;
            width: 0 !important;
            height: 0 !important;
        }

        [part="sidebar:left"],
        [part="sidebar:right"] {
            display: flex;
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

        ${Scrollbars.styleWindows('b-infinite-list')}

        b-infinite-list[selection-on] {
            user-select: none;
        }

        b-infinite-list > [isselected] {
            position: relative;
            z-index: 0;
        }

        b-infinite-list > [isselected] {
            --list-cell-viewing-bgd: var(--b-list-selected-row-bgd, rgba(var(--theme-rgb), .1));
        }

        b-infinite-list > [isselected]:before {
            position: absolute;
            content: '';
            /* opacity: .1; */
            background: var(--b-list-selected-row-bgd, rgba(var(--theme-rgb), .1));
            /* border: solid 1.4em #E3F2FD;
            border-left-width: 2em; */
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            z-index: -1;
        }

        b-infinite-list > * {
            /* keeps any sticky columns working properly  */
            min-width: fit-content;
        }

        contract-draft-row { /* FIXME: remove? */
            padding: 2em;
        }

        contract-draft-row:not(:last-child) {
            border-bottom: solid 1px rgba(0,0,0,.1);
        }
        
        [part="empty-view"] {
            grid-column: 1/-1;
            grid-row: 1/-1;
        }

        [part="divider"] {
            grid-column: 1/-1;
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

        :host([toolbar="bottom"]) {
            grid-template-rows: auto 1fr auto auto;
        }

        :host([toolbar="bottom"]) b-list-toolbar {
            order: 3;
        }

        b-panels {
            overflow: hidden;
        }

        b-panel {
            --radius: 0
        }

        b-panel::part(main) {
            box-shadow: none;
            border-top: solid 1px var(--theme-bgd-accent);
            background: var(--b-list-filter-overflow-bgd, var(--theme-bgd));
        }

        :host([grid]) [part="list"] {
            display: grid;
            grid-template-columns: repeat( auto-fill, minmax(var(--grid-size, 240px), 1fr) );
            padding: var(--gutter, 1em);
            gap: var(--gutter, 1em);
            align-content: flex-start;
        }

        @media (max-width:599px){

            :host([grid]) {
                --grid-size: var(--grid-size-mobile, 1fr) !important;
            }

            :host([toolbar="bottom-mobile"]) {
                grid-template-rows: auto auto 1fr auto;
            }

            :host([toolbar="bottom-mobile"]) b-list-toolbar {
                order: 3;
            }
        }
    `}

    get spinner(){
        return this.__spinner = this.__spinner 
                            || this.querySelector('[slot="spinner"]')
                            || this.shadowRoot.querySelector('b-spinner-overlay')
    }

    get refreshBtn(){
        return this.$$('[slot="refresh-btn"] > b-btn', '__refreshBtn')
    }

    render(){return html`

        <style>${this.customStyles||''}</style>
        
        <slot name="spinner">
            <b-spinner-overlay></b-spinner-overlay>
        </slot>
        
        <b-list-toolbar 
            .filters=${this.filters}
            .sorts=${this.sorts}
            .layouts=${this.layouts}
            .listOptions=${this.listOptions}
            @filter-term-changed=${this.onFilterTermChange} part="toolbar"
        >
            <slot name="toolbar:before" slot="before"></slot>
            <slot name="toolbar:after" slot="after"></slot>
            <slot name="toolbar:refresh" slot="refresh-btn">
                <b-btn text pill icon="refresh" @click=${this.refresh}></b-btn>
            </slot>
            <!-- <b-label slot="after" class="queuing-label">Queuing filters, release to apply</b-label> -->
            <b-list-selection-bar part="selectionbar">
                <slot name="actions:left" slot="left"></slot>
                <slot name="actions:right" slot="right"></slot>
            </b-list-selection-bar>
        </b-list-toolbar>

        <slot name="sidebar:left" part="sidebar:left"></slot>

        <slot name="header" part="header"></slot>
        <b-infinite-list
            part="list"
            .empty="${this.createEmptyElement}"
            .row="${this.createRow}"
            .divider=${this.createDivider}
            .dataSource=${this.dataSource}
            fetch-on-load=${(this.listOptions&&this.listOptions.fetchOnLoad)}
            layout="${this.layout}"
        >
        </b-infinite-list>
        <slot name="footer" part="footer"></slot>

        <slot name="sidebar:right" part="sidebar:right"></slot>

        <b-panels name="b-list:${this.key}"></b-panels>
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

    focusSearchInput(opts){
        let searchBar = this.toolbar.$$('b-list-search-bar')
        if( searchBar )
            searchBar.focus(opts)
    }

    blurSearchInput(){
        let searchBar = this.toolbar.$$('b-list-search-bar')
        if( searchBar )
            searchBar.blur()
    }

    onKeydown(e){

        if( e.cancelBubble )
            return

        if( this.offsetParent // is this list visible?
        && document.activeElement.tagName == 'BODY' // NOT inside an input
        ){

            // Like Google search results, focus search when `/` is pressed
            if( e.key == '/'
            && !e.ctrlKey && !e.metaKey && !e.shiftKey // ignore if extra keys pressed
            ){
                setTimeout(()=>{
                    e.preventDefault()
                    this.focusSearchInput({select:true})
                })
            }

            // Mac=option key; Windows=alt key
            if( e.altKey & (e.key == 'r' || e.key == '®') ){
                
                // focus search so we can check `document.activeElement`
                setTimeout(()=>{
                    e.preventDefault()
                    this.focusSearchInput()

                    // traverse up the DOM to see if this list is in the activeElement
                    setTimeout(()=>{
                        let parent = this
                        let isActive = false
                        while( parent != undefined ){
                            parent = parent.parentElement || parent.getRootNode().host
                            if( isActive = parent == document.activeElement )
                                break
                        }

                        // yep, active, so refresh
                        if( isActive ){
                            this.refresh()
                            this.blurSearchInput()
                        }
                    })
                })
            }
        }
        // if( e.target !== document.body ) return
        // if( !e.metaKey && !e.ctrlKey ) return
        // console.log('here');
        // this.queuing = true
    }

    onKeyup(e){
        // why was I doing this?
        // if( this.queuing && !this.filters.queuedChanges )
        //     this.queuing =  false
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
            row.part = 'row'
            // NOTE: will this ever cause lag when lots of rows loaded?
            // if so, change to an opt-in feature
            row.innerHTML = `<slot name="row-${model.id}"></slot>`
            return row
        }
    }

    createEmptyElement(){
        this.emptyView = this.emptyView || document.createElement(this.emptyElement)
        this.emptyView.part = 'empty-view'
        this.emptyView.setAttribute('must-be', 'first')
        this.emptyView.list = this
        this.emptyView.dataSource = this.dataSource
        
        // this.emptyView.innerHTML = '<slot name="empty"></slot>'
        
        let term = this.dataSource.filters&&this.dataSource.filters.term
        this.emptyView.value = term ? `No results for “${term}”` : (this.getAttribute('placeholder') || 'No results')
        this.emptyView.requestUpdate()
        return this.emptyView
    }

    createDivider(prevModel, model){

        let divider = this.getAttribute('divider')
        
        divider = divider && customElements.get(divider)
        let shouldDisplay = divider && divider.shouldDisplay && divider.shouldDisplay(prevModel, model, this)
        if( shouldDisplay ){
            divider = new divider(prevModel, model, this, shouldDisplay)
            divider.part = 'divider'
            divider.list = this
            divider.model = model
            divider.prevModel = prevModel
            divider.data = shouldDisplay
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

        let grid = this.listOptions&&this.listOptions.grid
        if( grid ){
            this.setAttribute('grid', '')

            if( typeof grid === 'string' )
                this.style.setProperty('--grid-size', grid)
            if( grid.size )
                this.style.setProperty('--grid-size', grid.size)
        
            if( grid.sizeMobile )
                this.style.setProperty('--grid-size-mobile', grid.sizeMobile)
        }

        // TODO: unbind on disconnect?
        this.selection = new Selection(this.list, this.rowElement, Object.assign({
            toolbar: this.shadowRoot.querySelector('b-list-selection-bar'),
        }, (this.selectionOptions||{})))

        this.selection.on('begin', ()=>{
            this.setAttribute('selection-on', '')
        })

        this.selection.on('end', ()=>{
            this.removeAttribute('selection-on')
        })
        
        this.addEventListener('selection:begin', e=>{
            e.stopPropagation()
            this.selection.begin(e)
        })

        this.dataSource.on('fetching', this.onDataSourceFetching.bind(this))
    }

    onDataSourceFetching(isFetching){
        if( this.refreshBtn )
            this.refreshBtn.spinicon = isFetching
    }

    get currentModels(){
        return this.selection.isOn 
        ? this.selection.result.models
        : this.dataSource.data
    }

    get currentModelsOrAll(){
        let models = this.currentModels
        return models.length > 0 ? models : this.dataSource.data
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
        // fetchOnLoad defaults to true for infinite list
        return this.dataSource.hasFetched || this.listOptions?.fetchOnLoad !== false
    }

    set term(term){
        this.toolbar.term = term
    }

    async _onChangeReset(){
        try{
            this.list.reset(this.shouldFetchData)
            this.toolbar.count = await this.dataSource.length()
        }catch(err){
            throw new UIError(err.message||err.name)
        }finally{
            this.spinner.show = false
        }
    }

    async onFilterTermChange(){

        // TODO: probably need an opt in feature
        if( this.listOptions && this.listOptions.fetch == 'more' ){
            this.dataSource.reset()
        }

        this.dataSource.applyFilters()
        this._onChangeReset()
    }

    async onFilterChange(changes){
        
        if( this.filters.needsDatabaseFetch(changes) ){
            this.spinner.show = true
            this.dataSource.reset()
        }

        this.dataSource.applyFilters()
        this._onChangeReset()
    }

    async onSortChange(){

        if( this.sorts.sortOnDB === true ){
            this.spinner.show = true
            this.dataSource.reset()
        }else{
            this.dataSource.sort()
        }
        
        this._onChangeReset()
    }

})

export default customElements.get('b-list')