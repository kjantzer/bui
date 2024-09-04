/*
    # diffObject

    Get the differences betwen two objects

    ```js
    diffObject(before, after, {
        includeChanged=true,
        includeRemoved=true,
        returnBefore=false
    })
    ```
*/
module.exports = function diffObject(before={}, after={}, {
    includeChanged=true, 
    includeRemoved=true, 
    returnBefore=false
}={}){

    let changes = {}
    let changesBefore = {}

    // new/updated traits
    if( includeChanged )
    for( let k in after ){
        if( before?.[k] != after[k] ){
            changes[k] = after[k]
            
            if( before?.[k])
                changesBefore[k] = before[k]
        }
    }

    // removed traits
    if( includeRemoved )
    for( let k in before ){
        if( !after?.[k] && before?.[k] != after?.[k] ){
            changes[k] = null
            changesBefore[k] = before[k]
        }
    }

    if( returnBefore )
        return {changes, changesBefore}
        
    return changes
}