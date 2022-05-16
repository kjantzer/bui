import {html} from 'lit'

export default class TabView {

    constructor(view){
        
        // custom element - we lazy load these
        if( typeof view === 'string' ){

            this._viewName = view
            this._viewClass = customElements.get(view)

            if( this._viewClass && this._viewClass.title ){
                this.__title = this._viewClass.title
                this.__options = this._viewClass.tabOptions || {}
                this.__icon = this._viewClass.icon
                this.__id = this.__title.toLowerCase().replace(/ /g, '-')
            }else{
                this.__id = this._viewName
            }

            if( this._viewClass.id )
                this.__id = this._viewClass.id

        // HTML element
        }else{
            view.hidden = true
            this.__view = view
            this.__title = view.title
            this.__icon = view.getAttribute('icon')

            if( view.hasAttribute('view-id') ){
                this.__id = view.getAttribute('view-id')
            }else{
                this.__id = this.__title.toLowerCase().replace(/ /g, '-')
                this.__view.setAttribute('view-id', this.id)
            }

            this.__view.tabView = this
            view.title = ''
        }
    }

    render(onClick){
        return this.canDisplay?html`
            <slot name="menu:before:${this.id}"></slot>
            <div class="tab-bar-item" ?active=${this.active} .tabView=${this} @click=${onClick}>
                <slot name="menu:${this.id}">${this.title}</slot>
            </div>
            <slot name="menu:after:${this.id}"></slot>
        `:''
    }

    get active(){ return this.__active }
    set active(isActive){
        let didChange = this.__active != isActive
        this.__active = isActive
        if( !this.__view ) return // view not created yet
        
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
        // lazy loading the html element view
        if( !this.__view ){
            
            if( this._viewClass ){
                this.__view = new this._viewClass()
                this.__view.tabView = this
            }else{
                this.__view = document.createElement('section')
                this.__view.innerHTML = `<b-paper color="red" border dense><b>${this._viewName}</b> is not a custom element</b-paper>`
            }

            this.__view.setAttribute('view-id', this.id)
        }
        return this.__view 
    }

    get id(){
        return this.__id
    }

    get title(){
        return this.__title || 'No Title'
    }

    get options(){
        return this.__options || {}
    }

    get icon(){ return this.__icon }

    // NOTE: rename to "route" ?
    get path(){
        if( this._viewClass ){
            return this._viewClass.path || this.id
        }else if(this.__view) {
            return this.__view.path || this.__view.getAttribute('path') || this.id
        }
    }

    get canDisplay(){
        if( !this._viewClass || this._viewClass.canDisplay === undefined ) return true
        return this._viewClass.canDisplay
    }
}