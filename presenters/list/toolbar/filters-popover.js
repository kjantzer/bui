/*
    List filters popover (a sheet on phones)

    Every filter in one place: search (filter names and their values), saved filters and history,
    filters grouped (`group` on the filter; others under "Filters") showing their current value.
    Picking a filter shows its options beside the list (wide) or in place of it (narrow, with a back btn).

    Options are the filter's menu (multi select filters toggle; right-click for "Not" when it has two selections)
    or its custom view (date, input, slider, search). Changes apply as they're made, unless queuing.

    ```js
    FiltersPopover.open(filters, btn, {filter: 'type', queue: false})
    ```
*/
import { LitElement, html, css } from 'lit'
import Menu from '../../menu'
import Popover from '../../popover'
import Panel from '../../panel'
import device from '../../../util/device'
import './filter-saved-presets'

const NARROW = 520

export default class FiltersPopover extends LitElement {

    static properties = {
        query: {type: String},
        selectedKey: {type: String},
        narrow: {type: Boolean, reflect: true},
        sheet: {type: Boolean, reflect: true}, // shown as a bottom sheet (phones)
        queue: {type: Boolean, reflect: true},
        loading: {type: Boolean}
    }

    // opens (or re-focuses) the filters for a list; `filter`: key of a filter to show first
    static open(filters, target, {filter, queue=false}={}){

        let el = filters.__popover || new FiltersPopover()
        filters.__popover = el
        el.filters = filters
        el.queue = queue
        el.query = ''

        // show a filter's options right away: the one asked for, else (desktop) the first active one or the first one
        let key = filter || el.selectedKey
        if( !key && !device.isSmall ){
            let visible = el.visibleFilters
            key = (visible.find(f=>f.isActive) || visible[0])?.key
        }
        el.selectedKey = null
        if( key && filters.get(key) ) el.select(filters.get(key))

        if( el.isOpen ){
            el.requestUpdate()
            return el
        }

        if( queue ) el.startQueue()

        if( device.isSmall ){
            el.sheet = true
            new Panel(el, {
                title: 'Filters',
                anchor: 'bottom',
                animation: 'rise',
                width: '100%',
                height: '88%',
                onClose: ()=>el.didClose()
            }).open()
        }else{
            el.sheet = false
            new Popover(target, el, {
                width: 'min(700px, 94vw)',
                maxHeight: '75vh',
                align: 'bottom-start',
                overflowBoundry: 'window',
                onClose: ()=>el.didClose()
            })
        }

        el.isOpen = true
        return el
    }

    constructor(){
        super()
        this.query = ''
        this.menus = {}
        this.onChange = ()=>this.requestUpdate()
    }

