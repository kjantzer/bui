class MarcRecordSubfield {

    constructor(schema, code, data){

        this._schema = schema
        this.schema = schema.get('subfields').get(code)

        this.code = code
        this.data = data
    }

    get label(){ return this.schema?.get('label') || this.code }
    get value(){ return this.data }

    toString(){ return this.label+': '+this.value }

    isValid(){
        return this.schema
    }

    toJSON(){
        return {
            code: this.code,
            data: this.data
        }
    }

}

module.exports = MarcRecordSubfield