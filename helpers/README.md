# Helpers

Helpers extend existing tools and libraries with added functionality. Typically helpers only need to be imported once and may be done on the root JS file.

***

## LitElement

Extend LitElement to fit our needs. I like doing this so that we dont have to create unnecessary subclasses

```js
// include all lit-element helpers
import 'bui/helpers/lit-element'
```

### Listeners

```js
import 'bui/helpers/lit-element/listeners'
```

Adds support for listening to Backbone Model/Collection/ChildCollection
events and responding. Most events should just be calling `update` which
will rerender the view.

```javascript
static get listeners(){ return {
    'model': {
        'change reset': 'update'
    },
    'child-collection': {
        'reset': 'update'
    }
}}

// ^ equivalent to:
this.model.on('change reset', this.update.bind(this))
this.model.get('child-collection').on('reset', this.update.bind(this))
```

### Events

```js
import 'bui/helpers/lit-element/events'
```

To simplify event dispatching from inside the shadow dom, an `emitEvent`
method has been added to lit-element

```js
this.emitEvent(eventName, detail)
this.emitEvent('element-event', {id: 1})
```

The emitted event with have `bubbles: true` and `composed: true` so that the even
will bubble up and out of the shadow dom

### Get

```js
import 'bui/helpers/lit-element/get'
```
Shortcut to `this.model.get()` that also supports `defaultValue`
```js
this.get('some_key', 'default Value')
```

### Model / Coll

```js
import 'bui/helpers/lit-element/model'
import 'bui/helpers/lit-element/coll'
```

A common pattern is to pass a model object to the custom element. This extension
will unbind and rebind listeners (if using that extension; see above) and then
call `onModelChange` to let you hook into the update and do something (like fetch data)

```js
onModelChange(model){
    if( model )
        model.fetch()
}
```

### Shared
```js
import 'bui/helpers/lit-element/shared'
```

Define a custom element with a "shared" singleton feature. Useful for when a view will be used in multiple places but only needs to be intialized once and then reused.

```js
let MyElement = customElements.defineShared('my-element', class extends LitElement{
    open(){
        log('open this view')
    }
})

MyElement.shared.open()

console.log(MyElement.shared == MyElement.shared) // true
console.log(MyElement.shared == new MyElement() ) // false
```

### Event Target Model

```js
import 'bui/helpers/lit-element/event-target-model'
```

A pattern at Blackstone when using lit-html is to render 
a collection of items as a set of controls. Buttons and actions
are taken that need access to the model which has been set at the top
level of the html item. This extension makes it easer to access 
the model and top parent target

```js
html`<div class="item" .model=${m}>
    <p>stuff here</p>
    <footer>
        <b-btn @click=${this.takeAction}></b-btn>
    </footer>
</div>`

takeAction(e){
    let model = e.model
    let target = e.modelTarget // => `.item`

    // same as
    target = e.currentTarget.parentElement.parentElement
    model = target.model
}
```

### Subviews

> Considering DEPRECATION

```js
import 'bui/helpers/lit-element/sv'
```

Sometimes a linked subview needs to be created and we'd like to keep
and reuse it rather than recreate it each time (for example, a view
that pops over an element to edit)

```javascript
// syntax
this.sv(viewName, elementName)

// the view will be created if it doesn't exist
this.sv('edit', 'my-edit-view')
```

***

## Backbone.js

If you want to use Backbone.js for managing data (models/collections) there are some helpers
to improve the workflow.

### Singleton
Export a a Collection as a singleton

```js
import 'helpers/backbone/singleton'
import {Collection, singleton} from 'backbone'

class Coll extends Collection{}

export default singleton(Coll)
```

### Promises
Crud methods in promise form
```js
import 'helpers/backbone/promises'

await model.fetchSync()
await model.saveSync()
await model.destroySync()

await collection.fetchSync()
await collection.createSync()
```

### Attribute Types
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

### Relations
Any non-trivial app will require models contain nested children. This helper aids in the implementation
of related models and collections. Children classes are only created when accessed and will pull data
from the parent model's attributes or a specificed lookup collection.

[Read more on Relations](./backbone/relations/README.md)