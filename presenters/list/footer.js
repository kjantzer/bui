import { css } from 'lit'
import Header from './header'

customElements.define('b-list-footer', class extends Header{

    static get sharedStyles(){ return [super.sharedStyles, css`
        :host > * {
            border-bottom: none;
            border-top: solid 1px var(--border-color, rgba(var(--theme-text-rgb), .1));
        }
    `]}

    constructor(){
        super()
        this.slot = "footer"
    }
})

export default customElements.get('b-list-footer')