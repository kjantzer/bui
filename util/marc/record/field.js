const MarcRecordSubfield = require('./subfield')
const MarcRecordPosition = require('./position')

class MarcRecordField {

    constructor(marc, tag, data){

        this.marc = marc
        this.schema = marc.schema.get(tag)
        this.tag = tag

        this.data = {}

        if( data instanceof Uint8Array ) // covers Buffer (node) and Uint8Array (browser)
            this.data = this.#decode(data)
        else
            this.data = data

        // per docs, first charcater denotes subtype
        if( this.tag == '007' ){
            tag += this.data[0]
        }

        // try to get again
        if( !this.schema )
            this.schema = marc.schema.get(tag)

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

            if( !this.data.i1 && this.schema.get('indicator1.codes').size == 1  )
                this.data.i1 = this.schema.get('indicator1.codes').firstKey

            if( !this.data.i2 && this.schema.get('indicator2.codes').size == 1  )
                this.data.i2 = this.schema.get('indicator2.codes').firstKey

        }

        if( this.data.sf ){
            this.data.sf = this.data.sf.map(sf => new MarcRecordSubfield( this.schema, sf[0], sf[1] ))
        }
        
        if( !this.data.sf ){

            this.data = {val: this.data}

            if( this.schema?.has('positions') ){
                this.data.val = new MarcRecordPosition( this.schema, this.data.val )
            }
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

    get(code, {all=false}={}){
        let schema = this.schema.get('subfields').get(code)
        if( !schema ) throw new Error('Not a valid MARC subfield')

        let subfields = this.data.sf.filter(sf=>sf.code == code || sf.schema.label == code)

        return schema.isRepeatable && all ? subfields : subfields[0]
    }

    isValid(){
        return this.schema
    }

    toString(){
        if( this.data.sf )
            return `${this.data.i1}${this.data.i2}${this.data.sf.map(sf => sf.toString()).join()}`
        else
            return this.data.val.toString()
    }

    static #decoder = new TextDecoder('latin1')

    #decode(raw){

        if( this.tag == 'leader' ){
            raw = raw.subarray( 0, this.schema.charLength )
        }

        if( this.tag < '010' || this.tag == 'leader') // control fields have no indicators or subfields, just raw data
            return MarcRecordField.#decoder.decode(raw)

        const SF = this.marc.schema.SF
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

    get marcTag(){
        if( this.tag == 'leader' ) return this.tag
        return String(this.tag).slice(0, 3) // make sure we leave out any subsets like 007a
    }

    toMarcData(){
        let data = {
            tag: this.marcTag,
            ...this.data
        }

        if( data.sf )
            data.sf = data.sf.map(sf => sf.toMarcData())

        if( data.val?.toMarcData )
            data.val = data.val.toMarcData()

        return data
    }

}


module.exports = MarcRecordField
