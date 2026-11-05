/*
    Nav View Bar - tab bar for <b-nav-view>

    Desktop: vertical list in a sidebar (or a narrow icon rail when `compact`)
    Narrow (view under 700px wide): iOS 26 style tab bar (icon over label, active item in a theme colored pill)
    - shows at most 5 items; the rest go in a "More" menu (links with the `keep` attribute always stay in the bar)

    Sections' child views are listed under them (sidebar list only; see b-nav-view "Child views")
    - `static navViewsCollapsed = true` (on the section): listed only while it's active; hovering its item otherwise
      shows them in a menu to the right
    - static navViews can be links instead of views: `{title, action: (model, navView)=>{}}` (ex: open another view;
      a ↗ in the hover menu; none when listed, there's little room)
    - `menuTitle` (static navViews): a longer title for the hover menu (ex: when the listed title is shortened to fit)
    - a flat section's (navViewsFlat) lone child view, with nothing else listed, isn't listed in the sidebar
*/
import BaseTabBar, {html, css} from '../tabs/tab-bar/_base'
import Menu from '../menu'
import router from '../../app/router'
import {cleansePath} from '../../app/router/config'
import '../../elements/icon'
import itemStyles from './item-styles'

const MAX_TAB_BAR_ITEMS = 5 // including "More"

