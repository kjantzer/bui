import { LitElement, html, css } from 'lit-element'
import router from 'bui/router'
import 'bui/presenters/tabs/tabs-router'
import './app-tab-bar'

customElements.define('b-app', class extends LitElement {

    firstUpdated(){
        document.body.classList.add('show')

        this.tabs = this.shadowRoot.querySelector('b-tabs-router')
        
        // let elements render to DOM before starting router
        setTimeout(()=>{
            router.start({
                currentState: {
                    title: this.tabs.views.active.title,
                    path: this.tabs.views.active.id
                }
            })
        })

        window.addEventListener('router:popstate', this.onPush.bind(this))

        // when route changes to empty, update with current active tab
        window.addEventListener('router:push', this.onPush.bind(this))
    }

    onPush(e){

        let activeView = this.tabs.views.active

        // new route matches active view...make it active again
        if( !e.detail.path || activeView.route.patt.match(e.detail.path) ){
            
            router.states.current.update({
                title: activeView.title,
                path: e.detail.path || activeView.id
            })
            
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
            --list-toolbar-shadow: 0 0 0 1px var(--theme-bgd-accent);
        }

        b-tabs-router > * {
            flex-grow: 1;
        }

        @media /*(max-height: 699px) and (orientation:landscape),*/
        (min-width:700px) {
            b-tabs-router {
                grid-template-columns: auto 1fr;
            }
        }
    `}

    render(){return html`
        <b-tabs-router layout="bottom" key="${this.key}" tab-bar="${this.tabBar}">
            ${this.views}
        </b-tabs-router>  
    `}

    get key(){ return 'app-view' }
    get tabBar(){ return 'b-app-tab-bar' }

    get views(){
        return html`
        <div title="Home" icon="home">Render your app here</div>
        `
    }

    trackScreenChange(screenName){
        // gtag('event', 'screen_view', {'screen_name': screenName});
    }

})

export default customElements.get('b-app')
