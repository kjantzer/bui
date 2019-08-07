

export default class TabView {
    constructor(view){
        
        // custom element - we lazy load these
        if( typeof view === 'string' ){

            this._viewName = view
            this._viewClass = customElements.get(view)

            if( this._viewClass && this._viewClass.title ){
                this.__title = this._viewClass.title
                this.__id = this.__title
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

            if( view.hasAttribute('view-id') ){
                this.__id = view.getAttribute('view-id')
            }else{
                this.__id = this.__title
                this.__view.setAttribute('view-id', this.id)
            }

            this.__view.tabView = this
            view.title = ''
        }
    }

    get active(){ return this.__active }
    set active(isActive){
        this.__active = isActive
        if( !this.__view ) return // view not created yet
        this.view.hidden = !isActive

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

    get path(){
        if( !this.__view ) return ''
        return this.view.path || this.id
    }
}