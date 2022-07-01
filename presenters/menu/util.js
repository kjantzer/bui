import {html} from 'lit'

export function isDivider(val){
	let _val = val.val //|| val.label || val
    if( _val == undefined )
        _val = val.label
    if( _val == undefined )
        _val = val

	return ['divider', '-', '–'].includes(val)
}


export function toMenu({
    before=[],
    after=[],
    icon=true,
    description=true,
    unset=false,
    label='label'
}={}, fn){

    if( unset === true || ['clear', 'remove', 'unset'].includes(unset) )
        unset = {
            label: html`<b-text capitalize>${unset===true?'Unset':unset}</b-text>`,
            toolbarLabel: '–',
            // icon: 'erase',
			val: '',
            clearsAll: true,
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
        
        if( isDivider(m) )
            return m
            
		if( typeof m == 'string' )
			return {label: m, val: m}

		return {
            label: m.get ? m.get(label) : (m[label] || m.val || m.id),
            icon: icon && (m.get ? m.get('icon') : m.icon),
            description: description && (m.get ? m.get('description') : m.description),
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