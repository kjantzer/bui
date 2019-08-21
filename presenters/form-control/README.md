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

<!--
<form-control label="Text Field" material>
	<text-field></text-field>
</form-control>

<form-control label="Text Field" material>
	<text-field type="date"></text-field>
</form-control>
-->

#### Attributes

- `required`
- `multiline`
- `validate="int"` - regexp or preset
- `max="10"` - max length of chars
- `type="date"`
- `reset-invalid`
- `placeholder`

## `<rich-text-field>`

Similar to the `text-field` but with [quill.js](https://quilljs.com) enabled for rich text editing.

The field will also auto convert some special characters (such as 3 periods to an ellipsis) using
`util/autoFormat`

<!--
<form-control label="Rich Text Field" material style="width: 100%">
	<rich-text-field></rich-text-field>
</form-control>
-->

#### Attributes
- `value`
- `placeholder`

> NOTE: current quill.js doesn't like the shadowDOM so we are using a forked version
> that has changes made to work inside the shadowDOM; however, the changes
> may still have some issues in certain browsers – see https://github.com/quilljs/quill/pull/2337

## `<select-field>`

Creates a select field that uses `Menu` and `Popover` to display options.

<!--
<form-control label="Select Field" material>
	<select-field>
		<option value="">–</option>
		<option value="1">Value 1</option>
		<option value="2">Value 2</option>
	</select-field>
</form-control>
-->

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

<!--
<check-box label="Active"></check-box>
-->

## `<radio-btn>`

Radio buttons should be nested inside of a `radio-group`

<!--
<radio-group>
	<radio-btn label="Male"></radio-btn>
	<radio-btn label="Female"></radio-btn>
</radio-group>
-->

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
- `no-grid-area` - disable auto grid-area names


# Notes
- TODO: fix rich-text-fild relying on `util/htmlCleaner`
- TODO: range-slider has issues when nested in certain elements
- IDEA: https://github.com/insin/inputmask-core