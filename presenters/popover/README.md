Popover
============

Uses [popper.js](https://popper.js.org) to display views as a popover
over a partiuclar target

## Rendering Views

Popover should only be used as the presenter of views and not be
responsible for rendering or controlling the view.

Use views like `Menu` and `Dialog` or roll your own and then use
popover to display your view.

```js
let view = new MyView()
let popover = new Popover(target, view, opts)
```

### Default Opts

```js
const DefaultOpts = {
	align: 'bottom',
	className: '',
	clickToggles: true,
	closeOnHide: true,
	maxHeight: 'auto',
	maxHeightThreshold: 400,
	onClose: ()=>{},
	onKeydown: e=>{}
}
```

### Options

`maxHeight` - (string) can be pixels, percent, or `vh`

`overflowBoundry` - 'scrollParent', 'window', or an element  
>Note: you may want to set `maxHeight` as well