import { LitElement, html, css } from 'lit-element'

customElements.define('b-h1', class extends LitElement {

    static get styles(){return css`

        :host {
            min-width: 0;
        }

        h1 {
            margin: 0;
            text-decoration: inherit;
            font-size: var(--bui-h1-size, 2em);
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

        @media (max-width:699px){
            h1 {
                font-size: var(--bui-h1-size-mobile, 1.6em);
            }
        }

    `}

    render(){return html`
        <h1><slot></slot></h1>
    `}

})

customElements.define('b-h2', class extends LitElement {

    static get styles(){return css`

        :host {
            min-width: 0;
        }

        h2 {
            margin: 0;
            text-decoration: inherit;
            font-size: var(--bui-h2-size, 1.5em);
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

        @media (max-width:699px){
            h2 {
                font-size: var(--bui-h2-size-mobile, 1.3em);
            }
        }

    `}

    render(){return html`
        <h2><slot></slot></h2>
    `}

})

customElements.define('b-h3', class extends LitElement {

    static get styles(){return css`

        :host {
            min-width: 0;
        }

        h3 {
            margin: 0;
            text-decoration: inherit;
            font-size: var(--bui-h3-size, 1.2em);
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

        @media (max-width:699px){
            h3 {
                font-size: var(--bui-h2-size-mobile, 1.3em);
            }
        }

    `}

    render(){return html`
        <h3><slot></slot></h3>
    `}

})

