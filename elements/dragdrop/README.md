# Dragdrop

Make the parent element (or custom target) draggable and/or a dropzone

If `.target` isn't set, the parentElement will be used

```html-preview
<div style="position:relative">
    Drag and drop me in the browser url bar
    <b-dragdrop url="https://example.com/"></b-dragdrop>
</div>
```

#### Events

The events use `willTakeAction`, allowing for cancelling/disallowing the actions (with the exception of `leave`)

```js
// react to any of the vents
dragdropEl.addEventListener('will-take-action', e=>{

    let {action} = e.data

    if( action.name == 'dragged' )
        action.data = {add: 'more data to be used by dropzones'}

    // cancel the action over a partiuclar dropzone
    if( action.name == 'enter' )
        action.allowed = false

})

// or setup listner for specific action
dragdropEl.addEventListener('dragged', e=>{})
```

`dragged` - dragging started

The following events require `drop` attribute on the `b-dragdrop` element

`enter` - dropzone was entered

`leave` - dragzone was left

`dropped` - dragzone

#### DataTransfer

The native drag/drop api can use DataTransfer to transfer data types to other apps or views.

```js
import {dataTransfer} from 'bui/elements/dragdrop'

dataTransfer.plainText(action.evt, 'plain text')
dataTransfer.downloadURL(action.evt, 'url-to-file')
dataTransfer.downloadContent(action.evt, 'filename.txt', 'some content')

// see https://json-ld.org/ and https://schema.org/
dataTransfer.jsonLD(action.evt, type, data)
```