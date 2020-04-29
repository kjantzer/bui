import { LitElement, html, css } from 'lit-element'

customElements.define('b-text', class extends LitElement{

    static get styles(){return css`
        :host {
            display: inline-block;
        }

        :host([block]) {
            display: block;
        }

        :host([hidden]) {
            display: none;
        }

        :host([clip]) {
            max-width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            vertical-align: text-bottom;
        }

        :host([bold]) { font-weight: bold; }
        :host([italic]) { font-style: italic; }

        :host([capitalize]) { text-transform: capitalize; }
        :host([ucase]) { text-transform: uppercase; }
        :host([lcase]) { text-transform: lowercase }

        :host([align="left"]) { text-align: left; }
        :host([align="right"]) { text-align: right; }
        :host([align="center"]) { text-align: center; }
        :host([align="justify"]) { text-align: justify; }

        :host([xs]) { font-size: .65em; line-height: 1.1em; }
        :host([sm]) { font-size: .8em; line-height: 1.1em; }
        :host([md]) { font-size: 1.2em; line-height: 1.1em; }
        :host([lg]) { font-size: 1.4em; line-height: 1.1em; }
        :host([xl]) { font-size: 1.7em; line-height: 1.1em; }
        :host([xxl]) { font-size: 2em; line-height: 1.1em; }

        :host([tone="muted"]), :host([muted]) { color: rgba(var(--theme-rgb, 0,0,0),.4); }
        :host([tone="critical"]) { color: var(--b-text-tone-critical, var(--red-A400, red)); }
        :host([tone="warning"]) { color: var(--b-text-tone-warning, var(--orange, orange)); }
        :host([tone="info"]) { color: var(--b-text-tone-info, var(--blue, blue)); }

        @media (hover){
            :host([link]:hover) {
                color: var(--b-text-link-color, var(--theme, var(--blue, blue)));
            }
        }

        :host([sup]) {
            vertical-align: super;
            margin-top: -1em;
        }

        :host([sub]) {
            vertical-align: sub;
            margin-bottom: -1em;
        }
    `}

    firstUpdated(){
        if( this.hasAttribute('clip') && !this.hasAttribute('title') )
            this.title = this.innerText
    }

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-text')