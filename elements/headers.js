import { LitElement, html, css } from 'lit'

customElements.define('b-h1', class extends LitElement {

    static get styles(){return css`

        :host {
            display: block;
            margin: 0;
            text-decoration: inherit;
            font-family: var(--b-h1-family, inherit);
            font-size: var(--b-h1-size, 2em);
            line-height: var(--b-h1-line-height, 1.0em);
            font-weight: bold;
            text-overflow: ellipsis;
            max-width: 100%;
            min-width: 0;
            overflow: hidden;

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
        }

        @media (max-width:599px){
            :host{
                font-size: var(--b-h1-size-mobile, 1.6em);
            }
        }

    `}

    render(){return html`
        <slot></slot>
    `}

})

customElements.define('b-h2', class extends LitElement {

    static get styles(){return css`

        :host {
            display: block;
            margin: 0;
            text-decoration: inherit;
            font-family: var(--b-h2-family, inherit);
            font-size: var(--b-h2-size, 1.5em);
            line-height: var(--b-h2-line-height, 1.0em);
            font-weight: bold;
            text-overflow: ellipsis;
            max-width: 100%;
            overflow: hidden;

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
        }

        @media (max-width:599px){
            :host {
                font-size: var(--b-h2-size-mobile, 1.3em);
            }
        }

    `}

    render(){return html`
        <slot></slot>
    `}

})

customElements.define('b-h3', class extends LitElement {

    static get styles(){return css`

        :host {
            display: block;
            margin: 0;
            text-decoration: inherit;
            font-family: var(--b-h3-family, inherit);
            font-size: var(--b-h3-size, 1.2em);
            font-weight: bold;
            text-overflow: ellipsis;
            max-width: 100%;
            overflow: hidden;

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
        }

        @media (max-width:599px){
            :host {
                font-size: var(--b-h2-size-mobile, 1.3em);
            }
        }

    `}

    render(){return html`
        <slot></slot>
    `}

})

