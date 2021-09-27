import Backbone, {Collection, Model} from 'backbone'
import sync, {syncBackboneCollection} from '../../realtime/client/sync'
import '../../helpers/day-js'
import '../../helpers/backbone/promises'

let API_ROOT = '/api'
let User = window.User

function userID(){
    return User && (User.get('kiosk_active_user')||User.id)
}

export default class Comments extends Collection {

    static set API_ROOT(val){ API_ROOT = val }
    static set User(val){ User = val }

    constructor({group=null, gid=null}={}){
        super()
        this.group = group
        this.gid = gid
        this.realtimeSync = sync(this.url(), this)
    }

    comparator(m){
        // show newest first when listing "unread"
        if( this.gid == 'unread' )
            return -1 * m.get('ts_created').sortValue()
        
        return m.get('ts_created').sortValue()
    }

    onSync(data){
        if( this.gid == 'unread' ){
            this.remove(data.ids) // should be array of IDs
        }else{
            syncBackboneCollection.call(this, data)
        }
    }

    url(){ return `${API_ROOT}/comments/${this.group}/${this.gid}` }
    get model(){ return Comment }

    get isThread(){ return this.group == 'thread' }

    get numUnread(){ return this.filter(m=>m.isUnread).length }

    fetch(...args){
        if( !Backbone.$ ) return

        if( !this.group || !this.gid )
            throw new Error('Missing group/ID')

        return super.fetch(...args)
    }
}

class Comment extends Model {

    get attrTypes(){return {
        ts_created: 'date',
        ts_updated: 'date',
        ts_read: 'date'
    }}

    get isByMe(){ return userID() == this.get('uid')}
    get meta(){ return this.attributes.meta || {} }
    
    get isUnread(){ return !this.isByMe && !this.get('ts_read').isValid() }
    get isResolved(){ return !!this.meta.resolved }
    
    get reactions(){ return this.meta.reactions || [] }
    get userHasReacted(){ return this.reactions.includes(userID()) }
    
    toggleResolved(){
        let meta = this.meta
        
        if( meta.resolved )
            delete meta.resolved
        else
            meta.resolved = true
        
        this.saveSync('meta', meta, {patch: true})
        this.trigger('change')
        return meta.resolved
    }

    toggleReaction(){
        if( !User ) return

        let meta = this.meta
        let reactions = meta.reactions || []
        let index = reactions.indexOf(userID())

        if( index > -1 )
            reactions.splice(index, 1)
        else
            reactions.push(userID())
        
        if( reactions.length > 0 )
            meta.reactions = reactions
        else
            delete meta.reactions

        this.saveSync('meta', meta, {patch: true})
        this.trigger('change')
        return meta.reactions || []
    }
}


let ReadComments = new Set()
let saveReadComments

// queues up comments to mark as read (will save a bunch on one request)
export function markCommentRead(model){

    if( !User ) return
    
    // ignore if already read or comment is by this user
    if( !model.isUnread || userID() == model.get('uid') )
        return

    ReadComments.add(model)

    clearTimeout(saveReadComments)
    saveReadComments = setTimeout(()=>{
        
        let ids = Array.from(ReadComments.values()).map(model=>{
            model.set('ts_read', new Date())
            return model.id
        })

        fetch(`${API_ROOT}/comments/_/_/read`, {
            method: 'POST', body: JSON.stringify({ids}), headers:{'Content-type': 'application/json'}
        })

        ReadComments.clear()

    }, 1000);
}