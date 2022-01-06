/*
    Related Models
*/

function setup(Model){

    // Model given is an instance (constructor would return as "function")
    if( typeof Model == 'object' )
        Model = Model.constructor
        
    if( !Model.related ) return
    if( Model.__relatedSetup ) return

    Model.__relatedSetup = true
    
    for( let prop in Model.related ){
        let opts = Model.related[prop]

        let RelatedModel = opts.model || opts

        assign(Model, RelatedModel, prop, opts)
    }
}

function assign(Model, RelatedModel, prop, {
    id=null, // use prop value
    relatedID='id',
    getAttrs=null
}={}){

    let __prop = '__'+prop

    Object.defineProperty(Model.prototype, prop, {
        get: function(){
            
            if( !this[__prop] ) {
                
                if( typeof RelatedModel == 'string' ){
                    try{
                        RelatedModel = require(RelatedModel)
                    }catch(err){
                        console.log(err);
                        throw new Error('Cannot import related model: '+RelatedModel)
                    }
                }
                
                // assume if related ID is not standard `id`, 
                // that is references this models ID
                if( !id )
                    id = relatedID == 'id' ? prop : 'id'

                let attrs = {
                    [relatedID]: this.attrs[id] || this[id]
                }

                if( getAttrs && typeof getAttrs == 'function' )
                    attrs = getAttrs.call(this)

                this[__prop] = new RelatedModel(attrs, this.req)
            }

            return this[__prop]
        }
    });
}

module.exports = {setup, assign}
