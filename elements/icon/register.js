const SVG_ICONS = new Map()
const SVG_ICON_ALIASES = new Map()

function registerIcon(name, icon, {prefix='icon-', className=''}={}){

	// appears to be setting alias
	if( icon.length <= 50 )
		return SVG_ICON_ALIASES.set(name, icon)

	let d = document.createElement('div')
	d.innerHTML = icon
	icon = d.firstElementChild

	// if no name, get it from the icon attribute
	if( !name ){
		name = icon.id || icon.name || ''
		name = name.replace(prefix, '')
	}

	// remove <title> tags – we dont want to see them when hovering over the icon
	let title = icon.querySelector('title')
	if( title ){
		icon.setAttribute('data-title', title.textContent)
		title.remove()
	}

	icon.setAttribute('part', 'svg')

	if( className )
		icon.classList.add(className)

	icon.removeAttribute('width')
	icon.removeAttribute('height')

	if( !name )
		return console.warn('Icons must have a name')

	if( SVG_ICONS.get(name) ){
		// only log warning if the actual icon is different
		if( SVG_ICONS.get(name).outerHTML != icon.outerHTML )
			console.warn('ICON: there is already an icon registered with that name:', name)

		return
	}

	SVG_ICONS.set(name, icon)
}

const WARNINGS = new Map()
function _GLOBAL_ICONS_CONST(str){
	if( !SVG_ICONS.has(str) && !SVG_ICON_ALIASES.has(str) ){
		// only warn once
		if( !WARNINGS.get(str) )
			console.warn(`Icon: "${str}" not loaded`);
		WARNINGS.set(str, true)
	}

    return str
}

const GLOBAL_ICONS_CONST = function(strings, ...args){
	let iconName = strings.map((s,i)=>s+(args[i]||'')).join('')
	return _GLOBAL_ICONS_CONST(iconName)
}

const GLOBAL_ICONS_CONST_PROXY = new Proxy(GLOBAL_ICONS_CONST, {
    get(target, prop){
		return _GLOBAL_ICONS_CONST(prop)
	}
});

if( !globalThis.ICONS )
	globalThis.ICONS = GLOBAL_ICONS_CONST_PROXY


let hasWarnedNoIcons = false
function warnNoIcons(){
	if( hasWarnedNoIcons ) return
	hasWarnedNoIcons = true
	console.warn('No icons have been registered. Do so with `IconElement.register()` – Or import `bui/elements/icon/legacy/_all`')
}

function getIconSvg(name){
	if( !SVG_ICONS.has(name) && SVG_ICON_ALIASES.has(name) )
		name = SVG_ICON_ALIASES.get(name)

	return SVG_ICONS.get(name)
}

export {registerIcon, SVG_ICONS, warnNoIcons, getIconSvg}