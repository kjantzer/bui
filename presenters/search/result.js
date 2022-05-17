import { LitElement, html, css } from 'lit'

// placeholder example
customElements.define('b-search-result', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }
    `}

    constructor(data){
        super()
        this.data = data
    }

    render(){return html`
        ${JSON.stringify(this.data)}
    `}

})

export default customElements.get('b-search-result')