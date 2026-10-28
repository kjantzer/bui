/*
    # App Sidebar Item

    A link in `<b-app-sidebar>`. Shows icon + label, or just the icon (with a tooltip) when the sidebar is a rail

    ```html
    <b-app-sidebar-item icon="timeline" label="Timeline" path="timeline"></b-app-sidebar-item>
    <b-app-sidebar-item icon="dollar" label="Finance" .menu=${menuItems} @menu-select=${onSelect}></b-app-sidebar-item>
    <b-app-sidebar-item label="Kevin"><my-avatar slot="icon"></my-avatar></b-app-sidebar-item>
    ```

    - `path` - opens the path (ie a panel) on click and is highlighted while that path is the current route;
      icon is the theme color while its panel is open underneath other panels
    - `base` - the app's main view; highlighted when it's on top, click brings it above any open panels
      - with a `path` too (the base view has its own routes, ex: tabs): also highlighted on that path, click goes to it
    - child views (nested below) - a view's own tabs, shown here at all times while the sidebar is expanded
      (a rail or the phone drawer has no room: the view's tabs keep their own tab bar):
      - `<b-tabs nav="parent">` inside it: its views are claimed by the item whose path they're under (live, see b-tabs)
      - `view="my-view"` - its `static navViews = [{title, path, icon}]` (paths relative to the item's) are shown until
        the view's tabs render (ex: a view not opened yet)
      - child views without a path (tabs without a router controller) switch the tabs directly
    - `.menu` - `bui/presenters/menu` items (or a fn that returns them, called on click) shown as a flyout;
      selecting an item with a `url` opens it, otherwise listen for `menu-select` ({detail: {selected}})
    - no `path` or `menu`: handle `@click` yourself
    - slots: `icon`, default (after the label), `end` (ex: badge)
    - `--b-app-sidebar-item-icon-color` - the item's color (ex: an app's color): its icon, and (active) the
      background tint; defaults to the theme color when open/active
*/
import { LitElement, html, css } from 'lit'
import router from '../router'
import {cleansePath} from '../router/config'
import Menu from '../../presenters/menu'
import PanelController from '../../presenters/panel/controller'
import '../../elements/icon'
import '../../elements/tooltip'

const trimPath = path=>String(path||'').replace(/^\/+|\/+$/g, '')

// (once for all the items added together)
let navViewsTimer
const requestNavViews = ()=>{
    clearTimeout(navViewsTimer)
    navViewsTimer = setTimeout(()=>window.dispatchEvent(new Event('nav-views:refresh')))
}

