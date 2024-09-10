/*
    # Camera Controls

    Basic right-click control to change camera input

    ```html
    <b-camera>
        <b-camera-controls></b-camera-controls>
    </b-camera>
    ```

    TODO
    - toggle torch/light if supported
    - zoom support?
*/
import { LitElement, html, css } from 'lit'
import Menu from '../presenters/menu'

customElements.define('b-camera-controls', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position: absolute;
            inset: 0;
            line-height: 1em;
            z-index: 10;
        }
    `

    render(){return html`

    `}

    connectedCallback(){
        super.connectedCallback()
        this.camera = this.parentElement.tagName == 'B-CAMERA' ? this.parentElement : null
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.camera = null
    }

    async contextMenu(e){

        if( !this.camera ) return

        let devices = await this.camera.getDevices()
        let menu = []

        menu = menu.concat([{divider: 'Camera'}]).concat(devices.map(d=>{
            d.fn = 'changeCamera'
            return d
        }))

        new Menu(menu, {handler: [this, e]}).popOver(e)
    }

    async changeCamera(e, device){
        this.camera.start({deviceId: device})
    }

})

export default customElements.get('b-camera-controls')