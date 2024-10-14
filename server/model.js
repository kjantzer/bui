/*
    # Model

    Define a data model that can retrieve from the database and standup related API endpoints

    ```js
    class MyModel extends Model {

        static api = {
            root: '/my-model',
            routes: [
                ['get', '/:id?', 'find']
                ['post', '/', 'add']
                ['put', '/:id?', 'update']
                ['delete', '/:id?', 'destroy']

                ['get', '/:id/special-action', 'specialAction']
            ]
        }

        config = {
            table: 'my_model_table',
            tableAlias: 'mmt', // optional

            // use these to properly parse/convert when reading/writing from db
            jsonFields: [],
            csvFields: [],
            nullFields: [] // will save "empty" values as `null`
        }

        specialAction(){}
    }

    // Then give this class to `server/api`
    ```

    See server/model docs for more info
*/
const related = require('./related')
const PromiseArray = require('../util/promise-array')
require('../util/promise.series')
const findFK = require('./db/findForeignKeyConstraints')

const defaultConfig = {
    idAttribute: 'id'
}

// called in context of the model
function proxyDB(){
    
    // keep track of open/running connections so we can kill if needed
    let connections = this._dbConnections = new Set()

    return new Proxy(this.db, {

        get(target, prop) {

            // when db.query() is called, intercept first
            if( prop == 'query' ){
                return function(sql, data, opts={}){
                    
                    return new PromiseArray(async (resolve)=>{
                        
                        // create connection and keep ref to it
                        opts.conn = await target.getConnection()

                        // to be safe, lets only track and kill "SELECT" type queries
                        // thinking if user initiates an add/update and it take a few seconds, but the user
                        // closes or navigates await from page, it would trigger kill if though we dont wish for that
                        if( sql.startsWith('SELECT'))
                            connections.add(opts.conn)

                        // continue performing query
                        let query = target[prop].call(target, sql, data, opts)

                        // when query finishes, clear connection ref
                        let resp = await query.finally(resp=>{
                            connections.delete(opts.conn)
                            return resp
                        })

                        resolve(resp)
                    })
                }
            }

            // everything else can stay the same
            return target[prop];
        }
    })
}

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

        if( this.opts.limit !== undefined )
            return this.opts.limit ? `LIMIT ${this.opts.limit}` : ''

        if( this.req && this.req.query.perPage )
            return `LIMIT ${this.req.query.pageAt||0},${this.req.query.perPage}`
            
        return this.config.limit ? `LIMIT ${this.config.limit}` : ''
    }
    
    findOrderBy(orderBy){
        orderBy = orderBy || this.config.orderBy
        return  orderBy ? `ORDER BY ${orderBy}` : ''
    }

    findGroupBy(){
        let groupBy = this.opts.groupBy || this.config.groupBy

        return  groupBy ? `GROUP BY ${groupBy}` : ''
    }

    async findParseRow(row, index, resultCount, resp, opts){
        return row
    }

    async findAdditionalData(resp, opts){
        // nothing to do by default    
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

    // shouldn't need to change this
    onClientTerminated(){
        // let post/put/delete actions continue
        if( this.req.method == 'GET' )
            this.db.kill(this._dbConnections)
    }

// =================================================
    
    constructor(attrs, req, opts={}){

        related.setup(this)

        if( !this.db )
            console.warn('Model.db has not been set yet')

        // intercept query calls so we can kill them on client terminated
        this.db = proxyDB.call(this)
        
        this.req = req || {query:{}}
        this.attrs = attrs || {}
        this.opts = opts

        for(let key in attrs){
            
            if( key == 'req')
                console.error('ALERT: models should not have `req` for an attribute')

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
        // TODO: support returning `this.models`
        return Object.assign({}, this.attrs||{})
    }

    get filters(){

        if( this.__filters !== undefined ) return this.__filters

        try {
            let filters = this.opts.filters || this.req.query.filters

            if( filters && typeof filters == 'string')
                filters = JSON.parse(filters)

            this.__filters = filters || {}

            return this.__filters
            
        }catch(err){
            this.__filters = undefined
            console.log('Malformed filters:', this.req.query.filters);
            return {}
        }
    }

    get sorts(){

        if( this.__sorts !== undefined ) return this.__sorts

        try{
            let sorts = this.req.query.sorts 
            if( typeof sorts == 'string' )
                sorts = JSON.parse(this.req.query.sorts)

            return this.__sorts = new Map(Object.entries(sorts||{}));
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
        
            let desc = sortOpts.desc && sortOpts.desc != 'false' ? 'DESC' : 'ASC'

            let sort = fn && fn(key, sortOpts)

            if( !sort && sort !== false )
                sort = `${this.db.escapeId(key)} ${desc}`
                
            if( sort )
                orderBy.push(sort)
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
                if( attrs[fieldName] != undefined && !attrs[fieldName].toSqlString ){

                    // if special "_merge" flag is set, convert to a JsonMergePatch clause
                    if( attrs[fieldName] && attrs[fieldName]._merge ){
                        delete attrs[fieldName]._merge
                        attrs[fieldName] = new this.db.clauses.JsonMergePatch(attrs[fieldName])
                    }else
                        if( typeof attrs[fieldName] !== 'string' )
                            attrs[fieldName] = attrs[fieldName] ? JSON.stringify(attrs[fieldName]) : null
                }
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
                    else if( attrs[fieldName]?.toJSON )
                        attrs[fieldName] = attrs[fieldName].toJSON()
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

        // NOTE: the preferred syntax is now:
        // find(opts={where, [select, with]})
        if( opts == undefined && where && (where.where || where.select || where.with) ){
            opts = Object.assign({}, where)
            where = opts.where ? Object.assign({}, opts.where) : null
            // delete opts.where
        }else{
            opts = opts || {}
            opts.where = where
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

        let findJoins = opts.noJoins ? ['', ''] : this.findJoins(opts)
        let [join, joinSelect] = Array.isArray(findJoins) ? findJoins.reverse() : ([findJoins || '', ''])
        
        if( join )
            opts.join = Array.isArray(join) ? join.join(`\n`) : join

        if( joinSelect ){
            joinSelect = ( Array.isArray(joinSelect) ? joinSelect.join(', ') : joinSelect)
            if( joinSelect)
                opts.select += `,`+joinSelect
        }

        // NOTE: sort of a half-baked idea
        let unions = await this.findUnions?.()
        let sql = ''

        if( unions && Array.isArray(unions) && unions.length > 0 ){
            unions = unions.map(union=>{

                let [clause, clauseValues] = new this.db.clauses.Group(union).toSqlString(this.db)
                let unionWhere = where || 'WHERE true'
                unionWhere += 'AND '+clause
                
                return this.findSql(unionWhere, opts)
            })

            sql = `(${unions.join(`) \nUNION ALL\n(`)})`

        }else
            sql = this.findSql(where, opts)
        
        if( typeof sql != 'string' ) return sql

        if( this.findExtendQuery ){
            sql = this.db.format(sql, clauseValues)
            sql = this.findExtendQuery(sql, opts)
            clauseValues = [] // applied by format ^

            if( !sql ) throw new APIError('`findExtendQuery` should return a sql string')
        }

        if( opts.returnSql )
            return sql
            
        let resp = await this.db.query(sql, clauseValues, {preSql:opts.preSql})

        // parse each row (for decoding JSON strings, etc)
        await Promise.series(resp, async (row,i)=>{
            this.decodeFields(row)
            if( i == 0 ) await this.findAdditionalData(resp, opts)
            return this.findParseRow(row, i, resp.length, resp, opts)
        })

        // filter out null values that `findParseRow` may have cleared
        resp = resp.filter(r=>r)

        // might need to activate this if too  many conflicts
        let convertToObject = true//this.config.resultsAsObject == true
        let ClassObj = Object.getPrototypeOf(this).constructor

        if( this.isSingular && resp && resp[0] && (!id && !this.id) ){
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
            this.models = resp = resp.map(attrs=>new ClassObj(attrs, this.req))

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
        if( option == true || option == 1 || option == '1' || option == 'true') return []
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

        // client terminated connection, stop getting more data
        // continue if we were in put/post/delete methods (we probably want the action to continue)
        if( this.req?.res?.destroyed && this.req.method == 'GET' ) 
            return //console.log('client terminated');

        if( !row.attrs ) return // model not found

        let related = this.constructor.related
        let _with = opts.with===false ? null : (opts.with || this.req?.query.with || this.config.with)
        
        // support comma delimited `with=related,related2`
        if( _with && typeof _with == 'string' ){
            _with = Object.fromEntries(_with.split(',').map(s=>[s,'']))
            
            // if( this.req?.query.with )
            //     this.req.query.with = _with
        }

        let childWith = {}

        // opt-in feature for now - since this can be breaking change
        if( this.constructor.relatedDotNotation ){

            delete this.req?.query.with
            opts.with = _with

            // dont let top level "with" propagate down to other relations
            // other relations may have the same name for their own relations (ie "comments")
            // to include relations down the chain, they must be requested with dot notation'
            // ex: `with=comments,relatedItems,relatedItems.comments`
            for( let k in _with ){
                let [parentKey, ...childKey] = k.split('.')
                if( childKey?.length > 0 ){
                    childWith[parentKey] = childWith[parentKey] || {}
                    childWith[parentKey][childKey] = 1
                }
            }
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
                let relationWith = childWith[relation]

                // mitigate infinite loops
                // relatedSrc is the model that created this one
                // so stop if we're trying to get a relation the same as the creator
                if( this.relatedSrc && this.relatedSrc.constructor == RelatedModel?.constructor )
                    return 

                if( RelatedModel ){

                    // NOTE: NOT using `_with[relation]` becase of sql injection
                    let args = opts.with && opts.with[relation] || null
                    // TODO: disabled cause we need to escape for sql injection
                    // if( _with[relation] )
                    //     args = [, {select: _with[relation]}]

                    args = this.findOptionToArgs(args)
                    
                    if( relationWith ){
                        let opts = {with: relationWith }

                        if( args.length == 0 )
                            args.push(opts)
                        else if ( args.length == 1 && (args[0].where || args[0].select || args[0].with) )
                            args[0] = {...args[0], ...opts}
                        else
                            args[1] = {...args[1], ...opts}
                    }
                        
                    
                    row.attrs[relation] = await RelatedModel.find(...args)
                }
                }catch(err){
                    console.log('Related:', err);
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

        let beforeAdd = await this.beforeAdd(attrs, arguments[1])
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

        // since we dont set `this.id`, find should return a new class instance (unless merge:true)
        // we need to do this to allow for  `add` to be called multiple times
        let model = await (merge ? this.find() : this.find({[this.idAttribute]:id}))

        if( merge )
            model = this

        model.afterAdd&&await model.afterAdd(attrs, beforeAdd)

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

        return manualSync ? {resp: model, model, syncData} : model
    }

    async update(attrs={}, {manualSync=false}={}){

        let args = arguments

        // let subclass remove or modify attributes to be updated
        attrs = await this.validateUpdate(attrs, args[1])
        let where = {[this.idAttribute]:this.id}
        
        let beforeUpdate = await this.beforeUpdate(attrs, where, args[1])

        if( !this.config.table ) throw Error('missing config.table')

        if( !this.id || !attrs || Object.keys(attrs).length == 0 )
            return false;

        let result = await this.db.q(/*sql*/`UPDATE ${this.config.table} SET ? WHERE ?`, [
            attrs, 
            where
        ])

        if( result.affectedRows > 0 ){
            
            this.decodeFields(attrs)

            await this.afterUpdate(attrs, beforeUpdate, args[1])

            if( this.id ){

                this.attrs = this.attrs||{}

                for( let k in attrs ){
                    // merge JSON values (instead of replacing) (so long as not an array)
                    if( this.config.jsonFields?.includes(k) && !Array.isArray(this.attrs[k]) && !Array.isArray(attrs[k]))
                        this.attrs[k] = Object.assign(this.attrs[k]||{}, attrs[k])
                    else
                        this.attrs[k] = attrs[k]
                }
            }

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
        let beforeDestroy = await this.beforeDestroy(where, ...args)

        let [clause, clauseValues] = new this.db.clauses.Group(where).toSqlString(this.db)
        
        let result = await this.db.q(/*sql*/`DELETE FROM ${this.config.table} WHERE ${clause}`, clauseValues)

        await this.afterDestroy(result, ...args.concat(beforeDestroy))

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

    async findForeignKeyConstraints(){
        return findFK.call(this, {table: this.config.table, id: this.idAttribute})
    }

    async findForeignKeyUses({includeEmptyFK=false}={}){

        let foreignKeys = await this.findForeignKeyConstraints()

        let resp = await Promise.all(foreignKeys.map(async fk=>{
            let data = (await this.db.query(/*sql*/`
                SELECT COUNT(*) num FROM ${fk.TABLE_NAME} WHERE ${fk.COLUMN_NAME} = ? GROUP BY ${fk.COLUMN_NAME}
            `, [this.id])).first

            return {
                table: fk.TABLE_NAME,
                column: fk.COLUMN_NAME,
                num_rows: data?.num || 0
            }
        }))

        // remove foreign keys with no rows
        if( includeEmptyFK !== true )
            resp = resp.filter(d=>d.num_rows>0)

        return resp
    }

    async merge(){

        let {ids, primaryID} = this.req.body
        let foreignKeys = await this.findForeignKeyConstraints()

        // make sure primary ID is NOT in set of IDs to merge
        ids = ids.filter(id=>id!=primaryID)
        
        if( ids.length == 0 || !primaryID )
            throw new APIError('Improper IDs given for merging')

        this.id = primaryID
        this.beforeMerge && await this.beforeMerge({ids, primaryID, foreignKeys})

        // update all foreign keys to use the primary ID
        await Promise.all(foreignKeys.map(fk=>{
            this.db.query(/*sql*/`
                UPDATE ${fk.TABLE_NAME} SET ${fk.COLUMN_NAME} = ? WHERE ${fk.COLUMN_NAME} IN(?)
            `, [primaryID, ids])
        }))

        await this._mergeDelete({ids, primaryID, foreignKeys})

        this.afterMerge && await this.afterMerge({ids, primaryID, foreignKeys})

        return String(ids.length)
    }

    // let sublclasses modify this behaviour
    async _mergeDelete({ids, primaryID, foreignKeys}){
        // now delete the merged records
        await this.db.query(/*sql*/`DELETE FROM ${this.config.table} WHERE ${this.idAttribute} IN(?)`, [ids])
    }
}
