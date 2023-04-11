
module.exports = {
    Clause: require('./Clause'),
    Group: require('./Group'),
    Value: require('./Value'),
    Like: require('./Like'),
    FullText: require('./FullText'),
    Between: require('./Between'),
    FindInSet: require('./FindInSet'),
    JsonContains: require('./JsonContains'),
    JsonMergePatch: require('./JsonMergePatch'),
    JsonSearch: require('./JsonSearch'),
    IsEmpty: require('./IsEmpty'),
    NotEmpty: require('./NotEmpty'),
    UnsafeSQL: require('./UnsafeSQL'),

    // template literal: sqlStr`some string`
    sqlStr: strings=>{
        return {toSqlString: _=>strings[0]}
    }
}