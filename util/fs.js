const path = require('path')
const fs = require('fs')
const csvToArray = require('./csvToArray')

const readDir = (dirPath, {
    whitelist=false,
    blacklist=['.DS_Store'],
    recursive=true
}={})=>{

    if( !fs.existsSync(dirPath) )
        return []
        
    let stats = fs.lstatSync(dirPath)

    if( stats.isFile() )
        return getFileInfo(dirPath)

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

const getFileInfo = (dirPath, file='')=>{

    let stats = fs.statSync(path.join(dirPath, file))
    
    let fileInfo = {
        id: file,
        path: dirPath,
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

const readFile = (filePath, {raw=false}={})=>{
    if( !fs.existsSync(filePath) )
        throw Error('does not exist')

    let contents = fs.readFileSync(filePath);

    // attempt to parse content 
    if( !raw ){

        if( filePath.match(/\.json$/) )
            contents = JSON.parse(contents)

        if( filePath.match(/\.txt$/) )
            contents = String(contents)

        if( filePath.match(/\.csv$/) )
            contents = csvToArray(String(contents))
    }

    return contents
}

module.exports = {readDir, readFile, getFileInfo}