    static styles = css`
        :host {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr) auto;
            height: min(560px, 75vh);
            background: var(--theme-bgd);
            color: var(--theme-text);
        }

        :host([sheet]) {
            height: 100%;
        }

        /* (room for the sheet's grab handle) */
        :host([sheet]) header {
            padding-top: 1.1rem;
        }

        header {
            display: flex;
            align-items: center;
            gap: .25rem;
            padding: .5rem .5rem .5rem .75rem;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        .search {
            flex: 1;
            min-width: 0;
            display: flex;
            align-items: center;
            gap: .4rem;
            padding: .35rem .65rem;
            border-radius: 8px;
            background: var(--theme-bgd-accent);
            color: var(--theme-text-accent);
        }

        .search input {
            flex: 1;
            min-width: 0;
            border: none;
            outline: none;
            background: none;
            font: inherit;
            color: var(--theme-text);
        }

        .body {
            display: grid;
            grid-template-columns: minmax(190px, 32%) minmax(0, 1fr);
            min-height: 0;
        }

        :host([narrow]) .body {
            grid-template-columns: minmax(0, 1fr);
        }

        .list, .detail {
            overflow: auto;
            min-height: 0;
        }

        .list {
            border-right: solid 1px var(--theme-bgd-accent);
            padding-bottom: .5rem;
        }

        :host([narrow]) .list { border-right: none; }
        :host([narrow]) .list[hidden], :host([narrow]) .detail[hidden] { display: none; }

        .group {
            padding: .75rem .9rem .3rem;
            font-size: .7rem;
            font-weight: 600;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: var(--theme-text-accent);
        }

        .item {
            display: flex;
            align-items: center;
            gap: .5rem;
            margin: 0 .35rem;
            padding: .5rem .55rem;
            border-radius: 8px;
            cursor: pointer;
            min-width: 0;
        }

        :host([sheet]) .item {
            padding: .75rem .65rem;
        }

        @media (hover) {
            .item:hover {
                background: var(--theme-bgd-accent);
            }
        }

        .item[selected] {
            background: color-mix(in srgb, var(--theme) 12%, transparent);
        }

        .item .label {
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* (the value gives up room first) */
        .item .value {
            flex: 0 1 auto;
            max-width: 60%;
            min-width: 0;
            text-align: right;
            font-size: .85em;
            color: var(--theme-text-accent);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .item[active] .value {
            color: var(--theme);
            font-weight: 600;
        }

        .item .chev {
            color: var(--theme-text-accent);
            opacity: .6;
        }

        .item b-icon.filter-icon {
            color: var(--theme-text-accent);
            font-size: .9em;
        }

        mark {
            background: color-mix(in srgb, var(--theme) 22%, transparent);
            color: inherit;
            border-radius: 3px;
            padding: 0 1px;
        }

        .empty {
            padding: 1.5rem 1rem;
            text-align: center;
            color: var(--theme-text-accent);
        }

        /* the picked filter's options */
        .detail {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
        }

        .detail-head {
            display: flex;
            align-items: center;
            gap: .35rem;
            padding: .5rem .5rem .5rem .9rem;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        :host([narrow]) .detail-head {
            padding-left: .35rem;
        }

        .detail-head .title {
            flex: 1;
            min-width: 0;
            font-weight: 600;
        }

        .detail-head .hint {
            font-size: .75rem;
            color: var(--theme-text-accent);
        }

        .detail-body {
            overflow: auto;
            min-height: 0;
        }

        .detail-body b-menu {
            --b-menu-max-height: none;
            max-height: none;
            overflow: visible;
        }

        .detail-body > :not(b-menu) {
            display: block;
            padding: .5rem;
        }

        footer {
            display: flex;
            align-items: center;
            gap: .5rem;
            padding: .6rem .75rem;
            border-top: solid 1px var(--theme-bgd-accent);
        }

        footer .grow { flex: 1; }

        :host([sheet]) footer {
            padding-bottom: calc(.6rem + env(safe-area-inset-bottom, 0px));
        }

        :host([sheet]) footer .show {
            flex: 1;
        }

        footer[hidden] { display: none; }
    `

    connectedCallback(){
        super.connectedCallback()
        this.filters?.on('change', this.onChange)
        this.filters?.on('change-queue', this.onChange)
        this.filters?.on('reset', this.onChange)

        this.resizeObserver ||= new ResizeObserver(()=>{
            this.narrow = this.sheet || this.offsetWidth < NARROW
        })
        this.resizeObserver.observe(this)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.filters?.off('change', this.onChange)
        this.filters?.off('change-queue', this.onChange)
        this.filters?.off('reset', this.onChange)
        this.resizeObserver?.disconnect()
    }

    close(){
        if( this.panel ) this.panel.close()
        else this.popOver?._close()
    }

    didClose(){
        this.applyCustomView()
        if( this.queue ) this.applyQueue()
        this.isOpen = false
    }

    // filters shown (`show: false` ones are only set in code)
    get visibleFilters(){
        return this.filters.map(f=>f).filter(f=>f.attrs.show !== false)
    }

    get groups(){
        let groups = new Map()
        this.visibleFilters.forEach(filter=>{
            let name = filter.attrs.group || 'Filters'
            if( !groups.has(name) ) groups.set(name, [])
            groups.get(name).push(filter)
        })
        return groups
    }

    get selected(){
        return this.selectedKey && this.filters.get(this.selectedKey)
    }

    get resultCount(){
        return this.filters.list?.toolbar?.count
    }

