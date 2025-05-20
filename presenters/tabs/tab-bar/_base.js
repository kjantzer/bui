import { LitElement, html, css } from 'lit'

export {LitElement, html, css}

export default class BaseTabBar extends LitElement{

    static styles = css`

        :host {
            display: flex;
            gap: .5em;
        }

        @container style(--layout: top) or style(--layout: bottom) {
            :host {
                flex-direction: row;
                overflow-x: auto;
            }
        }

        @container style(--layout: left) or style(--layout: right) {
            :host {
                flex-direction: column;
                overflow-y: auto;
            }
        }

        @container style(--layout: top) {
            :host { border-bottom: solid 1px var(--border-color, var(--theme-bgd-accent)); }
        }

        @container style(--layout: bottom) {
            :host { border-top: solid 1px var(--border-color, var(--theme-bgd-accent)); }
        }

        @container style(--layout: left) {
            :host { border-right: solid 1px var(--border-color, var(--theme-bgd-accent)); }
        }

        @container style(--layout: right) {
            :host { border-left: solid 1px var(--border-color, var(--theme-bgd-accent)); }
        }

        @media (max-width: 899px) and (orientation:portrait) {

            :host([layoutmobile="top"]) {  --layout: top; }
            :host([layoutmobile="bottom"]) {  --layout: bottom; }
            :host([layoutmobile="left"]) {  --layout: left; }
            :host([layoutmobile="right"]) {  --layout: right; }

           
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