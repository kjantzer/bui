const Model = require('../../../server/model')

module.exports = class ListFilterPresets extends Model {

    static api = {
        root: '/bui-list-filters/:key',
        routes: [
            ['get', '/:id?', 'find'],
            ['put', '/sort', 'saveSort'],
            ['post', '/', 'add'],
            ['patch', '/:id', 'update'],
            ['delete', '/:id', 'destroy']
        ]
    }

    config = {
        table: 'bui_list_filters',
        tableAlias: 'blf',
        nullFields: ['summary', 'group_name', 'sort'],
        jsonFields: ['filters'],
        // ungrouped first, then by group; in a group by `sort` (unsorted last), then name
        orderBy: 'group_name IS NOT NULL, group_name, sort IS NULL, sort, name'
    }

    findWhere(where){

        let {Group} = this.db.clauses

        where.key = this.key

        where.mineOrPublic = new Group({
            type: ['public', 'shared'],
            mine: new Group({
                uid: this.req.user.id,
            })
        }, 'OR')
    }

    // body: {ids: [...]} in their new order (ex: one group's presets after a drag)
    async saveSort(){
        let {ids} = this.req.body

        if( !Array.isArray(ids) || ids.length == 0 )
            throw new APIError('No ids given')

        await Promise.all(ids.map((id, i)=>this.db.query(/*sql*/`
            UPDATE bui_list_filters SET sort = ? WHERE id = ? AND \`key\` = ?
        `, [i+1, id, this.key])))

        return {ids}
    }

    beforeAdd(attrs){
        attrs.key = this.key
        attrs.uid = this.req.user.id
    }
}