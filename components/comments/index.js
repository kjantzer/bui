import { LitElement, html, css } from 'lit-element'
import Coll, { markCommentRead } from './models'
import Comment from './comment'
import WriteComment from './write'

customElements.define('b-comments', class extends LitElement{

    static set API_ROOT(val){ Coll.API_ROOT = val }
    static set User(val){ Coll.User = val }
    static set extensions(val){ WriteComment.extensions = val }
    static set avatarTag(val){ Comment.avatarTag = val }
    static set nameTag(val){ Comment.nameTag = val }

    static get listeners(){return {
        coll: {'add remove update': 'update'}
    }}

    static get properties(){return {
        group: {type: String},
        gid: {type: Number},
        replies: {type: Boolean} // not supported yet
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }

        :host([group="thread"]) {
            border-left: solid 1px var(--theme-text-accent);
            padding-left: .5em;
        }

        b-comment-row:not(:first-child) {
            margin-top: .5em;
        }
    `}

    shouldUpdate(changedProps){
        if( changedProps.get('group') != undefined || changedProps.get('gid') != undefined ){
            
            this.unbindListeners()
            this.coll.realtimeSync.close()
            this.__coll = null
            this.bindListeners()
            this.coll.realtimeSync.open()
            
            if( this.inViewport )
                this.refresh()
        }

        return super.shouldUpdate(changedProps)
    }

    get coll(){
        return this.__coll = this.__coll || new Coll({group: this.group, gid: this.gid})
    }

    firstUpdated(){
        
        this.intersectionObserver = new IntersectionObserver((entries)=>{

            this.inViewport = entries[0].isIntersecting
            if( !this.inViewport ) return
            this.refresh()
        });

        this.intersectionObserver.observe(this)
    }

    refresh(){
        this.markRead()
            
        if( !this.coll.hasFetched && !this.coll.isFetching )
            this.coll.fetchSync()
    }

    connectedCallback(){
        super.connectedCallback()
        
        this.coll.realtimeSync.open()

        if( this.intersectionObserver )
            this.intersectionObserver.observe(this)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.coll.realtimeSync.close()
        this.intersectionObserver.disconnect()
    }

    render(){return html`
        ${this.coll.map(m=>html`
            <b-comment-row .model=${m} .meta=${this.meta} @mark-read=${this.markRead}></b-comment-row>
        `)}

        <!-- write new comment -->
        <b-comment-row .coll=${this.coll} .meta=${this.meta}></b-comment-row>
    `}

    markRead(e){

        // do not mark as "read" unless the comments are within the viewport (where user can see them)
        if( !this.inViewport ) return

        // mark a single comment read
        if( e ){
            let {model} = e.detail
            markCommentRead(model)
        // mark all comments read
        }else{
            this.coll.forEach(m=>markCommentRead(m))
        }
    }

})

export default customElements.get('b-comments')