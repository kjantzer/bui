Dialog
==========

> An extensible class for creating dialogs with built-in presets for warnings, errors, success, and prompts.

## Options

`new Dialog(opts)`

```js
opts = {
	icon:'', // name of icon, lit-html, or "spinner" to show a spinner
	pretitle: '',
	title:'',
	body:'',
	view: null,
	// w: null, // TODO: add this feature again?

	btns:['dismiss'],
	closeBtn: false, // close button in top right

	// color options
	color: '', // blue, red, green, orange
	accent: '', // same ^
	edge: false,  // only works with `accent`
	
	// style variants
	toast: false,
	stack: false,

	// removes spacing from main content block
	noContent: false
}
```

## Presets
The following presets can be used. They accept the same arguments as `new Dialog()` but change certain option defaults

- `Dialog.waiting()`
- `Dialog.alert()`
- `Dialog.warn()`
- `Dialog.error()`
- `Dialog.success()`
- `Dialog.confirm()`
- `Dialog.confirmDelete()`
- `Dialog.prompt()`

You can register your own presets if you have dialog patterns you use a lot

```js
import {registerPreset} from 'bui/presenters/dialog`

registerPreset('myPreset', {
	icon: 'plus-circled',
	color: 'blue'
})

Dialog.myPreset({body: 'Cool!'}).modal()
```

## Presenters

After creating a dialog, you must present it. You can render the `dialog` element where you like
or use one of the 3 presenters baked in:

- `.modal(opts)`
- `.popover(target, opts)`
- `.notif(opts)`

#### Promise Based

The presenters are promise based that resolve when closed or a button is clicked.
This allows for using async/await to instead of nested functions (see example below).

## Parts
Certain [parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) have been exposed to allow for style overrides.

- `aside`
- `main`
- `pretitle`
- `title`
- `body`
- `footer`

```css
/* example */
b-dialog::part(footer) {
	background: var(--theme-bgd-accent);
}
```

## Events

### `chosen`
when a button is selected

```html
<b-dialog @chosen=${onBtnChosen}></b-dialog>
```

```js
function onBtnChosen(e){
	e.preventDefault() // stop dialog from closing
	let {btn, dialog} = e.detail
	console.log(btn.label, btn.value)
}
```