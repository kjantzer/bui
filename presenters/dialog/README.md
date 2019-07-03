Dialog
==========

> An extensible class for creating dialogs with built-in presets for warnings, errors, success, and prompts.

## Options

`new Dialog(opts)`

```js
opts = {
	icon:'',
	title:'',
	msg:'',
	view: null,
	w: null,
	btns:['dismiss'],
	className: ''
}
```

## Presets

- `Dialog.confirm()`
- `Dialog.confirmDelete()`
- `Dialog.warn()`
- `Dialog.error()`
- `Dialog.success()`
- `Dialog.prompt()`

## Presenters

After creating a dialog, you must present it. You can render the `dialog.el` where you like
or use one of the 3 presenters (preferred) baked in:

- `.modal(opts)`
- `.popover(target, opts)`
- `.notif(opts)`

## Promise Based

The presenters are promise based that resolve when closed or a button is clicked.
This allows for using async/await to instead of nested functions (see example below).

## Examples

```js
Dialog.warn({title: 'Invalid Product', msg: 'The ID given is not a valid product'}).modal()
Dialog.success().notif()

let val = await Dialog.prompt().modal()
console.log(val)
```