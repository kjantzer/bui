import { LitElement, html, css } from 'lit-element'
import '../markdown-docs'
import docs from 'bui/util/README.md'

customElements.define('demo-util', class extends LitElement{

    static get title(){ return 'Util' }
    static get icon(){ return 'wrench' }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            padding: var(--view-gutter);
            max-width: 100%;
        }
        
        :host > b-paper {
          width: 1100px;
          max-width: 100%;
          margin: 0 auto;
		  padding: var(--view-gutter);
        }

        b-h1 {
            border-bottom: solid 4px var(--theme-bgd-accent);
            padding-bottom: .15em;
            margin-bottom: 1em;
        }
    `}

    render(){return html`
    	<b-paper>
            <b-h1>Util</b-h1>
			<demo-markdown-docs .docs=${docs}></demo-markdown-docs>
		</b-paper>
    `}

})

export default customElements.get('demo-util')