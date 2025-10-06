import { LitElement, html, css } from 'lit'
import router from '../router'
import {cache} from 'lit/directives/cache.js'

export {LitElement, html, css}

export default class RoutedView extends LitElement {

    // note: dupe code
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

    get idAttribute(){ 
        return (this.coll && this.coll.model.prototype.idAttribute) || 'id'
    }

    closeInvalid = true
    animateSameModelLoaded = false
    animateModelChange = false

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-rows: 1fr;
            position:relative;
            height: 100%;
            --bgd-color: var(--theme-bgd-accent2, #fff);
            background: var(--theme-bgd);
            /* --border-color: rgba(var(--theme-text-rgb, 0,0,0), .1); */
        }

        b-panel-toolbar {
            grid-column: 1/-1;
        }

        :host([in-panel]) {
            grid-template-rows: auto 1fr;
            --bgd-color: var(--theme-bgd, #fff);
        }
        
        :host(:not([in-panel])) b-panel-toolbar {
            display: none;
        }

        b-list {
            position: static; /* so spinner covers this whole view */
        }

        b-list [slot="header"]::-webkit-scrollbar,
        b-list [slot="footer"]::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
        }

        :host > main {
            overflow: auto;
            position: relative;
            padding: var(--gutter, 1em);
        }

        b-app-tab-bar-btn {
            display: grid;
            grid-template-columns: 1fr;
        }
        
        b-app-tab-bar-btn:has(b-model-history-btn) {
            grid-template-columns: 1fr 1fr;
            margin-right: .5em;
        }
        
        b-model-history-btn[size="1"] {
            display: none;
        }

        b-app-tab-bar-btn:has(b-model-history-btn[size="1"]) {
            grid-template-columns: 1fr;
            margin-right: 0;
        }
    `}

    get router(){ return router }

    get route(){
        let root = (this.panel || this.tabView)
        return root ? root.route : undefined
    }

    get routePath(){
        let path = this.makePath()
        return path ? path+'/' : ''
    }

    makePath(params={}){
        let route = this.route
        params = params === null ? {} : Object.assign({}, route.params, params)
        return route ? route.makePath(params) : ''
    }

    shouldUpdate(){

        if( this.panel && !this.panel.toolbar ) 
            this.panel._linkToolbar()

        if( this.modelRequired !== true || this.renderEmpty ) return true

        if( !this.model ) return false

        // if( this.panel && !this.panel.toolbar ) 
        //     this.panel._linkToolbar()
            
        return true
    }

    render(){return html`
        ${cache(this.renderEmpty&&!this.model?this.renderEmpty():this.renderModel())}
    `}

    renderModel(){ return html`` }

    updated(){
        this.toggleAttribute('in-panel', !!this.panel)
    }

    // allow subclass override
    get loadFetchData(){
        return {initialLoad:true}
    }

    isLoadingSameModel(id){
        return this.model && this.model.id == id 
    }

    async load(id, attrs={}, state){

        // this model already loaded
        // NOTE: will this cause problems with existing code?
        if( this.isLoadingSameModel(id) ){

            if( this.animateSameModelLoaded )
                this.panel?.pulseBack()
            
            this.finishLoading(this.model, id, attrs, state)
            return false
        }

        if( !id ){
            // this.model = null
            this.finishLoading(null, id, attrs, state)
            return false
        }

        let coll = this.coll

        if( !coll ) return true

        if( id === 'create' ){
            this.model = new coll.model(attrs)
            this.model.collection = coll
            return
        }

        try{
            
            let model = await loadModel(coll, id, {
                fetch: this.fetchOnLoad,
                fetchData: this.loadFetchData,
                idAttribute: this.idAttribute
            })

            let continueLoading = await this.finishLoading(model, id, attrs, state)

            if( continueLoading !== false )
                this.model = model

            return true

        }catch(err){
            this.onLoadFailed(err)
        }
    }

    async refreshModel(){
        await this.model?.fetchSync({data: this.loadFetchData})
        this.requestUpdate()
    }

    onLoadFailed(err){
        this.close()
        setTimeout(()=>{this.close()}, 100) // timing issue with panel possibliy opening

        if( err.handle ) // ex: UIWarningError
            throw err
        else
            console.error(err);
        return false
    }

    onClose(){
        if( this.model && this.model.get('isViewing') )
            this.model.set('isViewing', false)
        
        if( this.route )
            delete this.route.state.params[this.idAttribute]
    }

    close(){
        this.panel&&this.panel.close()
    }

    reload(){
        this.list?.reload()
    }

    finishLoading(model, id, attrs, state){

        if( this.model && this.model.get('isViewing') )
            this.model.set('isViewing', false)

        if( model && model.isInvalid ){

            if( this.closeInvalid )
                setTimeout(()=>this.close(), 300)

            throw new UIWarningError('Invalid ID: '+model.id)
        }

        let oldModel = this.model
        this.model = model
        
        if( model )
            model.set('isViewing', true)

        // NOTE: need to review performance on other machines
        // TODO: allow opt-out? - yes
        // if( this.panel?.isOpen && oldModel && model && model !== oldModel){
        //     this.panel?.pulseBack()
        // }

        // slight animation to edit panel to let user know the content changed
        // since the edit pane often looks nearly the same
        if( this.animateModelChange && this.model && this.panel?.isOpen )
            this.panel?.pulseBack()
    }

    async onRouteChange(oldState, newState, dir){
        
        // NOTE: disabling this could cause problems
        // but I think this should be removed. loadStateChange->load will take
        // care of clearing the model
        // this.model = null

        if( newState && newState.props.filters ){

            let props = newState.props

            // delay to let this.list get established
            setTimeout(()=>{
                try{
                    
                    if( !this.list ) return
                    
                    // todo: should clear props.filters
                    if( props.mergeFilters )
                        this.list.filters.update(props.filters)
                    else
                        this.list.filters.reset(props.filters)
                    
                }catch(err){}
            }, this.list?0:100)
        
        // filters found in the url query
        }else if( newState && newState.props.query?.filters){
            
            let filters = newState.props.query?.filters

            // delay to let this.list get established
            setTimeout(()=>{
                try{
                    // support clearing/resetting the filters with `filters=reset`
                    // useful if the query is failing due to applied filter
                    this.list?.filters.reset(filters=='reset'?{}:JSON.parse(atob(filters)))
                    
                }catch(err){}

            }, this.list?0:100)
        }

        if( newState && newState.props.searchTerm && this.list )
            this.list.term = newState.props.searchTerm

        if( !newState )
            return

        this.loadStateChange(newState)
    }

    loadStateChange(state){

        let attrs = state.props.attrs || {}

        this.load(state.params[this.idAttribute], attrs, state)
    }

    get route(){
        if( this.panel )
            return this.panel.route
        if( this.tabView )
            return this.tabView.route
    }

    applyListFilters(e){

        let {filters, merge} = e.detail || {}
        if( !filters ) return

        if( merge )
            this.list.filters.update(filters)
        else
            this.list.filters.reset(filters)
    }

}


export async function loadModel(coll, id, {
    fetch=true,
    fetchData={initialLoad: true},
    idAttribute= 'id'
}={}){

    let model = coll.getOrCreate({[idAttribute]:id}, {add:false})

    if( fetch !== false ){

        // TODO: support skipping fetched if model.hasFetched
        await model.fetchSync({data:fetchData})

        if( Object.keys(model.attributes).length <= 1 ){
            model.isInvalid = true
        }else{
            let m = coll.add(model, {merge: true})
            if( m && m != coll ) // support for Backbone 0.9 in v5 :\
                model = m
        }
    }

    return model
}