/*
    A subclass for rendering an avatar for User.js models

    <b-user-avatar .model=${userModel}></b-user-avavtar>

    // OR
    UserAvatar.users = UsersColl
    <b-user-avatar uid="1"></b-user-avavtar>

    NOTE: this does make some assumptions regarding the user models
*/
import { LitElement, html, css } from 'lit';
import './avatar'

let user
let users
let fallback = '-'

export default class UserAvatar extends LitElement {

    // app should set these before first use
    static set user(u){ user = u }
    static set users(u){ users = u }
    static set fallback(val){ fallback = val }

    static get user(){ return user }
    static get users(){ return users}

    static get properties() { return {
        uid: {type: String},
        withName: {type: String, reflect: true},
        nameOnly: {type: String, reflect: true},
        fallback: { type: String }
    }} 

    constructor() {
        super();
        this.fallback = fallback
    }

    static get styles(){ return css`
        :host {
            display: inline-flex;
            --size: 1em;
            vertical-align: text-bottom;
        }

        b-avatar {
            height: var(--size);
            min-width: var(--size);
        }

        :host([nameonly]) {
            vertical-align: baseline; /* note: should be default? */
        }
    `}

    set uid(val){
        let oldVal = this.uid
        this.__uid = val

        if( val && val == 'me' && user )
            this.model = user
        else if( val && users )
            this.model = users.get(val)
        else
            this.model = null
    
        this.requestUpdate('uid', oldVal)
    }

    static get listeners(){return {
        model: {'change:avatar': 'update'}
    }}
    
    get uid(){ return this.__uid}

    onModelChange(){
        this.setAttribute('uid', this.model?this.model.id:0)
        this.toggleAttribute('is-me', this.model&&this.model.isMe)
    }

    // allow for subclass to change
    get _model(){
        return this.model
    }

    render() { return html`

        ${this.nameOnly!=undefined?'':html`
        
        ${!this.model||this.model.id==0?html`
            
            <b-avatar cover title="${this.name}"
                size=${this.getAttribute('size')||24}
                initials="${this.fallback}" color="#555" bgd="#ddd"></b-avatar>

        `:this._model.get('avatar')?html`
            
            <b-avatar cover title="${this.name}"
                size=${this.getAttribute('size')||24}
                initials="${this.initials}"
                url="${this._model.url+'/avatar?display=preview&id='+this._model.get('avatar')}"></b-avatar>
        
        `:html`
            
            <b-avatar cover title="${this.name}"
                size=${this.getAttribute('size')||24}
                initials="${this.initials}"
                gravatar="${this._model.get('email_hash')}"></b-avatar>
        `}

        `}

        ${this.model&&(this.withName||this.nameOnly!=undefined)?html`
            ${this.nameOnly!=undefined?'':html`&nbsp;`}
            ${this.userName}
        `:''}

        ${this.model&&(this.withName||this.nameOnly!=undefined)&&!this.userName?(this.fallback??''):''}

        <slot></slot>
    `}

    get userName(){

        if( this._model.isMe)
            return 'Me'

        let name = ''
        let nameType = this.withName || this.nameOnly

        if( nameType == 'first' )
            name = this.model.firstName
        
        if( nameType == 'short' )
            name = this.model.shortName

        if( !name )
            name = this.model.get('name')

        return name
    }

    get name(){
        let val = (this._model && this._model.name) || ''
        if( typeof val == 'function' ) val = val.call(this._model)
        return val
    }

    get initials(){
        if( this._model && this._model.initials )
            return typeof this._model.initials == 'function' 
            ? this._model.initials() 
            : this._model.initials
        
        // TODO: attempt to create initials based on name?
        return ''
    }
    
}

customElements.define('b-user-avatar', UserAvatar)