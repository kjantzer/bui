/*
    See: https://web.dev/file-system-access/

    NOTE: this is a work in progress. Not really designed to be used yet
*/

let directoryHandles = new Map()

export default async function downloadFileTo(url, {dirID='downloads', filename, startIn}={}){

    let directoryHandle = directoryHandles.get(dirID)

    if( !directoryHandle ){
        directoryHandle = await window.showDirectoryPicker({startIn, id: dirID});
        directoryHandles.set(dirID, directoryHandle)
    }
    
    const resp = await fetch(url);

    if( !filename )
        filename = resp.headers.get('filename') || 'unknown-'+(new Date().getTime())
    
    const fileHandle = await directoryHandle.getFileHandle(filename, {create: true});
    
    // let file = await fileHandle.getFile()
    // if( file.size > 0 )
    //     console.log('warn user of replacement?');

    const writable = await fileHandle.createWritable();

    await resp.body.pipeTo(writable)

    return true
}