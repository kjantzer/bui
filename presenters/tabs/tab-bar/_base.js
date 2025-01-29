import { LitElement, html, css } from 'lit'

export {LitElement, html, css}

export default class BaseTabBar extends LitElement{

    static styles = css`

    `

    constructor(){
        super()
        this.slot = 'tabbar'
    }

    render(){return html`

        <slot name="before"></slot>

        ${this.renderLoop()}

        <slot name="after"></slot>
    `}

    firstUpdated(){
        if( !this.parentElement?.views )
            this.slot = null
    }

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