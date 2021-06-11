import { LitElement, html, css } from 'lit-element'
import device from 'bui/util/device'

customElements.define('b-app-tab-bar', class extends LitElement{

    static get styles(){return css`
        :host(.tab-bar) {
            /* display: grid !important;
            grid-template-columns: repeat( auto-fit, minmax(60px, 1fr) ); */
            
            display: flex;
            /* justify-content: space-evenly; */

            border-top: none !important;
            background: var(--b-app-tab-bar-bgd, var(--theme-bgd)) !important;
            position: relative;
            padding: 0 .25em;
            padding-bottom: calc(env(safe-area-inset-bottom) / 1.5);
        }


        @media (max-width: 699px) {
        /* dull the colors a little  */
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
        }

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

            border-radius: .75em;
            margin: .25em 0;
            min-width: 60px;
            flex-grow: 1;
            flex-shrink: 0;
        }

        b-btn > span {
            margin-top: .25em;
        }
        
        @media (min-width:700px) {
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
        @media /*(max-height: 699px) and (orientation:landscape),*/
        (min-width:700px) {
            :host(.tab-bar) {
                display: grid !important;
                border-top:none !important;
                border-right: solid 1px var(--theme-bgd-accent);
                order: 0 !important;
                grid-template-columns: repeat(auto-fit, 72px);
                align-content: flex-start;
                gap: .5em;
                padding: .5em 0;
            }

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

            [icon="search"] {
                display: none;
            }
        }
    `}

    render(){return html`

        <!-- <slot name="menu:before"></slot> -->

        ${this.views.map(v=>html`
            ${v.canDisplay&&(!device.isMobile||v.id!='emails')?html`

                <b-btn text vid=${v.id} stacked icon="${typeof v.icon==='string'?v.icon:''}" ?active=${v.active} .tabView=${v} @click=${this.onClick}>
                    ${typeof v.icon !== 'string'?html`
                        <span slot="icon">${v.icon}</span>
                    `:''}
                    <span>${v.title}</span>
                </b-btn>

            `:''}
        `)}

        ${this.shouldShowSearch?html`
            <b-btn text stacked icon="search" @click=${this.focusSearch}>
                <span>Search</span>
            </b-btn>
        `:''}

        <!-- <slot name="menu:after"></slot> -->
    `}

    get shouldShowSearch(){
        return device.isMobile
    }

    focusSearch(){
        window.dispatchEvent(new Event('focus-search'))
    }

    onClick(e){
        this.onMenuClick(e)
    }

})

