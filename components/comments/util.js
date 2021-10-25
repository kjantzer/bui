const groupBy = require('../../util/array.groupBy')

function summarize(data){
    
    data = groupBy.call(data, 'gid', {forceArray: true})

    for( let k in data ){
        let models = data[k]
        let summary = {
            total: models.length, 
            unresolved: 0,
            unread: 0,
            newest: models[models.length-1].ts_created
        }
        
        models.forEach(model=>{
            if( !model.meta || !model.meta.resolved )
                summary.unresolved++
            if( !model.ts_read )
                summary.unread++
        })

        data[k] = summary
    }

    return data
}

module.exports = {summarize}