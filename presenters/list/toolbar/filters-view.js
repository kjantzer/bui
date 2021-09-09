import { LitElement, html, css } from 'lit-element'
import device from '../../../util/device'
import './filter-btn'
import FiltersPanel from './filters-panel'

customElements.define('b-list-filters', class extends LitElement{

    static get properties(){return {
        count: {type: Number},
        queuing: {type: Number}
    }}

    constructor(){
        super()
        this.onFilterQueuing = this.onFilterQueuing.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    static get styles(){return css`
        :host {
            display: flex;
            align-items: center;
            overflow: -moz-scrollbars-none;
            flex: 1;
        }

        [icon='erase'] { display: none; }
        b-list-filter-btn[active] ~ [icon="erase"] {
            display: inline-block
        }

        b-list-filter-btn {
            flex-shrink: 0;
        }

        @media (max-width:599px) {
            /* move active filters  to front on small devices */
            .filters b-list-filter-btn[active] {
                order: -1;
            }
        }

        .show-filters main {
            display: inline-grid;
            line-height: 1.2em;
            margin-bottom: -.25em;
        }

        .show-filters b-label {
            grid-area: unset;
            color: var(--toolbarTextColor);
            margin: -0.5em 0px;
            position: relative;
            top: -0.5em;
            /* opacity: .4; */
        }

        .show-filters b-icon {
            font-size: .8em;
            vertical-align: middle;
            margin-top: -1px;
            color: var(--toolbarTextColor);
            opacity: .4;
        }
    `}

    get showOverflow(){ 
        if( this.filters.opts.overflow != undefined )
            return this.filters.opts.overflow

        return this.filters.size > this.filters.opts.overflowThreshold
        || ( device.isSmallDevice && this.filters.size > this.filters.opts.overflowThresholdMobile) }

    render(){return html`

        ${this.showOverflow?html`

            <b-btn text @click=${this.openFiltersPanel} style="flex-shrink: 0;" class="show-filters" _icon="filter">
                <main>
                    <b-label xs>Filters</b-label>
                    <div>
                        <b-icon name="filter"></b-icon>
                        ${this.filters.length} <b-text muted sm>of</b-text> <b-text muted>${this.filters.size}</b-text>
                    </div>
                </main>
            </b-btn>
        
        `:html`
            <b-btn icon="layers" ?hidden=${!this.queuing} title="Apply queued filters" text
                @click=${this.applyQueuedFilters}>${this.queuing}</b-btn>
        `}

        ${this.filters.map(filter=>this.showFilter(filter)?html`
            <b-list-filter-btn ?active=${filter.isActive} .filter=${filter}></b-list-filter-btn>
        `:'')}

        ${this.showOverflow?html`
        <b-btn color="hover-red" title="Clear filters" icon="erase" text @click=${this.resetFilters}></b-btn>
        `:''}
    `}

    showFilter(filter){
        return !this.showOverflow || (filter.isActive || filter.attrs.alwaysShow)
    }

    openFiltersPanel(){
        this._filtersPanel = this._filtersPanel || new FiltersPanel()
        this._filtersPanel.open({
            filters: this.filters
        })
    }

    applyQueuedFilters(){
        this.filters.queuing = false
    }

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
        this.queuing = length
    }

    onFilterChange(){
        this.update()
    }

})

export default customElements.get('b-list-filters')