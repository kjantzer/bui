
function sqlStr(strings){
    return {toSqlString: _=>strings[0]}
}

// TODO: rename to makeJsonPath ?
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

function composeClauses(db, clauses){

    if( typeof clauses == 'object' )
    for( let k in clauses ){
        
        let v = clauses[k]

        if( v && v.toSqlString ){

            // format the clause
            let s = v.toSqlString(db, k)

            // return as a formatted sql string
            // mysql.format wont escape or do anthing special to the value
            clauses[k] = {
                toSqlString(){ return s },
                toJSON(){ return v.toJSON ? v.toJSON() : v.value },
                toString(){ return v.toString ? v.toString() : v.value }
            }
        }
    }

}

module.exports = {makePath, composeClauses}