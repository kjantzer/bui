Util
========

## `AJAX`
A wrapper around [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) to simplify and provide async/await. 

> `fetch` is a good solution most of the time, but does not provide progress.

```js
let formData = new FormData()

formData.set('file', FileObject)

new AJAX(method, url)
.on('progress', e=>{
    let progress = Math.round(e.loaded / e.total * 100)
    console.log(progress)
})
.send(formData)
.then(resp=>{
    console.log(resp)
})
```

The `.on` method provides a chainable version of `target.addEventListener`

```js
new AJAX(method, url)
.on('loadstart', handler)
.on('progress', handler)
.send()
```

## Background Resume

```js
import 'bui/util/background-resume'

window.addEventListener('background-resume', e=>{ /*do something*/ })
```

iOS devices (untested on Android) stop processing JS
when backgrounded for a few seconds (10-20 in my testing)

When the browser is reopended, safari resumes with the JS "state"
intact but since time was essentially frozen, no updates (long poll)
would have been made or received (websocket).

It may be important to trigger a refresh of data when resuming 
from the background; this script enables such a function.

## `colorScheme`
Detect OS level [color schemes](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) and react to changes. You can do this with CSS, this utilty is for use in JS if needed

```js
import { colorScheme } from 'util/device'

colorScheme.isDarkMode
colorScheme.isLightMode
colorScheme.isSupported

colorScheme.onChange(mode=>console.log(mode))
```

## `device`
Some simple device detection
```js
import device from 'util/device'

device.is_ios
device.is_android
device.is_mobile
```

## `normalizeText`
Converts strings to some special characters, such as three periods to an ellipsis
```js
let str = normalizeText(str)
```

## `pick`

```js
let newObj = pick({first:'name', last:'name}, ['first'])
```

## `Promise.series`
Perform a set of promise tasks in series (waiting to complete until moving on to the next)
```js
import 'util/promise.series' // import once

Promise.series([task1, task2, task3], task=>{
    await task()
})

// return `false` at any time to cancel the series
Promise.series([task1, task2, task3], (task,i)=>{
    if( i > 0 ) return false // cancel the series
    await task()
})
```

## `sortString`
Moves the leading article to the end (also strips leading and trailing quotes)
```js
sortString('The Book Title') // Book Title, The
sortString('"A Book Title"') // Book Title, A

// disable quote strip
sortString('"A Book Title"', false) // "A Book Title"
```

## `titleize`
Converts underscores and dashes to spaces and then capitlizes each word
```js
let str = normalizeText('my_string') // My String
```

## `store`
Simplified method for using [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage); automatically encodes and decodes JSON.
```js
store(key, val)

// set
store('my-setting', {some:'setting', another:'setting'})

// get
let mySetting = store('my-setting')

// clear
store('my-setting', null)
```

## `sum`
Wrapper around `Array.reduce` for summing the values in an array.
Will automatically be added to the prototype of Array
```js
import 'util/sum' // only needs to be done once

[1,2].sum() // = 3
[{val:1}, {val: 2}].sum(o=>o.val) // = 3
```

## `wait`
Promise based setTimeout
```js
await wait(ms) // default is zero which will let the event loop finish
await wait(1000) // wait 1 second
```

## `toCSV`
Convert an array of data to a CSV string (or tab delimited)
```js
let data = [{title: 'title 1', info: 'info'}, {title: 'title 2', info: 'info'}]
let csvData = toCSV(data, {title: 'My Data'})
```

>The array of data can also contain backbone models or custom objects that implement `toCSV` or `toJSON`

##### Options
- `delimiter: ','`
- `newline: "\n"`
- `title: ''` - title at the top of the csv data
- `description: ''` - similar to title ^ 
- `header: true` - show header row?

##### Downloading
You can use `util/download` to download your csv data to a file

```js
import {downloadCSV} from 'bui/util/download'
downloadCSV(csvData)
downloadCSV(csvData, 'custom-file-name.csv')
```

## `csvToArray`
Convert a CSV string to an array
```js
let data = csvToArray(str)
```

## `range`


## `readFile`
Read a [file](https://developer.mozilla.org/en-US/docs/Web/API/File) to text (async)
```js
let text = await readFile(file)
```

## Touch Events

`bindLongpress`  
Mobile/touch devices do not have right+click abilities. In many cases, a long press can
be good alternative. By default, `bindLongPress` will trigger a `contextmenu` event
after the user has touched down for `500ms` without dragging.

```js
import {bindLongpress} from 'bui/util/touch-events'

bindLongpress(el) // use defaults
bindLongress(el, {
    touchOnly: true, // change to false if you want to watch for mouse long press too
    event: 'contextmenu', // (default) what event to fire after long press
    delay: 500 // (default) how long until triggering event
})
```