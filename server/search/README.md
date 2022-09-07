Search
====================

Create various types of searches that can be invoked individually or together. Results are scored with fuse.js. Search types can further affect result sorting with a weight.

## Setup

```js
const SearchAPI = require(bui`server/search`)
const db = require('./db')

// see "types" below
const SearchTypes = [
    require('./my-table')
]

class MySearchAPI extends SearchAPI {

    // this is the default API; you only need to add the following if you want to add/change the API routes
    static get api(){return {
		routes: [
			['get', '/search/:term', 'searchDefault'],
            ['get', '/search/:type/:term', 'searchType']
		]
	}}

    // default will search by all defined types
    // implement this if you want to change
    // async searchDefault(){
    //     return this.searchTypes(['my-table'])
    // }

}

MySearchAPI.add(SearchTypes)

export default MySearchAPI
```

## Types

Create at least one search type for your search API.


```js
const SearchType = require(bui`server/search/type`)

module.exports = class SearchMyTable extends SearchType {

    static get name(){ return 'my-table' }
    
    formatTerm(term){ return [this.termForBoolean(term)+'*'] }

    // perform the search
    get searchSql(){ return /*sql*/`
        SELECT id, label, 'label' matched, 50 weight
        FROM my_table
        WHERE MATCH(label) AGAINST(? IN BOOLEAN MODE)
    `}

    // after basic results are fetched and scored, get the data to be returned for each result
    // NOTE: this result should return and `id` that is the same as the one in `searchSql`
    get fillSql(){ return /*sql*/`
        SELECT *
        FROM my_table
        WHERE id IN(?)
    `}
}
```


## Model.findWhereTerm

Search types can be leveraged by Model to further limit the `where` clause. This feature is an opt-in.

```js
const MySearchAPI = require('./my-search-api')
MySearchAPI.enableFindWhereTerm()

```

```js
class MyModel extends Model {

    get config(){ return {
        table: 'my_table',

        // class must opt-in too
        termSearch: {
            types: ['my-table'],
            key: 'ref_id',
            resultID: 'id' // optional, defaults to `id`
        }
    }}

    // override this if you need to customize
    findWhereTermResultsMatch(whereGroup, ids, {key, type, results, where, opts}){
        // default logic is effectively:
        // whereGroup[this.config.termSearch.key] = ids
    }
}
```

#### Multiple search terms

```js
get config(){ return {
    //...
    
    termSearch: [
        {
            types: ['my-table'],
            key: 'ref_id',
        },
        {
            types: ['second-table'],
            key: 'ref_id2'
        }
    ]
}}
```