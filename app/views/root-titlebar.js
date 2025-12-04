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
            padding-left: .35em;
            padding-right: .5em;
            /* padding-right: 1em; */
            /* margin-right: .5em; */
            align-self: stretch;
            /* border-right: solid 2px var(--theme-bgd-accent); */
        }

        :host-context(b-panel-toolbar) {
            padding-left: 0;
            padding-right: 0;
            margin: -.4em 0 -.4em .3em;
        }

        slot.right::slotted(:last-child) {
            margin-right: -.35em;
        }
        
        b-text {
            position: relative;
        }

        :host > b-text slot b-text {
            background: var(--theme-bgd-accent);
            padding: .25em .75em;
            border-radius: 1em;
        }

        b-text[lg] {
            margin-bottom: -.15em; /* make up for descenders */
        }

        b-btn {
            margin-left: -.5em;
            align-self: stretch;
        }

        [icon="chevron_right"] {
            flex-shrink: 0;
            order: -10;
        }

        [icon="chevron_right"]::part(icon) {
            transform: rotate(var(--b-panel-toolbar-close-btn-rotation, 0deg)) scale(1.4);
        }

        [icon="chevron_right"]::part(main) {
            padding-top: 0;
            padding-bottom: 0;
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
            <b-btn text lg icon="chevron_right" part="close-btn" @click=${this.close}></b-btn>
        `:''}

        <slot name="left"></slot>

        <b-text bold>
            <slot name="title">
                <slot name="title:before"></slot>
                <slot name="title:inner"><b-text>${this.titleVal}</b-text></slot>
                <slot name="title:after"></slot>
            </slot>            
        </b-text>

        <slot class="right"></slot>
    `}

})


export default customElements.get('b-root-titlebar')