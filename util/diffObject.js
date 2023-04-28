module.exports = function diffObject(before={}, after={}, {includeChanged=true,includeRemoved=true}={}){

    let changes = {}

    // new/updated traits
    if( includeChanged )
    for( let k in after ){
        if( before?.[k] != after[k] ){
            changes[k] = after[k]
        }
    }

    // removed traits
    if( includeRemoved )
    for( let k in before ){
        if( !after?.[k] && before?.[k] != after?.[k] ){
            changes[k] = null
        }
    }

    return changes
}