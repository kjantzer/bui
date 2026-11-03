/*
    # View Switcher

    Switch between the open views (panels in the root `<b-panels>` and its base view), like cmd+tab / alt+tab

    - hold `alt` (mac: `option`) and tap `` ` `` to show the open views, most recently used first;
      keep tapping (add `shift` to go back, or use the arrow keys), let go of `alt` to switch
      (cmd+tab, alt+tab and cmd+` are taken by the OS/browser)
    - a quick tap goes straight back to the previous view (nothing is shown)
    - while holding: `W` (or `delete`) closes the selected view, other letters (or `/`) start filtering, `Esc` cancels
    - filtering (or opened with `ViewSwitcher.open(controller, {sticky: true})`, ex: shift+tab):
      it stays open after letting go; `Enter` or click to switch
    - recently closed views are listed after the open ones (kept for the browser session); includes records
      replaced in a reused panel (ex: opening another deal in the deal panel)
    - views with unsaved changes (`view.model.isEdited()`) are marked with a dot

    The root controller starts listening (see ./controller.js). Apps can customize the cards:

    ```js
    import ViewSwitcher from 'bui/presenters/panel/switcher'

    // extra (json) info about a panel's view, also kept for recently closed views
    ViewSwitcher.info = panel=>({bid: panel.view?.model?.get('book_id')})

    // thumbnail for a card (return nothing for the icon)
    ViewSwitcher.renderThumb = item=>item.info?.bid ? html`<my-cover bid=${item.info.bid}></my-cover>` : null

    ViewSwitcher.enabled = false // turn off the shortcut
    ```
*/
import { LitElement, html, css } from 'lit'
import {repeat} from 'lit/directives/repeat.js'
import router from '../../app/router'
import device from '../../util/device'
import '../../elements/icon'
import '../../elements/btn'

const IGNORE_TYPES = ['modal', 'actionsheet', 'search-popup']
const SHOW_DELAY = 150 // ms; a quick tap switches without showing anything
const CLOSED_MAX = 8
const CLOSED_STORE = 'b-view-switcher-closed'

// recently closed views (in memory, saved for the browser session)
let closed = []
try{ closed = JSON.parse(sessionStorage.getItem(CLOSED_STORE)||'[]') }catch(err){}

function saveClosed(){
    try{ sessionStorage.setItem(CLOSED_STORE, JSON.stringify(closed)) }catch(err){}
}

const NOW = Number.MAX_SAFE_INTEGER // the view on top
const goTo = path=>(window.goTo || router.goTo.bind(router))(path)

// hold alt and tap ` to switch (like cmd+tab / alt+tab); `code` since mac option+` is a dead key
// a panel's url, ex: `/deal/12/books`; the route state's path, since `route.params` can be cleared
// before the panel closes (they're shared on the state, and another route matching it resets them)
const panelPath = panel=>panel.route?.state?.path || panel.route?.currentPath || ''

// same view (ex: `/deal/12` is open and `/deal/12/books` was closed)
const samePath = (a, b)=>a == b || a.startsWith(b+'/') || b.startsWith(a+'/')

const isSwitchKey = e=>e.altKey && !e.metaKey && !e.ctrlKey && e.code == 'Backquote'

// letter or number typed while holding the key (`e.key` can be a special character, ex: mac option+w is ∑)
function typedChar(e){
    if( e.code.startsWith('Key') ) return e.code.slice(3).toLowerCase()
    if( e.code.startsWith('Digit') ) return e.code.slice(5)
    return null
}

export default class ViewSwitcher extends LitElement {

    static enabled = true
    static info = panel=>null
    static renderThumb = item=>null

    // the root controller calls this (once)
    static listen(controller){
        if( this.controller ) return
        this.controller = controller

        window.addEventListener('keydown', e=>{
            if( !this.enabled || !isSwitchKey(e) ) return
            e.preventDefault()
            e.stopImmediatePropagation()

            if( this.shared?.isConnected )
                this.shared.move(e.shiftKey ? -1 : 1)
            else
                this.open(controller, {back: e.shiftKey})
        }, true)
    }

