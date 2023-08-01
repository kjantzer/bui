import { LitElement, html, css } from 'lit'
/*
    WIP - not used yet; not ready for use
*/
customElements.define('b-panels-menu', class extends LitElement{

    static styles = css`
        :host {
            display: flex;
            flex-direction: row-reverse;
            justify-content: center;
            gap: .5em;
            padding: 0 1em;
            /*margin-left: env(titlebar-area-x);
            width: env(titlebar-area-width, 100%);*/
        }

        div {
            position:relative;
            background-color: var(--dark-bgd);
            color: white;
            padding: .125em .5em;
            font-size: var(--font-size-sm);
            border-radius: 4px;
        }

        [top] {
            z-index: 10000;
            background: var(--theme-gradient);
            color: white;
        }
    `

    shouldUpdate(){
        console.log(this.controller.name);
        return this.controller.name == 'root'
    }

    get panels(){ return this.controller?.panels || []}

    firstUpdated(){
        if( !this.controller ) return console.log('no controller');
        this.controller.addEventListener('panel-added', this.reload.bind(this))
        this.controller.addEventListener('panel-removed', this.reload.bind(this))
        this.controller.addEventListener('panel-title-updated', this.reload.bind(this))
    }

    reload(){
        this.requestUpdate()
    }

    render(){return html`
        ${this.panels.map(panel=>html`
            <div ?top=${panel.onTop}>${panel.title}</div>
        `)}
    `}

})

export default customElements.get('b-panels-menu')