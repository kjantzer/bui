Notif
=======

A notification presenter inspired by [material snackbars](https://material-ui.com/components/snackbars/)
and [notistack](https://iamhosseindhv.com/notistack/demos#custom-snackbar)

```js
import Notif from 'bui/presenters/nofif'

new Notif({
    msg: 'A simple notifcation'
})

new Notif({
    type: 'info',
    msg: 'Here’s some info'
})

new Notif({
    icon: 'alert',
    color: 'red',
    animation: 'grow',
    anchor: 'top-right',
    msg: 'Something when wrong',
})
```

<!--
<b-btn onclick="new Notif({msg:'Simple notification'})">Notif 1</b-btn>
<b-btn onclick="new Notif({type: 'info', msg: 'Here’s some info'})">Notif 2</b-btn>
<b-btn onclick="new Notif({icon: 'alert',color: 'red',animation: 'grow',anchor: 'top-right',msg: 'Something when wrong',})">Notif 3</b-btn>
<b-btn onclick="new Notif({msg:'Simple notification',btns:[{label:'view', color:'primary'}]})">Notif 4</b-btn>
-->

## Options

```js
new Notif(opts)
```

```js
opts = {
    nid: null, // notif ID (random ID will be used if not set)
    type: '', // aplies color and icon
    color: '',
    width: '', // override default css width
    
    // custom view
    view: null,

    // or data for "snackbar" view
    msg: '',
    icon: '',
    btns: [],
    
    animation: 'slide',
    animationForReplace: 'grow',
    autoClose: 4000, // ms time or "false" to disable
    closeOnClick: true,
    controller: 'main', // where to render the notif
    anchor: 'bottom-right',

    onClick: (notif, btn)=>{}, // return `false` to stop closing
    onClose: (notif)=>{}
}
```

### `nid`
The notification ID `nid` can be manually set to keep duplicate notifs
from showing. If a duplicate `nid` is presenting, it will replace the existing
notif with the same `nid` (see `animationForReplace`)

### `type`
Some types have been defined that apply a color and icon:  
`info`, `success`, `warning`, `error`, `failed`

These types also have shortcuts created:

```js
Notif.error(msg, opts)
```

### `animation`
Possible animations include: `slide` (default), `grow`, `fade`, and `bounce`

### `animationForReplace`
When replacing a notif, it often looks better to use a more subtle animation.
If `slide` is default animation, `grow` will be used for replacing.

### `anchor`
Supported anchor positions are:  
`top-left`, `top`, `top-right`, `bottom-left`, `bottom`, and `bottom-right`

On small screens, all `top*` anchors and all `bottom*` anchors will be stacked together

### `controller`
Specify a different controller than the main. See "custom controller"

## Custom Controller

By default, all notifs will render to the `main` controller. The main controller will be
created and appended to the the `document.body` when the first notif is presented (if
it does not already exist)

You can create multiple controllers for rendering notifs in different views

```html
<div style="position: relative; min-height: 400px">
    <b-notifs 
        name="custom-controller"
        .defaults=${{width: 'auto', anchor: 'top-right'}}
    ></b-notifs>
</div>
```

```js
new Notif({msg: 'Custom notif', controller: 'custom-controller'})
```

## Methods

### `close`
the close method returns a promise that resolves after the notif has finished closing and after `onClose` is called

## Tips & Principles
- https://material.io/components/snackbars/#usage
