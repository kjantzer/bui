Search Popup
====================

A "spotlight" / "Alfred app" like view for doing global app searches

**Combines the following presenters:**
- Panel
- List
- Form (text-field)

**Example**
```js
import SearchPopup from 'bui/presenters/search-popup'
import SearchPopupResult from 'bui/presenters/search-popup/result'

customElements.defineShared('my-search', class extends SearchPopup{

    constructor(){
        super()

        // default setting (override if you wish)
        this.minTermLength = 3 // dont fetch until
        this.typeDelay = 400 // delay fetching results while typing

        this.key = 'b-search-popup' // for remembering selected filters
        this.url = '/api/search'
        this.resultView = 'my-search-result'
        this.emptyView = 'b-search-popup-empty-results'

        // see "List" documentation for how to format filters
        // filters can be sent to backend to adjust the query
        this.filters = {
            search: {data:false}
        }
    }

})

customElements.define('my-search-result', class extends SearchPopupResult{

    // result data will be set on results as `this.model`
    render(){return html`
        <h1>${this.model.label}</h1>
    `}

})
```

## Open
When opening search, you can use `.shared` to open a single shared instance of search (rather than create each time)

```js
import search from 'my-search'

search.shared.open()
search.shared.open({term:'search term'})
```

## Keyboard Binding
There is a default method setup to enable a global keyboard shortcut to open the shared search view

```js
// default is `ctrl+k' (like Slack)
customElements.get('my-search').bindShortcut()

// or use custom key
customElements.get('my-search').bindShortcut('f')
customElements.get('my-search').bindShortcut(['k', 'o']) // multiple
customElements.get('my-search').bindShortcut(e=>{
    return e.key == 'f' && (e.ctrlKey||e.metaKey) && e.shiftKey
})
```

## Go To
You need to add a `goTo` method to your search subclass to handle selected results

```js
// "selected" is a result "model"
goTo(selected, metaKey){
    if( selected.type == 'book' )
        return router.goTo('book/'+selected.id)

    super.goTo(selected, metaKey)
}
```

## Auto Open
By default, if only one result is returned it will be opened automatically.

If you wish to turn this off or check for user opt-in, you can do so with `shouldAutoOpen`

```js
customElements.defineShared('my-search', class extends SearchPopup{

    constructor(){
        super()

        this.filters = {
            auto_open: {
                values: [
                    {label: 'Yes', val:''},
                    {label: 'No', val: false},
                    {text: 'Should single results be opened?'}
                ],
                // no filtering, this filter is used as a search "setting"
                filterBy(m, val, key){ return true}
            }
        }
    }

    get shouldAutoOpen(){
        // use the "filters" feature to check the "auto_open
        return this.list.filters.get('auto_open').value !== false
    }
})

```

## Shortcuts
By default, registered panels that opt-in to `shortcuts` will be available in search. The default trigger is `/`

```js
customElements.defineShared('my-search', class extends SearchPopup{

    get shortcutsTrigger(){ return '/' }
    get shortcuts(){
        // use registered panel shortcuts with a custom one
        return super.shortcuts.concat([
            {
                title: 'Custom shortcut!',
                url: '/custom-shortcut'
            }
        ])
    }
})
```

#### Opening to shortcuts
If `bindShortcut` was given a key matching `shortcutsTrigger`, search will open prefilled with shortcuts

```js
// ctrl+k = normal search
// ctl+/ = shortcuts mode
customElements.get('my-search').bindShortcut(['k', '/'])
```