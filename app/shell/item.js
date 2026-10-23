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
    - `.menu` - `bui/presenters/menu` items (or a fn that returns them, called on click) shown as a flyout;
      selecting an item with a `url` opens it, otherwise listen for `menu-select` ({detail: {selected}})
    - no `path` or `menu`: handle `@click` yourself
    - slots: `icon`, default (after the label), `end` (ex: badge)
    - `--b-app-sidebar-item-icon-color` - the item's color (ex: an app's color): its icon, and when open/active
      the left bar and (active) background tint; defaults to the theme color when open/active
*/
import { LitElement, html, css } from 'lit'
import router from '../router'
import Menu from '../../presenters/menu'
import PanelController from '../../presenters/panel/controller'
import '../../elements/icon'
import '../../elements/tooltip'

const trimPath = path=>String(path||'').replace(/^\/+|\/+$/g, '')

customElements.define('b-app-sidebar-item', class extends LitElement{

    static properties = {
        label: {type: String},
        icon: {type: String},
        path: {type: String},
        base: {type: Boolean},
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

        .item {
            position: relative;
            display: flex;
            align-items: center;
            gap: .65rem;
            padding: .45rem .65rem;
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

        /* open (on top or underneath): thin bar on the left in the item's color */
        .item::after {
            content: '';
            position: absolute;
            left: 0;
            top: 22%;
            bottom: 22%;
            width: 3px;
            border-radius: 3px;
            background: var(--item-color);
            opacity: 0;
            transition: opacity 150ms;
        }

        :host([active]) .item::after,
        :host([open]) .item::after {
            opacity: 1;
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
    `

    constructor(){
        super()
        this.updateActive = this.updateActive.bind(this)
        this.updateOpen = this.updateOpen.bind(this)
    }

    get panelController(){ return PanelController.for('root') }

    connectedCallback(){
        super.connectedCallback()
        let sidebar = this.closest('b-app-sidebar') // not found when rendered inside another element (it sets `rail`)
        if( sidebar ) this.rail = sidebar.hasAttribute('rail')
        window.addEventListener('router:push', this.updateActive)
        window.addEventListener('router:popstate', this.updateActive)
        this.panelController?.addEventListener('change', this.updateOpen)
        this.updateActive()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        window.removeEventListener('router:push', this.updateActive)
        window.removeEventListener('router:popstate', this.updateActive)
        this.panelController?.removeEventListener('change', this.updateOpen)
    }

    // reused elements (ex: in a list) can get a different path
    willUpdate(changed){
        if( changed.has('path') || changed.has('base') )
            this.updateActive()
    }

    // NOTE: router events fire before the new state is set as current, so read the path from the event
    updateActive(e){
        let current = e?.detail ? e.detail.path : router.states?.current?.path
        current = trimPath(current)

        let root = trimPath(router.pathRoot)
        if( root && current.startsWith(root) )
            current = trimPath(current.slice(root.length))

        if( this.base )
            this.active = !current
        else if( this.path ){
            let path = trimPath(this.path)
            this.active = current == path || current.startsWith(path+'/')
        }else
            this.active = false

        this.updateOpen()
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

        if( this.base )
            return this.panelController?.showBase()

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
    `}

})

export default customElements.get('b-app-sidebar-item')
