import { LitElement, html, css } from 'lit'
import TabBarBtn from '../../tabbar/tab-bar-btn'

customElements.define('b-app-core-menu-btn', class extends TabBarBtn{

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
            display: inline-block;
        }

        .wide {
            margin: 0 1em;
            padding: 1em;
            grid-template-columns: auto 1fr;
            align-items: center;
            gap: 1em;
            border-radius: 4em;
            user-select: none;
        }

        b-btn {
            touch-action: manipulation;
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

        @container style(--layout: left) {

            :host > .external,
            b-btn[stacked] {
                display: none;
            }

            :host > .wide {
                display: grid;
            }
        }

        @container style(--minimize) {

            :host > .external,
            b-btn[stacked] {
                display: inline-block;
            }

            :host > .wide {
                display: none;
            }
        }

        @container style(--layout: left) and style(--minimize) {
            
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