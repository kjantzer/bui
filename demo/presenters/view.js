import { LitElement, html, css } from 'lit-element'

customElements.define('demo-view', class extends LitElement{

    static get title(){ return 'Tabs' }

    static get styles(){return css`
        :host {
            display: block;
            /* position:relative; */
            margin: var(--view-gutter);
        }

        :host > b-paper {
            padding: var(--view-gutter);
        }

        b-h1 {
            border-bottom: solid 4px var(--theme-bgd-accent);
            padding-bottom: .15em;
            margin-bottom: 1em;
        }
    `}

    renderContent(){ return '' }
    renderAfter(){ return '' }

    render(){return html`
        <b-paper>
            <b-h1>${this.viewTitle||this.tabView.title}</b-h1>
            
            ${this.renderContent()}
            
            ${this.docs?html`
            <demo-markdown-docs .docs=${this.docs}></demo-markdown-docs>
            `:''}

        </b-paper>

        ${this.renderAfter()}
    `}

})

export default customElements.get('demo-view')
