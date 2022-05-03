import { LitElement, html, css } from 'lit-element'

customElements.define('b-list-end-of-row', class extends LitElement{

    static properties = {
        msg: {type: String}
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
        }

        b-text {
            padding: 1em;
        }
    `

    constructor(){
        super()
        this.msg = 'Fetching more...'
    }

    render(){return html`
        <b-text sm align="center" muted bold block>
            ${this.msg}
        </b-text>
    `}

})

export default customElements.get('b-list-end-of-row')