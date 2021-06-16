import { LitElement, html, css } from 'lit-element'

customElements.define('b-text', class extends LitElement{

    static get styles(){return css`
        :host {
            display: inline-block;
        }

        :host([block]) {
            display: block;
        }

        :host([inline]) {
            display: inline;
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

        :host([clip]) ::slotted(b-text),
        :host([clip]) ::slotted(span) {
            display: contents;
        }

        :host([monospace]) {
            font-family: var(--b-text-monospace, 'Source Code Pro', 'Courier New', Courier, monospace)
        }

        :host([bold]) { font-weight: bold; }
        :host([xbold]) { font-weight: 900; }
        :host([italic]) { font-style: italic; }

        :host([capitalize]) { text-transform: capitalize; }
        :host([ucase]) { text-transform: uppercase; }
        :host([lcase]) { text-transform: lowercase }

        :host([breakall]) { word-break: break-all; }

        :host([align="left"]) { text-align: left; }
        :host([align="right"]) { text-align: right; }
        :host([align="center"]) { text-align: center; }
        :host([align="justify"]) { text-align: justify; }

        /* https://spencermortensen.com/articles/typographic-scale/ */
        :host([xs]) { font-size: .65em; line-height: 1.1em; }
        :host([sm]) { font-size: .8409em; line-height: 1.1em; }
        :host([md]) { font-size: 1.1892em; line-height: 1.1em; }
        :host([lg]) { font-size: 1.4142em; line-height: 1.1em; }
        :host([xl]) { font-size: 1.6818em; line-height: 1.1em; }
        :host([xxl]) { font-size: 2em; line-height: 1.1em; }

        :host([tone="muted"]), :host([muted]) { color: rgba(var(--theme-text-rgb, 0,0,0),.4); }
        :host([tone="theme"]) { color: var(--theme); }
        :host([tone="critical"]) { color: var(--b-text-tone-critical, var(--red-A400, red)); }
        :host([tone="warning"]) { color: var(--b-text-tone-warning, var(--orange, orange)); }
        :host([tone="info"]) { color: var(--b-text-tone-info, var(--blue, blue)); }
        :host([tone="good"]) { color: var(--b-text-tone-good, var(--green, blue)); }

        :host([link]),
        :host([href]) {
            cursor: default;
        }

        :host([nopointer]) {
            pointer-events: none;
        }

        :host([link].popover-open),
        :host([href]){
            color: var(--b-text-link-color, var(--theme, var(--blue, blue)));
        }

        @media (hover){
            :host([link]:hover){
                color: var(--b-text-link-color, var(--theme, var(--blue, blue)));
            }

            :host([href]:hover) {
                text-decoration: underline;
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

        ::slotted(b-icon) {
            vertical-align: bottom;
        }
    `}

    firstUpdated(){

        this.addEventListener('click', this.onClick)

        if( this.hasAttribute('clip') && !this.hasAttribute('title') )
            this.title = this.textContent.replace(/\s{2,}/g, ' ').trim()
    }

    onClick(){
        let href = this.getAttribute('href')
        if( href ){
            if( !href.match(/^mailto/) && href.match(/@/) ) href = 'mailto:'+href
            window.open(href)
        }
    }

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-text')