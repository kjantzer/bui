/*
    # Save JSON

    Enables new save methods on models
    - `saveJSON` - generic, change opts.jsonKey as needed
    - `saveTrait` - saves to `traits`
    - `saveMeta` - saves to `meta`

    ```js
    model.saveTrait(key, val, opts)
    model.saveTrait(json)
    model.saveTrait(json, undefined, {save: false})
    model.saveJSON('traits', key, val)
    ```
*/
import {Model} from 'backbone'

// called in context of a model or provide `model`
export async function saveJSON(jsonKey, key, val, {
    // one of these required
    model,
    models,

    save=true, 
    silent=false, 
    deleteNull=true
}={}){

    models = [].concat(models||[]) // uniq array
    
    if( models.length == 0 || model )
        models.push(model || this)

    let changes = {[key]:val}

    // given an hash of changes
    if( typeof key !== 'string' && val == undefined )
        changes = key

    // save each model (may be one or many)
    for( let model of models ){

        let traits = {...model.get(jsonKey) || {}}
        
        // apply each change, deleting trait if value is "null"
        for( let k in changes ){
            let v = changes[k]

            if( v == null && deleteNull )
                delete traits[k]
            else
                traits[k] = v
        }

        if( save )
            await model.saveSync(jsonKey, traits, {patch:true, wait: true})
        else if( model.editAttr )
            model.editAttr(jsonKey, traits)
        else 
            model.set(jsonKey, traits)

        if( !silent )
            model.trigger('change', model, {traits})
    }
}


Model.prototype.saveJSON = function(jsonKey, key, val, opts){
    return saveJSON.call(this, jsonKey, key, val, opts)
}

Model.prototype.saveTrait = function(key, val, opts={}){
    return saveJSON.call(this, 'traits', key, val, opts)
}

Model.prototype.saveMeta = function(key, val, opts={}){
    return saveJSON.call(this, 'meta', key, val, opts)
}
