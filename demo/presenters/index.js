import { LitElement, html, css } from 'lit-element'
import 'bui/helpers/colors-list'
import 'bui/presenters/form-control'
import 'bui/presenters/list'
import 'bui/presenters/cal'
import './form-control'
import './notif'
import './tabs'
import './selection'
import './mentions'
import './panel'
import './dialog'
import './menu'
import './list'
import './previewer'

customElements.define('demo-presenters', class extends LitElement{

    static get title(){ return 'Presenters' }
    static get icon(){ return 'window' }
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

            demo-presenter-form-control
            demo-presenter-dialog
            demo-presenter-menu
            demo-presenter-panel
            demo-presenter-previewer
            demo-presenter-notif
            demo-presenter-tabs
            demo-presenter-list

            <b-cal title="Calendar">
                <div class="cal-event" style="font-size: .8em; line-height: 1em;">
                    A calendar event
                </div>
                <div class="cal-event2" style="font-size: .8em; line-height: 1em;">
                    Another event
                </div>
            </b-cal>
            <script>
                setTimeout(()=>{
                    // setting the event slots this way so they always show for the current month
                    document.querySelector('.cal-event').slot=moment().set({date:12}).format('YYYY-MM-DD')
                    document.querySelector('.cal-event2').slot=moment().set({date:24}).format('YYYY-MM-DD')
                },500)
            </script>

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

