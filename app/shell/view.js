/*
    # App Shell View

    Base class for the app's main view when using the shell (`b-app-sidebar` + `b-app-topbar`)
    instead of `b-app` tabs. It is the `slot="base"` of the root `<b-panels>`; everything else opens as a panel

    Starts the router and restores the title when all panels are closed

    Emits `app-shell:rendered` on window when it first renders (the app's panels and shortcuts are registered:
    ex: a sidebar can show its links) and `app-shell:ready` once the router has started

    ```js
    import AppShellView from 'bui/app/shell/view'

    customElements.define('my-home', class extends AppShellView{
        static title = 'Home'
        render(){ return html`...` }
    })
    ```
*/
import { LitElement } from 'lit'
import router from '../router'

export default class AppShellView extends LitElement {

    static title = ''

    constructor(){
        super()
        this.onRouteChange = this.onRouteChange.bind(this)
    }

    connectedCallback(){
        super.connectedCallback()
        window.addEventListener('router:push', this.onRouteChange)
        window.addEventListener('router:popstate', this.onRouteChange)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        window.removeEventListener('router:push', this.onRouteChange)
        window.removeEventListener('router:popstate', this.onRouteChange)
    }

    firstUpdated(){
        document.body.classList.add('show')
        AppShellView.rendered = true
        window.dispatchEvent(new Event('app-shell:rendered'))

        // let elements render (and routes be added) before starting
        setTimeout(()=>{
            router.start({currentState: {title: this.constructor.title, path: ''}})
            window.dispatchEvent(new Event('app-shell:ready'))
        }, 200)
    }

    onRouteChange(e){
        if( e.detail.path ) return
        e.detail.state.update({title: this.constructor.title, path: ''})
        this.didBecomeActive?.()
    }

}
