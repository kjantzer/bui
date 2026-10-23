/*
    # App Sidebar Open Panels

    Lists the open panels (in the root `<b-panels>`) that aren't already a link in the sidebar,
    ex: records opened from a list or search. Click to bring one to the top; hover to close it

    ```html
    <b-app-sidebar>
        <b-app-sidebar-open-panels label="Open"></b-app-sidebar-open-panels>
    </b-app-sidebar>
    ```

    Subclass and override `renderIcon(panel)` for custom icons (ex: thumbnails)
*/
import { LitElement, html, css } from 'lit'
import router from '../router'
import PanelController from '../../presenters/panel/controller'
import '../../elements/btn'
import './item'

const trimPath = path=>String(path||'').replace(/^\/+|\/+$/g, '')
const IGNORE_TYPES = ['modal', 'actionsheet', 'search-popup']

export default class AppSidebarOpenPanels extends LitElement {

    static properties = {
        label: {type: String},
        rail: {type: Boolean, reflect: true}
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 1px;
            flex-shrink: 0;
        }

        :host([hidden]) {
            display: none;
        }

        .label {
            font-size: var(--font-size-xs, .75em);
            font-weight: 600;
            letter-spacing: .06em;
            text-transform: uppercase;
            color: var(--theme-text-accent);
            padding: 1rem .65rem .35rem;
            white-space: nowrap;
            overflow: hidden;
        }

        /* rail: text fades out and a divider line fades in (same height, so nothing below moves) */
        .label {
            position: relative;
            transition: color 150ms 70ms;
        }

        .label::after {
            content: '';
            position: absolute;
            left: .65rem;
            width: calc(1.4em / .75); /* icon width (label is a smaller font) */
            top: calc(50% + .3rem); /* middle of the text */
            height: 1px;
            background: rgba(var(--theme-text-rgb), .2);
            opacity: 0;
            transition: opacity 150ms;
        }

        :host([rail]) .label {
            color: transparent;
            transition: color 100ms;
        }

        :host([rail]) .label::after {
            opacity: 1;
        }

        .close {
            visibility: hidden;
            margin: -.35em -.4em -.35em 0;
            color: var(--theme-text-accent);
        }

        b-app-sidebar-item:hover .close {
            visibility: visible;
        }

        @media (hover: none) {
            .close {
                visibility: visible;
            }
        }
    `

    constructor(){
        super()
        this.label = 'Open'
        this.refresh = ()=>this.requestUpdate()
    }

    get panelController(){ return PanelController.for('root') }

    connectedCallback(){
        super.connectedCallback()
        this.panelController?.addEventListener('change', this.refresh)
        window.addEventListener('router:push', this.refresh)
        window.addEventListener('router:popstate', this.refresh)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.panelController?.removeEventListener('change', this.refresh)
        window.removeEventListener('router:push', this.refresh)
        window.removeEventListener('router:popstate', this.refresh)
    }

    // paths of the sidebar's links (those panels already show there)
    get linkedPaths(){
        let sidebar = this.closest('b-app-sidebar')
        return [...(sidebar?.querySelectorAll('b-app-sidebar-item[path]') || [])]
            .map(el=>trimPath(el.path))
            .filter(Boolean)
    }

    isLinked(panel, linked=this.linkedPaths){
        let root = trimPath(panel.route.rootPath)
        let current = trimPath(panel.route.currentPath)
        return linked.some(path=>root == path || current == path || current.startsWith(path+'/'))
    }

    get panels(){
        let linked = this.linkedPaths

        return (this.panelController?.map(panel=>panel) || []).filter(panel=>{
            if( !panel.route || IGNORE_TYPES.includes(panel.type) ) return false
            return !this.isLinked(panel, linked)
        })
    }

    renderIcon(panel){
        return panel.icon ? html`<b-icon slot="icon" name=${panel.icon}></b-icon>` : ''
    }

    render(){
        let panels = this.panels
        this.hidden = panels.length == 0

        return html`
            <div class="label" part="label">${this.label}</div>
            ${panels.map(panel=>html`
                <b-app-sidebar-item label=${panel.title||'Untitled'} path=${panel.route.currentPath} ?rail=${this.rail}>
                    ${this.renderIcon(panel)}
                    <b-btn slot="end" clear pill sm icon="close" class="close" title="Close"
                        @click=${e=>this.close(e, panel)}></b-btn>
                </b-app-sidebar-item>
            `)}
        `
    }

    close(e, panel){
        e.stopPropagation()
        panel.close()
    }

}

customElements.define('b-app-sidebar-open-panels', AppSidebarOpenPanels)
