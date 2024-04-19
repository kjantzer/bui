import CollMap from '../../util/collmap'

export default class GroupsOfGroupedData extends CollMap {

    // TODO: rename? dont really like this name
    groupChild(key, fn){
        let coll = this.get(key)
        if( coll ){
            let group = coll.groupBy(fn)
            group.forEach(subColl=>{
                this.set(coll.pathKey+'.'+subColl.pathKey, subColl)
            })
            this.delete(key)
        }
    }

    // alows for grouping data, then alternatively grouping child groups again, but keeping one flat GroupedColl
    flatMap(fn, {keepAll=false}={}){
        let resp = []
        let i = 0
        this.forEach((coll, key)=>{
            let newColl = fn(coll, key, i++)

            let newColls = []
            if( Array.isArray(newColl) )
                newColls.push(...newColl.map(v=>[v.pathKey, v]))
            else if( newColl instanceof this.constructor )
                newColls.push(...Array.from(newColl.values()).map(v=>[coll.pathKey+'.'+v.pathKey, v]))
            else if( newColl )
                newColls.push([newColl.pathKey, newColl])

            if( keepAll ){
                resp.push([key, coll])

                // if parent did not further group, no need to add it agian (same data)
                // TODO: enable via option
                // if( newColls.length > 1 )
                    resp.push(...newColls)

            }else
                resp.push(...newColls)
        })
        return new this.constructor(Object.fromEntries(resp))
    }
}
