/*
    # Bgd Overlay

    a full width/height background color with opacity

    ```html-preview
    <div style="position: relative; padding: 1em;">
        <b-bgd-overlay></b-bgd-overlay>
        Content here with a bgd overlay behind
    </div>
    ```
*/
import { LitElement, css, html } from 'lit'

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
            box-sizing: border-box;
        }

        :host([hidden]) {
            display: none;
        }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-bgd-overlay')