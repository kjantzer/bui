
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

function slugify(str, {spaces='_', lowerCase=true, removeCamelcase=false}={}){
    str = str || ''
    str = str.replace(' ', spaces)
    if( removeCamelcase ) str = camelcaseUndo(str, {delimiter: spaces})    
    if( lowerCase ) str = str.toLowerCase()
    return str
}

// TODO: better name?
function camelcaseUndo(str, {delimiter='_'}={}){
    return str?.split(/([A-Z])/).map(s=>s.match(/[A-Z]/)?delimiter+s.toLowerCase():s).join('')
}

// https://ricardometring.com/javascript-replace-special-characters
function replaceAccents(str){
    str = String(str||'') // make sure it's a string
    if( !str ) return str
    // Example: `Shōgun` will become `Shogun`
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
}

// lightweight tag strip: https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/
function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}

module.exports = {capitalize, titleize, slugify, replaceAccents, removeTags, camelcaseUndo}