// not accessible yet
import { LitElement, html, css } from 'lit'
import RoutedView from '../app/views/routed'
import Panel from '../presenters/panel'
import docs from './dist/docs-complete.js'
import {Collection} from 'backbone'

Panel.register('b-docs-detail-pane', {
    closeBtn: 'arrow', 
    width: '1000px'
})

customElements.define('b-docs-detail-pane', class extends RoutedView {

    static title = 'Doc'
    static icon = ''
    static path = 'docs-detail/:id'

    static styles = [RoutedView.styles, css`
        b-text-divider {
            position: sticky;
            background-color: var(--theme-bgd);
            top: 0rem;
            z-index: 31;
        }

        main {
            padding-top: 0;
        }
    `]

    constructor(){
        super()
        this.coll = new Collection(docs)
    }
    
    load(id){
        console.log(id);

        this.model = this.coll.get(id)

        if( !this.model )
            this.onLoadFailed(new Error('Could not find docs'))
    }

    render(){return html`
        <b-panel-toolbar></b-panel-toolbar>
        
        <main>

            <b-text-divider bottom heading xl xbold>
                <b-text ?strike=${this.model.get('tag')=='deprecated'}>${this.model.get('title')}</b-text>
                <b-text muted slot="right">${this.model.get('path')}</b-text>
            </b-text-divider>

            <demo-markdown-docs notoc .model=${this.model} .docs=${this.model.get('docs')||'see source code'}></demo-markdown-docs>

        </main>
    `}

})

export default customElements.get('b-docs-detail-pane')