import { LitElement, html, css } from 'lit'
import View from '../presenters/view'
import docs from '../../server/docs/filemanager.md'

customElements.define('demo-server-filemanager', class extends View{

    static get title(){ return 'File Manager' }
    static get id(){ return 'filemanager' }

    static get styles(){return [super.styles, css`
        
    `]}

    get docs(){ return docs }


    renderContent(){ return html`

    `}

})

export default customElements.get('demo-server-filemanager')
