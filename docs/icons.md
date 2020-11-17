Icons
======

In order for svg icons to change colors, they must be inlined. To accomplish this, svg icons must be imported as text and registered. 


```js
import Icon from 'bui/elements/icon'

// register specific icons
Icon.register(
    // [name, iconString]
    ['my-icon', require('path/to/my/icon')],

    // iconString (`id` attr in icon will be used for name)
    require('bui/elements/icons/user.svg.html'),
    require('bui/elements/icons/cog.svg.html')
)
```

```js
// include and register all BUI icons
import 'bui/elements/icons/_all
```

> **NOTE:** BUI icons have been named `.svg.html` rather than `.svg` so that [parcel.js](https://parceljs.org/) will import as text. Webpack can import `.svg` as text and parcel2 will be able to with a [`.parcelrc`](https://github.com/parcel-bundler/parcel/discussions/4829#discussioncomment-32740). If you're registering your own svg icons and using the parcel bundler, make sure your icons end in `.html`

### Icon Resources:
- https://icomoon.io/app



<!--plain
<b-icon-list cols="3"></b-icon-list>
-->