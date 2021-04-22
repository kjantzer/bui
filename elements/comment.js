import { LitElement, html, css } from 'lit'
import './bgd-overlay'

customElements.define('b-comment', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            position:relative;
            grid-template-columns: 3em 1fr;
            gap: 1em;
            --radius: 4px;
        }

        main {
            display: grid;
            grid-template-rows: auto 1fr;
            border: solid 1px var(--theme-bgd-accent);
            border-radius: var(--radius);
            position: relative;
            margin-bottom: 2em;
            background: var(--theme-bgd);
            position: relative;
            z-index: 1;
        }

        main header {
            position: relative;
            z-index: 0;
            padding: .5em 1em;
            border-radius: var(--radius) var(--radius) 0 0;
            background: var(--theme-bgd-accent2);
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        b-bgd-overlay {
            border-radius: var(--radius) var(--radius) 0 0;
            opacity: .1;
            background: var(--comment-header-bgd, transparent)
        }

        main > div {
            padding: 1em;
            min-width: 0;
        }

        [name="avatar"]::slotted(*) {
            --size: 3em;
        }

        main > div ::slotted(p:first-of-type) {margin-top: 0;}
        main > div ::slotted(p:last-of-type) {margin-bottom: 0;}

        :host > b-hr {
            position: absolute;
            bottom: 0;
            height: 100%;
            left: 4.5em;
            width: 3px;
        }

        :host([last]) > b-hr {
            display: none;
        }
    `}

    render(){return html`
        <div part="avatar">
            <slot name="avatar"></slot>
        </div>
        <slot name="main"><main part="main">
            <header part="header"><b-bgd-overlay></b-bgd-overlay>
                <slot name="header"></slot>
            </header>
            <div part="content">
                <slot></slot>
            </div>
        </main></slot>
        <b-hr vert></b-hr>
    `}

})

export default customElements.get('b-comment')