# Grouping

A system for complex and nested grouping of data

## GroupedData

Provides a structure for grouping and calculating data
- grouped data can be grouped further
- the chain is maintained and provides pathName and pathValue for knowing level

```js
import GroupedData from 'bui/util/grouping/groupedData'

let data = [/*array of models */]
let group = new GroupedData(data, {name, settings})
```