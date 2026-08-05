module.exports = function({table, database}){

    database = database || this.db.pool.config.connectionConfig.database

    return this.db?.query(/*sql*/`
        SELECT
            kcu.COLUMN_NAME
        FROM information_schema.TABLE_CONSTRAINTS tc
        JOIN information_schema.KEY_COLUMN_USAGE kcu
            ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
            AND tc.TABLE_SCHEMA = kcu.TABLE_SCHEMA
            AND tc.TABLE_NAME = kcu.TABLE_NAME
        WHERE tc.TABLE_NAME = ?
            AND tc.CONSTRAINT_TYPE IN ('PRIMARY KEY', 'UNIQUE')
        ORDER BY tc.CONSTRAINT_NAME, kcu.ORDINAL_POSITION
    `, [table]).values
}