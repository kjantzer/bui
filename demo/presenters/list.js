import { LitElement, html, css } from 'lit-element'
import View from './view'
import docs from 'bui/presenters/list/README.md'
import 'bui/presenters/list'
import 'bui/presenters/list/export-btn'

customElements.define('demo-presenter-list', class extends View{

    static get title(){ return 'List' }

    get docs(){ return docs }

    static get styles(){ return [super.styles, css`
        b-list {
            height: 40vh;
            overflow: hidden;
            border-bottom: solid 1px rgba(0,0,0,.1);
        }
    `]}

    renderContent(){ return html`

        <b-paper overshadow compact>
            <b-list
                key="demo-list"
                row="a-list-view-row"
                .sorts=${sorts}
                .filters=${filters}
                .coll=${data}
            >
                <b-list-export-btn></b-list-export-btn>
            </b-list>
        </b-paper>

        <br><br>
        <h2>Documentation</h2>
    `}

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
    odd: {
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

    static get styles(){return css`
        :host {
            display: block;
            padding: .5em 1em;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }
    `}

    render(){return html`
        ${this.model.label}
    `}

})