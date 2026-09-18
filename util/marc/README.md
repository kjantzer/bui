MARC
=========

Create and decode MARC records. Works in both node.js and browser

## Creating

Tags can be added out of order; the tags will be put in proper order when `.toMarcData()` or `.encode()` is used

```js
import {MarcRecord} from 'bui/util/marc'

// begin a new marc record with values for the leader
let marc = new MarcRecord({
    5: 'n', // Record status [New] //TODO: Will need to be reevaluated when "Full" records are generated
    6: 'a', // Type of record (a=print book, g=dvd, i=audio cd)
    7: 'm', // Bibliographic level [Monographic / Item]
    9: 'a', // Character coding scheme (unicode)
    17: 'a', // Encoding level [Less Than Full / Full]
    18: 'a', // Descriptive cataloging form [AACR 2]
})

// then add tags as needed

// tag added with raw value
marc.add('001', 'controlNum1')
marc.add('003', 'controlNumIdentifier1')
marc.add('005', 'dateLastModified')

// tag with position value
// each key is the start of the position (even if the position may be for a range, ie: for 8-10 -> 8:'some value')
marc.add('007', {
    0: 'v', // videorecording
    1: 'd', // disc
    3: 'c', // multicolored
    4: 'v' // dvd
})

// tag no indicators given, only subfields
marc.add('010', [
    ['a', 'lcControlNum'],
])

// tag with subfields and indicators specified
// this asumes indicator 2 is empty
// [,0] for empty indicator 1 and 2 filled
// or [0, 4] for both
marc.add('490', [0], [ // series statement
    ['a', 'The Series name'],
    ['v', '1']
])

// tag with both indicators and subfields
marc.add('082', [0, 4], [ // Dewey Number
    ['a', '813.6'], // Classification number
    ['2', '23'] // edition statement: "print on demand"
])

// repeated tags
marc.add('655', [,7], [
    ['a', 'Audiobooks'],
    ['2', 'lcgft']
])

marc.add('655', [,7], [
    ['a', 'Fantasy fiction'],
    ['2', 'lcgft']
])

```

## Decoding

```js
import {MarcRecord} from 'bui/util/marc'

// node.js
let buffer = fs.readFileSync(file)

// browser
let file = uploader.files[0]
let buffer = await file.arrayBuffer()

// decode the data to a marc record object
let marc = new MarcRecord(buffer)

let recordStatus = marc.get('leader').get(5).val
let controlNum = marc.get('001').val
let firstKeyword = marc.get('655').get('a').val
let allKeywords = marc.get('655', {all: true}).map(m=>m.get('a').val)
```

> NOTE: more docs needed on how to retreive results