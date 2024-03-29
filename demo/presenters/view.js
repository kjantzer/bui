import { LitElement, html, css } from 'lit'

export {html, css}

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

        :host > b-text-divider {
            margin-bottom: var(--gutter);
        }
    `}

    renderTitleRight(){ return '' }
    renderContent(){ return '' }
    renderAfter(){ return '' }
    renderDocsHeader(){ return '' }

    render(){return html`
        <!-- <b-paper> -->
            <b-text-divider bottom thick xbold xl heading>
                ${this.viewTitle||this.tabView.title}
                <b-flex slot="right">${this.renderTitleRight()}</b-flex>
            </b-text-divider>
            
            ${this.renderContent()}
            
            ${this.docs?html`
            <demo-markdown-docs .docs=${this.docs}>
                <div slot="header">${this.renderDocsHeader()}</div>
            </demo-markdown-docs>
            `:''}

        <!-- </b-paper> -->

        ${this.renderAfter()}
    `}

})

export default customElements.get('demo-view')
