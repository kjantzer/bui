class MarcRecordPosition {

    constructor(schema, data){

        this.schema = schema

        function positionData(p){
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
        }

        let positions = schema.get('positions')
        
        if( schema.shortKey == 6 ){
            positions = positions.get('008'+data[0])
        }

        // positioned values must have all the positions defined, even if an empty space
        this.data = positions?.map(positionData)

        // include the shared "all" positions
        if( schema.shortKey == 8 ){

            let others = schema.top.get('008a.positions').map(positionData)
            others = others.filter(d=>d.position.start!=18) // "Material specific coded elements"
            this.data.push(...others)

            // make sure in order since we merged two sets
            this.data.sort((a,b)=>a.position.start - b.position.start)
        }
        
    }

    get value(){ return Object.fromEntries(this.data.map(d=>[d.position.start, d.val])) }

    described(){
        return this.positionValues().map(d=>{
            return `${d.label}: ${d.valLabel}`
        })
    }

    positionValues(){
        return this.data.map(d=>{
            
            // FIXME: 006 has nested array of positions
            let valLabel = d.position.get?.('codes')?.get(d.val) || d.val

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

    set(key, val){
        let d = this.get(key)
        if( d ) d.val = val
    }

    toString(){ return this.toMarcData() }

    toJSON(){ return this.value }

    toMarcData(){
        return this.data.map(d=>{
            let length = d.position.end - d.position.start + 1

            return String(d.val??'').padEnd(length, ' ')
        }).join('')
    }

}

module.exports = MarcRecordPosition