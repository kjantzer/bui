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
	closeOnEsc: false,
	width: '',
	matchTargetWidth: false, // true or element
	maxWidth: '',
	maxHeight: 'auto',
	maxHeightThreshold: 400,
	overflowBoundry: 'scrollParent',
	onClose: ()=>{},
	onKeydown: e=>{}
}
```

### Target
The target can be an element or a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent).
If the target is a mouse event, the popover will appear where the mouse is placed.

It can also be a [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) in which case the popover will appear near the caret

The position can be updated with `positionOver`:

```js
popover.positionOver(newKeyboardEvent)
```

### Options

`maxHeight` - (string) can be pixels, percent, or `vh`

`overflowBoundry` - 'scrollParent', 'window', or an element  
>Note: you may want to set `maxHeight` as well

## Popover View
A specialized view class for popover specific views.

```js
import PopoverView from 'bui/presenters/popover/view'
import 'bui/helpers/lit/shared'

customElements.defineShared('my-popover-view', class extends PopoverView {
	load(modelOrID){
		// get/set model
	}

	onClose(){
		// optional hook
	}
})

// ...later - get singleton and open
customElements.get('my-popover-view').shared.open(target, modelOrID, opts)
customElements.get('my-popover-view').shared.openIfHoveringContinues(target, modelOrID, opts)
```

### Options
Same options as `new Popover(target, view, opts)`

#### `matchTargetWidth`