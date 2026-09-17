const MarcRecordSubfield = require('./subfield')

class MarcRecordField {

    constructor(schema, tag, data){

        this._schema = schema
        this.schema = schema.get(tag)
        this.tag = tag

        this.data = {}

        if( data instanceof Buffer )
            this.data = this.#decode(data)
        else
            this.data = data

        if( this.schema?.has('indicator1') ){
            this.data.i1 ??= ''
            this.data.i2 ??= ''
            this.data.sf ??= []
        }

        if( this.data.sf ){
            this.data.sf = this.data.sf.map(sf => new MarcRecordSubfield( this.schema, sf[0], sf[1] ))
        }
        
        // TODO: handle position (control fields)
        
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
    }

    isValid(){
        return this.schema
    }

    // NOTE: only works in node.js?
    #decode(raw){

        if( this.tag < '010' ) // control fields have no indicators or subfields, just raw data
            return {val: raw.toString( 'latin1' )}

        const SF = this._schema.SF
        let data = {
            i1: String.fromCharCode( raw[0] ),
            i2: String.fromCharCode( raw[1] ),
            sf: []
        }

        const subfields = {}
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

            let val = raw.toString( 'latin1', i + 2, end )
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
