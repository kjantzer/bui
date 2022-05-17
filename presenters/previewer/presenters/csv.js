import { LitElement, html, css } from 'lit'
import TextView from './text'
import csvToArray from 'bui/util/csvToArray'

customElements.define('b-previewer-csv', class extends TextView{

    static useFor(ext){
        return ['csv'].includes(ext)
    }

    async parseContent(content){
        content = await content.text()
        content = csvToArray(content)
        return content
    }

    // TODO: render as table?
    renderContent(){ return html`
        <b-code block>${JSON.stringify({
            header: this.content.header,
            lines: this.content,
            footer: this.content.footer
        }, null, 4)}</b-code>
    `}

})

export default customElements.get('b-previewer-csv')