import { LitElement, html, css } from 'lit'
import device from '../../../util/device'
import './filter-btn'
import './filter-saved-presets' // TODO: make this opt-in?
import Dialog from '../../../presenters/dialog'
import Menu from '../../../presenters/menu'
import {dataTransfer} from '../../../elements/dragdrop'
import readFile from '../../../util/readFile'
import '../../../elements/uploader'
import FiltersPopover, {historyMenu} from './filters-popover'
import './filter-chip'

/*
    List filters in the toolbar

    - Filters btn (with how many are on): opens every filter in a popover (a sheet on phones; see ./filters-popover.js)
    - a chip for each active filter (click to change it, ✕ to clear it)
    - pinned filters as quick dropdowns: only for lists that opt in (`options: {pins: true}`), their filters with `show: true`

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

        .filters-btn .count {
            display: inline-grid;
            place-items: center;
            min-width: 1.3em;
            height: 1.3em;
            padding: 0 .3em;
            margin-left: .15em;
            border-radius: 1em;
            background: var(--theme);
            color: var(--theme-bgd);
            font-size: .75em;
            font-weight: 700;
            box-sizing: border-box;
        }

        b-list-filter-btn, b-list-filter-chip, [noshrink] {
            flex-shrink: 0;
        }

        b-dragdrop {
            --radius: 4px;
        }
    `}

    get activeFilters(){
        return this.filters.map(f=>f).filter(f=>f.isActive && f.attrs.show !== false)
    }

    // quick dropdowns: lists opt in (`options.pins`); their `show: true` filters (active ones are chips)
    get pinnedFilters(){
        if( !this.filters.opts?.pins ) return []
        return this.filters.map(f=>f).filter(f=>f.attrs.show === true && !f.isActive)
    }

    render(){return html`

        <b-dragdrop @dragged=${this.onDrag}>Export</b-dragdrop>
        <b-uploader accept=".bui" @change=${this.onUpload} placeholder="Import"></b-uploader>

        <b-btn icon="filter" text lg pill class="filters-btn" ?hidden=${this.filters.size==0}
            @click=${()=>this.show()} tooltip="Filters (f)"
        >${this.filters.length?html`<span class="count">${this.filters.length}</span>`:''}</b-btn>

        ${this.activeFilters.map(filter=>html`
            <b-list-filter-chip .filter=${filter} @open-filter=${()=>this.show({filter: filter.key})}></b-list-filter-chip>
        `)}

        ${this.pinnedFilters.map(filter=>html`
            <b-list-filter-btn visible .filter=${filter}></b-list-filter-btn>
        `)}
    `}

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
        }
        
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        
        if( this.filters ){
            this.filters.off('show', this.show)
            this.filters.off('hide', this.hide)
            this.filters.off('change', this.onFilterChange)
            this.filters.off('reset', this.onFilterChange)
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