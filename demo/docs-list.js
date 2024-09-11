import { LitElement, html, css } from 'lit'
import {Collection} from 'backbone'
import '../presenters/list/intersection-observer'
import './markdown-docs'
import '../presenters/list/group-by'
import {applyGrouping} from '../presenters/list/group-by/util'
import '../elements/hid-scale'

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

    didBecomeActive(){
        setTimeout(()=>this.goToRef(),100)
    }

    firstUpdated(){
        setTimeout(()=>this.goToRef(),500)
    }

    goToRef(){
        let ref = this.tabView.route.state?.params?.ref
        if( !ref ) return 

        let m = this.docs.get(ref)
        if( !m ) return

        m.trigger('navTo')
        
        // if TOC at the top (probably just loaded the view), then scroll down to the active item
        if( this.$$('.toc')?.scrollTop == 0 ) 
            this.$$('.toc .item.'+m.id)?.scrollIntoView({block: 'center'})
    }

    onIntersectionChanged(e){
        let {model} = e.detail
        this.tabView.route.update({
            path: model ? 'docs/'+model.id : 'docs'
        })
    }

    render(){return html`
        <b-list
            key="bui-docs-list"
            row="demo-docs-list-row"
            groupByRow="demo-docs-list-row-divider"
            .listOptions=${{perPage: 1000, fetch: false, refreshBtn: false}}
            .filters=${filters}
            .coll=${this.docs}
            @content-changed=${this.contentChanged}
            @intersection-changed=${this.onIntersectionChanged}
        >
            <b-list-intersection-observer></b-list-intersection-observer>
            <b-root-titlebar></b-root-titlebar>
            <aside slot="sidebar:left" class="toc">
            <b-grid cols=1 class="sidebar">
                ${this.list?.currentModels?.map((m,i)=>html`

                    ${m.level == 1 ?html`
                        <b-text xbold md caps class="group">${m.name}</b-text>
                    `:html`
                    <b-text .index=${i} .model=${m} link class="item ${m.id}"
                        ?dim=${!m.get('docs')}
                        tag=${m.get('tag')}
                        @click=${this.navTo}>${m.get('title')}</b-text>
                    `}
                `)}
            </b-grid>
            </aside>

        </b-list>
    `}

    contentChanged(){
        this.requestUpdate()
    }

    navTo(e){
        if( e.model )
            goTo('docs/'+e.model.id)
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

    connectedCallback(){
        super.connectedCallback()
        this.list.intersectionObserver.observe(this)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.list.intersectionObserver.unobserve(this)
    }

    render(){return html`
        <b-text-divider bottom heading md xbold>
            ${this.model.get('title')}
            <b-text muted slot="right">${this.model.get('name')}</b-text>
        </b-text-divider>
        <demo-markdown-docs notoc .docs=${this.model.get('docs')||'see source code'}></demo-markdown-docs>
    `}

})
