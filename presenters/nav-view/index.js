/*
    Nav View - a lighter, settings style alternative to <b-app-core-view>

    Same API as b-tabs/b-app-core-view (sections are child elements with static id/title/icon,
    works with <b-router-controller>, `.model` is passed to the active section)

    ```html
    <b-nav-view key="account" .model=${model}>
        <b-router-controller rootpath=${this.route.path+'/'}></b-router-controller>

        <header slot="before">title, actions...</header>
        <aside slot="menu:before">shown above the sections in the sidebar (hidden when narrow)</aside>
        <div slot="menu:end">shown below the sections (and links) in the sidebar (hidden when narrow)</div>

        my-section-one
        my-section-two
    </b-nav-view>
    ```

    Desktop: full height sidebar of sections; slim header above the content
    Narrow (view under 700px wide): header and content, with a floating iOS 26 style "glass" tab bar
    at the bottom (easy to reach); content scrolls underneath it

    Sections that scroll themselves should add `var(--nav-view-bottom-space, 0px)` to their bottom padding

    Attributes
    - `compact` - desktop sidebar is a narrow rail (icon over label) instead of a list
    - `close-btn` - close btn (emits `close-panel`): top of the sidebar on desktop; a toolbar row when narrow
      on non-phone devices (phones close sheets by swiping)
      - `slot="sidebar-top"` - shown to the right of the sidebar close btn (ex: history btn); hidden when narrow
    - `sidebar-view="Summary"` (+ `sidebar-view-icon`) - when narrow, the sidebar's content (`menu:before`,
      `menu:end`, and `sidebar-top` in its header, ex: a 3 dot menu) is its own tab in the tab bar (first, and the
      one shown when a model is set) instead of being hidden; the same elements move there (their slot changes),
      so nothing renders twice
    - `sidebar-in-first` - when narrow, the sidebar's content (`menu:before`, `menu:end`) is at the top of the first
      section instead (it scrolls with it; ex: a record's avatar and name above its details). The first section
      should flow normally (not a full height list); other sections don't show it

    Extra (non section) items: <b-nav-view-link> (see ./link.js)

    Child views: a section's own tabs (`<b-tabs nav="parent">` in it) are listed under the section in the sidebar
    (their tab bar hides); sections can list them up front (before they're opened): `static navViews = [{title, path,
    icon}]` (paths under the section's; the section's path should allow them, ex: `setup(/:tab)`). Not when narrow
    or compact (no room): the section's tabs show their own tab bar

    Sets --root-titlebar-padding-left so section list titles (b-root-titlebar) aren't against the sidebar
    Sets --nav-view-gutter (side padding) for sections that pad their own content: 1.5rem, .75rem when narrow

    Styling vars: --nav-view-sidebar-width, --nav-view-sidebar-bgd, --nav-view-sidebar-border, --nav-view-glass-bgd,
    --nav-view-tab-bar-active-bgd (narrow tab bar), --nav-item-active-bgd/--nav-item-active-color (sidebar)
*/
import { html, css } from 'lit'
import device from '../../util/device'
import '../tabs'
import './bar'
import './link'

const NARROW_WIDTH = 700 // (or a portrait touch screen, see updateNarrow)
// content that's the sidebar view when narrow (slot => its slot in the sidebar view)
const SIDEBAR_SLOTS = {
    'menu:before': 'sidebar-view:before',
    'menu:end': 'sidebar-view:end',
    'sidebar-top': 'sidebar-view:top'
}
// (sidebar-in-first: above the first section)
const FIRST_SLOTS = {
    'menu:before': 'first:before',
    'menu:end': 'first:end'
}

const Tabs = customElements.get('b-tabs')

