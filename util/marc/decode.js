/*
    Decode WIP

    NOTE: bytes reading uses TextDecoder/subarray so it works with a bytes (node) or Uint8Array (browser)
*/
// const fs = require('fs')
let MarcSchema = require('./specs/schema')
let MarcRecordField = require('./record/field')

const FT = MarcSchema.FT
const RT = MarcSchema.RT
const SF = MarcSchema.SF

const decoder = new TextDecoder('latin1')

module.exports = function decodeMarcFile( bytes ){

    // strip UTF-8 BOM if present
	if( bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf ){
		bytes = bytes.subarray( 3 )
	}

    let schema = MarcSchema

	let records = []
	
    let _leader = new MarcRecordField(schema, 'leader', bytes.subarray( 0, schema.get('leader').charLength ))
    records.push(_leader)

    // FIXME:
    let Leader = _leader.schema
    let leader = _leader.value

    	
    const recordLength = parseInt( leader.slice( 0, 5 ), 10 )
    const baseAddress = parseInt( leader.slice( 12, 17 ), 10 )

    // shouldn't need this unless the file has extra bytes before the leader or after the directory?
    const recordBuf = bytes//bytes.subarray( 0, Leader.charLength + recordLength )

    // directory runs from byte 24 to baseAddress-1 (ends with FT)
    const directoryStr = decoder.decode( recordBuf.subarray( Leader.charLength, baseAddress - 1 ) )
    const entries = []
    for( let i = 0; i < directoryStr.length; i += 12 ){

        // https://www.loc.gov/marc/bibliographic/bddirectory.html
        entries.push({
            tag: directoryStr.slice( i, i + 3 ),
            length: parseInt( directoryStr.slice( i + 3, i + 7 ), 10 ),
            start: parseInt( directoryStr.slice( i + 7, i + 12 ), 10 )
        })
    }

    const fields = entries.map( entry => decodeField( entry, recordBuf, baseAddress, schema ) )

    records.push(...fields)

	return records
}

// claude was doing this, dont think I need it
function findStartOfLeader(){
    // while( leaderEnd < bytes.length && !leader ){

	// 	if( bytes[leaderEnd] === RT || bytes[leaderEnd] === 0x0a || bytes[leaderEnd] === 0x0d ){
	// 		leaderEnd++
	// 		continue
	// 	}

    //     leader = bytes.toString( 'latin1', leaderEnd, leaderEnd + 24 )
    // }
}

// tags below '010' are control fields: no indicators/subfields, just raw data
function decodeField( entry, recordBuf, baseAddress, schema ){

	const fieldStart = baseAddress + entry.start
	const fieldBuf = recordBuf.subarray( fieldStart, fieldStart + entry.length )
    let tag = entry.tag

	// strip trailing FT
	const raw = fieldBuf[fieldBuf.length - 1] === FT
		? fieldBuf.subarray( 0, -1 )
		: fieldBuf

    return new MarcRecordField(schema, tag, raw)
    // return {}

    // let field = schema.get(tag)
    // return field ? field.decode(raw) : {tag, val: decoder.decode(raw)}
	
}

