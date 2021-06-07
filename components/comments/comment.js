import { LitElement, html, css } from 'lit-element'
import {unsafeHTML} from 'lit-html/directives/unsafe-html'
import Menu, {Dialog} from '../../presenters/menu'
import styles from '../../presenters/form/controls/text-editor/style'
import '../../elements/text'
import '../../elements/ts'
import '../../elements/new-badge'
import '../../elements/hr'
import '../../elements/btn'

let avatarTag
let nameTag

customElements.define('b-comment-row', class extends LitElement {

    static set avatarTag(val){ avatarTag = val }
    static set nameTag(val){ nameTag = val }

    static get listeners(){return {
        model: {'change': 'requestUpdate'}
    }}

    static get properties(){return {
        editing: {type: Boolean, reflect: true},
        placeholderBtn: {type: String},
        placeholder: {type: String},    
        replies: {type: Boolean}
    }}

    constructor(){
        super()
        this.replies = false
        this.placeholderBtn = 'Comment'
        this.placeholder = 'Write a comment'

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

        :host([no-avatar]) {
            grid-template-columns: 1fr;
        }

        :host([no-name]) .name { display: none; }

        :host(.popover-open) {
            box-shadow: 0 0 0 2px var(--theme);
            border-radius: 3px;
        }

        :host([resolved]:not(:hover)) {
            opacity: .5;
        }

        .avatar {
            --size: 2em;
            margin-top: .2em;
        }

        :host([type="system"]) .avatar {
            --size: 1em;
            margin-top: 0;
            margin-left: 1em;
        }

        header {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: .5em;
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

        b-btn.write {
            grid-column: span 2;
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

    `, styles]}

    renderAvatar(){
        if( !customElements.get(avatarTag) ){
            this.setAttribute('no-avatar', '')
            return ''
        }

        let avatar = document.createElement(avatarTag)
        avatar.classList.add('avatar')
        avatar.uid = this.model ? this.model.get('uid') : 'me'
        return avatar
    }

    renderName(){

        let tagName = nameTag || avatarTag 

        if( !customElements.get(tagName) ){
            this.setAttribute('no-name', '')
            return ''
        }

        let avatar = document.createElement(tagName)
        avatar.setAttribute('nameOnly', '')
        avatar.uid = this.model ? this.model.get('uid') : 'me'
        return avatar
    }

    render(){return html`
    
        ${this.model&&this.model.get('type')=='user'?html`

            ${this.renderAvatar()}

            <main>
            
                <header>

                    <div>
                        <b-text bold sm muted class="name">
                            ${this.renderName()}
                        </b-text>

                        <b-text sm muted><b-ts .date=${this.model.get('ts_created')}></b-ts></b-text>
                    
                        ${this.model.isUnread?html`
                            <b-new-badge xs>NEW</b-new-badge>
                        `:''}

                    </div>

                    <div class="extras">
                        <b-hr></b-hr>

                        <b-btn icon="${this.model.isResolved?'ok-circled':'ok-circled2'}" clear sm class="resolve" 
                            title="Toggle resolved/done"
                            @click=${this.toggleResolved}></b-btn>

                        <b-btn icon="thumbs-up" clear sm class="reaction"
                            title="Toggle your reaction"
                            num=${this.model.reactions.length}
                            ?reacted=${this.model.userHasReacted}
                            @click=${this.toggleReaction}></b-btn>
                    </div>

                </header>

                ${this.editing?html`
                    <b-write-comment .model=${this.model} .meta=${this.meta} auto-focus
                        placeholder=${this.placeholder}
                        @saved=${this.doneEditing}
                        @canceled=${this.doneEditing}></b-write-comment>
                `:html`
                    <section class="comment ProseMirror" @dblclick=${this.beginEditing}>${unsafeHTML(this.model.get('comment'))}</section>
                `}

                ${this.replies?html`
                    <b-comments class="replies" group="thread" gid=${this.model.id}></b-comments>
                `:''}

            </main>

        `:this.model&&this.model.get('type')=='system'?html`

            ${this.renderAvatar()}

            <main>
                <b-text italic sm class="comment sytem">${unsafeHTML(this.model.get('comment'))}</b-text>
                <b-text xs muted><b-ts .date=${this.model.get('ts_created')}></b-ts></b-text>
            </main>
        
        `:html`

            ${this.editing?html`

            ${this.renderAvatar()}

            <b-write-comment .coll=${this.coll} .meta=${this.meta} auto-focus
                placeholder=${this.placeholder}
                @saved=${this.doneEditing}
                @canceled=${this.doneEditing}></b-write-comment>

            `:html`
                <b-btn class="write" block color="white" sm @click=${this.beginEditing}>${this.placeholderBtn}</b-btn>
            `}
        
        `}
    `}

    updated(){
        if( !this.model ) return
        this.toggleAttribute('resolved', this.model.isResolved)
        this.setAttribute('type', this.model.get('type'))
    }

    toggleResolved(){
        this.model.toggleResolved()
    }

    toggleReaction(){
        this.model.toggleReaction()
    }

    beginEditing(){
        this.editing = true
    }
    
    doneEditing(){
        this.editing = false
    }

    showMenu(e){

        if( !this.model ) return
        if( this.model.get('type') == 'system' ) return

        e.preventDefault()
        e.stopPropagation()
        
        let menu = [
            {label: 'Edit', icon: 'pencil', fn: 'beginEditing'},
            'divider',
            {label: 'Delete', icon: 'trash', color: 'hover-red', fn: 'destroy'}
        ]

        new Menu(menu, {
            handler: this,
            handlerArgs: e
        }).popover(e)
    }

    async destroy(e){
        if( await Dialog.confirmDelete().popover(e) )
            this.model.destroy()
    }

})

export default customElements.get('b-comment-row')