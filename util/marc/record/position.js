class MarcRecordPosition {

    constructor(schema, data){

        this.schema = schema
        this.data = data
    }

    get value(){ return this.data }

    described(){
        let data = this.data || ''
        return this.schema.get('positions').map(p=>{
            let val = data.slice(p.start, p.end+1)
            val = p.get('codes')?.get(val) || val

            return `${p.label}: ${val}`
        })
    }

    slice(){ return this.data.slice(...arguments) }

    toString(){ return this.data }
    toJSON(){ return this.data }

}

module.exports = MarcRecordPosition