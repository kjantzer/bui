# Helpers

Helpers extend existing tools and libraries with added functionality. Typically helpers only need to be imported once and may be done on the root JS file.

***

# Lit

Extend [LitElement](http://lit.dev) to fit our needs. I like doing this so that we dont have to create unnecessary subclasses

```js
// include all lit-element helpers
import 'bui/helpers/lit'
```




***

# Backbone.js

If you want to use Backbone.js for managing data (models/collections) there are some helpers
to improve the workflow.

## Singleton
Export a a Collection as a singleton

```js
import 'helpers/backbone/singleton'
import {Collection, singleton} from 'backbone'

class Coll extends Collection{}

export default singleton(Coll)
```

## Promises
Crud methods in promise form
```js
import 'helpers/backbone/promises'

await model.fetchSync()
await model.saveSync()
await model.destroySync()

await collection.fetchSync()
await collection.createSync()
```

## Attribute Types
Make sure `.get()` attributes returns data in the expected type (e.g. a number or date object rather than a string)

```js
// Supported Types
const ModelAttrTypes = {
	'string': function(val){ return String(val) },
	'json': function(val){ return typeof val == 'string' ? JSON.parse(val) : val },
	'bool': function(val){ return !!val },
	'boolish': function(val){ return !!val && val !== '0' && val !== 0},
	'int': function(val){ return val ? parseInt(val) : 0 },
	'float': function(val){ return val ? parseFloat(val) : 0 },
	'num': function(val){ return val ? parseFloat(val) : 0 },
	'date': function(val){ return new Date(val) }
}
```

```js
// How to use
import 'helpers/backbone/attr-types'

class MyModel extends Backbone.Model {

    get attrTypes(){return {
        is_active: 'bool',
        ts_created: 'date',
    }}
}

let myModel = new MyModel({
    is_active:'1',
    ts_created: '2019-10-24 10:30:16'
})

myModel.get('is_active') // true
myModel.get('ts_created') // Date()
```

> Attributes will be cached and only re-evaluated to their type after changed

#### Registering your own attribute type
```js
import dayjs from 'dayjs'

Backbone.registerModelAttrType('date', val=>{
    return dayjs(val)
})

//....
myModel.get('ts_created').format('l')
```

## Settings Model

Sets up a model that will read/write to localStorage. Default values can be set. The created models are deduped by `key`. Multiple calls of createSettingsModel() with the same key will return the same model.
 
```js
createSettingsModel(key, defaultOpts={})
```

```js
import { createSettingsModel } from 'bui/helpers/backbone/createSettingsModel'

let settings = createSettingsModel('some-key', {
    optional: 'defaultValues'
})

settings.get('optional') // = defaultValues
settings.save('optional', 'changedVal') // set to localStorage
```

### Targets

It can be useuful to set the values of the settings on an element to alter styles via CSS. This can be done with the `target` methods

#### `addTarget(element)`
#### `removeTarget(element)`
#### `applyToTargets()`
Sets `settings-key="val"` on the targets. This is called whenever the settings model changes or when `addTarget` is used.

## Relations
Any non-trivial app will require models contain nested children. This helper aids in the implementation
of related models and collections. Children classes are only created when accessed and will pull data
from the parent model's attributes or a specificed lookup collection.

[Read more on Relations](./backbone/relations/README.md)

***

# Scrollbars
Make scrollbars look more like stock Mac/iOS. Also provides a few utilities

## Style
```js
import scrollbars from 'bui/helpers/scrollbars'

// only change style on windows
css`
    ${scrollbars.styleWindows()}
`

css`
    ${scrollbars.styleAll()}
`
```

## Hide 
Defaults to hiding scrollbar on `:host`. Pass a css selector to target child element.

```js
css`
    ${scrollbars.hide()}
    ${scrollbars.hide('.selector')}
`
```

## Disable Wheel Scroll
```js
firstUpdated(){
    scrollbars.stopWheelScrolling(this)
}
```

***

