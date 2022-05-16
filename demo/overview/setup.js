import { LitElement, html, css } from 'lit'
import docs from '../../docs/setup.md'

customElements.define('demo-setup', class extends LitElement{

    static get title(){ return 'Setup' }
    static get id(){ return 'setup' }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }

        main {
            margin: var(--view-gutter, 2em) auto;
            /* width: 900px; */
            max-width: calc(100% - (var(--view-gutter, 2em)*2));
        }

        b-paper {
            min-height: 70vh;
        }
        
    `}

    render(){return html`
        <main>
        
        <b-paper>

            <demo-markdown-docs .docs=${docs}></demo-markdown-docs>

        </b-paper>


        </main>
    `}

})

export default customElements.get('demo-setup')