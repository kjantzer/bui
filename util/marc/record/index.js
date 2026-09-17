const MarcSchema = require('../specs/schema')
const MarcRecordField = require('./field')

class MarcRecord {

    constructor(data){
        this.schema = new MarcSchema()
        this.fields = []
    }

    add(tag, data){
        this.fields.push(new MarcRecordField(this.schema, tag, data))
    }

    toJSON(){
        return this.fields
    }
    
}

module.exports = MarcRecord