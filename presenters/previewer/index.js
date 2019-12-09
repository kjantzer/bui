import { LitElement, html, css } from 'lit-element'
import Panel from 'panel'
import device from 'bui/util/device'

let Presenters = [
    require('./presenters/image').default,
    require('./presenters/iframe').default
]

const previewHtml = /*html*/`
<style>
    :root {
        --dark: #2c3033;
        --dark-black: #1f2224;

        --theme-bgd: var(--dark);
        --theme-bgd-accent: var(--dark-black);
        --theme-bgd-rgb: 0,0,0;
        --theme-rgb: 255,255,255;
        --theme-color: rgba(var(--theme-rgb), 1);
        --theme-color-accent: rgba(var(--theme-rgb),.4);
    }


    @media (prefers-color-scheme: light) {
         :root {
            --theme-bgd: white;
            --theme-bgd-accent: #eee;
            --theme-rgb: 34,34,34;
            --theme-bgd-rgb: 255,255,255;
        }
    }

    body {
        background: var(--theme-bgd);
        font-family: sans-serif;
        text-align: center;
        color: var(--theme-color);
    }
    svg {
        width: 500px;
        height: auto;
        max-width: 70vw;
        margin: 0 auto;
        display: block;
        margin-top: 20vh;
    }
    h1 {
        margin-top: 2em;
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
    
    svg {
        animation: spin 1s infinite linear;
        transform-origin: center center;
        width: 240px;
        max-width: 40vw;
    }
</style>

<svg viewBox="0 0 1024 1024" class="spin" data-icon="loading" width="100%" height="100%" fill="currentColor" aria-hidden="true">
    <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
</svg>
<h1>Preview loading...</h1>
`


customElements.define('b-previewer', class extends LitElement{

    static open(items){

        let item = items[0]
        
        // better experience on iOS (Android too?)
        if( device.isMobile )
            return this.openInNewWindow(item)

        let view = new (customElements.get('b-previewer'))(items)

        new Panel(view, {
            type: 'previewer',
            anchor: 'center',
            animation: 'fade',
        }).open()
    }

    constructor(items=[]){
        super()
        this.items = items
        this.model = items[0]
    }

    firstUpdated(){
        this.panel.title = this.model.label
    }

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-rows: auto 1fr;
            position:relative;
            /* height: 100%; */
        }

        main {
            position: relative;
            display: grid;
            /* max-height: 100%; */
            /* height: 100%; */
            min-height: 0;
        }

        b-panel-toolbar {
            color:  var(--theme-color);
        }

        b-previewer-iframe ~ b-panel-toolbar {
            background: var(--theme-bgd-accent);
        }

        b-panel-toolbar b-btn {
            --bgdColor: var(--theme-color);
            color:  var(--theme-bgd-accent);
        }
    `}

    close(){ this.panel.close() }

    render(){return html`
        ${this.presenterFor(this.model)}
        <b-panel-toolbar overlay>
            <b-btn slot="close-btn" @click=${this.close} pill lg color="black" icon="cancel-1"></b-btn>
        </b-panel-toolbar>
    `}

    presenterFor(model){
        let Presenter = Presenters.find(Presenter=>{
            return Presenter.useFor(model.get('ext'))
        })

        if( !Presenter ) return html`<b-empty-state>Preview not supported</b-empty-state>`

        let view = new Presenter()
        view.model = model
        return view
    }

    static openInNewWindow(item){
        let url = item.displayURL
        // window.open(item.displayURL)

        const a = window.document.createElement('a');
        a.href = url
        a.style.display = 'none'
        a.target = '_blank'
        // a.setAttribute('download', filename||'')

        let popup = window.open('', 'Loading...')

        var meta = document.createElement('meta');
        meta.name = 'viewport'
        meta.content = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover'

        popup.document.head.appendChild(meta)
        popup.document.title = 'Loading preview...'
        popup.document.body.innerHTML = previewHtml

        popup.document.location = url
    }

})

export default customElements.get('b-previewer')