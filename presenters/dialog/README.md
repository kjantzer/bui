Dialog
==========

> An extensible class for creating dialogs with built-in presets for warnings, errors, success, and prompts.

<!--
<b-btn onclick="Dialog.alert({title: 'Alert Title', msg: 'Message for the alert'}).modal()">Alert</b-btn>
<b-btn onclick="Dialog.success({title: 'Alert Title', msg: 'Message for the alert'}).modal()">Success</b-btn>
<b-btn onclick="Dialog.warn({title: 'Alert Title', msg: 'Message for the alert'}).modal()">Warning</b-btn>
<b-btn onclick="Dialog.error({title: 'Alert Title', msg: 'Message for the alert'}).modal()">Error</b-btn>
-->

## Options

`new Dialog(opts)`

```js
opts = {
	icon:'', // name of icon, custom element, or "spinner" to show a spinner
	title:'',
	msg:'',
	view: null,
	w: null,
	btns:['dismiss'],
	className: ''
}
```

## Properties
The following properties can be changed after the dialog has been created.

- `title`
- `msg`
- `icon`
- `btns`

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