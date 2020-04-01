import { LitElement, html, css } from 'lit-element'
import './filter-btn'

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

        @media (max-width:699px) {
            /* move active filters  to front on small devices */
            .filters b-list-filter-btn[active] {
                order: -1;
            }
        }
    `}

    render(){return html`
        <b-btn icon="layers" ?hidden=${!this.queuing} title="Apply queued filters" text
            @click=${this.applyQueuedFilters}>${this.queuing}</b-btn>
        
        ${this.filters.map(filter=>html`
            <b-list-filter-btn ?active=${filter.isActive} .filter=${filter}></b-list-filter-btn>
        `)}
        
        <b-btn color="hover-red" title="Clear filters" icon="erase" text @click=${this.resetFilters}></b-btn>
    `}

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