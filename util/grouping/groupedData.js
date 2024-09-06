import GroupsOfGroupedData from './groups'
import rangeOfDates from '../rangeOfDates'
import {avg} from '../math'
import {capitalize} from '../string'

// get value from a backbone model, Map object, or simple object
function get(model, key){
    return model?.get ? model.get(key) : model?.[key]
}

export default class GroupedData {
    
    constructor(models, {parent, path, name, settings, src, opts, level}={}){

        // if models is a backbone collection
        if( models.models ){
            src = models
            models = models.models
        }

        this.models = models || []

        this.path = path
        this.name = name
        this.parent = parent

        this.level = level ?? (parent ? ((parent.level||0) + 1) : 0)
        this.settings = settings || parent?.settings || src?.settings
        this.opts = opts || parent?.opts
        this.src = src || parent?.src
    }

    get label(){ 

        if(this.opts?.label )
            return this.opts?.label.call(this)
        if( this.src?.labelForGroup )
            return this.src?.labelForGroup.call(this)

        return this.name
    }

    get pathKey(){ return this.path+':'+this.name }

    get length(){ return this.models.length }
    get size(){ return this.models.length }

    sum(key, {decimals=0}={}){
        return Math.round(this.models.reduce((num, m)=>{
            return num + (get(m, key)||0)
        }, decimals))
    }

    avg(key, {decimals=0}={}){
        return avg(this.values(key), decimals)
    }

    max(key){ return this.map(m=>get(m, key)).sort().pop() }
    min(key){ return this.map(m=>get(m, key)).sort().shift() }

    forEach(){ return this.models.forEach(...arguments)}
    map(){ return this.models.map(...arguments)}
    filter(){ return this.models.filter(...arguments)}
    first(){ return this.models.at(0) }
    last(){ return this.models.at(-1) }
    at(i){ return this.models.at(i) }

    filterBy(fn){
        let filteredColl = new this.constructor(this.models.filter(fn), {
            level: this.level, // same level as group // NOTE: or should this reset to zero?
            parent: this,
            settings: this.settings,
            // path: String(fn),
            // name: key,
        }) 
        return filteredColl
    }

    values(key){ return this.models.map(m=>get(m, key)) }
    uniqueValues(key){ return Array.from(new Set(this.values(key)))}

    dateRange({unit, startDate, endDate, dateKey}){ 
        if( !endDate && this.opts.dateRangeEndDate )
            endDate = this.opts.dateRangeEndDate

        return rangeOfDates.call(this, {unit, startDate, endDate, dateKey})
    }

    byHour(){ return this.groupBy('tsHour', this.dateRange({unit: 'hour'})) }
    byDay(){ return this.groupBy('tsDay', this.dateRange({unit: 'day'})) }
    byWeek(){ return this.groupBy('tsWeek', this.dateRange({unit: 'week'})) }
    byMonth(){ return this.groupBy('tsMonth', this.dateRange({unit: 'month'})) }
    byYear(){ return this.groupBy('tsYear', this.dateRange({unit: 'year'})) }

    byTimeUnit(unit){
        let fnName = 'by'+capitalize(unit)
        return this[fnName]?.()
    }

    groupBy(fn, sequentialGroups=[]){

        // get group of models
        let groupedModels = {}

        this.models.forEach(model=>{
            let key = groupByGetter(fn)(model)
            groupedModels[key] ||= []
            groupedModels[key].push(model)
        })

        let groups = new GroupsOfGroupedData()

        // convert group of models to groups of Collections
        for( let key in groupedModels ){
            let groupColl = new this.constructor(groupedModels[key], {
                path: String(fn),
                name: key,
                parent: this,
            })
            
            groups.set(key, groupColl)
        }

        // if given a specific sequential range, use it to fill the groups
        // we do this so we can have a sequential list of data even if a data point is missing
        if( sequentialGroups.length > 0 ){
            let _sequentialGroups = new GroupsOfGroupedData()
            sequentialGroups.forEach(key=>{
                let groupColl = groups.get(key)
                if( !groupColl ){
                    groupColl = new this.constructor([], {
                        path: String(fn),
                        name: key,
                        parent: this,
                    })
                }
                _sequentialGroups.set(key, groupColl)
            })
            groups = _sequentialGroups
        }

        return groups
    }

    get(key){ return get(this.models[0], key)}

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

    groupByChain(names, opts){
        let group
        let i = 0
        for( let name of names ){

            if( !Array.isArray(name) )
                name = [name]

            if( !group )
                group = this.groupBy(...name)
            else{
                group = group.flatMap(g=>{
                    // console.log(i, g.level);
                    if( g.level < i ) return null
                    return g.groupBy(...name)
                }, opts)
            }

            i++
        }

        return group || [this]
    }

    toJSON(){
        return this.models.map(m=>m.toJSON?.()||m)
    }

    toCSV(opts){
        return this.opts?.toCSV?.call(this, opts) || this.models.map(m=>m.toCSV?.()||m.toJSON?.()||m)
    }
}


function groupByGetter(fn){
    // create default groupBy function if a string is given
    if( typeof fn == 'string'){
        let k = fn
        fn = m=>{
            // see if the model has a getter matching the key
            if( Object.getOwnPropertyDescriptor(m.constructor.prototype, k) )
                return m[k]
            else if( m[k] !== undefined )
                return m[k]
            // else use default `get()`
            else
                return get(m, k)
        }
    }
    return fn
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