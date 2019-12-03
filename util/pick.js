module.exports = (obj, paths)=>{
    if( !Array.isArray(paths) ) return {}
    let data = {}
    for( let k in obj ){
        if( paths.includes(k) )
            data[k] = obj[k]
    }
    return data
}