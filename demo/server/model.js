import { LitElement, html, css } from 'lit'
import View from '../presenters/view'
import docs from '../../server/docs/model.md'

customElements.define('demo-server-model', class extends View{

    static get title(){ return 'Model' }
    static get id(){ return 'model' }

    static get styles(){return [super.styles, css`
        
    `]}

    get docs(){ return docs }


    renderContent(){ return html`

    `}

})

export default customElements.get('demo-server-model')
