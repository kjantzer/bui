const CollMap = require(`../../../collmap`)

class MarcPartArray extends Array {
    // nothing custom yet
}

class MarcPart extends CollMap {

    get type(){
        return this.constructor.name.toLowerCase().replace('marc', '')
    }

    get label(){ return this.get('label') == 'Undefined' ? '' : this.get('label') }
    get name(){ return this.label }
    get code(){ return this.key ? this.key : '#' } // easier to see character and is valid

    get isRepeatable(){ return this.get('repeatable') }

    constructor(data, {key, parent, level=0}={}){
        super(data)

        this.key = key
        this.level = level
        this.parent = parent

        let mapped = {}
        this.forEach((d,k)=>{

            if( typeof d != 'object' ){
                
            }else if( Array.isArray(d) )
                d = new MarcPartArray(d)
            else{

                let PartClass = MarcPart

                if( d.start !== undefined && d.end !== undefined ) 
                    PartClass = MarcPosition
                else if( d.repeatable !== undefined && level > 1 )
                    PartClass = MarcSubfield
                else if( d.codes !== undefined || k == 'positions' || k == 'subfields')
                    PartClass = MarcSection
                else
                    PartClass = MarcField

                d = new PartClass(d, {key: k, parent: this, level: this.level+1})
            }

            k = k.toLowerCase()
            mapped[k] = d

            // if( !this.root.flatLookup.has(k) )
            //     this.root.flatLookup.set(k, d)
        })

        this.clear()
        this.set(mapped)
    }

    get(key){
        // support dotnotation
        let keys = key.toLowerCase().split('.')
        key = keys.shift()

        let resp = super.get(key)// || this[key]

        // we got a single element, but was expecting to grab first in array
        // so by-pass that logic...we already have the first (only) item
        if( !Array.isArray(resp) && keys.length > 0 && keys[0] === '0' )
            keys.shift()

        // if got an array of elements, but not requesting which one next, assume the first one
        else if( Array.isArray(resp) && keys.length > 0 && !keys[0].match(/^\d+$/) )
            resp = resp[0]

        keys = keys.join('.')
        
        // looks like we have further dotnotation to follow
        if( keys && resp?.get )
            return resp.get(keys)
        else
            return resp
    }

}


module.exports = MarcPart

const MarcField = require(`./field`)
const MarcSection = require(`./section`)
const MarcPosition = require(`./position`)
const MarcSubfield = require(`./subfield`)