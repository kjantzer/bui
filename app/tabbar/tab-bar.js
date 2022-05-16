import { LitElement, html, css } from 'lit'
import device from '../../util/device'
import {mediaQuery} from '../../util/mediaQueries'
import scrollbars from '../../helpers/scrollbars'

customElements.define('b-app-tab-bar', class extends LitElement{

    static get styles(){return css`
        
        :host(.tab-bar) {
            display: flex;
            background: var(--b-app-tab-bar-bgd, var(--theme-bgd)) !important;
            border-top: none !important;
            padding-bottom: calc(env(safe-area-inset-bottom) / 1.5);
            --padding: 0 .25em;
            --btn-radius: .75em;
            position: relative;
        }

        main {
            display: flex;
            flex-grow: 1;
            overflow: auto;

            position: relative;
            padding: var(--padding)
        }

        ${mediaQuery('sm', css`
        /* dull the bgd color a little */
        :host(.tab-bar):before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background: linear-gradient(60deg, #000, #555);
            opacity: .1;
        }
        `)}

        @media (orientation:landscape) {
            :host {
                padding-left: calc(0.6 * env(safe-area-inset-left)) !important;
                padding-right: calc(0.1 * env(safe-area-inset-left)) !important;
            }
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
            flex-grow: 1;
            flex-shrink: 0;
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
            --hoverBgdColor: rgba(var(--theme-text-rgb),.01);
        }

        [icon="search"] {
            display: var(--app-tab-bar-search-display, inline-block);
        }

        /* phones in landscape */
        @media /*(max-height: 599px) and (orientation:landscape),*/
        (min-width:900px) and (min-height: 600px), (min-width: 700px){

            :host(.tab-bar) {
                /* display: grid !important; */
                flex-direction: column;
                border-right: solid 1px var(--theme-bgd-accent);
                --tab-bar-order: 0;
                --padding: .5em 0;
            }

            main {
                display: grid !important;
                border-top:none !important;
                flex-grow: 0;
                grid-template-columns: repeat(auto-fit, 72px);
                align-content: flex-start;
                gap: .5em;
            }

            /* :host(.tab-bar):not([layout="bottom"]) {
                order: 0 !important;
            } */

            b-btn {
                padding-top: .5em;
                padding-bottom: .35em;

                margin: 0 .25em;
                flex-shrink: 1;
            }

            b-btn[active] {
                /* left border */
                /* box-shadow: var(--b-app-tab-bar-active-color, var(--theme-chosen, var(--theme-text))) 6px 1px 0px -2px inset; */
                /* border-top-left-radius: 0;
                border-bottom-left-radius: 0; */
            }

            b-btn > span {
                display: inline-block;
                line-height: 1em;
                font-size: .85em;
                margin-top: .5em;
            }

            /* [icon="search"] {
                display: none;
            } */
        }

        ${scrollbars.hide('main')}
    `}

    render(){return html`

        <slot name="before"></slot>

        <main>

        ${this.views.map(v=>html`
            ${v.canDisplay&&(!device.isMobile||v.id!='emails')?html`

                <slot name="before:${v.id}"></slot>

                <b-btn text vid=${v.id} stacked icon="${typeof v.icon==='string'?v.icon:''}" ?active=${v.active} .tabView=${v} @click=${this.onClick}>
                    ${typeof v.icon !== 'string'?html`
                        <span slot="icon">${v.icon}</span>
                    `:''}
                    <span>${v.title}</span>
                </b-btn>

                <slot name="after:${v.id}"></slot>

            `:''}
        `)}

        ${this.shouldShowSearch?html`
            <b-btn text stacked icon="search" @click=${this.focusSearch}>
                <span>Search</span>
            </b-btn>
        `:''}

        </main>

        <slot name="after"></slot>
    `}

    get shouldShowSearch(){
        return device.isMobile && !this.host.hasAttribute('no-search')
    }

    focusSearch(){
        window.dispatchEvent(new Event('focus-search'))
    }

    onClick(e){
        this.onMenuClick(e)
    }

})

