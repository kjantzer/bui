import {LitElement, html, css} from 'lit-element'

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

        :host([overlay]) > div * {
            pointer-events: initial;
        }

        :host([shadow]) {
            box-shadow: rgba(0,0,0,.2) 0 0 6px;
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

        slot[name="title"] {
            font-weight: bold;
            font-size: 1.1em;
        }

        :host([notitle]) slot[name="title"] {
            display: none;
        }

        .right {
            text-align: right;
        }

        [part="close-btn"] {
            width: 1.95rem;
            height: 1.95rem;
            flex-shrink: 0;
            transform: rotate(var(--b-panel-toolbar-close-btn-rotation, 0deg));
        }

        [part="close-btn"][icon="right-open"]::part(main) {
            padding-top: 0;
            padding-bottom: 0;

        }

        [part="close-btn"][icon="right-open"]::part(icon) {
            --size: 1.8rem;
        }

        /* hide on small devices in landscape (allow for more space for the content) */ 
        @media
        screen and (orientation:landscape) and (max-width:999px) and (max-height:599px)
        {
            :host {
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
        if( this.closebtn === 'arrow' ) return 'right-open'
        return this.closebtn
    }

    render(){return html`
        <div class="left">
            <slot name="close-btn">
                <b-btn ?outline=${this.closebtn!='arrow'} 
                    part="close-btn"
                    ?clear=${this.closebtn=='arrow'}
                    icon="${this.closeBtnIcon}" 
                    @click=${this.close}></b-btn>
            </slot>
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <slot name="title">${this.title}</slot>
            <slot name="middle"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    `}

    close(){
        this.panel&&this.panel.close()
    }
}

customElements.define('b-panel-toolbar', PanelToolbar)

export default  customElements.get('b-panel-toolbar')