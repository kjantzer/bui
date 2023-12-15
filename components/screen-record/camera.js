import { LitElement, html, css } from 'lit'
import '../../elements/camera'
import '../../elements/camera-controls'
import '../../elements/draggable'
// import makeDraggable from '../../util/makeDraggable'

customElements.define('c-screen-record-camera', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            poition: absolute;
            height: 200px;
            width: 200px;
            border-radius: 50%;
            bottom: 0;
            right: 0;
            z-index: 10000;
        }

        b-camera {
            height: 100%;
            width: 100%;
        }
    `

    constructor(){
        super()
        // this.show()
    }

    show(){
        document.body.appendChild(this)
    }

    hide(){
        this.remove()
    }

    firstUpdated(){
        // makeDraggable(this)
        // this.video?.start()
    }

    render(){return html`
        <b-draggable></b-draggable>
        <b-camera bubble>
            <b-camera-controls></b-camera-controls>
        </b-camera>
    `}

    get video(){
        return this.$$('b-camera', true)
    }

    connectedCallback(){
        super.connectedCallback()
        setTimeout(()=>{
            this.video?.start()
        })
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.video.stop()
    }

})

export default customElements.get('c-screen-record-camera')