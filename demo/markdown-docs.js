import { LitElement, html, css } from 'lit-element'
import {unsafeHTML} from 'lit-html/directives/unsafe-html'
import marked from 'marked'
import hljs from 'highlight.js'
import {codeHightlighStyle} from './code-hightlight-style'

marked.setOptions({
    highlight: function(code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return hljs.highlight(validLanguage, code).value;
    }
});

window.marked = marked

const rendererOverrides = {
    blockquote(str){
        return `<b-paper outline blockquote>${str}</b-paper>`
    },
    _code(str, info, escaped){
        return `<b-code block>${str}</b-code>`
    },
    _codespan(str, info, escaped){
        return `<b-code>${str}</b-code>`
    }
}

// marked.use({ rendererOverrides });


customElements.define('demo-markdown-docs', class extends LitElement{

    static get properties(){ return {
        docs: String,
    }}

    constructor(){
        super()
        // this.addEventListener('error', e=>{
        //     console.log(e.currentTarget);
            
        // })
    }

    shouldUpdate(changedProps){
        if( changedProps.has('docs') )
            this.fetchDocs()

        return true
    }

    async fetchDocs(){
        this.content = ''

        var renderer = new marked.Renderer();
        this.toc = []; // your table of contents as a list.

        renderer = Object.assign(renderer, rendererOverrides)
        renderer.heading = (text, level, raw, slugger)=>{
            var slug = slugger.slug(raw)

            this.toc.push({
                level: level,
                slug: slug,
                title: raw,
                text: text
            });

             return `
                <h${level}>
                <a name="${slug}" class="anchor" href="#${slug}">
                    <span class="header-link"></span>
                </a>
                ${text}
                </h${level}>`;
        };

        this.content = marked(this.docs, {renderer})

        this.requestUpdate()
    }

    updated(){
        Array.from(this.shadowRoot.querySelectorAll('img')).forEach(el=>{
            el.onerror = function(){
                this.style.display = 'none'
            }
        })
    }

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-columns: 200px 1fr;
            position:relative;
            max-width: 100%;
            gap: var(--view-gutter);
        }

        @media (max-width: 699px) {
            :host {
                grid-template-columns: 1fr;
            }
            .toc {
                position: static;
            }
        }

        main {
            min-width: 0;
        }

        :host > main > h1:first-of-type {
            display: none;
        }

        :host > main > h1:first-of-type + * {
            margin-top: 0;
        }

        :host *:first-child {
            margin-top: 0;
        }

        a, a:visited {
          color: var(--theme);
          text-decoration: none;
        }

        code {
          background: var(--theme-bgd-accent);
          padding: .1em .25em;
          margin: 0;
          border-radius: 3px;
        }

        pre {
            background: var(--theme-bgd-accent);
            border-radius: 3px;
            max-width: 100%;
            overflow-x: auto;
            padding: 1em;
        }

        li + li {
          margin-top: .25em;
        }

        pre code {
          padding: 0;
          background: none;
        }

        [blockquote] :first-child {margin-top: 0;}
        [blockquote] :last-child { margin-bottom:0; }
        [blockquote] {
            /* margin-left: 1em; */
            border-width: 0;
            border-left-width: 6px;
            border-radius: 0;
            padding-top: 0;
            padding-bottom: 0;
            color: rgba(var(--theme-rgb), .7);
        }

        h2 {
            padding-bottom: .3em;
            border-bottom: 1px solid var(--theme-bgd-accent);
            margin-top: 1em;
        }

        ${codeHightlighStyle}

        .toc {
            /* position: sticky;
            top: 1em; */
            /* position: absolute; */
            /* right: calc(100% + var(--view-gutter) + 1em); */
            /* top: calc(-1 * var(--view-gutter)); */
        }

        .toc-inner {
            position: sticky;
            top: 1em;
        }

        .toc [level] {
            margin-left: 1.25em;
            padding: .25em 0;
            color: rgba(var(--theme-rgb), .7);
        }

        .toc [level]:hover {
            background: var(--theme-bgd-accent);
        }
        
        .toc [level="1"] {
            margin-left: 0;
            font-weight: bold;
            font-size: 1.2em;
            color: inherit;
        }

        .toc [level="1"]:first-of-type {
            display: none;
        }

        .toc [level="2"] { margin-left: 0em; color: inherit; }
        .toc [level="3"] { margin-left: .75em; }

        .toc [level="5"] { font-size: .75em; }

        /* .toc [level="3"]:before,
        .toc [level="4"]:before,
        .toc [level="5"]:before {
            content: '— ';
        } */
        

    `}

    scrollTo(name){
        let el = this.$$(`.anchor[name="${name}"]`)
        el&&el.scrollIntoView()
    }

    tocClick(e){
        this.scrollTo(e.currentTarget.getAttribute('slug'))
    }

    render(){return html`

        <div class="toc"><div class="toc-inner">
            <slot name="toc:top"></slot>
            ${this.toc.map(t=>html`
                <div slug=${t.slug} level=${t.level} @click=${this.tocClick}>
                    ${unsafeHTML(t.title)}
                </div>
            `)}
            <slot name="toc:bottom"></slot>
        </div></div>

        <main>
            <slot name="header"></slot>
            ${unsafeHTML(this.content)}
        </main>
    `}

})

export default customElements.get('demo-markdown-docs')
