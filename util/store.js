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

// creates special "store" function that doesn't need the key each time
localStore.create = (key,defaultVal)=>{
	
	// merge defult with existing (in case new default added)
	if( defaultVal && typeof defaultVal == 'object' && !Array.isArray(defaultVal) )
		localStore(key, {...defaultVal, ...(localStore(key)||{}) })

	if( defaultVal && !localStore(key) )
		localStore(key, defaultVal)

	return (val)=>{ return localStore(key, val)}
}

sessionStore.create = (key,defaultVal)=>{

	if( defaultVal && !sessionStore(key) )
		sessionStore(key, defaultVal)

	return (val)=>{return sessionStore(key, val)}
}

export function forceStorageEventsLocally(){

	let setItem = window.localStorage.setItem
	let removeItem = window.localStorage.removeItem

	window.localStorage.setItem = function(key, val){
		setItem.call(window.localStorage, key, val)
		window.dispatchEvent(new CustomEvent('storage', {
			bubbles: true,
			composed: true,
			detail: {
				key: key,
				oldVal: null,
				newVal: val
			}
		}))
	}

	window.localStorage.removeItem = function(key){
		removeItem.call(window.localStorage, key)
		window.dispatchEvent(new CustomEvent('storage', {
			bubbles: true,
			composed: true,
			detail: {
				key: key,
				oldVal: null,
				newVal: null
			}
		}))
	}

}