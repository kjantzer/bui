import { LitElement, html, css } from 'lit'
import device from '../../../util/device'
import './filter-btn'
import './filter-saved-presets' // TODO: make this opt-in?
import Dialog from '../../../presenters/dialog'
import Menu from '../../../presenters/menu'
import {DownloadContent} from '../../../elements/draggable'
import readFile from '../../../util/readFile'
import '../../../elements/uploader'

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
            display: var(--b-list-filters-display, flex);
            align-items: center;
            overflow: -moz-scrollbars-none;
            flex-shrink: 1;
            position: relative;
        }

        [icon='backspace'] { display: none; }
        b-list-filter-btn[active] ~ [icon="backspace"] {
            display: inline-block;
            position: sticky;
            right: 0;
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

        b-list-filters-saved {
            border-right: solid 2px var(--theme-bgd-accent);
            padding-right: 0.25em;
            margin-right: 0.25em;
        }
    `}

    get showOverflow(){ 
        return this.filters.shouldUseOverflow
    }

    render(){return html`

        <b-draggable @will-take-action=${this.onDrag}>Export</b-draggable>
        <b-uploader accept=".bui" @change=${this.onUpload} placeholder="Import"></b-uploader>

        ${this.filters.size>0?html`
        <b-btn icon="history" title="History of applied filters" clear lg noshrink
                @click=${this.openFiltersHistory}></b-btn>
        `:''}

        ${this.filters.size>0?html`
        <b-list-filters-saved noshrink></b-list-filters-saved>
        `:''}

        ${this.showOverflow?html`

            <b-btn text @click=${this.openFiltersPanel} noshrink class="show-filters" _icon="filter">
                <main>
                    <b-label xs>Filters</b-label>
                    <div>
                        <b-icon name="filter"></b-icon>
                        ${this.filters.length} <b-text muted sm>of</b-text> <b-text muted>${this.filters.size}</b-text>
                    </div>
                </main>
            </b-btn>
        
        `:html`
            <b-btn icon="layers" ?hidden=${!this.queuing} title="Apply queued filters" clear lg noshrink
                @click=${this.applyQueuedFilters}>${this.queuing}</b-btn>
        `}

        ${this.filters.map(filter=>this.showFilter(filter)?html`
            <b-list-filter-btn ?active=${filter.isActive} .filter=${filter}></b-list-filter-btn>
        `:'')}

        <b-btn color="hover-red" title="Clear filters" icon="backspace" text @click=${this.resetFilters}></b-btn>
    `}

    async openFiltersHistory(e){
        
        let menu = this.filters.history.map((d, name)=>{
            
            let label = name.split('|').map(s=>{

                let vals = s.split(':')
                let label = vals.shift()
                let val = vals.join(':')

                return html`<b-text>
                    <b-text muted=2 italic>${label}:</b-text>
                    <b-text bold>${val}</b-text>
                </b-text>`
            })
            return {
                label: html`<b-flex gap="1" gap-row=" " left wrap>${label}</b-flex>`,
                val: d.filters,
                description: html`<b-ts .date=${d.ts}></b-ts>`,
                extras: [
                    // html`<b-ts .date=${d.ts}></b-ts>`
                ]
            }
        }).reverse() // newest first

        if( !menu.length )
            menu.push({text: 'No history yet', bgd: false})

        menu.unshift({heading: 'Applied Filters History'})

        let selected = await new Menu(menu).popOver(e.currentTarget)

        if( selected )
            this.filters.reset(selected.val, {stopQueuing: !this.filters.queuing})
    }

    onDrag(e){
        let {action} = e.detail

        if( this.filters.length == 0 )
            return action.allowed = false
        
        let filters = this.filters.value()
        let filename = `filters-${this.filters.length}-${this.filters.key}.bui`
        
        DownloadContent(action.evt, filename, {
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
        // NOTE: alwaysShow is legacy and DEPRECATED
        return !this.showOverflow || (filter.isActive || filter.attrs.alwaysShow || filter.attrs.show === true )
    }

    openFiltersPanel(){
        this.filters.openFiltersPanel()
    }

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