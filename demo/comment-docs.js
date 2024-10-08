const {readFile, readDir, fs} = require('../util/fs')
const extract = require('extract-comments')
const {capitalize} = require('../util/string')

const TAGS = ['wip', 'deprecated']

function writeDoc(file, {title, prefix=''}={}){

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
        .map(s=>s.replace(/^\s{1,4}/, ''))
        .map(s=>s.replace(/^\t/, ''))
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
        path: file.path,
        docs: docs || ''
    }
}

function writeDirDocs(dir, {files=[], ignoreEmpty=false}={}){

    files = [...(dir?readDir(__dirname+'/../'+dir, {
        blacklist:['.DS_Store', 'index.js']
    }):[]), ...files]

    let output = []

    for( let file of files ){
        let docs = writeDoc(file)
        if( ignoreEmpty && !docs?.docs ){
            // ignore
        }else if( docs ){
            docs.dir = dir
            docs.path = docs.path.replace(__dirname+'/../', '')
            docs.id = docs.path // for backbone coll
            output.push(docs)
        }
    }

    let filename = dir.replace(/\//g, '-')

    // write JSON file with docs
    fs.writeFileSync(__dirname+`/dist/docs-${filename}.js`, 'export default '+JSON.stringify(output, null, 4))

    return output
}


let output = []

// writeDirDocs('presenters/list', {ignoreEmpty: true})

output.push(...writeDirDocs('app'))
output.push(...writeDirDocs('elements'))
output.push(...writeDirDocs('util'))
output.push(...writeDirDocs('helpers/backbone'))
output.push(...writeDirDocs('helpers/lit'))

fs.writeFileSync(__dirname+`/dist/docs-complete.js`, 'export default '+JSON.stringify(output, null, 4))