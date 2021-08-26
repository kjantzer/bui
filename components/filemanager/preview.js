import { LitElement, html, css } from 'lit-element'

customElements.define('b-file-preview', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position: relative;
            /* position:absolute; */
            /* left: 0;
            top: 0;
            right: 0;
            bottom: 0; */
            display: flex;
            justify-content: center;
            align-items: center;
        }

        b-icon {
            cursor: pointer;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: rgb(255, 255, 255);
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            width: min(calc(0.5 * var(--file-icon-size, 4em)), 3em);
            height: min(calc(0.5 * var(--file-icon-size, 4em)), 3em);
            padding: min(calc(0.25 * var(--file-icon-size, 4em)), 1.5em);
            border-radius: min(calc(0.5 * var(--file-icon-size, 4em)), 3em);
            visibility: hidden;
            opacity: 0;
            transition: opacity 120ms ease 0s;
            /* pointer-events: none; */
        }

        :host(:hover) b-icon {
            opacity: 1;
            visibility: visible;
        }
    `}

    render(){return html`
        <slot></slot>
        <b-icon name="search" @click=${this.onClick}></b-icon>
    `}

    onClick(){
        this.emitEvent('preview')
    }

})

export default customElements.get('b-file-preview')