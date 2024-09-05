import CommentDocs from '../docs-list'
import docs from '../dist/docs-util.js'

customElements.define('demo-utils', class extends CommentDocs{

    static get title(){ return 'Utils' }
    static get docs(){ return docs }

})