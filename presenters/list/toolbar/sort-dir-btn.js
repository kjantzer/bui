import { LitElement, html, css } from 'lit'

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

        b-btn[rotate180]::part(icon) {
            transform: rotate(180deg);
        }
    `}

    firstUpdated(){
        this.classList.add('when-active')
    }

    render(){return html`
        <b-btn clear icon="filter_list" ?rotate180=${!this.item.desc} @click=${this.onClick}></b-btn>
    `}

    onClick(e){
        e.stopPropagation()
        this.item.desc = !this.item.desc
        this.update()
    }
})
