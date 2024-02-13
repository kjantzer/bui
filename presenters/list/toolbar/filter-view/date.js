import { LitElement, html, css } from 'lit'
import Datepicker from '../../../datepicker'

customElements.define('b-list-filter-view-date', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            position:relative;
            padding: 0;
        }
        
        b-datepicker {
            border-top: solid 1px var(--theme-bgd-accent, #ddd);
            --date-picker-height: 50vh;
        }
    `}

    constructor(opts={}){
        super()
        
        this.opts = Object.assign({
            defaultLabel: '–',
            range: true,
            presets: []
        }, opts)
    }

    get datepicker(){

        if( !this.__datepicker ){
            this.__datepicker = new Datepicker({
                btns: {clear: true},
                value: this.value,
                range: this.opts.range,
                presets: this.opts.presets,
                applyPresetSelect: true // will apply the selected preset when clicked
            })

            this.datepicker.addEventListener('done', e=>{

                if( e.detail.action == 'apply')
                    this.__value = this.opts.range 
                        ? [e.detail.value.start, e.detail.value.end]
                        : [e.detail.value, e.detail.value] 
                else if( e.detail.action == 'clear')
                    this.clearDates()
                else
                    this.datepicker.value = this.__value || new Date()

                this.close()

            })
        }

        return this.__datepicker
    }

    render(){return html`

        <div>${this.opts.header||''}</div>

        ${this.datepicker}

        <div>${this.opts.footer||''}</div>
    `}

    clearDates(){
        this.__value = null
        this.datepicker.value = new Date()
        this.close()
    }

    connectedCallback(){
        super.connectedCallback()
        this.datepicker.value = this.__value
    }

    get value(){

        if( this.__value === undefined )
            this.__value = this.filter.value
        
        return this.__value
    }

    set value(val){
        this.__value = val
        this.datepicker.value = val
    }

    get label(){
        return this.value ? this.datepicker.label : this.opts.defaultLabel
    }

})

export default customElements.get('b-list-filter-view-date')