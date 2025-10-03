import { LitElement, html, css } from 'lit'
import router from 'bui/app/router'
import '../views/routed-tabs'
import '../views/router-controller'
import {mediaQuery, MediaQueries} from './media-queries'
import './tab-bar'


// TODO: rename
customElements.define('b-app', class extends LitElement {

    static properties = {
        minimizable: {type: Boolean}
    }

    close(){
        this.panel&&this.panel.close()
    }

    firstUpdated(){
        document.body.classList.add('show')

        // since this may be subclassed multiple times, provide a way to know what it is (for styling)        
        this.classList.add('b-app')

        this.tabs = this.shadowRoot.querySelector('b-tabs')

        this.setAttribute('viewing', this.tabs.active)
        
        // let elements render to DOM before starting router
        setTimeout(()=>{
            router.start({
                currentState: {
                    title: this.tabs.views.active.title,
                    path: this.tabs.views.active.id
                }
            })
            this.tabs.views.active.route.state = router.states.current
        }, 200) // delay for router.add group delay

        window.addEventListener('router:popstate', this.onPush.bind(this))

        // when route changes to empty, update with current active tab
        window.addEventListener('router:push', this.onPush.bind(this))
    }

    onPush(e){

        if( this.panel && !this.panel.isOpen ) return

        let activeView = this.tabs.views.active

        // not sure this *should * ever happen, but if it does, so fail gracefully
        if( !activeView ) return

        // new route matches active view...make it active again
        if( !e.detail.path || activeView.route.patt.match(e.detail.path) ){

            let path = e.detail.path

            if( !path ){
                let pathParams = activeView.view.pathParams?.() || activeView.route.params
                path = activeView.route.makePath(pathParams)
            }
            
            router.states.current.update({
                title: activeView.title,
                path
            })
            activeView.route.state = router.states.current
            
            activeView.view.didBecomeActive&&activeView.view.didBecomeActive()

            this.trackScreenChange(router.states.current)

        }else{

            if( !e.detail.state.props.fromMenuClick || new Date().getTime() - e.detail.state.props.fromMenuClick > 200 )
                activeView.view.didBecomeInactive&&activeView.view.didBecomeInactive()

            this.trackScreenChange(e.detail.path)
        }
    }

    static get styles(){return css`
        :host {
            display: flex;
            flex-direction: column;
            position:relative;
            color: var(--theme-text);
            min-width: 0;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            --b-sub-color: var(--theme-text-accent);
        }

        /* when the base of b-panels */
        :host([slot="base"]) b-tabs::part(content) {
            box-shadow: var(--theme-shadow-1);
            margin-top: 1px; /* space for border */
        }

        b-tabs > * {
            flex-grow: 1;
        }

        b-tabs > b-panels {
            order: 999;
        }

        b-tabs > b-panels[inset] {
            max-width: 0;
        }

        b-tabs > b-panels[inset][num] {
            max-width: var(--inset-width);
        }


        b-panel-toolbar {
            z-index: 100;
            /* https://web.dev/window-controls-overlay/ */
            /* padding-left: env(titlebar-area-x); */
            /* width: calc( env(titlebar-area-x) + env(titlebar-area-width)); */
            /* app-region: drag; */
        }
        
        b-tabs > b-hr{
            display: none;
        }
    `}

    get key(){ return 'app-view' }
    get tabBar(){ return 'b-app-tab-bar' }
    get tabsPath(){
        let route = this.panel?.route || this.tabView?.route || this.route
        let params = route ? {...route.params} : {}
        delete params._ // remove wildcards *
        return route?route.makePath(params)+'/':''
    }
    get shouldShowSearch(){ return true }

    static get shortcuts(){

        return this.coreViews?.split(`\n`).flatMap(s=>{
            s = s.trim()
            if( !s ) return null
            let el = customElements.get(s)
            if( !el ) return null
            if( !el.id ) return null
            
            let shortcuts = [{
                title: el.shortcutTitle || el.title,
                icon: el.icon,
                permission: el.permission || parent.permission,
                args: {
                    _: el.path ? el.path.split('(')[0] : el.id
                }
            }]

            return shortcuts

        }).filter(s=>s)
    }

    render(){return html`
        <b-tabs 
            layout="left"
            layoutmobile="bottom"
            key="${this.key}"
            tab-bar="${this.tabBar}" 
            .model=${this.model}
            ?minimizable=${this.minimizable}
            ?no-search=${!this.shouldShowSearch}
            
            @active-changed=${this.onActiveTabChanged}
        >
            <b-router-controller rootpath="${this.tabsPath}"></b-router-controller>

            ${this.panel?html`
            <b-app-tab-bar-btn part="close-btn" icon="chevron_right" slot="menu:before" @click=${this.close}></b-app-tab-bar-btn>
            `:''}

            ${this.views}
        </b-tabs>  
    `}

    onActiveTabChanged(e){
        this.setAttribute('viewing', this.tabs.active)
    }

    static get coreViews(){return ''}

    get views(){ return html`
        <div title="Home" icon="home">Render your app here</div>
        ${this.constructor.coreViews}
    `}

    trackScreenChange(screenName){
        // gtag('event', 'screen_view', {'screen_name': screenName});
    }

})

export default customElements.get('b-app')
