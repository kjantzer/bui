import { LitElement, html, css } from 'lit-element'
import '../../form/control'
import '../../form/controls/text-field'

customElements.define('b-list-search-bar', class extends LitElement{

    static get properties(){return {
        placeholder: {type: String}
    }}

    constructor(){
        super()
        this.placeholder = 'Search'
    }

    static get styles(){return css`
        :host {
            display: block
        }

        form-control {
            padding: .5em .65em;
            background: var(--searchBgd, #f5f5f5); /* backwards comp */
            background: var(--list-search-bgd, var(--searchBgd));
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
            color: var(--theme-text,#444);
            margin-right: .5em;
        }

        form-control:focus-within {
            box-shadow: 0 0 0px 1px var(--theme) inset;
        }

        form-control:not([falsy]) {
            box-shadow: 0 0 0px 1px var(--theme) inset;
            background-color: rgba(var(--theme-rgb), .1);
        }

        form-control:not([falsy]) b-icon,
        form-control:focus-within b-icon {
            color: var(--theme);
        }

        b-btn[clear] {
            display: none;
            margin: -1em -0.5em -1em 0;
        }

        form-control[empty] b-btn[clear] {
            visibility: hidden;
        }

        form-control:not([falsy]) b-btn[clear],
        form-control:focus-within b-btn[clear] {
            display: inline-block
        }

        @media (max-width: 599px) {

            :host(:focus-within),
            :host([value]) {
                position: absolute;
                left: 2px;
                right: 3em; /* let refresh btn be visible */
                z-index: 1000000000;
                background: var(--theme-bgd);
            }

            :host(:focus-within) form-control,
            :host([value]) form-control {
                box-sizing: border-box;
                width: 100%;
            }
        }
    `}

    render(){return html`
        <form-control>
            <text-field placeholder="${this.placeholder}" bubble-keypress single-line @keydown=${this.onKeyDown}></text-field>
            <b-icon @click=${this.focus} name="search" slot="prefix"></b-icon>
            <b-btn clear pill slot="suffix" icon="backspace" @click=${this.clear}></b-btn>
        </form-control>
    `}

    focus(){
        this.shadowRoot.querySelector('form-control').focus()
    }

    onKeyDown(e){
        this.toggleAttribute('value', e.target.currentValue )
    }

    get value(){
        this.textField = this.textField || this.shadowRoot.querySelector('text-field')
        return this.textField.currentValue
    }

    set value(val){
        this.textField = this.textField || this.shadowRoot.querySelector('text-field')
        this.textField.value = val
    }

    clear(){
        this.value = ''
        this.emitEvent('keydown')
        this.toggleAttribute('value', false)
    }

})

export default customElements.get('b-list-search-bar')