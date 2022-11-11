module.exports = (obj, paths, {omit=false}={})=>{
    if( !Array.isArray(paths) ) return {}
    let data = {}

    // use order of "paths"
    if( !omit )
        for( let k of paths ){

            let fromKey = k
            let toKey = k

            if( Array.isArray(k) ){
                fromKey = k[0]
                toKey = k[1] || k[0]
            }

            if( obj[fromKey] !== undefined )
                data[toKey] = obj[fromKey]
        }
    // different logic if ommiting
    else
        for( let k in obj ){
            if( paths.includes(k) == !omit )
                data[k] = obj[k]
        }
    return data
}