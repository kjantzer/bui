/*
    # Array.GroupBy

    ```js
    import groupBy from 'bui/util/array.groupBy'
    groupBy.call(someArray, opts)
    ```
    
    #### Opts
    - `forceArray` (false) - each grouped set will always ben an array
    - `deleteKeyedValue`
    - `returnAsArray` - instead of by key that was grouped by
*/
module.exports = function groupBy(key, {
    forceArray=false,
    deleteKeyedValue=false,
    returnAsArray=false
}={}){
    let group = {}
    this.forEach(row=>{
        
        let rowKey = !key ? row : typeof key == 'function' ? String(key(row)) : row[key]

        if( rowKey !== undefined ){ // NOTE: should I allow undefined?

            if( deleteKeyedValue )
                delete row[key]

            if( forceArray && !group[rowKey] )
                group[rowKey] = []

            // exists with one row...convert to array of rows
            if( group[rowKey] && !Array.isArray(group[rowKey]) )
                group[rowKey] = [group[rowKey]]

            // already set, must be array of rows
            if( group[rowKey] )
                group[rowKey].push(row)
            // single row so far
            else
                group[rowKey] = row
        }
    })
    return returnAsArray ? Object.values(group) : group
}