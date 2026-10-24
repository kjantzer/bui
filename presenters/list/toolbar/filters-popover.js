/*
    List filters popover (a sheet on phones)

    Every filter in one place. Header: search, saved filters and history (shown in the right column),
    clear all, Cancel / Apply. Left: the filters (grouped by their `group`, others under "Filters") with their
    current value; the search finds filter names and their values. Right: what's picked (or in place of the
    list when narrow, with a back btn).

    The search is focused when it opens; up/down move through the left column and enter picks.

    Options are the filter's menu (multi select filters toggle; right-click / long-press for "Not")
    or its custom view (date, input, slider, search).

    Changes are queued while it's open: the list updates on Apply (or closing it); Cancel puts them back

    ```js
    FiltersPopover.open(filters, btn, {filter: 'type'})
    ```
*/
import { LitElement, html, css } from 'lit'
import Menu from '../../menu'
import Popover from '../../popover'
import Panel from '../../panel'
import device from '../../../util/device'
import {label as dateRangeLabel} from '../../datepicker/daterange'
import './filter-saved-presets'

const NARROW = 520
const PRESETS = '__presets'
const HISTORY = '__history'

export default class FiltersPopover extends LitElement {

    static properties = {
        query: {type: String},
        selectedKey: {type: String},
        highlight: {type: Number}, // index of the left column item the arrow keys are on
        keyNav: {type: Boolean}, // the arrow keys / search are being used (shows the highlight)
        narrow: {type: Boolean, reflect: true},
        sheet: {type: Boolean, reflect: true}, // shown as a bottom sheet (phones)
        loading: {type: Boolean}
    }

