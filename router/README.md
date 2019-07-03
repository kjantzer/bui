Router
==========

> Documentation needed

A class for managing the URL and routing to views. Router is a singleton class

Routes can be added manually, but should generally be used by core UI components
such as Panel. Panels leverage the router with a `.register()` method

```javascript
Panel.register('url-path', 'view-name', opts={})
```

## TODO
- needs to be able to handle base URLs that aren't at the root