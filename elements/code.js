import { LitElement, html, css } from 'lit'

customElements.define('b-code', class extends LitElement{

    static get styles(){return css`

        :host {
            background: rgba(var(--theme-text-rgb, 0,0,0), .2);// var(--theme-bgd-accent, #ccc);
            color: var(--theme-text, inherit);
            border-radius: 3px;
            padding: 0 .3em;
            display: inline-block;
            line-height: 1em;
        }

        code {
            color: inherit;
        }

        :host([block]) {
            display: block;
            font-family: monospace;
            padding: 1em;
            overflow-x: auto;
        }

        :host([block]) code {
            white-space: pre-wrap;
        }
    `}

    connectedCallback(){
        super.connectedCallback()

        clearTimeout(this._trimText)
        this._trimText = setTimeout(()=>{

            // NOTE: this technique keeps lit.dev working properly
            this.childNodes.forEach(node=>{
                if( node.nodeName == '#text' )
                    node.textContent = node.textContent.trim()
            })
        }, 10)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        clearTimeout(this._trimText)
    }

    render(){return html`
        <code><slot></slot></code>
    `}

})

export default customElements.get('b-code')