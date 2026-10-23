/*
    # App Sidebar

    Full height app navigation for the root `<b-panels>` (`slot="left"`). Sidebar links open panels,
    which open beside it (in the content column) so the sidebar stays visible.

    ```html
    <b-panels name="root">
        <b-app-sidebar slot="left">
            <my-logo slot="brand"></my-logo>

            <b-app-sidebar-group label="Home">
                <b-app-sidebar-item base icon="apps" label="Apps"></b-app-sidebar-item>
                <b-app-sidebar-item icon="timeline" label="Timeline" path="timeline"></b-app-sidebar-item>
            </b-app-sidebar-group>

            <b-app-sidebar-item slot="footer" label="Account"></b-app-sidebar-item>
        </b-app-sidebar>

        <b-app-topbar slot="main-top">...</b-app-topbar>
    </b-panels>
    ```

    Modes (set from the window width)
    - `expanded` - icon + label list (1200px and wider, unless the user collapsed it)
    - `rail` - icons only; under 1200px it is always a rail and expanding it overlays the content
    - `drawer` - under 700px; hidden until opened (☰ in `b-app-topbar`) and slides in from the left

    Children (and items in groups) get a `rail` attribute while it's a rail so they can fade out their labels;
    the layout is the same in both modes (labels are clipped by the width) so collapsing animates smoothly

    Toggle by clicking the brand (logo), `cmd/ctrl + \`, or `window.dispatchEvent(new Event('b-app-sidebar:toggle'))`

    Styling vars: --b-app-sidebar-width, --b-app-sidebar-rail-width, --b-app-sidebar-bgd,
    --b-app-sidebar-overlay-bgd (drawer and overlay)
*/
import { LitElement, html, css } from 'lit'
import {localStore} from '../../util/store'

const NARROW = 700
const WIDE = 1200
const collapsedPref = localStore.create('b-app-sidebar:collapsed')

