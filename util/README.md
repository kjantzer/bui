Util
========

## `normalizeText`
Converts strings to some special characters, such as three periods to an ellipsis
```js
let str = normalizeText(str)
```

## `titleize`
Converts underscores and dashes to spaces and then capitlizes each word
```js
let str = normalizeText('my_string') // My String
```

## `Promise.series`
Perform a set of promise tasks in series (waiting to complete until moving on to the next)
```js
import 'util/promise.series' // import once

Promise.series([task1, task2, task3], task=>{
    await task()
})
```

## `device`
Some simple device detection
```js
import device from 'util/device'

device.is_ios
device.is_android
device.is_mobile
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

#### Options
- `delimiter: ','`
- `newline: "\n"`
- `title: ''` - title at the top of the csv data
- `description: ''` - similar to title ^ 
- `header: true` - show header row?

#### Downloading
Use something like [file-saver](https://github.com/eligrey/FileSaver.js) to download the csv
```js
import {saveAs} from 'file-saver'
let blob = new Blob([csvData], {type:'text/csv'});
saveAs(blob, 'filename.csv')
```

## `csvToArray`
Convert a CSV string to an array
```js
let data = csvToArray(str)
```

## `readFile`
Read a [file](https://developer.mozilla.org/en-US/docs/Web/API/File) to text (async)
```js
let text = await readFile(file)
```

