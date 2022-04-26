import View from '../presenters/view'
import docs from 'bui/components/filebrowser/README.md'

customElements.define('demo-components-filebrowser', class extends View{

    static title = 'File Browser'
    docs = docs

})