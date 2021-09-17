
class BarcodeParsers extends Map {

	set(key, val){

		// got a bunch of parsers, set each one
		if( val == undefined && typeof key == 'object' ){
			for( let [k,v] of Object.entries(key) ){
				this.set(k, v)
			}
			return
		}

		if( this.get(key) )
			return console.warn('Barcode Scanner - parser already exists:', key, this.get(key))

		// defaults
		let parse = {
			speed: 0,
			type: 'string'
		}

		if( typeof val == 'function'){
			parse.patt = val

		}else if( val instanceof RegExp ){
			parse.patt = val
		
		}else if( typeof val == 'object' ){
			parse = Object.assign(parse, val)
		}

		return super.set(key, parse)
	}

	parse(str, speed){

		str = str.replace(/[\n\r]/g, '');

		let result = {
			str,
			val: null,
			type: null
		}

		// test each parser for a match
		for( let [type, parse] of this ){

			if( parse.speed && speed != parse.speed )
				continue

			// custom function
			if( typeof parse.patt == 'function' ){
				
				let val = parse.patt(str, speed)

				// if parse function returned something, it's considereed a match
				if( val !== undefined && val !== false ){
					result.type = type
					result.val = val
				}

			// regular expression
			}else if( parse.patt instanceof RegExp ){

				let matches = str.match(parse.patt)

				if( matches ){
					result.type = type
					if( matches.length > 2 )
						result.val = matches.slice(1)
					else if( matches.length > 1 )
						result.val = matches[1]
					else
						result.val = str
				}
			}

			// did this parser match?
			if( result.val != null ){

				// optionally parse the result further
				if( typeof parse.parse == 'function' )
					parse.parse(result)

				// format the result value based on "type"
				if( parse.type ){
					if( Array.isArray(result.val) )
						result.val = result.val.map(val=>{
							return resultValParser(parse.type, val)
						})
					else
						result.val = resultValParser(parse.type, result.val)
				}

				// stop testing the remaining parsers
				// NOTE: should this be turned off to allow multiple matches?
				break;
			}
		}

		return result
	}
}

function resultValParser(type, val){

	if( type == 'int' )
		return parseInt(val)
	else if( type == 'float' )
		return parseFloat(val)
	else if( type == 'boolean' )
		return Boolean(val)
	
	return val
}

export const Parsers = new BarcodeParsers()
export default Parsers
