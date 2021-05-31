module.exports = (obj, paths, {omit=false}={})=>{
    if( !Array.isArray(paths) ) return {}
    let data = {}

    // use order of "paths"
    if( !omit )
        for( let k of paths ){
            if( obj[k] !== undefined )
                data[k] = obj[k]
        }
    // different logic if ommiting
    else
        for( let k in obj ){
            if( paths.includes(k) == !omit )
                data[k] = obj[k]
        }
    return data
}