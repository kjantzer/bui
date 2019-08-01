Form Control
========================================

# Example

![screenshot](https://i.imgur.com/XcEXhKh.png)

```html
<form-control id="email" material="outline" label="Email">
	<text-field validate="email">test@example.com</text-field>
	<div slot="prefix" class="icon-mail">&nbsp;</div>
	<div slot="help">Please provide your email</div>
</form-control>
```

```js
let control = document.querySelector('#email')

control.addEventListener('change', e=>{
	
	if( control.isValid )
		console.log(control.value);
})
```

## `<form-control>`

Form controls provide a uniform and consistent style for controls (see below)

#### Attributes

- `material` - material UI style (add ="outline" or ="filled" for variant)
- `disabled`
- `label`
- `prefix`
- `suffix`

#### Slots

Slots provide a way to customize the display of the form control

- `label`
- `prefix`
- `suffix`
- `before`
- `help`
- `after`

```html
<form-control>
	<div slot="help">Help text here</div>
</form-control>
```

#### Style Hooks

Some of the CSS styles can be tweaked using these CSS variables

```
--placeholderColor
--selectionBgd
--focusBgd
--focusColor
--bgd
--borderColor
--invalidColor
```

# Controls

Every `form-control` should have one (and only one) control element.

## `<text-field>`

Creates an input-like control. Add `multiline` attribute to make it perform like a text area.

#### Attributes

- `required`
- `multiline`
- `validate="int"` - regexp or preset
- `max="10"` - max length of chars
- `type="date"`
- `reset-invalid`

## `<rich-text-field>`

Similar to the text-field but with quill.js enabled for rich text editing

> NOTE: quill.js doesn't like the shadowDOM  
> NOTE: placeholder is not yet supported

#### Attributes
- `value`

## `<select-field>`

Creates a select field that uses `Menu` and `Popover` to display options.

#### Attributes

- `multiple`
- `chip` - show selected values as "chips"
- `show-empty` - by default, the selected empty value will NOT be shown
- `menu-max-height`
- `menu-align`

```html
<form-control material="filled" label="Select an option">
	<select-field show-empty>
		<optgroup>Header</optgroup>
		<option value selected><i>None</i></option>
		<hr>
		<option value="yes">Yes</option>
		<option value="no">No</option>
	</select-field>
</form-control>
```

The select-field options can also be set programmatically

```js
let selectOptions = [
	{divider: 'Header'}
	{label: 'None', val: ''},
	'divider'
	{label: 'Option 1', val: 1},
	{label: 'Option 2', val: 2}
]

html`<form-control material="filled" label="Select an option">
	<select-field show-empty .options=${selectOptions}></select-field>
</form-control>`
```

## `<check-box>`

#### Attributes

- `checked`
- `label`
- `placement="right"` - placement of label
- `type="switch"`

```html
<form-control>
	<check-box label="Active"></check-box>
</form-control>
```

## `<radio-btn>`

Radio buttons should be nested inside of a `radio-group`

#### Attributes

- `active`
- `label`
- `placement="right"` - placement of label

```html
<form-control material="filled">
	<radio-group>
		<radio-btn value label="Null" active></radio-btn>
		<radio-btn value=0 label="No"></radio-btn>
		<radio-btn value=1 label="Yes"></radio-btn>
	</radio-group>
</form-control>
```

## `<range-slider>`

#### Attributes
- `value`
- `range` - true/false
- `min`
- `max`
- `step` - how much the value should change by
- `label` - auto/show (toggle or always show the value label)

## `<form-handler>`

Wrap this around form controls to sync with a backbone model

```html
<form-handler .model=${this.model} autosave patchsave>
	
	<form-control key="attr_1">
		<!-- .... -->
	</form-control>

	<form-control key="attr_2">
		<!-- .... -->
	</form-control>

</form-handler>
```

You can also choose to save changes in local storage instead of model by using the `store` attribute

```html
<form-handler store="local-store-key">
	<!-- .... -->
</form-handler>
```

#### Attributes

- `autosave` - will save any control changes to the model
- `patchsave` - use with `autosave`; changed values will be synced with `patch:true`
- `store` - a key to save form data in local storage

## `ModelHandler`

> [DEPRECATED] - use `<form-handler>`

```js
let ModelHandler = require('./handler')
```

# Notes

https://github.com/insin/inputmask-core