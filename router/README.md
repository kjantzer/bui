Router
==========

A class for managing the URL and routing to views. Router is a singleton class (as there should never been a reason to have more than one router on a page). Routes can be added manually, but should generally only be integrated into core UI components.

Panel is a component that has router support built in.

## Getting Started

```js
import router from 'bui/router'

router.config({root:'/', prefix: '#'})
router.start()

router.add(':view(/:id)', (oldState, newState, dir)=>{
    
    if( newState )
        console.log('load view:', newState.params, newState.props)
    else
        console.log('close view')
        
})

router.goTo('my-url', {extra:'props'})
```

## Methods

### `config(opts)`
This should be done before `router.start` or any other code uses `router.add()`

```js
router.config({
    root: '/', // defaults to initial location.pathname
    prefix: '#/' // defaults to ''
    title: 'My App' // defaults to document.title
    clearInvalidPath: true,
    handleInvalidRoute(state, config){
        // default handler
        if( config.clearInvalidPath )
            state.path = config.PATH_ROOT
    }
})
```

### `start(opts)`
The router must be started in order to begin watching for history changes and triggering route changes

`opts.currentState`  
Will update the current route state if there isn't one yet

```js
router.start({
    currentState: {
        title: 'My App',
        path: 'dashboard'
    }
})
```

### `add(path, onChange)`
Define a route and a handler for that route. Use [url-pattern](https://www.npmjs.com/package/url-pattern) syntax in the url to accept url parameters.

```js
class MyElement extends HTMLElement {
    consructor(){
        router.add('my-url(/:id)', this.onRouteChange.bind(this))
    }

    onRouteChange(oldState, newState, direction){
        if( newState ){
            console.log('this view should present itself', newState.params.id)
        }
    }
}
```

`onChange` will be called anytime the path is being entered or left. You can determine this by looking at oldState and newState. `newState` will be set if entering and null if leaving
```js
onChange(oldState, newState, direction){
    direction // "forward" or "back"
}
```

### `goTo(path [, props])`
Navigate to a different view. You can track data by passing in props. The props will be accessible on the path `state` (see below)

This method will trigger a route change, calling the appropriate `onChange` on routes

### `push(path[, props])`
Same as `goTo` except that it does not trigger onChange events. This is best to use when the UI has already navigated and you wish to update the url path/state

## Events
Both events will have `event.detail={path, state, oldStates}`

`router:popstate`  
after history popstate and router has handled the change

`router:push`  
router had new path pushed

## State
Each entry into the browser history has a state object associated with it.
The `state` object tracks the path, title, and any properties passed in via `goTo`

### `state.props`
Contains default props (such as `path`) in addition to ones given in `goTo`.

### `state.params`
Contains any params specified in the url
```js
// example:
router.add('my-url/:id', onChangeHandler)

// `id` will be accessible on the state
state.params.id
```

### `state.query`
A [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) object containing
any of the url search params present on first load or from `props.query`

### `state.update(props)`
You can update the state properties (including path and title). Updates only work for the active state

```js
state.update({
    title: 'New Window Title',
    path: 'new-path'
})
```

# TODO
- auto automated google analytics tracking?
- change signature of `onChange` to pass newState first (as this is the most used param)