/*
    # App Topbar

    Slim bar above the app's content (`slot="main-top"` of the root `<b-panels>`). Panels open below it,
    except on phones where panels cover it (they're full screen sheets there)

    ```html
    <b-app-topbar slot="main-top">
        <my-tabs slot="start"></my-tabs>
        <my-search></my-search>
        <my-notifications slot="end"></my-notifications>
    </b-app-topbar>
    ```

    On phones a ☰ btn is shown first to open the `<b-app-sidebar>` drawer

    Styling vars: --b-app-topbar-height
*/
import { LitElement, html, css } from 'lit'
import '../../elements/btn'

customElements.define('b-app-topbar', class extends LitElement{

    static styles = css`
        :host {
            display: flex;
            align-items: center;
            gap: .5rem;
            box-sizing: border-box;
            height: var(--b-app-topbar-height, 48px);
            padding: 0 .75rem 0 .25rem;
            /* installed app with the titlebar hidden: clear window controls on the right (ex: Windows) */
            padding-right: calc(.75rem + 100vw - env(titlebar-area-x, 0px) - env(titlebar-area-width, 100vw));
            position: relative;
            /* installed app with the titlebar hidden: the bar's background drags the window (controls don't) */
            -webkit-app-region: drag;
            app-region: drag;
        }

        .menu-btn,
        ::slotted(*) {
            -webkit-app-region: no-drag;
            app-region: no-drag;
        }

        .menu-btn {
            display: none;
            flex-shrink: 0;
        }

        .menu-btn::part(main) {
            padding: .3em;
        }

        .menu-btn::part(icon) {
            --size: 1.4em;
        }

        slot[name="start"],
        slot[name="end"] {
            display: flex;
            align-items: center;
            gap: .4rem;
            flex-shrink: 0;
        }

        slot[name="start"] {
            flex-shrink: 1;
            min-width: 0;
        }

        .center {
            flex: 1;
            min-width: 0;
            display: flex;
            justify-content: center;
        }

        @media (max-width: 699px) {
            :host {
                height: calc(var(--b-app-topbar-height, 48px) + 4px);
                padding-left: max(.25rem, env(safe-area-inset-left, 0px));
                padding-right: max(.5rem, env(safe-area-inset-right, 0px));
            }

            .menu-btn {
                display: inline-flex;
            }

            /* installed app with the titlebar hidden (narrow desktop window): below the window controls */
            :host {
                height: calc(var(--b-app-topbar-height, 48px) + 4px + env(titlebar-area-height, 0px));
                padding-top: env(titlebar-area-height, 0px);
            }
        }
    `

    connectedCallback(){
        super.connectedCallback()

        // phones: panels cover the topbar, so the base view needs to start below it
        // (the panels area already starts below a hidden titlebar, so that part isn't counted)
        this.resizeObserver ||= new ResizeObserver(()=>{
            let overlay = navigator.windowControlsOverlay
            let titlebar = overlay?.visible ? overlay.getTitlebarAreaRect().height : 0
            this.panelController?.style.setProperty('--b-panels-main-top-height', (this.offsetHeight - titlebar)+'px')
        })
        this.resizeObserver.observe(this)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.resizeObserver.disconnect()
    }

    // the <b-panels> this is (or is inside of an element that is) slotted into
    get panelController(){
        let el = this
        while( el && el.slot != 'main-top' )
            el = el.parentElement || el.getRootNode().host
        return el?.parentElement
    }

    openSidebar(){
        window.dispatchEvent(new Event('b-app-sidebar:toggle'))
    }

    render(){return html`
        <b-btn clear pill icon="menu" class="menu-btn" title="Menu" @click=${this.openSidebar}></b-btn>
        <slot name="start"></slot>
        <div class="center"><slot></slot></div>
        <slot name="end"></slot>
    `}

})

export default customElements.get('b-app-topbar')
