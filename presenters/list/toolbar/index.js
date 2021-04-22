import { LitElement, html, css } from 'lit'
import Popover from '../../popover'
import './sort-btn'
import './sort-dir-btn'
import './filters-view'
import './layout-btn'
import './search'

customElements.define('b-list-toolbar', class extends LitElement{

    static get properties(){return {
        count: {type: Number},
    }}

    constructor(){
        super()
        this.count = 0
    }

    static get styles(){return css`
        :host {
            display: flex;
            align-items: center;
            min-width: 0;
            position: relative;
        }

        [hidden] { display: none; }

        b-list-sort-btn {
            flex-shrink: 0;
        }

        b-btn {
            color: var(--toolbarTextColor);
        }

        .scroller {
            display: flex;
            overflow-y: auto;
            align-items: center;
            overflow: -moz-scrollbars-none;
            flex: 1;
        }

        .scroller::-webkit-scrollbar { width: 0 !important; height: 0 !important; }

        b-list-sort-btn + b-list-filters {
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

        <div class="scroller">

            ${!this.sorts?'':html`
                <b-list-sort-btn .sorts=${this.sorts}></b-list-sort-btn>
            `}
            
            ${!this.filters?'':html`
                <b-list-filters .filters=${this.filters}></b-list-filters>
            `}

        </div>
        
        <div class="after">

            ${!this.filters||!this.filters.showSearch?'':html`
            <b-list-search-bar @keydown=${this.onKeyDown} placeholder=${this.filters.searchOptions.placeholder}></b-list-search-bar>
            `}

            ${!this.layouts?'':html`
                <b-list-layout-btn .layouts=${this.layouts} pill text></b-list-layout-btn>
            `}

            <slot name="refresh-btn"></slot>

            <slot name="after"></slot>

            <slot></slot>
        </div>
    `}

    set term(term){
        let termInput = this.shadowRoot.querySelector('b-list-search-bar')

        if( termInput )
            termInput.value = term

        this._termChanged(term)
    }

    onKeyDown(e){
        let target = e.target
        let ts = this.filters.searchOptions.delay

        clearTimeout(this._keydownTimeout)
        this._keydownTimeout = setTimeout(_=>{
            this._termChanged(target.value)
        }, ts)
    }

    _termChanged(term){
        if( term == this.filters.term ) return

        this.filters.term = term

        this.dispatchEvent(new CustomEvent('filter-term-changed', {
            bubbles: true,
            composed: true,
            detail: {
                term: term
            }
        }))
    }

})

export default customElements.get('b-list-toolbar')