import { LitElement, html, css } from 'lit'
import {Collection} from 'backbone'
import scrollbars from '../helpers/scrollbars'
import '../presenters/list/intersection-observer'
import './markdown-docs'
import '../presenters/list/group-by'
import {applyGrouping} from '../presenters/list/group-by/util'
import '../elements/hid-scale'
import '../elements/table'
import '../elements/table-row'
import '../elements/toggle-btn'
import '../elements/toggle-view'
import '../elements/x-out'
import '../elements/ribbon'
import '../elements/qr-code'
import '../elements/animated-bgd'
import './docs-detail'

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

        b-list::part(toolbar) {
            z-index: 40;
        }
        
        .toc {
            padding: var(--gutter);
            padding-right: 1em;
            overflow: auto;
        }

        ${scrollbars.hide('.toc')}

        .sidebar {
            width : 180px;
        }

        .sidebar .group {
            background: var(--theme-bgd-accent);
            padding-bottom: .25em;
            padding-top: .25em;
            position: sticky;
            top: var(--gutter-negative);
            z-index: 1;
            margin-left: var(--gutter-negative);
            padding-left: var(--gutter);
            border-radius: 0 2em 2em 0;
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
        let docs = this.constructor.docs || []
        // docs = docs.filter(d=>d.id=='presenters-list') // TEMP
        this.docs = new Coll(docs)
        
    }

    didBecomeActive(){
        if( this._firstUpdated )
            setTimeout(()=>this.goToRef(),100)
    }

    goToRef(){
        let {ref} = this.tabView.route.state?.params
        let {slug} = this.tabView.route.state.props
        if( !ref ) return 

        let m = this.docs.get(ref)
        if( !m ) return

        m.trigger('navTo', {slug})
    }

    onIntersectionChanged(e){
        if( !this._firstUpdated ) return

        let {model} = e.detail
        this.tabView.route.update({
            path: model ? 'docs/'+model.id : 'docs'
        })

        if( this.activeModel && this.activeModel != model )
            this.activeModel.set('active', false)
        
        this.activeModel = model
        this.activeModel?.set('active', true)

        this.$$(`.toc [model="${model.id}"]`)?.scrollIntoViewIfNeeded()
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
                        <demo-docs-list-toc-item .index=${i} .model=${m} ></demo-docs-list-toc-item>
                    `}
                `)}
            </b-grid>
            </aside>

        </b-list>
    `}

    contentChanged(){
        this.requestUpdate()

        if( !this._firstUpdated ){
            this.goToRef()
            this._firstUpdated = true
        }

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

customElements.define('demo-docs-list-toc-item', class extends LitElement{

    static listeners = {
        model: {'change:toc change:active': 'requestUpdate'}
    }

    static styles = [ css`
        :host {
            display: block;
        }

        b-details > b-text {
            font-weight: 500;
        }

        b-details:not([noicon])::part(summary) {
            margin-left: -1.25em;
            position: sticky;
            top: 0;
            background: var(--theme-bgd);
        }

        [active] .item {
            color: var(--theme);
        }

        .toc {
            color: var(--theme-text-dim);
            border-left: solid 1px var(--theme-bgd-accent);
            border-bottom: solid 1px var(--theme-bgd-accent);
            padding-left: .5em;
            padding-bottom: .5em;
        }

        .toc [level="2"] { margin-left: 0em; color: var(--theme-text)}
        .toc [level="3"] { margin-left: .5em; }
        .toc [level="4"] { margin-left: 1em; font-size: var(--font-size-sm); }
        .toc [level="5"] { font-size: var(--font-size-sm); margin-left: 1.5em }
    `]

    get hasTOC(){ return this.model.get('toc')?.length > 2}

    render(){return html`
        <b-details ?open=${this.hasTOC&&this.model.get('active')} ?noicon=${!this.hasTOC} ?active=${this.model.get('active')}>
            <b-text link class="item ${this.model.id}"
                ?strike=${this.model.get('tag')=='deprecated'}
                ?dim=${!this.model.get('active')&&!this.model.get('docs')}
                tag=${this.model.get('tag')}
                @click=${this.navTo}>${this.model.get('title')}</b-text>

            ${this.hasTOC?html`
            <b-grid class="toc" cols=1 gap=".5">
            ${this.model.get('toc')?.map(d=>d.level==1?'':html`
                <b-text link .html=${d.title} .slug=${d.slug} level=${d.level} @click=${this.tocClick}></b-text>
            `)}
            </b-grid>
            `:''}

        </b-details>
    `}
    
    tocClick(e){
        goTo('docs/'+this.model.id, {slug: e.currentTarget.slug})
    }

    navTo(e){
        goTo('docs/'+this.model.id)
    }

})

customElements.define('demo-docs-list-row-divider', class extends LitElement{

    static styles = [ css`
        :host {
            display: block;
            position: sticky;
            top: calc(var(--gutter-negative) + .5rem);
            background-color: var(--theme-bgd);
            z-index: 33;
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

    navTo({slug}={}){
        let scrollTo = this
        
        if( slug )
            scrollTo = this.$$('demo-markdown-docs')?.$$(`[href="#${slug}"]`)
            
        console.log(scrollTo);

        (scrollTo||this).scrollIntoView()
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
            padding: var(--gutter);
        }

        /*:host(:hover) {
            box-shadow: var(--theme-shadow-3);
            z-index: 20;
        }*/

        b-text-divider {
            position: sticky;
            background-color: var(--theme-bgd);
            top: 2.3rem;
            z-index: 31;
        }

        demo-markdown-docs::part(heading h2){
            top: 4.1rem;
            font-size: var(--font-size-xs);
            z-index: 30;
        }

        demo-markdown-docs::part(heading h3),
        demo-markdown-docs::part(heading h4){
            font-size: var(--font-size-sm);
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
            <b-text ?strike=${this.model.get('tag')=='deprecated'}>${this.model.get('title')}</b-text>
            <b-text muted slot="right">${this.model.get('path')}</b-text>
        </b-text-divider>

        <demo-markdown-docs notoc .model=${this.model} .docs=${this.model.get('docs')||'see source code'}></demo-markdown-docs>
    `}

})
