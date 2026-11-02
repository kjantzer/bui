/*
    List filters popover (a sheet on phones and touch-only tablets)

    Every filter in one place. Header: search, saved filters and history (shown in the right column),
    clear all, Cancel / Apply. Left: the filters (grouped by their `group`, others under "Filters") with their
    current value; the search finds filter names and their values. Right: what's picked (or in place of the
    list when narrow, with a back btn).

    The search is focused when it opens (not on touch-only devices: the keyboard would cover it); up/down move
    through the left column and enter picks.

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
import Dialog from '../../dialog'
import device from '../../../util/device'
import {label as dateRangeLabel} from '../../datepicker/daterange'
import './filter-saved-presets'
import {edit as editPreset} from './filter-saved-presets/models'
import '../../../elements/sortable'

const NARROW = 520
const EDGE = 24 // px from the sheet's left edge where a swipe goes back
export const PRESETS = '__presets'
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
        el.historyQuery = ''

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

        // values can come from the list's data, which may have changed since it was last open (ex: a different coll)
        el.menus = {}
        el.startQueue()

        // a sheet on phones and touch-only tablets (dragged down to close)
        if( device.isSmall || device.isTouchOnly ){
            el.sheet = true
            new Panel(el, {
                title: 'Filters',
                anchor: 'bottom',
                animation: 'rise',
                width: device.isSmall ? '100%' : 'min(720px, 100%)',
                height: '88%',
                onClose: ()=>el.didClose()
            }).open()
        }else{
            el.sheet = false
            new Popover(target, el, {
                width: 'min(720px, 94vw)',
                // (default 'auto' max height fits the space below the btn; a fixed 78vh flipped it up off screen on short windows)
                align: 'bottom-start',
                overflowBoundry: 'window',
                // (clicking one of the list's filter chips shows that filter, see ./filters-view.js)
                keepOpenFor: path=>path.some(node=>node.localName == 'b-list-filter-chip' && node.filter?.parent == filters),
                onClose: ()=>el.didClose()
            })
        }

        el.isOpen = true
        el.target = target
        el.focusSearch()
        return el
    }

    // (not on phones or other touch-only devices, ex: a tablet: the keyboard would pop up and cover it)
    async focusSearch(){
        if( this.sheet || device.isTouchOnly ) return
        await this.updateComplete
        requestAnimationFrame(()=>this.renderRoot.querySelector('header input')?.focus({preventScroll: true}))
    }

    constructor(){
        super()
        this.query = ''
        this.menus = {}
        this.onChange = ()=>this.requestUpdate()

        // escape steps back: from a filter's values (its search, a custom view's input) to "Find a filter",
        // then (see onSearchKey) clears the find text, then closes; captured so inline menus don't take it first
        this.addEventListener('keydown', e=>{
            if( e.key != 'Escape' || e.isComposing ) return
            let find = this.renderRoot.querySelector('header input')
            if( !find || e.composedPath()[0] == find ) return
            e.preventDefault()
            e.stopPropagation()
            find.focus({preventScroll: true})
        }, true)
    }

    static styles = css`
        :host {
            display: grid;
            grid-template-columns: minmax(0, 1fr); /* (never wider than it's given) */
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

        /* icon btns: circles as tall as the search */
        header .tools b-btn {
            width: 2.1rem;
            height: 2.1rem;
        }

        header .tools b-btn::part(main) {
            width: 100%;
            height: 100%;
            padding: 0;
            justify-content: center;
            box-sizing: border-box;
            border-radius: 50%;
        }

        header .tools b-btn::part(icon) {
            --size: 1.2rem;
            margin: 0;
        }

        header b-btn[active] {
            color: var(--theme);
            --hoverBgdColor: color-mix(in srgb, var(--theme) 14%, transparent);
            background: color-mix(in srgb, var(--theme) 14%, transparent);
            border-radius: 50%;
        }

        .actions b-btn::part(main) {
            height: 2.1rem;
            padding: 0 1em;
            box-sizing: border-box;
            border-radius: 2em;
        }

        /* (room for the sheet's grab handle) */
        :host([sheet]) header {
            padding-top: 1.1rem;
        }

        /* phones: the search on its own row; tools, then Cancel / Apply below it */
        :host([sheet]) header {
            flex-wrap: wrap;
            row-gap: .5rem;
        }

        :host([sheet]) .search {
            flex-basis: 100%;
        }

        :host([sheet]) .actions {
            margin-left: auto;
            border-left: none;
            padding-left: 0;
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

        /* narrow: the list and a filter's values are stacked; the values slide in from the right
           (and back out, or follow a swipe from the left edge) */
        :host([narrow]) .body {
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas: "stack";
            overflow: hidden;
        }

        :host([narrow]) .list,
        :host([narrow]) .detail {
            grid-area: stack;
            background: var(--theme-bgd);
            transition: transform 280ms cubic-bezier(.2, .8, .2, 1);
        }

        :host([narrow]) .detail {
            z-index: 1;
            transform: translateX(100%);
            box-shadow: -10px 0 24px -16px rgba(0,0,0,.35);
        }

        :host([narrow]) .body[drilled] .detail {
            transform: none;
            animation: detail-in 280ms cubic-bezier(.2, .8, .2, 1); /* (also when it's first added) */
        }

        :host([narrow]) .body[drilled][dragging] .detail { animation: none; }

        @keyframes detail-in {
            from { transform: translateX(100%); }
        }
        :host([narrow]) .body[drilled] .list { transform: translateX(-25%); }

        .body[dragging] .list,
        .body[dragging] .detail {
            transition: none;
        }

        .list, .detail {
            overflow: auto;
            min-height: 0;
        }

        .list {
            border-right: solid 1px var(--theme-bgd-accent);
            padding: .25rem 0 .5rem;
        }

        :host([narrow]) .list { border-right: none; }

        /* group labels and rows match the options menu beside them (bui/presenters/menu) */
        .group {
            margin: .35rem .4rem 0;
            padding: .6rem .75rem .25rem;
            font-size: .78em;
            font-weight: 600;
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
            margin: 2px .4rem;
            padding: .6rem .75rem;
            min-height: 2.45rem;
            box-sizing: border-box;
            border-radius: .6rem;
            cursor: pointer;
            min-width: 0;
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

        /* pinned to the toolbar */
        .item .pinned {
            flex-shrink: 0;
            --size: .9em;
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
            padding: .25rem .5rem .25rem 1.15rem; /* (title lines up with the options) */
            border-bottom: solid 1px var(--theme-bgd-accent);
            box-sizing: border-box;
        }

        :host([narrow]) .detail-head {
            padding-left: .35rem;
        }

        .detail-head b-btn {
            width: 2.1rem;
            height: 2.1rem;
        }

        .detail-head b-btn::part(main) {
            width: 100%;
            height: 100%;
            padding: 0;
            justify-content: center;
            border-radius: 50%;
        }

        .detail-head b-btn::part(icon) {
            --size: 1.2rem;
            margin: 0;
        }

        .detail-head b-btn.text { width: auto; }
        .detail-head b-btn.text::part(main) { padding: 0 .9em; border-radius: 2em; }

        .detail-head .pin:not([active]) {
            opacity: .5;
        }

        .detail-head .pin[active] {
            color: var(--theme);
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
        .detail-body:not(.presets) > :not(b-menu) {
            display: block;
            width: 100% !important;
            max-width: none !important;
            box-sizing: border-box;
        }

        /* desktop: the filters are a tinted sidebar (no chevrons) and the values are the page beside it */
        :host(:not([narrow])) .list {
            background: color-mix(in srgb, var(--theme-bgd-accent) 55%, var(--theme-bgd));
        }

        :host(:not([narrow])) .item .chev { display: none; }

        /* filters with a value are tinted like the app sidebar's active items (bui/app/shell/item.js);
           desktop: the one shown is a card the same color as its values beside it */
        @media (hover) {
            .item:not([selected]):not([active]):hover {
                background: var(--theme-bgd-accent2);
            }
        }

        .item[active] {
            background: color-mix(in srgb, var(--theme) 16%, transparent);
        }

        .item[active] .label {
            font-weight: 600;
        }

        :host(:not([narrow])) .item[selected] {
            background: var(--theme-bgd);
            box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 0 0 1px var(--theme-bgd-accent);
        }

        :host(:not([narrow])) .item[selected][active] {
            box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 0 0 1.5px color-mix(in srgb, var(--theme) 45%, transparent);
        }

        :host(:not([narrow])) .detail-head .title {
            font-size: 1.1em;
        }

        /* saved filters */
        .presets {
            padding: .5rem 0 1rem;
        }

        .preset-status {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: .4rem .6rem;
            margin: 0 .4rem .5rem; /* (same as the presets under it) */
            padding: .6rem .6rem .6rem .85rem;
            min-height: 2.6rem;
            box-sizing: border-box;
            border-radius: .6rem;
            background: var(--theme-bgd-accent);
            font-size: .9em;
        }

        .preset-status .text { flex: 1; min-width: 10em; }
        .preset-status .btns { display: flex; gap: .25rem; margin-left: auto; }
        .preset-status[empty] { color: var(--theme-text-accent); background: none; border: dashed 1px var(--theme-bgd-accent); }

        .preset-status[active] {
            background: color-mix(in srgb, var(--theme) 16%, transparent);
        }

        .preset-status[active] b-icon { color: var(--theme); }

        .preset-status[changed] {
            background: color-mix(in srgb, var(--orange, #f59e0b) 14%, transparent);
        }

        .preset-group .group {
            margin-top: .5rem;
        }

        .preset {
            display: flex;
            align-items: center;
            gap: .35rem;
            margin: 2px .4rem;
            padding: .35rem .35rem .35rem .15rem;
            min-height: 2.6rem;
            box-sizing: border-box;
            border-radius: .6rem;
            cursor: pointer;
        }

        @media (hover) {
            .preset:not([active]):hover { background: var(--theme-bgd-accent2, var(--theme-bgd-accent)); }
        }

        .preset[active] {
            background: color-mix(in srgb, var(--theme) 16%, transparent);
        }

        .preset[active] .label { font-weight: 600; }

        .preset .text {
            flex: 1;
            min-width: 0;
            display: grid;
        }

        .preset .label,
        .preset .value {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .preset .value {
            font-size: .8em;
            line-height: 1.3;
            color: var(--theme-text-accent);
        }

        .preset .handle {
            flex-shrink: 0;
            width: 1.1rem;
            --size: 1.1rem;
            color: var(--theme-text-accent);
            opacity: 0;
            cursor: grab;
        }

        .preset:hover .handle { opacity: .6; }
        .preset .handle:hover { opacity: 1; }
        .preset.sortable-ghost { opacity: .4; }

        .preset .vis {
            flex-shrink: 0;
            --size: 1rem;
            color: var(--theme-text-accent);
            opacity: .7;
        }

        .preset .dot.changed {
            background: var(--orange, #f59e0b);
        }

        .preset .check {
            flex-shrink: 0;
            color: var(--theme);
        }

        .preset .more {
            flex-shrink: 0;
            opacity: 0;
        }

        .preset:hover .more,
        :host([sheet]) .preset .more { opacity: 1; }

        :host([sheet]) .preset .handle { opacity: .5; }

        .presets-tip {
            margin: 1rem .75rem 0;
            font-size: .75rem;
            color: var(--theme-text-accent);
            text-align: center;
        }

        /* history: one line per use; the values stand out, the filter names are quiet */
        .history-entry .pairs {
            display: block;
            line-height: 1.35;
        }

        .history-entry .pair-label {
            font-size: .8em;
            color: var(--theme-text-accent);
        }

        /* a thin line between uses in the same day (not next to the current one) */
        .history-entry { position: relative; }

        .history-entry + .history-entry::before {
            content: '';
            position: absolute;
            top: -4.5px; /* (centered in the gap) */
            left: .75rem;
            right: .75rem;
            height: 1px;
            background: var(--theme-bgd-accent);
        }

        .history-entry[active] + .history-entry::before,
        .history-entry + .history-entry[active]::before {
            display: none;
        }

        /* (long values wrap; a filter's name stays with the start of its value) */
        .history-entry .pair {
            margin-right: .8em;
        }

        .history-entry .pair-label {
            white-space: nowrap;
        }

        .history-entry .pair b-text {
            display: inline;
        }

        .history-entry[active] .label { font-weight: inherit; }

        .history-entry .saved-as {
            display: inline-flex;
            align-items: center;
            gap: .3em;
            font-size: .8em;
            font-weight: 600;
            color: var(--theme);
            margin-bottom: .1rem;
        }

        .history-entry .saved-as b-icon { --size: 1em; }

        .history-entry .time {
            flex-shrink: 0;
            font-size: .75rem;
            color: var(--theme-text-accent);
        }

        .history .preset {
            margin: 4px .4rem;
            padding: .65rem .35rem .65rem .75rem;
        }
        .history .group:first-child, .history-search + .group { margin-top: 0; }
        .history .group { color: var(--theme-text); }

        .history-search {
            flex: none;
            margin: 0 .4rem .5rem;
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
            this.narrow = (this.sheet && device.isSmall) || this.offsetWidth < NARROW
        })
        this.resizeObserver.observe(this)

        if( !this.__touchBound ){
            this.__touchBound = true
            this.addEventListener('touchstart', this.onTouchStart.bind(this), {passive: false})
            this.addEventListener('touchmove', this.onTouchMove.bind(this), {passive: false})
            this.addEventListener('touchend', this.onTouchEnd.bind(this))
            this.addEventListener('touchcancel', this.onTouchEnd.bind(this))
        }
    }

    /*
        Sheet (phones): swipe from the left edge to go back from a filter's values.
        Edge touches stay here: not the app sidebar's edge swipe, and not the browser's back swipe
        (taps there are clicked for, since their touch is canceled)
    */
    onTouchStart(e){
        if( !this.sheet || !this.narrow || e.touches.length > 1 ) return

        let t = e.touches[0]
        if( t.clientX - this.getBoundingClientRect().left > EDGE ) return

        e.stopPropagation()
        e.preventDefault()

        this._swipe = {
            x: t.clientX, y: t.clientY, time: Date.now(),
            target: e.composedPath()[0],
            width: this.offsetWidth,
            canGoBack: this.narrow && !!this.selectedKey,
            dragging: false
        }
    }

    onTouchMove(e){
        let s = this._swipe
        if( !s ) return
        e.stopPropagation()

        let t = e.touches[0]
        let dx = t.clientX - s.x
        let dy = t.clientY - s.y

        if( !s.dragging ){
            if( Math.abs(dx) < 10 && Math.abs(dy) < 10 ) return
            if( !s.canGoBack || Math.abs(dy) > Math.abs(dx) || dx < 0 ){
                s.ignore = true
                return
            }
            s.dragging = true
            this.renderRoot.querySelector('.body')?.setAttribute('dragging', '')
        }

        e.preventDefault()

        let progress = Math.min(1, Math.max(0, dx / s.width))
        s.progress = progress
        s.lastX = t.clientX
        s.lastTime = Date.now()

        let detail = this.renderRoot.querySelector('.detail')
        let list = this.renderRoot.querySelector('.list')
        if( detail ) detail.style.transform = `translateX(${progress * 100}%)`
        if( list ) list.style.transform = `translateX(${-25 * (1 - progress)}%)`
    }

    onTouchEnd(e){
        let s = this._swipe
        this._swipe = null
        if( !s ) return
        e.stopPropagation()

        if( !s.dragging ){
            // a tap at the edge (its touch was canceled, so the browser won't click)
            let t = e.changedTouches?.[0]
            if( !s.ignore && e.type == 'touchend' && t && Math.abs(t.clientX - s.x) < 10 && Math.abs(t.clientY - s.y) < 10 )
                s.target?.click?.()
            return
        }

        let body = this.renderRoot.querySelector('.body')
        body?.removeAttribute('dragging')
        this.renderRoot.querySelector('.detail')?.style.removeProperty('transform')
        this.renderRoot.querySelector('.list')?.style.removeProperty('transform')

        // a quick flick decides it; otherwise past a third of the way
        let velocity = (s.lastX - s.x) / Math.max(1, s.lastTime - s.time)
        if( velocity > .5 || s.progress > 1/3 )
            this.back()
    }

    // re-render as the saved filters load / change (the hidden <b-list-filters-saved> tracks them)
    updated(changed){
        let el = this.presetsEl
        if( el && el != this.__presetsEl ){
            this.__presetsEl = el
            el.coll.on('update reset sync change sort', this.onChange)
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

        // narrow: keep showing the last one while it slides back out
        if( picked ) this.lastPicked = picked
        let shown = picked || (this.narrow ? this.lastPicked : null)
        let shownFilter = shown && this.filters.get(shown)

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
                    <b-btn clear pill icon="more_horiz" title="More" class="more" @click=${this.moreMenu}></b-btn>
                    <input type="file" accept=".bui" hidden @change=${this.importFilters}>
                </span>
                <span class="actions">
                    <b-btn clear pill @click=${this.cancel}>Cancel</b-btn>
                    <b-btn pill color="theme" class="apply" title="The list updates when you apply" @click=${this.close}>Apply</b-btn>
                </span>
            </header>

            <div class="body" ?drilled=${this.narrow && !!picked}>
                <div class="list">
                    ${this.query ? this.renderSearch() : this.renderGroups()}
                </div>

                ${shown == PRESETS ? this.renderPresets()
                : shown == HISTORY ? this.renderHistory()
                : shownFilter ? this.renderDetail(shownFilter)
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
            <div class="item" ?selected=${filter.key==this.selectedKey} ?active=${active} ?highlight=${this.isHighlight(index)}
                @click=${()=>this.clickSelect(filter.key)}>
                ${filter.icon?html`<b-icon class="icon" name=${filter.icon}></b-icon>`:''}
                <span class="text">
                    <span class="label">${label || filter.label}</span>
                    ${active?html`<span class="value"><b-text .html=${filter.valueLabel}></b-text></span>`:''}
                </span>
                ${this.filters.isPinned(filter.key)?html`<b-icon name="push_pin" class="pinned" title="Pinned to toolbar"></b-icon>`:''}
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

    // saved filters by name, filters by name, and their values (ex: "ware" finds Type → Warehouse)
    searchResults(){
        let q = this.query.trim().toLowerCase()
        return {
            q,
            byPreset: this.presetMatches(q),
            byName: this.visibleFilters.filter(f=>f.label.toLowerCase().includes(q)),
            byValue: this.valueMatches(q)
        }
    }

    renderSearch(){
        let {q, byPreset, byName, byValue} = this.searchResults()

        if( !byPreset.length && !byName.length && !byValue.length )
            return html`<div class="empty">No filters or values match “${this.query}”</div>`

        let active = this.presetsEl?.model
        let offset = byPreset.length + byName.length

        return html`
            ${byPreset.length?html`
                <div class="group">Saved Filters</div>
                ${byPreset.map((m, i)=>html`
                    <div class="item" ?highlight=${this.isHighlight(i)} @click=${e=>this.pickPreset(m, e)}>
                        <b-icon class="icon" name="filter_presets"></b-icon>
                        <span class="text">
                            <span class="label">${highlight(m.get('name')||'', q)}</span>
                            ${m.get('summary')?html`<span class="value">${highlight(m.get('summary'), q)}</span>`:''}
                        </span>
                        ${m == active?html`<b-icon name="check" class="chev" style="color: var(--theme); opacity: 1"></b-icon>`:''}
                    </div>
                `)}
            `:''}
            ${byName.length?html`
                <div class="group">Filters</div>
                ${byName.map((f, i)=>this.renderItem(f, {label: highlight(f.label, q), index: byPreset.length+i}))}
            `:''}
            ${byValue.length?html`
                <div class="group">Values</div>
                ${byValue.map(({filter, value}, i)=>html`
                    <div class="item" ?highlight=${this.isHighlight(offset+i)} @click=${()=>this.pickValue(filter, value)}>
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

        let {byPreset, byName, byValue} = this.searchResults()
        return [
            ...byPreset.map(preset=>({preset})),
            ...byName.map(filter=>({key: filter.key, filter})),
            ...byValue.map(({filter, value})=>({filter, value}))
        ]
    }

    isHighlight(index){
        return this.keyNav && index != null && index == this.highlight
    }

    presetMatches(q){
        let coll = this.hasPresets && this.presetsEl?.coll
        if( !coll ) return []
        return coll.filter(m=>[m.get('name'), m.get('summary')].some(s=>s && String(s).toLowerCase().includes(q)))
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
                    clear: html`
                        <b-btn clear pill icon="push_pin" class="pin" ?active=${this.filters.isPinned(filter.key)}
                            title=${this.filters.isPinned(filter.key) ? 'Unpin from toolbar' : 'Pin to toolbar (always shown)'}
                            @click=${()=>this.togglePin(filter)}></b-btn>
                        <b-btn clear pill icon="backspace" title="Clear ${filter.label}" ?disabled=${!filter.isActive}
                            @click=${()=>this.clearFilter(filter)}></b-btn>
                    `
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

    // (mouse) the arrows continue from here; desktop: its options' search (or input) is focused, ready to type
    async clickSelect(key){
        this.keyNav = false
        this.highlight = Math.max(0, this.navItems.findIndex(item=>item.key == key))
        await this.select(key)
        this.focusOptions()
    }

    async focusOptions(){
        if( this.sheet || device.isTouchOnly ) return // (the keyboard would pop up and cover it)
        await this.updateComplete

        requestAnimationFrame(()=>{
            let el = this.renderRoot.querySelector('.detail-body > *')

            let input = !el ? null : el.tagName == 'B-MENU'
                ? el.shadowRoot?.querySelector('.menu-search-bar input')
                : firstInput(el)

            // nothing to type in: back to the filter search (keys keep working)
            ;(input || this.renderRoot.querySelector('header input'))?.focus({preventScroll: true})
        })
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
        let coll = el?.coll

        return html`
            <div class="detail">
                ${this.renderDetailHead('Saved Filters')}
                <div class="detail-body presets">
                    ${el ? this.renderPresetStatus(el) : ''}

                    ${coll?.length ? coll.groups.map(([group, models])=>html`
                        <div class="preset-group">
                            ${group ? html`<div class="group">${group}</div>` : ''}
                            ${models.map(m=>this.renderPreset(m))}
                            ${models.length > 1 ? html`<b-sortable item=".preset" handle=".handle"
                                @sort-changed=${e=>this.onSortPresets(e, models)}></b-sortable>` : ''}
                        </div>
                    `) : html`<div class="empty">No saved filters yet</div>`}

                    ${coll?.length ? html`
                        <div class="presets-tip">${this.sheet ? 'Tap to apply · ••• to add to the current filters'
                            : 'Click to apply · Shift+click to add to the current filters'}</div>
                    ` : ''}
                </div>
            </div>
        `
    }

    // the preset the current filters match exactly (else none)
    get matchingPreset(){
        let coll = this.presetsEl?.coll
        return this.filters.length && coll?.length ? coll.findMatchesFilters(this.filters.value()) : null
    }

    // what the current filters are, and what can be done with them
    renderPresetStatus(el){
        let match = this.matchingPreset
        let from = !match && this.filters.length ? el.model : null // applied, then changed
        let count = this.filters.length
        let canEdit = from && this.canEditPreset(from)

        if( match ) return html`
            <div class="preset-status" active>
                <b-icon name="check_circle"></b-icon>
                <span class="text">Using <b>${match.get('name')}</b></span>
            </div>
        `

        if( from ) return html`
            <div class="preset-status" changed>
                <span class="text">Changed from <b>${from.get('name')}</b></span>
                <span class="btns">
                    <b-btn clear pill sm @click=${()=>this.revertPreset(from)}>Revert</b-btn>
                    ${canEdit?html`<b-btn clear pill sm color="theme" @click=${()=>this.updatePreset(from)}>Update</b-btn>`:''}
                    <b-btn pill sm color="theme" @click=${this.createPreset}>Save as New</b-btn>
                </span>
            </div>
        `

        if( count ) return html`
            <div class="preset-status">
                <span class="text">${count} ${count==1?'filter':'filters'} set, not saved</span>
                <span class="btns">
                    <b-btn pill sm color="theme" @click=${this.createPreset}>Save as Preset</b-btn>
                </span>
            </div>
        `

        return html`
            <div class="preset-status" empty>
                <span class="text">Set some filters, then save them here to use again</span>
            </div>
        `
    }

    renderPreset(m){
        let active = m == this.matchingPreset
        let changed = !active && !this.matchingPreset && this.filters.length && m == this.presetsEl?.model
        let type = m.get('type')
        let canEdit = this.canEditPreset(m)
        return html`
            <div class="preset" ?active=${active} @click=${e=>this.pickPreset(m, e)}
                @contextmenu=${e=>this.presetMenu(e, m)}>
                ${canEdit?html`<b-icon name="drag_indicator" class="handle" title="Drag to reorder"
                    @click=${e=>e.stopPropagation()}></b-icon>`:html`<span class="handle"></span>`}
                <span class="text">
                    <span class="label">${m.get('name')}${changed?html`<span class="dot changed" title="Changed since applied"></span>`:''}</span>
                    ${m.get('summary')?html`<span class="value">${m.get('summary')}</span>`:''}
                </span>
                ${type=='private'?html`<b-icon name="lock" class="vis" title="Private: only you see it"></b-icon>`
                : type=='shared'?html`<b-icon name="people" class="vis" title="Shared: anyone can use and change it"></b-icon>`:''}
                ${active?html`<b-icon name="check" class="check"></b-icon>`:''}
                <b-btn clear pill icon="more_horiz" class="more" title="Options"
                    @click=${e=>this.presetMenu(e, m)}></b-btn>
            </div>
        `
    }

    canEditPreset(model){
        return this.willTakeAction('list:preset:edit', {model}).allowed
    }

    async presetMenu(e, model){
        e.preventDefault()
        e.stopPropagation()

        let coll = this.presetsEl.coll
        let canEdit = this.canEditPreset(model)
        let canDelete = this.willTakeAction('list:preset:delete', {model}).allowed
        let group = model.get('group_name') || ''

        let moveTo = [
            ...coll.groupNames.filter(name=>name!=group).map(name=>({label: name, val: name})),
            group ? {label: 'No group', val: '', icon: 'backspace'} : null,
            {label: 'New group...', val: '__new', icon: 'add'}
        ].filter(d=>d)

        let selected = await new Menu([
            {label: 'Apply', icon: 'check', val: 'apply'},
            {label: 'Add to current filters', icon: 'add', val: 'merge'},
            canEdit ? '-' : null,
            canEdit ? {label: 'Edit...', icon: 'pencil', val: 'edit'} : null,
            canEdit ? {label: 'Move to Group', icon: 'folder', menu: moveTo, val: 'move'} : null,
            canDelete ? '-' : null,
            canDelete ? {label: 'Delete', icon: 'trash', val: 'delete'} : null,
            {text: html`Created by <c-user-avatar nameonly uid=${model.get('uid')}></c-user-avatar>
                <br><b-ts .date=${model.get('ts_created')}></b-ts>`}
        ].filter(d=>d)).popOver(e.currentTarget.closest?.('.preset')?.querySelector('.more') || e.currentTarget, {align: 'bottom-end'})

        if( !selected ) return

        if( selected.val == 'apply' ) this.pickPreset(model)
        if( selected.val == 'merge' ) this.pickPreset(model, {shiftKey: true})
        if( selected.val == 'edit' ) await this.editPreset(model)
        if( selected.val == 'delete' ) await this.deletePreset(model)

        // (a submenu pick)
        let move = selected.menuSelected
        if( move ){
            let name = move.val
            if( name == '__new' )
                return this.withDialog(async ()=>{
                    let attrs = await Dialog.prompt({title: 'New Group', icon: 'add', prompts: [
                        {label: 'Group name', key: 'name', required: true}
                    ]}).modal()
                    if( attrs?.name ) await coll.moveToGroup(model, attrs.name)
                })

            await coll.moveToGroup(model, name)
        }
    }

    // a dialog would open under the popover, so close it (applying any changes) and come back to the saved filters after;
    // (the sheet is a panel, so dialogs stack over it)
    async withDialog(fn){
        if( this.sheet ) return fn()

        let {filters, target} = this
        this.close()
        try{ await fn() }
        finally{ if( target?.isConnected ) FiltersPopover.open(filters, target, {filter: PRESETS}) }
    }

    editPreset(model){
        return this.withDialog(()=>editPreset(model))
    }

    deletePreset(model){
        return this.withDialog(async ()=>{
            if( !await Dialog.confirmDelete({title: `Delete “${model.get('name')}”?`}).modal() ) return
            if( this.presetsEl?.model == model ) this.presetsEl.model = null
            await model.destroySync()
        })
    }

    createPreset(){
        let el = this.presetsEl
        return this.withDialog(()=>el.saveFilters())
    }

    updatePreset(model){
        this.presetsEl.model = model
        this.presetsEl.updateModel()
        this.requestUpdate()
    }

    revertPreset(model){
        this.filters.reset(model.get('filters'), {stopQueuing: false})
        this.menus = {}
    }

    onSortPresets(e, models){
        let {oldIndex, newIndex} = e.detail
        let sorted = [...models]
        sorted.splice(newIndex, 0, sorted.splice(oldIndex, 1)[0])
        this.presetsEl.coll.saveSort(sorted)
    }

    // filters used before (latest first), by day; see ../data/filters.js `history` (kept per browser)
    renderHistory(){
        let entries = historyEntries(this.filters)
        let q = (this.historyQuery||'').trim().toLowerCase()
        let shown = q ? entries.filter(d=>d.search.includes(q)) : entries
        let current = this.filters.length ? this.filters.toString() : null
        let coll = this.hasPresets && this.presetsEl?.coll

        let days = []
        shown.forEach(d=>{
            if( days.at(-1)?.label != d.day ) days.push({label: d.day, entries: []})
            days.at(-1).entries.push(d)
        })

        return html`
            <div class="detail">
                ${this.renderDetailHead('History', {clear: entries.length ? html`
                    <b-btn clear pill sm class="text" @click=${this.clearHistory}>Clear</b-btn>
                ` : ''})}
                <div class="detail-body presets history">
                    ${entries.length > 10 ? html`
                        <label class="search history-search">
                            <b-icon name="search"></b-icon>
                            <input type="text" placeholder="Search history" .value=${this.historyQuery||''}
                                @input=${e=>{ this.historyQuery = e.target.value; this.requestUpdate() }}>
                        </label>
                    ` : ''}

                    ${!entries.length ? html`<div class="empty">Filters you apply will show here</div>`
                    : !shown.length ? html`<div class="empty">Nothing in history matches “${this.historyQuery}”</div>`
                    : days.map(day=>html`
                        <div class="group">${day.label}</div>
                        ${day.entries.map(d=>this.renderHistoryEntry(d, {
                            active: d.name == current,
                            preset: coll?.length ? coll.findMatchesFilters(d.filters) : null
                        }))}
                    `)}

                    ${shown.length ? html`
                        <div class="presets-tip">${this.sheet ? 'Tap to apply · ••• for more'
                            : 'Click to apply · Shift+click to add to the current filters'}</div>
                    ` : ''}
                </div>
            </div>
        `
    }

    renderHistoryEntry(d, {active, preset}){return html`
        <div class="preset history-entry" ?active=${active} @click=${e=>this.pickHistory(d, e)}
            @contextmenu=${e=>this.historyMenu(e, d)}>
            <span class="text">
                ${preset?html`<span class="saved-as"><b-icon name="filter_presets"></b-icon>${preset.get('name')}</span>`:''}
                <span class="pairs" title=${d.search ? d.name.replace(/<[^>]+>/g, '').replace(/ \| /g, '\n') : ''}>
                    ${d.pairs.map(({label, val})=>html`<span class="pair"><span class="pair-label">${label}&nbsp;</span><b-text .html=${val}></b-text></span> `)}
                </span>
            </span>
            ${active?html`<b-icon name="check" class="check" title="Current filters"></b-icon>`
                :html`<span class="time">${d.time}</span>`}
            <b-btn clear pill icon="more_horiz" class="more" title="Options"
                @click=${e=>this.historyMenu(e, d)}></b-btn>
        </div>
    `}

    // replaces the filters (shift: adds to them)
    pickHistory(d, evt){
        this.filters[evt?.shiftKey?'update':'reset'](d.filters, {stopQueuing: false})
        this.menus = {}
    }

    async historyMenu(e, d){
        e.preventDefault()
        e.stopPropagation()

        let selected = await new Menu([
            {label: 'Apply', icon: 'check', val: 'apply'},
            {label: 'Add to current filters', icon: 'add', val: 'merge'},
            this.hasPresets ? {label: 'Save as Preset...', icon: 'filter_presets', val: 'save'} : null,
            '-',
            {label: 'Remove from History', icon: 'backspace', val: 'remove'}
        ].filter(d=>d)).popOver(e.currentTarget.closest?.('.preset')?.querySelector('.more') || e.currentTarget, {align: 'bottom-end'})

        if( selected?.val == 'apply' ) this.pickHistory(d)
        if( selected?.val == 'merge' ) this.pickHistory(d, {shiftKey: true})
        if( selected?.val == 'remove' ){ this.filters.history.delete(d.name); this.requestUpdate() }
        if( selected?.val == 'save' ){
            this.pickHistory(d)
            this.createPreset()
        }
    }

    async clearHistory(e){
        if( !await Dialog.confirm({title: 'Clear filter history?', body: 'Only for this list, in this browser', btns: ['cancel', {label: 'Clear', color: 'red'}]}).popOver(e.currentTarget) ) return
        this.filters.history.clear()
        this.requestUpdate()
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

    // from a search result: replaces the filters with it (shift: merges it in)
    pickPreset(model, evt){
        this.presetsEl?.applyPreset({model, evt})
        this.menus = {}
        this.query = ''
        this.highlight = 0
        if( !this.narrow ) this.select(PRESETS) // (shows it applied)
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

    // pinned filters always show in the toolbar (see ../data/filters.js pinned)
    togglePin(filter){
        this.filters.togglePin(filter.key)
        this.requestUpdate()
    }

    clearFilter(filter){
        filter.value = null
        delete this.menus[filter.key]
    }

    async moreMenu(e){
        let selected = await new Menu([
            {label: 'Import Filters', icon: 'upload', description: 'From an exported file', val: 'import'},
            {label: 'Export Filters', icon: 'download', description: 'A file to share or import later', val: 'export',
                disabled: !this.filters.length}
        ]).popOver(e.currentTarget, {align: 'bottom-end'})

        if( selected?.val == 'import' ) this.renderRoot.querySelector('input[type="file"]').click()
        if( selected?.val == 'export' ) this.exportFilters()
    }

    // a .bui file (from exportFilters); merged with or replacing the current filters
    async importFilters(e){
        let input = e.currentTarget
        let [file] = input.files
        input.value = '' // (the same file can be picked again)
        if( !file ) return

        let data
        try{ data = JSON.parse(await file.text()) }catch(err){}

        let btn = this.renderRoot.querySelector('.more')
        if( !data?.filters ) throw new UIWarningError('No filters found', {target: btn})
        if( this.filters.key != data.key ) throw new UIWarningError('Wrong filters for this list', {target: btn})

        let how = 'Replace'
        if( this.filters.length ){
            let selected = await new Dialog({
                noContent: true,
                btns: [{label: 'Merge', color: 'blue'}, {label: 'Replace', color: 'red'}]
            }).popOver(btn)
            if( !selected ) return
            how = selected.val
        }

        if( how == 'Merge' )
            this.filters.update(data.filters)
        else
            this.filters.reset(data.filters, {stopQueuing: false})

        this.menus = {}
        this.requestUpdate()
    }

    // a .bui file to share, or import later (see importFilters)
    exportFilters(){
        let filters = this.filters
        let content = JSON.stringify({key: filters.key, filters: filters.value()})
        let url = URL.createObjectURL(new Blob([content], {type: 'application/json'}))

        let a = document.createElement('a')
        a.href = url
        a.download = `filters-${filters.length}-${filters.key}.bui`
        a.click()
        setTimeout(()=>URL.revokeObjectURL(url), 1000)
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
        if( e.key == 'Escape' ){
            e.stopPropagation()
            e.preventDefault()
            if( !this.query ) return this.close() // (applies, like clicking outside)
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
            if( item.preset ) this.pickPreset(item.preset, e)
            else if( item.value ) this.pickValue(item.filter, item.value)
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
// history as entries (latest first): its filters, the label/value pairs, the day heading, and the time
export function historyEntries(filters){
    let entries = []
    filters?.history.forEach((d, name)=>{
        let pairs = name.split('|').map(s=>{
            let vals = s.split(':')
            let label = vals.shift().trim()
            return {label, val: vals.join(':').trim()}
        })

        let date = new Date(d.ts)
        let today = new Date().toDateString() == date.toDateString()
        let thisYear = new Date().getFullYear() == date.getFullYear()

        entries.unshift({
            ...d,
            name,
            pairs,
            day: dateRangeLabel(d.ts, d.ts, {monthDay: false}),
            time: today || Date.now() - d.ts < 6*86400000
                ? date.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})
                : date.toLocaleDateString([], {month: 'short', day: 'numeric', year: thisYear ? undefined : 'numeric'}),
            search: name.replace(/<[^>]+>/g, '').toLowerCase()
        })
    })
    return entries
}

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

// first text input in a custom view (looks inside shadow roots)
function firstInput(el){
    let roots = [el.shadowRoot, el].filter(Boolean)
    for( let root of roots ){
        let input = root.querySelector('input:not([type=checkbox]):not([type=radio]):not([type=hidden]), textarea, [contenteditable=true]')
        if( input ) return input
        for( let child of root.querySelectorAll('*') ){
            if( child.shadowRoot ){
                let found = firstInput(child)
                if( found ) return found
            }
        }
    }
    return null
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
