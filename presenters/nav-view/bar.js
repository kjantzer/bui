/*
    Nav View Bar - tab bar for <b-nav-view>

    Desktop: vertical list in a sidebar (or a narrow icon rail when `compact`)
    Narrow (view under 700px wide): iOS 26 style tab bar (icon over label, active item in a theme colored pill)
    - shows at most 5 items; the rest go in a "More" menu (links with the `keep` attribute always stay in the bar)

    Sections' child views are listed under them (sidebar list only; see b-nav-view "Child views")
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

        /* a section's child views: labels lined up with the section's */
        .sub-items {
            display: flex;
            flex-direction: column;
            gap: 2px;
            margin-top: -2px; /* (closer to their section than the next one) */
        }

        /* (sections without an icon: a small indent) */
        .item.sub {
            padding-left: 1.75em;
            font-weight: 400;
        }

        .sub-items[icon] .item.sub {
            padding-left: calc(1.5em + 1.4em);
        }

        /* the active child is highlighted instead */
        .item[has-sub][active] {
            background: none;
        }

        .item.sub:not([active]) {
            color: var(--theme-text-accent);
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

            if( view.canDisplay && view.view?.shouldShowTabBtn?.() !== false )
                entries.push({view})

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
        let hasIcon = e=>e.sidebar || (e.view ? !!(e.view.icon || e.view._viewClass?.prototype.renderTabIcon) : !!e.link?.icon)
        let noIcons = entries.length > 0 && !entries.some(hasIcon)
        this.toggleAttribute('no-icons', noIcons)
        if( noIcons != this._noIcons ){
            this._noIcons = noIcons
            this.requestUpdate()
        }

        let key = overflow.map(e=>e.view?.id || e.link.label).join()
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
            <button class="item" ?active=${!this.host?.sidebarViewShown && this._overflow.some(e=>e.view?.active)} @click=${this.showMore}>
                ${this._noIcons?'':html`<b-icon name="more_horiz"></b-icon>`}
                <span>More</span>
            </button>
        `:''}
    `}

    renderBtn(view){
        // views can hide their button (ex: section that doesn't apply to the current model)
        if( view.view?.shouldShowTabBtn?.() === false ) return ''

        // in the "More" menu
        if( this._overflow?.some(e=>e.view == view) ) return ''

        return html`
            <button class="item" ?active=${view.active && !this.host?.sidebarViewShown} ?has-sub=${!!view.navViews && this.navItems(view).length > 0}
                .tabView=${view} @click=${this.onMenuClick}>
                ${view.view?.renderTabIcon?.() || (view.icon?html`<b-icon name=${view.icon}></b-icon>`:'')}
                <span>${view.toolbarTitle||view.title}</span>
            </button>
            ${this.renderNavViews(view)}
        `
    }

    // a section's child views: live from its tabs (claimed by b-nav-view), else its static navViews
    navItems(view){
        if( !this.host?.showsNavViews ) return []
        return view.navViews?.views || view._viewClass?.navViews || []
    }

    renderNavViews(view){
        let items = this.navItems(view)
        if( !items.length ) return ''

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

    async selectNavView(view, item){
        let live = view.navViews
        let sectionPath = view.route ? cleansePath(view.route.makePath({})).replace(/^\/+|\/+$/g, '') : ''
        let path = live ? item.path : (item.path && sectionPath ? sectionPath+'/'+item.path.replace(/^\/+/, '') : null)

        if( path ){
            // show the section without its own route (the child's path is the url), then go to the child's
            if( !view.active ) this.host.active = view
            await new Promise(r=>setTimeout(r)) // (a section opened for the first time adds its tabs' routes)
            return (window.goTo || router.goTo.bind(router))(path)
        }

        if( !view.active ) this.onMenuClick({currentTarget: {tabView: view}})

        // (static: once the section's tabs offer their views)
        for( let tries = 0; !view.navViews && tries < 20; tries++ )
            await new Promise(r=>setTimeout(r, 50))

        let tabs = view.navViews?.tabs
        let match = view.navViews?.views.find(v=>v.id == item.id || v.title == item.title)
        if( tabs && match ) tabs.active = match.id
    }

    async showMore(e){
        let overflow = this._overflow || []

        let selected = await new Menu(overflow.map((entry, i)=>({
            label: entry.view ? entry.view.title : entry.link.label,
            icon: entry.view ? entry.view.icon : entry.link.icon,
            extras: entry.link?.external ? [html`<b-icon name="call_made" muted></b-icon>`] : null,
            val: i
        }))).popOver(e.currentTarget, {align: 'top-end'})

        if( !selected ) return

        let entry = overflow[selected.val]

        if( entry.view )
            this.onMenuClick({currentTarget: {tabView: entry.view}})
        else
            entry.link.click()
    }

})

export default customElements.get('b-nav-view-bar')
