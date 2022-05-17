import { LitElement, html, css } from 'lit'

customElements.define('b-bgd-overlay', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: .2;
            background: var(--theme);
            z-index: -1;
        }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-bgd-overlay')