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

### Dialog.spinner()
Spinner with no content

### Dialog.waiting()
Show a spinner with a title

### Dialog.alert()
Basic alert

### Dialog.warn()
Orange warning icon

### Dialog.error()
Red alert icon

### Dialog.fatal()
Red fatal icon with a red dialog box

### Dialog.success()
Green ok icon

### Dialog.confirm()
Confirm with user of continuation

### Dialog.confirmYes()
Confirm with user with cancel/yes buttons

### Dialog.confirmDelete()
Confirm with user with cancel/delete buttons

### Dialog.prompt()
Use this preset to prompt a user for some input. Single and multiple user input is supported via inputs, selects, and checkboxes. Many of the attributes available to `form/controls` are available when creating prompts.

```js 
let opts = {
	key: 'prompt-'+i,
	val: '',
	type: '', // text-field type, or `switch` for boolean switch
	options: null, // select-field used if set
	prefix: '',
	suffix: '',
	pattern: '',
	html: false,
	required: false,
	label: '',
	placeholder: '',
	helpText: '',
	w: false,
	multiline: false,
	// will focus first item
	// set to `autoFocus: 'select' to select all text in first input
	autoFocus: true
}
```

Some examples

```js
let value = await Dialog.prompt({
	title: 'Your name',
	placeholder: 'Name',
}).modal()

console.log(`Your name is ${value}`)

let values = await Dialog.prompt({
	title: 'Account Info',
	prompts: [
		{key: 'name', label: 'Name'},
		{key: 'email', label: 'Email', pattern: 'email', placeholder: '(optional)'},
		{key: 'gender', label: 'Gender', options: [{label: 'Unset', val: ''}, 'Male', 'Female']}
	]
}).modal()

if( values )
	let {name, email, gender} = values
```

### Custom
You can register your own presets if you have dialog patterns you use a lot

```js
import {registerPreset} from 'bui/presenters/dialog'

registerPreset('myPreset', {
	icon: 'plus-circled',
	color: 'blue'
})

Dialog.myPreset({body: 'Cool!'}).modal()
```

## Button Presets
The `btns` option accepts string button presets. The defaults are:

```js
buttonPresets = {
	'dismiss': {label: 'Dismiss', doesCancel:true},
	'cancel': {label: 'Cancel', doesCancel:true},
	'no': {label: 'No', doesCancel:true},
	'done': {label: 'Done'},
	'apply': {label: 'Apply', color: 'theme'},
    'undo': {label: 'Undo', color: 'theme'},
	'ok': {label: 'Okay', color: 'theme'},
    'continue': {label: 'Continue', color: 'theme'},
	'yes': {label: 'Yes', color: 'theme'},
	'save': {label: 'Save', color: 'theme'},
	'create': {label: 'Create', color: 'theme'},
    'submit': {label: 'Submit', color: 'theme'},
    'upload': {label: 'Upload', color: 'theme'},
	'delete': {label: 'Delete', color: 'red'},
	'x': {label: '', icon:'cancel-1', doesCancel:true},
    '...': {label: '', icon:'dot-3'}
}

// example:
Dialog.alert({btns: ['cancel', 'upload']}).modal()
```

### Custom button presets
If you have a specifc button you use a lot, you can register your own preset

```js
import {registerPreset} from 'bui/dialog/btn'

registerPreset('nah', {label: 'Nah', doesCancel:true, color: 'red'})

Dialog.alert({btns: ['yes', 'nah']}).modal()
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
	- `header`
		- `pretitle`
		- `title`
	- `body-wrap`
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