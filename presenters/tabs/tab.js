import {html} from 'lit'

export default class TabView {

    // `view` should be a string name of custom element or a real element
    constructor(view){
        
        // custom element - we lazy load these
        if( typeof view === 'string' ){

            this._viewName = view
            this._viewClass = customElements.get(view)

            if( !this._viewClass )
                console.warn('Could not find tabview:', view)

        // HTML element
        }else{
            view.hidden = true // set all views as hidden on initial load
            this._view = this.__view = view // this.__view for backwards compat
            this._view.tabView = this

            // element instance is a custom element, so capture the constructor too
            let viewName = view.tagName.toLowerCase()
            this._viewClass = customElements.get(viewName)
            if( this._viewClass )
                this._viewName = viewName

            if( view.title && !view.getAttribute('tab-title') ){
                view.setAttribute('tab-title', view.title)
                view.title = '' // clear title attribute so hover doesn't show tooltip
            }
        }
    }

    get title(){ return this._viewClass?.title || this._view?.getAttribute('tab-title') }
    get icon(){ return this._viewClass?.icon || this._view?.getAttribute('icon') }
    get toolbarTitle(){ return this._viewClass?.toolbarTitle || this._view?.getAttribute('toolbar-title') || this.title }

    get id(){ 
        // prefer officialy set IDs
        return this._viewClass?.id
        || this._view?.getAttribute('tab-id')
        // fallback to the title
        || this.title?.toLowerCase().replace(/ /g, '-')
        // then icon or tag name
        || this.icon
        || this._viewName
        || this._view?.tagName.toLowerCase()
    }

    // not sure why this was ever introduced
    get options(){
        return this._viewClass?.tabOptions || {}
    }

    // NOTE: rename to "route" ?
    get path(){
        return this._viewClass?.path || this._view?.path || this._view?.getAttribute('path') || this.id
    }

    // rename?
    render(onClick){

        if( !this.canDisplay ) return ''

        // TODO: no sure I want to support this
        let renderFn = this._view?.constructor.tabViewBtn || this._viewClass?.tabViewBtn

        if( renderFn )
            return renderFn(this, onClick)

        return html`
            <slot name="menu:before:${this.id}"></slot>
            <div class="tab-bar-item" ?active=${this.active} .tabView=${this} @click=${onClick}>
                <slot name="menu:${this.id}">
                    <b-icon name=${this.icon}></b-icon>
                    ${this.title||(this.icon?'':(this.id||'[unnamed]'))}
                </slot>
            </div>
            <slot name="menu:after:${this.id}"></slot>
        `
    }

    set model(model){
        // if view is created and NOT hidden
        // NOTE: generally that means this view is "active", but special cases may have multiple
        // tab views visible
        if( this._view && !this.view.hidden )
            this.view.model = model
    }

    get active(){ return this.__active }
    set active(isActive){
        let didChange = this.__active != isActive
        this.__active = isActive
        if( !this._view ) return // view not created yet
        
        if( !didChange )
            didChange = this.view.hidden == isActive

        this.view.hidden = !isActive

        if( !didChange ) return

        if( isActive )
            this.view.didBecomeActive&&this.view.didBecomeActive()
        else
            this.view.didBecomeInactive&&this.view.didBecomeInactive()
    }

    get view(){

        // NOTE: should this return '' if !canDisplay?

        // lazy loading the html element view
        if( !this._view ){
            
            if( this._viewClass ){
                this._view = new this._viewClass()
                this._view.tabView = this
            }else{
                this._view = document.createElement('section')
                this._view.innerHTML = `<b-paper color="red" border dense><b>${this._viewName}</b> is not a custom element</b-paper>`
            }
        }

        this._view.setAttribute('tab-id', this.id)
        this._view.setAttribute('view-id', this.id) // DEPRECATED

        return this._view 
    }

    get canDisplay(){
        return this._viewClass?.canDisplay ?? true
        // if( !this._viewClass || this._viewClass.canDisplay === undefined ) return true
        // return this._viewClass.canDisplay
    }
}