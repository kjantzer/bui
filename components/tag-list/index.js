/*
    Tag List (tags, flags, hashtags, keywords, etc)

    TODO:
    - add contextmenu to "clear all tags"
    - add support for adding several tags at once: `tag1,tag2,tag3`
*/
import { LitElement, html, css } from 'lit'
import Notif from '../../presenters/notif'
import Dialog from '../../presenters/dialog'
import Menu from '../../presenters/menu'
import copyText from '../..//util/copyText'
import '../../helpers/lit/events'
import '../../elements/btn'

customElements.define('b-tag-list', class extends LitElement{

    static properties = {
        name: {type: String},
        sorted: {type: Boolean},
        icon: {type: String},
        presets: {type: Array},
        value: {type: Array},
        prefix: {type:String},
        type: {type: String}
    }

    static get styles(){return css`
        :host {
            display: inline-flex;
            gap: 1em;
            row-gap: .125em;
            flex-wrap: wrap;
        }
        
        b-btn {
            font-size: 1em;
            margin-right: -.5em;
        }

        [part="tag"] {
            align-self: center;
            flex-shrink: 0;
        }

        [part="tag"]:hover,
        [part="tag"].popover-open {
            color: var(--theme);
            cursor: pointer;
        }

        :host([type="bar"]) {
            background: var(--theme-bgd);
            box-shadow: var(--theme-shadow-1);
            flex-grow: 0;
            padding: 0.25em 1em;
            border-radius: 1.5em;
        }

        :host([type="bar"]) b-btn {
            margin-left: -.75em;
        }

        :host([type="bar"]) b-btn:last-child {
            margin-right: -.75em;
        } 

        :host([type="chip"]) {
            gap: .125em;
        }

        :host([type="chip"]) b-btn {
            margin-right: 0;
        }

        :host([type="chip"]) [part="tag"] {
            background: var(--chip-bgd, var(--theme-bgd-accent));
            padding: 0.125em 0.5em;
            border-radius: 1em;
        }
    `}

    set value(val){

        if( typeof val == 'string' )
            val = val.split(',')

        else if( !val )
            val = []

        else if( !Array.isArray(val) )
            val = [val]

        if( this.sorted )
            val = val.sort()

        let oldVal = this.value
        this.__value = val
    
        this.requestUpdate('value', oldVal)
    }
    
    get value(){ return this.__value}

    constructor(){
        super()
        this.name = 'tag'
        this.icon = 'tag'
        this.value = []
        this.saveDelay = 1500
    }

    render(){return html`

        <b-btn clear pill icon=${this.icon} title="New ${this.name}"
            @click=${this.addTag} part="add-btn"></b-btn>

        ${this.value.map(tag=>html`
            <b-text title="click to remove" @click=${this.removeTag} part="tag">
                <b-text muted>${this.prefix}</b-text>${tag}
            </b-text>
        `)}

    `}


    async addTag(e){

        let btn = e.currentTarget
        let didAdd = false

        if( this.presets ){
            let preset = await new Menu([{
                label: 'Custom',
            }, {divider: 'Presets'}, ...this.presets]).popover(btn)

            if( !preset ) return

            if( preset.label != 'Custom' )
                if( this._addTag(preset.val) ){
                    didAdd = true

                    // open prompt again
                    if( this.presets.length > 1 )
                        this.addTag({currentTarget: btn})
                }else
                    return
        }
        
        if( !didAdd )
        await Dialog.prompt({
            placeholder: `Type ${this.name}, press enter`,
            btns: false,
            onSubmit: (val, control)=>{
                if( this._addTag(val) )
                    didAdd = true
                control.value = ''
            }
        }).popover(btn)

        if( didAdd ){
            this.emitEvent('change', {value: this.value})
        }
    }

    _addTag(tag){
        tag = tag.trim()

        let tags = [...this.value]
        if( tags.includes(tag) ) return false
        tags.push(tag)

        this.value = tags

        this.emitEvent('updated', {value: this.value})

        return true
    }

    async removeTag(e){

        let tagEl = e.currentTarget

        // confirm delete (unless the user ctrl+click)
        if( !(e.metaKey || e.ctrlKey) && !await Dialog.confirmDelete().popover(tagEl) )
            return

        let tag = tagEl.innerText.trim()
        let tags = [...this.value]

        let index = tags.indexOf(tag)
        if( index > -1)
            tags.splice(index, 1)

        this.value = tags

        this.emitEvent('updated', {value: this.value})

        // wait a few seconds before saving in case another is removed (minimize requests)
        clearTimeout(this._saveDelay)
        this._saveDelay = setTimeout(()=>{
            this.emitEvent('change', {value: this.value})
        }, this.saveDelay)
    }

    copy(e){
        copyText(this.value.join(', '))
        Notif.alert('Copied to clipboard', {icon: 'paste', autoClose: 2000})
    }

})

export default customElements.get('b-tag-list')