    static open(controller, opts={}){
        if( this.shared?.isConnected ) return this.shared
        let items = this.items(controller)
        if( items.length == 0 ) return

        this.shared = new ViewSwitcher(controller, items, opts)
        document.body.appendChild(this.shared)
        return this.shared
    }

    static snapshot(panel){
        if( !panel.route || IGNORE_TYPES.includes(panel.type) ) return null
        let path = panelPath(panel)
        if( !path ) return null
        return {path, title: panel.title||'', icon: panel.icon||'', info: this.info(panel)||null}
    }

    static remember(view){
        if( !view ) return
        closed = closed.filter(d=>!samePath(d.path, view.path))
        closed.unshift({...view, closedAt: Date.now()})
        closed.splice(CLOSED_MAX)
        saveClosed()
    }

    // root controller: a panel was closed
    static panelClosed(panel){
        this.remember(this.snapshot(panel))
        delete panel._switcherView
    }

    // root controller: a panel was opened; a reused panel showing another record (ex: deal/12 → deal/13)
    // counts as closing the one it was showing
    static panelOpened(panel){
        let last = panel._switcherView
        let view = this.snapshot(panel)
        if( last && view && !samePath(last.path, view.path) )
            this.remember(last)
        panel._switcherView = view
    }

    // root controller: keep what the panel shows up to date (the title changes once its record loads)
    static panelUpdated(panel){
        let view = this.snapshot(panel)
        if( panel._switcherView && view && samePath(panel._switcherView.path, view.path) ) // (another record is handled by panelOpened)
            panel._switcherView = view
    }

    // open views (most recently used first), then the recently closed ones that aren't open
    static items(controller){
        let items = controller.map(panel=>panel).filter(panel=>{
            return !IGNORE_TYPES.includes(panel.type) && panel.isOpen
        }).map(panel=>({
            panel,
            title: panel.title||'Untitled',
            icon: panel.icon||'',
            subtitle: panelPath(panel),
            info: this.info(panel)||null,
            edited: !!panel.view?.model?.isEdited?.(),
            usedAt: panel.onTop && !panel.hasAttribute('under-base') ? NOW : (panel.onTopSince||0)
        }))

        let base = controller.querySelector(':scope > [slot="base"]')
        if( base )
            items.push({
                base,
                title: base.constructor.title||'Home',
                icon: base.constructor.icon||'home',
                subtitle: '',
                usedAt: controller.baseOnTop ? NOW : (controller.baseOnTopSince||0)
            })

        items.sort((a, b)=>b.usedAt - a.usedAt)

        let openPaths = items.map(d=>d.subtitle).filter(Boolean)
        closed.filter(d=>!openPaths.some(path=>samePath(path, d.path))).forEach(d=>{
            items.push({...d, subtitle: d.path, closed: true})
        })

        return items
    }

    static properties = {
        index: {type: Number},
        filter: {type: String},
        sticky: {type: Boolean, reflect: true},
        shown: {type: Boolean, reflect: true}
    }

