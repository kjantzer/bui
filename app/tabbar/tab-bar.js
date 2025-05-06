import { LitElement, html, css } from 'lit'
import device from '../../util/device'
import {mediaQuery} from '../../util/mediaQueries'
import scrollbars from '../../helpers/scrollbars'
import './tab-bar-btn'
import BaseTabBar from '../../presenters/tabs/tab-bar/_base'
import '../../helpers/lit/emitEvent'

customElements.define('b-app-tab-bar', class extends BaseTabBar{

    static styles = [super.styles, css`

        :host(.tab-bar) {
            background: var(--b-app-tab-bar-bgd, var(--theme-bgd));
            padding-bottom: calc(env(safe-area-inset-bottom) / 1.5);
            --btn-radius: .75em;
            position: relative;
        }

        @media (max-width: 899px) and (orientation:portrait) {
            :host {
                --b-app-tab-bar-active-color: rgba(var(--dark-bgd-rgb), .3);
                --b-app-tab-bar-active-color-text: var(--dark-text);
                --b-app-tab-bar-bgd: var(--theme-gradient);
                --b-app-tab-bar-text-color: var(--dark-text);
                --b-app-tab-bar-bgd-stacked-icon-opacity: .75;
                --b-app-tab-bar-sticky-bgd: color-mix(in srgb, var(--theme),black 20%);
            }
        }


        @media (orientation:landscape) {
            :host {
                padding-left: calc(0.6 * env(safe-area-inset-left)) !important;
                padding-right: calc(0.1 * env(safe-area-inset-left)) !important;
            }
        }

    
        .search-btn {
            display: var(--app-tab-bar-search-display, inline-block);
            order: 10;
        }

        /* for now, only support on small screens */
        @media (min-width: 600px) {
            .maximize {
                display: none;
            }
        }

        :host([minimized]) {
            height: .5em;
            overflow: visible !important;
        }

        /* hide all other content except maximize button */
        :host([minimized]) > *:not(.maximize) {
            display: none
        }

        .maximize {
            position: absolute;
            left: 0;
            top: -.9em;
        }

        :host([minimized]) .maximize {
            top: -1.4em;
            z-index: 1000;
            box-shadow: var(--theme-shadow-1);
        }

        ${scrollbars.hide('main')}
    `]

    constructor(){
        super()
        this.layoutMobile = 'bottom'
    }

    firstUpdated(){
        this.part = 'tab-bar'
    }

    render(){return html`

        <slot name="before"></slot>

        

        ${this.views.map(v=>html`
            ${v.canDisplay&&(!device.isMobile||v.id!='emails')?html`

                <slot name="before:${v.id}"></slot>

                ${this.renderBtn(v)}

                <slot name="after:${v.id}"></slot>

            `:''}
        `)}

        ${this.shouldShowSearch?html`
            <b-app-tab-bar-btn @click=${this.focusSearch} icon="search" class="search-btn"></b-app-tab-bar-btn>
        `:''}

        

        <slot name="after"></slot>

        ${this.minimizable?html`
        <b-btn icon="unfold_more" hidden pill black class="maximize" @click=${this.toggleMinimize}></b-btn>
        `:''}
    `}

    renderBtn(view){ 

        let btn = html`
        <b-app-tab-bar-btn .tabView=${view} ?active=${view.active} @click=${this.onClick}>
            <slot slot="outer" name="inside:${view.id}"></slot>
        </b-app-tab-bar-btn>
        `

        if( this.tabBarBtnRender )
            return this.tabBarBtnRender(btn, view, this.onClick)

        return btn
    }

    toggleMinimize(){
        this.toggleAttribute('minimized', !this.hasAttribute('minimized'))
    }

    get minimizable(){ return this.hasAttribute('minimizable')}

    get shouldShowSearch(){
        return device.isMobile && !this.host.hasAttribute('no-search')
    }

    focusSearch(){
        window.dispatchEvent(new Event('focus-search'))
    }

    onClick(e){
        this.emitEvent('menu-click', {target: e.currentTarget, tabView: e.currentTarget.tabView})
    }

})
