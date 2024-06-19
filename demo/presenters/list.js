import { LitElement, html, css } from 'lit'
import Notif from 'bui/presenters/notif'
import View from './view'
import docs from 'bui/presenters/list/README.md'
import 'bui/presenters/list'
import 'bui/presenters/list/export-btn'
import 'bui/presenters/list/selection-btn'
import ListHeader from 'bui/presenters/list/header'
import copyText from 'bui/util/copyText'
import '../../elements/flex'

customElements.define('demo-presenter-list', class extends View{

    static get title(){ return 'List' }

    get docs(){ return docs }

    static get styles(){ return [super.styles, css`
        b-list {
            height: 40vh;
            overflow: hidden;
            /* border-bottom: solid 1px rgba(0,0,0,.1); */
        }
    `]}

    renderContent(){ return html`

        <div>
        <b-paper overshadow compact>
            <b-list
                key="demo-list"
                row="a-list-view-row"
                .sorts=${sorts}
                .filters=${filters}
                .coll=${data}
            >

                <b-list-header>
                    <b-list-selection-btn></b-list-selection-btn>
                </b-list-header>

                <b-list-export-btn></b-list-export-btn>

                <b-flex slot="actions:left">
                    <b-btn @click=${this.copy} clear color="theme">Copy IDs</b-btn>
                </b-flex>

                <b-text sm dim body slot="footer" style="padding: .5em; border-top: solid 2px var(--theme-bgd-accent);">
                    Tip: try pressing <b-code>s</b-code> (select) or <b-code>f</b-code> (filter). Then <b-code>esc</b-code> to cancel
                </b-text>
            </b-list>
        </b-paper>
        </div>

        <br><br>
        <h2>Documentation</h2>
    `}

    copy(){
        let ids = this.list.currentModels.map(m=>m.id)
        copyText(ids.join(', '))
        Notif.alert(`${ids.length} IDs copied`)
    }

})

let data = []
let i = 0
while(i++ <100){
    data.push({id: i, label: 'Row '+i, date: (new Date()).getTime()+(i*10000000)})
}

const sorts = {
    defaults: ['id'],
    id: {
        label: 'ID',
        sortBy(m){ return m.id }
    }
}

const filters = {
    options: {overflow: true}, // override for demo - not useful for only one filter
    odd: {
        alwaysShow:true,
        values: [
            {label: 'Any', toolbarLabel: '–', val: '' },
            'divider',
            {label: 'Yes', val: true},
            {label: 'No', val: false}
        ],
        filterBy(model, val, key){
            return (model.id % 2 == 1) == val
        }
    }
}

customElements.define('a-list-view-row', class extends LitElement{

    // the content for `b-list-header`
    static header(){ return html`
        <div w="60px">ID</div>
        <div w="1fr">Name</div>
    `}

    static get styles(){return [ListHeader.sharedStyles, css`
        /* add more styles for the row */
    `]}

    render(){return html`
        <b-text monospace>${this.model.id}</b-text>
        <span>${this.model.label}</span>
    `}

})