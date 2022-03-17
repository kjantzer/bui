import { LitElement, html, css } from 'lit-element'

customElements.define('b-ribbon', class extends LitElement{

    static get properties(){ return {
        pos: {type: String, reflect: true},
        value: {type: String, reflect: true},
        shadow: {type: Boolean, reflect: true}
    }}

    constructor(){
        super()
        this.pos = 'left'
        this.value = ''
        this.shadow = true;
    }

    static get styles(){return css`
        :host {
            --width: calc(.9ch * var(--char-len));
            --height: 1em;
            --padding: .25em;
            --color: var(--blue);
            --shadow: none;
            --offset: -2px;

            line-height: 1em;
            overflow: hidden;
            position: absolute;
            left: var(--offset);
            top: var(--offset);
            padding: 0 calc(var(--width) / 2) calc(var(--width) / 2) 0;
            pointer-events: none;

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
        }

        :host([hidden]){ display: none; }
        
        :host([shadow]) {
            --shadow: rgba(0,0,0,.5) 0 10px 5px -10px;
        }

        :host([pos="right"]) {
            left: auto;
            right: var(--offset);
            padding: 0 0 calc(var(--width) / 2) calc(var(--width) / 2);
        }

        .wrap {
            /* background: yellow; */
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--width);
            height: var(--width);
        }

        .inner {
            width: var(--width);
            max-height: var(--height);
            overflow: hidden;
        }

        .ribbon {
            pointer-events:all;
            transform-origin: center center;
            position: relative;
            padding: var(--padding) calc(var(--width) / 1.5);
            width: var(--width);
            height: var(--height);
            background: var(--color);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow);
            text-align: center;
            transform: rotateZ(-45deg);
            backface-visibility: hidden;
            z-index: 10;
            font-weight: bold;
        }

        :host([pos="right"]) .ribbon {
            transform: rotateZ(45deg);
        }

    `}

    firstUpdated(){
        // TODO: update this when content changes?
        this.style.setProperty('--char-len', this.textContent.trim().length)
    }

    render(){return html`
        <div class="wrap">
            <div class="ribbon">
                <div class="inner">
                    <slot>${this.value}</slot>
                </div>
            </div>
        </div>
    `}

})

export default customElements.get('b-ribbon')