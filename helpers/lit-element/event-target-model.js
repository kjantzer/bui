/*
    A pattern at Blackstone when using lit-html is to render 
    a collection of items as a set of controls. Buttons and actions
    are taken that need access to the model which has been set at the top
    level of the html item. This extension makes it easer to access 
    the model and top parent target

    ex:
    ```js
    html`<div class="item" .model=${m}>
        <p>stuff here</p>
        <b-btn @click=${this.takeAction}></b-btn>
    </div>`

    takeAction(e){
        let model = e.model
        let target = e.modelTarget // => `.item`
    }
    ```
*/
Object.defineProperty(window.MouseEvent.prototype, 'model', {

    set: function(val){
        this.__model = val
    },
    
    get: function(){
        if(this.__model)
            return this.__model

        getEventTargetModel.call(this)
        return this.__model
    }

})

Object.defineProperty(window.MouseEvent.prototype, 'modelTarget', {

    set: function(val){
        this.__modelTarget = val
    },

    get: function(){

        if(this.__modelTarget)
            return this.__modelTarget

       getEventTargetModel.call(this)
       return this.__modelTarget
    }

})

// try to get model by traversing up parents of target until a model is found
function getEventTargetModel(){
    
    let target = this.currentTarget
    let model = target && target.model

    while(target&&!model){
        target = target.parentElement
        model = target&&target.model
    }

    if( model ){
        this.modelTarget = target
        this.model = model
    }

    return model
}