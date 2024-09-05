const {readFile, readDir, fs} = require('../util/fs')
const extract = require('extract-comments')
const {capitalize} = require('../util/string')

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

        // console.log(docs);

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

        let tags = ['wip', 'deprecated']
        tag = title.match(new RegExp(`\\[(${tags.join('|')})\\]`, 'i'))?.[1] || ''

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

function writeDirDocs(dir, _files=[]){

    let files = readDir(__dirname+'/../'+dir, {blacklist:['.DS_Store', 'index.js', '_README.md']})

    // console.log(files);
    // return

    let output = []

    for( let file of files ){
        let docs = writeDoc(file)
        if( docs ) output.push(docs)
    }

    // output = output.sort((a,b)=>{
    //     if( a.tag == 'deprecated' ) return 1
    //     return a.title < b.title ? -1 : 1
    // })

    let filename = dir.replace(/\//g, '-')

    fs.writeFileSync(__dirname+`/dist/docs-${filename}.js`, 'export default '+JSON.stringify(output, null, 4))

}


writeDirDocs('util')
writeDirDocs('helpers/backbone')
writeDirDocs('helpers/lit')