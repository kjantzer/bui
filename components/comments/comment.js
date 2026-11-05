import { LitElement, html, css } from 'lit'
import {unsafeHTML} from 'lit/directives/unsafe-html.js'
import Menu, {Dialog} from '../../presenters/menu'
import styles from '../../presenters/form/controls/text-editor/style'
import '../../elements/text'
import '../../elements/ts'
import '../../elements/new-badge'
import '../../elements/hr'
import '../../elements/btn'
import './file'
import {bindLongpress} from 'bui/util/touch-events'

let avatarTag
let nameTag
let renderMeta

customElements.define('b-comment-row', class extends LitElement {

    static set avatarTag(val){ avatarTag = val }
    static set nameTag(val){ nameTag = val }
    static set renderMeta(val){ renderMeta = val }

    static get listeners(){return {
        model: {'change': 'requestUpdate'}
    }}

    static get properties(){return {
        editing: {type: Boolean, reflect: true},
        placeholderBtn: {type: String},
        placeholder: {type: String},
        replies: {type: Boolean},
        disabled: {type: Boolean, reflect: true},
        compose: {type: Boolean, reflect: true}, // (new comment: your avatar and a field to type in, instead of the button)
        feed: {type: Boolean, reflect: true}, // (updates as a dot, who, what, and the time; see b-comments `feed`)
    }}

    constructor(){
        super()
        this.replies = false
        this.placeholderBtn = 'Comment'
        this.placeholder = 'Write a comment'

        bindLongpress(this)

        this.addEventListener('contextmenu', this.showMenu)
    }

    connectedCallback(){
        super.connectedCallback()
        
        if( this.model )
            this.emitEvent('mark-read', {model: this.model})
    }

    static get styles(){return [css`
        :host {
            display: grid;
            position:relative;
            grid-template-columns: auto 1fr;
            gap: .5em;
        }

        :host([hidden]) { display: none !important; }

        :host([no-avatar]) {
            grid-template-columns: 1fr;
        }

        :host([no-name]) .name { display: none; }

        :host(.popover-open) {
            box-shadow: 0 0 0 2px var(--theme);
            border-radius: 3px;
        }

        :host([resolved]:not(:hover)) {
            color: var(--theme-text-dim);
        }

        .avatar {
            display: var(--comment-avatar-display, inline-flex);
            --size: 2em;
            margin-top: .2em;
        }

        :host([type="system"]) [part="avatar-wrapper"] {
            margin-top: 0;
            margin-left: 1em;
            position: relative;
            left: -.45em;
            align-self: center;
        }

        :host([type="system"]) .avatar {
            --size: 1em;
        }

        header {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: .5em;
            font-size: var(--font-size-sm);
            color: var(--theme-text-accent);
        }

        .comment {
            font-size: var(--b-comment-font-size, unset);
        }

        .comment > :first-child {
            margin-top: 0;
        }

        .comment > :last-child {
            margin-bottom: 0;
        }

        b-write-comment {
            margin-top: -.5em;
        }

        b-write-comment[compose] {
            margin-top: 0;
            align-self: center;
        }

        b-btn.write {
            grid-column: span 2;
            --color: var(--btn-bgd-color, var(--theme-bgd-accent2, #ddd));
            --textColor: var(--btn-text-color, var(--theme-text, #111));
        }

        b-btn.write:hover {
            --color: var(--btn-bgd-color-hover, var(--theme-bgd-accent2, #ddd));
        }

        /* feed: an update is a dot (on the rail), then who, what, and the time */
        :host([feed][type="system"]) {
            grid-template-columns: 2em minmax(0, 1fr);
        }

        .dot {
            justify-self: center;
            position: relative;
            z-index: 1;
            width: 10px;
            height: 10px;
            margin-top: .4em;
            border-radius: 50%;
            background: color-mix(in srgb, var(--theme-text) 22%, var(--theme-bgd));
            box-shadow: 0 0 0 3px var(--comment-feed-bgd, var(--theme-bgd));
        }

        .line {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: .3em .4em;
            min-width: 0;
            min-height: 1.5em;
            font-size: .9rem;
            color: var(--theme-text-accent);
        }

        .line .name {
            color: var(--theme-text);
            font-weight: 600;
        }

        .line .when {
            font-size: .8rem;
        }

        .line .comment {
            display: contents;
        }

        .line .arrow {
            color: var(--theme-text-accent);
        }

        .line ins {
            display: inline-flex;
            align-items: center;
            min-height: 1.45em;
            padding: .05em .6em;
            line-height: 1.25;
            border-radius: 99px;
            font-size: .8rem;
            font-weight: 600;
            color: var(--comment-ins-color, var(--green-700));
            background: color-mix(in srgb, var(--comment-ins-color, var(--green-700)) 12%, var(--theme-bgd));
        }

        :host([compose]:not([editing])) [part="avatar-wrapper"] {
            align-self: center;
        }

        :host([compose]:not([editing])) .avatar {
            margin-top: 0;
        }

        .compose {
            all: unset;
            box-sizing: border-box;
            align-self: center;
            min-width: 0;
            padding: .45em 1em;
            line-height: 1.4; /* (the editor's, so it opens the same size, see write.js) */
            border-radius: 99px;
            border: solid 1px var(--theme-bgd-accent);
            color: var(--theme-text-accent);
            cursor: text;
        }

        .compose:hover {
            background: var(--theme-bgd-accent);
        }

        .compose:focus-visible {
            outline: 2px solid var(--theme);
            outline-offset: 1px;
        }

        b-btn.reply {
            --padding: 0 .5em;
        }

        b-btn.resolve,
        b-btn.reaction {
            --padding: 0 .25em;
            margin: -.25em;
        }

        :host([resolved]) b-btn.resolve {
            color: var(--green);
        }

        :host(:not([resolved]):not(:hover)) b-btn.resolve {
            visibility: hidden;
            pointer-events: none;
        }

        b-btn.reaction {
            /* float:right; */
            display: inline-flex;
            align-items: center;
        }

        :host(:not(:hover)) b-btn.reaction[num="0"] {
            visibility: hidden;
            pointer-events: none;
        }

        .extras {
            display: flex;
            align-items: center;
        }

        .extras > * {
            margin-left: .5em !important;
        }

        .extras b-hr {
            margin: 0 1em;
            min-width: 0;
        }

        :host([disabled]) .extras {
            display: none;
        }

        :host(:not(:hover)) .extras b-hr {
            visibility: hidden;
        }

        /* b-btn.reaction[num="0"] {
            color: var(--theme-text-accent);
        } */

        b-btn.reaction:not([num="0"]):after {
            content: attr(num)' ';
        }

        b-btn.reaction[reacted] {
            background-color: rgba(var(--theme-rgb), .1);
            color: var(--theme);
        }

        ins {
            text-decoration: none;
            background: var(--theme-bgd-accent);
            color: var(--green-700);
            padding: 0 1px;
            border-radius: 2px;
            font-weight: bold;
        }

        .files > *:first-child { margin-top: .25em; }
        .files > *:last-child { margin-bottom: .25em; }

    `, styles]}

    renderAvatar(){
        if( !customElements.get(avatarTag) ){
            this.setAttribute('no-avatar', '')
            return ''
        }

        let div = document.createElement('div')
        div.part = 'avatar-wrapper'
        let avatar = document.createElement(avatarTag)
        avatar.classList.add('avatar')
        avatar.uid = this.model ? this.model.get('uid') : 'me'
        avatar.part = 'avatar'

        div.appendChild(avatar)
        return div
    }

    renderName({short=false}={}){

        let tagName = nameTag || avatarTag 

        if( !customElements.get(tagName) ){
            this.setAttribute('no-name', '')
            return ''
        }

        let avatar = document.createElement(tagName)
        avatar.setAttribute('nameOnly', short ? 'short' : '')
        avatar.uid = this.model ? this.model.get('uid') : 'me'
        return avatar
    }

    render(){return html`
    
        ${this.model&&this.model.get('type')=='user'?html`

            ${this.renderAvatar()}

            <main part="main">
            
                <header part="header">

                    <div>
                        <b-text bold class="name">
                            ${this.renderName()}
                        </b-text>

                        <b-text><b-ts .date=${this.model.get('ts_created')}></b-ts></b-text>
                    
                        ${this.model.wasUnread?html`
                            <b-new-badge xs>NEW</b-new-badge>
                        `:''}

                    </div>

                    <div class="extras">
                        <b-hr></b-hr>

                        <b-btn icon="thumb_up" clear sm class="reaction"
                            title="Toggle your reaction"
                            num=${this.model.reactions.length}
                            ?reacted=${this.model.userHasReacted}
                            @click=${this.toggleReaction}></b-btn>

                        <b-btn icon="${this.model.isResolved?'check_circle':'check_circle_outline'}" clear sm class="resolve" 
                            title="Toggle resolved/done"
                            @click=${this.toggleResolved}></b-btn>
                    </div>

                </header>

                ${this.editing?html`
                    <b-write-comment .model=${this.model} .meta=${this.meta} auto-focus part="comment"
                        placeholder=${this.placeholder}
                        @saved=${this.doneEditing}
                        @canceled=${this.doneEditing}></b-write-comment>
                `:html`
                    <section part="comment" class="comment ProseMirror" @dblclick=${this.beginEditing}>${unsafeHTML(this.model.get('comment'))}</section>
                    
                    ${this._renderMeta()}
                `}

                <b-flex col gap=".25" class="files" stretch>
                ${this.model.get('files').map(file=>html`
                    <b-comment-file draggable="true" .model=${file} layout="mini-row"></b-comment-file>
                `)}
                </b-flex>

                ${this.replies?html`
                    <b-comments class="replies" group="thread" gid=${this.model.id}></b-comments>
                `:''}

            </main>

        `:this.model&&this.model.get('type')=='system'&&this.feed?html`

            <span class="dot" part="dot"></span>

            <main class="line">
                <span class="name">${this.renderName({short: true})}</span>
                ${this._renderFeedUpdate()}
                <b-ts class="when" .date=${this.model.get('ts_created')}></b-ts>
            </main>

        `:this.model&&this.model.get('type')=='system'?html`

            ${this.renderAvatar()}

            <main>
                <b-text italic sm class="comment sytem" ?hidden=${!this.model.get('comment')}>
                    ${unsafeHTML(this.model.get('comment'))}
                </b-text>
                ${this._renderMeta()}
                <b-text xs muted><b-ts .date=${this.model.get('ts_created')}></b-ts></b-text>
            </main>
        
        `:html`

            ${this.editing?html`

            ${this.renderAvatar()}

            <b-write-comment .coll=${this.coll} .meta=${this.meta} .uploads=${this.uploads} auto-focus part="write-comment" ?compose=${this.compose}
                placeholder=${this.placeholder}
                @saved=${this.doneEditing}
                @canceled=${this.doneEditing}>
                <slot name="write-comment:after" slot="after"></slot>
            </b-write-comment>

            `:this.coll?.isThread?html`
                <b-btn xs clear @click=${this.beginEditing} class="reply">Reply</b-btn>
            `:this.compose?html`
                ${this.renderAvatar()}
                <button class="compose" part="compose" @click=${this.beginEditing}>${this.placeholder}…</button>
            `:html`
                <b-btn class="write" part="write-btn" block color="white" sm @click=${this.beginEditing}>${this.placeholderBtn}</b-btn>
            `}
        
        `}
    `}

    _renderMeta(opts){
        return this.renderMeta ? this.renderMeta(this.model, opts) : (renderMeta ? renderMeta(this.model, opts) : '')
    }

    // (feed) the comment and its meta; the meta can set `opts.replace` to show in place of the comment
    // (ex: a status change as before → after)
    _renderFeedUpdate(){
        let opts = {feed: true}
        let meta = this._renderMeta(opts)
        if( meta && opts.replace ) return meta
        return html`
            <span class="comment system" ?hidden=${!this.model.get('comment')}>${unsafeHTML(this.model.get('comment'))}</span>
            ${meta}
        `
    }

    updated(){
        if( !this.model ) return
        this.toggleAttribute('resolved', this.model.isResolved)
        this.setAttribute('type', this.model.get('type'))
    }

    toggleResolved(){
        if( this.willTakeAction('resolve').allowed )
            this.model.toggleResolved()
    }

    toggleReaction(){
        if( this.willTakeAction('react').allowed )
            this.model.toggleReaction()
    }

    beginEditing(){
        if( this.disabled ) return
        if( this.willTakeAction(this.model?'edit':'new-comment').allowed )
            this.editing = true
    }
    
    doneEditing(){
        this.editing = false
    }

    _cancelEditing(){
        this.model.resetEdited()
        this.editing = false
    }

    showMenu(e){

        if( this.disabled ) return

        e.preventDefault()
        e.stopPropagation()

        // bindLongpress; not needed, menu already shown
        // bindLongpress still used cause the first time the menu opens it goes away when finger lifted
        // bindLongpress will keep it open, but then no need to open menu AGAIN
        if( e.detail?.clientX ) return

        if( !this.model ) return
        if( this.model.get('type') == 'system' ) return  
        
        let menu = [
            {label: 'Edit', icon: 'pencil', fn: 'beginEditing'},
            'divider',
            {label: 'Delete', icon: 'trash', color: 'hover-red', fn: 'destroy'}
        ]

        // this is mostly put in place for mobile devices with no escape key
        if( this.editing )
            menu = [{label: 'Cancel Edit', icon: 'restart_alt', fn: '_cancelEditing'}]

        let action = this.willTakeAction('show-menu', {menu})
        if( action.notAllowed ) return

        new Menu(action.menu, {
            handler: this,
            handlerArgs: e
        }).popOver(e)
    }

    async destroy(e){
        if( this.willTakeAction('delete').notAllowed ) return
        if( await Dialog.confirmDelete().popOver(e) )
            this.model.destroy()
    }

})

export default customElements.get('b-comment-row')