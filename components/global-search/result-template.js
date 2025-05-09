import { LitElement, html, css } from 'lit'

function render(m, k, render){
    if( !m.get(k) ) return
    return render ? render(m.get(k)) : html`<b-text caps>${m.get(k)}</b-text>`
}

export {html, render}

customElements.define('b-global-search-result-row-template', class extends LitElement{

    static properties = {
        icon: {type: String},
        detail: {type: Boolean}
    }

    static styles = css`
        :host {
            display: grid;
            position:relative;
            grid-template-columns: auto 1fr min-content;
            gap: 1em;
            align-items: center;
        }

        :host-context(.show-detail) {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
        }

        b-grid {
            line-height: 1.4em;
        }

        [name="detail"] { display: none; }

        :host-context(.show-detail) [name="detail"] {
            display: contents;
        }

        .img {
            display: block;
            width: 3em;
            height: 3em;
            align-self: flex-start;
            position: relative;
        }

        .img .icon {
            position: absolute;
        }
        
        :host([sm]) .img {
            width: 2em;
            height: 2em;
        }

        :host-context(.show-detail) .img {
            width: 6em;
            height: 6em;
        }

        .img ::slotted(*) {
            width: 100%;
            --size: 3em;
            --radius: 8px;
        }

        .img ::slotted([mark]) {
            position: absolute;
            left: 0;
            top: 0;
            --size: 1em;
            width: var(--size);
            height: var(--size);
            background: var(--theme-bgd);
            border-radius: 0 0 4px 0;

            border-radius: 1em;
            padding: 2px;
            left: -4px;
            top: -4px;
        }

        :host-context([active]) [name="img"]::slotted([mark]) {
            background-color: var(--theme-bgd-accent);
        }

        :host-context(.show-detail) [name="img"]::slotted(*) {
            --size: 6em;
        }

        :host-context(.show-detail) [name="img"]::slotted([mark]) {
            --size: 1.2em;
        }

        .img ::slotted([mark="auto"]){
            width: auto;
            height: auto;
            border-radius: 3px;
        }

        .icon {
            background-color: var(--theme-bgd-accent);
            border-radius: 8px;
            width: 100%;
            height: 100%;
            display: grid;
            align-items: center;
            justify-content: center;
            --size: 2.5em;
        }

        :host([sm]) .icon {
            --size: 1.5em;
        }

        :host-context([active]) .icon {
            background-color: var(--theme-bgd-accent2);
            box-shadow: var(--theme-shadow-3);
        }

        :host-context(.show-detail) .icon {
            background-color: var(--theme-bgd);
            box-shadow: var(--theme-shadow-3);
            border-radius: 1rem;
            font-size: 1.6em;
        }

        [name="right"]::slotted(*) {
            max-width: 40%;
            text-align: right;
        }

        :host-context(.show-detail) [name="right"] {
            display: none;
        }
    `

    render(){return html`
        
        <div class="img">
            ${this.icon?html`
                <div class="icon"><b-icon square name=${this.icon}></b-icon></div>
            `:''}
            <slot name="img"></slot>
        </div>

        <b-grid cols=1 gap=${this.detail?" ":0}>

            <b-text bold ?clip=${!this.detail} ?balance=${this.detail}>
                <slot name="title"></slot>
            </b-text>

            <b-text italic _sm ?clip=${!this.detail} ?balance=${this.detail}>
                <slot name="subtitle"></slot>
            </b-text>

            <slot></slot>

            <slot name="detail"></slot>
        </b-grid>

        <slot name="right"></slot>
    `}

})