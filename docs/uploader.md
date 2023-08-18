# Uploader

Lets files be dropped onto an element.

```html
<b-uploader></b-uploader>
```

<!--
Drag a file and drop it here
<b-uploader></b-uploader>
-->

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
- `upload-done` - when all selected files finish uploading

#### Styles
- `--hoverBgd`
- `--uploadingBgd`
- `--progressBgd`

#### Server Side
The `totalFiles` and `fileNum` will be passed along with each uploaded file. You can compare these values to determine when the last file is uploaded