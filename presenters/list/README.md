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


## List Options
Options passed along to the infinite-list

```js
listOptions = {
    fetch: true, // true,false, 'more'
    perPage: 30
}
```

`fetch:true` - will only fetch initial data.  
`fetch:'more'` - will attempt to fetch more data
when all available data has been displayed

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
        multi: false, // can more than one value be selected?
        db: false, // true will make the filterBy happen on server instead
        values: [
            {label: 'All', val: ''},
            'divider',
            {label: 'Type 1', val: '1'},
            {label: 'Type 2', val: '2'}
        ],
        // a default filter by will be used if none given
        filterBy(model, val, key){
            return model.get(key) == val
        }
    },

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
}
```

### Custom Filter View
A view can be specified instead of values – `view` can be a preset
or the name of a custom element

#### Presets
- `date`
- `slider`

View options can be given to the view with `viewOpts`

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

## Search
Search options are specified as part of filters (see above).

`row.model.searchMatches` - when the search bar is actively searching, row models will have 
a `searchMatches` property they can check to see why they are being displayed

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

## Other Views

### Header
A list header can be rendered between the toolbar and the list items.

```html
<b-list>
    <div slot="header"></div>
</b-list>
```

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
    
    constructor(prevModel, model, list){
        super()
    }
}
```

### Slots
The default list view can be extended with html slots

- `spinner` - if you want to use a different spinner
- `toolbar:before`
- `toolbar:after`
- `toolbar:refresh` - your own refresh button (or to remove default)
- `header`

## Events

Filters and Sorts emit events when changed:

```
list.filters.on('change', changes=>{})
list.sorts.on('change', selectedSorts=>{})
```

The list dispatches a DOM event when the content changes (this would happen when applied filters change, sort changes, or content is fetched from the server)

```
list.addEventListener('content-changed', e=>{})
```

## Methods
- `refresh` - clears the list and fetches new data
- `reload` - reapplies the filters and reloads the table (new data NOT fetched)