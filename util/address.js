import { html } from 'lit'

// TODO: adjust to support node.js?
export function addressToString(data, {oneline=false, linebreak=`\n`, htmllines=false}={}){
    
    // NOTE: street supports line breaks for some longer international addresses (#6051)
    let addr = ['street', 'street2', 'address', 'address2'].map(k=>data[k]).filter(s=>s).flatMap(s=>s.split('\n'))
    let city = ['city', 'state', 'province', 'zip', 'country'].map(k=>data[k]).filter(s=>s)

    let lines = []

    lines.push(...addr, city.join(' '))
    
    lines = lines.filter(s=>s)

    if( htmllines )
        return lines.map(line=>html`<b-text block>${line}</b-text>`)

    return lines.join(oneline?', ':linebreak)
}

export function parseAddress(raw, {
    streetName='street',
    street2Name='street2'
}){
	const lines = raw.trim().split('\n').map(l => l.trim()).filter(Boolean)

	const cityStateZip = /^(.+?)[\s,]+([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/
	const streetPattern = /^\d+\s+\S+|^(P\.?O\.?\s+Box|PO Box|Rural Route|RR\s+\d)/i
	const street2Pattern = /^(Suite|Ste\.?|Apt\.?|Unit|Floor|Fl\.?|Bldg\.?|Building|#)\s*\S+/i

	let name = null, attn = null, street = null, street2 = null, city = null, state = null, zip = null

	let remaining = [...lines]

	// City/state/zip is always last
	const csz = remaining.pop()?.match(cityStateZip)
	if( csz ){
		city = csz[1]
		state = csz[2]
		zip = csz[3]
	}

	// Find street line from bottom up
	let streetIdx = -1
	for( let i = remaining.length - 1; i >= 0; i-- ){
		if( remaining[i].match(streetPattern) ){
			streetIdx = i
			break
		}
	}

	if( streetIdx !== -1 ){
		street = remaining.splice(streetIdx, 1)[0]

		// street2: line immediately after street (now at streetIdx after splice)
		const candidate = remaining[streetIdx]
		if( candidate && candidate.match(street2Pattern) ){
			street2 = remaining.splice(streetIdx, 1)[0]
		}
	}

	// Remaining lines are name/attention
	// Attn line: starts with Attn/Attention/c/o
	const attnPattern = /^(Attn:?|Attention:?|c\/o)\s*/i
	const attnIdx = remaining.findIndex(l => l.match(attnPattern))
	if( attnIdx !== -1 ){
		attn = remaining.splice(attnIdx, 1)[0].replace(attnPattern, '').trim()
	}

	name = remaining.length ? remaining.join(' ') : null

	return { name, attn, [streetName]: street, [street2Name]: street2, city, state, zip }
}