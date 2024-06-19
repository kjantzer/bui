import { LitElement, html, css } from 'lit'
import './sort-btn'
import './sort-dir-btn'
import './filters-view'
import './layout-btn'
import './search'
import '../../../elements/toggle-btn'
import '../../../elements/toggle-view'

customElements.define('b-list-toolbar', class extends LitElement{

    static get properties(){return {
        key: {type: String},
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
            column-gap: .25em;
            background: linear-gradient(to bottom, transparent, var(--theme-bgd));
        }

        :host(.selection-bar-shown) > * {
            visibility: hidden;
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

        b-list-sort-btn,
        b-list-sort-btn + b-list-filters {
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
            /* border-right: 2px solid rgba(0, 0, 0, 0.1); */
            /* padding: 0 .75em 0 .25em; */
            margin: 0 .25em;
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

        .count > span {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1em;
            padding: 0.2em 0.4em;
            flex-shrink: 0;
            order: var(--count-order, 2);
            background: var(--theme-bgd-accent);
        }

        [name="before"] { order: 1; }
        .count { order: 2; }
        .scroller { order: 3; }
        .after { order: 4; }

        .scroller[empty] {
            display: none;
        }

        .toggle-sidebar { order: 100; position: relative; }
        .toggle-sidebar b-label {
            position: absolute;
            top: 1px;
            right: 1px;
            pointer-events: none;
        }


        @container (max-width: 599px) {
            
            :host {
                display: grid;
                grid-template-columns: auto auto 1fr;
            }

            slot {
                display: flex;
            }

            .scroller {
                grid-row-start: 2;
                grid-column: 1/-1;
                margin-left: -0.5em;
                margin-right: -0.5em;
                margin-top: 0.25em;
                padding-top: .25em;
                border-top: solid 1px var(--theme-bgd-accent);
            }

            b-list-sort-btn {
                border-left: none;
                margin-left: 0;
                padding-left: 0;
            }

        }
    `}

    render(){return html`
        <slot name="before"></slot>

        <div class="count"><span>${this.count}</span></div>

        <div class="scroller" ?empty=${!this.sorts&&!this.filters.size}>

            ${!this.sorts?'':html`
                <b-list-sort-btn .sorts=${this.sorts}></b-list-sort-btn>
            `}
            
            ${!this.filters?'':html`
                <b-list-filters .filters=${this.filters}></b-list-filters>
            `}

        </div>
        
        <div class="after">

            ${!this.filters||!this.filters.showSearch?'':html`
            <b-list-search-bar @keydown=${this.onKeyDown} 
                title="Press '/' to focus"
                placeholder=${this.filters.searchOptions.placeholder}></b-list-search-bar>
            `}

            ${!this.layouts?'':html`
                <b-list-layout-btn .layouts=${this.layouts} pill text></b-list-layout-btn>
            `}

            ${this.filters?.size?html`
            <b-text class="toggle-sidebar">
                <b-toggle-btn clear lg icon="tune" key=${this.filters.key+':sidebar-panel'}></b-toggle-btn>
                <b-label xs badge="theme" ?hidden=${!this.filters.length}>${this.filters.length}</b-label>
            </b-text>
            `:''}

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
        // same term or both falsy
        if( term == this.filters.term 
        || (!term && !this.filters.term) ) return

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