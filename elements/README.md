# BUI Custom Elements

## `<b-paper>`

A white box with rounded corners and a shadow.

#### Attributes
- `color` - blue, green, red, orange, yellow, purple
- `border` - only if a color is set
- `dense` - less padding
- `compact` - no padding
- `empty` - no background and a dashed border
- `outline` - no shadow, just border

## `<b-btn>`

Replaces "Basic Buttons"

#### Attributes
- `icon`
- `color`
- `outline`
- `text` - no button outline until hover
- `clear`
- `pill`

#### Properties
- `spin` - set to `true` to show a spinner

## `<b-icon>`

Display an svg icon

```html
<b-icon name="user"></b-icon>
<b-icon name="cog"></b-icon>
```

## `<b-hr>`
A line divider

#### Attributes
- `short` - makes the line short (not full width)
- `vert` - changes to a vertical line

## `<b-sub>`
A subdued (or sub text) text element that is slightly smaller and lighter in color

## `<b-label>`

Default is an uppercase, bold, and slightly subdued (gray) text block for labeling.
Can be altered to display as filled, outlined, or as a badge.

#### Attributes
- `xs` - xtra small
- `sm` - small
- `lg` - large
- `filled`, `filled="color"`
- `badge`, `badge="color"`
- `outline`, `outline="color"`

## `<b-empty-state>`

Use to show a message when a view is empty. **NOTE:** make sure the parent 
element has `position:relative` (or absolute)

#### Attributes
- `xs` - xtra small
- `sm` - small
- `md` - medium
- `lg` - large
- `static` - removes absolute pos and 100% height

## `<b-spinner>`

An animated circle spinner to represent progress

## `<b-spinner-overlay>`

Shows an overlay over the parent element with a `b-spinner` and optional label

>**Note:** if the spinner is at the top level of a shadowroot, it will link itself
> to the host element as `host.spinner`

#### Attributes
- `show`
- `label`

## `<b-uploader>`

Lets files be dropped onto an element.

Watches for files to be dragged over it's parent element;
shows help text to let user know they can drop the file; shows upload progress.

Views should hook into the `change` event to test for valid files, make the user
confirm (optional), and then instruct the uploader to upload the selected files.

Example usage

```html
<b-uploader accept="image/*" multiple placeholder="Drop to upload images"></b-uploader>
```

```js
let uploader = document.querySelector('b-uploader')
uploader.addEventListener('change', e=>{
    
    if( e.detail.invalid ){
        return console.log(e.detail.invalid)
    
    uploader.upload({url:'/api/upload'}).then(resp=>{
        console.log('upload finished with resp:', resp)
    })
})

// a native OS file picker can be opened too
uploader.chooseFile()
```

#### Attributes
- `disabled`
- `accept` - same syntax as [input[type="file"]](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
- `multiple`
- `placeholder` - the text to display when dragging file over
- `url` - where to upload the file (optional if setting in `.upload()` method)
- `auto-upload` - url must be set for this to work

#### Methods
- `.chooseFile()` - opens the browser exploer for choosing a file
- `.upload({url='', method='POST', fileKey='file', formData={}})`
    - `url` must be set as an attribute or given to the `upload` method

#### Events
- `change` - when files are selected (via selection or drop)
- `upload` - when all selected files finish uploading

#### Styles
- `--hoverBgd`
- `--uploadingBgd`
- `--progressBgd`

## `<b-timer>`

Displays a runnning timer

#### Attributes
- `time` - current time in milliseconds
- `ms` - whether to show milliseconds
- `running` - should the timer be progressing