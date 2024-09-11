/*
    # X-out

    Cross out an element. Inspired by: https://codepen.io/nelsonleite/pen/jMjMdB

    ```html-preview
    <div style="height: 4em">
        <b-x-out></b-x-out>
    </div>
    ```
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-x-out', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        :host([hidden]) { display:  none !important; }

        svg {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        svg line {
            stroke: var(--line-color, var(--theme-bgd-accent));
            stroke-width: var(--line-width, 1);
        }
    `

    render(){return html`
        <svg>
            <line x1="0" y1="100%" x2="100%" y2="0"></line>
            <line x1="0" y1="0" x2="100%" y2="100%"></line>
        </svg>
    `}

})

export default customElements.get('b-x-out')