customElements.define('b-app-sidebar-item', class extends LitElement{

    static properties = {
        label: {type: String},
        icon: {type: String},
        path: {type: String},
        base: {type: Boolean},
        view: {type: String}, // (its static navViews)
        sub: {type: Boolean, reflect: true}, // (a child view item)
        noroute: {type: Boolean}, // (`active` is set by the owner, not the route)
        selected: {type: Boolean}, // (a child view: the tabs' active one, when the route is the parent's)
        currentPath: {state: true},
        menu: {attribute: false},
        active: {type: Boolean, reflect: true},
        open: {type: Boolean, reflect: true}, // panel is open (but not on top)
        rail: {type: Boolean, reflect: true},
        menuOpen: {type: Boolean, reflect: true, attribute: 'menu-open'}
    }

    static styles = css`
        :host {
            display: block;
            flex-shrink: 0;
            color: var(--theme-text);
            /* the item's color: its own (ex: app color) or the theme; used when open/active */
            --item-color: var(--b-app-sidebar-item-icon-color, var(--b-app-sidebar-item-active-color, var(--theme)));
        }

        :host([hidden]) {
            display: none;
        }

        .item {
            position: relative;
            display: flex;
            align-items: center;
            gap: .65rem;
            padding: var(--b-app-sidebar-item-padding-y, .45rem) .65rem;
            border-radius: var(--b-app-sidebar-item-radius, 10px);
            cursor: pointer;
            user-select: none;
            -webkit-user-select: none;
            outline: none;
            min-width: 0;
        }

        @media (hover) {
            :host(:not([active])) .item:hover {
                background: var(--b-app-sidebar-item-hover-bgd, var(--theme-bgd-accent2));
            }
        }

        :host([menu-open]) .item {
            background: var(--b-app-sidebar-item-hover-bgd, var(--theme-bgd-accent2));
        }

        .item:focus-visible {
            box-shadow: 0 0 0 2px var(--theme);
        }

        :host([active]) .item {
            background: var(--b-app-sidebar-item-active-bgd, color-mix(in srgb, var(--item-color) 16%, transparent));
            color: var(--theme-text);
            font-weight: 600;
        }


        .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.4em;
            flex-shrink: 0;
            color: var(--b-app-sidebar-item-icon-color, var(--theme-text-accent));
        }

        :host([active]) .icon,
        :host([open]) .icon {
            color: var(--item-color);
        }

        .icon b-icon {
            --size: 1.2em;
        }

        /* fades in a little after expanding starts; fades out right away when collapsing */
        .label,
        .chevron,
        slot[name="end"] {
            transition: opacity 150ms 70ms;
        }

        .label {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .chevron {
            color: var(--theme-text-accent);
            opacity: .6;
            --size: 1em;
        }

        :host([rail]) .label,
        :host([rail]) .chevron,
        :host([rail]) slot[name="end"] {
            opacity: 0;
            pointer-events: none;
            transition: opacity 100ms;
        }

        /* child views: labels lined up with this item's label (no icons) */
        .sub-items {
            display: flex;
            flex-direction: column;
            gap: 1px;
            margin-top: 1px;
        }

        :host([rail]) .sub-items {
            display: none;
        }

        :host([sub]) .icon {
            display: none;
        }

        :host([sub]) .item {
            padding-left: calc(1.3rem + 1.4em);
        }

        :host([sub]:not([active])) .item {
            color: var(--theme-text-accent);
        }

        /* the active child is highlighted instead */
        :host([has-sub][active]) .item {
            background: none;
        }
    `

    constructor(){
        super()
        this.updateActive = this.updateActive.bind(this)
        this.updateOpen = this.updateOpen.bind(this)
        this.onNavViews = this.onNavViews.bind(this)
        this.onSidebarChange = this.onSidebarChange.bind(this)
    }

    get panelController(){ return PanelController.for('root') }

    connectedCallback(){
        super.connectedCallback()
        let sidebar = this.closest('b-app-sidebar') // not found when rendered inside another element (it sets `rail`)
        if( sidebar ) this.rail = sidebar.hasAttribute('rail')
        window.addEventListener('router:push', this.updateActive)
        window.addEventListener('router:popstate', this.updateActive)
        window.addEventListener('app-shell:ready', this.updateActive) // router started (ex: page loaded with a deep link)
        window.addEventListener('nav-views', this.onNavViews)
        this.sidebar = this.closest('b-app-sidebar')
        this.sidebar?.addEventListener('change', this.onSidebarChange)
        this.panelController?.addEventListener('change', this.updateActive)
        this.updateActive()

        // tabs that offered their views before this item was here (ex: the base view rendered first)
        if( this.path && !this.sub )
            requestNavViews()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        window.removeEventListener('router:push', this.updateActive)
        window.removeEventListener('router:popstate', this.updateActive)
        window.removeEventListener('app-shell:ready', this.updateActive)
        window.removeEventListener('nav-views', this.onNavViews)
        this.sidebar?.removeEventListener('change', this.onSidebarChange)
        this.panelController?.removeEventListener('change', this.updateActive)
    }

    // reused elements (ex: in a list) can get a different path
    willUpdate(changed){
        if( changed.has('path') || changed.has('base') || changed.has('selected') )
            this.updateActive()
    }

    // NOTE: router events fire before the new state is set as current, so read the path from the event
    updateActive(e){
        if( this.noroute ) return
        // router events have the new path; otherwise (ex: panel changes, app ready) use the current state
        let fromRoute = e?.detail && 'path' in e.detail

        // router not started yet: nothing is current
        if( !fromRoute && !router.states ){
            this.active = false
            return this.updateOpen()
        }

        let current = fromRoute ? e.detail.path : router.states.current?.path
        current = trimPath(cleansePath(String(current||''))) // (without the router's root and prefix, ex: `/#/`)
        this.currentPath = current

        let onPath = path=>current == path || current.startsWith(path+'/')

        if( this.base )
            this.active = !current || (!!this.path && onPath(trimPath(this.path)))
        else if( this.path )
            this.active = onPath(trimPath(this.path)) || !!this.selected
        else
            this.active = false

        this.updateOpen()
    }

    // (only while expanded; see the docs above)
    get showsNavViews(){ return !this.sidebar || this.sidebar.mode == 'expanded' }

    // expanded or not: release the child views (their tabs show their tab bar) or take them back
    onSidebarChange(){
        let shows = this.showsNavViews
        if( shows == this._showedNavViews ) return
        this._showedNavViews = shows

        if( !shows && this.navTabs ){
            this.navTabs = this.liveNavViews = null
            this.requestUpdate()
        }

        this.requestUpdate()
        if( this.path && !this.sub ) requestNavViews()
    }

    // a view's tabs offering their views (b-tabs nav="parent"): claim them when they're under this item's path
    onNavViews(e){
        let {tabs, views, handled} = e.detail
        if( this.sub || !this.path ) return

        // (the tabs were removed)
        if( !views ){
            if( this.navTabs == tabs ){
                this.navTabs = this.liveNavViews = null
                this.requestUpdate()
            }
            return
        }

        if( handled && this.navTabs != tabs ) return
        if( !this.showsNavViews ) return

        let path = trimPath(this.path)
        if( !views.some(v=>v.path && v.path.startsWith(path+'/')) ) return

        e.detail.handled = true
        this.navTabs = tabs
        this.liveNavViews = views
        this.requestUpdate()
    }

    // live (claimed) child views, else the view's static ones
    get navItems(){
        if( !this.showsNavViews ) return []
        if( this.liveNavViews ) return this.liveNavViews

        let path = trimPath(this.path)
        return (customElements.get(this.view)?.navViews || []).map(v=>({
            ...v, path: v.path && path ? path+'/'+trimPath(v.path) : null
        }))
    }

    selectNavView(item){
        this.onClick()
        if( this.navTabs ) this.navTabs.active = item.id
    }

    updated(){
        this.toggleAttribute('has-sub', this.navItems.length > 0)
    }

    updateOpen(){
        let path = !this.base && trimPath(this.path)

        this.open = !!path && !this.active && !!this.panelController?.map(panel=>panel).some(panel=>{
            let route = panel.route
            return route && (trimPath(route.rootPath) == path.split('/')[0] || route.patt.match('/'+path))
        })
    }

    async onClick(e){

        if( this.menu ){
            let menu = typeof this.menu == 'function' ? this.menu() : this.menu

            if( !menu?.length )
                menu = [{divider: 'Nothing here for you yet', bgd: false}]

            this.menuOpen = true
            let selected = await new Menu(menu).popOver(this, {
                align: this.closest('b-app-sidebar')?.mode == 'drawer' ? 'bottom-start' : 'right-start'
            })
            this.menuOpen = false

            selected = selected?.menuSelected || selected
            if( !selected ) return

            this.dispatchEvent(new CustomEvent('menu-select', {bubbles: true, composed: true, detail: {selected}}))

            if( selected.url )
                (window.goTo || router.goTo.bind(router))(selected.url)

            return
        }

        if( this.base ){
            this.panelController?.showBase()
            if( this.path ) (window.goTo || router.goTo.bind(router))(this.path)
            return
        }

        if( this.path )
            (window.goTo || router.goTo.bind(router))(this.path)
    }

    onKeydown(e){
        if( e.key == 'Enter' || e.key == ' ' ){
            e.preventDefault()
            this.onClick(e)
        }
    }

    render(){return html`
        <div class="item" part="item" role=${this.menu?'button':'link'} tabindex="0"
            aria-current=${this.active?'page':'false'} aria-haspopup=${this.menu?'menu':'false'}
            @click=${this.onClick} @keydown=${this.onKeydown}>
            <span class="icon"><slot name="icon">${this.icon?html`<b-icon name=${this.icon}></b-icon>`:''}</slot></span>
            <span class="label">${this.label}<slot></slot></span>
            <slot name="end"></slot>
            ${this.menu?html`<b-icon class="chevron" name="chevron_right"></b-icon>`:''}
        </div>
        ${this.rail&&this.label&&!this.menuOpen?html`<b-tooltip label align="right">${this.label}</b-tooltip>`:''}
        ${this.renderNavItems()}
    `}

    renderNavItems(){
        let items = this.navItems
        if( !items.length ) return ''

        // on this item's own path (ex: the base view at the start): the tabs' active view
        let current = this.currentPath || ''
        let onChild = items.some(item=>item.path && (current == item.path || current.startsWith(item.path+'/')))
        let selected = item=>this.active && !onChild && item.active

        return html`
            <div class="sub-items" part="sub-items">
                ${items.map(item=>item.path ? html`
                    <b-app-sidebar-item sub label=${item.title} path=${item.path} ?selected=${selected(item)}></b-app-sidebar-item>
                `:html`
                    <b-app-sidebar-item sub noroute label=${item.title} ?active=${item.active}
                        @click=${()=>this.selectNavView(item)}></b-app-sidebar-item>
                `)}
            </div>
        `
    }

})

export default customElements.get('b-app-sidebar-item')
