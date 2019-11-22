import TabsView from './index'
import router from '../../router'

customElements.define('b-tabs-router', class extends TabsView {

    connectedCallback(){
        super.connectedCallback()

        let rootPath = this.getAttribute('path') || ''

        // setup routes for each tab (if they opt in)
        this.views.forEach(tab=>{
            router.add(rootPath+tab.path, (oldState, newState, dir)=>{

                tab.routeState = newState

                if( newState )
                    this.active = tab

                if( tab.view.onRouteChange )
                    tab.view.onRouteChange(oldState, newState, dir)
            })
        })
    }

})

export default customElements.get('b-tabs-router')