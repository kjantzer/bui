import { LitElement, html, css } from 'lit-element'

customElements.define('b-previewer-image', class extends LitElement{

    static useFor(ext){
        return ['jpg', 'jpeg', 'png', 'gif'].includes(ext)
    }

    static get styles(){return css`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            position:relative;
            height: 100%;
            min-height: 0;
            pointer-events: none;
        }

        img {
            pointer-events: all;
            width: auto;
            height: auto;
            max-height: 100vh;
            max-width: 100vw;
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