const related = require('./related')
require('../util/promise.series')

const defaultConfig = {
    idAttribute: 'id'
}

// const TempTablesCache = {}

module.exports = class Model {

    // DEPRECATED
    static setDB(_db){ Model.db = _db }
    
    get db(){ return this.__db || this.constructor.db }
    set db(db){ this.__db = db }

// methods to override in subclass

    findWhere(where, opts){
        // add or manipulate the where clause
    }

    findJoins(opts){ return '' }

    findSql(where, {select="*", join='', limit=null}={}){

        if( !this.config.table ) throw Error('missing config.table')

        return /*sql*/`SELECT ${select} 
                        FROM ${this.config.table} ${this.config.tableAlias||''}
                        ${join||''}
                        ${where}
                        ${this.findGroupBy()}
                        ${this.findOrderBy()}
                        ${this._findLimit(limit)}`
    }

    // DEPRECATED - delete and rename _findLimit to findLimit
    get findLimit(){ return this._findLimit()}

    _findLimit(limit){

        if( limit )
            return `LIMIT ${limit}`

        if( this.req && this.req.query.perPage )
            return `LIMIT ${this.req.query.pageAt},${this.req.query.perPage}`
            
        return this.config.limit ? `LIMIT ${this.config.limit}` : ''
    }
    
    findOrderBy(){
        let orderBy = this.config.orderBy
        return  orderBy ? `ORDER BY ${orderBy}` : ''
    }

    findGroupBy(){
        let groupBy = this.config.groupBy
        return  groupBy ? `GROUP BY ${groupBy}` : ''
    }

    findParseRow(row, index, resultCount, resp){
        return row
    }

    validateUpdate(attrs){
        this.encodeFields(attrs)
        return attrs
    }

    async beforeAdd(attrs){ /* noop */ }
    afterAdd(attrs, beforeAddResp){ /* noop */ }

    async beforeUpdate(attrs, where){ /* noop */ }
    afterUpdate(attrs, beforeUpdateResp){ /* noop */ }

    async beforeDestroy(where){ /* noop */ }
    afterDestroy(){ /* noop */ }

// =================================================
    
    constructor(attrs, req, opts={}){

        related.setup(this)

        if( !this.db )
            console.warn('Model.db has not been set yet')
        
        this.req = req || {query:{}}
        this.attrs = attrs || {}
        this.opts = opts

        for(let key in attrs){
            try{
                this[key] = attrs[key]
            }catch(err){}
        }

        if( attrs )
            this.decodeFields(attrs)
    }

    get(attr){
        return this.attrs?.[attr]
    }

    get config(){ return {} }

    get id(){ return this.__id || this.attrs[this.idAttribute] }
    set id(id){ this.attrs[this.idAttribute] = this.__id = id }
    get isSingular(){ return this.id && !Array.isArray(this.id) }
    
    get idAttribute(){ return this.config.idAttribute || defaultConfig.idAttribute }
    get tableAlias(){ return this.config.tableAlias || this.config.table }

    get isInvalid(){
        return this.attrs === undefined
    }

    toJSON(){
        return Object.assign({}, this.attrs||{})
    }

    get filters(){
        try {
            let filters = this.req.query.filters

            if( filters && typeof filters == 'string')
                return JSON.parse(filters)
            else if( filters )
                return filters
            else
                return {}
        }catch(err){
            console.log('Malformed filters:', this.req.query.filters);
            return {}
        }
    }

    get sorts(){    
        try{
            let sorts = this.req.query.sorts 
            if( typeof sorts == 'string' )
                sorts = JSON.parse(this.req.query.sorts)

            return new Map(Object.entries(sorts||{}));
        }catch(err){
            console.log('Malformed sorts:', this.req.query.sorts);
            return new Map()
        }
    }

    // NOTE: does't appear to be used anywhere....
    // but seems useful...not sure reason for fn?
    orderBy(fn){
        let sorts = this.sorts
        let orderBy = []

        sorts.forEach((sortOpts,key)=>{
        // for(let key in sorts ){
            
            // let sortOpts = sorts[key]
            let desc = sortOpts.desc && sortOpts.desc != 'false' ? 'DESC' : 'ASC'

            if( !fn || fn(key, sortOpts) === undefined )
                orderBy.push(`${this.db.escapeId(key)} ${desc}`)
        // }
        })

        return orderBy.length > 0 ? 'ORDER BY '+orderBy.join(', ') : ''
    }

// =================================================
//  Deafult CRUD method implementations

    encodeFields(attrs){
        this.encodeJsonFields(attrs)
        this.encodeCsvFields(attrs)
        this.encodeNullFields(attrs)
    }
    
    decodeFields(attrs){
        this.decodeJsonFields(attrs)
        this.decodeCsvFields(attrs)
    }

    encodeNullFields(attrs){
        if( this.config.nullFields && Array.isArray(this.config.nullFields) ){
            this.config.nullFields.forEach(fieldName=>{
                if( attrs[fieldName] != undefined && !attrs[fieldName] )
                    attrs[fieldName] = null
            })
        }
    }

    encodeCsvFields(attrs){
        if( this.config.csvFields && Array.isArray(this.config.csvFields) ){
            this.config.csvFields.forEach(fieldName=>{
                if( attrs[fieldName] != undefined )
                    attrs[fieldName] = attrs[fieldName] ? attrs[fieldName].join(',') : null
            })
        }
    }

    decodeCsvFields(attrs){
        if( this.config.csvFields && Array.isArray(this.config.csvFields) ){
            this.config.csvFields.forEach(fieldName=>{
                
                if( attrs[fieldName] == undefined ) return

                if( attrs[fieldName] && typeof attrs[fieldName] == 'string' )
                    attrs[fieldName] = attrs[fieldName].split(',')
                else if( !attrs[fieldName] )
                    attrs[fieldName] = []
            })
        }
    }

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
                    if( attrs[fieldName] && typeof attrs[fieldName] == 'string' )
                        attrs[fieldName] = JSON.parse(attrs[fieldName])
                    else
                        attrs[fieldName] = attrs[fieldName] || []
                }catch(err){
                    attrs[fieldName] = {}
                }
            })
        }
    }

    findWhereID(where, id){
        // make sure "id" is prefixed with correct table name/alias
        if( where && where[this.idAttribute] ){
            id = where[this.idAttribute]
            delete where[this.idAttribute]
            where[this.tableAlias+'.'+this.idAttribute] = id
        
        }else if( where && where[this.tableAlias+'.'+this.idAttribute] ){
            id = where[this.tableAlias+'.'+this.idAttribute]

        // if no special WHERE given, default to querying for this model
        }else if( !where && this.id ) {
            // NOTE: i feel if `this.id` is set, it should always be in the where
            where = {}
            id = this.id
            where[this.tableAlias+'.'+this.idAttribute] = this.id
        }

        return {where, id}
    }

    async find(where=null, opts){

        if( this.req.query.relations !== undefined )
            return this.relationChain()

        // NOTE: the preferre syntaxt is now:
        // find(opts={where, [select, with]})
        if( opts == undefined && where && (where.where || where.select || where.with) ){
            opts = Object.assign({}, where)
            where = opts.where ? Object.assign({}, opts.where) : null
            delete opts.where
        }else{
            opts = opts || {}
        }

        let whereID = this.findWhereID(where)
        
        let id = whereID.id || null
        where = whereID.where || {}

        // see `bui/server/search`
        if( this.findWhereTerm )
            await this.findWhereTerm(where, opts)

        // let subclassed model apply more to where clause
        await this.findWhere(where, opts)

        let [clause, clauseValues] = new this.db.clauses.Group(where).toSqlString(this.db)
        where = clause ? `WHERE ${clause}` : ''

        let select = opts.select || this.config.select
        opts.select = select == undefined || select == '*' ? `${this.tableAlias}.*` : select

        let findJoins = this.findJoins(opts)
        let [join, joinSelect] = Array.isArray(findJoins) ? findJoins.reverse() : ([findJoins || '', ''])
        
        if( join )
            opts.join = join

        if( joinSelect )
            opts.select += `, ${joinSelect}`

        let sql = this.findSql(where, opts)
        if( typeof sql != 'string' ) return sql

        if( opts.returnSql )
            return this.db.format(sql, clauseValues)
            
        let resp = await this.db.query(sql, clauseValues, {preSql:opts.preSql})

        // parse each row (for decoding JSON strings, etc)
        await Promise.series(resp, (row,i)=>{
            this.decodeFields(row)
            return this.findParseRow(row, i, resp.length, resp, opts)
        })

        // filter out null values that `findParseRow` may have cleared
        resp = resp.filter(r=>r)

        // might need to activate this if too  many conflicts
        let convertToObject = true//this.config.resultsAsObject == true
        let ClassObj = Object.getPrototypeOf(this).constructor

        if( this.isSingular && resp && resp[0] ){
            id = this.id = resp[0][this.idAttribute]
            if( resp.length > 1 )
                console.warn('MODEL.isSingular returning more than one result')
        }
        
        if( id && id == this.id ){
            this.attrs = resp[0]
            resp = this
        }else if( id && !Array.isArray(id) ){
            if( convertToObject )
                resp = new ClassObj(resp[0], this.req)
            else
                resp = resp[0]
        // convert each row to a class object
        }else if( convertToObject )
            resp = resp.map(attrs=>new ClassObj(attrs, this.req))

        if( this.findExtendRowData )
            if( Array.isArray(resp) )
                await Promise.series(resp, (row,i)=>{
                    return this.findExtendRowData(row, opts)
                })
            else
                await this.findExtendRowData(resp, opts)


        return resp;
    }

    findOptionToArgs(option){
        if( option == true || option == 1 || option == '1' ) return []
        if( Array.isArray(option) ) return option
        return option ? [option] : []
    }

    relationChain({chain=[]}={}){

        let related = this.constructor.related
        let details = {}
        
        if( !related ) return details

        for( let relation in related ){

            if( chain.includes(relation) )
                continue
            
            chain.push(relation)

            let RelatedModel = this[relation]

            if( !RelatedModel ){
                details[relation] = null
                continue
            }

            details[relation] = RelatedModel
        }

        for( let relation in details ){
            if( details[relation])
                details[relation] = details[relation].relationChain?.({chain: [].concat(chain)})
        }

        return details
    }

    async findExtendRowData(row, opts={}){

        let related = this.constructor.related
        let _with = opts.with || this.req?.query.with
        
        // support comma delimited `with=related,related2`
        if( _with && typeof _with == 'string' ){
            _with = Object.fromEntries(_with.split(',').map(s=>[s,'']))
            
            if( this.req?.query.with )
                this.req.query.with = _with
        }

        // clear certain values that should only be used on first model
        if( this.req ){
            delete this.req.query.sorts
            delete this.req.query.perPage
            delete this.req.query.pageAt
        }

        if( !related ) return

        // for each relation, check for a `withRelationKey` option
        for( let relation in related ){

            let relationOpts = related[relation]
            let shouldInclude = relationOpts.with || _with == 'related' || (_with && _with[relation] != undefined)
            
            if( typeof shouldInclude == 'function' )
                shouldInclude = shouldInclude(row, opts)
            
            if( shouldInclude ){

                try{
                let RelatedModel = row[relation]

                // mitigate infinite loops
                // relatedSrc is the model that created this one
                // so stop if we're trying to get a relation the same as the creator
                if( this.relatedSrc && this.relatedSrc.constructor == RelatedModel.constructor )
                    return 

                if( RelatedModel ){

                    // NOTE: NOT using `_with[relation]` becase of sql injection
                    let args = opts.with && opts.with[relation] || null
                    // TODO: disabled cause we need to escape for sql injection
                    // if( _with[relation] )
                    //     args = [, {select: _with[relation]}]

                    args = this.findOptionToArgs(args)
                    
                    row.attrs[relation] = await RelatedModel.find(...args)
                }
                }catch(err){
                    // I think this would be bad design
                    // row.attrs[relation] = {error: err.message}
                }
            }
                
        }
    }

    findRelated(){
        if( this.id && this.relation && this.constructor.related[this.relation] )
            return this[this.relation].find()

        throw new Error('Unknown relation')
    }

    async add(attrs={}, {manualSync=false, updateDuplicates=true, ignoreDuplicates=false, merge=true}={}){

        if( !this.config.table ) throw Error('missing config.table')

        if( this.config.userID && this.req?.user )
            attrs[this.config.userID] = this.req.user.id

        let beforeAdd = await this.beforeAdd(attrs)
        this.encodeFields(attrs) // NOTE: this moved to after ^, could cause problems with existing code

        if( !attrs || Object.keys(attrs).length == 0 )
            throw Error('no data to add')

        let onDuplicate = ''
        if( this.config.updateDuplicates !== false && updateDuplicates !== false ){
            let updateDupeOpts = this.config.updateDuplicates === true ? {} : this.config.updateDuplicates
            onDuplicate = this.db.updateOnDuplicate(attrs, updateDupeOpts)
        }

        let result = await this.db.q(/*sql*/`INSERT ${ignoreDuplicates?'IGNORE':''} INTO ${this.config.table} 
                                        SET ? ${onDuplicate}`, attrs)
        
        if( !result.insertId && !result.affectedRows ){
            if( ignoreDuplicates ) return
            throw Error('failed to insert')
        }

        let id = result.insertId || this.id

        // NOTE: I think merge should default to true, but to minimize legacy issues, 
        // keep original logic in place
        if( merge )
            this.id = id

        this.afterAdd&&await this.afterAdd(attrs, beforeAdd)

        // since we dont set `this.id`, find should return a new class instance (unless merge:true)
        // we need to do this to allow for  `add` to be called multiple times
        let model = await (merge ? this.find() : this.find({[this.idAttribute]:id}))

        if( merge )
            model = this

        let syncData
        if( this.config.sync && this.req && model.syncData ){
            // appears duplicate updates return affected rows greater than 1 (2 in my tests)
            // update the action for realtime sync
            let action = result.affectedRows > 1 ? 'update' : 'add'
            
            syncData = ()=>{
                model.syncData({
                    action,
                    attrs:model.attrs,
                    syncData:attrs,
                    method: model.req.method,
                    url: model.apiPath
                },{
                    toClients: model.req.path==model.syncPath ? null : 'all'
                })
            }
        }

        if( syncData && !manualSync )
                syncData()

        return manualSync ? {resp: model, syncData} : model
    }

    async update(attrs={}, {manualSync=false}={}){

        // let subclass remove or modify attributes to be updated
        attrs = await this.validateUpdate(attrs)
        let where = {[this.idAttribute]:this.id}
        
        let beforeUpdate = await this.beforeUpdate(attrs, where)

        if( !this.config.table ) throw Error('missing config.table')

        if( !this.id || !attrs || Object.keys(attrs).length == 0 )
            return false;

        let result = await this.db.q(/*sql*/`UPDATE ${this.config.table} SET ? WHERE ?`, [
            attrs, 
            where
        ])

        if( result.affectedRows > 0 ){
            
            this.decodeFields(attrs)

            this.afterUpdate(attrs, beforeUpdate)

            if( this.id )
                this.attrs = Object.assign(this.attrs||{}, attrs)

            let syncData
            if( this.config.sync && this.req && this.syncData )
                syncData = ()=>{
                    this.syncData({
                        action: 'update',
                        attrs: this.toJSON(),
                        syncData: attrs,
                        method: this.req.method,
                        url: this.apiPath
                    },{
                        toClients: this.req.path==this.syncPath ? null : 'all'
                    })
                }

            if( syncData && !manualSync )
                syncData()

            return manualSync ? {attrs, syncData} : attrs
        }
        
        return false
    }

    async destroy(...args){

        if( !this.config.table ) throw Error('missing config.table')
        if( !this.isSingular ) throw Error('not a singular model')

        await this.find()
        
        if( this.isInvalid ) throw Error('Cannot delete: model not found')

        let where = {[this.idAttribute]:this.id}
        await this.beforeDestroy(where, ...args)

        let [clause, clauseValues] = new this.db.clauses.Group(where).toSqlString(this.db)
        
        let result = await this.db.q(/*sql*/`DELETE FROM ${this.config.table} WHERE ${clause}`, clauseValues)

        await this.afterDestroy(result, ...args)

        if( this.config.sync && this.req && this.syncData && result )
            this.syncData({
                action: 'destroy',
                attrs: this.toJSON(),
                method: this.req.method,
                url: this.apiPath
            },{
                toClients: this.req.path==this.syncPath ? null : 'all'
            })

        return String(result.affectedRows)
    }
}
