// TODO: support prefixing?

const store = (store, key, val)=>{
	
	if( val === undefined ){
		let data = store.getItem(key)
		
		if( data === null || data === undefined )
			return undefined
		
		var val = ''
		try { val = JSON.parse(data) }
		catch(e) { val = data }
		
		return val
	}
		
	if( val === null ){
		return store.removeItem(key)
	}
		
	val = JSON.stringify(val)
	
	return store.setItem(key, val)
}

export const localStore = (key, val)=>{
	return store(window.localStorage, key, val)
}

export const sessionStore = (key, val)=>{
	return store(window.sessionStorage, key, val)
}

export default localStore