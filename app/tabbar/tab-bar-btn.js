import { LitElement, html, css } from 'lit'
import {mediaQuery} from '../../util/mediaQueries'

customElements.define('b-app-tab-bar-btn', class extends LitElement{

    static properties = {
        active: {type: Boolean},
        icon: {type: String},
        label: {type: String}
    }

    static styles = css`
        :host {
            display: contents;
        }

        b-btn {
            color: var(--b-app-tab-bar-text-color, var(--theme-text));
            text-align: center;
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
            font-size: 1.1em;
            padding-top: .25em;
            padding-bottom: .25em;
            --b-btn-stacked-icon-opacity: var(--b-app-tab-bar-bgd-stacked-icon-opacity, .3);
            

            border-radius: var(--btn-radius);
            margin: .25em 0;
            min-width: var(--b-app-tab-bar-btn-min-width, 70px);
            /*flex-grow: 1;*/
            flex-shrink: 0;
            touch-action: manipulation;
        }

        b-btn::part(icon) {
            --theme: currentColor;
            --theme-secondary: currentColor;
        }

        b-btn > span {
            margin-top: .25em;
            font-weight: 700;
        }
        
        @media (min-width:900px) {
            b-btn {
                font-size: 1.2em;
                padding-bottom: 0;
            }
        }

        b-btn[active] {
            --b-btn-stacked-icon-opacity: 1;
            /* color: var(--b-app-tab-bar-active-color, var(--theme-text)); */
            /* top border */
            /* box-shadow: black 1px 6px 0px -2px inset; */
            /* border-radius: 0; */
            /* --bgdColor: rgba(var(--theme-text-rgb),.1); */

            color: var(--b-app-tab-bar-active-color-text, white);
            background: var(--b-app-tab-bar-active-color, var(--theme));
        }
        
        b-btn[active] span {
            opacity: 1;
        }
        
        b-btn:not([active]):hover {
            --hoverBgdColor: rgba(var(--theme-text-rgb), .1);
        }

        b-btn::part(main) {
            --bgdColor: none;
        }

        :host([part="close-btn"]),
        :host(.search-btn) {
            position: sticky;
            right: 0;
            left: 0;
            top: 0;
            z-index: 12;
            display: block;
            flex-grow: 0 !important;
        }

        /*@container style(--layout: left) {
            :host([part="close-btn"]) {
                top: -.5em;
                margin-top: -.5em;
            }
        }*/

        @container style(--layout: bottom) {
            :host([part="close-btn"]) {
                left: -.5em;
                margin-left: -.5em;
            }
        }

        :host([part="close-btn"]) b-btn,
        :host(.search-btn) b-btn  {
            flex-grow: 0;
            margin: 0;
            border-radius: 0px;
            min-width: 0;
            /*border-right: solid 1px var(--light-text);*/

            position: sticky;
            left: 0;
            top: 0;
            z-index: 1000;
            
            background: var(--b-app-tab-bar-sticky-bgd, var(--theme-bgd));

            height: 3em;
            
            min-width: 3em;
        }

        :host(.search-btn) {
            margin-top: auto;
        }

        :host(.search-btn) b-btn {
            left: auto;
            right: 0;
        }

        @container style(--layout: bottom) {

            :host([part="close-btn"]) b-btn,
            :host(.search-btn) b-btn  {
                height: calc(100% + env(safe-area-inset-bottom));
                box-shadow: var(--theme-shadow-2);
                padding-bottom: env(safe-area-inset-bottom);
                margin-bottom: calc(env(safe-area-inset-bottom) * -1);
            }

            :host(.search-btn) {
                margin-left: auto;
                margin-top: 0;
            }

            :host(.search-btn) b-btn {
                margin-left: .5em;
            }
        }

        :host([part="close-btn"]) b-btn::part(icon) {
            rotate: var(--b-panel-toolbar-close-btn-rotation, 0deg);
        }

        @container style(--layout: left) or style(--layout: right) {

            b-btn {
                padding-top: .5em;
                padding-bottom: .35em;

                margin: 0 .25em;
                flex-shrink: 1;
            }

            b-btn > span {
                display: inline-block;
                line-height: 1em;
                font-size: var(--font-size-sm);
                margin-top: .5em;
                max-width: min-content;
            }
        }
    `

    set tabView(val){
        let oldVal = this.tabView
        this.__view = val
    
        this.requestUpdate('tabView', oldVal)
    }
    
    get tabView(){ return this.__view || {} }

    render(){return html`

        <slot name="before"></slot>

        <b-btn text stacked part="btn"
            goto=${this.getAttribute('goto')}
            vid=${this.tabView.id}
            icon="${this.icon||(typeof this.tabView.icon==='string'?this.tabView.icon:'')}" 
            ?active=${this.active} 
        >

            ${this.tabView._viewClass?.tabBarBtn?html`

                ${this.tabView._viewClass.tabBarBtn(this)}

            `:html`

                ${!this.icon&&typeof this.tabView.icon !== 'string'?html`
                    <span slot="icon" part="icon">${this.tabView.icon}</span>
                `:''}
                <span part="label">${this.label||this.tabView.toolbarTitle}</span>

            `}

           <slot></slot>

        </b-btn>

        <slot name="after"></slot>
    `}

})

export default customElements.get('b-app-tab-bar-btn')