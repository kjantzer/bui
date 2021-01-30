import { LitElement, html, css } from 'lit-element'
import Panel from 'panel'
import device from 'bui/util/device'

let Presenters = [
    require('./presenters/image').default,
    require('./presenters/text').default,
    require('./presenters/json').default,
    require('./presenters/csv').default,
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
        --theme-text-rgb: 255,255,255;
        --theme-text: rgba(var(--theme-text-rgb), 1);
        --theme-text-accent: rgba(var(--theme-text-rgb),.4);
    }


    @media (prefers-color-scheme: light) {
         :root {
            --theme-bgd: white;
            --theme-bgd-accent: #eee;
            --theme-text-rgb: 34,34,34;
            --theme-bgd-rgb: 255,255,255;
        }
    }

    body {
        background: var(--theme-bgd);
        font-family: sans-serif;
        text-align: center;
        color: var(--theme-text);
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

        if( items && !Array.isArray(items) )
            items = [items]

        let item = items[0]
        
        // better experience on iOS (Android too?)
        if( device.isMobile )
            return this.openInNewWindow(item)

        let view = new (customElements.get('b-previewer'))(items)

        let panel = new Panel(view, {
            type: 'previewer',
            anchor: 'center',
            animation: 'fade',
            onKeydown(e){
                if( e.key == 'Escape' )
                    panel.close()
            }
        })
        
        panel.open()
    }

    constructor(items=[]){
        super()
        this.items = items
        this.model = items[0]
    }

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-rows: 1fr;
            position:relative;
            height: 100%;
            pointer-events: none !important;
        }

        main {
            position: relative;
            display: grid;
            /* max-height: 100%; */
            /* height: 100%; */
            min-height: 0;
        }

        b-panel-toolbar {
            color:  var(--theme-text);
            pointer-events: all;
        }

        b-previewer-iframe ~ b-panel-toolbar {
            background: var(--theme-bgd);
        }

        b-panel-toolbar b-btn {
            --bgdColor: var(--theme-text);
            color:  var(--theme-bgd);
        }

        b-empty-state > div {
            background: var(--theme-bgd);
            padding: .25em 1em;
            border-radius: 2em;
            color: var(--theme-text);
        }

        b-file-icon {
            --size: 1.5em;
        }
    `}

    close(){ this.panel.close() }

    render(){return html`
        ${this.presenterFor(this.model)}
        <b-panel-toolbar overlay>
            <b-btn slot="close-btn" @click=${this.close} pill lg color="black" icon="cancel-1"></b-btn>
            <div slot="title">
                <b-file-icon ext=${this.model.ext||this.model.get('ext')}></b-file-icon>
                ${this.model.label}
            </div>
        </b-panel-toolbar>
    `}

    presenterFor(model){
        let Presenter = Presenters.find(Presenter=>{
            return Presenter.useFor((model.get&&model.get('ext'))||model.ext)
        })

        if( !Presenter ) return html`<b-empty-state><div>Preview not supported</div></b-empty-state>`

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