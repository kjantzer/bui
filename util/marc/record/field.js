const MarcRecordSubfield = require('./subfield')
const MarcRecordPosition = require('./position')

class MarcRecordField {

    constructor(schema, tag, data){

        this._schema = schema
        this.tag = tag

        this.data = {}

        if( data instanceof Uint8Array ) // covers Buffer (node) and Uint8Array (browser)
            this.data = this.#decode(data)
        else
            this.data = data

        // per docs, first charcater denotes subtype
        if( this.tag == '007' ){
            tag += this.data.val[0]
        }

        this.schema = schema.get(tag)

        if( this.tag == '007' ){
            console.log(this.schema)
        }

        if( this.tag == '008' ){
            console.log('alter tag');
            
        }

        if( this.schema?.has('indicator1') ){
            this.data.i1 ??= ''
            this.data.i2 ??= ''
            this.data.sf ??= []
        }

        if( this.data.sf ){
            this.data.sf = this.data.sf.map(sf => new MarcRecordSubfield( this.schema, sf[0], sf[1] ))
        }
        
        if( this.schema?.has('positions') ){
            this.data.val = new MarcRecordPosition( this.schema, this.data.val )
        }

        // TODO: handle position (control fields)
        // TODO: handle 008
    }

    get i1Label(){ return this.schema?.get('indicator1.label') }
    get i2Label(){ return this.schema?.get('indicator2.label') }

    get i1Val(){ return this.schema?.get('indicator1.codes')?.get(this.data.i1) }
    get i2Val(){ return this.schema?.get('indicator2.codes')?.get(this.data.i2) }

    get i1String(){ return this.i1Label+': '+this.i1Val}
    get i2String(){ return this.i2Label+': '+this.i2Val}
    
    get value(){
        if( this.data.sf )
            return this.data.sf.map(sf => sf.toString()) // FIXME?

        return this.data.val
    }

    isValid(){
        return this.schema
    }

    static #decoder = new TextDecoder('latin1')

    #decode(raw){

        if( this.tag < '010' || this.tag == 'leader') // control fields have no indicators or subfields, just raw data
            return {val: MarcRecordField.#decoder.decode(raw)}

        const SF = this._schema.SF
        let data = {
            i1: String.fromCharCode( raw[0] ),
            i2: String.fromCharCode( raw[1] ),
            sf: []
        }

        let i = 0

        while( i < raw.length ){
            if( raw[i] !== SF ){
                i++
                continue
            }

            const code = String.fromCharCode( raw[i + 1] )
            let end = i + 2
            while( end < raw.length && raw[end] !== SF )
                end++

            let val = MarcRecordField.#decoder.decode( raw.subarray( i + 2, end ) )
            data.sf.push([code, val])
            i = end
        }

        return data
    }

    toJSON(){
        return {
            tag: this.tag,
            ...this.data
        }
    }

}


module.exports = MarcRecordField
