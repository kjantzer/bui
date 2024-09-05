import CommentDocs from '../docs-list'
import docs from '../dist/docs-complete.js'

customElements.define('demo-all-docs', class extends CommentDocs{

    static title = 'Docs'
    static icon = 'help_center'
    static docs = docs

})