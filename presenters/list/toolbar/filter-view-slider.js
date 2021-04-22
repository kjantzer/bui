import { LitElement, html, css } from 'lit'

customElements.define('b-list-filter-view-slider', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            position:relative;
            padding: .25em;
        }

        range-slider {
            width: 100%;
            margin: 1em 1.5em .5em 1.5em;
        }
    `}

    constructor(opts={}){
        super()
        
        this.opts = Object.assign({
            range: false,
            min: 0,
            max: 100,
            step: 1,
            label: 'show',
            width: '160px',
            prefix: '',
            suffix: ''
        }, opts)
    }

    render(){return html`
        
        <b-btn text @click=${this.clearVal}>Clear</b-btn>

        <b-hr></b-hr>

        <range-slider 
            style="width:${this.opts.width}"
            @change=${this.onChange}
            ?range=${this.opts.range}
            min=${this.opts.min}
            max=${this.opts.max}
            step=${this.opts.step}
            label=${this.opts.label}
            .value=${this.value}
        ></range-slider>
    `}

    clearVal(){
        this.value = null
        
        this.shadowRoot.querySelector('range-slider').reset()
        this.close()
    }

    onChange(e){
        this.value = e.target.value
        // this.close()
    }

    get value(){

        if( this.__value === undefined )
            this.__value = this.filter.value || null

        return this.__value
    }

    set value(val){
        // let oldVal = this.value
        this.__value = val
        // this.requestUpdate('value', oldVal)
    }

    get label(){
        let val = this.value
        
        if( val === null || val === '' ) return '–'

        let str = Array.isArray(val) ? (val[0] == val[1] ? val[0] : val.join('-')) : val

        return this.opts.prefix+str+this.opts.suffix
    }

})

export default customElements.get('b-list-filter-view-slider')