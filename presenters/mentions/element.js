import { LitElement, html, css } from 'lit'

export default class MentionElement extends LitElement{
    
    static register(){
        customElements.define('b-mention', this.prototype.constructor)
    }

	static get properties(){ return {
		uid: {type: Number, reflect: true},
        active: {type: Boolean}
	}}

	firstUpdated(){
		this.value = this.innerText
        this.contentEditable = false
	}

	static get styles(){return css`
		:host {
			display: inline-block;
			position:relative;
			white-space: normal;
			--color: var(--b-mention-color, var(--theme, var(--blue, #2196F3)));
            color: var(--color);
			z-index: 0;
		}

		.bgd {
			display: block;
			width: calc(100% + 2px);
			height: 100%;
			top: 0;
			left: -1px;
			background: var(--color);
			opacity: .2;
			visibility: hidden;
			border-radius: 2px;
			position: absolute;
			z-index: -1;
		}

		slot {
			display: inline-block;
		}

		:host(:focus) slot,
		:host(:focus-within) slot,
		:host(:active) slot,
        slot[active] ~ .bgd {
			visibility: visible;
		}
	`}

	render(){return html`
		${this.renderBefore()}
		<slot ?active=${this.active}></slot>
		${this.renderAfter()}
		<div class="bgd"></div>
	`}
	
	renderBefore(){ return '' }
	renderAfter(){ return '' }

}