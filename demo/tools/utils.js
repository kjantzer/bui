import { LitElement, html, css } from 'lit'
import '../markdown-docs'
import docs from '../dist/docs-util.js'

customElements.define('demo-utils', class extends LitElement{

    static get title(){ return 'Utils' }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            padding: var(--view-gutter);
            max-width: 100%;

            display: grid;
            grid-template-rows: 1fr;
            padding: 0;
        }
        
        .toc {
            padding: var(--gutter);
            padding-right: 1em;
            overflow: auto;
        }
    `}

    render(){return html`
    	
            <b-text-divider hidden bottom thick xbold xl heading>Helpers</b-text-divider>

            <b-list
                row="demo-utils-row"
                .listOptions=${{perPage: 100}}
                .filters=${filters}
                .coll=${docs}
            >
                <b-root-titlebar></b-root-titlebar>
                <aside slot="sidebar:left" class="toc">
                <b-grid cols=1 >
                    ${docs.map((d,i)=>html`
                        <b-text ?dim=${!d.docs} semibold .index=${i} .model=${d} link @click=${this.navTo}>${d.title}</b-text>
                    `)}
                </b-grid>
                </aside>
            </b-list>
    `}

    navTo(e){
        let i = e.currentTarget.index
        this.list.$$(`[part="row"]:nth-of-type(${i+1})`)?.scrollIntoView()
    }

})

export default customElements.get('demo-utils')

const filters = {
    search: {
        minMatchCharLength: 1,
        threshold: .1,
    }
}

// import { LitElement, html, css } from 'lit'

customElements.define('demo-utils-row', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position:relative;
            padding: var(--gutter);
        }
    `

    render(){return html`
        <b-text-divider bottom heading lg xbold>
            ${this.model.title}
            <b-text muted slot="right">${this.model.name}</b-text>
        </b-text-divider>
        <demo-markdown-docs notoc .docs=${this.model.docs||'see source code'}></demo-markdown-docs>
    `}

})

// export default customElements.get('demo-utils-row')