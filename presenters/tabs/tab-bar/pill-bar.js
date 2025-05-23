import BaseTabBar, {html, css} from './_base'
import '../../../elements/animated-bgd'
import scrollbars from '../../../helpers/scrollbars'

customElements.define('b-tab-bar-pill-bar', class extends BaseTabBar{

    static styles = [super.styles, css`
    
        :host(.tab-bar) {
            display: flex;
            border-bottom: none;
            width: auto;
            margin: 0 auto;
        }

        ::slotted(b-btn),
        b-btn {
            --padding: .2em 1.5em .4em;
        }

        .bar {
            display: flex;
            overflow: auto;
            background: var(--pill-bar-bgd, var(--theme-bgd-accent));
            border-radius: 1.5em;
            width: 100%;
            padding: .25em;
            justify-content: space-between;
            align-items: center;
            position: relative;
        }

        ${scrollbars.hide('.bar')}

        .bar b-btn{
            flex-shrink: 0;
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
        
    `]

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

export default customElements.get('b-tab-bar-pill-bar')