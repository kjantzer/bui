import { LitElement, html, css } from 'lit-element'
import '../../../elements/code'

customElements.define('b-previewer-json', class extends LitElement{

    static useFor(ext){
        return ['json'].includes(ext)
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

        b-code {
            pointer-events: all;
            max-width: 90%;
            margin: 0 auto 1em;
            overflow: visible;
            background: var(--theme-bgd);
        }
    `}

    firstUpdated(){
        fetch(this.model.displayURL)
        .then(r=>r.json())
        .then(json=>{
            this.json = json
            this.update()
        }).catch(err=>{
            this.json = {error: 'could not load file'}
        })
    }

    render(){return html`
        ${this.json?html`
            <main>
                <b-code block>${JSON.stringify(this.json, null, 4)}</b-code>
            </main>
        `:html`
            <b-empty-state>Loading...</b-empty-state>
        `}
    `}

})

export default customElements.get('b-previewer-json')