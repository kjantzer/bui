
module.exports = function groupBy(key, {
    forceArray=false,
    deleteKeyedValue=false
}={}){
    let group = {}
    this.forEach(row=>{
        
        let rowKey = typeof key == 'function' ? String(key(row)) : row[key]

        if( rowKey ){

            if( deleteKeyedValue )
                delete row[key]

            if( forceArray && !group[rowKey] )
                group[rowKey] = []

            // exists with one row...convert to array of rows
            if( group[rowKey] && group[rowKey][key] )
                group[rowKey] = [group[rowKey]]

            // already set, must be array of rows
            if( group[rowKey] )
                group[rowKey].push(row)
            // single row so far
            else
                group[rowKey] = row
        }
    })
    return group
}