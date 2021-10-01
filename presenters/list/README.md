List
=================

Display an "infinite" list of results with a toolbar to sort
and filter the results.

## Creating the List
```html
<b-list
    key="uniq-key"
    row="row-element-name"
    divider="row-divider-element"
    .listOptions=${listOptions}
    .coll=${this.coll}
    .filters=${filters}
    .sorts=${sorts}
    @content-changed=${this.onContentChange}
></b-list>
```

>*NOTE:* the list will link itself to the host view as `.list`
>(so long as .list is not already set)

#### Attributes
- `key` - used to remember which filters are selected
- `row` - the name of the custom element to use for each item
- `divider` - optional divider (see below)
- `.coll` - a Backbone.Collection to use for fetching data
- `listOptions` - change defaults (see below)
- `toolbar=""` - `bottom`, `bottom-mobile` (flips toolbar to bottom)

## List Row
The custom element listed in the `row` attribute will have a link
to the `b-list` element as `this.list`.

## List Options
Options passed along to the infinite-list

```js
listOptions = {
    fetch: true, // true,false, 'more'
    fetchOnLoad: true,
    perPage: 30,
    layouts: null // see below for details
}
```

`fetch:true` - will only fetch initial data.  
`fetch:'more'` - will attempt to fetch more data
when all available data has been displayed

`fetchOnLoad` - should data be fetched upon initial load?

`perPage` - how many rows to display at one time.
Also determines how many "more" rows are requested
via fetch:more


## Filters
```js
const filters = {

    // "search" is a special filter that applies to the search bar
    search: {
        data(m){
            // return a hash of attributes to be searched
            return {
                title: m.get('title'),
                tags: m.get('tags') // value can be an array of strings
            }
        },
        // optional
        placeholder: 'Search',
        delay: 500 // how long of delay in user typing to begin searching?
        //...specify other fuse.js options
    },

    type: {
        label: 'Type', // the key will be used if no label is set
        maxHeight: '60vh', // max height of dropdown menu
        width: '160px', // exact width of menu
        multi: false, // can more than one value be selected?
        db: false, // true will make the filterBy happen on server instead
        alwaysShow: false, // see "overflow panel"
        onFirstLoad: async (list, filter)=>{
            // use this to fetch data before showing menu for the first time
        },

        // values are passed to `Menu`, check docs for available options
        values: [
            {   // required
                label: 'All',
                val: '',
                // optional
                toolbarLabel: 'all', // label will be used if this is unset
                description: '',
                icon: '',
                clearsAll: false // never allowed to multi select
            },
            'divider',
            {label: 'Type 1', val: '1'},
            {label: 'Type 2', val: '2'}
        ],
        // a default filter by will be used if none given
        filterBy(model, val, key){
            return model.get(key) == val
        }
    }
    // there are some more advanced filters with "filter views"; see below
}
```

### Search
Search options are specified as part of filters (see above).

#### Options
```js
search: {
    data(m){
        // return a hash of attributes to be searched
        return {
            title: m.get('title'),
            tags: m.get('tags') // value can be an array of strings
        }
    },
    // optional
    hideIcon: false,
    placeholder: 'Search',
    delay: 500 // how long of delay in user typing to begin searching?
    //...specify other fuse.js options
}
```

##### `hideIcon: true`
Somes you may wish to hide the search icon/input but keep the "term search" functionality.
You can do this by setting `hideIcon: true`

You can then programmatically search by term using `list.term = 'some value'`

**Tips**  
- You can hide the search bar by adding: `search:false`. Search is on by default and will use default settings
- `row.model.searchMatches` - when the search bar is actively searching, row models will have 
a `searchMatches` property they can check to see why they are being displayed

### Filter Views
A view can be specified instead of values – `view` can be a preset
or the name of a custom element

#### Presets
- `date`
- `slider`
- `search`
- `input`

View options can be given to the view with `viewOpts`

```js
const filters = {
    timestamp_created: {
        label: 'Created',
        view: 'date',
        db: true
    },

    runtime: {
        view: 'slider',
        viewOpts: {
            range: true,
            max: 50,
            suffix: ' hrs.'
        }
    },

    keywords: {
        view: 'input',
        viewOpts: {
            placeholder: 'Keywords...',
            helpText: 'Separate with delimited',
            prefix: '',
            suffix: '',
            defaultLabel: '-',
            width: '200px'
        }
    }

    author: {
        view: 'search',
        viewOpts: {
            url: '/api/search/author?term='
            parseResult(row){
                // must match `Menu` syntax
                return {label: row.name, val: row.id}
            },
            // optional
            placeholder: 'Search',
            allowFuzzy: false,
            extendResults(menu, term){}
        }
    }
}
```

