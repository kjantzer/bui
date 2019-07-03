import { LitElement, html, css } from 'lit-element'
import Popover from '../../popover'
import './sort-btn'
import './sort-dir-btn'
import './filter-btn'
import './search'

customElements.define('b-list-toolbar', class extends LitElement{

    static get properties(){return {
        count: {type: Number},
        queuing: {type: Number}
    }}

    constructor(){
        super()
        this.count = 0

        this.onFilterQueuing = this.onFilterQueuing.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    static get styles(){return css`
        :host {
            display: flex;
            align-items: center;
            min-width: 0;
        }

        [hidden] { display: none; }

        b-list-sort-btn {
            flex-shrink: 0;
        }

        .filters {
            display: flex;
            align-items: center;
            overflow-y: auto;
            overflow: -moz-scrollbars-none;
        }

        .filters::-webkit-scrollbar { width: 0 !important; height: 0 !important; }

        b-list-sort-btn + .filters {
            border-left: solid 2px rgba(0,0,0,.1);
            margin-left: .25em;
            padding-left: .25em;
        }

        .after {
            margin-left: auto;
            display: flex;
            align-items: center;
        }

        .count {
            align-self: stretch;
            display: flex;
            align-items: center;
            border-right: 2px solid rgba(0, 0, 0, 0.1);
            padding: 0 .75em 0 .25em;
            margin-right: .25em;
        }

        [icon='erase'] { display: none; }
        b-list-filter-btn[active] ~ [icon="erase"] {
            display: inline-block
        }

        b-list-filter-btn {
            flex-shrink: 0;
        }

        .controls {
            display: inline-grid;
        }

        .controls > b-icon {
            font-size: .8em;
            padding: .2em .35em;
            color: rgba(0, 0, 0, 0.4);
        }

        .controls > b-icon:hover {
            color: #333;
        }
    `}

    render(){return html`
        <slot name="before"></slot>

        <div class="count">${this.count}</div>

        ${!this.sorts?'':html`
            <b-list-sort-btn .sorts=${this.sorts}></b-list-sort-btn>
        `}
        
        ${!this.filters?'':html`
        <div class="filters">

            <!-- <div class="controls">
                <b-icon name="layers" text></b-icon>
                <b-icon name="erase" text></b-icon>
            </div> -->

            <b-btn icon="layers" ?hidden=${!this.queuing} title="Apply queued filters" text
                @click=${this.applyQueuedFilters}>${this.queuing}</b-btn>
            
            ${this.filters.map(filter=>html`
                <b-list-filter-btn ?active=${filter.isActive} .filter=${filter}></b-list-filter-btn>
            `)}
            
            <b-btn color="hover-red" title="Clear filters" icon="erase" text @click=${this.resetFilters}></b-btn>
            
        </div>
        `}
        
        <div class="after">

            ${!this.filters||!this.filters.showSearch?'':html`
            <b-list-search-bar @keydown=${this.onKeyDown}></b-list-search-bar>
            `}

            <slot name="after"></slot>
        </div>
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

    // not used, testing idea
    openOver(el, opts){
        new Popover(el, this, opts)
    }

    onKeyDown(e){
        let target = e.target
        setTimeout(_=>{

            let term = target.value

            if( term == this.filters.term ) return

            this.filters.term = term

            this.dispatchEvent(new CustomEvent('filter-term-changed', {
                bubbles: true,
                composed: true,
                detail: {
                    term: term
                }
            }))

        },0)
    }

})

export default customElements.get('b-list-toolbar')