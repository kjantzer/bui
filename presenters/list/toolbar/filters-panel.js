import { LitElement, html, css } from 'lit'
import Panel from '../../panel'
import Menu from '../../menu'
import device from '../../../util/device'
import './filter-presets'

customElements.define('b-list-filters-panel', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            position:relative;
            box-sizing: border-box;
            grid-template-rows: 1fr auto;
        }

        main {
            display: grid;
            grid-template-rows: auto 1fr;
        }

        main > b-text-divider {
            margin: 1em 1em 0 1em;
        }

        main > section {
            padding: .5em;
            overflow: auto !important;
        }

        header {
            padding: .5em 1em .5em;
            border-top: solid 1px var(--theme-bgd-accent);
            order: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        b-list-filter-presets {
            width: 400px;
            max-width: 100%;
        }
        
        .main {
            grid-template-rows: 1fr;
            height: 70vh;
        }

        b-menu {
            border-left: solid 2px var(--theme-bgd-accent)
        }

        @media (max-width: 599px) {
            .main {
                grid-template-columns: 1fr;
                grid-template-rows: 2fr 1fr;
            }

            b-menu {
                border-left: none;
                border-top: solid 4px var(--theme-bgd-accent)
            }
        }
    `}

    open({filters, sorts}={}){

        if( this.panel )
            return this.panel.close()

        this.sorts = sorts
        this.filters = filters

        new Panel(this, {
            title: 'Filters',
            controller: 'b-list:'+filters.key,
            animation: 'drop', //device.isSmallDevice ? 'drop': 'slide',
            anchor: 'top',// device.isSmallDevice ? 'top': 'left',
            width: '800px', // device.isSmallDevice ? '100%' : '400px',
            height: 'auto'
            // height: device.isSmallDevice ? '80%' : '100% '
        }).open()
        
        this.__originalFilters = this.filters.value()
        this.filters.queuing = true
        
        this.requestUpdate()
    }

    onClose(){
        this.__originalFilters = null
        this.filters.queuing = false
        this.panel = null
    }

    close(){
        this.panel&&this.panel.close()
    }

    cancel(){
        this.filters.reset(this.__originalFilters, {stopQueuing:false})
        this.close()
    }

    reset(){
        this.filters.reset({}, {stopQueuing:false})
    }

    render(){return html`

        <header>

            <div>
                <b-btn sm ucase color="theme" bold @click=${this.close}>APPLY</b-btn>
                <b-media-query hide="sm">
                    <b-text sm italic muted>&nbsp; or click the overlay to apply</b-text>
                </b-media-query>
            </div>

            <span>
                <b-btn sm clear ucase bold @click=${this.reset}>CLEAR ALL</b-btn>
                <b-hr vert></b-hr>
                
                <b-btn sm clear ucase bold @click=${this.cancel}>CANCEL</b-btn>

            </span>
        </header>

        <b-grid class="main" gap=0>

            <main>
                <b-text-divider bottom xbold icon="filter">Filters</b-text-divider>
                <section>
                <b-grid cols=1 cols-mobile=1 gap=" ">

                    ${this.filters.opts.presets?html`
                    
                    `:''}

                ${this.filters.map(filter=>html`
                    <b-list-filter-btn full ?active=${filter.isActive} .filter=${filter}></b-list-filter-btn>
                `)}

                </b-grid>
                </section>

            </main>

            ${this.historyMenu()}

        </b-grid>
    `}

    historyMenu(){
        
        let menu = this.filters.history.map((d, name)=>{
            
            let label = name.split('|').map(s=>{

                let vals = s.split(':')
                let label = vals.shift()
                let val = vals.join(':')

                return html`<b-flex col gap="0">
                    <b-text dim italic sm>${label}</b-text>
                    <b-text semibold>${val}</b-text>
                </b-flex>`
            })
            return {
                label: html`<b-flex gap="1" gap-row=" " left wrap>${label}</b-flex>`,
                val: d.filters,
            }
        }).reverse() // newest first

        if( !menu.length )
            menu.push({text: 'No filters used yet', bgd: false})

        this._historyMenu = this._historyMenu || new Menu([], {
            header: html`<b-text-divider bottom xbold icon="history">Previously Used</b-text-divider>`,
            search: false,
            onSelect: this.onHistorySelect.bind(this),
        })

        this._historyMenu.updateMenu(menu)

        return this._historyMenu
    }

    onHistorySelect(selected){
        this.filters.reset(selected.val, {stopQueuing: false})
    }

})

export default customElements.get('b-list-filters-panel')