#### Custom Filter View
Custom elements need to have a `.value` and `.label` getter

```js
class CustomFilterView extends HTMLElement {
    
    firstUpdated(){
        let cachedVal = this.filter.value
    }

    // REQUIRED
    get value(){
        // value to be set as the filter
    }

    // REQUIRED
    get label(){
        // label for the selected value
    }

    // OPTIONAL
    get defaultVal(){
        // when the filters are cleared/reset, what value should be the default?
        return null
    }

    // OPTIONAL
    set value(val){
        // the view will be opened in a popover and can close 
        // by using the magic 'close' function (added to view by the filter)
        // closing will apply the filter
        this.close()
    }

    // OPTIONAL
    filterBy(model, val, key){
        // provide logic for how to apply the filter
    }
}
```

### Overflow Panel
When there are lots of filters, an "overflow" panel view becomes available. You can choose to disable this or change the threshold of when the panel is activated

```js
const filters = {
    options: {
        overflowThreshold: 8, // defaults
        overflowThresholdMobile: 3,
        overflow: false // enable/disable overflow all together
    }
}
```

When the overflow is activated, only "active" filters are shown in the toolbar. If you wish to keep certain filters in the toolbar at all times, add `alwaysShow: true` to the desired filters

### Presets
You can create predefined presets that will apply multiple filters at once. The `filters` defined for a preset are expected to be the same format as what `list.filters.value()` returns (or what `list.filters.reset()` expects).

```js
const filters = {
    presets: [
        {
            label: 'Westerns',
            description: '', // optional
            filters: {keywords: 'western'}
        }
    ]
}
```

Fiters are only availble when the overflow threshold is met. Adjust the threshold if needed. Or if you want to disable presets, do so in `options`:

```js
const filters = {
    options: {
        presets: false
    }
}
```

> Note: this feature is new and will be improved in the future. More documentation is needed.

## Sorts
```js
const sorts = {
    
    title(m){ return m.get('title') },

    moreComplex: {
        label: 'More Complex Sort',
        desc: true, // change default to descending sort
        description: 'When the contract was created',
        sortBy(model){
            return model.moreComplexDataPoint()
        }
    }
}
```

### Sort Defaults
```js
const sorts = {
    defaults: ['title'],
    title(m){ return m.get('title') }
}
```

### Sorting on the database
If you want the sorting to happen on the database/server instead of
in the browser, add `db:true`. Changes to sort will trigger refetch
and no sorting will happen in JS

```js
const sorts = {
    defaults: ['title'],
    db: true,
    title:{}
}
```

## Selection
The list includes the `selection` module. You can turn it on manually or use the `<b-list-selection-btn>` (see below)

#### Begin/End
```js
list.selection.begin()
list.selection.end()
```

#### Results
```js
let models = list.selection.results.models
console.log(models.length)
```

#### Actions
If using selection you'll most likely want to define some "actions". Do so by using the `actions:left` and `actions:right` slots

```html
<b-list>
    <b-list-selection-btn></b-list-selection-btn>

    <b-btn slot="actions:left" @click=${this.moveSelected}>Move</b-btn>
    <b-btn slot="actions:left" @click=${this.deleteSelected}>Delete</b-btn>
    
    <b-list-export-btn slot="actions:right"></b-list-export-btn>
</b-list>
```

## Layouts
Renders a button in toolbar for toggling between different list layouts (e.g. list, grid)

```js
listOptions = {
    layouts: {
        // name: 'icon-name'
        list: 'th-thumb'
        grid: 'menu',
    }
}
```

Active layout can be accessed on the `b-list` element

```js
// alias to list.layouts.active
list.layout // name of active layout ('list')
list.layout = 'grid' // change layout

// layouts object
list.layouts

// go to next layout
list.layouts.next()
```

#### Change Event
The toolbar button and list will react to the layouts change, but 
if you need to react to the change somewhere else, you can watch
for the change event

```js
list.layouts.on('change', layout=>{
    console.log(layout)
})
```

## Other Views

### Header
A list header can be rendered between the toolbar and the list items.

```html
<b-list>
    <div slot="header"></div>
</b-list>
```

#### Prebuilt Header
There is prebuilt header that can be used to simplify list headers

