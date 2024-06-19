const Model = require('../../../server/model')
const {summarize} = require('../util')
const Files = require('./files')

let PushMsg

module.exports = class Comments extends Model {

    static set PushMsg(val){ PushMsg = val }
    static set FileOpts(val){
        Files.opts = val
    }

    static forModel(model, group=null){
        return new Comments({
            group: group || model.config.table,
            gid: model.id
        }, model.req)
    }

    static systemCommentFor(model, attrs){
        return this.forModel(model, attrs.group).addSystem(attrs)
    }

    static get api(){return {
        root: '/comments/:group/:gid',
        routes: [
            ['get', '/:id?', 'find'],
            ['post', '', 'add'],
            
            ['get', '/:id/files/:fileid?', 'findFiles'],
            ['post', '/:id/files', 'uploadFile'],
            
            ['put', '/:id', 'update'],
            ['patch', '/:id', 'update'],
            ['delete', '/:id', 'destroy'],

            ['post', '/read', 'markRead'],
        ],
        sync: true
    }}

    static related = {
        files: {
            relatedID: 'parent_id',
            model: __dirname+'/files', 
            getAttrs(){return {
                id: this.fileid,
                parent_id: this.id,
                parent_group: this.group,
                gid: this.gid
            }},
            // auto include files with this model if it has files
            with(row){ return row.attrs?.meta?.files }
        }
    }

    get config(){ return {
        table: 'comments',
        tableAlias: 'c',
        jsonFields: ['meta'],
        sync: true,
        orderBy: 'id desc'
    }}

    // never include `this.id` in the sync path
    get syncPath(){ return this.apiPathPattern.stringify({group: this.group, gid: this.gid}) }

    async findSummary(){
        let data = await this.find()
        return summarize(data)
    }

    get onlyUnread(){
        return this.gid == 'unread' || this.req.query.unread != undefined
    }

    findWhere(where){
        let {Value, JsonContains, Group, UnsafeSQL} = this.db.clauses
        let userID = this.req.user.id

        if( this.group != '_')
            where.group = this.group

        // if requesting unread comments (with mentions)
        if( this.onlyUnread ){

            // comments NOT by this uer
            where['c.uid'] = new Value('!=', userID)
            where['c.type'] = 'user' // skip system comments since they shouldn't have any mentions
            
            // ignore comments more than 3 months old (to speed things up)
            where.semiRecent = new UnsafeSQL('c.ts_created >= CURDATE() - INTERVAL 90 DAY')
            
            // NOT marked read or new comment
            where.unread = new Group({
                'cr.id': 'IS NULL'
            }, 'OR')

            // if requesting the "unread" report
            if( this.gid == 'unread' ){

                // also include recent comments even if read
                // NOTE: should this be opt-in?
                where.unread.set('recent', 
                    new UnsafeSQL('c.ts_created >= CURDATE() - INTERVAL 2 DAY'))

                // comment must mention this user
                where.mentioned = new Group({
                    'c.meta': new JsonContains(userID, {path:'$.mentions'}),
                    // 'c.group': 'changelog'
                }, 'OR')
            }

        }else if(this.gid == 'history' ){

            // comments NOT by this uer
            // where['c.uid'] = new Value('!=', userID)
            where['c.meta'] = new JsonContains(userID, {path:'$.mentions'})
            where['c.type'] = 'user'

        }else {
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

    addSystem(attrs){
        return this.add({type: 'system', ...attrs})
    }

    beforeAdd(attrs){
        attrs.group ||= this.group
        attrs.gid ||= this.gid
        attrs.uid = this.req.user.id
    }

    async add(...args){
        let resp = await super.add(...args)
        this.sendPushMsg(resp)
        return resp
    }

    sendPushMsg(){
        if( PushMsg && this.attrs?.meta && this.attrs.meta.mentions ){
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

        if( this.id ){
            let files = await this.files.find()
            for( let file of files ){
                await file.destroy()
            }
        }

        // delete all comments for a group/gid
        // TODO: need to delete files that may exist
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

    findFiles(){
        return this.files.find()
    }

    async uploadFile(){

        await this.find()
        let file = await this.files.upload()
        
        let meta = this.attrs.meta
        meta.files = meta.files || []

        meta.files.push(file.id)

        await this.update({meta}, {manualSync: true})

        // in case uploading more than one file, we need to sync all files
        this.files.id = null
        let files = await this.files.find()

        this.syncData({
            action: 'update',
            attrs: {
                id: this.id,
                files
            },
            method: this.req.method,
            url: this.apiPath
        },{
            toClients: this.req.path==this.syncPath ? null : 'all'
        })

        return file
    }
}