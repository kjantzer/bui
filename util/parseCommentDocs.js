/*
    # Parse Comment Docs

    Reads files looking for block comments that start with a markdown h1 line

    ```js
    import {parseDirDocComments, parseFileDocComments} = require('bui/util/parseCommentDocs')
    
    let docs = parseDirDocComments(path, {blacklist: ['index.js']})
    ```
*/
const {readFile, readDir, fs} = require('./fs')
const extract = require('extract-comments')
const path = require('path')
const {capitalize} = require('./string')

const TAGS = ['wip', 'deprecated']
const BLACKLIST = ['.DS_Store']

function parseFileDocComments(file, {title}={}){

    // if a directory, look for a readme
    if( file.type == 'd' ){
        file = file.files.find(f=>f.name == 'README.md')

    // ignore top level readme
    }else if( file?.name == 'README.md' )
        return

    if( file?.ext != 'js' && file?.name != 'README.md' ) return

    let filename = file.name
    let docs = String(readFile(file.path))
    let tag = ''

    // use readme as is, no parsing...just determin the title
    if( filename == 'README.md'){
        title = docs.match(/^# (.+)\n/)?.[1] || capitalize(file.path.match(/\/([a-z]+)\/README.md/i)?.[1] || '[unknown]')

    }else{
        docs = extract(docs)

        docs = docs
        .filter(d=>d.type=='BlockComment'&&d.value.match(/\n/)&&d.value.match(/^[\s\t]+(#|`)/))
        .map(d=>d.value)
        .join(`\n`)
        .trim()
        .split('\n')
        .map(s=>s.replace(/^\s{1,4}/, '')) // remove line space indent
        .map(s=>s.replace(/^\t/, '')) // remove line tab indent
        .join(`\n`)

        title ||= docs.match(/^# (.+)\n/)?.[1] || file.name.replace('.'+file.ext, '')

        tag = title.match(new RegExp(`\\[(${TAGS.join('|')})\\]`, 'i'))?.[1] || ''

        if( tag ){
            title = title.replace(`[${tag}]`, '')
        }
    }

    return {
        title,
        tag: tag.toLowerCase(),
        name: file.name,
        path: path.resolve(file.path), // get abs path
        docs: docs || ''
    }
}

function parseDirDocComments(dir, {files=[], ignoreEmpty=false, blacklist=[]}={}){

    if( Array.isArray(dir) )
        return 

    files = [...(dir?readDir(__dirname+'/../'+dir, {
        blacklist: [...BLACKLIST, ...blacklist]
    }):[]), ...files]

    let output = []
    let dirRoot = __dirname.replace('/util', '')

    for( let file of files ){

        let docs = parseFileDocComments(file)

        if( ignoreEmpty && !docs?.docs ){
            // ignore
        }else if( docs ){
            docs.dir = dir.replace(/\//g, ' / ')
            
            // change path to relative
            docs.path = docs.path.replace(dirRoot+'/', '').replace('/README.md', '')
            
            // make ID that can be in url slug
            docs.id = docs.path.replace(/(\/README)?\.[a-z]{2,3}$/i, '').replace(/[\.\/ ]/g, '-')

            if( docs.filename == 'README.md' )
                docs.filename = docs.path.replace(/(\/README)?\.[a-z]{2,3}$/i, '')

            output.push(docs)
        }
    }

    return output
}

module.exports = {parseFileDocComments, parseDirDocComments, fs}