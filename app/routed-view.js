import { LitElement, html, css } from 'lit-element'
import router from '../router'

export default class RoutedView extends LitElement {

    get idAttribute(){ return 'id'}

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-rows: 1fr;
            position:relative;
            height: 100%;
            --bgd-color: var(--theme-bgd-accent2, #fff);
            --border-color: rgba(var(--theme-text-rgb, 0,0,0), .05);
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

    updated(){
        this.toggleAttribute('in-panel', !!this.panel)
    }

    async load(id, attrs={}, state){

        if( !id ){
            this.model = null
            this.finishLoading(id, attrs, state)
            return false
        }

        let coll = this.coll

        if( !coll ) return true

        if( id === 'create' ){
            this.model = new coll.model(attrs)
            this.model.collection = coll
            return
        }

        let model = coll.getOrCreate({[this.idAttribute]:id}, {add:false})

        try{
            if( this.fetchOnLoad !== false ){

                await model.fetchSync({data:{initialLoad:true}})

                if( Object.keys(model.attributes).length <= 1 ){
                    model.isInvalid = true
                }else{
                    let m = coll.add(model, {merge: true})
                    if( m != coll ) // support for Backbone 0.9 in v5 :\
                        model = m
                }
            }

            this.model = model

            this.finishLoading(id, attrs, state)

            return true

        }catch(err){
            console.error(err);
            this.close()
            return false
        }
    }

    close(){
        this.panel&&this.panel.close()
    }

    finishLoading(){
        // optional
    }

    async onOpen(state){

        // NOTE: disabling this could cause problems
        // but I think this should be removed. loadStateChange->load will take
        // care of clearing the model
        // this.model = null

        if( state && state.props.filters && this.list )
            this.list.filters.reset(state.props.filters) // TODO: support `update` instead of reset?

        this.loadStateChange(state)
    }

    async onRouteChange(oldState, newState, dir){
        // this.model = null

        if( newState && newState.props.filters && this.list )
            this.list.filters.reset(newState.props.filters)

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