customElements.define('b-app-sidebar', class extends LitElement{

    static properties = {
        mode: {type: String, reflect: true},
        open: {type: Boolean, reflect: true}
    }

    static styles = css`
        :host {
            --width: var(--b-app-sidebar-width, 240px);
            /* panel padding + item padding on each side of the icon, so icons don't move when collapsing */
            --rail-width: var(--b-app-sidebar-rail-width, calc(2 * (.5rem + .65rem) + 1.4em));
            position: relative;
            display: block;
            height: 100%;
            width: var(--width);
            flex-shrink: 0;
            transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([mode="rail"]) { width: var(--rail-width); }
        :host([mode="drawer"]) { width: 0; }

        /* above panels while overlaying them */
        :host([open]) { z-index: 3000; }

        .panel {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: .25rem;
            padding: .5rem .5rem .75rem;
            /* installed app with the titlebar hidden: start below the window controls (and drag the window there) */
            padding-top: calc(.5rem + env(titlebar-area-height, 0px));
            app-region: drag;
            overflow: hidden;
            background: var(--b-app-sidebar-bgd, transparent);
            transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .panel > * {
            app-region: no-drag;
        }

        /* rail expanded over the content (under 1200px) */
        :host([mode="rail"][open]) .panel {
            width: var(--width);
            background: var(--b-app-sidebar-overlay-bgd, var(--theme-bgd));
            box-shadow: 4px 0 24px rgba(0,0,0,.3);
        }

        :host([mode="drawer"]) .panel {
            position: fixed;
            width: min(calc(var(--width) + 40px), 85vw);
            padding-top: calc(.75rem + env(safe-area-inset-top, 0px));
            padding-bottom: calc(.75rem + env(safe-area-inset-bottom, 0px));
            padding-left: calc(.5rem + env(safe-area-inset-left, 0px));
            background: var(--b-app-sidebar-overlay-bgd, var(--theme-bgd));
            border-radius: 0 16px 16px 0;
            box-shadow: 6px 0 30px rgba(0,0,0,.35);
            transform: translateX(-105%);
            visibility: hidden;
            transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1), visibility 0s 250ms;
        }

        :host([mode="drawer"][open]) .panel {
            transform: none;
            visibility: visible;
            transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scrim {
            display: none;
            position: fixed;
            inset: 0;
        }

        :host([open]) .scrim { display: block; }
        :host([mode="drawer"][open]) .scrim { background: rgba(0,0,0,.4); }

        .top {
            display: flex;
            align-items: center;
            gap: .25rem;
            min-height: 2.5rem;
            padding-top: .5rem;
            margin-bottom: 1rem;
        }

        .top ::slotted([slot="brand"]) {
            flex: 1;
            min-width: 0;
        }

        nav {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: none;
            display: flex;
            flex-direction: column;
            gap: 1px;
        }

        .footer {
            display: flex;
            flex-direction: column;
            gap: 1px;
            padding-top: .5rem;
        }
    `

    constructor(){
        super()
        this.open = false
        this.toggle = this.toggle.bind(this)
        this.close = this.close.bind(this)
        this.updateMode = this.updateMode.bind(this)
        this.onKeydown = this.onKeydown.bind(this)

        this.narrowQuery = window.matchMedia(`(max-width: ${NARROW-1}px)`)
        this.wideQuery = window.matchMedia(`(min-width: ${WIDE}px)`)
        this.updateMode()
    }

    connectedCallback(){
        super.connectedCallback()
        this.narrowQuery.addEventListener('change', this.updateMode)
        this.wideQuery.addEventListener('change', this.updateMode)
        window.addEventListener('b-app-sidebar:toggle', this.toggle)
        window.addEventListener('keydown', this.onKeydown)

        // opening a view closes the drawer/overlay
        window.addEventListener('router:push', this.close)
        window.addEventListener('router:popstate', this.close)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.narrowQuery.removeEventListener('change', this.updateMode)
        this.wideQuery.removeEventListener('change', this.updateMode)
        window.removeEventListener('b-app-sidebar:toggle', this.toggle)
        window.removeEventListener('keydown', this.onKeydown)
        window.removeEventListener('router:push', this.close)
        window.removeEventListener('router:popstate', this.close)
    }

    get isRail(){ return this.mode == 'rail' && !this.open }

    updateMode(){
        this.open = false

        if( this.narrowQuery.matches )
            this.mode = 'drawer'
        else if( !this.wideQuery.matches || collapsedPref() )
            this.mode = 'rail'
        else
            this.mode = 'expanded'
    }

    toggle(){
        // only remember the choice where there's room for either
        if( this.wideQuery.matches ){
            collapsedPref(this.mode == 'expanded')
            this.updateMode()
        }else
            this.open = !this.open
    }

    close(){
        if( this.open ) this.open = false
    }

    onKeydown(e){
        if( e.key == 'Escape' && this.open )
            return this.close()

        if( e.key == '\\' && (e.metaKey || e.ctrlKey) ){
            e.preventDefault()
            this.toggle()
        }
    }

    updated(changed){
        if( changed.has('mode') || changed.has('open') ){
            this.applyRail()
            this.dispatchEvent(new CustomEvent('change', {detail: {mode: this.mode, open: this.open}}))
        }
    }

    // let children (and items inside groups) style themselves as a rail
    applyRail(){
        let rail = this.isRail
        this.toggleAttribute('rail', rail)
        this.querySelectorAll(':scope > *, b-app-sidebar-item, b-app-sidebar-group').forEach(el=>{
            el.toggleAttribute('rail', rail)
        })
    }

    render(){return html`
        <div class="scrim" @click=${this.close}></div>
        <div class="panel" part="panel">
            <div class="top" part="top">
                <slot name="brand" @click=${this.toggle}></slot>
            </div>
            <nav part="nav"><slot @slotchange=${this.applyRail}></slot></nav>
            <div class="footer" part="footer"><slot name="footer" @slotchange=${this.applyRail}></slot></div>
        </div>
    `}

})

export default customElements.get('b-app-sidebar')
