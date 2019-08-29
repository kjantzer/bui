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

