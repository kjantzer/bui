import { LitElement, html, css } from 'lit'
import {Collection} from 'backbone'
import './markdown-docs'
import '../presenters/list/group-by'
import {applyGrouping} from '../presenters/list/group-by/util'

const GROUP_BY_VALS = [
    {label: 'Type', val: 'dir'}
]

class Coll extends Collection {

    applyGrouping(models){
        return applyGrouping.call(this, models, {
            groupBy: [["dir", true]]
        })
    }
}

export default class DocsList extends LitElement {

    static get title(){ return 'Utils' }

    static get styles(){return css`
        :host {
            height: 100%;
            background-color: var(--theme-bgd);
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

        .sidebar {
            width : 180px;
        }

        .sidebar .group {
            border-bottom: solid 2px var(--theme-bgd-accent);
            padding-bottom: .25em;
            padding-top: .25em;
            position: sticky;
            top: var(--gutter-negative);
            background: var(--theme-bgd);
            z-index: 1;
        }

        .sidebar .group:not(:first-of-type) {
            margin-top: .75em;
            border-bottom: solid 2px var(--theme-bgd-accent);
        }

        .sidebar .item {
            font-weight: 500;
        }
    `}

    constructor(){
        super()
        this.docs = new Coll(this.constructor.docs || [])
    }

    // get docs(){ return this.constructor.docs || []}

    render(){return html`
        <b-list
            key="bui-docs-list"
            row="demo-docs-list-row"
            groupByRow="demo-docs-list-row-divider"
            .listOptions=${{perPage: 1000, fetch: false, refreshBtn: false}}
            .filters=${filters}
            .coll=${this.docs}
            @content-changed=${this._requestUpdate}
        >
            <b-root-titlebar></b-root-titlebar>
            <aside slot="sidebar:left" class="toc">
            <b-grid cols=1 class="sidebar">
                ${this.list?.currentModels?.map((m,i)=>html`

                    ${m.level == 1 ?html`
                        <b-text xbold md caps class="group">${m.name}</b-text>
                    `:html`
                    <b-text .index=${i} .model=${m} link class="item"
                        ?dim=${!m.get('docs')}
                        tag=${m.get('tag')}
                        @click=${this.navTo}>${m.get('title')}</b-text>
                    `}
                `)}
            </b-grid>
            </aside>

        </b-list>
    `}

    _requestUpdate(){
        this.requestUpdate()
    }

    navTo(e){
        e.model?.trigger('navTo')
        // let i = e.currentTarget.index
        // let row = this.list.$$(`[part="row"]:nth-of-type(${i+1})`)
        // row.scrollIntoView()
        // row.list.list.scrollTop -= 40

    }
}


const filters = {
    search: {
        minMatchCharLength: 1,
        threshold: .1,
        data(m){return {
            title: m.get('title'),
            dir: m.get('dir')
        }}
    },
    options: {
        sidebar: false,
    },
    type: {
        values(){
            return [
                {label: 'All', val: ''}
            ].concat(Array.from(new Set(this.coll.map(m=>m.get('dir')))))
        },
        filterBy(m, v, k){
            return m.get('dir') == v
        }
    }
}

customElements.define('demo-docs-list-row-divider', class extends LitElement{

    static styles = [ css`
        :host {
            display: block;
            position: sticky;
            top: calc(var(--gutter-negative) + .5rem);
            background-color: var(--theme-bgd);
            z-index: 13;
            padding: var(--gutter);
            padding-bottom: .25rem;
        }
    `]

    render(){return html`
        <b-text lg xbold gradient caps>${this.model.name}</b-text>
    `}

})

customElements.define('demo-docs-list-row', class extends LitElement{

    static listeners = {
        model: {'navTo': 'navTo'}
    }

    navTo(){
        this.scrollIntoView()
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
            padding: var(--gutter);
        }

        b-text-divider {
            position: sticky;
            background-color: var(--theme-bgd);
            top: 2.3rem;
            z-index: 11;
        }

        demo-markdown-docs::part(heading h2){
            top: 4.2rem;
            font-size: var(--font-size-xs);
            z-index: 10;
        }
    `

    render(){return html`
        <b-text-divider bottom heading md xbold>
            ${this.model.get('title')}
            <b-text muted slot="right">${this.model.get('name')}</b-text>
        </b-text-divider>
        <demo-markdown-docs notoc .docs=${this.model.get('docs')||'see source code'}></demo-markdown-docs>
    `}

})
