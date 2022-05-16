import { LitElement, html, css } from 'lit'
import '../../../elements/code'
import TextView from './text'

customElements.define('b-previewer-json', class extends TextView{

    static useFor(ext){
        return ['json'].includes(ext)
    }

    parseContent(content){
        return content.json()
    }

    renderContent(){ return html`
        <b-code block>${JSON.stringify(this.content, null, 4)}</b-code>
    `}

})

export default customElements.get('b-previewer-json')