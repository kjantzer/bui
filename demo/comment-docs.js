const {readFile, readDir, fs} = require('../util/fs')
const extract = require('extract-comments')

function writeDoc(file, {prefix=''}={}){

    if( file.ext != 'js' ) return

    // if( file.name != 'color-scheme.js' ) return // TEMP

    let filename = file.name
    // let filename = 'avatar.js'
    let js = String(readFile(file.path))

    let docs = extract(js)

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

    // if( !docs ) return

    // fs.writeFileSync('./_built-docs/'+prefix+filename+'.md', docs)

    let title = docs.match(/^# (.+)\n/)?.[1] || file.name.replace('.'+file.ext, '')

    output.push({
        title,
        name: file.name,
        path: file.path,
        docs: docs || ''
    })
}

let dir = 'util'
let files = readDir(__dirname+'/../'+dir, {blacklist:['.DS_Store', 'index.js']})
// console.log(files);

let output = []

for( let file of files ){
    writeDoc(file)
}

fs.writeFileSync(__dirname+`/dist/docs-${dir}.js`, 'export default '+JSON.stringify(output, null, 4))

// writeDoc()