# Helpers

## LitElement

Extend LitElement to fit our needs. I like doing this so that we dont have to create unnecessary subclasses


### Listeners

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
```

### Events
To simplify event dispatching from inside the shadow dom, an `emitEvent`
method has been added to lit-element

```js
this.emitEvent(eventName, detail)
this.emitEvent('element-event', {id: 1})
```

The emitted event with have `bubbles: true` and `composed: true` so that the even
will bubble up and out of the shadow dom

### Subviews

Sometimes a linked subview needs to be created and we'd like to keep
and reuse it rather than recreate it each time (for example, a view
that pops over an element to edit)

```javascript
// syntax
this.sv(viewName, elementName)

// the view will be created if it doesn't exist
this.sv('edit', 'my-edit-view')
```

### Model
A common pattern is to pass a model object to the custom element. This extension
will unbind and rebind listeners (if using that extension; see above) and then
call `onModelChange` to let you hook into the update and do something (like fetch data)

```js
onModelChange(model){
    if( model )
        model.fetch()
}
```


## Backbone.js

[DEPRECATED]

Here at Blackstone our legacy code relies on Backbone and so to take advantage of
lit-html we've added some extensions to support this.

`Backbone.View` will render the contents of the `html()` method:

```javascript
import {html} from 'lit-html'
class MyView extends Backbone.View {
    html(){return html`
        create your html view here
    `}
}
```