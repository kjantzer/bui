import TabsView from '../../presenters/tabs'
import router from '../router'

// TODO: rename to `b-routed-tabs`
customElements.define('b-tabs-router', class extends TabsView {

    connectedCallback(){
        super.connectedCallback()

        // NOTE: will this cause issues?
        // I think it will be okay, only problem would be dynamic added/removed tabviews
        if( this.hasSetup ) return
        this.hasSetup = true
        
        let rootPath = this.getAttribute('path') || ''

        this.addEventListener('menu-clicked', this.onMenuClick)

        // setup routes for each tab (if they opt in)
        this.views.forEach(tab=>{

            // when the route changes, switch to the appropriate  
            tab.route = router.add(rootPath+tab.path, (oldState, newState, dir)=>{

                tab.route.state = newState

                if( newState && this.active != tab.id )
                    this.active = tab

                // It's possible for the newState to be null if only the old state matched in Route._change
                // This is a problem since onRouteChange expects newState to have properties
                if( tab.view.onRouteChange && newState !== null) 
                    tab.view.onRouteChange(oldState, newState, dir)
            })

            // now see if this tab is already active based on the current url state
            let matchedState = router.states && tab.route.matches(router.states.current)
            
            if( matchedState ){
                this.active = tab
                tab.route.state = matchedState

                // NOTE: could cause issues with existing code that does it's own "initial" loading
                if( tab.view.onRouteChange )
                    tab.view.onRouteChange(null, matchedState, null)
            }
        })
    }

    onMenuClick(e){

        // must have been handled somewhere else
        if( e.cancelBubble ) return

        let {tabView, oldTabView} = e.detail

        if( tabView != oldTabView ){
            let oldState = tabView.routeState

            let params = {}
            
            if( tabView.view.pathParams )
                params = tabView.view.pathParams()
            else if( this.pathParams )
                params = this.pathParams()

            let [newState, oldStates] = router.push(tabView.route.makePath(params), {
                title: (this.title ? this.title+': ':'') +tabView.title,
                fromMenuClick:new Date().getTime()
            })

            tabView.routeState = tabView.route.state = newState
            
            // reuse data from old state
            // if( oldState ) // not sure why I was doing this...doesn't seem like we should do this anymore
            //     newState.update({
            //         path: oldState.path,
            //         title: oldState.title
            //     })
        }
        
        if( tabView == oldTabView && tabView.view.scrollToTop )
            tabView.view.scrollToTop()
    }

})

export default customElements.get('b-tabs-router')