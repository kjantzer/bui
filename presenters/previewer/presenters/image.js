import { LitElement, html, css } from 'lit'

customElements.define('b-previewer-image', class extends LitElement{

    static useFor(ext){
        return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'tif'].includes(ext)
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
        <b-empty-state overlay lg>Loading...</b-empty-state>
        <img src="${this.model.get('ext') == 'tif'?this.model.previewURL:this.model.displayURL}">
    `}

})

export default customElements.get('b-previewer-image')