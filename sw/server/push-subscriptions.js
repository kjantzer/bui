const Model = require('../../server/model')

module.exports = class PushSubscriptions extends Model {

    get canAccess(){
        if( this.uid != this.req.user.id)
            return false
        return true
    }

    static get api(){return {
        root: '/user/:uid/subscriptions',
        routes: [
            ['get', '/:id?', 'find'],
            ['post', '', 'add'],
            ['delete', '/:id', 'destroy'],
        ]
    }}

    get config(){ return {
        table: 'push_subscriptions',
        tableAlias: 'sub',
        jsonFields: ['sub']
    }}

    findWhere(where){
        if( !where.uid )
            where.uid = this.uid
    }
    
    beforeAdd(attrs){
        delete attrs.thisDevice // in case sent by client
        attrs.uid = this.uid
    }
}