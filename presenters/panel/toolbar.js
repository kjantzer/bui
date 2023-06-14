import {LitElement, html, css} from 'lit'

// TODO: rename to PanelTitlebar
class PanelToolbar extends LitElement {

    static get properties(){return {
        title: {type: String},
        look: {type: String, reflect: true},
        closebtn: {type: String, reflect: true}
    }}

    constructor(){
        super()
        this.title = ''
        this.look = ''
        this.closebtn = 'cancel-1'
    }

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            /* background: linear-gradient(to bottom, #fff, #f5f5f5); */
            padding: .5em;
            padding: .4em .5em .3em;
            box-sizing: border-box;
            justify-content: space-between;
            align-items: center;
            border-radius: 4px 4px 0 0;
            min-height: 40px;
            grid-column: 1/-1; /* full width */
            min-width: 0;
            gap: .25rem;
        }

        :host ::slotted(*) {
            app-region: none;
        }

        :host([hidden]) { display: none; }

        /* @media (max-width: 599px) {
            .middle {
                display: none;
            }

            :host {
                grid-template-columns: auto auto;
            }
        } */

        :host([overlay]) {
            background: none;
            box-shadow: none;
            position: absolute;
            z-index: 100;
            pointer-events: none;
            top: 0;
            left: 0;
            width: 100%;
        }

        .middle {
            overflow: hidden;
            min-width: 20%;
        }

        :host([nomiddle]) {
            grid-template-columns: 1fr auto;
        }

        :host([nomiddle]) .middle {
            display: none;
        }

        :host([overlay]) > div * {
            pointer-events: initial;
        }

        :host([shadow]) {
            box-shadow: var(--theme-shadow) 0 0 6px;
        }

        :host([look="white"]) {
            background: #fff;
        }

        :host([look="silver"]) {
            background: linear-gradient(to bottom,#eee,#ddd);
            border-bottom: solid 1px #bbb;
        }

        :host([look="clear"]) {
            background: transparent;
        }

        :host([look="dark"]) {
            /* background: #2c3033; */
            background: linear-gradient(to bottom,#303538,#2c3033);
            color: #fff;
        }

        :host([look="dark"]) b-btn[outline] {
            --color: #ddd
        }

        :host([notitle]) slot[name="title"] {
            display: none;
        }

        .left, .right, .middle {
            display: flex;
            min-width: 0;
            align-items: center;
            gap: var(--b-panel-toolbar-content-gap, .5em);
        }

        slot::slotted(b-btn[lg]) {
            margin: -0.25em 0;
        }

        slot::slotted(b-btn[lg]:last-of-type) {
            margin-right: -0.25em;
        }

        .right {
            justify-content: flex-end;
        }

        [part="close-btn"][icon="chevron_right"] {
            width: 1.8rem;
            height: 1.8rem;
            flex-shrink: 0;
            transform: rotate(var(--b-panel-toolbar-close-btn-rotation, 0deg));
        }

        [part="close-btn"][icon="chevron_right"]::part(main) {
            padding-top: 0;
            padding-bottom: 0;

        }

        [part="close-btn"][icon="chevron_right"]::part(icon) {
            --size: 1.6rem;
        }

        /* hide on small devices in landscape (allow for more space for the content) */ 
        @media
        screen and (orientation:landscape) and (max-width:999px) and (max-height:599px)
        {
            :host(:not([alwaysshow])) {
                min-height: 0;
                padding: 0;
                height: 0;
                visibility: hidden;
                overflow: hidden !important;
            }
        }

        @media print {
            b-btn {
                display: none; /* assume we dont want buttons to display on print */
            }
        }

    `}

    get closeBtnIcon(){
        if( this.closebtn === 'arrow' ) return 'chevron_right'
        return this.closebtn
    }

    render(){return html`
        <div class="left" part="left">
            <slot name="close-btn">
                <b-btn ?outline=${this.closebtn!='arrow'} 
                    part="close-btn"
                    ?clear=${this.closebtn=='arrow'}
                    icon="${this.closeBtnIcon}" 
                    @click=${this.close}></b-btn>
            </slot>
            <slot name="left"></slot>
        </div>
        <div class="middle" part="middle">
            <slot name="middle">
                <slot name="title:before"></slot>
                <slot name="title"><b-text sm clip>${this.title}</b-text></slot>
                <slot name="title:after"></slot>
            </slot>
        </div>
        <div class="right" part="right">
            <slot name="right"></slot>
        </div>
    `}

    close(){
        this.panel&&this.panel.close()
    }
}

customElements.define('b-panel-toolbar', PanelToolbar)

export default  customElements.get('b-panel-toolbar')