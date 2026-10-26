import { LitElement, html, css } from 'lit'

customElements.define('b-root-titlebar', class extends LitElement{

    static get properties(){return {
        title: {type: String},
    }}

    static get styles(){return css`
        :host {
            display: flex;
            align-items: center;
            gap: .35em;
            position:relative;
            padding-left: var(--root-titlebar-padding-left, .35em);
            padding-right: .5em;
            /* padding-right: 1em; */
            /* margin-right: .5em; */
            align-self: stretch;
            /* border-right: solid 2px var(--theme-bgd-accent); */
        }

        :host-context(b-panel-toolbar) {
            padding-left: 0;
            padding-right: 0;
            margin: -.4em 0 -.4em -.3em
        }

        :host-context(b-list-toolbar) {
            margin-left: -.5em;
        }

        slot.right::slotted(:last-child) {
            margin-right: -.35em;
        }
        
        b-text {
            position: relative;
        }

        /* title in the app's display font (falls back to the normal font) */
        :host > b-text slot[name="title:inner"] {
            display: inline-block;
            font-family: var(--font-display, inherit);
            font-weight: 400;
            font-size: var(--font-size-md, 1.1892em);
            line-height: 1;
        }

        b-text[lg] {
            margin-bottom: -.15em; /* make up for descenders */
        }

        b-btn {
            align-self: stretch;
        }

        [part="close-btn"] {
            flex-shrink: 0;
            order: -10;
            align-self: center;
            margin-left: .1em; /* clear of the panel edge (its hover bgd) */
        }

        /* bigger icon in the same size btn */
        [part="close-btn"]::part(main) {
            padding: .25em;
        }

        [part="close-btn"]::part(icon) {
            --size: 1.3em;
        }

        /* point toward where the panel closes */
        [part="close-btn"]::part(icon) {
            transform: rotate(var(--b-panel-toolbar-close-btn-rotation, 0deg));
        }

        /*::slotted(b-btn:last-child) {
            margin-right: .35em;
        }*/
    `}

    firstUpdated(){
        if( this.slot ) return
        
        if( this.parentElement && this.parentElement.tagName == 'B-LIST' )
            this.slot = 'toolbar:before'
        else if( this.panel )
            this.slot = 'close-btn'
    }

    close(){
        this.emitEvent('close-panel')
    }

    get panel(){
        return this.getRootNode().host.panel
    }

    get titleVal(){
        return this.title || (this.panel&&this.panel.title) 
        || (this.parentElement && this.parentElement.host && this.parentElement.host.constructor.title)
    }

    render(){return html`

        ${this.panel?html`
            <b-btn clear lg pill icon="chevron_right" part="close-btn" @click=${this.close}></b-btn>
        `:''}

        <slot name="left"></slot>

        <b-text bold part="title">
            <slot name="title">
                <slot name="title:before"></slot>
                <slot name="title:inner"><b-text ?link=${this.about} @click=${this.viewAbout}>
                    ${this.titleVal}
                    ${this.about?html`
                        <b-tooltip label>About this view</b-tooltip>
                    `:''}
                </b-text></slot>
                <slot name="title:after"></slot>
            </slot>
        </b-text>

        <slot class="right"></slot>
    `}

    viewAbout(e){
        this.about?.(e)
    }

})


export default customElements.get('b-root-titlebar')