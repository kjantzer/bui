Icons
======

In order for svg icons to change colors, they must be inlined. To accomplish this, svg icons must be imported as text and registered. 

## Material Icons

All the Google Material Icons are available via the [@material-icons](https://github.com/material-icons/material-icons) package. You can import and use them like so:

```js
import Icon, {importMaterialIcons} from 'bui/elements/icon'

// import the specific SVG icons you wish to use
const Icons = importMaterialIcons([
    'account_circle',
    'person',
    // you can use a custom icon name like this:
    ['person', 'user'] // icon_name, custom_name
])

Icon.register(...Icons)
```

## Custom Icons
If the available material icons dont fully suit your needs, you can register your own SVG icons

```js
import Icon from 'bui/elements/icon'

// register specific icons
Icon.register(
    // [name, iconString]
    ['my_icon', require('path/to/my/icon')]
)
```

> **NOTE:** BUI icons have been named `.svg.html` rather than `.svg` so that [parcel.js](https://parceljs.org/) will import as text. Webpack can import `.svg` as text and parcel2 will be able to with a [`.parcelrc`](https://github.com/parcel-bundler/parcel/discussions/4829#discussioncomment-32740). If you're registering your own svg icons and using the parcel bundler, make sure your icons end in `.html`

### Icon Resources:
- https://icomoon.io/app


<!--plain
<b-icon-list cols="3"></b-icon-list>
-->