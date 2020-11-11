Selection
============

Enable bulk selection of items in a list. Supports desktop and touch/mobile devices; 
selects items from a long press and drag; auto scrolls on mobile; selects range of items
from a click and shfit+click (like a native desktop file explorer)

![screenshot](./screenshot.gif)

```js
let selection = new Selection(listEl, 'tag-name-of-item', opts={})

selection.begin()

// ... later
selection.result.length
selection.result.models
```

## Methods

### `.begin()`
### `.end()`
### `.on(event, callback)`
See "events" below

## Options

```js
new Selection(listElement, itemTagName, opts)
```

### `listElement`
Watches for mouse/touch events on this element and captures selected items

### `itemTagName`
The tag name of the items to be selected

>Note: currently assumes you will be selecting custom element items

***

```js
opts = {
    toolbar: null, // will set `.selection = this` on the toolbar
    selectedAttr: 'isSelected',
    endWhenNoResults: true,
    closeOnEsc: true,
    autoScrollThreshold: 48,
    autoScrollAcceleration: 5,

    onBegin: ()=>{},
    onEnd: ()=>{},
    onChange: result=>{}
}
```

### `selectedAttr`
The attribute to be applied to selected items

### `endWhenNoResults`
Once the last selected item is deselected, selection will be turned off

### `endOnEsc`
End selection when escape key is pressed

### `autoScrollThreshold`
How close (in px) to the top or bottom of the list until auto scrolling is triggered.
Set to `false` to disable auto scrolling

### `autoScrollAcceleration`
How aggressively auto scroll should accelerate. The further away from the 
threshold, the faster the list will scroll. 

`1` = no acceleration (constant speed)  
`5` = medium acceleration  
`10` = rapid acceleration

## Result
Result are a native [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). Access them via `selection.result` and use the following getters:

### `.elements`
Array of all selected elements

### `.models`
Array of models for the selected elements (assumes each element has `.model` set)

### `.length`
Number of selected elements (alias of `.size`)

## Events

```js
let sel = new Selection(/*...*/)

sel.on('change', result=>{
    console.log(result.length)
})
```

### `begin`
Do something when bulk selection begins, such as showing a "bulk select toolbar"

### `end`
Do something when selection ends

### `change`
When items are selected and deselected

## TODO
- support selecting items programaticaly; e.g. `selection.select(3,6)`