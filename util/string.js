/*
    # String

    Various functions for common strings modifications
*/

/*
    `capitalize(str)`  
    "some string of text" => "Some String Of Text"
*/
function capitalize(str){
    if( !str ) return str
    return str
    .trim()
    .toLowerCase() // in case all uppercase
    .split(' ')
    .map(s=>s?(s[0].toUpperCase()+s.substr(1)):'')
    .join(' ')
}


/*
    `titleize(str)`  
    "some-string_of_text" => "Some String Of Text"
*/
function titleize(str){
    return str ? capitalize(str.replace(/[\-_]/g, ' ')) : str
}

/*
    `slugify(str, {spaces='_', lowerCase=true, removeCamelcase=false})`  
    "Some string of stuff" => "some_string_of_stuff"
*/
function slugify(str, {spaces='_', lowerCase=true, removeCamelcase=false}={}){
    str = String(str || '')
    str = str.replace(' ', spaces)
    if( removeCamelcase ) str = camelcaseUndo(str, {delimiter: spaces})    
    if( lowerCase ) str = str.toLowerCase()
    return str
}

/*
    `camelcaseUndo(str, {delimiter='_'})`  
    "someStringOfText" => "some_string_of_text"
*/
// TODO: better name?
function camelcaseUndo(str, {delimiter='_'}={}){
    return str?.split(/([A-Z])/).map(s=>s.match(/[A-Z]/)?delimiter+s.toLowerCase():s).join('')
}

/*
    `replaceAccents(str)`  
    Example: `Shōgun` will become `Shogun`

    https://ricardometring.com/javascript-replace-special-characters
*/
function replaceAccents(str){
    str = String(str||'') // make sure it's a string
    if( !str ) return str
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
}

/*
    `removeTags(str)`  
    lightweight tag strip: https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/
*/
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