# Helpers

Helpers extend existing tools and libraries with added functionality. Typically helpers only need to be imported once and may be done on the root JS file.

***

# Lit

Extend [LitElement](http://lit.dev) to fit our needs. I like doing this so that we dont have to create unnecessary subclasses

```js
// include all lit-element helpers
import 'bui/helpers/lit'
```

## Listeners

```js
import 'bui/helpers/lit/listeners'
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

## Events

```js
import 'bui/helpers/lit/events'
```

#### `emitEvent`
To simplify event dispatching from inside the shadow dom, an `emitEvent`
method has been added to lit-element

```js
this.emitEvent(eventName[, detail])
this.emitEvent('element-event', {id: 1})
```

The emitted event with have `bubbles: true` and `composed: true` so that the even
will bubble up and out of the shadow dom

#### `willTakeAction`
Emits with a specially formatted `detail` object for informing parent views of the action
and providing them the opportunity to cancel/disallow

```js
this.willTakeAction(actionName[, detail])

if( !this.willTakeAction('delete').allowed ) return
if( this.willTakeAction('delete').notAllowed ) return

let action = this.willTakeAction('show-menu', {menu: [/*...*/]})
if( action.allowed )
    console.log(action.menu) // could be different if parent changed it
```

```html
<child-el @will-take-action=${onAction}></child-el>
```

```js
onAction(e){
    let {action} = e.detail

    if( action.name == 'delete' )
        action.allowed = false

    if( action.name == 'show-menu' )
        action.menu = action.menu.filter(d=>d.val!='delete')
}
```

## Contextmenu
```js
import 'bui/helpers/lit/contextmenu'
```

Will automatically bind event listeners if `contextMenu` or `clickMenu` is set on the element.


```js
class Element extends LitElement {

    // triggered on right+click
    contextMenu(){}

    // triggered on click
    clickMenu(){}
}
```

## Get

```js
import 'bui/helpers/lit/get'
```
Shortcut to `this.model.get()` that also supports `defaultValue`
```js
this.get('some_key', 'default Value')
```

## Model / Coll

```js
import 'bui/helpers/lit/model'
import 'bui/helpers/lit/coll'
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

## Shared
```js
import 'bui/helpers/lit/shared'
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

## Event Target Model

```js
import 'bui/helpers/lit/event-target-model'
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

## Subviews

> Considering DEPRECATION

```js
import 'bui/helpers/lit/sv'
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

# Error Handler
A catch-all error handler with support for custom UI errors. 

```js
// import near the top of your app entry
import 'bui/app/error-handler`
```

After importing the error handler any uncaught error or promises will be caught and
displayed to the use via `notif`.

If a custom error was thrown (see `helpers/errors`) the handler will let the 
custom error determine how to handle.

Any subclassed `Error` with a `.handle` function will be handled this way

```js
// Default example (displays as `notif`)
if( !label )
    throw new UIWarningError('A label is required')

// Example error with a target (will display with popover)
if( !label )
    throw new UIDeniedError('A label is required', {target: inputEl})
```

## Custom Errors

#### `UIAlertError`
Generic alert. Defaults to `Dialog.alert`

#### `UIPermissionError`
For when a user is not allowed to do something. Defaults to `Dialog.stopped`

#### `UIWarningError`
Defaults to `Dialog.warning`

#### `UIDeniedError`
Defaults to `Dialog.error`