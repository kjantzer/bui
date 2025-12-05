import { LitElement, html, css } from 'lit'
import Popover from 'popover'
import '../../helpers/lit/selectors'

customElements.define('b-list-settings-btn', class extends LitElement{

    static properties = {
        icon: {type: String},
        view: {type: String},
        w: {type: String}
    }

    static styles = css`
        :host {
            display: contents;
        }
    `

    constructor(){
        super()
        this.slot = 'toolbar:after'
        this.icon = 'tune'
    }

    render(){return html`
        <b-btn icon=${this.icon} text lg @click=${this.clickMenu}></b-btn>
    `}

    get el(){
        let el = this._el

        if( el ) return el

        if( typeof this.view == 'string' ){
            el = document.createElement(this.view)
            el.list = this.parentElement
            el.coll = this.parentElement.coll
        }else{
            el = this.children[0]
        }

        el.style.padding = '1em'

        this._el = el
        return el
    }

    clickMenu(){
        if( !this.el ) throw new Error('No view to open')
        new Popover(this.$$('b-btn', true), this.el, {
            align: 'bottom-end',
            width: this.w||null
        })
    }

})

export default customElements.get('b-list-settings-btn')