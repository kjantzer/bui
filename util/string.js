
function capitalize(str){
    if( !str ) return str
    return str
    .trim()
    .split(' ')
    .map(s=>s?(s[0].toUpperCase()+s.substr(1)):'')
    .join(' ')
}

function titleize(str){
    return str ? capitalize(str.replace(/[\-_]/g, ' ')) : str
}

// https://ricardometring.com/javascript-replace-special-characters
function replaceAccents(str){
    str = String(str) // make sure it's a string
    if( !str ) return str
    // Example: `Shōgun` will become `Shogun`
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
}

module.exports = {capitalize, titleize, replaceAccents}