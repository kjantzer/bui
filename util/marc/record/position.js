class MarcRecordPosition {

    constructor(schema, data){

        this.schema = schema

        // positioned values must have all the positions defined, even if an empty space
        this.data = this.schema.get('positions').map(p=>{

            // data given may be a complete string or an object with the position as the key
            let val = typeof data == 'string' ? data.slice(p.start, p.end+1) : data[p.start]

            // per docs only one code so it's required
            if( val == undefined && p.get('codes')?.size == 1 )
                val = p.get('codes').firstKey

            // if( val == '[number]' )
            //     val = '0'

            return {
                position: p,
                val
            }
        })
        
    }

    get value(){ return Object.fromEntries(this.data.map(d=>[d.position.start, d.val])) }

    described(){
        return this.positionValues().map(d=>{
            return `${d.label}: ${d.valLabel}`
        })
    }

    positionValues(){
        return this.data.map(d=>{
            
            let valLabel = d.position.get('codes')?.get(d.val) || d.val

            return {
                ...d,
                label: d.position.label,
                valLabel
            }
        })
    }

    get(key){
        return this.data.find(d=>{
            if( d.position.start == key ) return true
            if( d.position.key == key ) return true
            if( d.position.label == key ) return true
        })
    }

    toString(){ return this.value }
    toJSON(){ return this.value }

}

module.exports = MarcRecordPosition