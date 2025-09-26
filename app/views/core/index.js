/*
    Core View - 2025 UI refresh based on b-tabs
*/
import { LitElement, html, css } from 'lit'
import Tabs from '../../../presenters/tabs'
// import './menu-bar'
import './menu-btn'
import '../router-controller'

import { MediaQueries, mediaQuery } from '../../../util/mediaQueries'

MediaQueries.set('layoutstandard', styles=>css`
    @media (orientation:landscape), (min-width: 900px) {
        ${styles}
    }
`)

MediaQueries.set('layoutmobile', styles=>css`
    @media (max-width: 899px) and (orientation:portrait) {
        ${styles}
    }
`)

customElements.define('b-app-core-view', class extends Tabs{

    static styles = [super.styles, css`
        :host {
            background-color: var(--theme-bgd-accent2);
            --b-app-tab-bar-sticky-bgd: transparent;
            --layout: left;
        }

        :host > main {
            grid-template-rows: auto 1fr;
        }

        [part="tab-bar"] {
            grid-row: 1 / span 2;
            border: none;
        }

        slot.content {
            background: var(--theme-bgd);
            border-radius: var(--radius) 0 0 0;
            box-shadow: var(--theme-shadow-1);
        }

        @container style(--layout: left) or style(--layout: right) {
            [part="tab-bar"] {
                background: none;
                width: var(--tab-bar-width, 200px);
            }
        }

        [name="tabbar"] ::slotted(aside) {
            padding: 0 1em 1em 1em;
            text-align: center;
        }

        [name="before"]::slotted(header) {
            padding: 1em 1em 1em 0;
            overflow-x: auto;
            scrollbar-width: none;
        }

        @container style(--layout: bottom) {

            :host([layoutmobile="bottom"]) {
                grid-template-rows: auto 1fr auto;
            }

            [part="tab-bar"] {
                grid-row: 3;
            }

            slot.content {
                border-radius: var(--radius) var(--radius) 0 0;
                box-shadow: var(--theme-shadow-2);
            }
        
            [name="tabbar"] ::slotted(aside) { display: none; }
            [name="before"]::slotted(header) { padding: 1em; }
        }

        @container style(--layout: left) and style(--minimize) {
            [name="tabbar"] ::slotted(aside) { display: none; }
        }

        ${mediaQuery('layoutmobile', css`
            :host {
                --layout: bottom;
            }
        `)}

        @media (max-height: 599px) and (orientation:landscape) {
            [name="before"]::slotted(header) {
                display: none;
            }
        }

        @container style(--layout: left) and style(--minimize) {
            [part="tab-bar"] {
                background: none;
                width: var(--tab-bar-width, 5em);
            }
        }
    `]

    constructor(){
        super()
        this.tabBarBtnRender = this.defaultTabBarBtnRender.bind(this)

        this.setAttribute('tab-bar', 'b-app-tab-bar')
    }

    defaultTabBarBtnRender(btn, view, onClick){
        return html`
            <b-app-core-menu-btn .tabView=${view} ?active=${view.active} @click=${onClick} part="tab-bar-btn"
                ?hidden=${view.view.shouldShowTabBtn?.()===false}>
                <slot></slot>
                <slot name="wide"></slot>
            </b-app-core-menu-btn>
        `
    }

})
