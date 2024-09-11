/*
    See https://schema.org/
*/

// e can be the event or action
function dataTransfer(e){
    return (e.evt||e)?.dataTransfer
}

export function downloadURL(e, filename, url){
    dataTransfer(e).setData('DownloadURL', [
        `application/octet-stream:${filename}:${url}`
    ]);
}

// TODO: set mimetype by extension?
export function downloadContent(e, filename, content, {mimetype}={}){
    
    if( !mimetype && typeof content == 'object' && !Array.isArray(content) ){
        mimetype = 'application/json'
        content = JSON.stringify(content)

    }else if( !mimetype && Array.isArray(content) ){
        mimetype = 'text/csv'
        content = JSON.stringify(content)
    }

    if( !mimetype )
        mimetype = 'text/plain'

    let b64 = btoa(content)
        
    return downloadURL(e, filename, `data:${mimetype};base64,${b64}`)
}


export function plainText(e, text){
    dataTransfer(e).setData('text/plain', text);
}

// Navigates to the URL when dropping on the URL bar or browser page
export function url(e, url){
    if( url[0] == '/' )
        url = location.protocol+'//'+location.host+url
    dataTransfer(e).setData('text/uri-list', url);
}

// https://schema.org/ImageObject
// https://json-ld.org/
export function jsonLD(e, type, data){
    data = Object.assign(data, {
        '@context': 'https://schema.org',
        '@type': type
    });

    dataTransfer(e).setData('application/ld+json', JSON.stringify(data));
}