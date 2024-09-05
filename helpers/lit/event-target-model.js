/*
    # Event Target Model

    A pattern at Blackstone when using lit-html is to render 
    a collection of items as a set of controls. Buttons and actions
    are taken that need access to the model which has been set at the top
    level of the html item. This extension makes it easer to access 
    the model, top parent target, and clicked target

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

const model = {

    set: function(val){
        this.__model = val
    },
    
    get: function(){
        if(this.__model)
            return this.__model

        getEventTargetModel.call(this)
        return this.__model
    }

}

Object.defineProperty(window.MouseEvent.prototype, 'model', model)
Object.defineProperty(window.CustomEvent.prototype, 'model', model)

const modelTarget = {

    set: function(val){
        this.__modelTarget = val
    },

    get: function(){

        if(this.__modelTarget)
            return this.__modelTarget

       getEventTargetModel.call(this)
       return this.__modelTarget
    }

}

Object.defineProperty(window.MouseEvent.prototype, 'modelTarget', modelTarget)
Object.defineProperty(window.CustomEvent.prototype, 'modelTarget', modelTarget)

// try to get model by traversing up parents of target until a model is found
function getEventTargetModel(){
    
    let target = this.currentTarget
    let model = target && target.model

    this.clickTarget = target

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


const clickTarget = {

    set: function(val){
        this.__clickTarget = val
    },
    
    get: function(){
        if(this.__clickTarget)
            return this.__clickTarget

        getEventTargetModel.call(this)
        return this.__clickTarget
    }
}

Object.defineProperty(window.MouseEvent.prototype, 'clickTarget', clickTarget)
Object.defineProperty(window.CustomEvent.prototype, 'clickTarget', clickTarget)