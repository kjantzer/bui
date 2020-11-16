# Setup

## Installation
Blackstone-UI is available as an [npm package](https://www.npmjs.com/package/blackstone-ui)

```
npm install blackstone-ui --save
```

Or if you want the latest cutting-edge version

```
npm install https://github.com/kjantzer/bui.git --save
```


## Bundler
After installing BUI, it can be nice to setup an alias to the module to reduce how much typing is needed:

```js
// webpack
resolve: {
    alias: {
        'bui': 'blackstone-ui',

        // aliases for common presenters is also helpful
        'notif': 'bui/presenters/notif',
        'panel': 'bui/presenters/panel',
        'dialog': 'bui/presenters/dialog',
        'popover': 'bui/presenters/popover'
    }
}
```

```js
// package.json (for parcel.js)
"alias": {
    "bui": "blackstone-ui"
}
```

> The code examples below assume you have setup an alias. If not, swap `bui` for `blackstone-ui` in the imports


## Styles

```less
// style.less

// import a css reset if you wish
@import '~bui/styles/reset.less';

// include BUI styles
@import '~bui/styles/index.less';

// Or only import specific
@import '~bui/styles/colors.less';
@import '~bui/styles/theme.less';
@import '~bui/styles/pwa.less';
```

### `colors.less`
Creates css vars for list of [material colors](https://material.io/design/color)
- `--blue`
- `--blue-200`
- etc...

### `theme.less`
Sets css vars for to support the dark/light mode, accent, and text colors.

- `--theme` - accent color
- `--theme-color` - text color
- `--theme-color-accent`
- `--theme-bgd` - background
- `--theme-bgd-accent`
- `--theme-bgd-accent2`

### `pwa.less`
This makes some styling assumptions for a Progressive Web App (PWA)
- `html/body` full height and no overflow
    - expected that the app element will take care of scrolling
- sets `--view-gutter` (adjust for smaller screens)
- prevents iOS "callouts" from image long presses
- makes a few adjustments to BUI presenter styles

## App Entry

```js
// index.js

// import your styles from above
import 'style.less'

import device, {colorScheme} from 'bui/util/device'

// import all the lit-element helpers 
import 'bui/helpers/lit-element'

// updates global window.open to better support installed PWA
import 'bui/util/window.open'

window.addEventListener('DOMContentLoaded', e=>{
    
    // Adds clases html tag like `mobile`, `ios`, `android`, `installed`
    device.applyClasses()

    // Sets the theme, accent, and colorizes the favicon (based on accent)
    // will also set handler to update theme when dark/light mode changed via system
    colorScheme.apply()
})
```