# Model

# Setup
Models are generally only useful if they can query the database

```js
const Model = require('bui/server/model')

Model.db = requre('./my-db-class')
```

# Example
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
        userID: null, // field name to add user.id to upon row add
        updateDuplicates: true, // turn off to throw errors on duplicate inserts
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

    async findParseRow(row, index, resultCount, resp, opts){
        // defaults to noop, only passing the row along as-is
        return row
    }

    async findExtendRowData(row, opts){
        // default is to fetch related models if any `opts.withRelated` keys are set
        // more docs needed for this feature
        // optionally override this method to disable that logic or add even more data
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

# Methods

### `find()`
```js
find(where, opts){}
```

#### opts.returnSql
Returns the formatted SQL query that _would_ be run

#### opts.with
See "related" feature below

#### opts.preSql
One or more SQL queries to run before the main find query. Can be used to create a temp table that the main query will run

### `findSql()`
Defines the default query. Uses the `config.table`. Before overrrides this, see about using `findJoins`

### `findJoins()`
This can be used to hook into the default `findSql` method to join with more tables and optionally select more data.

```js
findJoins(){
    // simple join with no extra data selected
    return 'JOIN some_table ON...'
}

findJoins(){
    return [
        'some_table.field_name', // select more data
        'JOIN some_table' // table join
    ]
}
```

### `findParseRow()`
Use this hook to parse the data from the DB query (before it is converted into classes)

```js
findParseRow(row, index, resultCount, resp)
```

### `findExtendRowData()`
Default extends data with any requested "related" data. The data at this stage are in model/class form.

```js
findExtendRowData(row, opts)
```

### `add()`
```js
async add(attrs={}, {
    manualSync=false, 
    updateDuplicates=true, 
    ignoreDuplicates=false,
    merge=true
}={})
```

#### updateDuplicates
Default query is set to update records on duplicate found

#### igoreDuplicates
Set to `true` to ignore and stop errors from being thrown

#### manualSync
Data with be synced via realtime if `config.sync =true` is. If you do not want this to happen, change `manualSync` to false. The method response will change to `{resp, syncData}` where `syncData` is a function that can be called to sync the data (optional)

#### merge
By default, the add method creates a new model with the instantiated one, merging the added attributes. Turn this off to make the `add()` method return a new model (useful for when iterating over an object to create multiple models)

### `beforeAdd()`

```js
async beforeAdd(attrs){ /* noop */ }
```

### `afterAdd()`
```js
afterAdd(attrs, beforeAddResp){ /* noop */ }
```

`beforeAddResp` will be set if `beforeAdd` returns anything

### `beforeUpdate()`
```js
async beforeUpdate(attrs){ /* noop */ }
```

### `afterUpdate()`
```js
afterUpdate(attrs, beforeUpdateResp){ /* noop */ }
```

If `beforeUpdate` returns any data, it will be accessible in `beforeUpdateResp`

### `beforeDestroy()`
```js
async beforeDestroy(where, ...args){ /* noop */ }
```

### `afterDestroy()`
```js
async afterDestroy(result, ...args){ /* noop */ }
```

`result` = the DB response after the delete. For example: `result.affectedRows`

# Related

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

### Find "with" related data
When using the server Model, you can get data from relations by passing `with[RelationKey]` to the find method

```js
myclass.find(, {
    with: {
        type: true,
        files: [, {select: 'filename'}]
    }
})

// same as
myclass.find()
myclass.attrs.type = myclass.type.find()
myclass.attrs.files = myclass.files.find(, {select: 'filename'})
```

This can be done via API as well  
`/api/myclass/1?with[type]&with[files]`

Want data for all relations?

```js
myclass.find(, {with:'related'})

// or
`/api/myclass/1?with=related`
```

### Include by default
Relations can default to be included "with" the parent model by adding `with:true` to the relation definition

```js
class MyClass extends Model {
    static related = {
        type: {model: __dirname+'/type', with: true}
    }
}
```

The `with` option can also be a function to optionally return true based on the row content:

```js
class MyClass extends Model {
    static related = {
        type: {model: __dirname+'/type', with(row){ return row.attrs.hasSomeValue == true }}
    }
}
```