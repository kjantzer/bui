
const btnPresets = {
	'dismiss': {label: 'Dismiss'},
	'cancel': {label: 'Cancel'},
	'no': {label: 'No'},
	'done': {label: 'Done'},
	'ok': {label: 'Okay', color: 'primary'},
	'save': {label: 'Save', color: 'primary'},
	'create': {label: 'Create', color: 'primary'},
	'delete': {label: 'Delete', color: 'red'}
}

module.exports = function makeBtn(opts={}, i){
	
	if( typeof opts == 'string' ){
		if( !btnPresets[opts] )
			return console.warn('Button preset `'+opts+'` does not exist')
		
		opts = btnPresets[opts]
	}
	
	let {
		label='',
		className='',//'text-btn fw-bold',
		color='',
		icon='',
		text=true
	} = opts;
	
	// icon = icon ? 'icon-'+icon : ''
	
	return `<b-btn ${text&&'text'} icon="${icon}" color="${color}" class="${className}">${label}</b-btn>`

	// return `<span class="btn ${className} ${color} ${icon}">${label}</span>`
}