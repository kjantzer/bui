

function createStatesTable(db, tableName='ref_geo_states'){
    return db.query(/*sql*/`
        CREATE TABLE ? (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(48) DEFAULT NULL,
        usps varchar(2) DEFAULT NULL,
        uscg varchar(2) DEFAULT NULL,
        alt_abbr json DEFAULT NULL,
        demonym varchar(48) DEFAULT NULL,
        census_region varchar(48) DEFAULT NULL,
        census_division varchar(48) DEFAULT NULL,
        contiguous tinyint(1) NOT NULL DEFAULT '1',
        territory tinyint(1) NOT NULL DEFAULT '0',
        iso varchar(8) DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY usps (usps) USING BTREE,
        KEY uscg (uscg) USING BTREE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `, [tableName])
}

function writeStatesToDB(db, {tableName= 'ref_geo_states'}={}){

    const {list} = require('./states')
    const {slugify} = require('../string')

    let states = list

    // convert camelcase to underscores (to maintain our DB structure)
    states = list.map(d=>{
        let o = {}
        for(let k in d){
            o[slugify(k, {removeCamelcase: true})] = d[k]
        }

        o.alt_abbr = JSON.stringify(o.alt_abbr)
        
        return o
    })

    return db.bulkInsert(tableName, states, {update: true})
}

module.exports = {createStatesTable, writeStatesToDB}