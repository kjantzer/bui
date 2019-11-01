# Backbone Relations

> Formerly "Backbone Child Collections"

![Version 1.2.0](https://img.shields.io/badge/Version-1.2.0-blue.svg)

> Create lazy-loading relations between Backbone.js models and collections with minimal effort. Perfect for REST APIs

## Collection Relation

Let's define and create a model with a collection
```js
var Employees = Backbone.ChildCollection.extend({
	// url path will be appended to the url of the parent model
	urlPath: 'employees'
})

var Company = Backbone.Model.extend({
	urlRoot: '/api/company'
	
	name: 'company', // see below how this is used
	
	// setup all child collections with a key
	collections: {
		'employees': Employees
	}
});

// instantiate a new model
var myCompany = new Company({id: 1, name: 'My Company'});
```

The url for child collections is created automatically using the URL from parent models

```js
console.log( myCompany.get('employees').url() ) // = /api/company/1/employees
```

The collections have a reference to the parent model
```js
var employeeColl = myCompany.get('employees');

console.log( employeeColl.parentModel == myCompany ) // true
```

Here's some more use cases.

```js
// create employee models – POST: /api/company/1/employees
myCompany.get('employees').create([
	{id: 1, name: 'John Doe'},
	{id: 2, name: 'Jane Doe'}
])

// there's more than one to access children
var firstEmployee = myCompany.get('employees').first()
//var firstEmployee = myCompany.get('employees.first')
//var firstEmployee = myCompany.get('employees.at0')
//var firstEmployee = myCompany.get('employees.1') // ID

// child models inside the child collections can traverse to the parent model
firstEmployee.collection.parentModel == myCompany // true

// of if you give the parent model a `name`, you can do this
firstEmployee.get('company') == myCompany // true

```

## Model Relation

```js
// Setup a computer model with a link to a single employee model
var Computer = Backbone.Model.extend({
	models: {
		'employee': {id: 'employee_id', coll: myCompany.get('employees')}
	}
});

var computer = new Computer({'employee_id':'1'})

console.log( computer.get('employee') ) // John Doe Model
console.log( computer.get('employee').get('name') ) // "John Doe"

```

> Note: a model can have both collections *and* models defined.

## Documentation

#### Model Attributes and Collection Keys

Model attributes and collection keys should not conflict unless you are wanting to preload the collection with data. If they keys are the same, the child collection with be returned and not the model attribute. However, if the model attribute is an array it will be added to the child collection.

```js
var jsonModelData = {
	id: 1,
	name: 'My Company',
	
	// this matches the child collection key,
	// so when `get(employees)` is used, this data will be converted into a real collection
	employees: [
		{name: 'Bob'},
		{name: 'Jill'}
	]
}

// using the example from above...
var myCompany = new Company(jsonModelData);

// returns collection with two employees, Bob and Jill
myCompany.get('employees');
```

#### Collections setup

You start by putting a list of `collections` on your model. *Multiple structures are supported.*

```js
collections: {
        'employees': 'employees', // urlPath will be set with generic ChildCollection
        'employees': EmployeesColl,
        'employees': {
                collection: EmployeesColl,
                ... // any other options listed here will be passed to collection on init
        },
        'employees': function(){ return EmployeesColl },
        'employees': function(){ return {
                collection: EmployeesColl,
        }}
}
```

As of v0.12.0, child collections can be nested under a group name. This can be helpful when your collections grow in number and you'd like to organize.

```js
 // group-coll.js
 module.exports = {
	 'one': Coll1
	 'two': Coll2
 }
 
 // model.js
 collections: {
	 'employees': EmployeesColl,
	 'group': require('./group-coll')
 }
 
 // using
 model.get('employees')
 model.get('group/one')
 model.get('group/two')
```

#### Models setup

Sometimes you may want to translate a related ID to a real Model. To do this, setup `models`. Like Collections, you can specify a hash or a function that returns a hash

```js
/* assuming your model looks like:
	{
		id: 1, 
		employee_id: 1,
		more: 'attrs'
	}
*/
models: {
	'employee': {
		id: 'employee_id', // the attribute on the model,
		
		// where to lookup the id
		coll: EmployeesColl // instance
		coll: 'EmployeesColl' // string name of instance on this model or global window (useful when instance not defined on load)
		coll: function(id, key){ // you can also choose to lookup the model with a custom function instead
			return MyLookupCollection.findASpecialModel(id)
		},
		
		// optional
		fetch: true // if `id` isn't found, it will be fetched from server
	}
}

// later: `.get('employee')` == model
```

Models will also work by having the entire model attributes rather than just and ID. Like so...

```js
/* assuming your model looks like:
	{
		id: 1, 
		employee: {
			id: 1,
			name: 'John Doe',
			more: 'attrs'
		},
		more: 'attrs'
	}
*/
models: {
	'employee': Employee // will turn the attrs into a real Model
}

// later: `.get('employee')` == model
```


#### Properties and methods available

`[Collection/Model].parentModel` – a reference to the parent model of this collection/model

`Model.refColl` - a reference to the collection they were fetched from. Only set when a child model is setup with a `coll` option

`Collection.urlPath` – the path to be appended to the URL of the parent model.

`[Collection/Model].hasFetched` (BOOL) – Is set to `true` after a `fetch` happens.

`[Collection/Model].isFetching` (BOOL) – Will be set to `true` while the `fetch` method is happening.

`Collection.fetchOnce()` – Fetches collection if it has not been fetched yet. (Tests for `hasFetched`)

`Collection.timeSinceLastFetch()` - Time in miliseconds since last fetched

`Collection.stale` - if set, `fetch` will only make request once data is given `ms` stale.

`Collection.fetch({stale:10000})` - Overrides `.stale` option to signify when the collection data becomes stale. A `fetch` request will not follow through until the data is stale.

`Model.needsFetching`

### Dot Notation

Dot notation is supported when getting child collections and models.

```js
// collections can return a specific model by providing an index
myCompany.get('employees.at0.name')
// aka
myCompany.get('employees').at(0).get('name')

// `first` and `last` are also supported
myCompany.get('employees.first.name')
myCompany.get('employees.last.name')

// as is model ID
myCompany.get('employees.1.name')
```

A benefit of using dot notation is if a nested item does not exist a fatal error *will not* occur.


## Changelog

#### next ver - 11/2/18
- added `getBefore(model)` and `getAfter(model)` to collections

#### v1.2.0 - 10/4/18
- can set a `defaultID` in a child model definition for when the attribute is null or undefined

#### v1.1.0 - 9/14/18
- child model lookup via `coll` property can be a custom function.

#### v1.0.0 - 6/26/18
- ready for commonjs loaders such as Webpack

#### v0.12.0 - 6/25/18
- child `collections` can be grouped under a common key – helpful for organized modular loading
- child models have reference to collection they fetched from via `refColl`

#### v0.11.1
- `id` is not longer required, the key name will be used to find the ID on the model attributes
- if model `info.coll` is a string, it will also check for it on the window

#### v0.11.0
- dot notation logic changed: index retrieval must be prefixed with "at". ex: `at0`. If not, a normal `get()` will happen
- access to parentModel via `name` will traverse all the way to the top (previously limited to first parentModel)
- getOrFetch accepts `silent` option
- model info defined as a function will be called in context of model
- model info.coll can be a string which will retrieved with dot notation

## License

MIT © [Kevin Jantzer](http://kevinjantzer.com) - Blackstone Publishing
