import { LitElement, html, css } from 'lit'
import device from 'bui/util/device'

customElements.define('b-app-tab-bar', class extends LitElement{

    static get styles(){return css`
        :host(.tab-bar) {
            display: grid !important;
            grid-template-columns: repeat( auto-fit, minmax(60px, 1fr) );

            border-top: solid 1px var(--theme-bgd-accent) !important;
            background: var(--theme-bgd) !important;
            padding-bottom: env(safe-area-inset-bottom);
            position: relative;
        }

        @media (orientation:landscape) {
            :host {
                padding-left: calc(0.6 * env(safe-area-inset-left));
                padding-right: calc(0.1 * env(safe-area-inset-left));
            }
        }

        b-btn {
            color: var(--theme-text);
            text-align: center;
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
            font-size: 1.1em;
            padding-top: .25em;
            padding-bottom: .25em;
            --b-btn-stacked-icon-opacity:.3;
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
            color: var(--b-app-tab-bar-active-color, var(--theme-text));
            /* top border */
            /* box-shadow: black 1px 6px 0px -2px inset; */
            border-radius: 0;
            /* --bgdColor: rgba(var(--theme-text-rgb),.1); */
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
                border-top:none !important;
                border-right: solid 1px var(--theme-bgd-accent);
                order: 0 !important;
                grid-template-columns: repeat(auto-fit, 72px);
                align-content: flex-start;
                gap: .5em;
                padding-top: .5em;
                padding-bottom: .5em;
            }

            b-btn {
                padding-top: .5em;
                padding-bottom: .35em;
            }

            b-btn[active] {
                /* left border */
                box-shadow: var(--b-app-tab-bar-active-color, var(--theme-chosen, var(--theme-text))) 6px 1px 0px -2px inset;
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

                <b-btn text stacked icon="${v.icon}" ?active=${v.active} .tabView=${v} @click=${this.onClick}>
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

