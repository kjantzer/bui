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
    extras: [] // array of custom elements to render after label
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
	minW: false,
	width: null,
	jumpNav: false, // true (always show) or number of results for it to show
	typeDelay: 700, // how long until typed characters reset
	hasMenuIcon: 'right-open',
	onSelect: ()=>{}
}
```

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

    // a default parser will be used if none given
    // the parsed response should format to expected menu structure
    parse: row=>{
        return {
            label: row.label,
            val: row.val
        }
    }
}
```


## Presenters

After creating a menu, you need to render it some where.
You can use the built-in presenters to accomplish this.

`menu.modal(opts)`

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

## Changelog
#### 2019-06-11
- changed how "selected" values are saved
- `multiple` will only take affect when clicking the checkbox, clicking the row will choose that row only
- menu items can have `clearsAll` property set which will be looked at when `multiple` is activated
- adding `extras` feature