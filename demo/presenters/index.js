import { LitElement, html, css } from 'lit'
import 'bui/helpers/colors-list'
import 'bui/presenters/form'
import 'bui/presenters/list'
import './form'
import './notif'
import './tabs'
import './selection'
import './mentions'
import './panel'
import './popover'
import './dialog'
import './menu'
import './list'
import './virtual-scroller'
import './previewer'
import './calendar'
import './datepicker'
import dayjs from 'dayjs'

customElements.define('demo-presenters', class extends LitElement{

    static get title(){ return 'Presenters' }
    static get icon(){ return 'call_to_action' }
    static get path(){ return 'presenters(/:tab)' }

    static get styles(){return css`
        :host {
            height: 100%;
            display: grid;
            grid-template-rows: 1fr;
            position:relative;
            overflow: hidden;
        }

        b-cal,
        a-list-view {
            height: 100%;
        }
    `}

    render(){return html`
        <b-tabs-router path="presenters/" key="presenters" layout="left" >

            demo-presenter-form
            demo-presenter-dialog
            demo-presenter-menu
            demo-presenter-panel
            demo-presenter-popover
            demo-presenter-previewer
            demo-presenter-notif
            demo-presenter-tabs
            demo-presenter-list
            demo-presenter-virtual-scroller
            demo-presenter-datepicker
            demo-presenter-calendar

            demo-presenter-selection
            demo-presenter-mentions

        </b-tabs-router>
    `}

})

export default customElements.get('demo-presenters')



customElements.define('tab-divider', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            color: inherit;
            margin: 1em 0 0 0;
            padding: 1em 1.2em .5em;
            border-top: solid 1px rgba(0,0,0,.1);
        }
    `}

    render(){return html`
        <b-label><slot></slot></b-label>
    `}

})

