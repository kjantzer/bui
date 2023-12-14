import { LitElement, html, css } from 'lit'

customElements.define('b-list-end-of-row', class extends LitElement{

    static properties = {
        msg: {type: String}
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
            grid-column: 1/-1;
        }

        b-text {
            padding: var(--list-end-of-list-padding, 1em);
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