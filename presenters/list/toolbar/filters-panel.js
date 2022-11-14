import { LitElement, html, css } from 'lit'
import Panel from '../../panel'
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
            overflow: auto !important;
            padding: 1em;
            /* padding-top: 0; */
            padding-bottom: calc(1em + var(--safe-bottom));
            padding-left: calc(1em + var(--safe-left));
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

        @media (max-height: 599px) and (orientation:landscape) {
            b-grid {
                grid-template-columns: 1fr 1fr 1fr;
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
            animation: 'drop',// device.isSmallDevice ? 'drop': 'slide',
            anchor: 'top', //device.isSmallDevice ? 'top': 'left',
            width: '100%', // device.isSmallDevice ? '100%' : '400px',
            height: 'auto'
            // height: device.isSmallDevice ? '80%' : '100% '
        }).open()
        
        this.__originalFilters = this.filters.value()
        this.filters.queuing = true
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
                    <b-text sm italic muted>or click the overlay to apply</b-text>
                </b-media-query>
            </div>

            <span>
                <b-btn sm clear ucase bold @click=${this.reset}>RESET</b-btn>
                <b-hr vert></b-hr>
                
                <b-btn sm clear ucase bold @click=${this.cancel}>CANCEL</b-btn>

            </span>
        </header>
        
        <main>

            <b-flex wrap left _cols-mobile=1>

                ${this.filters.opts.presets?html`
                <b-list-filter-presets colspan=2 .filters=${this.filters}></b-list-filter-presets>
                `:''}

            ${this.filters.map(filter=>html`
                <b-list-filter-btn larger ?active=${filter.isActive} .filter=${filter}></b-list-filter-btn>
            `)}

            </b-flex>

        </main>
    `}

})

export default customElements.get('b-list-filters-panel')