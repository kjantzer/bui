# Server Classes

# API

```js
const app = require('express')();
const API = require('bui/server/api')
const Sync = require('bui/realtime/server/sync')

new API(app, [
    MyClass,
    AnotherClass
], {
    root: '/api' // prefix all APIs,
    sync: new Sync(io) // optionally support realtime syncing
})

class MyClass {

    // required
    static get api(){return {
        root: null // optional root to append to each route path
        idParam: 'id' // used in creation of apiPathPattern (used by Sync)
        requiresAuthentication: true, // routes default to private, change to make all public
        routes: [
            ['get', '/url-path', 'methodName'],
            ['get', '/url-path-public', 'methodName', {
                requiresAuthentication:false,
                cacheable: true // adds header `X-Is-Cacheable` for use with service worker
            }]
        ]
    }}

    // optionally prevent model from being accessible via API
    get canAccess(){ 
        // if( this.req.user.id != 1 ) return false
        return true
    }

    methodName(req){
        // do something
        return 'the value'
    }
}
```

# Model

## Setup
Models are generally only useful if they can query the database

```js
const Model = require('bui/server/model')

Model.db = requre('./my-db-class')
```

## Define
```js
const Model = require('bui/server/model')

module.exports = class MyModel extends Model {

    // API config for the API class (above) to use
    static get api(){return {
        root: '/my-model',
        sync: false, // API path will be the sync path
        routes: [
            ['get', '/:id?', 'find']
        ]
    }}

    get config(){ return {
        table: 'my_table',
        tableAlias: false,
        idAttribute: 'id',
        orderBy: '',
        limit: '',
        jsonFields: [], // will parse and encode on find/update/create
        csvFields: [], // ex: `1,2,3` => ['1', '2', '3']
        nullFields: [], // make these keys null when value is "falsy"
        sync: false, // if true, will call `this.syncData()` on update/add/destroy
    }}

    // alter the where clause
    findWhere(where, opts){
        // defaults to noop
    }

    // hook into findSql
    // return sql joinString
    // or [additionalSelectString, joinString]
    findJoins(){
        return '' // default

        // example with join only
        return /*sql*/`JOIN table_name t ON t.id = ${this.tableAlias}.ref_id`

        // example with join AND a select
        return [
            't.some_field',
            /*sql*/`JOIN table_name t ON t.id = ${this.tableAlias}.ref_id`
        ]
    }

    findSql(where, {select="*", join=''}={}){
        // this is the default query
        return /*sql*/`SELECT ${select}
                        FROM ${this.config.table} ${this.config.tableAlias||''}
                        ${join||''}
                        ${where}
                        ${this.findOrderBy()}
                        ${this.findLimit}`
    }

    findParseRow(row, index, resultCount, resp, opts){
        // defaults to noop, only passing the row along as-is
        return row
    }

    // alter the attributes before updating
    validateUpdate(attrs){
        return attrs
    }

    async beforeAdd(attrs){ /* noop */ }
    afterAdd(attrs, beforeAddResp){ /* noop */ }

    async beforeUpdate(attrs){ /* noop */ }
    afterUpdate(attrs, beforeUpdateResp){ /* noop */ }

    async beforeDestroy(){ /* noop */ }
    async afterDestroy(){ /* noop */ }

}
```

## Related

The model class now supports "related" models

```js
const TypeModel = require('./type')

class MyClass extends Model {

    static related = {
        // basic example
        type: TypeModel,

        // custom prop name
        typeModel: {model: TypeModel, id: 'type'},

        // JIT model import
        type: {model: __dirname+'/type'},

        files: {model: __dirname+'/files', relatedID: 'parent_id'}
    }
}

const myclass = new MyClass({id: 1, type: 3451})
console.log(myclass.type) // == TypeModel instance
console.log(myclass.files) // == FilesModel instance

// same as
new TypeModel({id: 3451}, myclass.req)
new Files({parent_id: 1}, myclass.req)
```

# FileManager

More docs needed, especially for how it pairs with API

```js
// example of using FileManager with API
const FileManager = require(bui`server/fileManager`)

// create the default files table before using
// db.query(FileManager.createTableSql())

module.exports = class Attachements extends FileManager {

    static get api(){return {
        root: '/attachments',
        routes: [
            ['get', '/:id?', 'find'],
            ['post', '/', 'upload'],
            ['delete', '/:id?', 'destroy']
        ]
    }}

    get ASSETS_PATH(){ return '/mnt/data' }
    get group(){ return 'attachments' }
    // get waitForPreviewGeneration(){ return false }
    // get skipDuplicates(){ return false }
    // get previewSize(){ return 800 } // set to false to disable preview generation

}
```