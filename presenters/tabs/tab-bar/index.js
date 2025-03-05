import { LitElement, html, css } from 'lit'
import BaseTabBar from './_base'

customElements.define('b-tab-bar-default', class extends BaseTabBar{

    static styles = [super.styles, css`
        :host {
            display: flex;
            position:relative;
        }

        .tab-bar-item {
            display: flex;
            padding: var(--menuItemPadding);
            cursor: pointer;
            box-sizing: border-box;
            color: var(--inactiveColor);
            white-space: nowrap;
        }

        .tab-bar-item[active] {
            color: var(--activeColor)
        }


        :host([layout="top"]) .tab-bar-item,
        :host([layout="bottom"]) .tab-bar-item {
            white-space: nowrap;
        }

        :host([layout="top"][stretch]) .tab-bar-item,
        :host([layout="bottom"][stretch]) .tab-bar-item {
            flex-grow: 1;
            justify-content: center;
        }

        /* FIXME: */
        /*:host([layout="top"]) .tab-bar-item { border-bottom: solid 2px transparent; }
        :host([layout="bottom"]) .tab-bar-item { border-top: solid 2px transparent; }
        :host([layout="left"]) .tab-bar-item { border-right: solid 2px transparent; }
        :host([layout="right"]) .tab-bar-item { border-left: solid 2px transparent; }

        :host([layout="top"]) .tab-bar-item:hover { border-bottom-color: currentColor; }
        :host([layout="bottom"]) .tab-bar-item:hover { border-top-color: currentColor; }
        :host([layout="left"]) .tab-bar-item:hover { border-right-color: currentColor; }
        :host([layout="right"]) .tab-bar-item:hover { border-left-color: currentColor; }

        :host([layout="top"]) .tab-bar-item[active] { border-bottom-color: currentColor; }
        :host([layout="bottom"]) .tab-bar-item[active] { border-top-color: currentColor; }
        :host([layout="left"]) .tab-bar-item[active] { border-right-color: currentColor; }
        :host([layout="right"]) .tab-bar-item[active] { border-left-color: currentColor; }
        */

        /*@media (max-width: 550px) {

            :host([layout="left"]) .tab-bar-item { border-right: none; }
            :host([layout="right"]) .tab-bar-item { border-left: none; }

            :host([layout="left"]) .tab-bar-item, 
            :host([layout="right"]) .tab-bar-item {
                border-bottom: solid 2px transparent;
                flex-shrink: 0;
            }

            :host([layout="left"]) .tab-bar-item:hover, 
            :host([layout="right"]) .tab-bar-item:hover { border-bottom-color: currentColor; }

            :host([layout="left"]) .tab-bar-item[active], 
            :host([layout="right"]) .tab-bar-item[active] { border-bottom-color: currentColor; }
        }*/
    `]

    render(){return html`
        <slot name="before"></slot>
        
        ${this.views.map(v=>v.render(this.onMenuClick))}

        <slot name="after"></slot>
    `}

})

export default customElements.get('b-tab-bar-default')