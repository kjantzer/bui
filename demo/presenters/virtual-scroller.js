import { LitElement, html, css } from 'lit'
import View from './view'
import docs from 'bui/presenters/virtual-scroller/README.md'
import 'bui/presenters/virtual-scroller'

let i = 0
let items = []
while(i++ < 25000 ){

    let group = Math.floor(i / 1000)
    let letter = String.fromCharCode(97 + group)

    items.push({
        id: i,
        label: `Row ${i} – Group ${letter.toUpperCase()}`,
        group: group,
        letterGroup: letter
    })
}

customElements.define('dmeo-presenter-virtual-scroller', class extends View{

    static get title(){ return 'Virtual Scroller' }
    static get id(){ return 'virtual-scroller'}

    get docs(){ return docs }

    static get styles(){ return [super.styles, css`
    
        b-virtual-scroller {
            height: 50vh;
        }
    `]}

    renderContent(){ return html`

        <p>Uses <b-text href="https://github.com/PolymerLabs/uni-virtualizer">lit-virtualizer</b-text> to efficiently render large lists as a virtual windowed list. Here is an example of 25,000 rows with dividers and a "skipper" menu
        </p><br>

        <b-paper compact overshadow>
            <b-virtual-scroller
                row="demo-virtual-scroller-row"
                divider="demo-virtual-scroller-divider"
                .items=${items}
            ></b-virtual-scroller>
        </b-paper>

        <br><br>
        <h2>Documentation</h2>
    `}

})

export default customElements.get('dmeo-presenter-virtual-scroller')



customElements.define('demo-virtual-scroller-row', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            padding: .5em 1em;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }
    `}

    render(){return html`
        ${this.model.label}
    `}

})

customElements.define('demo-virtual-scroller-divider', class extends LitElement{

    static shouldDisplay(prev, model){
        return !prev || prev.letterGroup != model.letterGroup
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            font-size: 2em;
            padding: 2rem 1rem .5rem;
            border-bottom: solid 3px var(--theme-bgd-accent);
            text-align: center;
        }
    `}

    render(){return html`
        ${this.model.letterGroup}
    `}

})
