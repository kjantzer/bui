
function makePath(path, db){
    
    // escape each part of the path 
    // `$.some.path` => `$."some"."path"
    path = path.split('.').map(p=>{
        if( p == '$' ) return '$'

        p = db.escape(p)
        p = p.replace(/^'/, `"`).replace(/'$/, `"`)
        return p
    })

    // all paths must start from `$` (to my knowledge)
    if( path[0] != '$' )
        path.unshift('$')

    return path.join('.')
}

module.exports = {makePath}