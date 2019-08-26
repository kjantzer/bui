Util
========

## normalizeText
Converts strings to some special characters, such as three periods to an ellipsis
```js
str = normalizeText(str)
```

## titleize
Converts underscores and dashes to spaces and then capitlizes each word
```js
str = normalizeText('my_string') // My String
```

## wait
Promise based setTimeout
```js
await wait(ms) // default is zero which will let the event loop finish
await wait(1000) // wait 1 second
```