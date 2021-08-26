import { LitElement, html, css } from 'lit-element'

// https://embedresponsively.com/ 
customElements.define('b-embed', class Embed extends LitElement {

    static get properties(){return {
        url: {type: String, reflect: true}
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }

        main {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            max-width: 100%;
        }

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        :host(:not([failed])) b-empty-state {display: none;}
        :host([failed]) iframe {opacity: 0;}
    `}

    render(){return html`
        <main part="main">
            <iframe src='${this.formattedURL}'
                    @load=${this.onLoad}
                    frameborder='0' 
                    allowfullscreen>
            </iframe>
            <b-empty-state>Failed to load</b-empty-state>
        </main>
    `}

    onLoad(e){
        this.toggleAttribute('failed', !e.target.getAttribute('src'))
    }

    get formattedURL(){

        if( !this.url ) return ''

        let match = Embed.isYoutube(this.url)

        if( match ){
            return 'https://www.youtube.com/embed/'+match[1]
        }

        if( !this.url.match(/^http|^\//) )
            return ''

        return this.url
    }

    static isYoutube(url){
        return url.match(/(?:youtu\.be|youtube\.com)\/(?:watch\?v\=)?(?:embed\/)?(.+)/)
    }

})

export default customElements.get('b-embed')