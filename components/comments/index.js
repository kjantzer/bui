import { LitElement, html, css } from 'lit-element'
import Coll, { markCommentRead } from './models'
import Comment from './comment'
import WriteComment from './write'
import '../../helpers/lit/events'
import '../../helpers/lit/listeners'

customElements.define('b-comments', class extends LitElement{

    static set API_ROOT(val){ Coll.API_ROOT = val }
    static set User(val){ Coll.User = val }
    static set extensions(val){ WriteComment.extensions = val }
    static set avatarTag(val){ Comment.avatarTag = val }
    static set nameTag(val){ Comment.nameTag = val }

    static get listeners(){return {
        coll: {'add remove sync': 'updateView'}
    }}

    static get properties(){return {
        group: {type: String},
        gid: {type: Number},
        limit: {type: Number},
        placeholderBtn: {type: String},
        placeholder: {type: String},
        uploads: {type: Object},
        replies: {type: Boolean} // not supported yet
    }}

    static get styles(){return css`
        :host {
            display: flex;
            flex-direction: column-reverse;
            position:relative;
            gap: .5em;
        }

        :host([group="thread"]) {
            border-left: solid 1px var(--theme-text-accent);
            padding-left: .5em;
        }

        :host([overlay]) {
            --theme-text: var(--dark-text);
            --theme-text-accent: var(--dark-text-accent);
            --theme-text-rgb: var(--dark-text-rgb);
            --theme-bgd: var(--dark-bgd);
            --theme-bgd-accent: var(--dark-bgd-accent);
            --theme-bgd-accent2: var(--dark-bgd-accent2);
            color: var(--theme-text);
            background: linear-gradient(to bottom, transparent, rgba(0,0,0,.8));
        }

        .view-all ~ b-comment-row {
            display: none;
        }

        .view-all {
            --color: var(--btn-bgd-color, var(--theme-bgd-accent2, #ddd));
            --textColor: var(--btn-text-color, var(--theme-text, #111));
        }

        .view-all:hover {
            --color: var(--btn-bgd-color-hover, var(--theme-bgd-accent2, #ddd));
        }
    `}

    constructor(){
        super()
        this.limit = 10
        this.placeholderBtn = 'Comment'
        this.placeholder = 'Write a comment'
    }

    set model(model){
        this._model = model

        if( model ){
            this.gid = model.id
            this.meta = model.commentMeta ? model.commentMeta.bind(model) : null
        }else{
            this.gid = null
            this.meta = null
        }
    }

    get model(){ return this._model }

    shouldUpdate(changedProps){
        if( changedProps.get('group') != undefined || changedProps.get('gid') != undefined ){
            
            this.unbindListeners()
            this.coll.realtimeSync.close()
            this.__coll = null

            if( this.gid && this.group ){
                this.bindListeners()
                this.coll.realtimeSync.open()
                
                if( this.inViewport )
                    this.refresh()
            }
        }

        return super.shouldUpdate(changedProps)
    }

    get coll(){
        this.__coll = this.__coll || new Coll({group: this.group, gid: this.gid})
        this.__coll.gid = this.gid
        this.__coll.group = this.group
        return this.__coll
    }

    firstUpdated(){
        
        this.intersectionObserver = new IntersectionObserver((entries)=>{

            this.inViewport = entries[0].isIntersecting
            if( !this.inViewport ) return
            this.refresh()
        });

        this.intersectionObserver.observe(this)
    }

    updateView(){
        clearTimeout(this._updateDelay)
        this._updateDelay = setTimeout(()=>{
            
            if( this.coll.length )
                this.setAttribute('num', this.coll.length)
            else
                this.removeAttribute('num')

            this.update()
            if( this.model )
                this.model.set('comments', this.coll.summarize())
        },10)
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

        <!-- write new comment -->
        <b-comment-row 
            part="write-comment" 
            .coll=${this.coll} 
            .meta=${this.meta}
            .uploads=${this.uploads}
            placeholderBtn=${this.placeholderBtn}
            placeholder=${this.placeholder}
        ></b-comment-row>

        ${this.coll.map((m,i)=>html`

            ${this.limit&&i==this.coll.length-this.limit?html`
                <b-btn color="white" block @click=${this.viewAllComments} class="view-all">View all comments</b-btn>
            `:''}
            
            <b-comment-row 
                part="comment" 
                .model=${m} 
                .meta=${this.meta} 
                placeholderBtn=${this.placeholderBtn}
                placeholder=${this.placeholder}
                @mark-read=${this.markRead}
            ></b-comment-row>

        `).reverse()}
    `}

    viewAllComments(e){
        e.currentTarget.remove()
    }

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

        if( this.model )
            this.model.set('comments', this.coll.summarize())
    }

})

export default customElements.get('b-comments')