/*
    Decode WIP

    NOTE: only works for node.js, needs to improve for browser compatibility
*/
const fs = require('fs')
let MarcSchema = require('./specs/schema')
let MarcRecordField = require('./record/field')

const FT = MarcSchema.FT
const RT = MarcSchema.RT
const SF = MarcSchema.SF

module.exports = function decodeMarcFile( buffer ){

    if( typeof buffer == 'string' )
        buffer = fs.readFileSync(buffer)

    // strip UTF-8 BOM if present
	if( buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf ){
		buffer = buffer.slice( 3 )
	}

    let schema = new MarcSchema()

	let records = []
	let Leader = schema.get('leader')
    let leader = buffer.toString( 'latin1', 0, Leader.charLength )

    	
    const recordLength = parseInt( leader.slice( 0, 5 ), 10 )
    const baseAddress = parseInt( leader.slice( 12, 17 ), 10 )

    // shouldn't need this unless the file has extra bytes before the leader or after the directory?
    const recordBuf = buffer//buffer.slice( 0, Leader.charLength + recordLength )

    // directory runs from byte 24 to baseAddress-1 (ends with FT)
    const directoryStr = recordBuf.toString( 'latin1', Leader.charLength, baseAddress - 1 )
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

    records.push({
        tag: 'leader',
        val: leader
    })

    records.push(...fields)

	return records
}

// claude was doing this, dont think I need it
function findStartOfLeader(){
    // while( leaderEnd < buffer.length && !leader ){

	// 	if( buffer[leaderEnd] === RT || buffer[leaderEnd] === 0x0a || buffer[leaderEnd] === 0x0d ){
	// 		leaderEnd++
	// 		continue
	// 	}

    //     leader = buffer.toString( 'latin1', leaderEnd, leaderEnd + 24 )
    // }
}

// tags below '010' are control fields: no indicators/subfields, just raw data
function decodeField( entry, recordBuf, baseAddress, schema ){

	const fieldStart = baseAddress + entry.start
	const fieldBuf = recordBuf.slice( fieldStart, fieldStart + entry.length )
    let tag = entry.tag

	// strip trailing FT
	const raw = fieldBuf[fieldBuf.length - 1] === FT
		? fieldBuf.slice( 0, -1 )
		: fieldBuf

    return new MarcRecordField(schema, tag, raw)

    // let field = schema.get(tag)
    // return field ? field.decode(raw) : {tag, val: raw.toString( 'latin1' )}
	
}