customElements.define('b-nav-view', class extends Tabs{

    static styles = [Tabs.styles, css`
        :host {
            --layout: left;
            --contentPadding: 0;
            background: var(--theme-bgd);
        }

        /* full height sidebar; header only above the content */
        :host > main.nav {
            position: relative; /* so slotted content can be positioned within the view */
            display: grid;
            grid-template-columns: var(--nav-view-sidebar-width, 250px) minmax(0, 1fr);
            grid-template-rows: auto 1fr;
            grid-template-areas:
                "nav header"
                "nav content";
            height: 100%;
            min-height: 0;
        }

        /* its sections listed by a parent nav instead (nav="parent", see b-tabs): no sidebar */
        :host([nav-claimed]) > main.nav {
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas:
                "header"
                "content";
        }

        :host([nav-claimed]) .sidebar {
            display: none;
        }

        slot[name="before"]::slotted(*) {
            grid-area: header;
            padding: .75rem 1.5rem;
            min-height: 3.25rem;
            box-sizing: border-box;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        .sidebar {
            grid-area: nav;
            display: flex;
            flex-direction: column;
            min-height: 0;
            background: var(--nav-view-sidebar-bgd, var(--theme-bgd));
            border-right: var(--nav-view-sidebar-border, solid 1px var(--theme-bgd-accent));
        }

        slot[name="tabbar"] {
            display: block;
            flex: 1;
            overflow-y: auto;
            min-height: 0;
        }

        .sidebar-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: .5rem;
            margin: .5rem .5rem -.5rem;
        }

        /* bigger icon in the same size btn (like panel toolbars) */
        .close-btn::part(main) {
            padding: .25em;
        }

        .close-btn::part(icon) {
            --size: 1.3em;
        }

        .narrow-toolbar {
            display: none;
        }

        :host([compact]) > main.nav {
            grid-template-columns: auto minmax(0, 1fr);
        }

        slot.content {
            /* list titles clear of the sidebar edge (no content padding here) */
            --root-titlebar-padding-left: 1em;
            /* side padding for sections that pad themselves (lines up with the header) */
            --nav-view-gutter: 1.5rem;
            grid-area: content;
            display: flex;
            overflow: auto;
            min-height: 0;
            background: none;
            box-shadow: none;
            border-radius: 0;
        }

        /* content below the sections; (set here: in the bar it's only a forwarding slot, which has no box) */
        ::slotted([slot="menu:end"]) {
            margin-top: 1.25rem;
        }

        /* the sidebar content as its own tab (narrow, see sidebar-view): a header like the sections' (title,
           sidebar-top content), then the content */
        .sidebar-view {
            grid-area: content;
            display: flex;
            flex-direction: column;
            min-height: 0;
        }

        .sidebar-view-header {
            display: flex;
            align-items: center;
            gap: .5rem;
            padding: .75rem 1rem;
            min-height: 3.25rem;
            box-sizing: border-box;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        .sidebar-view-header .title {
            flex: 1;
            min-width: 0;
            font-family: var(--font-display, inherit);
            font-size: var(--font-size-md, 1.1892em);
            line-height: 1.1;
        }

        /* (btns in the header don't make it taller than the sections' headers) */
        ::slotted([slot="sidebar-view:top"]) {
            margin: -.5rem -.35rem -.5rem 0;
        }

        .sidebar-view-body {
            flex: 1;
            overflow: auto;
            min-height: 0;
            padding: 1.25rem .5rem var(--nav-view-bottom-space, 0px);
            box-sizing: border-box;
        }

        /* sidebar-in-first (narrow, the first section): the sidebar content, then the section, scroll together */
        .content-wrap {
            display: contents;
        }

        .first-top {
            display: none;
        }

        :host([sidebar-in-first-shown]) .content-wrap {
            grid-area: content;
            display: flex;
            flex-direction: column;
            overflow: auto;
            min-height: 0;
        }

        :host([sidebar-in-first-shown]) .first-top {
            display: block;
            padding: 1.25rem .5rem 0;
        }

        :host([sidebar-in-first-shown]) slot.content {
            flex: none;
            overflow: visible;
        }

        /* (the content header belongs to the sections) */
        .sidebar-view[hidden],
        :host([sidebar-view-shown]) slot.content,
        :host([sidebar-view-shown]) slot[name="before"] {
            display: none;
        }

        /* narrow (see updateNarrow): */
        /* no sidebar beside the content: list titles line up with other sheets (see bui/presenters/panel) */
        :host([narrow]) slot.content {
            --root-titlebar-padding-left: .5em;
        }

        :host([narrow]) > main.nav {
            position: relative;
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: auto auto 1fr;
            grid-template-areas:
                "toolbar"
                "header"
                "content";
        }

        /* sidebar becomes the floating tab bar */
        :host([narrow]) .sidebar {
            display: contents;
        }

        :host([narrow]) .sidebar-top {
            display: none;
        }

        :host([narrow]) .narrow-toolbar {
            grid-area: toolbar;
            display: flex;
            align-items: center;
            padding: .5rem;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        :host([narrow]) slot[name="before"]::slotted(*) {
            padding: .75rem 1rem;
        }

        /* sidebar-only content (ex: account avatar, close btn) doesn't fit in the tab bar
           (hidden here on the elements themselves; Safari ignores display:none on the bar's <slot>) */
        :host([narrow]) ::slotted([slot="menu:before"]),
        :host([narrow]) ::slotted([slot="menu:end"]) {
            display: none !important;
        }

        /*
            content runs under the floating tab bar; sections that scroll themselves should pad
            their bottom with var(--nav-view-bottom-space) so the end can scroll above the bar
        */
        /* (more room for content on phones) */
        :host([narrow]) slot.content {
            --nav-view-gutter: .75rem;
        }

        :host([narrow]) slot.content,
        :host([narrow]) .sidebar-view-body {
            --nav-view-bottom-space: calc(6.5rem + env(safe-area-inset-bottom));
        }

        /* floating "liquid glass" tab bar */
        :host([narrow]) slot[name="tabbar"] {
            position: absolute;
            z-index: 10;
            left: .75rem;
            right: .75rem;
            /* sits down in the home indicator area like native iOS tab bars */
            bottom: max(.75rem, calc(env(safe-area-inset-bottom) * .5));
            min-width: 0;
            overflow: hidden;
            border-radius: 999px;
            border: none;
            background: var(--nav-view-glass-bgd, color-mix(in srgb, var(--theme-bgd) 55%, transparent));
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            box-shadow:
                0 8px 30px rgba(0,0,0,.18),
                0 1px 3px rgba(0,0,0,.08),
                inset 0 0 0 1px color-mix(in srgb, var(--theme-text) 8%, transparent),
                inset 0 1px 0 rgba(255,255,255,.35);
        }
    
    `]

    static get properties(){return {
        ...super.properties,
        compact: {type: Boolean, reflect: true},
        closeBtn: {type: Boolean, attribute: 'close-btn'},
        sidebarView: {type: String, attribute: 'sidebar-view'},
        sidebarViewIcon: {type: String, attribute: 'sidebar-view-icon'},
        sidebarViewActive: {state: true},
        sidebarInFirst: {type: Boolean, attribute: 'sidebar-in-first'},
        narrow: {type: Boolean, reflect: true}
    }}

    connectedCallback(){
        super.connectedCallback()

        window.addEventListener('nav-views', this.onNavViewsRemoved)

        // narrow is measured (like the bar) so the sidebar view can move content between slots
        // (rotating a tablet resizes it too)
        this._narrowObserver ||= new ResizeObserver(()=>this.updateNarrow())
        this._narrowObserver.observe(this)

        // sidebar content added later (ex: conditional template) gets moved too
        this._childObserver ||= new MutationObserver(()=>this.requestUpdate())
        this._childObserver.observe(this, {childList: true})
    }

    /*
        Narrow layout (header, content, floating tab bar): under NARROW_WIDTH, or a portrait touch screen
        (ex: a tablet held upright; the sidebar takes too much of its width)
        The tab bar and links get the attribute too (styled in their own shadow roots, see ./bar.js, ./link.js)
    */
    updateNarrow(){
        let width = this.getBoundingClientRect().width
        let portraitTouch = device.isTouch && window.innerHeight > window.innerWidth
        this.narrow = !!width && (width < NARROW_WIDTH || portraitTouch)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this._narrowObserver?.disconnect()
        this._childObserver?.disconnect()
        window.removeEventListener('nav-views', this.onNavViewsRemoved)
    }

    // the sidebar content shown as its own tab (narrow)
    get sidebarViewShown(){
        return !!(this.sidebarView && this.narrow && this.sidebarViewActive)
    }

    // the sidebar content shown above the first section (narrow)
    get sidebarInFirstShown(){
        return !!(this.sidebarInFirst && this.narrow && this.views?.active && this.views.active == this.views.first)
    }

    showSidebarView(){
        if( this.sidebarViewShown ) return this.scrollToTop() // tapped again
        this.sidebarViewActive = true
    }

    // the active section (or the sidebar view) back to the top, smoothly
    // (sections often scroll something inside them, ex: a list; whatever is scrolled is found)
    scrollToTop(){
        let el = this.sidebarViewShown
            ? this.shadowRoot.querySelector('.sidebar-view-body')
            : this.sidebarInFirstShown
            ? this.shadowRoot.querySelector('.content-wrap')
            : findScroller(this.views?.active?.view)
        el?.scrollTo({top: 0, behavior: 'smooth'})
    }

    // a model (ex: the record the view is for) opens to the sidebar view (only shown when narrow)
    onModelChange(){
        super.onModelChange?.(...arguments)
        if( this.sidebarView && this.model && this.model != this._sidebarViewModel ){
            this._sidebarViewModel = this.model
            this.sidebarViewActive = true
        }
    }

    // picking a different section (or the route changing to one) leaves the sidebar view
    // (not the same one again, ex: the router selecting the current section when the view opens)
    get active(){ return super.active }
    set active(val){
        let oldVal = this.views?.active?.id
        super.active = val
        if( oldVal && this.views?.active?.id != oldVal )
            this.sidebarViewActive = false
        this.requestUpdate() // (b-tabs' setter calls update() directly, which drops the queued update; updated() moves the content back)

        // b-tabs only fires this on a menu click; also when the route changes the section (ex: a header showing its title)
        if( this.views?.active && this.views.active.id != oldVal )
            this.dispatchEvent(new CustomEvent('active-changed', {detail: {tabView: this.views.active}, bubbles: false, composed: true}))
    }

    menuClick(e){
        let wasShown = this.sidebarViewShown
        let tabView = e.currentTarget.tabView
        let same = tabView?.id == this.active
        this.sidebarViewActive = false

        if( same ){
            // (b-tabs fires this for every click, even on the active one)
            this.dispatchEvent(new CustomEvent('menu-clicked', {detail: {tabView, oldTabView: tabView}, bubbles: false, composed: true}))

            // the section was already active under the sidebar view: show it; else back to its top (like iOS tab bars)
            return wasShown ? this.requestUpdate() : this.scrollToTop()
        }

        super.menuClick(e)
    }

    updated(changed){
        super.updated?.(changed)

        // room for child views changed: the sections' tabs offer them again (claimed, or they show their own bar)
        if( (changed.has('narrow') && !!changed.get('narrow') != !!this.narrow)
        || (changed.has('compact') && !!changed.get('compact') != !!this.compact) ){
            this.views?.map(tabView=>tabView.navViews = null)
            window.dispatchEvent(new Event('nav-views:refresh'))
        }

        // (the bar and links style themselves by it; links can be added later, see the child observer)
        this.shadowRoot.querySelector('b-nav-view-bar')?.toggleAttribute('narrow', this.narrow)
        for( let link of this.querySelectorAll(':scope > b-nav-view-link') )
            link.toggleAttribute('narrow', this.narrow)

        let shown = this.sidebarViewShown
        this.toggleAttribute('sidebar-view-shown', shown)

        let inFirst = this.sidebarInFirstShown
        this.toggleAttribute('sidebar-in-first-shown', inFirst)

        // sidebar content: in the sidebar, the sidebar view, or above the first section
        if( this.sidebarView || this.sidebarInFirst )
            for( let el of this.children ){
                let orig = el.dataset.navViewSlot || el.slot
                if( !SIDEBAR_SLOTS[orig] ) continue
                el.dataset.navViewSlot = orig
                let slot = shown ? SIDEBAR_SLOTS[orig] : inFirst ? (FIRST_SLOTS[orig] || orig) : orig
                if( el.slot != slot ) el.slot = slot
            }

        this.__tabBar?.requestUpdate()
    }

    close(){
        // b-panel closes on this event
        this.dispatchEvent(new CustomEvent('close-panel', {bubbles: true, composed: true}))
    }

    renderCloseBtn(){
        return html`<b-btn clear lg pill icon="close" class="close-btn" title="Close" @click=${this.close}></b-btn>`
    }

    constructor(){
        super()
        this.setAttribute('tab-bar', 'b-nav-view-bar')
        this.onNavViews = this.onNavViews.bind(this)
        this.onNavViewsRemoved = this.onNavViewsRemoved.bind(this)
        this.addEventListener('nav-views', this.onNavViews)
    }

    // (sidebar list; see "Child views" above)
    get showsNavViews(){ return !this.narrow && !this.compact }

    // a section's tabs offering their views (b-tabs nav="parent")
    onNavViews(e){
        let {tabs, views} = e.detail
        if( tabs == this || !views ) return

        let tabView = e.composedPath().map(el=>el.tabView).find(t=>t && this.views.get(t.id) == t)
        if( !tabView ) return

        e.stopPropagation() // (the nearest nav decides; when it has no room, the tabs show their own bar)
        if( !this.showsNavViews ) return

        e.detail.handled = true
        tabView.navViews = {tabs, views}
        this.__tabBar?.requestUpdate()
    }

    // (tabs removed; sent on window)
    onNavViewsRemoved(e){
        let {tabs, views} = e.detail
        if( views ) return

        this.views?.map(tabView=>{
            if( tabView.navViews?.tabs != tabs ) return
            tabView.navViews = null
            this.__tabBar?.requestUpdate()
        })
    }

    // the bar is created lazily by b-tabs; pass along `compact` whenever it renders
    // (and `menu:end`: content below the sections; b-tabs only passes along menu:before/after)
    renderTabBar(){
        let bar = super.renderTabBar()
        this.__tabBar?.toggleAttribute('compact', !!this.compact)

        if( this.__tabBar && !this.__tabBar.querySelector('slot[name="menu:end"]') ){
            let slot = document.createElement('slot')
            slot.name = 'menu:end'
            slot.slot = 'end'
            this.__tabBar.appendChild(slot)
        }

        return bar
    }

    render(){return html`
        <main part="main" class="nav">
            ${this.closeBtn&&!device.isSmall?html`
                <div class="narrow-toolbar" part="narrow-toolbar">${this.renderCloseBtn()}</div>
            `:''}
            <slot name="before"></slot>
            <div class="sidebar" part="sidebar">
                ${this.closeBtn?html`
                    <div class="sidebar-top" part="sidebar-top">${this.renderCloseBtn()}<slot name="sidebar-top"></slot></div>
                `:''}
                <slot name="tabbar" part="tabbar" @menu-click=${this._onMenuClick}>${this.renderTabBar()}</slot>
            </div>
            <div class="content-wrap" part="content-wrap">
                <div class="first-top" part="first-top">
                    <slot name="first:before"></slot>
                    <slot name="first:end"></slot>
                </div>
                <slot class="content" part="content"></slot>
            </div>
            <div class="sidebar-view" part="sidebar-view" ?hidden=${!this.sidebarViewShown}>
                <div class="sidebar-view-header" part="sidebar-view-header">
                    <span class="title">${this.sidebarView}</span>
                    <slot name="sidebar-view:top"></slot>
                </div>
                <div class="sidebar-view-body">
                    <slot name="sidebar-view:before"></slot>
                    <slot name="sidebar-view:end"></slot>
                </div>
            </div>
            <slot name="empty">
                <b-empty-state ?hidden=${this.views.size>0}>No views</b-empty-state>
            </slot>
        </main>
    `}

})

// what's scrolled in a section: the first scrolled element (through shadow roots), else the first that can scroll
function findScroller(root){
    if( !root ) return null

    let scrollable = null
    let queue = [root]

    while( queue.length ){
        let el = queue.shift()

        if( el.scrollHeight > el.clientHeight + 1 && ['auto', 'scroll'].includes(getComputedStyle(el).overflowY) ){
            if( el.scrollTop > 0 ) return el
            scrollable ||= el
            continue // (not inside it: ex: a list's rows)
        }

        queue.push(...el.children, ...(el.shadowRoot?.children || []))
    }

    return scrollable
}

export default customElements.get('b-nav-view')
