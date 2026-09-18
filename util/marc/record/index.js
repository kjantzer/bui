const MarcSchema = require('../specs/schema')
const MarcRecordField = require('./field')

const FT = MarcSchema.FT
const RT = MarcSchema.RT
const SF = MarcSchema.SF

class MarcRecord {

    constructor(data){

        this.schema = MarcSchema
        this.fields = []

        if( data instanceof ArrayBuffer )
            data = new Uint8Array(data)

        if( data instanceof Uint8Array )
            this.#decode(data)
        else if( data )
            this.add('leader', data) // TODO: 
    }

    add(tag, indicators, data){

        if( !data ){
            data = indicators
            indicators = null

            // control/position values are objects, not arrays
            // so data is an array and must have indicators (even if empty)
            if( Array.isArray(data) ){
                indicators = []
            }
        }

        if( indicators ){
            data = {
                i1: indicators[0],
                i2: indicators[1],
                sf: data
            }
        }

        // if( tag !== 'leader' && !this.leader )
        //     throw new Error('Leader must be first field')

        let field = new MarcRecordField(this, tag, data)

        if( tag == 'leader' )
            this.leader = field

        this.fields.push(field)
    }

    toJSON(){
        return this.fields
    }

    toMarcData(){
        // TODO: make sure in order by tag number?
        return this.fields
        .filter(f=>f.tag != 'leader') // this has dynamic data so not part of this
        .map(f=>f.toMarcData())
        .sort((a,b)=>a.tag.localeCompare(b.tag))
    }

    get(tag, {all=false}={}){
        let schema = this.schema.get(tag)
        if( !schema ) throw new Error('Not a valid MARC tag')

        let fields = this.fields.filter(f=>f.tag == tag)

        return schema.isRepeatable && all ? fields : fields[0]
    }

    get typeOfRecord(){
        return this.leader?.value.get(6)
    }

    get bibliographicLevel(){
        return this.leader?.value.get(7)
    }

    get encodingLevel(){
        return this.leader?.value.get(18)
    }

    get recordLength(){
        return this.leader ? parseInt( this.leader?.value.get(0)?.val, 10 ) : null
    }

    set recordLength(val){
        val = String( val ).padStart( 5, '0' )
        this.leader?.value.set(0, val)
    }

    get baseAddress(){
        return this.leader ? parseInt( this.leader?.value.get(12)?.val, 10 ) : null
    }

    set baseAddress(val){
        val = String( val ).padStart( 5, '0' )
        this.leader?.value.set(12, val)
    }

    set controlNumber(val){
        let field = this.get('001')
        // TODO: support updating?
        if( field ) throw new Error('001 field already exists')
        this.add('001', val)
    }

    set controlNumberIdentifier(val){
        let field = this.get('003')
        // TODO: support updating?
        if( field ) throw new Error('003 field already exists')
        this.add('003', val)
    }

    set dateLastModified(val){
        let field = this.get('005')
        // TODO: support updating?
        if( field ) throw new Error('005 field already exists')

        // TODO: support formatting?
        this.add('005', val)
    }
    
    static #decoder = new TextDecoder('latin1')

    #decode( bytes ){

        // strip UTF-8 BOM if present
        if( bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf ){
            bytes = bytes.subarray( 3 )
        }
    
        let schema = this.schema
        let decoder = MarcRecord.#decoder
        let charLength = 24 // FIXME:

        this.add('leader', bytes)
            
        // const recordLength = parseInt( leader.slice( 0, 5 ), 10 )
        const baseAddress = this.baseAddress

        // shouldn't need this unless the file has extra bytes before the leader or after the directory?
        const recordBuf = bytes//bytes.subarray( 0, Leader.charLength + recordLength )

        // directory runs from byte 24 to baseAddress-1 (ends with FT)
        const directoryStr = decoder.decode( recordBuf.subarray( charLength, baseAddress - 1 ) )
        const entries = []
        for( let i = 0; i < directoryStr.length; i += 12 ){

            // https://www.loc.gov/marc/bibliographic/bddirectory.html
            entries.push({
                tag: directoryStr.slice( i, i + 3 ),
                length: parseInt( directoryStr.slice( i + 3, i + 7 ), 10 ),
                start: parseInt( directoryStr.slice( i + 7, i + 12 ), 10 )
            })
        }

        const fields = entries.map(entry=>{
            const fieldStart = baseAddress + entry.start
            const fieldBuf = recordBuf.subarray( fieldStart, fieldStart + entry.length )
            let tag = entry.tag

            // strip trailing FT
            const raw = fieldBuf[fieldBuf.length - 1] === FT
                ? fieldBuf.subarray( 0, -1 )
                : fieldBuf

            this.add(tag, raw)
        })
    }

    encode(){
            
        const FT = '\x1e'
		const SF = '\x1f'
		const RT = '\x1d'

		let dataChunks = []
        let fields = this.toMarcData()

		for( const f of fields ){
			if( f.val !== undefined ){
				dataChunks.push( f.val + FT )
			} else {
				const subs = f.sf.map( ([code, val]) => SF + code + val ).join( '' )
				dataChunks.push( String(f.i1) + String(f.i2) + subs + FT )
			}
		}

		let directory = ''
		let offset = 0
		fields.forEach( ( f, i ) => {
			const len = dataChunks[i].length // latin1: 1 char = 1 byte, no Buffer/TextEncoder needed
			directory += f.tag + String( len ).padStart( 4, '0' ) + String( offset ).padStart( 5, '0' )
			offset += len
		})
		directory += FT

		const baseAddress = 24 + directory.length
		const data = dataChunks.join( '' )
		const totalLength = baseAddress + data.length + 1

        this.baseAddress = baseAddress
        this.recordLength = totalLength

        const leader = this.leader.toString()

		let str = leader + directory + data + RT // plain JS string, latin1-safe

        // node.js
        if( globalThis.Buffer )
            return Buffer.from( str, 'latin1' )
        // browser
        else{
            const bytes = new Uint8Array( str.length )
            for( let i = 0; i < str.length; i++ ){
                bytes[i] = str.charCodeAt( i ) // latin1: charCode 0-255 maps 1:1 to byte
            }
            // return new Blob( [bytes], { type: 'application/octet-stream' } ) // or this?
            return bytes
        }
    }

}

module.exports = MarcRecord


