import { LitElement, html, css } from 'lit-element';

export class PaperElement extends LitElement {

    static get properties() { return {
        color: {type: String, reflect: true},
        empty: {type: Boolean, reflect: true}
    }}

    constructor(){
		super()
        this.color = ''
        this.empty = false
	}

    static get styles(){ return css`
        :host {
            box-sizing: border-box;
            display: block;
            background: var(--bgd);
            box-shadow: rgba(0,0,0,.1) 0 1px 5px;
            border: solid 1px transparent;
            border-radius: 3px;
            --padding: 1em;
            padding: var(--padding);
            position: relative;
            --bgd: #fff;
            --bgdAccent: #fff;
        }

        :host([hidden]) {
            display: none;
        }

        :host([overshadow]) {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
        }

        :host([inline]) {
            display: inline-block;
        }

        :host([empty]) {
            background: none;
            box-shadow: none;
            border: 1px dashed rgba(0,0,0,.3);
        }

        :host([centered]) {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        :host([border]) {
            border-left: solid 5px var(--bgdAccent);
        }

        :host([outline]) {
            box-shadow: none;
            border-color: rgba(0, 0, 0, 0.1);
        }

        :host([dense]) {
            --padding: .5em;
        }

        :host([compact]) {
            --padding: 0;
        }

        ::slotted(header:first-child) {
            border-radius: 3px 3px 0 0;
            margin: calc(var(--padding) * -1);
            margin-bottom: var(--padding);
            padding: var(--padding);
            display: flex; 
            align-content: center;
            justify-content: space-between;
        }

        ::slotted(b-icon:first-of-type) {
            color: var(--bgdAccent);
            margin-right: .15em;
        }

        :host([color="gray"]) {
            --bgd: #EEEEEE;
            --bgdAccent: #BDBDBD;
            color: #212121;
        }

        :host([color="blue"]) {
            --bgd: #2196F3;
            --bgdAccent: #1565C0;
            color: #fff;
        }

        :host([color="green"]) {
            --bgd: #27ae60;
            --bgdAccent: #00695C;
            color: #fff;
        }

        :host([color="red"]) {
            --bgd: #f44336;
            --bgdAccent: #c62828;
            color: #fff;
        }

        :host([color="orange"]) {
            --bgd: #FF9800;
            --bgdAccent: #EF6C00;
            color: #fff;
        }

        :host([color="yellow"]) {
            --bgd: #FFC107;
            --bgdAccent: #F9A825;
            color: #fff;
        }

        :host([color="purple"]) {
            --bgd: #673AB7;
            --bgdAccent: #4527A0;
            color: #fff;
        }

        :host([color="postit"]) {
            --bgd: #FFF8E1;
            --bgdAccent: var(--orange);
        }

        :host([color="info"]) {
            --bgd: var(--blue-50);
            --bgdAccent: var(--blue);
        }
    `}

    render(){ return html`
        <slot></slot>
    `}

}
    
customElements.define('b-paper', PaperElement)