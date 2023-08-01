import { LitElement, html, css } from 'lit'
import PopoverView from '../../presenters/popover/view'
import '../../helpers/lit/shared'
import '../../elements/text'

customElements.defineShared('b-broadcast-client-selector', class extends PopoverView{

    static styles = css`
        :host {
            display: block;
            position:relative;
            width: 500px;
            margin-bottom: -1em;

            background: none !important;
            box-shadow: none  !important;
            border: none  !important;
            filter: drop-shadow(0 0 50px var(--theme-bgd));
        }

        main {
            position: relative;
            width: 100%;
            aspect-ratio: var(--aspect-ratio, 2/3);
            border-radius: 12px;
            border: solid 16px;
            overflow: hidden;
            box-sizing: border-box;
            background-color: var(--theme-bgd);
        }


        footer > div:first-child {
            width: 10%;
            background-color: var(--theme-text);
            aspect-ratio: 2/1;
            margin: 0 auto;
        }

        footer > div:nth-child(2) {
            width: 20%;
            background-color: var(--theme-text);
            aspect-ratio: 12/1;
            margin: 0 auto;
        }

        main > div {
            box-sizing: border-box;
            background-color: var(--theme-bgd-accent);
            position: absolute;
            box-shadow: var(--theme-shadow-3);
            border-radius: 8px;
            border: solid 1px var(--theme);
            display: grid;
            place-content: center;
            text-align: center;
            overflow: hidden;
        }

        main > div:hover {
            border-width: 4px;
            color: var(--theme);
            z-index: 100;
        }

        main > div:hover .bgd {
            background-color: rgba(var(--theme-rgb), .1);
        }

        .bgd {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }

        :host > b-text {
            position: absolute;
            z-index: 100;
            width: 100%;
            line-height: 0.8em;
            color: var(--theme-bgd);
        }
    `

    load(clients){
        this.clients = clients

        this.style.setProperty('--aspect-ratio', (window.screen.width / window.screen.height))

        this.requestUpdate()

        return new Promise(resolve=>{
            this.resolve = resolve
        })
    }

    onClose(){
        this.resolve?.(false)
    }

    render(){return html`
        <b-text xs semibold ucase align="center">Open link in which window?</b-text>
        <main>
        ${this.clients.map(client=>html`
            <div style=${this.clientStyle(client)} .client=${client} @click=${this.selectClient}>
                <div class="bgd"></div>
                <b-text semibold>${client.title}</b-text>
                <b-text dim>${client.path}</b-text>
            </div>
        `)}
        </main>
        <footer>
            <div></div>
            <div></div>
        </footer>
    `}

    selectClient(e){
        let resolve = this.resolve
        delete this.resolve
        resolve(e.currentTarget.client)
        this.close()
    }

    clientStyle(client){
        return `width: ${this.width(client)}; height: ${this.height(client)}; top: ${this.top(client)}; left: ${this.left(client)};`
    }

    height(client){ return Math.round(client.windowHeight / window.screen.height * 100)+'%' }
    width(client){ return Math.round(client.windowWidth / window.screen.width * 100)+'%' }
    left(client){ return Math.round(client.windowLeft / window.screen.width * 100)+'%' }
    top(client){ return Math.round(client.windowTop / window.screen.width * 100)+'%' }

})

export default customElements.get('b-broadcast-client-selector')