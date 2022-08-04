import device from './device'

const fileTypes = {
    'text/plain': 'txt',
    'text/csv': 'csv',
    'application/json': 'json',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif'
}

export const downloadContent = (content, filename, opts={})=>{

    let url;
    if (!(content instanceof Blob)) {

        if( !opts.type ){
            if( filename.match(/\.json$/) ){
                opts.type = 'application/json'

                if( typeof content !== 'string' )
                    content = JSON.stringify(content)

            }else
                opts.type = 'text/plain'    
        }
            opts.type = 'text/plain'

        content = new Blob([content], {type: opts.type})
    }

    url = window.URL.createObjectURL(content);

    const a = window.document.createElement('a');
    a.href = url
    a.download = filename||''
    a.click();

}

export const downloadCSV = (content, filename, opts={})=>{
    if( typeof content != 'string' )
        console.warn('Invalid csv content; Use `toCSV` to format a csv string');
    filename = filename || (new Date().getTime()+'.csv')
    opts.type = 'text/csv'
    downloadContent(content, filename, opts)
}

export const download = (url, filename = '', {
    standaloneHTML = ''
}={})=>{

    if( typeof url == 'string' ){
        try{
            url = new URL(url)
        }catch(err){
            url = new URL(url, location.protocol+'//'+location.host)
        }
    }

    if( url instanceof URL ){
        url.searchParams.set('downloadReq', true)
        if( !url.searchParams.has('download') )
            url.searchParams.set('download', true)
        url.searchParams.set('filename', filename)
    }

    const a = window.document.createElement('a');
    a.href = url
    a.style.display = 'none'
    a.target = '_blank'
    a.setAttribute('download', filename||'')

    /*
        iOS 😞

        iOS 13 Safari (normal) has a good download manager now
        BUT, standalone does not use it and instead the current
        page will redirect
        
        window.open() works, but I found an issue where a
        white screen would display after the first window.open
        
        This solution seems to fix things and has the added benefit
        of displaying a message to the user while the download is in progress
    */
    if( device.isiOS && device.isStandalone ){

        let popup = window.open('', 'Downloading...')

        var meta = document.createElement('meta');
        meta.name = 'viewport'
        meta.content = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=no'

        popup.document.head.appendChild(meta)
        popup.document.title = 'Downloading...'
        popup.document.body.innerHTML = standaloneHTML

        document.body.appendChild(a)
        popup.document.body.appendChild(a);   
        a.click()

        return;
    }

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export default download