import { LitElement, html, css } from 'lit-element'
import { Notif } from '../../dialog'
import Menu, { Dialog } from '../../menu'

customElements.define('b-list-filter-presets', class extends LitElement{

    static get properties(){return {
        changed: {type: Boolean}
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            
        }

        header {
            padding: 0 .5em .5em;
        }

        main {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    `}

    constructor(){
        super()
        this.onFilterChange = this.onFilterChange.bind(this)
    }
    
     connectedCallback(){
        super.connectedCallback()

        if( this.filters ){
            this.filters.on('change-queue', this.onFilterChange)
        }
        
    }

    disconnectedCallback(){
        super.disconnectedCallback()

        this.changed = false
        this.preset = null
        
        if( this.filters ){
            this.filters.off('change-queue', this.onFilterChange)
        }
    }

    onFilterChange(...args){
        this.changed = true
    }

    render(){return html`

        <!-- <header>
            <b-text sm bold ucase block>Preset</b-text> 
        </header> -->

        <b-paper dense noshadow color="gray" @click=${this.choosePreset}>
        <main>

            <b-text>
                <b-text sm bold ucase block style="margin-bottom: .15em">Preset</b-text> 
                <b-text md>${this.label}</b-text>
                <b-text muted sm block>${this.preset&&this.preset.description}</b-text>
                <!-- <b-text sup><b-label dot badge="orange" ?hidden=${!this.changed}></b-label></b-text> -->
            </b-text>

            <div>

                <b-btn clear color="blue" @click=${this.savePreset} 
                    ?hidden=${!this.changed||!this.preset} 
                    ?disabled=${this.preset&&!this.preset.isUser}>Update</b-btn>

                <b-btn clear color="green" @click=${this.createPreset} 
                    ?hidden=${!this.changed&&this.preset}>New</b-btn>

                <b-btn clear icon="settings" @click=${this.showOptions} 
                    ?hidden=${!this.preset}
                    ?disabled=${this.preset&&!this.preset.isUser}></b-btn>
            </div>

        <!-- <b-btn clear icon="save"></b-btn> -->

        </main>

        </b-paper>

        <!-- <b-hr thick short></b-hr> -->

    `}

    get label(){
        return this.preset && this.preset.label || 'Custom'
    }

    get presets(){ return this.filters.presets }

    async choosePreset(e){
        let menu = this.presets.toMenu()

        if( menu.length == 0 )
            menu.push({text: 'No presets created'})

        let selected = await new Menu(menu).popover(e.currentTarget)
        if( !selected ) return
        
        this.preset = this.presets.get(selected.val)
    }

    set preset(val){
        this.__preset = val

        if( this.preset )
            this.filters.reset(this.preset.filters, {stopQueuing:false, silent: true})

        this.changed = false
        this.update()
    }

    get preset(){ return this.__preset }

    showOptions(e){
        e.stopPropagation()

        new Menu([
            {label: 'Change Name', icon: 'pencil', fn: 'changeName'},
            'divider',
            {label: 'Delete', icon: 'trash', fn: 'destroy'},
        ], {handler: this}).popover(e.currentTarget)
    }

    async changeName(){
        if( !this.preset ) return

        let attrs = await Dialog.prompt({
            icon: 'filter',
            title: this.preset.label,
            prompts: [
                {label: 'Name', key: 'label', val: this.preset.label},
                {label: 'Description', key: 'description', description: this.preset.description, placeholder: '(optional)'}
            ]
        }).modal()
        
    
        if( !attrs || !attrs.label ) return

        Object.assign(this.preset, attrs)

        this.update()
    }

    savePreset(e){

        e.stopPropagation()

        if( this.filters.length == 0 )
            return Notif.alert('No filters selected')

        this.preset.filters = this.filters.value()
        this.changed = false
    }

    async destroy(){
        if( !this.preset ) return
        if( !await Dialog.confirmDelete().popover(this) )
            return 
        this.preset.destroy()
        this.preset = null
    }

    async createPreset(e){

        e.stopPropagation()

        if( this.filters.length == 0 )
            return Notif.alert('No filters selected')

        let attrs = await Dialog.prompt({
            title: 'Create Filter Preset',
            icon: 'filter',
            body: this.filters.length+' filters',
            prompts: [
                {label: 'Name', key: 'label'},
                {label: 'Description', key: 'description', placeholder: '(optional)'}
            ]
        }).modal()

        if( !attrs.label ) return

        attrs.filters = this.filters.value()

        this.preset = this.presets.add(attrs)
    }

})

export default customElements.get('b-list-filter-presets')