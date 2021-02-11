
if( !Object.prototype.fromEntries )
Object.prototype.fromEntries = function(entries){
    let o = {}
    for( let [key,val] of entries ){
        o[key] = val
    }
    return o
}