const {parseDirDocComments, fs} = require('../util/parseCommentDocs')

let output = []

// demo build is written to a "dist" dir, make sure it exists
if( !fs.existsSync(__dirname+`/dist`) ){
    fs.mkdirSync(__dirname+`/dist`)
}

;['app', 'elements', 'presenters', 'components', 'util', 'helpers/backbone', 'helpers/lit', 'server'].forEach(path=>{

    output.push(...parseDirDocComments(path, {
        blacklist: ['index.js', 'logo.js', 'sub.js', 'sup.js', 'headers.js', 'fileManager.js']
    }))

})


fs.writeFileSync(__dirname+`/dist/docs-complete.js`, 'export default '+JSON.stringify(output, null, 4))