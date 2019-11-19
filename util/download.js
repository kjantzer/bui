import device from './device'

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

    if( !filename ){
        let ext = fileTypes[data.type] || ''
        filename = new Date().getTime() + (ext ? '.'+ext : '')
    }

    if( data instanceof URL ){
        url = data
        url.searchParams.set('downloadReq', true)
        url.searchParams.set('filename', filename)

    } else if( !(data instanceof Blob) ){

        if( !type )
            type = 'text/plain'
        
        data = new Blob([data], {type})
        url = window.URL.createObjectURL(data);
    }

    var a = window.document.createElement('a');
    a.href = url
    a.target = '_blank'
    a.download = filename

    // if we dont do this, the current url is redirected and there is no way
    // to get back to the standalone app without force close and repopen
    if( device.isiOS && device.isStandalone ){
        window.open(url)
        return;
    }

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}