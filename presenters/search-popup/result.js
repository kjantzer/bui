import { LitElement, html, css } from 'lit-element'

customElements.define('b-search-popup-row', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            padding: .5rem 1rem;
        }

        :host([active]) {
            background-color: var(--theme-bgd-accent);
        }
    `}

    render(){return html`
        Result here
    `}

    firstUpdated(){
        this.addEventListener('click', e=>{
            this.emitEvent('go-to-result', this)
        })

        this.addEventListener('mouseover', e=>{
            this.emitEvent('select-result', this)
        })
    }

})

export default customElements.get('b-search-popup-row')