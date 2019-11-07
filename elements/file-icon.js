/*
    NOTE:
    - more default extension colors needed
    - need a better way of setting colors per extensions
        - want users to be able to globally override
          and set new extension colors
*/
import { LitElement, html, css } from 'lit-element'

customElements.define('b-file-icon', class extends LitElement{

    static get properties(){ return {
        ext: {type: String, reflect: true}
    }}

    static get styles(){return css`
        :host {
            display: inline-block;
            position:relative;
            --color: #fff;
            --bgd: #aaa;
            --size: 2em;
            --radius: 0px;

            width: calc(.8 * var(--size));
            height: var(--size);
            text-transform: uppercase;
        }

        :host([ext="pdf"]) {
            --bgd: #b40808;
        }

        :host([ext="doc"]),
        :host([ext="docx"]) {
            --bgd: #1645ae;
        }

        main {
            padding: 20%;
            padding-top: 30%; /* appears more center */
            box-sizing: border-box;
            position: relative;
            width: 100%;
            height: 100%;
            background: var(--bgd);
            border-radius: var(--radius);
            border-bottom: calc(var(--size) * .02) solid rgba(0, 0, 0, 0.4);
            -webkit-clip-path: polygon(0 0, 66% 0, 100% 26.4%, 100% 100%, 0 100%);
            clip-path: polygon(0 0, 66% 0, 100% 26.4%, 100% 100%, 0 100%);

            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--color);
        }

        .dogear {
            position: absolute;
            top: 0;
            right: 0;
            background: rgba(0,0,0,.4);
            border-radius: 0 0 0 var(--radius);

            height: calc(.8 * var(--size) * .34);
            width: calc(.8 * var(--size) * .34);
            -webkit-clip-path: polygon(0 0, 0% 100%, 100% 100%);
            clip-path: polygon(0 0, 0% 100%, 100% 100%);
        }

        label,
        ::slotted(*) {
            font-size: calc(var(--size) * .25);
        }

        ::slotted(b-icon) {
            /* font-size: 1em; */
        }
    `}

    render(){return html`
        <main>
            <div class="dogear"></div>
            <slot name="label">
                <label>${this.ext}</label>
            </slot>
        </main>
        <slot></slot>
    `}

})

export default customElements.get('b-file-icon')