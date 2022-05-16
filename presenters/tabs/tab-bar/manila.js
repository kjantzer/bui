import { LitElement, html, css } from 'lit'

customElements.define('b-tab-bar-manila', class extends LitElement{

    static get styles(){return css`
        :host(.tab-bar) {
            display: flex;
            /* justify-content: flex-end; */

            border-bottom: none !important;
            /* box-shadow: 0 -1px var(--theme-bgd-accent) inset; */
            box-shadow: 0 -3px 5px -3px var(--theme-shadow) inset;
            padding: .35em .5em 0;
        }

        ::slotted(b-btn),
        b-btn {
            --padding:  0.5em;
            --radius:  5px 5px 0 0;
            z-index: 100;
            border: solid 1px var(--theme-bgd-accent);
            border-bottom-color: var(--theme-bgd);
            flex-grow: var(--b-tab-flex-grow, 0)
        }

        b-btn[active] {
            --bgdColor: var(--contentBgd, none);
            box-shadow: 0 0px 2px var(--theme-shadow);
        }

        b-btn:not([active]) {
            border-color: transparent;
        }

        b-btn:not([active]):not(:hover){
            color: var(--theme-text-accent);
        }

    `}

    render(){return html`

        <slot name="menu:before"></slot>

        ${this.views.map(v=>html`
            ${v.canDisplay?html`

                <slot name="before:${v.id}"></slot>

                <b-btn part="tab" text icon="${v.icon||''}" ?active=${v.active} .tabView=${v} @click=${this.onClick}>
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

