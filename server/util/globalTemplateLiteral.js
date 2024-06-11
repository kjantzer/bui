// tagged template literal – ex: require(bui`server/model`)
module.exports = function globalTemplateLiteral(name, basePath){
    global[name] = function(strings){
        let path = strings[0]
        if( path[0] != '/' )
            path = '/'+path
        return basePath+path
    }
}