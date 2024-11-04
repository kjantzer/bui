import BaseTabBar, {html, css} from './_base'
import '../../../elements/animated-bgd'

customElements.define('b-tab-bar-pill-bar', class extends BaseTabBar{

    static styles = css`
    
        :host(.tab-bar) {
            display: flex;
            border-bottom: none !important;
            width: auto;
            margin: 0 auto;
        }

        ::slotted(b-btn),
        b-btn {
            --padding: .2em 1.5em .4em;
        }

        .bar {
            display: flex;
            flex-wrap: wrap;
            background: var(--theme-bgd-accent);
            border-radius: 1.5em;
            width: 100%;
            padding: .25em;
            justify-content: space-between;
            align-items: center;
            position: relative;
        }

        .bar b-btn{
            --bgdColor: none;
            text-align: center;
            height: 1.8em;
            font-size: 1em;
            font-weight: 350;
            transition-property: all;
            transition-duration: var(--animated-bgd-duration);
            transition-timing-function: var(--animated-bgd-timing);
            --borderColor: transparent;
            position: relative;
            z-index: 1;
            background: none;
            --hoverBgdColor: none;
            white-space: nowrap;
            flex-grow: 1;
        }

        .bar b-btn:not([active]) {
            --bgdColor: none;
            color: var(--theme-text);
        }
        
        .bar b-btn[active] {
            color: var(--animated-bgd-text-color);
        }
        
    `

    renderLoop(){ return html`
        <b-animated-bgd class="bar" color="theme-gradient" shadow>
            ${super.renderLoop()}
        </b-animated-bgd>
    `}

    renderBtn(view){ return html`
        <b-btn pill icon="${view.icon}" ?active=${view.active} .tabView=${view} @click=${this.onMenuClick}>
            <span>${view.title}</span>
        </b-btn>
    `}
})