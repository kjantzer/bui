const { XMLParser } = require('fast-xml-parser')
const CollMap = require(`../collmap`)
const Elements3 = require('./specs/elements-3.0')
const Elements2 = require('./specs/elements-2.1')

 // per docs, if format not given, default is `YYYYMMDD`
function formatDate(val, format="YYYYMMDD"){

    let map = {
        'YYYYMMDD': [/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'],
        'YYYYMM': [/(\d{4})(\d{2})/, '$1-$2']
    }

    format = map[format]
    if( format ){
        val = String(val).replace(format[0], format[1])
    }
    
    return val
}

class Onix extends CollMap {

    static async parse(xml, opts){ return onixParse(xml, opts) }

    constructor(data, {name='ONIX', element, release, parent, level=0, index, raw}={}){

        if( data.ONIXmessage )
            data = data.ONIXmessage
        
        super(data)

        if( level == 0 ){            
            this.release = release || data?.['@_release'] || '3.0'
            this.elements = this.release == '2.1' ? Elements2 : Elements3
        }

        this.name = name
        this.element = element
        this.level = level
        this.index = index
        this.parent = parent
        this.raw = raw

        if( this.has('#text') ){
            let val = this.get('#text')

            if( element?.name == 'Date' )
                val = formatDate(val, element?.formatList[this.get('@_dateformat')]?.value)

            this.set('value', val)
        }

        if( this.has('value') ){
            // nothing else to do, keep values as they are
        }
        else{
            let mapped = {}

            this.forEach((d,k)=>{

                // ignore attributes
                if( k?.[0] == '@' ) return
                
                let element = this.top.elements.getTag(k)

                if( typeof d != 'object' )
                    d = {value:d}

                if( Array.isArray(d) )
                    d = OnixArray.from(d.map((d,i)=>{

                        if( typeof d != 'object' )
                            d = {value: d}

                        return new Onix(d, {
                            name: k, element, 
                            parent: this, 
                            level: this.level+1,
                            index: i
                        })
                    }))
                else
                    d = new Onix(d, {
                        name: k, element, 
                        parent: this, 
                        level: this.level+1
                    })

                // if( k == 'a001')
                //     this.set('a001', d)
                // else
                //     this.set(k, d)
                
                // console.log(element?.name||k);
                mapped[element?.shortTag||k] = d
                

                // this.root.flatLookup.set(k, d)
            })

            this.clear()
            this.set(mapped)
        }
    }

    value(opts){
        return this.element?.valueOf(this.get('value'), opts) || this.get('value')
    }

    get(key){
        // support dotnotation
        let keys = key.toLowerCase().split('.')
        key = keys.shift()

        // get the tag element object so we can fetch using the standardized shortName
        let element = this.top?.elements?.getTag(key)

        // attemp to get the item
        let resp = super.get(element?.shortTag||key)

        // we got a single element, but was expecting to grab first in array
        // so by-pass that logic...we already have the first (only) item
        if( !Array.isArray(resp) && keys.length > 0 && keys[0] === '0' )
            keys.shift()

        // if got an array of elements, but not requesting which one next, assume the first one
        else if( Array.isArray(resp) && keys.length > 0 && !keys[0].match(/^\d+$/) )
            resp = resp[0]

        keys = keys.join('.')
        
        // looks like we have further dotnotation to follow
        if( keys && resp)
            return resp.get(keys)
        else
            return resp
    }

    getValue(key, opts){
        return this.get(key)?.value(opts)
    }


    // get the top/root of the whole onix msg
    get top(){ return this.root }
    get root(){
        let root = this.parent || this
        while(root?.parent){
            root = root.parent
        }
        return root
    }

    get path(){
        let path = [this]
        let obj = this
        while(obj?.parent){ 
            obj = obj.parent
            path.unshift(obj)
        }
        return path
    }

    get pathName(){ return this.path.map(d=>d.name) }

    toJSON(opts={}){
        let o = {}

        this.forEach((d,k)=>{

            k = opts.shortTags ? k : d.element?.name||k
            
            if( d.has?.('value') ){
                d = opts.codes ? d.get('value') : d.value(opts)
            }

            if( d.toJSON ) d = d.toJSON(opts)

            o[k] = d
        })

        return o
    }
}

// will contain an array of Onix objects
class OnixArray extends Array {

    value(opts){ return this[0]?.value(opts) }

    get(key){

        if( typeof key == 'object' )
            return this.find(key)

        let keys = key.split('.')
        key = keys.shift()
        keys = keys.join('.')

        let resp =  this[key]

        if( keys && resp)
            return resp.get(keys)
        else
            return resp
    }

    getValues(key, filterFn, {one=false}={}){

        if( filterFn && one )
            return this.find(filterFn)?.getValue(key)
        if( filterFn )
            return this.filter(filterFn).map(d=>d.getValue(key))

        return this.map(d=>d.getValue(key))
    }

    getValue(key, filterFn){ return this.getValues(key, filterFn, {one:true})}

    filter(fn){
        // given object of values to test each element against
        if( typeof fn == 'object'){
            let matchValues = fn

            fn = function(d){
                let matches = true

                for( let k in matchValues){

                    let element = d.get(k)

                    // onix doesn't shouldn't have real boolean values, so if filtering by it
                    // assume we just want to check for existance (or lack thereof)
                    // ie: "MainSubject" element
                    if( typeof matchValues[k] == 'boolean' ){
                        if( !!element != !!matchValues[k] )
                            matches = false

                    }else if( !element ){
                        matches = false
                    
                    }else if( element.value() != matchValues[k] && element.get('value') != matchValues[k] )
                        matches = false 
                }
                return matches
            }
        }

        return super.filter(fn)
    }

    find(fn){ return this.filter(fn)[0]}

    toJSON(opts){
        return this.map(d=>d.toJSON?.(opts)||d)
    }
}

module.exports = {Onix, OnixArray}

/*
    Onix Parse

    Given a sting of XML, parse to JSON, then format to Onix objects
*/
async function onixParse(xml, opts={}){

    // Chunk data...
    // split xml by starting product tag so we can chunk parsing
    // doing this to potentially allow for faster processing? 
    // rather than wait for all products to be parsed before doing anything with the data
    xml = xml.toString().split('<product>')
    
    // create a basic onix message with should only contain a "header"
    let onix = xml.shift()
    onix += '</ONIXmessage>'

    // put back starting product tag on all products
    let products = xml.map(s=>'<product>'+s)
    
    const parser = new XMLParser({
        ignoreDeclaration: true, // dont care about <?xml> tag
        ignoreAttributes: false, // we want to capture `release` and `dateformat` attributes
        numberParseOptions: {
            leadingZeros: false, // keep values like "01" as a string
        },
        isArray: (name, jpath, isLeafNode, isAttribute) => {
            // always return products as an array
            // TODO: possibly add more elements here?
            return ['product', 'relatedproduct'].includes(name.toLowerCase())
        }
    });

    let xmlStr = parser.parse(onix)
    onix = new Onix(xmlStr, {raw: xmlStr})
    onix.set('product', new OnixArray())

    for( let i in products ){

        if( opts.limit && i >= opts.limit ) return

        // xml string to JSON data
        let xmlStr = products[i]
        let data = parser.parse(xmlStr)

        let product = new Onix(data, {
            parent: onix,
            level: onix.level+1,
            index: i,
            raw: xmlStr // make optional?
        })?.get('product.0')

        onix.get('product').push(product)

        if( opts.process ){
            await opts.process(product)
            
            // reset array of products (to attempt better memory management)
            onix.get('product').length = 0
        }
    }

    return onix
}