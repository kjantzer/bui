import View from '../presenters/view'
import docs from 'bui/components/comments/README.md'

customElements.define('demo-components-comments', class extends View{

    static title = 'Comments'
    static icon = 'comment'
    docs = docs

})