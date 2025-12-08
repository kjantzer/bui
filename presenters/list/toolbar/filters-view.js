import { LitElement, html, css } from 'lit'
import device from '../../../util/device'
import './filter-btn'
import './filter-saved-presets' // TODO: make this opt-in?
import Dialog from '../../../presenters/dialog'
import Menu from '../../../presenters/menu'
import {dataTransfer} from '../../../elements/dragdrop'
import readFile from '../../../util/readFile'
import '../../../elements/uploader'
import '../../../components/term-search'
import {label as dateRangeLabel} from '../../datepicker/daterange'

customElements.define('b-list-filters', class extends LitElement{

    static get properties(){return {
        expanded: {type: Boolean, reflect: true},
        count: {type: Number},
        queuing: {type: Number}
    }}

    constructor(){
        super()
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        // this.onFilterQueuing = this.onFilterQueuing.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    static get styles(){return css`
        :host {
            display: var(--b-list-filters-display, flex);
            gap: 1px;
            margin-left: -1px;
            align-items: center;
            overflow: -moz-scrollbars-none;
            flex-shrink: 0;
            position: relative;
        }

        :host(:not([expanded])) b-list-filter-btn:not([active]):not([always]){
            display: none;
        }

        :host(:not([expanded])) b-term-search::part(text-field),
        :host(:not([expanded])) b-term-search::part(clear-btn),
        :host(:not([expanded])) .when-open {
            display: none;
        }

        b-term-search {
            align-self: stretch;
            position: sticky;
            left: 0;
            z-index: 10;
            overflow: hidden;
            background: var(--theme-bgd);
        }

        b-term-search::part(text-field) {
            margin-bottom: -2px; /* baseline align */  
            width: 44px;
        }

        b-term-search > b-btn:first-child::part(main) {
            padding-left: .35em;
            padding-right: .35em;
        }

        b-term-search .queue-btns {
            order: 10;
            margin-right: .5em;
        }

        b-term-search[notextfield]::part(text-field),
        b-term-search[notextfield]::part(clear-btn) {
            display: none;
        }
/*
        b-term-search b-btn::part(icon) {
            font-size: 1.2em;
            margin-right: 0;
            margin-bottom: -.2em;
            margin-top: -2px;
        }

        :host([expanded ]) b-term-search b-btn::part(icon) {
            margin-top: -2px;
        }*/

        :host([expanded]) b-term-search {
            
            /* box-shadow: 0 0 0 1px var(--theme-shadow) inset; */
            /*background: var(--theme-bgd-accent);*/
            border-radius: 4px;
            /* border-right: dashed 1px var(--theme-shadow); */
            /* background: var(--theme-bgd); */
            margin-right: .25em;
        }

        :host([expanded]) b-term-search:focus-within {
            /*box-shadow: none;
            background: var(--theme-bgd-accent);*/
            /*background: color-mix(in srgb, var(--theme) 15%, transparent);*/
            /* box-shadow: 0 0 0 1px var(--theme) inset; */
        }

        :host([expanded]) b-term-search:focus-within > b-btn:first-child {
            color: var(--theme);
        }

        :host([expanded]) b-term-search b-btn {
            --bgdColor: transparent;
        }

        :host([expanded]) b-term-search-results {
            /*--active-bgd: color-mix(in srgb, var(--theme) 10%, transparent);*/
            --active-color: var(--theme);
        }

        b-term-search-results {
            display: contents;
        }

        /*[icon='backspace'] { display: none; }*/

        .end {
            position: sticky;
            right: 0;
            background-color: var(--theme-bgd);
            flex-shrink: 0;
        }

        b-list-filter-btn, [noshrink] {
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
            top: -0.65em;
            /* opacity: .4; */
        }

        .show-filters b-icon {
            font-size: .8em;
            vertical-align: middle;
            margin-top: -1px;
            color: var(--toolbarTextColor);
            opacity: .4;
        }

        b-dragdrop {
            --radius: 4px;
        }
    `}

    get showOverflow(){ 
        return this.filters.shouldUseOverflow
    }

    get showOverflowBtn(){
        return this.filters.size && this.filters.opts?.filterBtn !== false // NOTE: no sure I like this option name
    }

    render(){return html`

        <b-dragdrop @dragged=${this.onDrag}>Export</b-dragdrop>
        <b-uploader accept=".bui" @change=${this.onUpload} placeholder="Import"></b-uploader>

        <b-term-search .coll=${this.filters} placeholder="Filter by..." @hide=${this.hide} ?hidden=${this.filters.size==0}
        ?notextfield=${this.filters.opts?.filterByTextField===false}>
            
            <b-btn icon="filter" slot="prefix" text lg @click=${this.toggle} @contextmenu=${this.options}
            tooltip="Filter by (F)"></b-btn>

            <b-flex gap=0 right class="queue-btns" slot="prefix" ?hidden=${this.queuing==undefined}>
                <b-btn sm color="theme-gradient" pill @click=${this.stopQueue} >Apply</b-btn>
                <b-btn sm pill muted @click=${this.hide} icon="close"></b-btn>
            </b-flex>

        </b-term-search>

        ${this.showOverflowBtn?html`

        
        `:html`
            <b-btn icon="layers" ?hidden=${!this.queuing} title="Apply queued filters" clear lg noshrink
                @click=${this.applyQueuedFilters}>${this.queuing}</b-btn>
        `}

        <b-term-search-results .coll=${this.filters} .item=${item=>html`

            <b-list-filter-btn 
                ?focus=${item.active}
                ?active=${item.val.isActive}
                ?_always=${item.val.attrs.alwaysShow}
                .filter=${item.val}
            ></b-list-filter-btn>

        `}></b-term-search-results>
        

        <b-flex gap=0 class="end">

            <b-btn  tooltip="Clear filters (C)" icon="backspace" lg text empty @click=${this.resetFilters} ?hidden=${!this.filters.length}></b-btn>

            ${this.filters.size>0&&this.filters.opts?.presets!==false?html`
            <b-list-filters-saved .filters=${this.filters}></b-list-filters-saved>
            `:''}

            ${this.filters.opts?.presets!==false?html`
            <b-btn lg text @click=${this.viewHistory} icon="history" tooltip="Filter history" class="when-open"></b-btn>
            `:''}

        </b-flex>
    `}

    hide(){
        this.expanded = false
        this.$$('b-term-search')?.clear()
        // this.stopQueue()
        this.cancelQueuedFilters()
    }

    show(e){
        let queue = e?.metaKey || e?.ctrlKey || e?.shiftKey

        this.expanded = true

        if( queue )
            this.startQueue()

        setTimeout(()=>{
            this.$$('b-term-search')?.focus()
        })
    }

    toggle(e){
        this.expanded && !e.metaKey && !e.ctrlKey ? this.hide(e) : this.show(e)
    }

    options(e){

        e.stopPropagation()
        e.preventDefault()
        return this.show({metaKey: true})

        if( !this.expanded ) return

        e.stopPropagation()
        e.preventDefault()

        let menu = [
            {label: 'Queue', icon: 'layers', fn: 'startQueue'},
            // {label: 'Cancel', icon: 'cancel', fn: 'stopQueue'},
        ]

        new Menu(menu, {handler: this, handlerArgs: [e]}).popOver(e.currentTarget)
    }

    onDrag(e){
        let {action} = e.detail

        if( this.filters.length == 0 )
            return action.allowed = false
        
        let filters = this.filters.value()
        let filename = `filters-${this.filters.length}-${this.filters.key}.bui`
        
        dataTransfer.downloadContent(action.evt, filename, {
            key: this.filters.key,
            filters
        })
    }

    async onUpload(e){
        let uploader = e.currentTarget
        let [file] = uploader.files
        if( !file ) return
        let data = await readFile(file)
        data = JSON.parse(data)

        if( !data.filters ) throw new UIWarningError('No filters found')
        if( this.filters.key != data.key ) throw new UIWarningError('Wrong filters for this list')

        if( this.filters.length == 0 )
            return this.filters.reset(data.filters)

        let how = await new Dialog({
            noContent: true,
            btns: [{label: 'Merge', color: 'blue'}, {label: 'Replace', color: 'red'}]
        }).popOver(uploader.parent)

        if( !how ) return

        if( how.val == 'Merge' )
            this.filters.update(data.filters)
        else
            this.filters.reset(data.filters)
    }

    showFilter(filter){
        if( filter.attrs.show === false ) return false

        let defaultVal = this.filters.opts.overflowDefaultShowAll ? false : true

        // NOTE: alwaysShow is legacy and DEPRECATED - use `show`
        return !this.showOverflow || (
            filter.isActive 
            || filter.attrs.alwaysShow == defaultVal
            || (filter.attrs.show||false) == defaultVal
        )
    }

    applyQueuedFilters(){
        this.filters.queuing = false
    }

    resetFilters(){
        this.filters.reset({}, {stopQueuing: false})
    }

    connectedCallback(){
        super.connectedCallback()

        if( this.filters ){
            this.filters.on('show', this.show)
            this.filters.on('hide', this.hide)
            // this.filters.on('queuing', this.onFilterQueuing)
            this.filters.on('change', this.onFilterChange)
        }
        
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        
        if( this.filters ){
            this.filters.off('show', this.show)
            this.filters.off('hide', this.hide)
            // this.filters.off('queuing', this.onFilterQueuing)
            this.filters.off('change', this.onFilterChange)
        }
    }

    // onFilterQueuing(length){
    //     this.queuing = length
    // }

    onFilterChange(){
        this.update()
    }


    toggleQueue(e){
        if( this.queuing === undefined ){
            this.startQueue()
        }else{
            this.stopQueue()
        }
    }

    startQueue(){
        if( this.queuing ) return
        this.__originalFilters = this.filters.value()
        this.filters.queuing = true
        this.queuing = 0
        // this.requestUpdate()
    }

    stopQueue(){
        delete this.__originalFilters
        this.filters.queuing = false
        this.queuing = undefined
        this.hide()
    }

    cancelQueuedFilters(){
        if( this.__originalFilters )
            this.filters.reset(this.__originalFilters, {stopQueuing:false})
        if( this.queuing !== undefined )
            this.toggleQueue()
    }

    async viewHistory(e){
        
        let history = this.filters?.history.map((d, name)=>{

            let vals = name.split('|').map((s,i)=>{
                    
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

        }).reverse() // newest first

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

        let selected = await new Menu(menu, {
            search: {placeholder: 'Filter history...'}
        }).popOver(e.currentTarget, {width: '800px', overflowBoundry: 'window'})

        if( !selected ) return

        // this.filters.queuing = true
        this.filters.reset(selected.filters, {stopQueuing: false})
    }

})

export default customElements.get('b-list-filters')