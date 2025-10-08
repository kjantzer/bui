/*
    # downloadToFileSystem [WIP]

    Download files to the user's filesystem. Will prompt the user to select a directory if one is not provided.
    Process can be aborted by the user

    ```js
    let abortController = new AbortController()
    let files = [] // list of urls or objects with `downloadURL` or `url` property

    downloadToFileSystem(files, {
        startIn: 'downloads', // default
        signal: abortController.signal,
        progress: (data)=>{
            console.log('progress:', data)
        }
    })

    // abortController.abort() // cancel the download
    ```

    See: https://web.dev/file-system-access/

    NOTE: this is a work in progress. Not really designed to be used yet
*/

let directoryHandles = new Map()

export default async function downloadToFileSystem(files, {dirID='downloads', cacheHandle=true, dirName, startIn, progress, signal}={}){

    let directoryHandle = dirID && cacheHandle ? directoryHandles.get(dirID) : null

    if( !directoryHandle ){
        directoryHandle = await window.showDirectoryPicker({startIn, id: dirID});
        
        if( dirID && cacheHandle )
            directoryHandles.set(dirID, directoryHandle)
    }

    if( !Array.isArray(files) )
        files = [files]

    let abortController

    if( signal )
        signal.addEventListener('abort', ()=>{
            console.log('aborting current file');
            
            abortController?.abort() // cancel any ongoing downloads
        })

    // maybe create a new dir to save all files to
    const saveDirHandle = dirName ? await directoryHandle.getDirectoryHandle(dirName, {create: true}) : directoryHandle
    
    for( let file of files ){

        // entire download is aborted
        if( signal && signal.aborted )
            return console.log('aborting', file);

        // list of files could be urls or objects
        let url = file.downloadURL || file.url || file

        if( typeof url != 'string' )
            throw new Error('File missing url')

        // abort controller for current file
        abortController = new AbortController()

        const resp = await fetch(url, {signal: abortController.signal})

        // todo: hook up progress here?
        if( !resp.ok ) throw new Error(`Failed to fetch ${url}: ${resp.statusText}`)

        let filename = getFilename(resp)
        let fileHandle = await saveDirHandle.getFileHandle(filename, {create: true})
        
        let total = parseInt(resp.headers.get('Content-Length'), 10)
        let loaded = 0

        const progressStream = new TransformStream({
            transform(chunk, controller) {

                loaded += chunk.byteLength

                let data = {
                    file,
                    progress: Math.round((loaded / total) * 100),
                    size: loaded,
                    totalSize: total,
                    abortController
                }

                if( !abortController.signal.aborted )
                    progress?.(data)
                
                controller.enqueue(chunk)
            }
        });
        
        // let file = await fileHandle.getFile()
        // if( file.size > 0 )
        //     console.log('warn user of replacement?');

        const writable = await fileHandle.createWritable();


        // begin downloading the file, emitting progress, and failing silently if aborted by user
        await resp.body
        .pipeThrough(progressStream)
        .pipeTo(writable, {signal: abortController.signal})
        .catch(err=>{
            if( err.name === 'AbortError' )
                return // aborted intentionally
                
            throw err
        })
    }

    return true
}

// TODO: add fallback param?
function getFilename(resp){

    let filename = resp.headers.get('filename') 
    || (resp.url.split('/').pop().split('?')[0] 
    || 'downloaded-file')+new Date().getTime()

    const contentDisposition = resp.headers.get('Content-Disposition');
    if( contentDisposition ){
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match) filename = match[1];
    }

    return filename
}