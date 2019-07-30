import { LitElement, html, css } from 'lit-element'
import '../../form-control/form-control'
import '../../form-control/controls/text-field'

customElements.define('b-list-search-bar', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block
        }

        form-control {
            padding: .5em .65em;
            background: var(--searchBgd);
            border-radius: 30px;
            /* max-width: 140px; */
        }

        text-field {
            min-width: 70px;
            /* transition: 300ms; */
        }

        form-control[falsy]:not(:focus-within):not(:hover){
            background: none;
        }

        form-control[falsy]:not(:focus-within){
            cursor: pointer;
        }

        form-control[falsy]:not(:focus-within) text-field {
            height: 1em;
            overflow: hidden;
            min-width: 0;
            width: 0;
            margin-right: -.5em;
        }

        b-icon {
            color: #444;
            margin-right: .5em;
        }
    `}

    render(){return html`
        <form-control>
            <text-field placeholder="Search" bubble-keypress single-line></text-field>
            <b-icon @click=${this.focus} name="search" slot="prefix"></b-icon>
        </form-control>
    `}

    focus(){
        this.shadowRoot.querySelector('form-control').focus()
    }

    get value(){
        this.textField = this.textField || this.shadowRoot.querySelector('text-field')
        return this.textField.currentValue
    }

})

export default customElements.get('b-list-search-bar')