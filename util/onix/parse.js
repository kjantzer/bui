/*
    Onix Parse

    Given a sting of XML, parse to JSON, then format to Onix objects
*/
const { XMLParser } = require('fast-xml-parser')
const createHash = require('../createHash')
const Onix = require('./onix')
const OnixArray = require('./onix-array')
// const Elements3 = require('./specs/elements-3.0')
const Elements2 = require('./specs/elements-2.1')
const chunk = require('../array.chunk')


async function parse(xml, opts={}){

    opts = {
        captureRaw: true,
        createHash: false,
        progress: null,
        // limit: 10,
        ...opts
    }

    function progress(){
        if( opts.progress && typeof opts.progress == 'function' ) opts.progress(...arguments)
    }

    // Chunk data...
    // split xml by starting product tag so we can chunk parsing
    // doing this to potentially allow for faster processing? 
    // rather than wait for all products to be parsed before doing anything with the data
    xml = xml.toString().replace(/<\/ONIXmessage>/i, '').split(/<product>/i)
    
    // create a basic onix message with should only contain a "header"
    let onix = xml.shift()
    onix += '</ONIXmessage>'

    // put back starting product tag on all products
    let products = xml.map(s=>'<product>'+s)
    let repeatableElements = Elements2.flatLookup.filter(d=>d.get('repeatable')).map(d=>d.get('shortTag'))

    // FIXME:
    repeatableElements.push(...['product', 'relatedproduct', 'supportingresource', 'textcontent', 'othertext', 'subject'])
    
    const parser = new XMLParser({
        ignoreDeclaration: true, // dont care about <?xml> tag
        ignoreAttributes: false, // we want to capture `release` and `dateformat` attributes
        numberParseOptions: {
            leadingZeros: false, // keep values like "01" as a string
        },
        isArray: (name, jpath, isLeafNode, isAttribute) => {
            // always return some elements as an array
            // TODO: possibly add more elements here?
            // TODO: elements should have value for "many" and then that should be used to create this list

            return repeatableElements.includes(name.toLowerCase())
        }
    });

    progress('parsing header', {total: products.length})

    let onixMsg = await parser.parse(onix)
    onix = new Onix(onixMsg, {raw: onix})
    onix.set('product', new OnixArray())

    if( opts.preprocess )
        await opts.preprocess(onix, products, opts)

    for( let i in products ){

        if( opts.limit && i >= opts.limit ) break

        progress(`parsing product`, {i, total: products.length})

        // xml string to JSON data
        let xmlStr = products[i]
        let data = await parser.parse(xmlStr)
        let hash = null

        if( opts.createHash ){
            // progress(`creating hash of product`, {product: i})
            hash = await createHash(xmlStr)
        }
        
        // progress('converting to ONIX framework', {product: i})
        let product = new Onix(data.product[0], {
            name: 'product',
            parent: onix,
            level: onix.level+1,
            release: onix.release,
            index: i,
            raw: opts.captureRaw ? xmlStr : null,
            hash
        })

        onix.get('product').push(product)

        if( opts.process ){
            await opts.process(product, {i})
            
            // reset array of products (to attempt better memory management)
            onix.get('product').length = 0
        }
    }

    return onix
}


async function split(xml, {size=1000, num, cb}={}){

    xml = xml.toString().replace(/<\/ONIXmessage>/i, '').split(/<product>/i)
    
    // create a basic onix message with should only contain a "header"
    let onixStart = xml.shift()
    let onixEnd = '</ONIXmessage>'

    // put back product start tag
    let products = xml.map(s=>'<product>'+s)

    if( num )
        size = Math.ceil(products.length/num)
    else size = parseInt(size)

    let output = []

    await chunk.call(products, async (chunk, i)=>{
        // TODO: option to return as json?
        let numProducts = chunk.length
        chunk = onixStart+chunk.join(`\n`)+onixEnd
    
        if( cb ){
            await cb(chunk, i, numProducts)
            output.push(i)
        }
        else output.push(chunk)

    }, {size})

    return cb ? output.length : output
}

Onix.parse = function(xml, opts){ return parse(xml, opts) }
Onix.split = function(xml, opts){ return split(xml, opts) }

module.exports = parse