```js
import ListHeader from 'bui/presenters/list/header'

customElements.define('row-element-name', class extends LitElement{

    static get styles(){return [ListHeader.sharedStyles, css`
        /* add more styles */
    `]}

    static header(){return html`
        <div w="40px">ID</div>
        <div w="1fr">Label</div>
    `}

    render(){return html`
        <span>1</span>
        <span>Row Label</span>
    `}

})
```

```html
<b-list row="row-element-name">
    <b-list-header></b-list-header>
</b-list>
```

### Footer
A list footer can be displayed at the bottom of the list

```html
<b-list>
    <div slot="footer"></div>
</b-list>
```

### Empty (view)
A default "empty" view will used when no results. You can choose to use your own with custom info and actions

```html
<b-list empty="my-empty-view">
```

The empty view will have a reference to `.list` and `.dataSource`. Also, `.value` will be set which will
hold the text that the list thinks should be displayed (it's up to you to display it).

### Divider
A divider can be added to the list.

```html
<b-list divider="my-divider-elment">
```

The divider element must implement a static `shouldDisplay` method

```js
class DividerElement extends HTMLElement {

    static shouldDisplay(prevModel, model, list){
        return !prevModel || prevModel != model
    }

}
```

> Note: `.list`, `.model`, and `.prevModel` properties are accessible via the render method

### Export Button
Renders a button in the toolbar next to the refresh button to export the data in the list. Data models can implement `toCSV` to alter the exported data.
The CSV will include the list `key` and active filters in the top of the file

```js
import 'bui/presenters/list/export-btn`
```

```html
<b-list key="my-list">
    <b-list-export-btn></b-list-export-btn>
</b-list>
```

### Selection Button
Shows a "select" icon button next to the list count. Will turn on list selection when clicked.
If you dont also provide an export button or some actions, this will not be of any use.

```js
import 'bui/presenters/list/selection-btn`
```

```html
<b-list key="my-list">
    <b-list-selection-btn></b-list-selection-btn>

    <!-- note: add this if you want selected rows to be exportable -->
    <b-list-export-btn slot="actions:right"></b-list-export-btn>
</b-list>
```

### Slots
The default list view can be extended with html slots

- `spinner` - if you want to use a different spinner
- `toolbar:before`
- `toolbar:after`
- `toolbar:refresh` - your own refresh button (or to remove default)
- `header`
- `footer`
- `actions:left` - displayed when selection is on
- `actions:right`

## Styling

### CSS Variables
> Needs documentation

- `--list-toolbar-shadow`

### Parts
Certain [parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) can be styled:

- `toolbar`
- `selectionbar`
- `list`
- `row`
- `divider`
- `empty-view`
- `header-slot`
- `footer-slot`


```css
/* example */
b-list::part(toolbar) {
    background: black;
    color: white;
}

b-list[layout="grid"]::part(list) {
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(140px, 1fr) );
    grid-template-rows: 140px;
    gap: 1em;
}
```

### Custom Styles
The list view uses shadow dom to render the content. If you need to apply 
custom styles (ex: to make results display as a grid) you can provide
a `.customStyles` prop

>DEPRECATED – note: styling via `parts` is now preferred

```css
let styles = css`
    :host b-infinite-list {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(140px, 1fr) );
        grid-template-rows: 140px;
        gap: 1em;
    }

    :host b-infinite-list[layout="list"] {
        /* 
            apply different styles for each layout 
            see "layout" options below
        */
    }

`
<b-list .customStyles=${styles}></b-list>
```

## Events

Filters and Sorts emit events when changed:

```js
list.filters.on('change', changes=>{})
list.filters.on('change-queue', changes=>{})
list.sorts.on('change', selectedSorts=>{})
list.dataSource.on('changed', ()=>{})
```

The list dispatches a DOM event when the content changes (this would happen when applied filters change, sort changes, or content is fetched from the server)

```
list.addEventListener('content-changed', e=>{})
```

## Methods

`list.term = 'value'`
Programatically search/filter by term

`list.refresh()`  
clears the list and fetches new data

`list.reload()`  
reapplies the filters and reloads the table (new data is NOT fetched)

`list.filters.reset(filterVals={}, {stopQueuing=true, silent=false})`  
reset filters to default or given values

`list.filters.update(filterVals)`  
applies the given filters

`list.filters.areApplied` - true/false

`list.dataSource.isFiltered`
filters applied OR search term has value
