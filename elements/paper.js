import { LitElement, html, css } from 'lit-element';
// https://brumm.af/shadows
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
            box-shadow: var(--b-paper-shadow, rgba(0,0,0,.1) 0 1px 5px);
            border: solid 1px transparent;
            --radius: var(--b-paper-radius, 3px);
            border-radius: var(--radius);
            --padding: 1em;
            padding: var(--padding);
            position: relative;
            --bgd: var(--b-paper-bgd, #fff);
            --bgdAccent: var(--bgd);
        }

        :host([hidden]) {
            display: none;
        }

        :host([overshadow]) {
            box-shadow: var(--b-paper-overshadow, rgba(0, 0, 0, 0.1) 0px 0px 20px);
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

        :host([noshadow]) {
            box-shadow: none;
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
            align-items: center;
            justify-content: space-between;
        }

        ::slotted(b-icon:first-of-type) {
            /* color: var(--bgdAccent); */
            color: #000;
            opacity: .5;
            margin-right: .15em;
        }

        :host([color="gray"]) {
            --bgd: var(--theme-bgd-accent, #EEEEEE);
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
            color: var(--b-paper-postit-color, inherit);
            --bgd: var(--b-paper-postit-bgd, #FFF8E1);
            --bgdAccent: var(--b-paper-postit-bgd-accent, var(--orange));
        }

        :host([color="info"]) {
            color: var(--b-paper-info-color, inherit);
            --bgd: var(--b-paper-info-bgd, var(--blue-50));
            --bgdAccent: var(--b-paper-info-bgd-accent, var(--blue));
        }
    `}

    render(){ return html`
        <slot></slot>
    `}

}
    
customElements.define('b-paper', PaperElement)