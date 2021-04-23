Mentions
=============

Make any `contenteditable` detect and insert mentions.

```js
import Mentions from 'bui/presenters/mentions'

new Mentions(editableElement, {
    values: [{
        label: 'Name 1'
        val: 1
    },{
        label: 'Name 2'
        val: 2
    }/* ... */]
})
```

>Limitations: requires [ShadowRoot.getSelection()](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/getSelection)  
> *not available yet on desktop/iOS Safari*

## Options
- `pattern` - regex (default is `/@(.[^\s]*)$/`)
- `element` - element tag name (default is `b-mention`)
- `values` - array or function that returns array
- ... optional fuse.js settings

The typed term will be matched against the values using [fuse.js](https://fusejs.io/)
Fuse.js settings can be specified with the options above

Default fuse.js options are:
```js
keys: [{
    name: 'dataTitle',
    weight: 0.7
},{
    name: 'label',
    weight: 0.5
}, {
    name: 'description',
    weight: 0.3
}],
minMatchCharLength: 2,
threshold: 0.2,
location: 0,
distance: 4
```

## Values
The array of values should conform to the [menu presenter](../menu/README.md)

## Default Values
Although each instance of `mention` can have different values set, you can choose to set the default values which will be used if no `values` specified.

```js
import Mentions from 'bui/presenters/mentions'

Mentions.defaultValues = function(){ return [/*...values here */]}
```


## Mention Element
A default `<b-mention>` element will be registered and used upon the first intialization of `mention`. 
If you wish to extend the default mention, you can import, extend, and register it yourself.

```js
import {html} from 'lit-element'
import Mentions, {MentionElement} from 'bui/presenters/mentions'

class CustomMentionElement extends MentionElement {

    static get styles(){return [super.styles, css`
        .at {
            opacity: .5;
        }
    `]}

    // prefix with "@"
    renderBefore(){ return html`
        <span class="at">@</span>
    `}

    // renderAfter(){ return '' }
}

// registers as `<b-mention>`
CustomMentionElement.register()
```