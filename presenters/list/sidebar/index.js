import { LitElement, html, css } from 'lit'
import './filter'
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

        :host-context([part="sidebar left"]) {
            border-right: solid 2px var(--theme-bgd-accent);
            width: 260px;
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
        }

        ::slotted(*) {
            padding: 1em;
        }
    `

    focus(){
        this.$$('b-term-search')?.focus()
    }

    constructor(){
        super()
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

    render(){return html`

        <slot name="before"></slot>
        
        <b-grid class="header" cols=1>

            <b-text-divider xbold icon="filter">
                Filters

                <b-flex gap=" " slot="right">
                    <b-btn sm clear color="theme" @click=${this.enableQueuedFilters} ?hidden=${this.filters.queuing}>Queue</b-btn>
                    <b-btn sm clear color="theme" @click=${this.applyQueuedFilters} 
                    ?hidden=${!this.filters.queuing}>Apply (${this.queuing})</b-btn>
                </b-flex>

            </b-text-divider>


            <b-term-search .coll=${this.filtersMenu}></b-term-search>

        </b-grid>
    

        <main>
            <b-term-search-results .coll=${this.filtersMenu} .item=${item=>html`

                <b-list-filters-sidebar-filter .model=${item.filter} ?active=${item.active}></b-list-filters-sidebar-filter>

            `}></b-term-search-results>
        </main>

        <slot name="after"></slot>

    `}

    enableQueuedFilters(){ this.filters.queuing = true; this.queuing = 0 }
    applyQueuedFilters(){ this.filters.queuing = false; this.queuing = false }

    resetFilters(){
        this.filters.reset()
    }

    connectedCallback(){
        super.connectedCallback()

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