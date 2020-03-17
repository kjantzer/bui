import TabsView from './index'
import router from '../../router'

customElements.define('b-tabs-router', class extends TabsView {

    connectedCallback(){
        super.connectedCallback()

        let rootPath = this.getAttribute('path') || ''

        this.addEventListener('menu-clicked', this.onMenuClick)

        // setup routes for each tab (if they opt in)
        this.views.forEach(tab=>{
            tab.route = router.add(rootPath+tab.path, (oldState, newState, dir)=>{

                tab.routeState = newState

                if( newState )
                    this.active = tab

                if( tab.view.onRouteChange )
                    tab.view.onRouteChange(oldState, newState, dir)
            })
        })
    }

    onMenuClick(e){

        // must have been handled somewhere else
        if( e.cancelBubble ) return

        let {tabView, oldTabView} = e.detail

        if( tabView != oldTabView ){
            let oldState = tabView.routeState

            let [newState, oldStates] = router.push(tabView.id, {title: tabView.title})
            tabView.routeState = newState
            
            // reuse data from old state
            if( oldState )
                newState.update({
                    path: oldState.path,
                    title: oldState.title
                })
        }
        
        if( tabView == oldTabView && tabView.view.scrollToTop )
            tabView.view.scrollToTop()
    }

})

export default customElements.get('b-tabs-router')