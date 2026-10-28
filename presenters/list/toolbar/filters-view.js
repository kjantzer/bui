import { LitElement, html, css } from 'lit'
import {repeat} from 'lit/directives/repeat.js'
import device from '../../../util/device'
import './filter-btn'
import './filter-saved-presets' // TODO: make this opt-in?
import Menu from '../../../presenters/menu'
import FiltersPopover, {historyMenu, PRESETS} from './filters-popover'
import './filter-chip'
import '../../../elements/sortable'

/*
    List filters in the toolbar

    - Filters btn (with how many are on): opens every filter in a popover (a sheet on phones; see ./filters-popover.js)
    - Saved Filters btn (desktop, when the list has saved presets): opens the popover to them
    - pinned filters first, always shown (even when not applied); drag to reorder, right-click to unpin
      (pinned per browser, see Filters.pinned; pin from the filters popover or by right-clicking a chip)
    - a chip for each other active filter (click to change it, ✕ to clear it)

    Keyboard: `f` opens the filters (changes apply when it's closed), `c` clears
*/
customElements.define('b-list-filters', class extends LitElement{

    static get properties(){return {
        count: {type: Number},
        queuing: {type: Number}
    }}

    constructor(){
        super()
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    static get styles(){return css`
        :host {
            display: var(--b-list-filters-display, flex);
            gap: .25rem;
            align-items: center;
            flex-shrink: 0;
            position: relative;
        }

        /* active count: a badge floating on the corner (the btn stays the same size) */
        .filters {
            position: relative;
            display: inline-flex;
            flex-shrink: 0;
        }

        .filters[hidden] { display: none; }

        .filters .count {
            position: absolute;
            top: .1em;
            right: .05em;
            display: inline-grid;
            place-items: center;
            min-width: 1.45em;
            height: 1.45em;
            padding: 0 .3em;
            border-radius: 1em;
            background: var(--theme);
            color: var(--theme-bgd);
            box-shadow: 0 0 0 2px var(--theme-bgd);
            font-size: .62em;
            font-weight: 700;
            line-height: 1;
            box-sizing: border-box;
            pointer-events: none;
        }

        b-list-filter-btn, b-list-filter-chip, [noshrink] {
            flex-shrink: 0;
        }


        .pins {
            display: flex;
            align-items: center;
            gap: .25rem;
            flex-shrink: 0;
        }

        .pins:empty {
            display: none;
        }

        .pins > .sortable-ghost {
            opacity: .4;
        }

        b-list-filters-saved {
            display: none;
        }

        .presets-btn[active] {
            color: var(--theme);
        }

        /* small: just the filters btn (and its count); the sheet shows the active filters and quick ones */
        @container (max-width: 599px) {
            b-list-filter-chip,
            b-list-filter-btn,
            .presets-btn {
                display: none;
            }
        }
    `}

    get pinnedFilters(){
        return this.filters.pinned.map(key=>this.filters.get(key)).filter(f=>f.attrs.show !== false)
    }

    // active filters that aren't pinned
    get activeFilters(){
        let pinned = this.filters.pinned
        return this.filters.map(f=>f).filter(f=>f.isActive && f.attrs.show !== false && !pinned.includes(f.key))
    }

    render(){return html`


        <span class="filters" ?hidden=${this.filters.size==0}>
            <b-btn icon="filter" clear lg pill class="filters-btn" @click=${()=>this.show()} tooltip="Filters (f)"></b-btn>
            ${this.filters.length?html`<span class="count">${this.filters.length}</span>`:''}
        </span>

        ${this.renderPresetsBtn()}

        <span class="pins">
            ${repeat(this.pinnedFilters, filter=>filter.key, filter=>this.renderChip(filter, {pinned: true}))}
            ${this.pinnedFilters.length > 1 ? html`<b-sortable item="[pin]" @sort-changed=${this.onSortPins}></b-sortable>` : ''}
        </span>

        ${repeat(this.activeFilters, filter=>filter.key, filter=>this.renderChip(filter))}
    `}

    get hasPresets(){ return !device.isSmall && this.filters.size > 0 && this.filters.opts?.presets !== false }

    // (rendered hidden: loads the saved presets so the btn only shows when there are some)
    get presetsEl(){
        return this.renderRoot?.querySelector('b-list-filters-saved')
    }

    renderPresetsBtn(){
        if( !this.hasPresets ) return ''

        let coll = this.presetsEl?.coll
        let active = coll?.length && coll.findMatchesFilters(this.filters.value())
        let title = active ? `Saved Filters: ${active.get('name')}` : `Saved Filters (${coll?.length})`

        return html`
            <b-list-filters-saved hidden .filters=${this.filters}></b-list-filters-saved>
            ${coll?.length?html`
                <b-btn icon="filter_presets" clear lg pill class="presets-btn" ?active=${!!active}
                    tooltip=${title} @click=${()=>this.show({filter: PRESETS})}></b-btn>
            `:''}
        `
    }

    // re-render as the saved presets load / change
    updated(){
        let el = this.presetsEl
        if( el && el != this.__presetsEl ){
            this.__presetsEl?.coll.off('update reset sync change', this.onFilterChange)
            this.__presetsEl = el
            el.coll.on('update reset sync change', this.onFilterChange)
        }
    }

    renderChip(filter, {pinned}={}){return html`
        <b-list-filter-chip .filter=${filter} ?pin=${pinned} @open-filter=${()=>this.show({filter: filter.key})}
            @contextmenu=${e=>this.chipMenu(e, filter)}></b-list-filter-chip>
    `}

    // (sortable reports indexes among the pinned chips)
    onSortPins(e){
        let {oldIndex, newIndex} = e.detail
        let keys = this.pinnedFilters.map(f=>f.key)
        let from = this.filters.pinned.indexOf(keys[oldIndex])
        let to = this.filters.pinned.indexOf(keys[newIndex])
        this.filters.movePin(from, to)
    }

    async chipMenu(e, filter){
        e.preventDefault()
        let pinned = this.filters.isPinned(filter.key)

        let selected = await new Menu([
            {label: pinned ? 'Unpin' : 'Pin to Toolbar', icon: 'push_pin', val: 'pin'},
            filter.isActive ? {label: 'Clear', icon: 'backspace', val: 'clear'} : null
        ].filter(d=>d)).popOver(e.currentTarget, {align: 'bottom-start'})

        if( selected?.val == 'pin' ) this.filters.togglePin(filter.key)
        if( selected?.val == 'clear' ) filter.value = null
    }

    get popover(){ return this.filters.__popover }

    // (changes are queued while it's open; see ./filters-popover.js)
    show({filter}={}){
        FiltersPopover.open(this.filters, this.$$('.filters-btn') || this, {filter})
    }

    hide(){
        if( this.popover?.isOpen ) this.popover.close()
    }

    toggle(){
        this.popover?.isOpen ? this.hide() : this.show()
    }

    applyQueuedFilters(){
        this.filters.queuing = false
    }

    resetFilters(e){

        if( e?.button == 2 ){
            e.preventDefault()
            e.stopPropagation()
            this.show({queue:true})
        }
        
        this.filters.reset({}, {stopQueuing: false})
    }

    connectedCallback(){
        super.connectedCallback()

        if( this.filters ){
            this.filters.on('show', this.show)
            this.filters.on('hide', this.hide)
            this.filters.on('change', this.onFilterChange)
            this.filters.on('reset', this.onFilterChange)
            this.filters.on('pinned', this.onFilterChange)
        }
        
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        
        if( this.filters ){
            this.filters.off('show', this.show)
            this.filters.off('hide', this.hide)
            this.filters.off('change', this.onFilterChange)
            this.filters.off('reset', this.onFilterChange)
            this.filters.off('pinned', this.onFilterChange)
        }
    }

    // onFilterQueuing(length){
    //     this.queuing = length
    // }

    onFilterChange(){
        this.requestUpdate()
    }






    async viewHistory(e){
        let selected = await new Menu(historyMenu(this.filters), {
            search: {placeholder: 'Filter history...'}
        }).popOver(e.currentTarget, {width: '800px', overflowBoundry: 'window'})

        if( selected )
            this.filters.reset(selected.filters, {stopQueuing: false})
    }

})

export default customElements.get('b-list-filters')