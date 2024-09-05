import { LitElement, html, css } from 'lit'
import './markdown-docs'

export default class DocsList extends LitElement {

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

        [tag="deprecated"] {
            text-decoration: line-through;
            color: var(--theme-text-accent);
        }
    `}

    get docs(){ return this.constructor.docs || []}

    render(){return html`
        <b-list
            row="demo-docs-list-row"
            .listOptions=${{perPage: 200}}
            .filters=${filters}
            .coll=${this.docs}
        >
            <b-root-titlebar></b-root-titlebar>
            <aside slot="sidebar:left" class="toc">
            <b-grid cols=1 >
                ${this.docs.map((d,i)=>html`
                    <b-text ?dim=${!d.docs} semibold .index=${i} .model=${d} link @click=${this.navTo} tag=${d.tag}>${d.title}</b-text>
                `)}
            </b-grid>
            </aside>
        </b-list>
    `}

    navTo(e){
        let i = e.currentTarget.index
        this.list.$$(`[part="row"]:nth-of-type(${i+1})`)?.scrollIntoView()
    }
}


const filters = {
    search: {
        minMatchCharLength: 1,
        threshold: .1,
    }
}


customElements.define('demo-docs-list-row', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position:relative;
            padding: var(--gutter);
        }

        b-text-divider {
            position: sticky;
            background-color: var(--theme-bgd);
            top: 0;
            z-index: 10;
        }

        demo-markdown-docs::part(heading h2){
            top: 2em;
            font-size: var(--font-size-sm);
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
