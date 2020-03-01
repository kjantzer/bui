module.exports = (obj, whitelist)=>{
    let data = {}
    whitelist.forEach(key=>{
        if( obj[key] != undefined )
            data[key] = obj[key]
    })
    return data
}