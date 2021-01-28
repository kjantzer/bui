
const btnPresets = {
	'dismiss': {label: 'Dismiss'},
	'cancel': {label: 'Cancel'},
	'no': {label: 'No'},
	'done': {label: 'Done'},
	'apply': {label: 'Apply', color: 'theme'},
	'ok': {label: 'Okay', color: 'theme'},
	'yes': {label: 'Yes', color: 'theme'},
	'save': {label: 'Save', color: 'theme'},
	'create': {label: 'Create', color: 'theme'},
	'delete': {label: 'Delete', color: 'red'}
}

export const cancelBtns = ['dismiss', 'cancel', 'no']

export default function makeBtn(opts={}, i){
	
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