customElements.define('b-nav-view-bar', class extends BaseTabBar{

    static properties = {
        ...BaseTabBar.properties,
        narrow: {type: Boolean} // (set by b-nav-view)
    }

    static styles = [itemStyles, css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 1.25rem .5rem;
            box-sizing: border-box;
            /* spaced like bui menu items (bui/presenters/menu/item.js); icon box like the app shell sidebar */
            --nav-item-padding: .6em .75em;
            --nav-item-radius: 10px;
            --nav-item-gap: .75em;
            --nav-item-icon-size: 1.2em;
            --nav-item-icon-width: 1.1667em; /* 1.4em box at the item font size */
        }

        ::slotted([slot="before"]) {
            margin-bottom: 1rem;
        }

        ::slotted([slot="after"]) {
            margin-top: 1rem;
        }

        /* narrow rail: icon over label */
        :host([compact]) {
            width: 5.75rem;
            gap: .25rem;
            padding: .75rem .5rem;
            --nav-item-direction: column;
            --nav-item-gap: .25em;
            --nav-item-padding: .6em .25em .5em;
            --nav-item-radius: 12px;
            --nav-item-align: center;
            --nav-item-font-size: .72rem;
            --nav-item-font-weight: 500;
            --nav-item-icon-size: 1.5rem;
            --nav-item-tab-icon-size: 1.35rem;
            --nav-item-icon-color: inherit;
            --nav-item-external-position: absolute;
        }

        /* narrow (set by b-nav-view): */
        :host([narrow]),
        :host([narrow][compact]) {
            flex-direction: row;
            width: auto;
            gap: 0;
            padding: .4rem;
            overflow-x: auto;
            scrollbar-width: none;

            --nav-item-direction: column;
            --nav-item-flex: 1 1 0;
            --nav-item-min-width: 3.75rem;
            --nav-item-width: auto;
            --nav-item-gap: .25em;
            --nav-item-padding: .6em .65em .5em; /* (sides: long labels clip inside the pill, not at its edge) */
            --nav-item-radius: 999px;
            --nav-item-align: center;
            --nav-item-font-size: .65rem;
            --nav-item-font-weight: 500;
            --nav-item-icon-size: 1.75rem;
            --nav-item-tab-icon-size: 1.6rem;
            --nav-item-external-position: absolute;
            --nav-item-icon-color: inherit;
            --nav-item-hover-bgd: none;
            /* active: solid theme pill, white icon/label (easier to see on the glass) */
            --nav-item-active-bgd: var(--nav-view-tab-bar-active-bgd, color-mix(in srgb, var(--theme) 90%, transparent));
            --nav-item-active-color: #fff;
        }

        /* none of the items have icons: bigger labels (the pill is just the label) */
        :host([narrow][no-icons]) {
            --nav-item-font-size: .9rem;
            --nav-item-padding: .7em .9em;
        }

        :host([narrow])::-webkit-scrollbar {
            display: none;
        }

        /* "before" / "end" content (ex: account avatar) doesn't fit in the tab bar
           (see b-nav-view's sidebar-view to show it as a tab instead) */
        :host([narrow]) slot[name="before"],
        :host([narrow]) slot[name="end"] {
            display: none;
        }

        :host([narrow]) ::slotted([slot="after"]) {
            margin-top: 0;
        }

        /* a section's child views: nested under it, a guide line below the section's icon
           (labels line up with the section's) */
        .sub-items {
            display: flex;
            flex-direction: column;
            gap: 1px;
            margin: -2px 0 .25em .75em; /* (closer to their section than the next one) */
            border-left: solid 1px var(--nav-sub-items-line, var(--theme-bgd-accent));
        }

        /* (the icon's center: item padding + half its 1.4em box) */
        .sub-items[icon] {
            margin-left: 1.45em;
        }

        .item.sub {
            position: relative;
            padding-top: .45em;
            padding-bottom: .45em;
            padding-left: .75em;
            padding-right: .25em; /* (text only, no bgd: room for longer labels) */
            font-weight: 400;
            color: var(--theme-text-accent);
        }

        .sub-items[icon] .item.sub {
            padding-left: 1.45em;
        }

        /* the section keeps the active bgd; children are text only: hover/active darken the label,
           the active one is marked on the guide line */
        .item.sub:hover,
        .item.sub[active] {
            background: none;
            color: var(--theme-text);
        }

        .item.sub[active] {
            font-weight: 600;
        }


        /* (its child views are in a hover menu, see navViewsCollapsed) */
        .item b-icon.sub-menu {
            margin-left: auto;
            width: auto;
            --size: 1em;
            color: var(--theme-text-accent);
            opacity: .8;
        }

        .item[active] b-icon.sub-menu {
            color: inherit;
        }

        .item.sub[active]::before {
            content: '';
            position: absolute;
            left: -2px;
            top: 0;
            bottom: 0;
            width: 3px;
            background: var(--nav-item-active-bgd, var(--theme));
        }

        /* single line labels in the tab bar (even when compact) */
        :host([narrow][compact]) .item span {
            display: block;
            white-space: nowrap;
        }
    
    `]

    // (re-renders when b-nav-view sets `narrow`)
    observeHost(){
        if( this._hiddenObserver || !this.host ) return

        // links shown/hidden later (ex: depends on the model) change what fits in the tab bar
        this._hiddenObserver = new MutationObserver(records=>{
            if( records.some(r=>r.target.localName == 'b-nav-view-link') )
                this.requestUpdate()
        })

        this._hiddenObserver.observe(this.host, {subtree: true, attributeFilter: ['hidden']})
    }

    connectedCallback(){
        super.connectedCallback()
        this.observeHost()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this._hiddenObserver?.disconnect()
        this._hiddenObserver = null
        this.closeNavViewsMenu()
    }

    get isNarrow(){ return this.narrow }

    // the nav view's sidebar content as a tab (narrow, see b-nav-view sidebar-view)
    get hasSidebarTab(){
        return !!(this.isNarrow && this.host?.sidebarView)
    }

    // section views and <b-nav-view-link>s in the order they show
    get entries(){
        let links = name=>(this.shadowRoot?.querySelector(`slot[name="${name}"]`)?.assignedElements({flatten: true})||[])
            .filter(el=>el.localName == 'b-nav-view-link' && !el.hidden)
            .map(link=>({link}))

        let entries = []

        this.views?.forEach(view=>{
            entries.push(...links('before:'+view.id))

            if( view.canDisplay && view.view?.shouldShowTabBtn?.() !== false ){
                // (flat: an entry for each of its child views, so they count toward the narrow tab bar's room)
                if( this.navViewsFlat(view) )
                    entries.push(...this.navItems(view).map(item=>({view, item})))
                else
                    entries.push({view})
            }

            entries.push(...links('after:'+view.id))
        })

        entries.push(...links('after'))

        if( this.hasSidebarTab )
            entries.unshift({sidebar: true})

        return entries
    }

    // when narrow, move items that don't fit into the "More" menu
    updated(){
        this.observeHost() // host is set after the bar is created

        let entries = this.entries
        let overflow = []

        if( this.isNarrow && entries.length > MAX_TAB_BAR_ITEMS ){
            let keep = e=>e.sidebar || e.link?.hasAttribute('keep')
            let kept = entries.filter(keep).length
            let room = MAX_TAB_BAR_ITEMS - 1 - kept // 1 for "More"
            let shown = 0
            overflow = entries.filter(e=>!keep(e) && shown++ >= room)
        }

        entries.forEach(e=>e.link?.toggleAttribute('overflowed', overflow.includes(e)))

        // (see the no-icons styles; the sidebar tab has an icon; "More" drops its icon to match)
        let hasIcon = e=>e.sidebar || (e.view ? !!(e.item?.icon || e.view.icon || e.view._viewClass?.prototype.renderTabIcon) : !!e.link?.icon)
        let noIcons = entries.length > 0 && !entries.some(hasIcon)
        this.toggleAttribute('no-icons', noIcons)
        if( noIcons != this._noIcons ){
            this._noIcons = noIcons
            this.requestUpdate()
        }

        let key = overflow.map(e=>e.item ? e.view.id+':'+e.item.id : e.view?.id || e.link.label).join()
        if( key != this._overflowKey ){
            this._overflowKey = key
            this._overflow = overflow
            this.requestUpdate()
        }
    }

    render(){return html`
        <slot name="before"></slot>

        ${this.hasSidebarTab?html`
            <button class="item" ?active=${this.host.sidebarViewShown} @click=${()=>this.host.showSidebarView()}>
                <b-icon name=${this.host.sidebarViewIcon || 'info'}></b-icon>
                <span>${this.host.sidebarView}</span>
            </button>
        `:''}

        ${this.renderLoop()}

        <slot name="after"></slot>

        <slot name="end"></slot>

        ${this._overflow?.length?html`
            <button class="item" ?active=${!this.host?.sidebarViewShown && this._overflow.some(e=>e.view?.active && (!e.item || e.item.active))} @click=${this.showMore}>
                ${this._noIcons?'':html`<b-icon name="more_horiz"></b-icon>`}
                <span>More</span>
            </button>
        `:''}
    `}

    renderBtn(view){
        // views can hide their button (ex: section that doesn't apply to the current model)
        if( view.view?.shouldShowTabBtn?.() === false ) return ''

        if( this.navViewsFlat(view) ) return this.renderFlatNavViews(view)

        // in the "More" menu
        if( this._overflow?.some(e=>e.view == view) ) return ''

        return html`
            <button class="item" ?active=${view.active && !this.host?.sidebarViewShown}
                ?has-sub=${!!view.navViews && this.navViewsListed(view) && this.navItems(view).length > 0}
                .tabView=${view} @click=${this.onSectionClick}
                @mouseenter=${e=>this.hoverNavViews(e, view)} @mouseleave=${this.leaveNavViews}>
                ${view.view?.renderTabIcon?.() || (view.icon?html`<b-icon name=${view.icon}></b-icon>`:'')}
                <span>${view.toolbarTitle||view.title}</span>
                ${this.hasNavViewsMenu(view)?html`<b-icon name="chevron_right" class="sub-menu"></b-icon>`:''}
            </button>
            ${this.renderNavViews(view)}
        `
    }

    // a section's child views: live from its tabs (claimed by b-nav-view), else its static navViews
    navItems(view){
        if( !this.host?.showsNavViews && !view._viewClass?.navViewsFlat ) return []
        let items = view.navViews?.views || view._viewClass?.navViews || []
        return items.filter(item=>!item.section) // (the section item stands for it, see b-tabs nav-first)
    }

    // (collapsed: only while the section is shown, see navViewsCollapsed above)
    navViewsListed(view){
        return !view._viewClass?.navViewsCollapsed || (view.active && !this.host?.sidebarViewShown)
    }

    // `static navViewsFlat = true` on a section: its child views are listed as top level items, in place of its own
    // (ex: a record whose "Details" is only its tabs); when they aren't listed (narrow, compact) its item shows as usual
    navViewsFlat(view){
        return !!view._viewClass?.navViewsFlat && !!view.navViews && this.navItems(view).length > 0
    }

    // (each with its own icon, else the section's; not the ones in the "More" menu)
    // (in the sidebar, a lone child view with nothing else listed isn't listed: there's nothing to switch to)
    renderFlatNavViews(view){
        if( !this.isNarrow && this.navItems(view).length < 2 && this.entries.length < 2 ) return ''

        let shown = view.active && !this.host?.sidebarViewShown
        return this.navItems(view)
            .filter(item=>!this._overflow?.some(e=>e.item?.id == item.id && e.view == view))
            .map(item=>html`
            <button class="item" ?active=${shown && item.active} @click=${()=>this.selectNavView(view, item)}>
                ${this._noIcons ? '' : html`<b-icon name=${item.icon || view.icon || 'circle'}></b-icon>`}
                <span>${item.title}</span>
            </button>
        `)
    }

    renderNavViews(view){
        let items = this.navItems(view)
        if( !items.length || !this.navViewsListed(view) ) return ''

        let live = view.navViews
        let shown = view.active && !this.host?.sidebarViewShown

        return html`
            <div class="sub-items" ?icon=${!!(view.icon || view._viewClass?.prototype.renderTabIcon)}>
                ${items.map(item=>html`
                    <button class="item sub" ?active=${shown && live && item.active} @click=${()=>this.selectNavView(view, item)}>
                        <span>${item.title}</span>
                    </button>
                `)}
            </div>
        `
    }

    onSectionClick(e){
        this.closeNavViewsMenu()
        this.onMenuClick(e)
    }

    // collapsed child views (not listed): shown in a menu instead
    hasNavViewsMenu(view){
        return !this.navViewsListed(view) && this.navItems(view).length > 0
    }

    // collapsed child views: a menu to the right of the section's item while hovering it (or the menu)
    hoverNavViews(e, view){
        if( !this.hasNavViewsMenu(view) ) return
        let btn = e.currentTarget
        clearTimeout(this._navMenuTimeout)
        this._navMenuTimeout = setTimeout(()=>this.showNavViewsMenu(btn, view), this._navMenu ? 0 : 150)
    }

    leaveNavViews(){
        clearTimeout(this._navMenuTimeout)
        this._navMenuTimeout = setTimeout(()=>this.closeNavViewsMenu(), 250)
    }

    async showNavViewsMenu(btn, view){
        if( this._navMenu?.view == view ) return
        this.closeNavViewsMenu()

        let menu = new Menu(this.navItems(view).map(item=>({
            label: item.menuTitle || item.title,
            icon: item.icon,
            extras: item.action ? [html`<b-icon name="call_made" muted></b-icon>`] : null,
            val: item
        })))
        this._navMenu = {menu, view}

        let selected = menu.popOver(btn, {align: 'right-start', overflowBoundry: 'window'})

        // (stays open while hovering it)
        let el = menu.presenter?.el
        el?.addEventListener('mouseenter', ()=>clearTimeout(this._navMenuTimeout))
        el?.addEventListener('mouseleave', ()=>this.leaveNavViews())

        selected = await selected
        if( this._navMenu?.menu == menu ) this._navMenu = null
        if( selected ) this.selectNavView(view, selected.val)
    }

    closeNavViewsMenu(){
        clearTimeout(this._navMenuTimeout)
        this._navMenu?.menu.presenter?.close() // (resolves the menu)
        this._navMenu = null
    }

    async selectNavView(view, item){

        // (leaves the sidebar view, when narrow, even if the section was already the active one under it)
        if( this.host?.sidebarViewActive ) this.host.sidebarViewActive = false

        // a link (see static navViews above)
        if( item.action ) return item.action(this.host?.model, this.host)

        let live = view.navViews

        // live: pick it like the tabs' own bar would (their menu-clicked handlers route it, ex: with the model's id
        // when the path has params, ex: book/:id/record/)
        let tabView = live?.tabs.views.get(item.id)
        if( tabView ){
            if( !view.active ) this.host.active = view // (without its own route; the child's route follows)
            return live.tabs.menuClick({currentTarget: {tabView}})
        }

        let sectionPath = view.route ? cleansePath(view.route.makePath({})).replace(/^\/+|\/+$/g, '') : ''
        let path = live ? item.path : (item.path && sectionPath ? sectionPath+'/'+item.path.replace(/^\/+/, '') : null)

        if( path ){
            // show the section without its own route (the child's path is the url), then go to the child's
            if( !view.active ) this.host.active = view
            await new Promise(r=>setTimeout(r)) // (a section opened for the first time adds its tabs' routes)
            return (window.goTo || router.goTo.bind(router))(path)
        }

        // (without its own route, and not its first view (see b-nav-view showSectionFirst); the child's route follows)
        if( !view.active ) this.host.active = view

        // (static: once the section's tabs offer their views)
        for( let tries = 0; !view.navViews && tries < 20; tries++ )
            await new Promise(r=>setTimeout(r, 50))

        let tabs = view.navViews?.tabs
        let match = view.navViews?.views.find(v=>v.id == item.id || v.title == item.title)
        if( tabs && match ) tabs.menuClick({currentTarget: {tabView: tabs.views.get(match.id)}})
    }

    async showMore(e){
        let overflow = this._overflow || []

        let selected = await new Menu(overflow.map((entry, i)=>({
            label: entry.item ? entry.item.title : entry.view ? entry.view.title : entry.link.label,
            icon: entry.item ? entry.item.icon || entry.view.icon : entry.view ? entry.view.icon : entry.link.icon,
            extras: entry.link?.external ? [html`<b-icon name="call_made" muted></b-icon>`] : null,
            val: i
        }))).popOver(e.currentTarget, {align: 'top-end'})

        if( !selected ) return

        let entry = overflow[selected.val]

        if( entry.item )
            this.selectNavView(entry.view, entry.item)
        else if( entry.view )
            this.onMenuClick({currentTarget: {tabView: entry.view}})
        else
            entry.link.click()
    }

})

export default customElements.get('b-nav-view-bar')