    render(){
        let selected = this.selected
        let showList = !this.narrow || !selected

        return html`
            <header>
                <label class="search">
                    <b-icon name="search"></b-icon>
                    <input type="text" placeholder="Find a filter or value" .value=${this.query}
                        @input=${e=>this.query=e.target.value} @keydown=${this.onSearchKey}>
                </label>

                ${this.filters.opts?.presets!==false?html`
                    <b-list-filters-saved .filters=${this.filters}></b-list-filters-saved>
                    <b-btn text icon="history" title="Filter history" @click=${this.viewHistory}></b-btn>
                `:''}

                <b-btn text sm @click=${this.clearAll} ?disabled=${!this.filters.length}>Clear all</b-btn>
            </header>

            <div class="body">
                <div class="list" ?hidden=${!showList}>
                    ${this.query ? this.renderSearch() : this.renderGroups()}
                </div>

                ${selected ? this.renderDetail(selected) : this.narrow ? '' : html`
                    <div class="detail"><div class="empty">Pick a filter to see its options</div></div>
                `}
            </div>

            <footer ?hidden=${!this.queue && !this.sheet}>
                ${this.queue?html`
                    <b-text sm muted class="grow">Changes apply when you’re done</b-text>
                    <b-btn text @click=${this.cancelQueue}>Cancel</b-btn>
                    <b-btn color="theme" @click=${this.close}>Apply</b-btn>
                `:html`
                    <b-btn color="theme" class="show" @click=${this.close}>
                        ${this.resultCount != null ? `Show ${Number(this.resultCount).toLocaleString()} results` : 'Done'}
                    </b-btn>
                `}
            </footer>
        `
    }

    renderGroups(){
        let groups = [...this.groups]
        let single = groups.length == 1
        return groups.map(([name, filters])=>html`
            ${single?'':html`<div class="group">${name}</div>`}
            ${filters.map(f=>this.renderItem(f))}
        `)
    }

    renderItem(filter, {label}={}){
        let active = filter.isActive
        return html`
            <div class="item" ?selected=${filter.key==this.selectedKey} ?active=${active}
                @click=${()=>this.select(filter)}>
                ${filter.icon?html`<b-icon class="filter-icon" name=${filter.icon}></b-icon>`:''}
                <span class="label">${label || filter.label}</span>
                <span class="value">${active?html`<b-text .html=${filter.valueLabel}></b-text>`:'Any'}</span>
                <b-icon name="chevron_right" class="chev"></b-icon>
            </div>
        `
    }

    // filters by name, and their values (ex: "ware" finds Type → Warehouse)
    renderSearch(){
        let q = this.query.trim().toLowerCase()
        let byName = this.visibleFilters.filter(f=>f.label.toLowerCase().includes(q))
        let byValue = this.valueMatches(q)

        if( !byName.length && !byValue.length )
            return html`<div class="empty">No filters or values match “${this.query}”</div>`

        return html`
            ${byName.length?html`
                <div class="group">Filters</div>
                ${byName.map(f=>this.renderItem(f, {label: highlight(f.label, q)}))}
            `:''}
            ${byValue.length?html`
                <div class="group">Values</div>
                ${byValue.map(({filter, value})=>html`
                    <div class="item" @click=${()=>this.pickValue(filter, value)}>
                        <span class="label" style="max-width: none; flex: 1">
                            <b-text muted>${filter.label} →</b-text> ${highlight(value.label, q)}
                        </span>
                        ${isSelectedValue(filter, value)?html`<b-icon name="check" style="color: var(--theme)"></b-icon>`:''}
                    </div>
                `)}
            `:''}
        `
    }

    valueMatches(q){
        let matches = []
        for( let filter of this.visibleFilters ){
            if( filter.isCustomView || !filter.attrs.values ) continue
            let values
            try{ values = filter.values }catch(err){ continue }
            for( let value of values ){
                if( !value || typeof value != 'object' || value.divider || value.menu || value.val == null ) continue
                let label = typeof value.label == 'string' ? value.label : String(value.toolbarLabel || value.val)
                if( label.toLowerCase().includes(q) )
                    matches.push({filter, value: {...value, label}})
                if( matches.length >= 40 ) return matches
            }
        }
        return matches
    }

    renderDetail(filter){
        return html`
            <div class="detail">
                <div class="detail-head">
                    ${this.narrow?html`<b-btn text icon="chevron_left" @click=${this.back}></b-btn>`:''}
                    <span class="title">${filter.label}</span>
                    ${this.hasNot(filter)?html`<span class="hint">${device.isTouch?'Hold':'Right-click'} for “Not”</span>`:''}
                    <b-btn text sm ?disabled=${!filter.isActive} @click=${()=>this.clearFilter(filter)}>Clear</b-btn>
                </div>
                <div class="detail-body">
                    ${this.loading ? html`<div class="empty"><b-spinner></b-spinner></div>`
                        : filter.isCustomView ? this.customViewFor(filter)
                        : this.menuFor(filter)}
                </div>
            </div>
        `
    }

    // a filter whose options are "Is" / "Not"
    hasNot(filter){
        if( filter.isCustomView || !filter.attrs.values ) return false
        try{ return filter.values.some(v=>v?.selections?.length == 2) }catch(err){ return false }
    }

