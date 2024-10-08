import { LitElement, html, css } from 'lit'
import Coll, { markCommentRead } from './models'
import Comment from './comment'
import WriteComment from './write'
import '../../helpers/lit/emitEvent'
import '../../helpers/lit/listeners'

customElements.define('b-comments', class extends LitElement{

    static set API_ROOT(val){ Coll.API_ROOT = val }
    static set User(val){ Coll.User = val }
    static set extensions(val){ WriteComment.extensions = val }
    static set avatarTag(val){ Comment.avatarTag = val }
    static set nameTag(val){ Comment.nameTag = val }
    static set renderMeta(val){ Comment.renderMeta = val }

    static get listeners(){return {
        coll: {'add remove sync': 'updateView'}
    }}

    static get properties(){return {
        group: {type: String},
        gid: {type: Number},
        limit: {type: Number},
        unread: {type: Boolean},
        placeholderBtn: {type: String},
        placeholder: {type: String},
        singular: {type: String},
        plural: {type: String},
        uploads: {type: Object},
        replies: {type: Boolean}, // not supported yet
        nosummary: {type: Boolean},
        disabled: {type: Boolean}
    }}

    static get styles(){return css`
        :host {
            display: flex;
            flex-direction: column-reverse;
            position:relative;
            gap: .5em;
        }
        
        :host([newest]) {
            flex-direction: column;
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

        :host([inline]) ::part(main) {
            display: flex;
            flex-wrap: wrap;
            column-gap: 1ch;
        }
        
        :host([inline]) b-comment-row {
            padding-top: .25em !important;
            padding-bottom: .25em !important;
        }

        :host([inline]) ::part(avatar) {
            display: none;
        }

        :host([inline]) ::part(comment) { order: -1;}

        :host([inline]) ::part(header) { align-items: center;}
    `}

    constructor(){
        super()
        this.gid = null
        this.group = null
        this.limit = 10
        this.singular = 'comment'
        this.plural = 'comments'
        this.placeholderBtn = 'Comment'
        this.placeholder = 'Write a comment'
    }

    set model(model){
        this._model = model

        if( model ){
            this.meta = model.commentMeta ? model.commentMeta.bind(model) : null

            if( !this.hasAttribute('gid') )
                this.gid = model.id

            if( !this.hasAttribute('group') && model.name )
                this.group = model.name

        }else{
            this.meta = null

            if( !this.hasAttribute('gid') && this.gid )
                this.gid = null

            if( !this.hasAttribute('group') && this.group )
                this.group = null
        }
    }

    get model(){ return this._model }

    shouldUpdate(changedProps){

        // hmmm...this change broke syncing...need to revaluate why I did this
        // if( changedProps.get('group') != undefined 
        // || changedProps.get('gid') != undefined 
        // || (this.gid && this.gid != changedProps.get('gid') )){

        if( changedProps.get('group') !== undefined || changedProps.get('gid') !== undefined ){
            
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
        return this.__coll
    }

    firstUpdated(){
        
        this.intersectionObserver = new IntersectionObserver((entries)=>{
            this.inViewport = !!entries.find(e=>e.isIntersecting)
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
            this.propagateSummary()
        },10)
    }

    async refresh(){
        this.markRead()
        
        if( !this.coll.hasFetched && !this.coll.isFetching ){

            let data = {}

            // only fetch unread
            if( this.unread )
                data.unread = true

            await this.coll.fetchSync({data})
        }
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

        <slot name="before"></slot>

        <!-- write new comment -->
        <b-comment-row 
            ?hidden=${this.disabled}
            part="write-comment" 
            .coll=${this.coll} 
            .meta=${this.meta}
            .uploads=${this.uploads}
            placeholderBtn=${this.placeholderBtn}
            placeholder=${this.placeholder}
        ></b-comment-row>

        ${this.coll.length==0&&this.unread?html`
            <b-empty-state>
                <slot name="unread-empty">
                    No unread ${this.plural}
                    <b-btn sm clear color="theme" block @click=${this.viewAllComments} class="view-all">View previous</b-btn>
                </slot>
            </b-empty-state>
        `:''}

        ${this.coll.map((m,i)=>html`

            ${this.limit&&i==this.coll.length-this.limit?html`
                <b-btn sm color="white" block @click=${this.viewAllComments} class="view-all">View all ${this.plural}</b-btn>
            `:''}
            
            <b-comment-row 
                ?disabled=${this.disabled}
                part="comment" 
                .renderMeta=${this.renderMeta}
                .model=${m} 
                .meta=${this.meta} 
                placeholderBtn=${this.placeholderBtn}
                placeholder=${this.placeholder}
                @mark-read=${this.markRead}
            ></b-comment-row>

        `).reverse()}

        <slot name="after"></slot>
    `}

    async viewAllComments(e){
        
        let btn = e.currentTarget

        if( this.unread ){
            this.unread = false
            this.coll.hasFetched = false
            btn.spin = true
            await this.refresh()
            btn.remove()
        }else{
            btn.remove()
        }
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

        this.propagateSummary()
    }

    propagateSummary(){
        if( !this.nosummary && this.model 
        && !Array.isArray(this.model.get('comments')) && !this.model.get('comments')?.fetch )
            this.model.set('comments', this.coll.summarize())
    }

})

export default customElements.get('b-comments')