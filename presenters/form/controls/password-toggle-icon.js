import { LitElement, html, css } from 'lit'

customElements.define('password-toggle-icon', class extends LitElement{

    static properties = {
        icon: {type: String}
    }

    static style = css`
        :host {
            display: contents;
        }
    `

    constructor(){
        super()
        this.slot = 'suffix'
        this.icon = 'visibility'
        this.addEventListener('click', this.toggle)
    }

    render(){return html`
        <b-icon name=${this.icon} @click=${this.toggle}></b-icon>
    `}

    toggle(e){
        e.stopPropagation()
        let input = this.previousElementSibling
        input.type = input.type == 'text' ? 'password' : 'text'
        this.icon = input.type == 'text' ? 'visibility_off' : 'visibility'
    }

})

export default customElements.get('password-toggle-icon')