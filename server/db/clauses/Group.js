const Clause = require('./Clause')

module.exports = class Group extends Map {

    constructor(clauses, operator='AND'){
        super()
        
        this.operator = operator

        for( let key in clauses ){
            this.set(key, clauses[key])
        }
    }

    set(key, val){
        if( val === undefined )
            val = key

        return super.set(key, val)
    }

    toSqlString(db){

        let clauses = []
        let values = []

        this.forEach((val, key)=>{

            if( key.toSqlString ){
                key = key.toSqlString()

            // NOTE: this might create issues in existing code
            }else if( key[0] != '`' ){
                key = db.escapeId(key)
            }

            if( val instanceof Clause )
                clauses.push(val.toSqlString(db, key))

            else if( val instanceof Group ){

                let [clause, clauseValues] = val.toSqlString(db)
                clauses.push(clause)
                values.push(...clauseValues)

            }else if( ['NULL', 'NOT NULL', 'null', 'not null', null].includes(val) ){
                clauses.push(`${key} IS ${val}`)

            }else if( ['IS NULL', 'IS NOT NULL', 'is null', 'is not null'].includes(val) ){
                clauses.push(`${key} ${val}`)
                
            }else{

                let oper = '='

                // TODO: do we really want to support this? or should a defined "clause" be used instead?
                // changing would break old code
                if( typeof val == 'string' ){
                    let [str, customOper, _val] = val.match(/((?:(?:!=)|(?:[><]=?)) )?(.+)/)
                    oper = customOper || oper
                    val = _val 
                }

                if( Array.isArray(val) )
                    if( val.length == 0 )
                        clauses.push(`${key} IS NULL`)
                    else
                        clauses.push(`${key} IN(${db.escape(val)})`)
                else
                    clauses.push(`${key} ${oper} ${db.escape(val)}`)

                // values.push(val)
            }
        })

        let clause = clauses.length > 0 ? `(${clauses.join(' '+this.operator+' ')})` : ''

        return [clause, values]
    }

   
}