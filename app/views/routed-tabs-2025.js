/*
    Routed Tabs - 2025 UI refresh

    NOTE: not in love with these tag names
*/
import { LitElement, html, css } from 'lit'
import TabsRouter from './routed-tabs'
import PillBar from '../../presenters/tabs/tab-bar/pill-bar'
import TabBarBtn from '../tabbar/tab-bar-btn'
import { MediaQueries, mediaQuery } from '../../util/mediaQueries'

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

customElements.define('b-app-tab-bar-2025-pill', class extends PillBar{

    static styles = [super.styles, css`
        :host(.tab-bar)  {
            margin: 0;
            padding: .25em;
            border-bottom: solid 1px var(--theme-bgd-accent);
            --pill-bar-bgd: transparent;
        }

        .bar {
            width: unset;
        }
    `]

})

// export default customElements.get('b-app-tab-bar-2025-pill')

customElements.define('b-app-tab-bar-2025-btn', class extends TabBarBtn{

    static styles = [super.styles, css`
        :host {
            display: grid;
            position:relative;
        }

        :host([hidden]) {
            display: none;
        }

        .wide {
            display: none;
            position: relative;
        }

        :host(:not([external])) .external { display: none; }

        .external {
            color: var(--theme-text-accent);
            font-size: var(--font-size-xs);
            position: absolute;
            right: 1.25em;
            top: 1.25em;
        }

        :host > .external {
            color: var(--b-app-tab-bar-text-color, var(--theme-text));
        }

        .wide .external {
            display: none;
        }

        @media (orientation:landscape), (min-width: 900px) {

            :host > .external {
                display: none;
            }

            .wide .external {
                display: inline-block;
            }

            .wide {
                margin: 0 1em;
                padding: 1em;
                display: grid;
                grid-template-columns: auto 1fr;
                align-items: center;
                gap: 1em;
                border-radius: 4em;
                user-select: none;
            }

            :host([active]) .wide {
                background: var(--theme-gradient);
                color: white;
                box-shadow: 1px 1px 4px var(--theme-shadow);
            }

            b-icon[square] {
                padding: .25em;
                margin: -.25em;
                background: var(--theme-bgd);
                border-radius: 2em;
                box-shadow: 1px 1px 4px var(--theme-shadow);
            }

            :host([active]) b-icon[square] {
                background: none;
                box-shadow: var(--theme-shadow-2) inset;
            }

            :host(:not([active])) .wide:hover {
                background: var(--theme-bgd-accent);
            }

            b-btn[stacked] {
                display: none;
            }

        }
    `]

    render(){return html`
        ${super.render()}

        <b-icon name="call_made" class="external"></b-icon>
        
        <div class="wide">

            ${!this.icon&&typeof this.tabView.icon !== 'string'?html`
                ${this.tabView.icon}
            `:''}

            ${this.icon||(typeof this.tabView.icon==='string'?this.tabView.icon:'')?html`
                <b-icon square name="${this.icon||(typeof this.tabView.icon==='string'?this.tabView.icon:'')}"></b-icon>
            `:''}

            <span part="label">${this.label||this.tabView.toolbarTitle}</span>

            <b-icon name="call_made" class="external"></b-icon>

            <slot name="wide"></slot>
        
        </div>
    `}

    // clickMenu(){
    //     this.$$('b-app-tab-bar-btn')?.click()
    // }

})

// export default customElements.get('b-app-tab-bar-2025-btn')


customElements.define('b-tabs-router-2025', class extends TabsRouter{

    static styles = [super.styles, css`
        :host {
            background-color: var(--theme-bgd-accent2);
            --b-app-tab-bar-sticky-bgd: transparent;
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
            box-shadow: var(--theme-shadow-3);
        }

        @media (orientation:landscape), (min-width: 900px) {
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

        ${mediaQuery('layoutmobile', css`

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
        `)}

        @media (max-height: 599px) and (orientation:landscape) {
            [name="before"]::slotted(header) {
                display: none;
            }
        }
    `]

    constructor(){
        super()
        this.tabBarBtnRender = this.defaultTabBarBtnRender.bind(this)

        this.layout = 'left'
        this.layoutmobile = 'bottom'

        this.setAttribute('tab-bar', 'b-app-tab-bar')
    }

    defaultTabBarBtnRender(btn, view, onClick){
        return html`
            <b-app-tab-bar-2025-btn .tabView=${view} ?active=${view.active} @click=${onClick}>
                <slot></slot>
                <slot name="wide"></slot>
            </b-app-tab-bar-2025-btn>
        `
    }

})

// export default customElements.get('c-tabs-router-record')