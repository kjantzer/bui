import { LitElement, html, css, unsafeCSS } from 'lit'
import {MediaQueries, mediaQuery} from '../util/mediaQueries'
window.MediaQueries = MediaQueries

const mediaQueryStyles = MediaQueries.map((query, q)=>mediaQuery(q, css`

    :host([show="${unsafeCSS(q)}"]) {
        display: contents;
    }

    :host([hide="${unsafeCSS(q)}"]) {
        display: none;
    }
`))

customElements.define('b-media-query', class extends LitElement{

    static get properties(){return {
        show: {type: String, reflect: true},
        hide: {type: String, reflect: true}
    }}

    static get styles(){return [css`

        :host([show]) {
            display: none;
        }

    `].concat(mediaQueryStyles)}

    render(){return html`
        <slot></slot>
    `}

})
