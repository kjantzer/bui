const Model = require('../../../server/model')

let PushMsg

module.exports = class Comments extends Model {

    static set PushMsg(val){ PushMsg = val }

    static systemCommentFor(model, attrs){
        return new Comments({
            group: model.config.table,
            gid: model.id
        }, model.req).add(Object.assign({type: 'system'}, attrs))
    }

    static get api(){return {
        root: '/comments/:group/:gid',
        routes: [
            ['get', '/:id?', 'find'],
            ['post', '', 'add'],
            ['put', '/:id', 'update'],
            ['patch', '/:id', 'update'],
            ['delete', '/:id', 'destroy'],

            ['post', '/read', 'markRead'],
        ],
        sync: true
    }}

    get config(){ return {
        table: 'comments',
        tableAlias: 'c',
        jsonFields: ['meta'],
        sync: true
    }}

    // never include `this.id` in the sync path
    get syncPath(){ return this.apiPathPattern.stringify({group: this.group, gid: this.gid}) }

    findWhere(where){
        let {Value, JsonContains} = this.db.clauses

        if( this.group != '_')
            where.group = this.group

        // if requesting unread comments (with mentions)
        if( this.gid == 'unread' ){

            // comments NOT by this uer
            where['c.uid'] = new Value('!=', this.req.user.id)
            // NOT marked read
            where['cr.id'] = 'IS NULL'
            // comment mentions this user
            where['c.meta'] = new JsonContains(this.req.user.id, '$.mentions')

        }else{
            where.gid = this.gid
        }
        
    }

    findSql(where){
        let uid = this.req.user.id
        return /*sql*/`SELECT c.*, 
                        IF(c.uid = ${uid}, c.ts_created, cr.ts_created) ts_read
                        FROM ${this.config.table} ${this.config.tableAlias}
                        LEFT JOIN comment_reads cr ON cr.cid = c.id AND cr.uid = ${uid}
                        ${where}
                        ${this.findOrderBy()}
                        ${this.findLimit}`
    }

    beforeAdd(attrs){
        attrs.group = this.group
        attrs.gid = this.gid
        attrs.uid = this.req.user.id
    }

    async add(...args){
        let resp = await super.add(...args)
        this.sendPushMsg(resp)
        return resp
    }

    sendPushMsg(){
        if( PushMsg && this.attrs.meta && this.attrs.meta.mentions ){
            let meta = this.attrs.meta
            let msg = {
                tag: this.group+':'+this.gid,
                title: this.req.user.name,
                body: this.attrs.comment_plain,
                // since user was directly mentioned, keep notif open
                requireInteraction: true,
                data: {
                    path: this.attrs.meta.path,
                    attrs: this.attrs
                }
            }

            if( meta.title ){
                msg.title += ' - '+meta.title
            }

            if( meta.icon )
                msg.icon = meta.icon

            new PushMsg(msg).sendTo(this.attrs.meta.mentions)
        }
    }

    async destroy(...args){

        // delete all comments for a group/gid
        if( !this.id && this.group && this.gid ){
            return await this.db.q(/*sql*/`DELETE FROM ${this.config.table} 
                                            WHERE \`group\` = ? AND gid = ?`, [this.group, this.gid])
        }

        // delete any threaded messages that might exist
        if( this.id )
            await this.db.q(/*sql*/`DELETE FROM ${this.config.table} 
                                    WHERE \`group\` = ? AND gid = ?`, ['thread', this.id])

        return super.destroy(...args)
    }

    markRead(){
        let {ids} = this.req.body
        let rows = ids.map(id=>{
            return {cid: id, uid: this.req.user.id}
        })
        this.db.bulkInsert('comment_reads', rows)

        new Comments({group: '_', gid: 'unread'}).syncData({ids})
    }
}