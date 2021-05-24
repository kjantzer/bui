# DB

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

## Methods

### Utilities
- `db.format()`
- `db.escape()`
- `db.escapeId()`
- `db.NOW`
    - use for inserting `{completed: db.NOW}`

> See node mysql documentation

### db.query()
See node mysql documenation. Same syntax, but promise based.

### db.transactionalQuery()
Performs a series of queries and if any fail, will roll back. Accepts an array of queries, each matching the expected arguments of `.query`. **Returns** an array containing each query result.

```js
db.transactionalQuery([
    `INSERT INTO table SET label = 'test'`,
    [`INSERT INTO table SET ?`, {label: 'test 2'}],
    prevResult=>{
        if( !prevResult || prevResult.affectedRows == 0 )
            throw new Error('insert failed') // the previous transactions will roll back

        return `INSERT INTO table SET label = 'test 3'`,
    }
])
```

### db.updateOnDuplicate()
A utility function to be used when writting a query. Accepts a hash of attributes and will return the `UPDATE ON DUPLICATE...` string. *Values will be properly escaped.*

```js
let attrs = {id: 1: label: 'one'}

db.query(`INSERT INTO table SET ? ${db.updateOnDuplicate(attrs)}`, [attrs])

```

### db.bulkInsert()
Provide a table name and array of rows to insert. Query will be formatted as `INSERT INTO table (...) VALUES ...`

```js
let rows = [
    {num: 1, label: 'one'},
    {num: 2, label: 'two'}
]

let resp = await this.db.bulkInsert('table_name', rows)
```

## Clauses
> In development, but useable

Predefined clauses can be used to aid in creation of queries, particularly when clauses are optional or given from an outside source.

```js
let clauses = new db.clauses.Group({
    'is_active': true,
    'release_date': new db.clauses.Between('2020-01-01', '2020-01-31'),
    'name': new db.clauses.Like('%Smith'),
    'a-clause-group': new db.clauses.Group({
        'category': ['Adventure', 'Science'],
        'genre': 'Non-Fiction'
    }, 'OR')
})

// add to the clauses
clauses.set('is_deleted', false)

// get the clause string and values to be given to `db.query`
let [clause, values] = clauses.toSqlString(db)

db.query(`SELECT * FROM table_name WHERE ${clause}`, values)
```

#### Defined Clauses
- `Group(clauses, operator)` defaults to `AND` operator
- `Value(operator, val)`
- `Like(val)`
- `Between(start, end, {addHours:false})`
- `FullText(val)`
- `FindInSet(val)`
- `JsonContains(val, [path='$'])`
- `UnsafeSQL(rawSql)` - unsafe to input uncleaned user data

#### Custom Clauses
```js
class CustomClause extends db.clauses.Clause {
    
    // default constructor
    constructor(value){
        super()
        this.value = value
    }

    // REQUIRED
    // note: `key` will already be escaped
    // but you should escape values from the constructor
    toSqlString(db, key){
        return `${key} = ${db.escape(this.val)}`
    }
}
```

## Results
Results are returned in a subclass of `array` that provides a few helpers:

#### Properties
- `.first`
- `.last`
- `.value` gets value of first column in first row
- `.values` gets value of first column in all rows
- `.groupBy(key)` groups results by a key