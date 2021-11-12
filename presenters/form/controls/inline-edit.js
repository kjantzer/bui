import { LitElement, html, css } from 'lit-element'
import '../control'
import './text-field'

customElements.define('b-inline-edit', class extends LitElement{

    static get styles(){return css`

        form-control {
            box-shadow: 0 1px 0 1px var(--theme);
            background: rgba(255,202,40, .2);
            min-width: 2em;
            vertical-align: text-bottom;
        }
    `}

    static edit({value, target, placeholder='label', prefix, suffix}={}){

        if( target.childNodes.length != 3 || target.childNodes[1].nodeName != '#text' )
            return console.log('editing already');

        return new Promise(resolve=>{

            let el = new (customElements.get('b-inline-edit'))

            el.target = target
            el.textNode = target.childNodes[1]

            target.setAttribute('editing-inline', '')
            el.textNode.replaceWith(el)

            el.placeholder = placeholder
            el.value = value
            // el.prefix = prefix // caused a bug?? 
            // el.suffix = suffix
            el.resolve = resolve

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
                @blur=${this.doneEditing}
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

    saveEdit(){
        this.resolve(this.textField.value.trim())
        this.textField.blur()
    }

    doneEditing(){
        this.target.removeAttribute('editing-inline')
        this.replaceWith(this.textNode)
        this.resolve(false)
    }

})

export default customElements.get('b-inline-edit')
