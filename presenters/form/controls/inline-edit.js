import { LitElement, html, css } from 'lit'
import '../control'
import './text-field'

customElements.define('b-inline-edit', class extends LitElement{

    static get styles(){return css`

        form-control {
            box-shadow: 0 1px 0 0px var(--theme);
            background: rgba(255,202,40, .2);
            min-width: 2em;
            vertical-align: text-bottom;
        }

        :host([block]) form-control {
            display: block;
        }

        text-field {
            padding: .2em 0 0em; /* make up for .editor margin change */
        }
    `}

    static edit({value, target, placeholder='label', prefix, suffix, block=false}={}){

        if( target.querySelector('b-inline-edit') )
            return console.log('editing already'); // NOTE: should error be thrown?

        return new Promise(resolve=>{

            let el = new (customElements.get('b-inline-edit'))

            el.target = target

            let textNodes = Array.from(target.childNodes).filter(n=>n.nodeName=='#text')
            el.textNode = textNodes.find(n=>n.textContent.trim()) || textNodes[0]

            for( let child of target.children ){ child.hidden = true }

            target.setAttribute('editing-inline', '')
            el.textNode.replaceWith(el)

            el.placeholder = placeholder
            el.value = value
            // el.prefix = prefix // caused a bug?? 
            // el.suffix = suffix
            el.resolve = resolve
            
            if( block )
                el.setAttribute('block', '')
        })
    }

    constructor(){
        super()

        // stop any parent click events from happening (it may have been what triggered editing)
        this.addEventListener('click', e=>{ e.stopPropagation()}, true)
    }

    render(){return html`
        <form-control>
            <text-field
                placeholder=${this.placeholder}
                .value=${this.value}
                @enterkey=${this.saveEdit}
                @esckey=${this.doneEditing}
                @blur=${this.onBlur}
            ></text-field>
            <span slot="prefix">${this.prefix}</span>
            <span slot="suffix">${this.suffix}</span>
        </form-control>
    `}

    firstUpdated(){
        setTimeout(()=>{
            this.textField = this.$$('text-field')
            this.textField.focus()
        })
    }

    get newValue(){
        return String((this.textField.value||'')).trim()
    }

    saveEdit(){
        this.value = this.newValue
        this.resolve(this.value)
        this.textField.blur()
    }

    onBlur(){
        
        if( this.value == this.newValue )
            return this.doneEditing()
        
        setTimeout(_=>{
            
            if( this.parentElement && !localStorage.getItem('bui-form-inline-edit:enter-to-save-warning') ){
                localStorage.setItem('bui-form-inline-edit:enter-to-save-warning', true)
                throw new UIWarningError('Unsaved: press ENTER after editing and ESC to cancel')
            }
        })
    }

    doneEditing(e){
        e&&e.stopPropagation()

        this.target._lastInlineEdit = new Date().getTime()
        this.target.removeAttribute('editing-inline')

        this.replaceWith(this.textNode)
        for( let child of this.target.children ){ child.hidden = false }
        this.resolve(false)
    }

})

export default customElements.get('b-inline-edit')
