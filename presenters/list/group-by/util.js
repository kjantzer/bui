import GroupedData from '../../../util/grouping/groupedData'

function applyGrouping(models, opts){
        
    let groupBy = opts?.groupBy || this.groupByView?.valuesSelected || []

    if( !groupBy.length ) return models.map(m=>{
        m.groupParent = null // clear this
        return m
    })
    
    groupBy.push('id') // always show each order

    let data = new GroupedData(models, {
        src: this,
        opts
    })
    
    data = data.groupByChain(groupBy, {keepAll: true})
    
    // flatten last level
    data = data.map(coll=>{
        if( coll.path=='id' ){
            let m = coll.first()
            m.groupParent = coll;
            return m
        }
        return coll
    })

    this.dataLevels = Math.max(...data.map(m=>m.groupParent?.level||m.level))

    data.forEach(m=>{
        
        let level = m.groupParent?.level ?? m.level
        let pathValue = m.groupParent?.pathValue || m.pathValue

        // logic to handle label sorts with sub grouped data
        m.sortLabel = pathValue.join(' / ').toLowerCase()
        m.sortLabelPartial = m.sortLabel

        if( level == this.dataLevels )
            m.sortLabelPartial = pathValue.slice(0,-1).join(' / ').toLowerCase()+' / '+level
        else
            m.sortLabelPartial += ' / '+level

        m.searchLabels = {
            label: pathValue.join(' / ') // full label ("name / of / path")
        }

        // also add each path value/label separately
        Array.from({length: this.dataLevels}).forEach((v,i)=>{
            m.searchLabels['label_'+i] = pathValue[i]||''
        })
    })

    return data
}

export {applyGrouping}