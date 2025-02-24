/*
    # globalTemplateLiteral
    
    Simplify paths needed to import core files without having to traverse up the file system.
    
    ```js
    // define the global path
    globalTemplateLiteral('bui', path.join(__dirname, '..', 'bui'))

    // now use it from anywhere in the code
    require(bui`server/model`)
    // instead of:
    require('../../../server/model) // for a nested file
    ```
*/
module.exports = function globalTemplateLiteral(name, basePath){
    global[name] = function(strings){
        let path = strings[0]
        if( path[0] != '/' )
            path = '/'+path
        return basePath+path
    }
}