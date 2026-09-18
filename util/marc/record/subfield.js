class MarcRecordSubfield {

    constructor(schema, code, data){

        this._schema = schema
        this.schema = schema.get('subfields').get(code)

        this.code = code
        this.data = data
    }

    get label(){ return this.schema?.get('label') || this.code }
    get value(){ return this.data }
    get val(){ return this.value }

    toHumanString(){ return this.label+': '+this.value }

    toString(){ return `$${this.code}${this.value}` }

    isValid(){
        return this.schema
    }

    toJSON(){
        return {
            code: this.code,
            val: this.data
        }
    }

    toMarcData(){
        return [this.code, this.data]
    }

}

module.exports = MarcRecordSubfield