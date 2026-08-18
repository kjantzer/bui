/*
    # fsp (node)

    Some basic methods for working with files using native require('fs').promises

    ```js
    import {readDir, readFile, getFileInfo, fs} from 'bui/util/fs'
    ```
*/
const path = require('path')
const fs = require('fs')
const fsp = fs.promises
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
const readDir = async (dirPath, {
    ignore=false, // regex
    whitelist=false,
    blacklist=['.DS_Store'],
    recursive=true,
    forceArray=false
}={})=>{

    try{
        await fsp.access(dirPath)
    }catch(err){
        return []
    }

    let stats = await fsp.lstat(dirPath)
    let info = []

    if( stats.isFile() ){
        info = await getFileInfo(dirPath)
        return forceArray ? [info] : info
    }

    let files = (await fsp.readdir(dirPath)).filter(file=>{

        if( ignore && file.match(ignore) )
            return false

        if( whitelist )
            return whitelist.includes(file)
        else
            return !blacklist.includes(file)
    })


    for( let file of files ){

        let fileInfo = await getFileInfo(dirPath, file)

        if( recursive && fileInfo.type == 'd' )
            fileInfo.files = await readDir(path.join(dirPath, file), {ignore, whitelist, blacklist, recursive, forceArray})

        info.push(fileInfo)
    }

    return info
}

/*
    ### `getFileInfo`
    Get info like dates modified and extension of file
*/
const getFileInfo = async (dirPath, file='')=>{

    if( !file ){
        let filePath = dirPath.split('/')
        file = filePath.pop()
        dirPath = filePath.join('/')
    }

    let stats = await fsp.stat(path.join(dirPath, file))
    
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
const readFile = async (filePath, {raw=false, csvOpts={}}={})=>{
    try{
        await fsp.access(filePath)
    }catch(err){
        throw Error('does not exist')
    }

    let contents = await fsp.readFile(filePath);

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

/*
    ## `downloadRemoteFile(url, {destFile})`

    Download a file from a remote url. Will write to destFile or return resp that you can `resp.pipe` yourself
    Can follow 302 redirects    
*/
function downloadRemoteFile(url, {destFile}={}){
    
    const protocol = url.startsWith('https') ? https : http

    return new Promise((resolve, reject) => {
        
        protocol.get(url, resp=>{

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
            fsp.unlink(destFile).catch(()=>{}).finally(() => reject(err));
        });
    });
}

// const fs = require('fs');
const crypto = require('crypto');

// Encryption settings
// https://mohammedshamseerpv.medium.com/encrypt-and-decrypt-files-in-node-js-a-step-by-step-guide-using-aes-256-cbc-c25b3ef687c3
const algorithm = 'aes-256-cbc';
const iterations = 100000;
const keyLength = 32;
const ivLength = 16;

// Function to derive a key and IV from a passphrase and salt
function deriveKeyAndIV(password, salt) {
  // Derive the key using PBKDF2
  const key = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
  const iv = key.slice(0, ivLength); // Use the first 16 bytes as the IV
  return { key, iv };
}

// Function to encrypt the file content
async function encryptFile(filePath, password) {

    const salt = crypto.randomBytes(16);
    const { key, iv } = deriveKeyAndIV(password, salt);

    const fileData = await fsp.readFile(filePath);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encryptedData = Buffer.concat([cipher.update(fileData), cipher.final()]);

    return Buffer.concat([salt, encryptedData])
}

async function decryptFile(filePath, password) {

    const fileData = await fsp.readFile(filePath);

    const salt = fileData.slice(0, 16);
    const encryptedData = fileData.slice(16);

    const { key, iv } = deriveKeyAndIV(password, salt);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
}

module.exports = {readDir, readFile, getFileInfo, downloadRemoteFile, fs, encryptFile, decryptFile}