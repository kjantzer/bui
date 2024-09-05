/*
    - TODO: support localstorage cache in place of DB; let developer decide what is to be used
    - TODO: combine with older "filter-presets.js"
    - TODO: update preset when applied and some filters are invalid?
*/
import { LitElement, html, css } from 'lit'
import Coll, {edit} from './models'
import {Menu} from 'bui'
import 'bui/helpers/lit/willTakeAction'
import './item'

customElements.define('b-list-filters-saved', class extends LitElement{

    static properties = {
        changed: {type: Boolean, reflect: true}
    }

    static listeners = {
        coll: {'reset add remove': 'requestUpdate'},
        model: {
            'change:name': 'requestUpdate',
            'destroy': 'onModelDestroyed'
        }
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
        }

        main {
            display: inline-grid;
            line-height: 1.2em;
            margin-bottom: -.25em;
        }

        b-label {
            color: var(--toolbarTextColor);
            margin: -0.5em 0px;
            position: relative;
            top: -0.65em;
        }

        [active] b-label {
            color: var(--theme);
        }

        b-icon {
            vertical-align: top;
        }
    `

    constructor(){
        super()
        this.coll = new Coll()
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    connectedCallback(){
        super.connectedCallback()
        this.setup()
    }

    async setup(){
        this.coll.reset()

        let filters = this.filters || this.parentElement?.filters

        if( !filters && !this.parentElement ){
            filters = this.getRootNode()?.host?.filters
        }

        if( filters ){

            this.filters = filters
            this.coll.key = this.filters.key

            if( window.Backbone )
                await this.coll.fetchSync()

            let active = this.coll.findMatchesFilters(this.filters.value())

            // let filters = JSON.stringify(this.filters.value())
            // let active = this.coll.find(m=>{
            //     return JSON.stringify(m.get('filters')) == filters
            // })

            if( active ){
                this.model = active
                this.evaluateFilters()
            }
        }
    }

    set filters(val){
        let oldVal = this.filters
        this.__filters = val

        if( oldVal ){
            oldVal.off('change', this.onFilterChange)
        }
    
        if( val ){
            val.on('change', this.onFilterChange)
        }

        this.requestUpdate('filters', oldVal)
    }
    
    get filters(){ return this.__filters}

    onModelDestroyed(){
        this.model = null
        this.changed = false
    }

    onFilterChange(value){
        let active = this.coll.findMatchesFilters(this.filters.value())
        if( active )
            this.model = active

        this.evaluateFilters()
    }

    evaluateFilters(){

        if( !this.model )return

        // filters were reset, so clear the "selected" set
        if( this.filters.length == 0 )
            this.model = null
        
        this.changed = this.model && !this.coll.filtersMatchModel(this.filters.value(), this.model)
         //JSON.stringify(this.model.get('filters')) != JSON.stringify(this.filters.value())
    }

    render(){return html`

        <b-grid gap=".25" cols=1 ?active=${this.model}>

            <b-text>
                <b-text bold sm ?gradient=${this.model}>
                    Presets
                </b-text>
            </b-text>

            <b-text heading ?dim=${!this.model}>
                ${this.model?this.model.get('name'):html`
                    ${this.coll.length==0?'None':this.coll.length+' Avail.'}
                `}
                ${this.changed?html`
                    <b-icon name="pencil"></b-icon>
                `:''}
            </b-text>

        </b-grid>
    `}

    clickMenu(){ this.showMenu() }

    async showMenu(){

        let menu = this.coll.map(m=>{
            return {
                toolbarLabel: m.get('name'),
                dataTitle: m.get('name'),
                label: html`<b-list-filter-set-item .model=${m}></b-list-filter-set-item>`,
                val: m.id,
                model: m
            }
        }).filter(d=>d.val!=this.model?.id)


        if( menu.length > 0 ){
            menu.unshift('-', {heading: this.model ? 'Other Presets': 'Presets'})
            menu.push({text: html`<b>Tip:</b> click to replace all filters with this preset.
                <br>Shift+click to merge with the currently applied filters.`})
        }

        if( this.model ){

            if( this.changed && this.willTakeAction('list:preset:edit').allowed )
            menu.unshift({
                label: 'Update with current filters',
                icon: 'sync_alt',
                fn: 'updateModel'
            })

            menu.unshift({
                heading: 'Active Preset'
            },{
                label: html`
                    <b-list-filter-set-item .model=${this.model}></b-list-filter-set-item>
                `,
                val: this.model.id,
                model: this.model
            })

        }

        if( (!this.model || this.changed) && this.filters.length > 0 ){

            if( this.willTakeAction('list:preset:create').allowed )
            menu.unshift({
                label: 'Create new preset',
                icon: 'add_box',
                fn: 'saveFilters'
            }, '-')
        }

        if( menu.length == 0 )
            menu.push({text: html`No presets avilable.<br>Apply some filters to create a new preset.`, bgd: false})

        let selected = await new Menu(menu, {search: 10, width: '400px', handler: this}).popOver(this, {align: 'right'})

        if( !selected ) return

        if( !selected.evt.shiftKey )
            this.model = selected.model

        this.filters[selected.evt.shiftKey?'update':'reset'](selected.model.get('filters'), {stopQueuing: false})

        // track how many times used
        selected.model.saveSync({use_count: selected.model.get('use_count')+1}, {patch: true})
    }

    updateModel(){
        this.model.saveSync({filters: this.filters.value()}, {patch: true})
        this.changed = false
    }

    async saveFilters(){

        let attrs = await edit.call(this)

        if( !attrs ) return
        if( !attrs.name ) throw new UIWarningError('Name required')

        attrs.filters = this.filters.value()

        let [m] = await this.coll.createSync(attrs, {wait: true})
        this.model = m
        this.changed = false
    }

    async editActive(){
        edit.call(this, this.model)
    }

})

export default customElements.get('b-list-filters-saved')

