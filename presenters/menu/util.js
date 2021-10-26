
export function toMenu({
    before=[],
    after=[],
    unset=false
}={}, fn){

    if( unset === true )
        unset = {
            label: 'Uset',
            icon: 'erase',
			val: ''
        }
    
    let menu = this.map(m=>{
		if( fn )
			return fn(m)
        
		if( typeof m == 'string' )
			return {label: m, val: m}

		return {
            label: m.get ? m.get('label') : m.label,
            val: String(m.id),
        }
    })

    menu = before.concat(menu)
	
	if( unset )
		menu.unshift(unset, 'divider')

	menu  = menu.concat(after)

    return menu 
}

export function isDivider(val){
	val = val.val || val.label || val
	return ['divider', '-', '–'].includes(val)
}