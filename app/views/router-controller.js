/*
	Router Controller

	Setup to be used with `b-tabs`

	Can be used as a child element or a lit controller

	TODO: move this file probably
*/
import { LitElement, html, css } from 'lit'
import router from '../router'

customElements.define('b-router-controller', class extends LitElement{

	static properties = {
		rootPath: {type: String}
	}

	static styles = css`
		:host {
			display: none;
		}
	`

	constructor(host, {rootPath=''}={}){
		
		super()
		this.slot = 'hidden'
		this.onMenuClick = this.onMenuClick.bind(this)

		if( host ){
			this.rootPath = rootPath
			this.isController = true // https://lit.dev/docs/composition/controllers/
			this.host = host
			host.addController(this)
		}
	}

	connectedCallback(){
		this.hostConnected()
	}

	hostConnected(){

		if( !this.isController ){
			let oldHost = this.host
			this.host = this.parentElement

			if( oldHost == this.host ) return
		}
		
		 // NOTE: will this cause issues?
        // I think it will be okay, only problem would be dynamic added/removed tabviews
        if( this.hasSetup ) return
        this.hasSetup = true
        
        this.host.addEventListener('menu-clicked', this.onMenuClick)

        // setup routes for each tab (if they opt in)
        this.host.views.forEach(tab=>{this.addRoute(tab)})
	}

	addRoute(tab){
		// when the route changes, switch to the appropriate tabview  
		tab.route = router.add(this.rootPath+tab.path, (oldState, newState, dir)=>{

			tab.route.state = newState

			if( newState && this.host.active != tab.id )
				this.host.active = tab

			// It's possible for the newState to be null if only the old state matched in Route._change
			// This is a problem since onRouteChange expects newState to have properties
			if( tab.view.onRouteChange && newState !== null) 
				tab.view.onRouteChange(oldState, newState, dir)
		})

		// now see if this tab is already active based on the current url state
		let matchedState = router.states && tab.route.matches(router.states.current)
		
		if( matchedState ){
			this.host.active = tab
			tab.route.state = matchedState

			// NOTE: could cause issues with existing code that does it's own "initial" loading
			if( tab.view.onRouteChange )
				tab.view.onRouteChange(null, matchedState, null)
		}
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
                title: (this.host.title ? this.host.title+': ':'') +tabView.title,
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

export default customElements.get('b-router-controller')