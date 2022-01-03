import { LitElement, html, css } from 'lit-element'
import '../../../../elements/text'

customElements.define('b-text-editor-menubar', class extends LitElement{

    static get properties(){return {
        focused: {type: Boolean, reflect: true},
        maxchar: {type: Number}
    }}

    static get styles(){return css`
        :host {
            display: flex;
            justify-content: space-between;
            position:relative;
            border-top: solid 1px var(--theme-bgd-accent);
            padding: .25rem 0rem;
            font-size: 0.7em;
        }

        /* :host([focused]) {
            background-color: red;
        } */

        :host > div {
            display: flex;
            align-items: center;
        }

        :host([disabled]) .btns {
            visibility: hidden;
        }

        .btns {
            margin-right: 1em;
        }

        b-btn {
            font-size: 1em;
            --padding: 0.15rem 0.25rem;
            color: rgba(var(--theme-text-rgb),.5)
        }

        b-btn[active] {
            /* background-color: rgba(var(--theme-text-rgb), .1);
            color: var(--theme); */
            background: var(--theme);
            color: white;
        }
    `}

    set editor(val){
        if( this.editor === val ) return
        
        this.__editor = val
    
        if( this.editor ){
            this.editor.on('transaction', this.editorChanged.bind(this))
            this.editor.on('destroy', ()=>{
                this.editor = null
            })

            // this.editor.on('blur', e=>{
            //     this.__bluring = setTimeout(()=>{
            //         this.focused = false
            //     })
            // })

            // this.editor.on('focus', e=>{
            //     clearTimeout(this.__bluring)
            //     this.focused = true
            // })
        }
    }

    editorChanged(){
        this.requestUpdate()
    }
    
    get editor(){ return this.__editor}

    render(){return html`
        <div>
            <slot name="left"></slot>
            <span class="btns" @click=${this.format}>
                <b-btn action="toggleBold" clear ?active=${this.isActive('bold')} icon="bold"></b-btn>
                <b-btn action="toggleItalic" clear ?active=${this.isActive('italic')} icon="italic"></b-btn>
                
                <b-btn action="setTextAlign" .args=${'center'}
                    clear ?active=${this.isActive({'textAlign':'center'})} icon="paragraph-center"></b-btn>

                <b-btn action="toggleBulletList" clear ?active=${this.isActive('bulletList')} icon="list2"></b-btn>

                <b-btn action="toggleOrderedList" clear ?active=${this.isActive('orderedList')} icon="list-numbered"></b-btn>

            </span>
        </div>

        <div>
            <slot name="right"></slot>
            <span title="Number of characters">
                ${this.editor.getCharacterCount()}
                <b-text muted ?hidden=${!this.maxchar}> / ${this.maxchar}</b-text>
            </span>
        </div>
    `}

    isActive(val, setting){
        return this.editor && this.editor.isActive(val, setting)
    }

    format(e){
        e.preventDefault()
        e.stopPropagation()

        let btn = e.target
        let action = btn.getAttribute('action')
        let isActive = btn.hasAttribute('active')
        let args = btn.args

        if( !action) return console.warn('Button missing action')

        if( args == 'center' && isActive )
            args = 'left'

        this.editor.chain().focus()[action](args).run()
    }

})

export default customElements.get('b-text-editor-menubar')