    // opens (or re-focuses) the filters for a list; `filter`: key of a filter to show first
    static open(filters, target, {filter}={}){

        let el = filters.__popover || new FiltersPopover()
        filters.__popover = el
        el.filters = filters
        el.query = ''

        // show something right away: the filter asked for, else (desktop) the first active one or the first one
        let key = filter || el.selectedKey
        if( !key && !device.isSmall ){
            let visible = el.visibleFilters
            key = (visible.find(f=>f.isActive) || visible[0])?.key
        }
        el.selectedKey = null
        el.keyNav = false
        if( key ) el.select(key)
        el.highlight = Math.max(0, el.navItems.findIndex(item=>item.key == key))

        if( el.isOpen ){
            el.requestUpdate()
            el.focusSearch()
            return el
        }

        el.startQueue()

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
                width: 'min(720px, 94vw)',
                maxHeight: '78vh',
                align: 'bottom-start',
                overflowBoundry: 'window',
                onClose: ()=>el.didClose()
            })
        }

        el.isOpen = true
        el.focusSearch()
        return el
    }

    // (not on phones: the keyboard would cover the sheet)
    async focusSearch(){
        if( this.sheet ) return
        await this.updateComplete
        requestAnimationFrame(()=>this.renderRoot.querySelector('header input')?.focus({preventScroll: true}))
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
            grid-template-rows: auto minmax(0, 1fr);
            height: min(600px, 78vh);
            background: var(--theme-bgd);
            color: var(--theme-text);
        }

        :host([sheet]) {
            height: 100%;
        }

        header {
            display: flex;
            align-items: center;
            gap: .25rem;
            padding: .5rem .75rem;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        /* saved filters / history: selected while the right column shows them */
        .tool {
            position: relative;
            display: inline-flex;
        }

        .tool .dot {
            position: absolute;
            top: .3em;
            right: .3em;
            margin: 0;
            pointer-events: none;
        }

        /* one family: pills the same height as the search */
        header {
            --b-btn-height: 2.1rem;
        }

        .tools, .actions {
            display: flex;
            align-items: center;
            gap: .15rem;
            flex-shrink: 0;
        }

        /* a thin line between the tools and Cancel / Apply */
        .actions {
            gap: .35rem;
            margin-left: .35rem;
            padding-left: .6rem;
            border-left: solid 1px var(--theme-bgd-accent);
        }

        header b-btn {
            font-size: .9rem;
        }

        header b-btn[icon]::part(main) {
            padding: .45em;
        }

        header b-btn[active] {
            color: var(--theme);
            --hoverBgdColor: color-mix(in srgb, var(--theme) 14%, transparent);
            background: color-mix(in srgb, var(--theme) 14%, transparent);
            border-radius: 2em;
        }

        .actions b-btn::part(main) {
            padding: .45em 1em;
        }

        /* (room for the sheet's grab handle) */
        :host([sheet]) header {
            padding-top: 1.1rem;
        }

        .search {
            flex: 1;
            min-width: 0;
            height: 2.1rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            gap: .4rem;
            padding: 0 .85rem;
            border-radius: 2em;
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
            grid-template-columns: minmax(230px, 42%) minmax(0, 1fr);
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
            padding: .35rem 0 .5rem;
        }

        :host([narrow]) .list { border-right: none; }
        .list[hidden] { display: none; }

        .group {
            padding: .75rem .9rem .3rem;
            font-size: .7rem;
            font-weight: 600;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: var(--theme-text-accent);
        }

        .sep {
            height: 1px;
            margin: .4rem .9rem;
            background: var(--theme-bgd-accent);
        }

        /* a filter: its label, with the value under it when set */
        .item {
            display: flex;
            align-items: center;
            gap: .55rem;
            margin: 0 .35rem;
            padding: .45rem .55rem;
            border-radius: 8px;
            cursor: pointer;
            min-width: 0;
        }

        :host([sheet]) .item {
            padding: .7rem .65rem;
        }

        @media (hover) {
            .item:hover {
                background: var(--theme-bgd-accent);
            }
        }

        .item[selected] {
            background: color-mix(in srgb, var(--theme) 12%, transparent);
        }

        /* where the arrow keys are (enter picks it) */
        .item[highlight] {
            box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--theme) 45%, transparent);
        }

        .item .icon {
            flex-shrink: 0;
            color: var(--theme-text-accent);
            font-size: .9em;
        }

        .item .text {
            flex: 1;
            min-width: 0;
            display: grid;
        }

        .item .label,
        .item .value {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .item .value {
            font-size: .8em;
            line-height: 1.3;
            color: var(--theme);
            font-weight: 600;
        }

        .item .value.muted {
            color: var(--theme-text-accent);
            font-weight: 400;
        }

        .item .chev {
            flex-shrink: 0;
            color: var(--theme-text-accent);
            opacity: .6;
        }

        .dot {
            display: inline-block;
            width: .45em;
            height: .45em;
            margin-left: .3em;
            border-radius: 50%;
            background: var(--red, #e53935);
            vertical-align: middle;
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

        /* what's picked */
        .detail {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
        }

        .detail-head {
            display: flex;
            align-items: center;
            gap: .35rem;
            min-height: 2.75rem;
            padding: .25rem .5rem .25rem .9rem;
            border-bottom: solid 1px var(--theme-bgd-accent);
            box-sizing: border-box;
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
            max-height: none;
            overflow: visible;
        }

        /* custom views fill the column (some set their own width for a popover) */
        .detail-body > :not(b-menu) {
            display: block;
            width: 100% !important;
            max-width: none !important;
            box-sizing: border-box;
        }

        b-list-filters-saved { display: none; }

        :host([sheet]) .list,
        :host([sheet]) .detail-body {
            padding-bottom: env(safe-area-inset-bottom, 0px);
        }
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

    // re-render as the saved filters load / change (the hidden <b-list-filters-saved> tracks them)
    updated(changed){
        let el = this.presetsEl
        if( el && el != this.__presetsEl ){
            this.__presetsEl = el
            el.coll.on('update reset sync change', this.onChange)
        }

        if( this.keyNav && changed.has('highlight') )
            this.renderRoot.querySelector('.item[highlight]')?.scrollIntoView({block: 'nearest'})
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

    // closing (Apply, or clicking outside) applies the changes; Cancel puts them back first
    didClose(){
        this.applyCustomView()
        this.applyQueue()
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

    get selectedFilter(){
        return this.selectedKey && this.filters.get(this.selectedKey)
    }

    get hasPresets(){ return this.filters.opts?.presets !== false }

    // (rendered hidden: tracks the saved presets and which one is applied)
    get presetsEl(){
        return this.renderRoot?.querySelector('b-list-filters-saved')
    }

    render(){
        let picked = this.selectedKey
        let showList = !this.narrow || !picked

        return html`
            <header>
                <label class="search">
                    <b-icon name="search"></b-icon>
                    <input type="text" placeholder="Find a filter or value" .value=${this.query}
                        @input=${this.onSearchInput} @keydown=${this.onSearchKey}>
                </label>
                <span class="tools">
                    ${this.hasPresets?html`
                        ${this.renderPresetsBtn()}
                        <b-btn clear pill icon="history" title="History" ?active=${picked==HISTORY}
                            @click=${()=>this.select(HISTORY)}></b-btn>
                    `:''}
                    <b-btn clear pill icon="backspace" title="Clear all filters" @click=${this.clearAll}
                        ?disabled=${!this.filters.length}></b-btn>
                </span>
                <span class="actions">
                    <b-btn clear pill @click=${this.cancel}>Cancel</b-btn>
                    <b-btn pill color="theme" class="apply" title="The list updates when you apply" @click=${this.close}>Apply</b-btn>
                </span>
            </header>

            <div class="body">
                <div class="list" ?hidden=${!showList}>
                    ${this.query ? this.renderSearch() : this.renderGroups()}
                </div>

                ${picked == PRESETS ? this.renderPresets()
                : picked == HISTORY ? this.renderHistory()
                : this.selectedFilter ? this.renderDetail(this.selectedFilter)
                : this.narrow ? '' : html`
                    <div class="detail"><div class="empty">Pick a filter to see its options</div></div>
                `}
            </div>

            ${this.hasPresets?html`<b-list-filters-saved hidden .filters=${this.filters}
                @click=${e=>e.stopPropagation()}></b-list-filters-saved>`:''}
        `
    }

    renderGroups(){
        let groups = [...this.groups]
        let single = groups.length == 1
        let i = 0
        return groups.map(([name, filters])=>html`
            ${single?'':html`<div class="group">${name}</div>`}
            ${filters.map(f=>this.renderItem(f, {index: i++}))}
        `)
    }

    renderItem(filter, {label, index}={}){
        let active = filter.isActive
        return html`
            <div class="item" ?selected=${filter.key==this.selectedKey} ?highlight=${this.isHighlight(index)}
                @click=${()=>this.clickSelect(filter.key)}>
                ${filter.icon?html`<b-icon class="icon" name=${filter.icon}></b-icon>`:''}
                <span class="text">
                    <span class="label">${label || filter.label}</span>
                    ${active?html`<span class="value"><b-text .html=${filter.valueLabel}></b-text></span>`:''}
                </span>
                <b-icon name="chevron_right" class="chev"></b-icon>
            </div>
        `
    }

    renderPresetsBtn(){
        let el = this.presetsEl
        let active = el?.model?.get('name')
        let title = active ? `Saved Filters: ${active}` : el?.coll?.length ? `Saved Filters (${el.coll.length})` : 'Saved Filters'
        return html`
            <span class="tool">
                <b-btn clear pill icon="filter_presets" title=${title} ?active=${this.selectedKey==PRESETS}
                    @click=${()=>this.select(PRESETS)}></b-btn>
                ${el?.changed?html`<span class="dot" title="Changed since applied"></span>`:''}
            </span>
        `
    }

    // filters by name, and their values (ex: "ware" finds Type → Warehouse)
    searchResults(){
        let q = this.query.trim().toLowerCase()
        return {q, byName: this.visibleFilters.filter(f=>f.label.toLowerCase().includes(q)), byValue: this.valueMatches(q)}
    }

    renderSearch(){
        let {q, byName, byValue} = this.searchResults()

        if( !byName.length && !byValue.length )
            return html`<div class="empty">No filters or values match “${this.query}”</div>`

        return html`
            ${byName.length?html`
                <div class="group">Filters</div>
                ${byName.map((f, i)=>this.renderItem(f, {label: highlight(f.label, q), index: i}))}
            `:''}
            ${byValue.length?html`
                <div class="group">Values</div>
                ${byValue.map(({filter, value}, i)=>html`
                    <div class="item" ?highlight=${this.isHighlight(byName.length+i)} @click=${()=>this.pickValue(filter, value)}>
                        <span class="text"><span class="label"><b-text muted>${filter.label} →</b-text> ${highlight(value.label, q)}</span></span>
                        ${isSelectedValue(filter, value)?html`<b-icon name="check" class="chev" style="color: var(--theme); opacity: 1"></b-icon>`:''}
                    </div>
                `)}
            `:''}
        `
    }

    // the left column in order (what up/down move through)
    get navItems(){
        if( !this.query )
            return [...this.groups.values()].flat().map(filter=>({key: filter.key, filter}))

        let {byName, byValue} = this.searchResults()
        return [
            ...byName.map(filter=>({key: filter.key, filter})),
            ...byValue.map(({filter, value})=>({filter, value}))
        ]
    }

    isHighlight(index){
        return this.keyNav && index != null && index == this.highlight
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

    renderDetailHead(title, {hint, clear}={}){return html`
        <div class="detail-head">
            ${this.narrow?html`<b-btn text icon="chevron_left" @click=${this.back}></b-btn>`:''}
            <span class="title">${title}</span>
            ${hint?html`<span class="hint">${hint}</span>`:''}
            ${clear||''}
        </div>
    `}

    renderDetail(filter){
        return html`
            <div class="detail">
                ${this.renderDetailHead(filter.label, {
                    hint: this.hasNot(filter) ? `${device.isTouch?'Hold':'Right-click'} for “Not”` : '',
                    clear: html`<b-btn clear pill icon="backspace" title="Clear ${filter.label}" ?disabled=${!filter.isActive}
                        @click=${()=>this.clearFilter(filter)}></b-btn>`
                })}
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

    async select(key){
        if( key == this.selectedKey && !this.narrow ) return

        this.applyCustomView()
        this.selectedKey = key

        let filter = this.filters.get(key)
        if( filter?.attrs.onFirstLoad ){
            this.loading = true
            try{ await filter.attrs.onFirstLoad.call(this.filters.list, filter) }
            finally{ this.loading = false }
            delete this.menus[key] // its values may have changed
        }
    }

    // (mouse) the arrows continue from here
    clickSelect(key){
        this.keyNav = false
        this.highlight = Math.max(0, this.navItems.findIndex(item=>item.key == key))
        this.select(key)
    }

    back(){
        this.applyCustomView()
        this.selectedKey = null
    }

    /*
        Saved filters (presets) and history
    */
    renderPresets(){
        let el = this.presetsEl
        let menu = el ? new Menu(el.buildMenu(), {
            search: el.coll.length > 8 ? {placeholder: 'Find a saved filter'} : false,
            handler: el, // save / update actions
            onSelect: selected=>{ if( !selected.fn ) el.applyPreset(selected) }
        }) : ''

        return html`
            <div class="detail">
                ${this.renderDetailHead('Saved Filters', {hint: 'Shift+click to merge'})}
                <div class="detail-body">${menu}</div>
            </div>
        `
    }

    renderHistory(){
        let menu = historyMenu(this.filters)
        return html`
            <div class="detail">
                ${this.renderDetailHead('History', {hint: 'Filters you’ve used'})}
                <div class="detail-body">
                    ${menu.length ? new Menu(menu, {
                        search: menu.length > 10 ? {placeholder: 'Search history'} : false,
                        onSelect: selected=>this.filters.reset(selected.filters, {stopQueuing: false})
                    }) : html`<div class="empty">No filters used yet</div>`}
                </div>
            </div>
        `
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
        this.highlight = Math.max(0, this.navItems.findIndex(item=>item.key == filter.key))
        this.select(filter.key)
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

    applyCustomView(filter=this.selectedFilter){
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

    onSearchInput(e){
        this.query = e.target.value
        this.keyNav = true
        this.highlight = 0
    }

    // up/down move through the left column; enter picks (a filter shows its options, a value is set)
    onSearchKey(e){
        if( e.key == 'Escape' && this.query ){
            e.stopPropagation()
            this.query = ''
            this.highlight = Math.max(0, this.navItems.findIndex(item=>item.key == this.selectedKey))
            return
        }

        if( e.isComposing ) return
        let items = this.navItems

        if( e.key == 'ArrowDown' || e.key == 'ArrowUp' ){
            e.preventDefault()
            if( !items.length ) return
            let i = this.keyNav ? this.highlight : Math.max(0, items.findIndex(item=>item.key == this.selectedKey))
            if( this.keyNav ) i += e.key == 'ArrowDown' ? 1 : -1
            this.highlight = Math.min(items.length-1, Math.max(0, i))
            this.keyNav = true
        }

        if( e.key == 'Enter' ){
            let item = items[this.highlight]
            if( !item ) return
            e.preventDefault()
            this.keyNav = true
            if( item.value ) this.pickValue(item.filter, item.value)
            else this.select(item.key)
        }
    }

    /*
        Queue: the list updates when done
    */
    startQueue(){
        this.__originalFilters = this.filters.value()
        this.filters.queuing = true
    }

    applyQueue(){
        delete this.__originalFilters
        this.filters.queuing = false
    }

    cancel(){
        this.applyCustomView = ()=>{} // (don't apply a custom view's edits on the way out)
        if( this.__originalFilters )
            this.filters.reset(this.__originalFilters, {stopQueuing: false})
        this.filters.queuedChanges = null // nothing to apply
        this.menus = {}
        this.close()
        delete this.applyCustomView
    }
}

// the filters' history as menu items (newest first, by day)
export function historyMenu(filters){
    let history = filters?.history.map((d, name)=>{

        let vals = name.split('|').map(s=>{
            let vals = s.split(':')
            let label = vals.shift()
            let val = vals.join(':').trim()
            return {label, val}
        })

        return {
            ...d,
            label: html`
                <b-flex left wrap gap-row=" ">
                ${vals.map(({label, val})=>html`
                    <b-text>
                        <b-text semibold>${label}</b-text>
                        <b-text dim><b-text .html=${val}></b-text></b-text>
                    </b-text>
                `)}
                </b-flex>
            `,
            dataTitle: vals.map(({label, val})=>`${label}: ${val}`).join(' | ')
        }

    }).reverse() || []

    let menu = []
    let divider = ''

    for( let d of history ){
        let dateLabel = dateRangeLabel(d.ts, d.ts, {monthDay: false})
        if( dateLabel != divider ){
            divider = dateLabel
            menu.push({divider: dateLabel})
        }
        menu.push(d)
    }

    return menu
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
