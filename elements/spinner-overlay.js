import { LitElement, html, css } from 'lit-element';
import './spinner'

export class SpinnerOverlayElement extends LitElement {

    static get properties() { return {
        show: {type: Boolean, reflect: true},
		label: {type:String, reflect: true}
    }}

    constructor(){
		super()
        this.show = false
		this.label = ''
	}

	connectedCallback(){
		super.connectedCallback()

		if( this.parentNode && this.parentNode.host && !this.parentNode.host.spinner ){
			this.host = this.parentNode.host
			this.host.spinner = this
		}else if( this.parentElement && !this.parentElement.spinner ){
			this.host = this.parentElement
			this.host.spinner = this
		}
	}

	disconnectedCallback(){
		super.disconnectedCallback()
		
		if( this.host )
			delete this.host.spinner
	}

    static get styles(){ return css`
		:host {
			--spinnerBgd: var(--b-spinner-overlay-bgd, rgba(255,255,255 ,.6));
            --spinnerColor: inherit;
            --spinnerSize: 1.6em;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1200;
            background: var(--spinnerBgd);
            color: var(--spinnerColor);
			border-radius: var(--radius);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 1;
            transition: 140ms opacity;
        }

		:host([dark]) {
			--spinnerBgd: rgba(0,0,0,.6);
			--spinnerColor: #fff;
		}

		main {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		label:not(:empty) {
			margin-left: 1em;
		}

		:host([lg]) {
			--spinnerSize: 6em;
		}

		:host([lg]) main {
			flex-direction: column;
		}

		:host([lg]) label:not(:empty) {
			text-align: center;
			font-size: 2em;
			font-weight: bold;
			margin: 1em 0 0 0;
			background: rgba(0,0,0,.7);
			color: #fff;
			padding: .25em .5em;
			border-radius: 2em;
		}

		:host(:not([show])) {
            visibility: hidden;
            opacity: 0;
        }

		b-spinner {
			font-size: var(--spinnerSize);
		}
    `}

    render(){ return html`
		<main>
			<b-spinner></b-spinner>
			<label>${this.label}</label>
		</main>
    `}

}

customElements.define('b-spinner-overlay', SpinnerOverlayElement)
