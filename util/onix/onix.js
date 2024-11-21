const CollMap = require(`../collmap`)
const OnixArray = require('./onix-array')
const {formatDate} = require('./util')
const parse = require('./parse')

const Elements3 = require('./specs/elements-3.0')
const Elements2 = require('./specs/elements-2.1')

class Onix extends CollMap {

    static async parse(xml, opts){ return parse(xml, opts) }
    formatDate(){ return formatDate(...arguments) }

    constructor(data, {name='ONIX', element, release, parent, level=0, index, raw, hash}={}){

        if( data.ONIXmessage )
            data = data.ONIXmessage
        if( data.ONIXMessage )
            data = data.ONIXMessage
        
        super(data)

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

                k = k.toLowerCase() // standardize on lowercase
                
                let element = this.top.elements.getTag(k)
                let props = {
                    name: k, 
                    element,
                    parent: this, 
                    release: this.release,
                    level: this.level+1
                }

                if( typeof d != 'object' )
                    d = {value:d}

                if( Array.isArray(d) )
                    d = OnixArray.from(d.map((d,i)=>{

                        if( typeof d != 'object' )
                            d = {value: d}

                        return new Onix(d, {
                            ...props,
                            index: i
                        })
                    }))
                else
                    d = new Onix(d, props)
                
                mapped[element?.shortTag||k] = d
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

    get senderName(){
        let header = this.top.get('header')
        if( !header ) return null
        return header.getValue('sender.x298') || header.getValue('fromcompany') || header.getValue('m174')
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

module.exports = Onix