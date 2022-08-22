import { LitElement, html, css } from 'lit'
import router from '../../router'

export {LitElement, html, css}

export default class RoutedView extends LitElement {

    get idAttribute(){ 
        return (this.coll && this.coll.model.prototype.idAttribute) || 'id'
    }

    closeInvalid = true

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-rows: 1fr;
            position:relative;
            height: 100%;
            --bgd-color: var(--theme-bgd-accent2, #fff);
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
            padding: var(--view-gutter, 1em);
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
        params = Object.assign({}, route.params, params)
        return route ? route.makePath(params) : ''
    }

    shouldUpdate(){
        if( this.modelRequired !== true ) return true

        if( !this.model ) return false

        if( this.panel && !this.panel.toolbar ) 
            this.panel._linkToolbar()
            
        return true
    }

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
            this.finishLoading(this.model, id, attrs, state)
            return false
        }

        if( !id ){
            this.model = null
            this.finishLoading(this.model, id, attrs, state)
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
            this.close()
            if( err.handle )
                throw err
            else
                console.error(err);
            return false
        }
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

    finishLoading(model, id, attrs, state){

        if( this.model && this.model.get('isViewing') )
            this.model.set('isViewing', false)

        if( model && model.isInvalid ){
            throw new UIWarningError('Invalid ID: '+id)

            if( this.closeInvalid )
                this.close()
        }
        
        if( model )
            model.set('isViewing', true)
    }

    async onRouteChange(oldState, newState, dir){
        
        // NOTE: disabling this could cause problems
        // but I think this should be removed. loadStateChange->load will take
        // care of clearing the model
        // this.model = null

        if( newState && newState.props.filters && this.list )
            this.list.filters.reset(newState.props.filters)

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