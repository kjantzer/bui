BUI Server
==================

![demo](https://img.shields.io/badge/Status-In_Development-blue)

Classes and utilities for node.js apps

# Documentation

## DB
Creates a pooled [MySQL](https://www.npmjs.com/package/mysql) connection with
a promised based query method.

```js
// db.js class
const DB = require('bui/server/db')

const db = new DB({
    connectionLimit : 10,
    host            : 'example.org',
    user            : 'bob',
    password        : 'secret',
    database        : 'my_db'
})

module.exports = db

// in other files
const db = require('./db')

let result = await db.query(`SELECT * FROM table`)
```

### db.parseWhere()
Takes a hash of where key:values and converts them to fields and values to be used in a MySQL query

```js
let [fields, values] = db.parseWhere({
    id: [1,2],
    type: 'foobar'
})

console.log(fields) // ['id IN(?)', 'type = ?']
console.log(values) // [[1,2], 'foobar']

db.query(`SELECT * FROM table WHERE ${fields.join(' AND ')}`, values)
```

## API

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
        routes: [
            ['get', '/url-path', 'methodName']
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
        idAttribute: 'id'
    }}

    // alter the where clause
    findWhere(where){
        // defaults to noop
    }

    findSql(where){
        // this is the default query
        return /*sql*/`SELECT * FROM ${this.config.table} ${where}`
    }

    findParseRow(row){
        // defaults to noop, only passing the row along as-is
        return row
    }

    // alter the attributes before updating
    validateUpdate(attrs){
        return attrs
    }

    // do something before destroying the model in the database
    beforeDestroy(){
        // defaults to noop
    }

}
```