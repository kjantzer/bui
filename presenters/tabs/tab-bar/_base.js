import { LitElement, html, css } from 'lit'

export {LitElement, html, css}

export default class BaseTabBar extends LitElement{

    static styles = css`

        :host {
            display: flex;
            gap: .5em;
        }

        :host([layout="top"]),
        :host([layout="bottom"]) {
            flex-direction: row;
            overflow-x: auto;
        }

        :host([layout="left"]),
        :host([layout="right"]) {
            flex-direction: column;
            overflow-y: auto;
        }

        :host([layout="top"]) { border-bottom: solid 1px var(--border-color, var(--theme-bgd-accent)); }
        :host([layout="bottom"]) { border-top: solid 1px var(--border-color, var(--theme-bgd-accent)); }
        :host([layout="left"]) { border-right: solid 1px var(--border-color, var(--theme-bgd-accent)); }
        :host([layout="right"]) { border-left: solid 1px var(--border-color, var(--theme-bgd-accent)); }

        @media (max-width: 899px) and (orientation:portrait) {
            :host([layoutmobile="left"]),
            :host([layoutmobile="right"]) {
                flex-direction: column;
                overflow-y: auto;
                overflow-x: hidden;
            }

            :host([layoutmobile="top"]),
            :host([layoutmobile="bottom"]) {
                flex-direction: row;
                overflow-x: auto;
                overflow-y: hidden;
            }

            :host([layoutmobile="top"]) { border: none; border-bottom: solid 1px var(--border-color, var(--theme-bgd-accent)); }
            :host([layoutmobile="bottom"]) { border: none; border-top: solid 1px var(--border-color, var(--theme-bgd-accent)); }
            :host([layoutmobile="left"]) { border: none; border-right: solid 1px var(--border-color, var(--theme-bgd-accent)); }
            :host([layoutmobile="right"]) { border: none; border-left: solid 1px var(--border-color, var(--theme-bgd-accent)); }
        }

    `

    // constructor(){
    //     super()
    //     this.slot = 'tabbar'
    // }

    render(){return html`

        <slot name="before"></slot>

        ${this.renderLoop()}

        <slot name="after"></slot>
    `}

    // firstUpdated(){
    //     if( !this.parentElement?.views )
    //         this.slot = null
    // }

    // in case subclass wants to wrap buttons in another element
    renderLoop(){ return html`
        ${this.views?.map((v,i)=>html`
            ${v.canDisplay?html`

                <slot name="before:${v.id}"></slot>
                
                ${this.renderBtn(v, i)}

                <slot name="after:${v.id}"></slot>
            `:''}
        `)}
    `}

    renderBtn(view, index){ return html`
        <b-btn icon="${view.icon}" ?active=${view.active} .tabView=${view} @click=${this.onMenuClick}>
            <span>${view.title}</span>
        </b-btn>
    `}

}