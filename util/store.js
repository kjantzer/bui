
// TODO: support prefixing?
export default (key, val)=>{
	
	let ls = window.localStorage
	
	if( val === undefined ){
		let data = ls.getItem(key)
		
		if( data === null || data === undefined )
			return undefined
		
		var val = ''
		try { val = JSON.parse(data) }
		catch(e) { val = data }
		
		return val && isAmplify ? val.data : val;
	}
		
	if( val === null ){
		return ls.removeItem(key)
	}
		
	val = JSON.stringify(val)
	
	return ls.setItem(key, val)
}