    constructor(controller, items, {back=false, sticky=false}={}){
        super()
        this.controller = controller
        this.items = items
        this.sticky = sticky
        this.filter = ''

        // start on the previous view (or the last one going back); sticky starts on the current one
        this.index = sticky ? 0 : back ? this.items.length-1 : Math.min(1, this.items.length-1)

        this.onKeydown = this.onKeydown.bind(this)
        this.onKeyup = this.onKeyup.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    connectedCallback(){
        super.connectedCallback()
        window.addEventListener('keydown', this.onKeydown, true)
        window.addEventListener('keyup', this.onKeyup, true)
        window.addEventListener('blur', this.cancel) // (ex: switched to another app while holding the key)

        if( this.sticky )
            this.shown = true
        else
            this._showTimeout = setTimeout(()=>this.shown = true, SHOW_DELAY)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        clearTimeout(this._showTimeout)
        window.removeEventListener('keydown', this.onKeydown, true)
        window.removeEventListener('keyup', this.onKeyup, true)
        window.removeEventListener('blur', this.cancel)
    }

    get filtered(){
        let terms = this.filter.toLowerCase().split(' ').filter(Boolean)
        if( terms.length == 0 ) return this.items
        return this.items.filter(item=>{
            let str = (item.title+' '+item.subtitle).toLowerCase()
            return terms.every(term=>str.includes(term))
        })
    }

    get selected(){ return this.filtered[this.index] }

    move(dir){
        let num = this.filtered.length
        if( num == 0 ) return
        this.index = (this.index + dir + num) % num
    }

    onKeydown(e){
        if( isSwitchKey(e) ) return // (see listen)

        if( e.key == 'Escape' ){
            e.preventDefault()
            e.stopPropagation()
            return this.cancel()
        }

        if( e.key == 'Enter' ){
            e.preventDefault()
            e.stopPropagation()
            return this.switch()
        }

        if( e.key == 'ArrowRight' || e.key == 'ArrowDown' || e.key == 'ArrowLeft' || e.key == 'ArrowUp' ){
            e.preventDefault()
            e.stopPropagation()
            return this.move(e.key == 'ArrowRight' || e.key == 'ArrowDown' ? 1 : -1)
        }

        // still holding alt: W (or delete) closes (until filtering), other letters (or /) filter
        if( e.altKey ){
            let char = typedChar(e)

            if( !this.sticky && (char == 'w' || e.key == 'Backspace' || e.key == 'Delete') ){
                e.preventDefault()
                e.stopPropagation()
                return this.closeView(this.selected)
            }

            if( char || (e.code == 'Slash' && !this.sticky) ){
                e.preventDefault()
                e.stopPropagation()
                return this.startFiltering(this.filter+(char||''))
            }
        }

        // the filter input handles the rest; nothing else should react to keys meanwhile
        if( !e.composedPath().includes(this.input) ){
            e.preventDefault()
            e.stopPropagation()
        }
    }

    onKeyup(e){
        if( e.key == 'Alt' && !this.sticky ){
            e.preventDefault()
            this.switch()
        }
    }

    async startFiltering(str){
        clearTimeout(this._showTimeout)
        this.sticky = true
        this.shown = true
        this.filter = str
        this.index = 0
        await this.updateComplete
        this.input.value = str
        this.input.focus()
    }

    onInput(e){
        this.filter = e.currentTarget.value
        this.index = 0
    }

    get input(){ return this.shadowRoot?.querySelector('input') }

    cancel(){
        this.remove()
    }

    switch(item=this.selected){
        this.remove()
        if( !item ) return

        if( item.base ){
            this.controller.showBase()
        }else if( item.panel ){
            if( item.panel.route )
                goTo(panelPath(item.panel))
            else
                item.panel.open()
        }else if( item.path )
            goTo(item.path)
    }

    async closeView(item){
        if( !item?.panel ) return

        // unsaved changes may ask first (ex: a dialog), so get out of the way
        if( item.edited ){
            this.remove()
            return item.panel.close()
        }

        await item.panel.close()

        this.items = this.constructor.items(this.controller)
        if( this.filtered.length == 0 ) return this.remove()
        this.index = Math.min(this.index, this.filtered.length-1)
    }

    // hovering selects, but only once the mouse moves (the cards can open under a resting mouse)
    onCardHover(e, item){
        this._mouseStart ||= [e.screenX, e.screenY]
        let [x, y] = this._mouseStart
        if( !this._mouseMoved && Math.abs(e.screenX-x) + Math.abs(e.screenY-y) < 4 ) return
        this._mouseMoved = true

        let index = this.filtered.indexOf(item)
        if( index != this.index ) this.index = index
    }

    onCardClick(e, item){
        e.stopPropagation()
        this.switch(item)
    }

    onCloseClick(e, item){
        e.stopPropagation()
        this.closeView(item)
    }

    static styles = css`
        :host {
            position: fixed;
            inset: 0;
            z-index: 2000; /* above modals */
            display: grid;
            place-items: center;
            padding: 1rem;
            pointer-events: none;
            opacity: 0;
            --radius: 18px;
            --selected: var(--theme, #2196f3);
        }

        :host([shown]) {
            pointer-events: auto;
            opacity: 1;
            transition: opacity 120ms ease-out;
        }

        .backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,.12); /* light: the frosted box blurs this too (darker looks muddy) */
        }

        /* frosted glass */
        main {
            position: relative;
            box-sizing: border-box;
            width: min(100%, calc(6 * 9rem + 5 * .5rem + 2.5rem));
            max-height: 85vh;
            overflow: auto;
            padding: 1.25rem;
            border-radius: var(--radius);
            color: var(--theme-text, #000);
            background: rgba(var(--theme-bgd-rgb, 255,255,255), .88); /* (less and it looks muddy over a dark view, ex: the Apps view) */
            -webkit-backdrop-filter: blur(28px) saturate(180%);
            backdrop-filter: blur(28px) saturate(180%);
            border: 1px solid rgba(var(--theme-text-rgb, 0,0,0), .1);
            box-shadow: 0 24px 60px rgba(0,0,0,.25), 0 2px 8px rgba(0,0,0,.1);
            scrollbar-width: thin;
            transform: scale(.97);
            transition: transform 160ms cubic-bezier(0.2, 0.9, 0.3, 1.2);
        }

        :host([shown]) main {
            transform: none;
        }

        @media (prefers-reduced-transparency: reduce) {
            main { background: var(--theme-bgd, #fff); }
        }

        @media (prefers-reduced-motion: reduce) {
            main { transition: none; transform: none; }
        }

        .label {
            font-size: var(--font-size-xs, .75em);
            font-weight: 600;
            letter-spacing: .06em;
            text-transform: uppercase;
            color: var(--theme-text-accent);
            margin: 0 .25rem .5rem;
        }

        .label:not(:first-child) {
            margin-top: 1.25rem;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
            gap: .5rem;
        }

        .card {
            position: relative;
            display: grid;
            grid-template-rows: 5.25rem auto;
            gap: .5rem;
            padding: .45rem .45rem .6rem;
            border-radius: 12px;
            cursor: pointer;
            min-width: 0;
            transition: background-color 100ms, box-shadow 100ms;
        }

        .card:hover {
            background: rgba(var(--theme-text-rgb, 0,0,0), .05);
        }

        .card[selected] {
            background: rgba(var(--theme-text-rgb, 0,0,0), .08);
            box-shadow: inset 0 0 0 2px var(--selected);
        }

        .thumb {
            display: grid;
            place-items: center;
            overflow: hidden;
            border-radius: 8px;
            background: rgba(var(--theme-text-rgb, 0,0,0), .06);
            font-size: 2.75rem;
            color: var(--theme-text-accent);
            transition: transform 120ms, box-shadow 120ms;
        }

        .card[selected] .thumb {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(0,0,0,.15);
            color: var(--selected);
        }

        /* thumbnails fill the height (ex: a book cover) */
        .thumb > :not(b-icon):not(.letter) {
            height: 100%;
            max-width: 100%;
        }

        .letter {
            font-weight: 600;
            text-transform: uppercase;
        }

        .text {
            min-width: 0;
            padding: 0 .15rem;
        }

        .title {
            font-size: var(--font-size-sm, .875em);
            line-height: 1.25;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            word-break: break-word;
        }

        .card[selected] .title {
            font-weight: 600;
        }

        .subtitle {
            margin-top: .15rem;
            font-size: var(--font-size-xs, .75em);
            color: var(--theme-text-accent);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .edited {
            position: absolute;
            top: .8rem;
            left: .8rem;
            width: .6rem;
            height: .6rem;
            border-radius: 50%;
            background: var(--orange, orange);
            box-shadow: 0 0 0 2px rgba(var(--theme-bgd-rgb, 255,255,255), .9);
        }

        .close {
            position: absolute;
            top: .2rem;
            right: .2rem;
            visibility: hidden;
            color: var(--theme-text);
            background: rgba(var(--theme-bgd-rgb, 255,255,255), .85);
            -webkit-backdrop-filter: blur(8px);
            backdrop-filter: blur(8px);
            border-radius: 50%;
        }

        .card:hover .close, .card[selected] .close {
            visibility: visible;
        }

        input {
            box-sizing: border-box;
            width: 100%;
            margin-bottom: 1.25rem;
            padding: .65rem .9rem;
            border-radius: 10px;
            border: none;
            outline: none;
            font: inherit;
            color: inherit;
            background: rgba(var(--theme-text-rgb, 0,0,0), .07);
        }

        input:focus {
            box-shadow: inset 0 0 0 2px var(--selected);
        }

        .empty {
            color: var(--theme-text-accent);
            padding: 1.5rem 0;
            text-align: center;
        }

        .hint {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: .35rem 1rem;
            margin-top: 1.25rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(var(--theme-text-rgb, 0,0,0), .08);
            font-size: var(--font-size-xs, .75em);
            color: var(--theme-text-accent);
        }

        .hint > span {
            display: inline-flex;
            align-items: center;
            gap: .2rem;
            white-space: nowrap;
        }

        kbd {
            display: inline-grid;
            place-items: center;
            min-width: 1.5em;
            height: 1.5em;
            padding: 0 .3em;
            box-sizing: border-box;
            border-radius: 4px;
            font-family: inherit;
            font-size: .95em;
            color: var(--theme-text);
            background: rgba(var(--theme-text-rgb, 0,0,0), .07);
            box-shadow: inset 0 -1px 0 rgba(var(--theme-text-rgb, 0,0,0), .12);
        }

        kbd + kbd {
            margin-left: .1rem;
        }

        @media (hover: none) {
            .hint { display: none; }
        }
    `

    render(){
        let items = this.filtered
        let selected = this.selected
        let open = items.filter(d=>!d.closed)
        let recent = items.filter(d=>d.closed)
        let alt = device.isMac ? '⌥' : 'Alt'

        let hints = this.sticky
            ? [[['↑','↓'], 'select'], [['↵'], 'switch'], [['esc'], 'cancel']]
            : [[[alt,'`'], 'next'], [[alt,'⇧','`'], 'back'], [['W'], 'close'], [['a–z'], 'filter'], [['esc'], 'cancel']]

        return html`
            <div class="backdrop" @click=${this.cancel}></div>
            <main>
                ${this.sticky?html`
                    <input type="search" placeholder="Filter views" @input=${this.onInput}>
                `:''}

                ${open.length?html`
                    <div class="label">Open</div>
                    <div class="cards">${repeat(open, d=>d.panel||d.base, d=>this.renderCard(d, d==selected))}</div>
                `:''}

                ${recent.length?html`
                    <div class="label">Recently Closed</div>
                    <div class="cards">${repeat(recent, d=>d.path, d=>this.renderCard(d, d==selected))}</div>
                `:''}

                ${items.length==0?html`<div class="empty">No matching views</div>`:''}

                <div class="hint">
                    ${hints.map(([keys, label])=>html`
                        <span>${keys.map(key=>html`<kbd>${key}</kbd>`)} ${label}</span>
                    `)}
                </div>
            </main>
        `
    }

    renderCard(item, selected){
        let thumb = this.constructor.renderThumb(item)
        return html`
            <div class="card" ?selected=${selected} ?closed=${item.closed} title=${item.title}
                @click=${e=>this.onCardClick(e, item)}
                @mousemove=${e=>this.onCardHover(e, item)}>
                <div class="thumb">
                    ${thumb || (item.icon
                        ? html`<b-icon name=${item.icon}></b-icon>`
                        : html`<span class="letter">${item.title.charAt(0)}</span>`)}
                </div>
                <div class="text">
                    <div class="title">${item.title}</div>
                    ${item.subtitle?html`<div class="subtitle">${item.subtitle}</div>`:''}
                </div>
                ${item.edited?html`<span class="edited" title="Unsaved changes"></span>`:''}
                ${item.panel?html`
                    <b-btn clear pill sm icon="close" class="close" title="Close"
                        @click=${e=>this.onCloseClick(e, item)}></b-btn>
                `:''}
            </div>
        `
    }
}

customElements.define('b-view-switcher', ViewSwitcher)
