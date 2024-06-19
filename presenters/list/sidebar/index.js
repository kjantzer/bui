import { LitElement, html, css } from 'lit'
import './filter'
import './filters-history'
import './term-search'
import device from '../../../util/device'

customElements.define('b-list-filters-sidebar', class extends LitElement{

    static get properties(){return {
        count: {type: Number},
        queuing: {type: Number},
        term: {type: String},
        hidden: {type: Boolean, reflect: true}
    }}

    set hidden(val){
        let oldVal = this.hidden
        this.__hidden = val
        this.requestUpdate('hidden', oldVal)
    }
    
    get hidden(){ return this.__hidden}

    static styles = css`
        :host {
            display: grid;
            grid-template-rows: 1fr;
        }

        :host([hidden]) {display: none;}

        main {
            overflow: auto;
            min-height: 33%;
        }

        :host([slot*="sidebar"]) {
            width: 220px;
            border-top: solid 1px var(--theme-bgd-accent);
            box-shadow: var(--theme-shadow-3);
            z-index: 10;
        }

        :host([slot="sidebar:left"]) {
            border-right: solid 2px var(--theme-bgd-accent);
        }

        :host([slot="sidebar:right"]) {
            border-left: solid 2px var(--theme-bgd-accent);
        }

        :host([slot="header"]) {
            width: unset;
            max-height: 50vh;
            order: -20 !important;
            border-top: solid 2px var(--theme-bgd-accent);
        }

        b-list-filters-sidebar-filter,
        b-list-filters-saved {
            border-bottom: solid 1px var(--theme-bgd-accent);
            padding: 1em;
        }

        b-list-filters-sidebar-filter[active] {
            background-color: var(--theme-bgd-accent2);
        }

        .header {
            padding: 1em;
            border-bottom: solid 1px var(--theme-bgd-accent);
            position: sticky;
            top: 0;
            background: var(--theme-bgd);
            z-index: 10;
        }

        .header b-btn {
            margin-top: -.5em;
        }

        ::slotted(*) {
            padding: 1em;
        }

        b-list-filters-sidebar-history {
            /*margin: 0 -1em -1em;*/
        }

        b-tabs {
            background-color: transparent !important;
        }
        
        b-tabs > * { padding: 0;}
    `

    show(){ this.toggleView?.show() }
    hide(){ 
        this.cancelQueuedFilters()
        this.toggleView?.hide()
    }

    focus(){
        this.show() // this view may be hidden, tell it to show
        if( this.$$('b-tabs', true) )
            this.$$('b-tabs', true).active = 'filters'

        // make sure shown first, then focus (else wont work)
        setTimeout(()=>{
            this.$$('b-term-search')?.focus()
        })
    }

    constructor(){
        super()
        
        this.slot = this.slot || (device.isSmall ? 'header' : 'sidebar:right')

        this.onFilterQueuing = this.onFilterQueuing.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    showFilter(filter){ return true }

    set filters(val){
        let oldVal = this.filters

        let filtersMenu = val
        filtersMenu = Array.from(val).map(([key,filter])=>{
            return {
                key,
                label: filter.label,
                filter,
            }
        })

        this.filtersMenu = filtersMenu
        this.__filters = val
    
        this.requestUpdate('filters', oldVal)
    }
    
    get filters(){ return this.__filters}

    get list(){
        if( this.parentElement.tagName !== 'B-LIST' )
            throw new UIWarningError('`'+this.tagName+'` must be a direct child of `b-list`')

        return this.parentElement
    }

    render(){return html`

        <b-toggle-view key=${this.filters?.key+':sidebar-panel'} type="show"></b-toggle-view>

        <slot name="before"></slot>

        <b-tabs key=${this.filters?.key+':sidebar-panel'} stretch>

        <div title="" tab-id="filters" icon="filter">
        
        <b-grid class="header" cols=1 gap=".5">

            <b-flex>
                <b-text xbold>Filters</b-text>

                <b-flex right gap=0>

                    <b-btn sm clear noshrink color="theme" ?hidden=${this.queuing!=undefined} @click=${this.toggleQueue}>Queue</b-btn>
                    <b-btn sm clear noshrink color="theme" ?hidden=${this.queuing==undefined} @click=${this.toggleQueue}>Apply (${this.queuing})</b-btn>

                    <b-btn sm block clear icon="cancel" 
                        @click=${this.cancelQueuedFilters} ?hidden=${!this.queuing} tooltip="Cancel changes"></b-btn>

                    <b-btn sm block clear color="hover-red" tooltip="Clear filters"
                        ?hidden=${!this.filters.length}
                        icon="backspace" @click=${this.resetFilters}></b-btn>
                
                </b-flex>
            </b-flex>

            <b-term-search .coll=${this.filtersMenu} @hide=${this.hide}></b-term-search>

        </b-grid>
    

        <main>

            ${this.filters.size>0&&this.filters.opts?.presets!==false?html`
            <b-list-filters-saved .filters=${this.filters} noshrink></b-list-filters-saved>
            `:''}

            <b-term-search-results .coll=${this.filtersMenu} .item=${item=>html`

                <b-list-filters-sidebar-filter .model=${item.filter} ?active=${item.active}></b-list-filters-sidebar-filter>

            `}></b-term-search-results>

            <!-- end of list -->
            <b-text align="center" body block>
                <b-label badge="gray" dot></b-label>
            </b-text>
        </main>

        </div>

        <b-list-filters-sidebar-history icon="history" .filters=${this.filters}></b-list-filters-sidebar-history>

        <slot></slot>

        </b-tabs>

        <slot name="after"></slot>

    `}

    resetFilters(){
        this.filters.reset({}, {stopQueuing: false})
    }

    toggleQueue(e){
        if( this.queuing === undefined ){
            this.__originalFilters = this.filters.value()
            this.filters.queuing = true
            this.queuing = 0
        }else{
            delete this.__originalFilters
            this.filters.queuing = false
            this.queuing = undefined
        }
    }

    cancelQueuedFilters(){
        if( this.__originalFilters )
            this.filters.reset(this.__originalFilters, {stopQueuing:false})
        if( this.queuing !== undefined )
            this.toggleQueue()
    }

    connectedCallback(){
        super.connectedCallback()

        this.filters = this.list?.filters

        if( this.filters ){
            this.filters.on('queuing', this.onFilterQueuing)
            this.filters.on('change', this.onFilterChange)
        }
        
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        
        if( this.filters ){
            this.filters.off('queuing', this.onFilterQueuing)
            this.filters.off('change', this.onFilterChange)
        }
    }

    onFilterQueuing(length){
        this.queuing = length == false ? undefined : length
    }

    onFilterChange(){
        this.requestUpdate()
    }

})

export default customElements.get('b-list-filters-sidebar')