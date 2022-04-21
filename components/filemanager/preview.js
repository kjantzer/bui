import { LitElement, html, css } from 'lit-element'

customElements.define('b-file-preview', class extends LitElement{

    static get properties(){return {
        icon: {type: String}
    }}

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

        slot[name] {
            display: inline-flex;
            flex-wrap: wrap;
            gap: 2px;
            line-height: 0;
            position: absolute;
        }

        [name="top-left"] {
            top: 2px;
            left: 2px;
        }

        [name="top-right"] {
            top: 2px;
            right: 2px;
        }

        [name="bottom-left"] {
            bottom: 2px;
            left: 2px;
        }

        [name="bottom-right"] {
            bottom: 2px;
            right: 2px;
        }

    `}

    render(){return html`
        <slot></slot>
        <b-icon name="${this.icon||'search'}" @click=${this.onClick}></b-icon>

        <slot name="top-left"></slot>
        <slot name="top-right"></slot>
        <slot name="bottom-left"></slot>
        <slot name="bottom-right"></slot>
    `}

    onClick(){
        this.emitEvent('preview')
    }

})

export default customElements.get('b-file-preview')