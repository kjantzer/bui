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

        b-btn[rotate90]::part(icon) {
            transform: rotate(90deg);
        }

        b-btn[rotate-90]::part(icon) {
            transform: rotate(-90deg);
        }
    `}

    firstUpdated(){
        this.classList.add('when-active')
    }

    render(){return html`
        <b-btn clear icon="arrow_right_alt" ?rotate-90=${!this.item.desc} ?rotate90=${this.item.desc} @click=${this.onClick}></b-btn>
    `}

    onClick(e){
        e.stopPropagation()
        this.item.desc = !this.item.desc
        this.update()
    }
})
