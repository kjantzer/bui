import { LitElement, html, css } from 'lit'
import {unsafeHTML} from 'lit/directives/unsafe-html.js'
import {marked} from 'marked'
import hljs from 'highlight.js'
import {codeHightlighStyle} from './code-hightlight-style'

const rendererOverrides = {
    
    blockquote(str){
        let types = ['note', 'deprecated']
        
        let type = str.match(new RegExp(`^<p>(${types.join('|')}) ?[:-] `, 'i'))?.[1] || ''
        
        str = str.replace(new RegExp(`^<p>(${types.join('|')}) ?[:-] +</p>`, 'i'), '')
        str = str.replace(new RegExp(`^<p>(?:${types.join('|')}) ?[:-] `, 'i'), '<p>')

        return `<b-paper type="${type.toLowerCase()}" outline blockquote>
            ${str}
            ${type?`<b-label filled>${type.toUpperCase()}</b-label>`:''}
        </b-paper>`
    },
    code(str, language, escaped){

        let preview = false

        if( language == 'preview' )
            return `<div class="preview">${str}</div>`

        if( language == 'html-preview' ){
            language = 'html'
            preview = true
        }
        
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
        let formattedStr = hljs.highlight(validLanguage, str).value

        formattedStr = `<pre><code>${formattedStr}\n</code></pre>`

        if( preview )
            formattedStr = `${formattedStr}\n<div class="preview">${str}</div>`

        return formattedStr
    },
    _codespan(str, info, escaped){
        return `<b-code>${str}</b-code>`
    }
}

// marked.use({ rendererOverrides });


