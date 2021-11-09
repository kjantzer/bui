import {html} from 'lit-html'

export function toMenu({
    before=[],
    after=[],
    unset=false
}={}, fn){

    if( unset === true || ['clear', 'remove', 'unset'].includes(unset) )
        unset = {
            label: html`<b-text capitalize>${unset===true?'Unset':unset}</b-text>`,
            toolbarLabel: '–',
            // icon: 'erase',
			val: '',
            extras:[html`<b-icon name="erase"></b-icon>`]
        }
    else if( unset && typeof unset == 'string' )
        unset = {
            label: unset,
            val: ''
        }
    
    let menu = this.map(m=>{
		if( fn )
			return fn(m)
        
		if( typeof m == 'string' )
			return {label: m, val: m}

		return {
            label: m.get ? m.get('label') : (m.label || m.val || m.id),
            val: String(m.val||m.id),
        }
    })

    if( before && !Array.isArray(before) )
        before = [before]
    
    menu = before.concat(menu)
	
	if( unset )
		menu.unshift(unset, 'divider')

    if( after && !Array.isArray(after) )
        after = [after]
	
    menu  = menu.concat(after)

    return menu 
}

export function isDivider(val){
	val = val.val || val.label || val
	return ['divider', '-', '–'].includes(val)
}