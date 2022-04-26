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

        b-paper > b-text-divider {
            margin-bottom: var(--gutter);
        }
    `}

    renderContent(){ return '' }
    renderAfter(){ return '' }

    render(){return html`
        <b-paper>
            <b-text-divider bottom thick xbold xl heading>${this.viewTitle||this.tabView.title}</b-text-divider>
            
            ${this.renderContent()}
            
            ${this.docs?html`
            <demo-markdown-docs .docs=${this.docs}></demo-markdown-docs>
            `:''}

        </b-paper>

        ${this.renderAfter()}
    `}

})

export default customElements.get('demo-view')
