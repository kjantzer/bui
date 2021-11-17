Menu
==========

Creates a menu list that can be loaded in a popover or modal. Supports multiple 
selections, keyboard navigation, search bar, and loadings results via ajax.

```javascript
new Menu(menu, options)
```

## Examples

```javascript
// staticly defined menu
let selected = await new Menu([
    {divider: '<h2>A header or divider</h2>'},
    {label: 'Item 1', val: '1'},
    {label: 'Item 2', val: '2'},
    'divider',
    {label: 'Delete', icon: 'trash', val: 'destroy'},
    {text: 'A block of text. <b>html</b> can be loaded here'}
]).popover(element)
```

```javascript
// AJAX Search
let selected = await new Menu([], {
    search: {url: '/my-search-url?term='}
}).popover(element)
```

## Menu Items

```js
// standard item
{
    label: 'Label to display',
    // optional
    description: '', // will display below the label
    val: 'value', // (required if using "selected" option)
    icon: '', // name of an icon
    dataTitle: '', // set custom value for quickly 
    className: '',
    extras: [], // array of custom elements to render after label
    fn: null // string or function (see handler docs)
}

// title
{title: 'Menu Title'}

// divider
{divider: 'A divider with label'}
'divider' // a line divider with no label

// text
{text: 'A block of text'}

// custom view
{view: HTMLElement}
```

## Options

```js
{
	selected: false, // value or array of values
	multiple: false, // more than one value selectable?
	search: 20, // true (always show) or number of results for it to show
    matching: false, // prefilter results
	minW: false,
    maxW: false,
	width: null,
    autoSelectFirst: false,
	jumpNav: false, // true (always show) or number of results for it to show
	typeDelay: 700, // how long until typed characters reset
	hasMenuIcon: 'right-open',
	onSelect: ()=>{},
    handler: null, // see handler docs
    handlerArgs: null
}
```

`multiple` - when `true` clicking an item's checkbox will toggle that item and clicking anywhere else on the row will select ONLY that item.

Set to `multiple:'always'` to make the rows toggle no matter where they are clicked

`matching` - will prefilter results that match the given string.

### Search
Menu will detect keystrokes and auto scroll to matching rows. However, if you want better (fuzzy)
searching that reduces the results, you can opt to show a search bar.

Search can also be leveraged to query for results on the server.

```javascript
search: {
    
    // a url is required, it can be a string or a function
    url: 'my-search?term=', // term will be appended to end
    url: term=>'my-search?term='+term, // custom function supported

    showAll: true, // should all results be displayed when nothing is searched
    hideUnselected: false,
    placeholder: 'Search',

    // a default parser will be used if none given
    // the parsed response should format to expected menu structure
    parse: row=>{
        return {
            label: row.label,
            val: row.val
        }
    },

    // optional
    extendResults(menu, term){
        if( menu.length == 0 ){
            menu.push({label: `Create: ${term}`, val: term, type: 'create'})
        }
    }
}
```


## Presenters

After creating a menu, you need to render it some where.
You can use the built-in presenters to accomplish this.

`menu.modal(opts)`

`menu.actionsheet(opts)`

`menu.popover(target, opts)`

#### Promise based

The presenters return a promise which lets you do this:

```js
async showMenu(){

    let selected = await new Menu(menuItems).modal()

    if( selected ){
        console.log(selected) // {label: 'Item 1', val: '1'}
    }
}
```

## Handler
Sometimes menu actions correlate to existing methods on a class. Instead of writing code to handle each menu item, you can set `fn` on items and automatically handle the selected item with:

`Menu.handle(selected, handler, args)`  

`fn` can be a string matching a function name on the handler object or a real function. `opts.handlerArgs` will be sent to the function as arguments.

Example: `{handlerArgs:[1,2,3]} => theHandler(one, two, three){}`

```js
let myClass = {
    item2Clicked(){
        console.log('item 2 clicked')
    }
}

let menuItems = [
    {label: 'Item 1', fn(){ console.log('clicked') } }
    {label: 'Item 2', fn: 'item2Clicked'},
    {label: 'Item 3'}
]

// call the menu handler function directly
let selected = await new Menu(menuItems).popover(target)
let didHandle = Menu.handle(selected, myClass)
if( !didHandle )
    console.log(selected.label) // Item 3

// OR use the handler option
new Menu(menuItems, {handler:myClass}).popover(target)
.then(selected=>{
    console.log(selected.label) // Item 3
})

// handler with args
new Menu(menuItems, {handler:[myClass, 'arg1', 'arg2']}).popover(target)
// long form
new Menu(menuItems, {handler:myClass, handlerArgs: ['arg1', 'arg2']}).popover(target)
```

## Utilities

### `toMenu()`

```js
// options
toMenu.call(arr, {
    before: [],
    after: [],
    unset: false
}, d=>{
    // optional function to translate each item in array
    // a default translation will be used if left out
    return {label: d.label, val: d.val}
})
```

Example

```js
import {toMenu} from 'bui/presenters/menu'

toMenu.call(['one', 'two', 'three'], {unset: true})

// result:
[
    {
        "label": "Uset",
        "icon": "erase",
        "val": ""
    },
    "divider",
    {
        "label": "one",
        "val": "one"
    },
    {
        "label": "two",
        "val": "two"
    },
    {
        "label": "three",
        "val": "three"
    }
]
```