    async select(filter){
        if( filter.key == this.selectedKey && !this.narrow ) return

        this.applyCustomView()
        this.selectedKey = filter.key

        if( filter.attrs.onFirstLoad ){
            this.loading = true
            try{ await filter.attrs.onFirstLoad.call(this.filters.list, filter) }
            finally{ this.loading = false }
            delete this.menus[filter.key] // its values may have changed
        }
    }

    back(){
        this.applyCustomView()
        this.selectedKey = null
    }

    /*
        Menu filters
    */
    menuFor(filter){
        let valueKey = JSON.stringify(filter.value ?? null)
        let cached = this.menus[filter.key]

        if( cached && cached.valueKey == valueKey )
            return cached.menu

        let values = filter.values
        values.forEach(value=>{
            if( value?.menu )
                value.menuOpts = {...(value.menuOpts||{}), popover: {overflowBoundry: 'window'}}
        })

        let menu = new Menu(values, {
            selected: filter.value,
            multiple: filter.isMulti ? 'always' : false, // (checkboxes toggle; "Any" etc still clear)
            search: filter.attrs.search ? filter.attrs.search : (values.length > 12 ? {
                placeholder: `Search ${filter.label} (${values.length})`,
                showAll: true
            } : false),
            onSelect: selected=>this.applyMenu(filter, selected)
        })

        this.menus[filter.key] = {menu, valueKey}
        return menu
    }

    applyMenu(filter, selected){
        if( selected === false || selected == null ) return

        if( Array.isArray(selected) )
            filter.value = selected.length
                ? selected.map(s=>s.selection ? {val: s.val, selection: s.selection} : s.val)
                : null
        else if( selected.menuSelected )
            filter.value = selected.menuSelected.val
        else
            filter.value = selected.selection ? {val: selected.val, selection: selected.selection} : selected.val

        // the menu already shows this (don't re-create it)
        if( this.menus[filter.key] )
            this.menus[filter.key].valueKey = JSON.stringify(filter.value ?? null)
    }

    // from a search result: add it (multi) or set it
    pickValue(filter, value){
        let entry = value.selections ? {val: value.val, selection: value.selections[0]?.val ?? value.selections[0]} : value.val

        if( filter.isMulti ){
            let current = [].concat(filter.value ?? []).filter(v=>v != null)
            if( !current.some(v=>(v?.val ?? v) == value.val) )
                filter.value = [...current, entry]
        }else
            filter.value = entry

        this.query = ''
        this.select(filter)
    }

    /*
        Custom view filters (date, input, slider...)
    */
    customViewFor(filter){
        let view = filter.customView
        if( !view ) return html`<div class="empty">Unsupported filter view</div>`

        // views call `close()` when done (ex: enter in an input); apply instead of closing a popover
        view.popOver = {_close: ()=>this.applyCustomView(filter)}
        return view
    }

    applyCustomView(filter=this.selected){
        if( !filter?.isCustomView || !filter.customView ) return
        let view = filter.customView
        if( JSON.stringify(view.value ?? null) != JSON.stringify(filter.value ?? null) )
            filter.value = view.value
        view.didClose?.()
    }

    clearFilter(filter){
        filter.value = null
        delete this.menus[filter.key]
    }

    clearAll(){
        this.filters.reset({}, {stopQueuing: false})
        this.menus = {}
    }

    onSearchKey(e){
        if( e.key == 'Escape' && this.query ){
            e.stopPropagation()
            this.query = ''
        }
    }

    /*
        Queue: changes apply together when done
    */
    startQueue(){
        this.__originalFilters = this.filters.value()
        this.filters.queuing = true
    }

    applyQueue(){
        delete this.__originalFilters
        this.filters.queuing = false
        this.queue = false
    }

    cancelQueue(){
        if( this.__originalFilters )
            this.filters.reset(this.__originalFilters, {stopQueuing: false})
        this.menus = {}
        this.applyQueue()
        this.close()
    }

    viewHistory(e){
        this.filters.list?.toolbar?.shadowRoot?.querySelector('b-list-filters')?.viewHistory(e)
    }
}

function highlight(label, q){
    let i = label.toLowerCase().indexOf(q)
    if( !q || i < 0 ) return label
    return html`${label.slice(0, i)}<mark>${label.slice(i, i+q.length)}</mark>${label.slice(i+q.length)}`
}

function isSelectedValue(filter, value){
    return [].concat(filter.value ?? []).some(v=>(v?.val ?? v) == value.val)
}

customElements.define('b-list-filters-popover', FiltersPopover)
