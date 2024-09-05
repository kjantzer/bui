import CommentDocs from '../docs-list'
import docs from '../dist/docs-complete.js'

customElements.define('demo-lit-helpers', class extends CommentDocs{

    static get title(){ return 'Lit Helpers' }
    static get docs(){ return docs }

})