Notif
=======

A notification presenter (toasts/snackbars)

```js
import Notif from 'bui/presenters/notif'

new Notif({
    msg: 'A simple notification'
})

new Notif({
    type: 'info',
    msg: 'Here’s some info'
})

new Notif({
    icon: 'error',
    color: 'red',
    animation: 'grow',
    anchor: 'bottom-right',
    msg: 'Something went wrong',
})
```

<!--
<b-btn onclick="new Notif({msg:'Simple notification'})">Notif 1</b-btn>
<b-btn onclick="new Notif({type: 'info', msg: 'Here’s some info'})">Notif 2</b-btn>
<b-btn onclick="new Notif({icon: 'error',color: 'red',animation: 'grow',anchor: 'bottom-right',msg: 'Something went wrong',})">Notif 3</b-btn>
<b-btn onclick="new Notif({msg:'Simple notification',btns:[{label:'view', color:'theme'}]})">Notif 4</b-btn>
-->

## Notif style vs a Dialog in a notif

There are two ways to show a notif:

1. **Notif style**: `new Notif({msg, title, icon, btns})` renders the notif's own layout (icon badge, text, buttons). Use it for status messages
2. **A view**: `new Dialog({...}).notif()` (or `new Notif({view})`) renders the dialog (or any element) inside the notif. Use it when you need what a dialog has: a prompt/input, a `closeBtn`, a promise that resolves with the chosen button

Both share the same surface (radius, shadow), motion, stacking, swipe and timer. A `b-dialog` in a notif gets `[in-notif]` styles that match the notif style (tinted icon badge, accent bar, compact buttons)

## Options

```js
new Notif(opts)
```

```js
opts = {
    nid: null, // notif ID (a unique ID will be used if not set)
    type: '', // applies color, accent and icon options (see `type`)
    width: '', // override default css width

    // custom view
    view: null,

    // or content for the notif style
    msg: '', // string (html) or lit-html
    title: '',
    pretitle: '',
    icon: '', // icon name, 'spinner', or lit-html
    btns: [], // same as dialog btns: 'undo', {label, color}, etc
    color: 'inverse', // surface: inverse, red, orange, green, blue, theme, dark, light (or '' for the theme bgd)
    accent: '', // icon/pretitle/progress color: red, orange, green, blue, theme
    edge: false, // accent bar on the leading side
    compact: false, // one line pill (icon, message, buttons)
    closeBtn: undefined, // default: shown when `closeOnClick` is off and it's not a view
    progress: false, // bar counting down `autoClose`
    assertive: false, // screen readers interrupt to announce (errors/warnings types set this)

    animation: 'slide',
    animationForReplace: 'morph',
    autoClose: 4000, // ms time or "false" to disable
    closeOnClick: true,
    controller: 'main', // where to render the notif
    anchor: 'top-right',

    onClick: (notif, btn)=>{}, // return `false` to stop closing
    onClose: (notif)=>{}
}
```

### `nid`
The notification ID `nid` can be manually set to keep duplicate notifs
from showing. If a notif with the same `nid` is presenting, the new one takes its place
(see `animationForReplace`)

### `type`
Some types have been defined that apply an accent and icon:
`info`, `success`, `warning`, `error`, `failed`, `sticky` (no auto close, click doesn't close)

These types also have shortcuts created:

```js
Notif.error(msg, opts)
```

Types use an accent (tinted icon) instead of a solid surface. For a solid surface set `color`:

```js
Notif.error('Something went wrong', {color: 'red'})
```

### `animation`
`slide` (default), `grow`, `fade`, and `bounce`

Slides toward the anchored edge (on small screens: from the top or bottom). With `prefers-reduced-motion` every animation is a fade

### `animationForReplace`
`morph` (default) keeps the notif in place, animating its height and crossfading the content. Set to one of the `animation` values to enter fresh instead

### `anchor`
Supported anchor positions are:
`top-left`, `top`, `top-right`, `bottom-left`, `bottom`, and `bottom-right`

On small screens, all `top*` anchors and all `bottom*` anchors will be stacked together

### `controller`
Specify a different controller than the main. See "custom controller"

## Behavior
- **auto close** pauses while hovering any notif in the same anchor, while touching a notif, and while the window is not focused. It continues with the time remaining (at least 2s after coming back to the window)
- **stacking**: past 3 notifs in an anchor, the oldest tuck behind (peeking out); hovering expands them. Set `collapseAfter` on the controller to change (`0` turns it off)
- **swipe** (touch/pen) toward the anchored edge to dismiss
- **screen readers**: notifs are announced through live regions in the controller (`assertive` interrupts)

## Custom Controller

By default, all notifs will render to the `main` controller. The main controller will be
created and appended to the `document.body` when the first notif is presented (if
it does not already exist)

You can create multiple controllers for rendering notifs in different views

```html
<div style="position: relative; min-height: 400px">
    <b-notifs
        name="custom-controller"
        .defaults=${{width: 'auto', anchor: 'top-right'}}
        .collapseAfter=${0}
    ></b-notifs>
</div>
```

```js
new Notif({msg: 'Custom notif', controller: 'custom-controller'})
```

## Methods

### `close`
Returns a promise that resolves after the notif has finished closing and after `onClose` is called

### `autoClose(ms)`
Restart the auto close timer with a new delay, or `autoClose(false)` to stop it

## CSS Variables
- `--b-notif-width` (340px)
- `--b-notif-radius` (12px)
- `--b-notif-gap` (space between notifs, .625em)
- `--b-notif-padding` (controller edge padding, 1em)
- `--b-notif-compact-max-width` (420px)
- `--b-notif-compact-bgd` / `--b-notif-compact-color` (override the surface colors)

## Tips & Principles
- https://m3.material.io/components/snackbar/guidelines
