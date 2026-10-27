import { LitElement, html, css } from 'lit'

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
            overflow: visible;
        }

        .top {
            fill: var(--logo-color, currentColor);
            stroke: var(--logo-color, currentColor);
        }

        .bot {
            fill: var(--logo-accent, var(--theme, #3a76d0));
            stroke: var(--logo-accent, var(--theme, #3a76d0));
        }
    `}

    render(){return html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="12 8 41.5 48">
            <path class="top" stroke-width="2" stroke-linejoin="round" d="M20 10H36a9.5 9.5 0 0 1 0 19H13.61z"/>
            <path class="bot" stroke-width="2" stroke-linejoin="round" d="M13.61 35H42a9.5 9.5 0 0 1 0 19H20z"/>
        </svg>
    `}

})

export default customElements.get('bui-logo')
