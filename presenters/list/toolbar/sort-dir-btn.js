import { LitElement, html, css } from 'lit-element'

customElements.define('b-list-sort-dir-btn', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block
        }

        b-btn {
            margin-top: -.5em;
            margin-bottom: -.5em;
            margin-right: -.5em;
        }

        b-btn:hover {
            --bgdColor: none !important;
            --textColor: var(--primaryColor)
        }
    `}

    firstUpdated(){
        this.classList.add('when-active')
    }

    render(){return html`
        <b-btn clear icon="${this.item.desc?'sort-alt-down':'sort-alt-up'}" @click=${this.onClick}></b-btn>
    `}

    onClick(e){
        e.stopPropagation()
        this.item.desc = !this.item.desc
        this.update()
    }
})
