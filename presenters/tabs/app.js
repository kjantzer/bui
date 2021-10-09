import { LitElement, html, css } from 'lit-element'
import router from 'bui/router'
import './tabs-router'
import './app-tab-bar'
import {mediaQuery, MediaQueries} from '../../util/mediaQueries'

if( !MediaQueries.get('b-app-landscape') )
MediaQueries.set('b-app-landscape', styles=>css`
    @media /*(max-height: 599px) and (orientation:landscape),*/
    (min-width:900px) and (min-height: 600px), (min-width: 700px) {
        ${styles}
    }
`)

customElements.define('b-app', class extends LitElement {

    firstUpdated(){
        document.body.classList.add('show')

        // since this may be subclassed multiple times, provide a way to know what it is (for styling)        
        this.classList.add('b-app')

        this.tabs = this.shadowRoot.querySelector('b-tabs-router')
        
        // let elements render to DOM before starting router
        setTimeout(()=>{
            router.start({
                currentState: {
                    title: this.tabs.views.active.title,
                    path: this.tabs.views.active.id
                }
            })
            this.tabs.views.active.route.state = router.states.current
        })

        window.addEventListener('router:popstate', this.onPush.bind(this))

        // when route changes to empty, update with current active tab
        window.addEventListener('router:push', this.onPush.bind(this))
    }

    onPush(e){

        let activeView = this.tabs.views.active

        // not sure this *should * ever happen, but it does, so fail gracefully
        if( !activeView ) return

        // new route matches active view...make it active again
        if( !e.detail.path || activeView.route.patt.match(e.detail.path) ){
            
            router.states.current.update({
                title: activeView.title,
                // path: e.detail.path || activeView.id
                path: activeView.route.makePath(activeView.route.params)
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

        b-tabs-router > * {
            flex-grow: 1;
        }

        ${mediaQuery('b-app-landscape', css`
            b-tabs-router {
                grid-template-columns: auto 1fr;
            }
        `)}
    `}

    get shouldShowSearch(){ return true }

    render(){return html`
        <b-tabs-router layout="bottom" key="${this.key}" tab-bar="${this.tabBar}" ?no-search=${!this.shouldShowSearch}>
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
