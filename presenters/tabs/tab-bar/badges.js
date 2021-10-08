import { LitElement, html, css } from 'lit-element'

customElements.define('b-tab-bar-badges', class extends LitElement{

    static get styles(){return css`
        :host(.tab-bar) {
            display: flex;
            justify-content: flex-end;

            border-bottom: none !important;
            padding: .35em 0;
        }

        ::slotted(b-btn),
        b-btn {
            --padding: .25em .5em;
        }

        b-btn:not([active]) {
            --bgdColor: none;
            --borderColor: transparent;
            color: var(--theme-text);
        }

    `}

    render(){return html`

        <slot name="menu:before"></slot>

        ${this.views.map(v=>html`
            ${v.canDisplay?html`

                <slot name="before:${v.id}"></slot>

                <b-btn pill color="theme" icon="${v.icon}" ?active=${v.active} .tabView=${v} @click=${this.onClick}>
                    <span>${v.title}</span>
                </b-btn>

                <slot name="after:${v.id}"></slot>

            `:''}
        `)}

        <slot name="menu:after"></slot>
    `}

    onClick(e){
        this.onMenuClick(e)
    }

})

