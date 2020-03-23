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

        window.addEventListener('router:popstate', e=>{
            this.trackScreenChange(e.detail.path)
        })

        // when route changes to empty, update with current active tab
        window.addEventListener('router:push', e=>{

            if( e.detail.path != '' ){
                this.trackScreenChange(e.detail.path)
                return;
            }

            this.rootPanels = this.rootPanels || document.querySelector('b-panels[name="root"]')

            let activePanel = this.rootPanels && this.rootPanels.panelOnTopWithRoute

            if( activePanel )
                router.states.current.update(activePanel.route.state.props)
            else
                router.states.current.update({
                    title: this.tabs.views.active.title,
                    path: this.tabs.views.active.id
                })

            this.trackScreenChange(router.states.current)
        })
    }

    static get styles(){return css`
        :host {
            display: flex;
            flex-direction: column;
            position:relative;
            color: var(--theme-color);
            min-width: 0;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            --b-sub-color: var(--theme-color-accent);
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
