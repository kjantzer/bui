const MarcPart = require(`./parts/_part`)
const SchemaJSON = require('./schema-json.js')

class MarcSchema extends MarcPart {

    constructor(data, {key, parent, level=0}={}){

        if( !data && level == 0 )
            data = SchemaJSON.fields
        
        super(data, arguments[1])
    }
    
}

module.exports = MarcSchema