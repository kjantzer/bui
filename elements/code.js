import { LitElement, html, css } from 'lit-element'

customElements.define('b-code', class extends LitElement{

    static get styles(){return css`

        :host {
            background: var(--gray-100);
            border-radius: 3px;
            color: initial;
            padding: 0 .3em;
        }

        code {
            color: inherit;
        }

        :host([block]) {
            display: block;
            font-family: monospace;
            padding: 1em;
        }

        :host([block]) code {
            white-space: pre-wrap;
        }
    `}

    connectedCallback(){
        super.connectedCallback()
        this.innerText = this.innerText.trim()
    }

    render(){return html`
        <code><slot></slot></code>
    `}

})

export default customElements.get('b-code')