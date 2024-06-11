/*
    Require certain non-JS files 

    NOTE: apparently this is deprecated now :shrug:
*/
const fs = require('fs')

module.exports = function requireNonJS(ext){

    if( !Array.isArray(ext) )
        ext = [ext]

    ext.forEach(ext=>{
        if( ext[0] != '.' ) ext = '.'+ext
        console.log(ext);
        require.extensions[ext] = function (module, filename) {
            module.exports = fs.readFileSync(filename, 'utf8');
        };

    })
}