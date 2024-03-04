module.exports = (obj, paths, {omit=false, ifEmpty=undefined, keepUndefined=false}={})=>{
    
    let data = {}
    let remap = null

    // allow for paths to be {incomingKey: outGoingKey}
    if( typeof paths == 'object' && !Array.isArray(paths) ){
        remap = paths
        paths = Object.keys(paths)
    }

    if( !Array.isArray(paths) ) return data

    // use order of "paths"
    if( !omit )
        for( let k of paths ){

            let fromKey = k
            let toKey = k

            if( Array.isArray(k) ){
                fromKey = k[0]
                toKey = k[1] || k[0]
            }else if( remap ){
                toKey = remap[k] || k
            }

            if( obj[fromKey] !== undefined || keepUndefined )
                data[toKey] = obj[fromKey]

        }
    // different logic if ommiting
    else
        for( let k in obj ){
            if( paths.includes(k) == !omit )
                data[k] = obj[k]
        }
    
    if( ifEmpty !== undefined && Object.keys(data).length == 0 )
        return ifEmpty

    return data
}