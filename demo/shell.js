/*
    Demo app: the app shell (bui/app/shell) - sidebar of sections (install, theme, and GitHub at the bottom) and a topbar. The sections are all in the base view
    (b-tabs without a tab bar, routed); the sidebar items go to their paths, so they work like the tabs
    (each section's pages are in a <b-nav-view>)
*/
import { LitElement, html, css } from 'lit'
import AppShellView from 'bui/app/shell/view'
import 'bui/app/shell'
import 'bui/app/views/router-controller' // (the sections route their pages with it)
import 'bui/app/views/root-titlebar' // (docs list title and close btn)
import 'bui/presenters/tabs'
import 'bui/elements/logo'
import 'bui/elements/text'
import AppInstaller from 'bui/app/installer'
import Menu from 'bui/presenters/menu'
import device, {colorScheme} from 'bui/util/device'
import './overview'
import './elements'
import './presenters'
import './server'
import './components'
import './tools/docs'

const SECTIONS = ['demo-elements', 'demo-presenters', 'demo-components', 'demo-all-docs', 'demo-server']
const sectionPath = tag=>customElements.get(tag).path.split('(')[0]

const THEME_ACCENTS = [
    {label: 'Default', val:''},
    {label: 'Blue', val:'blue'},
    {label: 'Green', val: '27ae60'},
    {label: 'Pink', val:'pink'},
    {label: 'Purple', val:'deep-purple'},
    {label: 'Orange', val:'orange'},
    {label: 'Deep Orange', val:'deep-orange'},
    {label: 'Teal', val:'teal'},
    {label: 'Red', val: 'red-600'},
    {label: 'Cyan', val:'cyan'},
    {label: 'Indigo', val: 'indigo-A200'},
    {label: 'Mint', val: '00b894'}
]

window.AppInstaller = AppInstaller
window.colorScheme = colorScheme

device.applyClasses()
colorScheme.apply({colorizeFaviconComposition: 'source-in'})

export function mountShell(root){
    let sidebar = document.createElement('demo-sidebar')
    sidebar.slot = 'left'

    let topbar = document.createElement('b-app-topbar')
    topbar.slot = 'main-top'
    topbar.innerHTML = /*html*/`
        <div class="brand">
            <bui-logo></bui-logo>
            <b-text md>Blackstone <b-text xbold>UI</b-text></b-text>
        </div>
    `

    let home = document.createElement('demo-home')
    home.slot = 'base'

    root.append(sidebar, topbar, home)
}

customElements.define('demo-sidebar', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            height: 100%;
        }

        /* (not the phone drawer; it's a floating sheet) */
        b-app-sidebar:not([mode="drawer"])::part(panel) {
            border-right: solid 1px var(--theme-bgd-accent);
        }

        /* laid out like a sidebar item: logo in the icon box, name where labels start
           (so the logo stays put when the sidebar collapses) */
        .brand {
            display: flex;
            align-items: center;
            gap: .65rem;
            padding: .45rem .65rem;
            border-radius: 10px;
            cursor: pointer;
            user-select: none;
            -webkit-user-select: none;
            min-width: 0;
        }

        /* (the icons' box, so it stays centered in the rail; bigger than the icons, it overflows the box evenly) */
        .brand .logo {
            display: inline-flex;
            justify-content: center;
            width: 1.4em;
            flex-shrink: 0;
        }

        .brand bui-logo {
            --size: 1.9em;
        }

        .brand b-text {
            white-space: nowrap;
            transition: opacity 150ms 70ms;
        }

        .brand[rail] b-text {
            opacity: 0;
            transition: opacity 100ms;
        }
    `

    render(){return html`
        <b-app-sidebar>
            <div slot="brand" class="brand" title="Collapse / expand sidebar">
                <span class="logo"><bui-logo></bui-logo></span>
                <b-text md>Blackstone <b-text xbold>UI</b-text></b-text>
            </div>

            <b-app-sidebar-group>
                <b-app-sidebar-item base path="overview" view="demo-overview" icon="info" label="Overview"></b-app-sidebar-item>
            </b-app-sidebar-group>

            <b-app-sidebar-group label="Docs">
                ${SECTIONS.map(tag=>{
                    let View = customElements.get(tag)
                    return html`<b-app-sidebar-item icon=${View.icon} label=${View.title} path=${sectionPath(tag)}></b-app-sidebar-item>`
                })}
            </b-app-sidebar-group>

            <b-app-sidebar-item slot="footer" icon="install_desktop" label="Install"
                ?hidden=${!AppInstaller.canInstall} @click=${AppInstaller.install}></b-app-sidebar-item>
            <b-app-sidebar-item slot="footer" icon="invert-colors-on" label="Theme" @click=${this.changeTheme}></b-app-sidebar-item>
            <b-app-sidebar-item slot="footer" icon="github" label="GitHub" @click=${this.openGitHub}></b-app-sidebar-item>
        </b-app-sidebar>
    `}

    connectedCallback(){
        super.connectedCallback()
        AppInstaller.canInstallPromise.then(()=>this.requestUpdate())
    }

    async changeTheme(e){
        let selected = await new Menu([
            {divider: 'Theme'},
            {label: 'System', val: 'system', theme: true},
            {label: 'Light', val: 'light', theme: true},
            {label: 'Dark', val: 'dark', theme: true},
            {divider: 'Accent'},
            ...THEME_ACCENTS
        ], {
            multiple: false,
            selected: [colorScheme.theme, colorScheme.accent],
        }).popOver(e.currentTarget, {align: 'right-end', adjustForMobile: {type: 'actionsheet'}})

        if( !selected ) return

        if( selected.theme )
            colorScheme.setTheme(selected.val)
        else
            colorScheme.setAccent(selected.val)
    }

    openGitHub(){
        window.open('https://github.com/kjantzer/bui', '_blank')
    }
})

// the base view: every section, switched by the route (overview when there's none)
customElements.define('demo-home', class extends AppShellView{

    static title = 'Blackstone UI'

    static styles = css`
        :host {
            display: grid;
            grid-template-rows: 1fr;
            height: 100%;
            overflow: hidden;
        }
    `

    // (b-tabs reads its views from the text; keep in sync with SECTIONS)
    render(){return html`
        <b-tabs tab-bar="none">
            <b-router-controller rootpath=""></b-router-controller>
            demo-overview
            demo-elements
            demo-presenters
            demo-components
            demo-all-docs
            demo-server
        </b-tabs>
    `}

    // no route (ex: back to the start): the overview (sections' routes switch the tabs themselves)
    onRouteChange(e){
        super.onRouteChange(e)
        if( !e.detail.path && this.tabs ) this.tabs.active = null
    }

    get tabs(){ return this.shadowRoot?.querySelector('b-tabs') }
})
