import { LitElement, html, css } from 'lit-element'

// https://embedresponsively.com/ 
customElements.define('b-embed', class Embed extends LitElement {

    static get properties(){return {
        url: {type: String}
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
    `}

    render(){return html`
        <main>
            <iframe src='${this.formattedURL}' 
                    frameborder='0' 
                    allowfullscreen>
            </iframe>
        </main>
    `}

    get formattedURL(){

        if( !this.url ) return ''

        let match = Embed.isYoutube(this.url)

        if( match ){
            return 'https://www.youtube.com/embed/'+match[1]
        }

        return this.url
    }

    static isYoutube(url){
        return url.match(/(?:youtu\.be|youtube\.com)\/(?:watch\?v\=)?(?:embed\/)?(.+)/)
    }

})

export default customElements.get('b-embed')