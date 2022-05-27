import View, {html} from '../presenters/view'
import docs from 'bui/components/tag-list/README.md'
import 'bui/components/tag-list'

customElements.define('demo-components-tag-list', class extends View{

    static title = 'Tag List'
    static icon = 'tag'
    docs = docs

    renderDocsHeader(){ return html`

        <b-grid cols=1>
            <b-paper outline>
                <b-tag-list .value=${['these', 'are', 'tags', 'cool beans']}></b-tag-list>
            </b-paper>

            <b-paper outline>
                <b-tag-list .value=${['beta', 'alpha', 'charlie']} sorted type="chip"></b-tag-list>
            </b-paper>

            <b-paper outline>
                <b-tag-list .value=${['priority', 'needs review']} sorted type="bar" icon="flag"
                    .presets=${['priority', 'on-hold', 'needs review']}></b-tag-list>
            </b-paper>

        </b-grid>

    `}

})