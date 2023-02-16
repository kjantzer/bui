module.exports = function({table, id='id', database}){

    database = database || this.db.pool.config.connectionConfig.database

     return this.db?.query(/*sql*/`
        SELECT TABLE_NAME, COLUMN_NAME
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE REFERENCED_TABLE_SCHEMA = ?
        AND REFERENCED_TABLE_NAME = ?
        AND REFERENCED_COLUMN_NAME = ?
    `, [
        database, table, id
    ])

}