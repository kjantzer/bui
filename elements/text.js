/*
    # Text

    The go-to element for rendering text. Usually used in place of `span` and often `div`

    ```html-preview
    <b-flex left wrap>
        <b-text>Some text</b-text>
        <b-text bold italic>Bolded and italc</b-text>
        <b-text clip style="max-width:140px">Clip this text when it gets to long</b-text>
    </b-flex>
    ```

    ### Attributes
    - `block` - change to a block element
    - `xs`, `sm`, `lg`, `xl`, `xxl` - size
    - `tone` - critical, warning, info, muted
    - `muted` - shorthand for `tone="muted"`
    - `dim` - darker than muted
    - `bold`, `italic`
    - `ucase`, `lcase`, `capitalize`
    - `align` - left, center, right, justify
    - `link` - changes color on hover
    - `clip` - keeps text on one line, clipping with ellipsis
    - `clip="2"` - (2-7) clip to N lines
    - `sup`, `sub` - super/sub vertical align
    - `monospace`


    > See source code for complete options
*/
import { LitElement, html, css } from 'lit'
import {unsafeHTML} from 'lit/directives/unsafe-html.js'
import isLitHTML from '../helpers/lit/isLitHTML'

customElements.define('b-text', class extends LitElement{

    static get properties() { return {
        tooltip: {type: String},
        html: {type: String}
    }}

    static get styles(){return css`
        :host {
            display: inline-block;
            cursor: default;
            /* color: var(--theme-text); */
            /* line-height: var(--b-text-line-height, 1em); */
        }

        /* body text */
        :host([body]) .slot {
            line-height: var(--theme-body-line-height, 1.4em);
        }

        :host([header]) .slot, /* DEPRECATED - use heading*/
        :host([heading]) .slot {
            line-height: var(--theme-heading-line-height, 1.2em);
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
            display: none !important;
        }

        :host([clip]){
            max-width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            vertical-align: text-bottom;
        }

        :host([clip-start]) {
            text-align: left;
            direction: rtl;
        }

        :host([nowrap]) {
            white-space: nowrap;
        }

        :host([clip]:not([clip=""])) {
            white-space: normal;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: var(--clip-max-lines, 1);
        }

        /* this does take a bit of perf hit, so must opt-in; 
        also only works for 4 lines and less: https://developer.chrome.com/blog/css-text-wrap-balance/ */
        :host([balance]), :host([balance][clip]:not([clip=""])) {
            text-wrap: balance;
        }

        :host([pretty]), :host([pretty][clip]:not([clip=""])) {
            text-wrap: pretty;
        }

        :host([clip="1"]) { --clip-max-lines: 1; }
        :host([clip="2"]) { --clip-max-lines: 2; }
        :host([clip="3"]) { --clip-max-lines: 3; }
        :host([clip="4"]) { --clip-max-lines: 4; }
        :host([clip="5"]) { --clip-max-lines: 5; }
        :host([clip="6"]) { --clip-max-lines: 6; }
        :host([clip="7"]) { --clip-max-lines: 7; }

        :host([clip]) ::slotted(b-text),
        :host([clip]) ::slotted(span) {
            display: contents;
        }

        :host([monospace]) .slot {
            font-family: var(--b-text-monospace, 'Source Code Pro', 'Courier New', Courier, monospace)
        }

        :host([lighter]) .slot { font-weight: 300; }
        :host([nobold]) .slot { font-weight: normal; }
        :host([semibold]) .slot { font-weight: 600; }
        :host([bold]) .slot { font-weight: bold; }
        :host([xbold]) .slot { font-weight: 900; }
        :host([italic]) .slot { font-style: italic; }

        :host([strike]) { text-decoration: line-through; }

        :host([capitalize]) .slot { text-transform: capitalize; }
        :host([caps]) .slot { text-transform: capitalize; }
        :host([ucase]) .slot { text-transform: uppercase; }
        :host([lcase]) .slot { text-transform: lowercase }

        :host([breakall]) .slot { word-break: break-all; }

        :host([align="left"]) .slot { text-align: left; }
        :host([align="right"]) .slot { text-align: right; }
        :host([align="center"]) .slot { text-align: center; }
        :host([align="justify"]) .slot { text-align: justify; }

        :host .slot {
            line-height: 1.1em;
        }

        :host([xs]), :host([size="xs"]),
        :host([sm]), :host([size="sm"]) {
            line-height: 0; /* line height set in slotted content */
        }

        /* https://spencermortensen.com/articles/typographic-scale/ */
        :host([xs]) .slot, :host([size="xs"]) .slot { font-size: var(--font-size-xs, .65em); line-height: 1.1em; }
        :host([sm]) .slot, :host([size="sm"]) .slot { font-size: var(--font-size-sm, .8409em); line-height: 1.1em; }
        :host([rg]) .slot, :host([size="rg"]) .slot { font-size: var(--font-size-rg, 1.1em); line-height: 1.1em; }
        :host([md]) .slot, :host([size="md"]) .slot { font-size: var(--font-size-md, 1.1892em); line-height: 1.1em; }
        :host([lg]) .slot, :host([size="lg"]) .slot { font-size: var(--font-size-lg, 1.4142em); line-height: 1.1em; }
        :host([xl]) .slot, :host([size="xl"]) .slot { font-size: var(--font-size-xl, 1.6818em); line-height: 1.1em; }
        :host([xxl]) .slot, :host([size="xxl"]) .slot { font-size: var(--font-size-xxl, 2em); line-height: 1.1em; }

        :host([tone="muted"]),
        :host([muted]),
        :host([color="muted"]) { color: rgba(var(--theme-text-rgb, 0,0,0),.4); }
        :host([dim]) { color: rgba(var(--theme-text-rgb, 0,0,0),.6); }
        :host([body][dim]) { color: rgba(var(--theme-text-rgb, 0,0,0),.7); }
        /* DEPRECATED */
        :host([muted="some"]) { color: rgba(var(--theme-text-rgb, 0,0,0),.8); }
        :host([muted="1"]) { color: rgba(var(--theme-text-rgb, 0,0,0),.8); }
        
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
        :host([color="green"]) { color: var(--green, green); }
        :host([color="purple"]) { color: var(--deep-purple, purple); }
        :host([color="pink"]) { color: var(--pink, pink); }
        :host([color="teal"]) { color: var(--teal, brown); }
        :host([color="brown"]) { color: var(--brown, brown); }

        :host([gradient]),
        :host([color="gradient"]) {
            background-image: var(--theme-gradient,var(--theme-text, #000));
            background-size: 100%;
            background-repeat: repeat;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -moz-background-clip: text;
            -moz-text-fill-color: transparent;
        }

        :host([gradient="reverse"]) {
            background-image: var(--theme-gradient-reverse, var(--theme-gradient ,var(--theme-text, #000)));
        }

        :host([link]),
        :host([href]) {
            cursor: default;
        }

        :host([nopointer]) {
            pointer-events: none;
        }

        :host([link].popover-open),
        :host([href]:not([href=""]):not([color])){
            color: var(--b-text-link-color, var(--theme, var(--blue, blue)));
        }

        @media (hover){
            :host([link]:hover){
                --theme-text: var(--b-text-link-color, var(--theme, var(--blue, blue)));
                color: var(--b-text-link-color, var(--theme, var(--blue, blue)));
                /* for use in nested children */
                --b-text-hover-color: var(--b-text-link-color, var(--theme, var(--blue, blue)));
            }

            :host([href]:not([href=""]):hover) {
                text-decoration: underline;
            }
        }

        :host([sup]) {
            vertical-align: super;
            margin-top: -1em;
        }

        /* Inter font feature */
        :host([tnum]) { font-feature-settings: 'tnum', 'ss01', 'ss02', 'ss03';}
        :host([tnum="only"]) { font-feature-settings: 'tnum';}

        :host([sub]) {
            vertical-align: sub;
            margin-bottom: -1em;
        }

        ::slotted(b-icon) {
            vertical-align: middle;
        }

        :host([inline]) p,
        :host([inline]) ::slotted(p) { display: inline; }

        ::slotted(p:first-child) {margin-top: 0;}
        ::slotted(p:last-child) {margin-bottom: 0;}

        :first-of-type,
        ::slotted(p:first-of-type) {
            margin-top: 0;
        }

        :last-of-type,
        ::slotted(p:last-of-type) {
            margin-bottom: 0;
        }

        :host([body]) ::slotted(b-icon) {
            vertical-align: middle;
        }

        [name="empty-html"]:not(:first-child) {
            display: none;
        }
    `}

    firstUpdated(){

        this.addEventListener('click', this.onClick)

        if( this.hasAttribute('clip') && this.getAttribute('clip') != 'notitle' && !this.hasAttribute('title') && !this.hasAttribute('notitle') )
            this.title = this.textContent.replace(/\s{2,}/g, ' ').trim()
    }

    onClick(e){
        let href = this.getAttribute('href')
        if( href ){
            e.stopPropagation()
            if( !href.match(/^mailto/) && href.match(/@/) && !href.match(/^http/) ) href = 'mailto:'+href

            if( this.getAttribute('target') == '_blank' || e.ctrlKey || e.metaKey )
                window.open(href, '_blank')
            else
                location.href = href
        }

        // Blackstone app pattern
        let goto = this.getAttribute('goto')
        if( goto && window.goTo )
            goTo(goto)
    }

    render(){return html`
        ${this.html?(isLitHTML(this.html)?this.html:unsafeHTML(this.html)):''}
        <slot name="empty-html"></slot>
        <slot class="slot"></slot>
        ${this.tooltip?html`
            <b-tooltip>${this.tooltip}</b-tooltip>
        `:''}
    `}

})

export default customElements.get('b-text')