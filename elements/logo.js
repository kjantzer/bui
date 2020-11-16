import { LitElement, html, css } from 'lit-element'

customElements.define('bui-logo', class extends LitElement{

    static get styles(){return css`
        :host {
            display: inline-flex;
            font-size: var(--size, 2em);
            height: .7em;
            align-items: center;
            color: var(--theme-text);
            user-select: none;
        }

        svg {
            height: .7em;
            margin: -.25em .05em;
        }

        svg * {
            fill: currentColor;
        }

        span {
            color: currentColor;
            opacity: .4;
            font-size: .9em;
            line-height: 0;
            margin-top: -.07em;
        }
    `}

    render(){return html`

        <span>❮</span>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 126.62 188.42"><g style="fill:var(--logo-color, #1d1d1b);" id="Layer_2" data-name="Layer 2"><g id="Layer_4" data-name="Layer 4"><path d="M10.74,7.1c13.2-11.54,67.06-9.34,91.22,9,26.1,19.84,23,55.15-10.4,70C58.68,100.82,15.41,110.5,5.79,73.75-5,32.53.83,15.78,10.74,7.1Z"/><path d="M126.62,139.29c-.19,42.87-26.55,46.48-58.42,48.35-39.92,2.35-56.14,1-59.76-26.42-3.35-25.31,8.51-37,50.23-51.35C113.14,91.08,126.76,107.25,126.62,139.29Z"/></g></g></svg>

        <span>❯</span>
    `}

})

export default customElements.get('bui-logo')