const CollMap = require(`../collmap`)
const OnixArray = require('./onix-array')
const {formatDate} = require('./util')
const {XMLBuilder} = require('fast-xml-parser')
// const parse = require('./parse')

const Elements3 = require('./specs/elements-3.0')
const Elements2 = require('./specs/elements-2.1')

class Onix extends CollMap {

    formatDate(){ return formatDate(...arguments) }

    set(key, val){

        // got a single string/number with no "key", so treat as the {value}
        if( val === undefined && typeof key !== 'object' ){
            val = key
            key = 'value'
        }

        // if we got an object of {#text}, then treat that as the {value}
        if( key['#text'] ){
            val = key['#text']

            // TODO check this
            if( this.element?.name == 'Date' )
                val = formatDate(val, this.element?.formatList[key['@_dateformat']]?.value)

            key = 'value'
        }

        // when we have the value, save as simple string...no other conversino needed
        if( key == 'value' ){

            // swap value for the "code" if this component is supposed to be code based
            if( this.element?.codeList && !this.element.codeList[val] ){

                for( let k in this.element.codeList ){
                    if( this.element.codeList[k].value == val ){
                        val = k
                    }
                }
            }

            return super.set(key, val)
        }

        // got object as single arg, process each key/value
        let args = arguments
        if( args.length == 1 && typeof args[0] == 'object' ){
            for( let key in args[0] ){
                this.set(key, args[0][key])
            }
            return
        }

        let keys = Array.isArray(key) ? key : key.split('.')
        key = keys.shift()

        // ignore attributes (as parsed by XMLParser)
        if( key?.[0] == '@' ) return

        let props = this.createProps(key)
        let onixVal = this.get(props.key)
        
        if( Array.isArray(val) )

            if( onixVal )
                onixVal.push(...val.map((d,i)=>new Onix(d, {...props, index: i+onixVal.length})))
            else
                onixVal = OnixArray.from(val.map((d,i)=>new Onix(d, {...props, index: i})))

        else if( props.element?.get('repeatable') ){
            
            if( onixVal )
                onixVal.push(new Onix(val, {...props, index: onixVal.length}))
            else
                onixVal = new OnixArray(new Onix(val, {...props, index: 0}))

        }else {

            if( keys.length ){
                onixVal ||= new Onix({}, props)
                onixVal.set(keys, val)
            }else if( onixVal )
                onixVal.set( Array.isArray(onixVal) ? new Onix(val, props) : val)
            else
                onixVal = new Onix(val, props)
        }

        super.set(props.key, onixVal)

        return onixVal
    }

    createProps(key){

        key = key.toLowerCase() // standardize on lowercase

        let element = this.top.elements.getTag(key)
        let props = {
            name: key,
            element,
            parent: this, 
            release: this.release,
            level: this.level+1,
            key: element?.shortTag || key
        }

        return props
    }

    get(){
        return super.get(...arguments)
    }

    constructor(data, {name='ONIXMessage', element, release, parent, level=0, index, raw, hash}={}){

        if( data.ONIXmessage )
            data = data.ONIXmessage
        if( data.ONIXMessage )
            data = data.ONIXMessage
        
        super()

        if( level == 0 ){            
            release = release || data?.['@_release'] || '2.1'
            this.elements = release == '2.1' ? Elements2 : Elements3
        }

        this.name = name
        this.element = element
        this.level = level
        this.release = release 
        this.index = index
        this.parent = parent
        this.raw = raw
        this.hash = hash

        this.set(data)
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

    getArray(key){
        let val = this.get(key)
        if( !Array.isArray(val) )
            val = new OnixArray(val)
        return val
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

    get senderName(){
        let header = this.top.get('header')
        if( !header ) return null
        return header.getValue('sender.x298') 
        || header.getValue('sender.sendername') 
        || header.getValue('fromcompany') 
        || header.getValue('m174')
    }

    get sentDate(){
        let header = this.top.get('header')
        if( !header ) return null
        // FIXME: find and return in standard format
    }

    toString(){
        if( this.has('value') ) return this.get('value')
        return this.name
    }

    toJSON(opts={}){
        let asString = opts.string
        delete opts.string
        let o = {}

        this.forEach((d,k)=>{

            k = opts.shortTags ? k : d.element?.name||k
            
            if( d.has?.('value') ){
                d = opts.codes ? d.get('value') : d.value(opts)
            }

            if( d.toJSON ) d = d.toJSON(opts)

            o[k] = d
        })

        return asString ? JSON.stringify(o, null, 2) : o
    }

    toXML(opts={}){

        let data = this.toJSON({shortTags: true, codes: true, ...opts})

        const options = {
            ignoreAttributes : false,
            format: true
        }

        data = {[this.name]: data}

        // if a product, wrap with other required tags to make a properly (mostly) formatted onix
        if( data.Product )
            data = {
                ONIXMessage: {
                    '@_release': this.release,
                    Header: {},
                    ...data
                }
            }

        const builder = new XMLBuilder(options);

        return `<?xml version="1.0" encoding="UTF-8"?>\n`+builder.build(data);
    }
}

module.exports = Onix