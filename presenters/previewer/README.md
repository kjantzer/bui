Previewer
============

> Early (and simple) version of a file "previewer" that leverages Panel

```js
import Previewer from 'bui/presenters/previewer'

Previewer.open(model)
```

>Note: it is expected the `model` has a `displayURL` getter and an `ext` attribute

## TODO
- write docs
- better image loading
- navigation between files
- custom menu for items
- support viewing non-backbone models