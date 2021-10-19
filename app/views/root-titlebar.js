import { LitElement, html, css } from 'lit-element'

customElements.define('b-root-titlebar', class extends LitElement{

    static get properties(){return {
        title: {type: String},
    }}

    constructor(){
        super()
        this.slot = 'toolbar:before'
    }

    static get styles(){return css`
        :host {
            display: flex;
            align-items: center;
            gap: .35em;
            position:relative;
            padding-left: .35em;
            padding-right: 1em;
            /* margin-right: .5em; */
            align-self: stretch;
            /* border-right: solid 2px var(--theme-bgd-accent); */
        }

        b-text[lg] {
            margin-bottom: -.15em; /* make up for descenders */
        }

        b-btn {
            margin-left: -.5em;
        }

        [icon="down-open"] {
            width: 1.95rem;
            height: 1.85rem;
            flex-shrink: 0;
        }

        [icon="down-open"]::part(main) {
            padding-top: 0;
            padding-bottom: 0;
        }

        [icon="down-open"]::part(icon) {
            --size: 1.5rem;
        }
    `}

    close(){
        this.panel&&this.panel.close()
    }

    get panel(){
        return this.getRootNode().host.panel
    }

    render(){return html`

        ${this.panel?html`
            <b-btn text icon="down-open" @click=${this.close}></b-btn>
        `:''}

        <slot name="left"></slot>

        <b-text lg xbold>${this.title||(this.panel&&this.panel.title)}</b-text>

        <slot></slot>
    `}

})


export default customElements.get('b-root-titlebar')