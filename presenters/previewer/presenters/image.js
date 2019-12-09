import { LitElement, html, css } from 'lit-element'

customElements.define('b-previewer-image', class extends LitElement{

    static useFor(ext){
        return ['jpg', 'jpeg', 'png', 'gif'].includes(ext)
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            height: 100%;
            min-height: 0;
        }

        img {
            width: 100vw;
            height: 100vh;
            object-fit: contain;
            position: relative;
        }
    `}

    render(){return html`
        <b-empty-state sm>Loading...</b-empty-state>
        <img src="${this.model.displayURL}">
    `}

})

export default customElements.get('b-previewer-image')