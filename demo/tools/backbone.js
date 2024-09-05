import CommentDocs from '../docs-list'
import docs from '../dist/docs-helpers-backbone.js'

customElements.define('demo-backbone-helpers', class extends CommentDocs{

    static get title(){ return 'Backbone Helpers' }
    static get docs(){ return docs }

})