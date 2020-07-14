require('../util/promise.series')

let db

const defaultConfig = {
    idAttribute: 'id'
}

module.exports = class Model {

    static setDB(_db){ db = _db }

// methods to override in subclass

    findWhere(where){
        // add or manipulate the where clause
    }

    findSql(where){

        if( !this.config.table ) throw Error('missing config.table')
        
        return /*sql*/`SELECT * 
                        FROM ${this.config.table} ${this.config.tableAlias||''}
                        ${where}
                        ${this.findOrderBy()}
                        ${this.findLimit}`
    }

    get findLimit(){
        if( this.req && this.req.query.perPage )
            return `LIMIT ${this.req.query.pageAt},${this.req.query.perPage}`
            
        return ''
    }

    // TODO: flesh this out with default usign this.config?
    findOrderBy(){
        return ''
    }

    findParseRow(row){
        this.decodeJsonFields(row)
        return row
    }

    validateUpdate(attrs){
        this.encodeJsonFields(attrs)
        return attrs
    }

    async beforeAdd(attrs){ /* noop */ }
    afterAdd(attrs){ /* noop */ }

    async beforeUpdate(attrs){ /* noop */ }
    afterUpdate(attrs){ /* noop */ }

    async beforeDestroy(){ /* noop */ }
    afterDestroy(){ /* noop */ }

// =================================================
    
    constructor(attrs, req, opts={}){

        if( !db )
            console.warn('Model: `db` has not been set yet')
            
        this.db = db
        this.req = req
        this.attrs = attrs || {}
        this.opts = opts

        for(let key in attrs){
            this[key] = attrs[key]
        }
    }

    get config(){ return {} }

    get id(){ return this.__id || this.attrs[this.idAttribute] }
    set id(id){ this.__id = id }
    
    get idAttribute(){ return this.config.idAttribute || defaultConfig.idAttribute }
    get tableAlias(){ return this.config.tableAlias || this.config.table }

    get isInvalid(){
        return this.attrs === undefined
    }

    toJSON(){
        return this.attrs||{}
    }

    get filters(){
        try {
            return this.req.query.filters ? JSON.parse(this.req.query.filters) : {}
        }catch(err){
            console.log('Malformed filters:', this.req.query.filters);
            return {}
        }
    }

    get sorts(){    
        try{
            let sorts = this.req.query.sorts ? JSON.parse(this.req.query.sorts) : {}
            return new Map(Object.entries(sorts));
        }catch(err){
            console.log('Malformed sorts:', this.req.query.sorts);
            return new Map()
        }
    }

    // NOTE: does't appear to be used anywhere....
    orderBy(fn){
        let sorts = this.sorts
        let orderBy = []
        for(let key in sorts ){
            
            let sortOpts = sorts[key]
            let desc = sortOpts.desc ? 'DESC' : 'ASC'

            if( !fn || fn(key, sortOpts) === undefined )
                orderBy.push(`${this.db.escape(key)} ${desc}`)
        }

        return orderBy.length > 0 ? 'ORDER BY '+orderBy.join(', ') : ''
    }

// =================================================
//  Deafult CRUD method implementations

    encodeJsonFields(attrs){
        if( this.config.jsonFields && Array.isArray(this.config.jsonFields) ){
            this.config.jsonFields.forEach(fieldName=>{
                if( attrs[fieldName] != undefined )
                    attrs[fieldName] = attrs[fieldName] ? JSON.stringify(attrs[fieldName]) : null
            })
        }
    }
    
    decodeJsonFields(attrs){
        if( this.config.jsonFields && Array.isArray(this.config.jsonFields) ){
            this.config.jsonFields.forEach(fieldName=>{
                
                if( attrs[fieldName] == undefined ) return

                try{
                    attrs[fieldName] = attrs[fieldName] ? JSON.parse(attrs[fieldName]) : []
                }catch(err){
                    attrs[fieldName] = {}
                }
            })
        }
    }

    async find(where=null){

        let id = null;

        // make sure "id" is prefixed with correct table name/alias
        if( where && where[this.idAttribute] ){
            id = where[this.idAttribute]
            delete where[this.idAttribute]
            where[this.tableAlias+'.'+this.idAttribute] = id
        
        }else if( where && where[this.tableAlias+'.'+this.idAttribute] ){
            id = where[this.tableAlias+'.'+this.idAttribute]

        // if no special WHERE given, default to querying for this model
        }else if( !where && this.id ) {
            where = {}
            id = this.id
            where[this.tableAlias+'.'+this.idAttribute] = this.id
        }

        where = where || {}

        // let subclassed model apply more to where clause
        await this.findWhere(where)

        let [whereFields, whereVals] = this.db.parseWhere(where)
        where = whereFields.length > 0 ? `WHERE ${whereFields.join(' AND ')}` : ''

        let resp = await this.db.query(this.findSql(where), whereVals)

        // parse each row (for decoding JSON strings, etc)
        await Promise.series(resp, row=>{
            return this.findParseRow(row)
        })

        // might need to activate this if too  many conflicts
        let convertToObject = true//this.config.resultsAsObject == true
        let ClassObj = Object.getPrototypeOf(this).constructor
        
        if( id && id == this.id ){
            this.attrs = resp[0]
            return this
        }else if( id ){
            if( convertToObject )
                return new ClassObj(resp[0], this.req)
            else
                return resp[0]
        }

        // convert each row to a class object
        if( convertToObject )
            resp = resp.map(attrs=>new ClassObj(attrs, this.req))

        return resp;
    }

    async add(attrs={}){

        if( !this.config.table ) throw Error('missing config.table')

        if( !attrs || Object.keys(attrs).length == 0 )
            return false;

        this.encodeJsonFields(attrs)
        await this.beforeAdd(attrs)

        let result = await this.db.q(/*sql*/`INSERT INTO ${this.config.table} 
                                        SET ? ${this.db.updateOnDuplicate(attrs)}`, attrs)
        
        if( !result.insertId && !result.affectedRows )
            throw Error('failed to insert')

        this.id = result.insertId || this.id

        this.afterAdd&&this.afterAdd(attrs)

        return await this.find()
    }

    async update(attrs={}){

        // let subclass remove or modify attributes to be updated
        attrs = await this.validateUpdate(attrs)
        await this.beforeUpdate(attrs)

        if( !this.config.table ) throw Error('missing config.table')

        if( !this.id || !attrs || Object.keys(attrs).length == 0 )
            return false;

        let result = await this.db.q(/*sql*/`UPDATE ${this.config.table} SET ? WHERE ?`, [attrs, {id:this.id}])

        if( result.affectedRows > 0 ){
            
            this.decodeJsonFields(attrs)

            this.afterUpdate(attrs)

            if( this.id )
                this.attrs = Object.assign(this.attrs||{}, attrs)

            return attrs
        }
        
        return false
    }

    async destroy(){

        if( !this.config.table ) throw Error('missing config.table')
        if( !this.id ) throw Error('missing id')

        await this.find()
        
        if( this.isInvalid ) throw Error('not found')

        await this.beforeDestroy()

        let result = await this.db.q(/*sql*/`DELETE FROM ${this.config.table} WHERE id = ?`, this.id)

        this.afterDestroy(result)

        return String(result.affectedRows)
    }
}
