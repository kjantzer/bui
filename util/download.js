
const fileTypes = {
    'text/plain': 'txt',
    'text/csv': 'csv',
    'application/json': 'json',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif'
}

export default (data, filename = null, {
    type = ''
}={})=>{

    let url

    if( data instanceof URL ){
        url = data

    } else if( !(data instanceof Blob) ){

        if( !type )
            type = 'text/plain'
        
        data = new Blob([data], {type})
        url = window.URL.createObjectURL(data);
    }

    if( !filename ){
        let ext = fileTypes[data.type] || ''
        filename = new Date().getTime() + (ext ? '.'+ext : '')
    }

    var a = window.document.createElement('a');
    a.href = url
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}