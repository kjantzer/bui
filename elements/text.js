import { LitElement, html, css } from 'lit-element'

customElements.define('b-text', class extends LitElement{

    static get properties() { return {
        tooltip: {type: String}
    }}

    static get styles(){return css`
        :host {
            display: inline-block;
            cursor: default;
            line-height: var(--b-text-line-height, 1em);
        }

        /* body text */
        :host([body]) {
            line-height: var(--theme-body-line-height, 1.4em);
        }

        :host([header]) {
            line-height: var(--theme-header-line-height, 1.2em);
        }

        :host([block]) {
            display: block;
        }

        :host([block]) ::slotted(form-control) {
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

        :host([monospace]) .slot {
            font-family: var(--b-text-monospace, 'Source Code Pro', 'Courier New', Courier, monospace)
        }

        :host([lighter]) .slot { font-weight: 300; }
        :host([nobold]) .slot { font-weight: normal; }
        :host([bold]) .slot { font-weight: bold; }
        :host([xbold]) .slot { font-weight: 900; }
        :host([italic]) .slot { font-style: italic; }

        :host([strike]) { text-decoration: line-through; }

        :host([capitalize]) .slot { text-transform: capitalize; }
        :host([ucase]) .slot { text-transform: uppercase; }
        :host([lcase]) .slot { text-transform: lowercase }

        :host([breakall]) .slot { word-break: break-all; }

        :host([align="left"]) .slot { text-align: left; }
        :host([align="right"]) .slot { text-align: right; }
        :host([align="center"]) .slot { text-align: center; }
        :host([align="justify"]) .slot { text-align: justify; }

        /* https://spencermortensen.com/articles/typographic-scale/ */
        :host([xs]) .slot { font-size: .65em; line-height: 1.1em; }
        :host([sm]) .slot { font-size: .8409em; line-height: 1.1em; }
        :host([md]) .slot { font-size: 1.1892em; line-height: 1.1em; }
        :host([lg]) .slot { font-size: 1.4142em; line-height: 1.1em; }
        :host([xl]) .slot { font-size: 1.6818em; line-height: 1.1em; }
        :host([xxl]) .slot { font-size: 2em; line-height: 1.1em; }

        :host([tone="muted"]), :host([muted]) { color: rgba(var(--theme-text-rgb, 0,0,0),.4); }
        :host([muted="some"]) { color: rgba(var(--theme-text-rgb, 0,0,0),.8); }
        :host([muted="1"]) { color: rgba(var(--theme-text-rgb, 0,0,0),.8); }
        :host([muted="2"]) { color: rgba(var(--theme-text-rgb, 0,0,0),.6); }
        :host([tone="text"]) { color: var(--theme-text); }
        :host([tone="theme"]) { color: var(--theme); }
        :host([tone="critical"]) { color: var(--b-text-tone-critical, var(--red-A400, red)); }
        :host([tone="warning"]) { color: var(--b-text-tone-warning, var(--orange, orange)); }
        :host([tone="info"]) { color: var(--b-text-tone-info, var(--blue, blue)); }
        :host([tone="good"]) { color: var(--b-text-tone-good, var(--green, blue)); }

        :host([color="theme"]) { color: var(--theme); }
        :host([color="theme-accent"]) { color: var(--theme-secondary); }
        :host([color="text"]) { color: var(--theme-text); }
        :host([color="red"]) { color: var(--red, red); }
        :host([color="orange"]) { color: var(--orange, orange); }
        :host([color="blue"]) { color: var(--blue, blue); }
        :host([color="green"]) { color: var(--green, blue); }
        :host([color="purple"]) { color: var(--deep-purple, blue); }

        :host([gradient]) {
            background-image: var(--theme-gradient,var(--theme-text, #000));
            background-size: 100%;
            background-repeat: repeat;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -moz-background-clip: text;
            -moz-text-fill-color: transparent;
        }

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
                /* for use in nested children */
                --b-text-hover-color: var(--b-text-link-color, var(--theme, var(--blue, blue)));
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

        ::slotted(p:first-child) {margin-top: 0;}
        ::slotted(p:last-child) {margin-bottom: 0;}
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
        <slot class="slot"></slot>
        ${this.tooltip?html`
            <b-tooltip>${this.tooltip}</b-tooltip>
        `:''}
    `}

})

export default customElements.get('b-text')