customElements.define('demo-markdown-docs', class extends LitElement{

    static get properties(){ return {
        docs: {type: String},
        notoc: {type: Boolean, reflect: true}
    }}

    constructor(){
        super()
        this.notoc = false
    }

    shouldUpdate(changedProps){
        if( changedProps.has('docs') )
            this.fetchDocs()

        return true
    }

    async fetchDocs(){
        this.content = ''

        var renderer = new marked.Renderer();
        this._toc = []; // your table of contents as a list.

        renderer = Object.assign(renderer, rendererOverrides)
        renderer.heading = (text, level, raw, slugger)=>{
            var slug = slugger.slug(raw)

            this._toc.push({
                level: level,
                slug: slug,
                title: raw,
                text: text
            });

            let size = [, 'xl', 'lg', '', ''][level] || ''
            let bold = [, 'xbold', 'xbold', 'xbold', 'bold'][level] || 'semibold'
            let tag = 'b-text'
            let pad = '1'

            if( level == 1 || level == 2 ){
                tag = 'b-text-divider'
                pad = 2
            }

            // if( level == 2)
            //     pad = 2

             return `
                <${tag} block ${size} pad="${pad}" ${bold} header="h${level}" ${level==1?'thick':''} part="heading h${level}">
                <a name="${slug}" class="anchor" href="#${slug}">
                    <span class="header-link"></span>
                </a>
                ${text}
                </${tag}>
                ${level==1?`
                <slot name="${slug}"></slot>
                `:''}`;
        };

        this.content = marked(this.docs, {renderer})

        if( this.model ){
            let toc = this._toc
            if( toc[0]?.level == 1 ) toc.shift()
            this.model.set('toc', toc)
        }

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

        :host(:not(:last-of-type)) {
            margin-bottom: 2em;
            padding-bottom: 2em;
            border-bottom: solid 2px var(--theme-bgd-accent);
        }

        :host(:first-of-type) .toc .start,
        :host(:last-of-type) .toc .end {
            display: none;
        }

        .toc .end {
            margin: 1em 0;
        }

        :host([notoc]) {
            grid-template-columns: 1fr;
        }

        :host([notoc]) .toc {
            display: none;
        }

        @media (max-width: 599px) {
            :host {
                grid-template-columns: 1fr;
            }
            .toc {
                position: static;
            }
        }

        main {
            min-width: 0;
            line-height: 1.4em;
        }

        :host > main > h1:first-of-type,
        :host > main > [header="h1"]:first-of-type {
            display: none;
        }

        :host > main > h1:first-of-type + *,
        :host > main > [header="h1"]:first-of-type + * {
            margin-top: 0;
        }

        :host > main > [header="h1"] {
            background: var(--theme-bgd);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        :host > main > [header="h2"] {
            background: var(--theme-bgd);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        :host > main > [header="h1"] ~ [header="h1"] ~ [header="h2"] {
            top: 2.1em;
        }

        :host > main > *:first-child {
            margin-top: 0;
        }

        :host > main > .preview {
            margin: 1em 0;
        }

        [header="h3"] { margin: 2em 0 .5em;}
        [header="h4"] { margin: 1.5em 0 .25em;}

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

        img {
            max-width: 100%;
        }

        [blockquote][type=""] :first-child {margin-top: 0;}
        [blockquote][type=""] :last-child { margin-bottom:0; }
        [blockquote] {
            /* margin-left: 1em; */
            margin-top: 1em;
            margin-bottom: 1em;
            border-width: 0;
            border-left-width: 6px;
            border-radius: 0;
            padding-top: 0;
            padding-bottom: 0;
            color: rgba(var(--theme-text-rgb), .7);
            background-color: rgba(var(--type-color), .15);
            border-color: rgb(var(--type-color));
            position: relative;
        }

        [blockquote]:not([type=""]) {
            padding-top: .25em;
            padding-bottom: .25em;
        }

        [blockquote] b-label {
            position: absolute;
            right: .5em;
            top: .5em;
            --bgd: rgb(var(--type-color));
        }
        
        [blockquote][type="note"] {
            --type-color: 33, 150, 243; /* blue */
            --type-color: 255, 179, 0; /* amber */
        }

        [blockquote][type="deprecated"] {
            --type-color: 255, 23, 68;
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
            margin-left: 1.35rem;
            padding: .25em 0;
            color: rgba(var(--theme-text-rgb), .7);
        }

        .toc [level]:hover {
            background: var(--theme-bgd-accent);
        }
        
        .toc [level="1"] {
            margin-left: 0;
            font-weight: 800;
            font-size: 1.2em;
            color: inherit;
        }

        :host(:not(showTitle)) .toc [level="1"]:first-of-type {
            display: none;
        }

        :host(:not(showTitle)) .toc [level="1"]:first-of-type ~ [level="1"] {
            margin-top: 1em;
        }

        .toc [level="2"] { margin-left: 0em; color: inherit; font-weight: 500; }
        .toc [level="3"] { margin-left: .75em; }
        .toc [level="4"] { font-size: var(--font-size-sm); }
        .toc [level="5"] { font-size: var(--font-size-sm); }

        .toc [level="2"] + [level="2"] {
            margin-top: .5em;
        }

        /* .toc [level="3"]:before,
        .toc [level="4"]:before,
        .toc [level="5"]:before {
            content: '— ';
        } */
        
        .preview {
            padding: 1em;
            border: solid 1px var(--theme-bgd-accent);
            position: relative;
        }

        .preview::after {
            content: 'preview';
            color: var(--theme-text-accent);
            position: absolute;
            top: -1em;
            left: .5em;
            font-size: var(--font-size-xs);
            background: var(--theme-bgd);
            display: block;
            padding: 0 4px;
            text-transform: uppercase;
            font-weight: bold;
                }
   
    `}

    scrollTo(name){
        let el = this.$$(`.anchor[name="${name}"]`)?.parentElement
        if( !el ) return

        el.previousElementSibling ? el.previousElementSibling.scrollIntoView() : el.scrollIntoView()

        el.style.color = 'var(--theme)'
        setTimeout(()=>{el.style.color = ''}, 700)
    }

    tocClick(e){
        this.scrollTo(e.currentTarget.getAttribute('slug'), {block: 'center' })
    }

    jumpToPrev(){
        this.previousElementSibling.scrollIntoView({block: 'end'})
    }

    jumpToNext(){
        this.nextElementSibling.scrollIntoView()
    }

    render(){return html`

        <div class="toc"><div class="toc-inner">
            <b-btn class="start" clear color="theme" block @click=${this.jumpToPrev}>Prev Section</b-btn>
            <slot name="toc:top"></slot>
            ${this._toc.map(t=>html`
                <div slug=${t.slug} level=${t.level} @click=${this.tocClick}>
                    ${unsafeHTML(t.title)}
                </div>
            `)}
            <slot name="toc:bottom"></slot>
            <b-btn class="end" clear color="theme" block @click=${this.jumpToNext}>Next Section</b-btn>
        </div></div>

        <main>
            <slot name="header"></slot>
            ${unsafeHTML(this.content)}
        </main>
    `}

})

export default customElements.get('demo-markdown-docs')
