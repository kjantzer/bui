/*
    # Grouped Data [DEPRECATED]

    Provides a structure for grouping and calculating data
    - grouped data can be grouped further
    - the chain is maintained and provides pathName and pathValue for knowing level

    ```js
    let rawData = [{type: 'art', qty: 1}, {type: 'art', qty: 2}, {type: 'text', qty: 3}]
    let data = new GroupedData(null, null, rawData)

    data.total('qty') = 6
    data.groupBy('type').map(d=>d.total('qty')) // 3, 3
    ```

    > DEPRECATED - use `util/grouping` instead
*/
import {round} from './math'
import uniq from './uniq'

export default class GroupedData {

     constructor(path, name, models){
        this.path = path
        this.name = name
        this.models = models
    }

    get label(){
        return this.name
    }

    get pathValue(){
        let parent = this
        let labels = []
        while(parent&&parent.label){
            labels.unshift(parent.label)
            parent = parent.parent
        }
        return labels
    }

    get pathName(){
        let parent = this
        let path = []
        while(parent&&parent.path){
            path.unshift(parent.path)
            parent = parent.parent
        }
        return path
    }

    groupBy(name, cb){
        
        if( !cb )
            cb = d=>d[name]?.toLowerCase?.()

        let key = name+'_'+cb.toString()

        // cache data - NOTE: confirm this wont cause problems
        this._groups = this._groups || {}
        if( this._groups[key] ) return this._groups[key]

        let groups = groupBy(name, this.models, cb, this.constructor)
        groups.forEach(group=>{
            group.parent = this
            group.level = (this.level||0) + 1
        })
        
        return this._groups[name] = groups
    }

    // apply a series of groupBy, returning a flattened array
    groupByChain(...names){
        let group
        for( let name of names ){

            if( !Array.isArray(name) )
                name = [name]

            if( !group )
                group = this.groupBy(...name)
            else
                group = group.flatMap(g=>g.groupBy(...name))
        }

        return group || [this]
    }

    get length(){ return this.models.length }
    map(cb){ return this.models.map(cb) }
    flatMap(cb){ return this.models.flatMap(cb) }
    forEach(cb){ return this.models.forEach(cb) }
    filter(cb){ return this.models.filter(cb) }

    filterBy(name, cb){
        if( !cb )
            cb = d=>d[name]
        else if( typeof cb == 'string' ){
            let v = cb.toLowerCase()
            cb = d=>d[name]?.toLowerCase?.()==v
        }else if( Array.isArray(cb) ){
            let v = cb.map(v=>v.toLowerCase?.())
            cb = d=>v.includes(d[name])
        }

        let key = name+'_'+cb.toString()

        // cache data - NOTE: confirm this wont cause problems
        this._groups = this._groups || {}
        if( this._groups[key] ) return this._groups[key]

        let group = new this.constructor('subset', name, this.filter(cb))
        group.parent = this

        return this._groups[name] = group
    }

    total(key, {decimals=0}={}){
        return round(this.models.sum(d=>d[key]||0), decimals)
    }

    max(key){
        return this.map(m=>m[key]).sort().pop()
    }

    // gets value by looking at first model
    get(key){
        return this.models[0]?.[key]
    }

    values(key, {dedupe=true}={}){
        let vals = this.map(d=>d[key].toLowerCase())

        vals = vals.filter(d=>d!==undefined)

        if( dedupe ) vals = uniq(vals)

        return vals
    }
}

function groupBy(name, models, cb, Class){
    let byGroup = {}
    models.forEach(m=>{
        let val = cb(m)

        if( !Array.isArray(val) )
            val = [val]
        
        // support overlapping groups
        val.forEach(v=>{
            byGroup[v] = byGroup[v] || []
            byGroup[v].push(m)
        })
    })
    let groups = []
    for( let key in byGroup){
        groups.push(new Class(name, key, byGroup[key]))
    }
    return groups
}