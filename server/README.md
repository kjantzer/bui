

# API

```js
const app = require('express')();
const API = require('bui/server/api')
const Sync = require('bui/server/realtime/server/sync')

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
            ['get', '/url-path-public', 'methodName', {requiresAuthentication:false}]
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

## Model

Models are only useful if they can query the database

```js
const Model = require('bui/server/model')

Model.setDB(requre('./my-db-class'))
```

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
        jsonFields: [] // will parse and encode on find/update/create
        csvFields: [] // ex: `1,2,3` => ['1', '2', '3']
    }}

    // alter the where clause
    findWhere(where, opts){
        // defaults to noop
    }

    findSql(where, opts){
        // this is the default query
        return /*sql*/`SELECT * 
                        FROM ${this.config.table} ${this.config.tableAlias||''}
                        ${where}
                        ${this.findOrderBy()}
                        ${this.findLimit}`
    }

    findParseRow(row, index, resultCount){
        // defaults to noop, only passing the row along as-is
        return row
    }

    // alter the attributes before updating
    validateUpdate(attrs){
        return attrs
    }

    async beforeAdd(attrs){ /* noop */ }
    afterAdd(attrs){ /* noop */ }

    async beforeUpdate(attrs){ /* noop */ }
    afterUpdate(attrs){ /* noop */ }

    async beforeDestroy(){ /* noop */ }
    afterDestroy(){ /* noop */ }

}
```