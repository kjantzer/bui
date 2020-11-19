module.exports = (obj, paths, {omit=false}={})=>{
    if( !Array.isArray(paths) ) return {}
    let data = {}
    for( let k in obj ){
        if( paths.includes(k) == !omit )
            data[k] = obj[k]
    }
    return data
}