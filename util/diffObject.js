module.exports = function diffObject(before={}, after={}){

    let changes = {}

    // new/updated traits
    for( let k in after ){
        if( before?.[k] != after[k] ){
            changes[k] = after[k]
        }
    }

    // removed traits
    for( let k in before ){
        if( !after?.[k] && before?.[k] != after?.[k] ){
            changes[k] = null
        }
    }

    return changes
}