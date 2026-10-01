MARC
=========

Create and decode MARC records. Works in both node.js and browser

> NOTE: this is only setup for bibliographic MARC records

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

### Subsets

Opinionated subset of the MARC record that provides simpiler add methods. Any field can still be added with `.add()`

```js
const {MarcRecordBook} = require(bui`util/marc`)

let marc = new MarcRecordBook({
    // ... leader values
})

// punctuation, indicators, and subfield order are handled for you
marc.lastModified() // 005

marc.fixedLengthData({ // 008
    entered: new Date(),
    date1: 2026,
    date2: 2022, // copyright (type of date is set to `t` when different)
    place: 'oru',
    language: MarcRecordBook.languageCode('English'),
    22: 'e' // material specific positions by start
})

marc.isbn('9798228915534', '(sound recording ;', 'Blackstone Library CD)')
marc.oclcNumber('1616700754')
marc.catalogingSource('BLACP')

marc.lcClassification('PS3566.A822')
marc.deweyClassification('813/.54$223')

marc.mainPerson('Patterson, James,$d1947-', ['author'])
marc.additionalPerson('King, Lorelei', 'narrator')

// 245 (and 246 for the subtitle)
marc.title('The Book Title', {subtitle: 'a subtitle', statement: 'James Patterson'})

marc.edition('Unabridged')
marc.publication('[Ashland, Oregon]', 'Blackstone Publishing', '[2026]')
marc.copyright(2022, {phonogram: true})
marc.physicalDescription(`11 audio discs (${MarcRecordBook.runtime(13.5)})`, 'CD audio, digital', '4 3/4 in.')

marc.performerNote('Read by Lorelei King')

marc.biasac('YOUNG ADULT FICTION / Fantasy / General')
marc.biasac('YOUNG ADULT FICTION / Girls & Women')

marc.keyword('Audiobooks', 'lcgft')
marc.keyword('Fantasy fiction', 'lcgft')

marc.summary('A summary of the book, lots of text here....')
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