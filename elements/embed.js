/*
    Embed
    
    For embedding iframes and videos (like youtube) that responsively scale

    ```html
    <b-embed url="https://www.youtube.com/watch?v=sK1ODp0nDbM"></b-embed>
    ```
*/
import { LitElement, html, css } from 'lit'

// https://embedresponsively.com/ 
customElements.define('b-embed', class Embed extends LitElement {

    static get properties(){return {
        url: {type: String, reflect: true},
        placeholder: {type: String},
        type: {type: String, reflect: true},
        aspect: {type: String, reflect: true}
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            overflow: hidden;
        }

        :host([aspect="video"]) main {
            aspect-ratio: 16/9;
            position: relative;
            overflow: hidden;
            max-width: 100%;
        }

        :host([aspect="video"]) iframe {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
        }

        :host([aspect="video"][type="spotify"]) main {
            aspect-ratio: 1/1;
        }

        iframe {
            width: 100%;
        }

        :host(:not([failed])) b-empty-state {display: none;}
        :host([failed]) iframe {opacity: 0;}
    `}

    constructor(){
        super()
        this.aspect = 'video'
    }

    render(){return html`
        <main part="main">
            <iframe src='${this.formattedURL}'
                    @load=${this.onLoad}
                    frameborder='0'
                    scrolling='no'
                    allowfullscreen
                    allow="encrypted-media">
            </iframe>
            <b-empty-state overlay lg>${this.url?'Failed to load':(this.placeholder||'')}</b-empty-state>
        </main>
    `}

    onLoad(e){
        this.toggleAttribute('failed', !e.target.getAttribute('src'))
    }

    get formattedURL(){

        if( !this.url ) return ''

        let match = Embed.isYoutube(this.url)

        if( match ){
            this.type = 'youtube'
            return 'https://www.youtube.com/embed/'+match[1]
        
        }else if( match = Embed.isSpotify(this.url) ){
            this.type = 'spotify'
            return `https://open.spotify.com/embed/${match[1]}/${match[2]}`

        }else if(match = Embed.isSoundcloud(this.url)){
            this.type = 'soundcloud'
            this.aspect = ''
            return `https://w.soundcloud.com/player/?url=${encodeURIComponent(this.url)}`
        }

        this.type = ''

        if( !this.url.match(/^http|^\//) )
            return ''

        return this.url
    }

    static isYoutube(url){
        return url.match(/(?:youtu\.be|youtube\.com)\/(?:watch\?v\=)?(?:embed\/)?(.+)/)
    }

    static isSpotify(url){
        return url.match(/spotify\.com\/(playlist|album)\/([a-zA-Z0-9]+)/)
    }

    static isSoundcloud(url){
        // NOTE: may need to improve this
        return url.match(/soundcloud\.com\/(.+)\/(.+)/)
    }

})

export default customElements.get('b-embed')