# ONIX

Reads and parses ONIX files

The `Onix` class expects to be given a JSON representation of the ONIX file. It is best to use `parse` method to get this (which uses `fast-xml-parser`).

```js
import {Onix} from 'bui/util/onix'

// get contents of xml file as a string
let onixXmlString = file.data.toString()

await Onix.parse(onixXmlString, {
    captureRaw: true, // keeps raw xml for each product
    createHash: false, // should each product xml be hashed?
    limit: null, // set to only process some of the products

    progress(msg, {i, total}){ 
        // log or forward progress
    },
    preprocess: async (onix, products) =>{
        // before processing a anything
    },
    // process each product so we dont ever keep all of them in memory
    // we'll keep up to chunkSize and then insert before moving on
    process: async (product)=>{
        // actually do something with the product data
        console.log(product.get('RecordReference'))
    }
})
```

> NOTE: AI was used to create the nested definition of elements (components) and the codelists. There could be errors. Common data has mostly been vetted. 3.0 does not list all `repeatable` elements as it ideally should.

If you omit the `process` function, `parse` will return the root `Onix` object with all products parsed. If parsing a large file, it is best to use the `process` function so that the entire file is not kept in memory.

```js
let onix = await Onix.parse(onixXmlString)

console.log(onix.get('product').length)

onix.get('product').forEach(product=>{
    console.log(product.get('RecordReference'))
})
```

## Using the Onix object

The onix object nests each subset of data (component) as another instance of the onix class. This allows for chaining of data.

The data can be retrieved with short or standard tag names. For values that are coded, the code or value can be used.

```js
let product = onix.get('product.0')

product.is2 // 2.1 onix
product.is3 // 3.0 onix

product.get('RecordReference')
product.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'ISBN-13'})
product.getValue('DescriptiveDetail.TitleDetail.TitleElement.Subtitle')

// human readable output of all data
product.toJSON()

// use short tags and codes
product.toJSON({shortTags: true, codes: true})

// NOTE: this is not 100% perfect. In particular it does not allow for setting the header
product.toXML() // string
```

## Product Model

A special `OnixProductModel` class is available to make it easier to access and work with the product data. It handles the differences between ONIX 2.1 and 3.0 (mostly) and provides a few additional helper methods. It is opionated for use at Blackstone.

```js
import {OnixProductModel} from 'bui/util/onix'

let product = onix.get('product.0')

let model = new OnixProductModel(product)

model.recordID // 9780316033863
model.isbn13 // 9780316033863
model.isbn10 // 0316033864
model.title // The Great Gatsby
model.subtitle // A Novel
model.releaseDate // 2012-05-10
model.price
// see the file for all available methods

// most methods have setters as well
model.title = 'New Title'
model.isbn13 = '9780316033864'
model.price = 12.99
model.credits = {
    name: 'John Doe',
    roles: ['A01'],
    bio: 'The bio for this person'
}
```
