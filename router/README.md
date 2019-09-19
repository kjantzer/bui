Router
==========

> More documentation needed

A class for managing the URL and routing to views. Router is a singleton class (as there should never been a reason to have more than one router on a page). Routes can be added manually, but should generally only be integrated into core UI components

Panel is such an example; panels leverage the router with a `.register()` method

```javascript
Panel.register('url-path', 'custom-element-name', opts={})
```

## Getting Started

```js
import router from 'bui/router'

router.start()

router.add('my-url', (oldState, newState, dir)=>{
    if( newState )
        console.log('load view', newState.props)
    else
        console.log('close view')
})

router.goTo('my-url', {with:'data'})
```

## Methods

### `start()`
the router must be started on first page load

### `add(path, onChange)`

Use [url-pattern](https://www.npmjs.com/package/url-pattern) syntax in the url to accept url parameters

```js
router.add('my-url(/:id)', 'custom-element')
```

`onChange` will be called anytime the path is being entered or left. You can determine this by looking at oldState and newState. `newState` will be set if entering and null if leaving
```js
onChange(oldState, newState, direction){
    direction // "forward" or "back"
}
```

### `goTo(path [, props])`
navigate to a different view. You can track data by passing in props. The props will be accessible on the path `state` (see below)

## State
Each entry into the browser history has a state object associated with it.
The `state` object tracks the hash, title, and any properties passed in via `goTo`

### `state.props`
empty unless given in `goTo`

### `state.params`
contains any params specified in the url
```js
// example:
router.add('my-url/:id', 'custom-element')

// `id` will be accessible on the state
state.params.id
```


## TODO
- needs to be able to handle base URLs that aren't at the root