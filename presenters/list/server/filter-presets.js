const Model = require('../../../server/model')

module.exports = class ListFilterPresets extends Model {

    static api = {
        root: '/bui-list-filters/:key',
        routes: [
            ['get', '/:id?', 'find'],
            ['post', '/', 'add'],
            ['patch', '/:id', 'update'],
            ['delete', '/:id', 'destroy']
        ]
    }

    config = {
        table: 'bui_list_filters',
        tableAlias: 'blf',
        nullFields: ['summary'],
        jsonFields: ['filters']
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

    beforeAdd(attrs){
        attrs.key = this.key
        attrs.uid = this.req.user.id
    }
}