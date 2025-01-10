/*
    # fs (node)

    Some basic methods for working with files using native require('fs')

    ```js
    import {readDir, readFile, getFileInfo, fs} from 'bui/util/fs'
    ```
*/
const path = require('path')
const fs = require('fs')
const https = require('https')
const http = require('http')
const csvToArray = require('./csvToArray')

/*
    ### `readDir(path, opts)`
    
    Get a list of files/directories at the path given

    #### Options
    - `whitelist`
    - `blacklist`
    - `recursive` (true)
*/
const readDir = (dirPath, {
    whitelist=false,
    blacklist=['.DS_Store'],
    recursive=true
}={})=>{

    if( !fs.existsSync(dirPath) )
        return []
        
    let stats = fs.lstatSync(dirPath)

    if( stats.isFile() ){
        return getFileInfo(dirPath)
    }

    let files = fs.readdirSync(dirPath).filter(file=>{
        if( whitelist ) 
            return whitelist.includes(file)
        else
            return !blacklist.includes(file)
    })
    let info = []

    for( let file of files ){

        let fileInfo = getFileInfo(dirPath, file)

        if( recursive && fileInfo.type == 'd' )
            fileInfo.files = readDir(path.join(dirPath, file), {blacklist, recursive})

        info.push(fileInfo)
    }

    return info
}

/*
    ### `getFileInfo`
    Get info like dates modified and extension of file
*/
const getFileInfo = (dirPath, file='')=>{

    if( !file ){
        let filePath = dirPath.split('/')
        file = filePath.pop()
        dirPath = filePath.join('/')
    }

    let stats = fs.statSync(path.join(dirPath, file))
    
    let fileInfo = {
        id: file,
        path: dirPath+'/'+file,
        name: file,
        type: stats.isDirectory() ? 'd' : 'f',
        size: stats.size,
        mtime: stats.mtime,
        ctime: stats.ctime
    }

    if( fileInfo.type == 'f' )
        fileInfo.ext = fileInfo.name.split('.').pop()

    return fileInfo
}

/*
    ### `readFile(path)`

    Reads file and parses to proper format for some extension types (json, csv, txt, md, html, svg, csv)
*/
const readFile = (filePath, {raw=false, csvOpts={}}={})=>{
    if( !fs.existsSync(filePath) )
        throw Error('does not exist')

    let contents = fs.readFileSync(filePath);

    // attempt to parse content 
    if( !raw ){

        if( filePath.match(/\.json$/) )
            contents = JSON.parse(contents)

        if( filePath.match(/\.(txt|md|html|svg)$/) )
            contents = String(contents)

        if( filePath.match(/\.csv$/) )
            contents = csvToArray(String(contents), csvOpts)
    }

    return contents
}

function downloadRemoteFile(url, {destFile}={}){
    
    const http = url.startsWith('https') ? https : http

    return new Promise((resolve, reject) => {
        
        http.get(url, resp=>{

            // retry download with the redirect url
            if( resp.statusCode == 302 ){

                // add file extension from redirect url if the destFile doesn't have one
                if( destFile && !destFile.match(/\..{2,4}$/) ){
                    let [,ext] = resp.headers.location.match(/\.(.{2,4})$/)
                    destFile += ext ? '.'+ext : ''
                }

                return downloadRemoteFile(resp.headers.location, {destFile})
                    .then(resp=>{resolve(resp)})
                    .catch(err=>reject(err))
            }

            if( resp.statusCode !== 200 )
                return reject(new Error(`Failed to get '${url}' (${resp.statusCode})`));

            // TODO: use content-type to add extension if missing?
            // console.log(resp.headers['content-type']);

            if( destFile ){

                const file = fs.createWriteStream(destFile);

                resp.pipe(file);

                file.on('finish', () => {
                    file.close(() => resolve(destFile));
                });

            }else{
                resolve(resp)
            }

        }).on('error', (err) => {
            fs.unlink(destFile, () => reject(err));
        });
    });
}

module.exports = {readDir, readFile, getFileInfo, downloadRemoteFile, fs}