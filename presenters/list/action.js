/*
    Base class for taking "action" on a model or set of models
*/
import Dialog from '../dialog'
import Menu from '../menu'

export {Dialog, Menu}

export default class Action {

    static icon = ''

    // NOTE: getter so subclassing can change and default saveModels read it
    get sequentialSave(){ return false } // should wait for model to save before saving next?

    // override in subclass
    async do(){
        // nothing by default
        // this.saveModels()
        return false
    }

    // for use as inline click handler: `@click=${Action.clickHandler()}`
    // assumes within context of element with `.list` (b-list) or an element with a `.model`
    static clickHandler(opts={}){
        let Action = this

        return function(e){
            let model = this.list?.selection.isOn ? this.list.currentModels : this.model
            return new Action(this, e, model, opts)
        }
    }

    constructor(context, target, models, opts={}){

        models = Array.isArray(models) ? models : [models]
        let model = models[0]

        if( target instanceof Event )
            target.stopPropagation()

        if( !model )
            throw new UIWarningError('No rows selected', {target})

        this.context = context
        this.target = target
        this.models = models
        this.model = model
        this.opts = opts

        return this.do(opts)
    }

    async saveModels(fn){

        this.spin = true

        try{
            // save one model at a time
            if( this.sequentialSave ){
                for( let i in this.models ){
                    let m = this.models[i]
                    await fn(m, parseInt(i))
                }
            // trigger saving them all at once
            }else{
                await Promise.all(this.models.map((m,i)=>fn(m, i)))
            }
        }finally{
            this.spin = false
        }

        return true
    }

    set spin(val){
        if( this.target instanceof Event ){
            // TODO:
            console.log('create spinner');
        }else{
            this.target.spin = val;
        }
    }
}