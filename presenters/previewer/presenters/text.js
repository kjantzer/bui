import { LitElement, html, css } from 'lit-element'

customElements.define('b-previewer-text', class extends LitElement{

    static useFor(ext){
        return ['txt', 'sql'].includes(ext)
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            height: 100%;
            min-height: 0;
            pointer-events: none;
        }

        main {
            padding-top: 3em;
            overflow: auto;
            height: 100%;
            display: grid;
            box-sizing: border-box;
        }

        main > * {
            pointer-events: all;
            max-width: 90%;
            margin: 0 auto 1em;
            overflow: visible;
            background: var(--theme-bgd);
        }

        main > div {
            border-radius: 3px;
            padding: 1em;
        }
    `}

    parseContent(content){
        return content.text()
    }

    firstUpdated(){
        fetch(this.model.displayURL)
        .then(r=>this.parseContent(r))
        .then(content=>{
            this.content = content
            this.update()
        }).catch(err=>{
            this.content = null
            this.err = err.message
        })
    }

    render(){return html`
        ${this.content?html`
            <main>
                ${this.renderContent()}
            </main>
        `:html`
            <b-empty-state>${this.err||'Loading...'}</b-empty-state>
        `}
    `}

    renderContent(){ return html`
        <div>
            ${this.content}
        </div>
    `}

})

export default customElements.get('b-previewer-text')