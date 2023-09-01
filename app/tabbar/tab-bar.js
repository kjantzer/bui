import { LitElement, html, css } from 'lit'
import device from '../../util/device'
import {mediaQuery} from '../../util/mediaQueries'
import scrollbars from '../../helpers/scrollbars'
import './tab-bar-btn'

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

    
        .search-btn {
            display: var(--app-tab-bar-search-display, inline-block);
            position: sticky;
            right: 0;
            bottom: 0;
            flex-grow: 0;
        }

        .search-btn::part(btn){
            background: var(--b-app-tab-bar-bgd);
            box-shadow: var(--theme-shadow-2);
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

        ${mediaQuery('b-app-landscape', css`

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
        `)}

        ${scrollbars.hide('main')}
    `}

    render(){return html`

        <slot name="before"></slot>

        <main>

        ${this.views.map(v=>html`
            ${v.canDisplay&&(!device.isMobile||v.id!='emails')?html`

                <slot name="before:${v.id}"></slot>

                <b-app-tab-bar-btn .tabView=${v} ?active=${v.active} @click=${this.onClick}>
                    <slot slot="outer" name="inside:${v.id}"></slot>
                </b-app-tab-bar-btn>

                <slot name="after:${v.id}"></slot>

            `:''}
        `)}

        ${this.shouldShowSearch?html`
            <b-app-tab-bar-btn @click=${this.focusSearch} icon="search" class="search-btn">
                <span>Search</span>
            </b-app-tab-bar-btn>
        `:''}

        </main>

        <slot name="after"></slot>

        ${this.minimizable?html`
        <b-btn icon="unfold_more" pill black class="maximize" @click=${this.toggleMinimize}></b-btn>
        `:''}
    `}

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
        this.onMenuClick(e)
    }

})
