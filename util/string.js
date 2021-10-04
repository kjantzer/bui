
function capitalize(str){
    return str
    .split(' ')
    .map(s=>s[0]
    .toUpperCase()+s.substr(1))
    .join(' ')
}

function titleize(str){
    return capitalize(str.replace(/[\-_]/g, ' '))
}

// https://ricardometring.com/javascript-replace-special-characters
function replaceAccents(str){
    // Example: `Shōgun` will become `Shogun`
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
}

module.exports = {capitalize, titleize, replaceAccents}