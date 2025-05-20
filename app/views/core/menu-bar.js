// NOTE: not used?
import { LitElement, html, css } from 'lit'
import PillBar from '../../../presenters/tabs/tab-bar/pill-bar'

customElements.define('b-app-core-menu-bar', class extends PillBar{

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