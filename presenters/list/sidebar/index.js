import { LitElement, html, css } from 'lit'
import './filter'
import './filters-history'
import './term-search'

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

        console.log('hidden?', val);
        if( !val )
            setTimeout(()=>{
                this.focus()
            })

        // super.hidden = 
        this.requestUpdate('hidden', oldVal)
    }
    
    get hidden(){ return this.__hidden}

    static styles = css`
        :host {
            display: grid;
            grid-template-rows: auto 1fr;
        }

        :host([hidden]) {display: none;}

        main {
            overflow: auto;
            min-height: 33%;
        }

        :host([slot*="sidebar"]) {
            width: 260px;
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
        }

        b-list-filters-sidebar-filter {
            border-bottom: solid 1px var(--theme-bgd-accent);
            padding: 1em;
        }

        [active] {
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

    focus(){
        this.$$('b-term-search')?.focus()
    }

    constructor(){
        super()
        
        this.slot = this.slot || 'sidebar:left'

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

        <b-tabs>
        <div title="Filters">
        
        <b-grid class="header" cols=1 gap=".5">

            <radio-group segment="" .value=${this.queuing>=0?'1':'0'} @change=${this.toggleQueue}>
                <radio-btn value="0">${!this.queuing?'Auto Apply':`Apply (${this.queuing})`}</radio-btn>
                <radio-btn value="1">Queue</radio-btn>
            </radio-group>

            <b-btn sm block clear color="theme" @click=${this.cancelQueuedFilters} ?hidden=${!this.queuing} >Cancel</b-btn>

            <b-term-search .coll=${this.filtersMenu}></b-term-search>

        </b-grid>
    

        <main>
            <b-term-search-results .coll=${this.filtersMenu} .item=${item=>html`

                <b-list-filters-sidebar-filter .model=${item.filter} ?active=${item.active}></b-list-filters-sidebar-filter>

            `}></b-term-search-results>

            <!-- end of list -->
            <b-text align="center" body block>
                <b-label badge="gray" dot></b-label>
            </b-text>
        </main>

        </div>

        <b-list-filters-sidebar-history title="History" .filters=${this.filters}></b-list-filters-sidebar-history>

        </b-tabs>

        <slot name="after"></slot>

    `}

    toggleQueue(e){
        if( e?.currentTarget?.value == '1' ){
            this.__originalFilters = this.filters.value()
            this.filters.queuing = true
            this.queuing = 0
        }else{
            this.filters.queuing = false
            this.queuing = undefined
        }
    }

    cancelQueuedFilters(){
        this.filters.reset(this.__originalFilters, {stopQueuing:false})
        this.toggleQueue()
    }

    resetFilters(){
        this.filters.reset()
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
        console.log('?');
        this.queuing = length
    }

    onFilterChange(){
        this.requestUpdate()
    }

})

export default customElements.get('b-list-filters-sidebar')