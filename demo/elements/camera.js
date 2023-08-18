import { LitElement, html, css } from 'lit'
import View from '../presenters/view'
import 'bui/helpers/lit/selectors'
import 'bui/elements/camera'
import 'bui/elements/camera-controls'
import docs from '../../docs/camera.md'

customElements.define('demo-elements-camera', class extends View{

    static get title(){ return 'Camera' }

    static get styles(){return [super.styles, css`
        b-camera {
            --width: 100%;
            max-width: 800px;
        }
    `]}

    get docs(){ return docs}

    get camera(){ return this.$$('b-camera', true)}
    
    renderContent(){ return html`

        <b-grid cols=2 cols-mobile=1>
            <b-camera>
                <!-- camera-controls sets up right+click to change settings -->
                <b-camera-controls></b-camera-controls>
            </b-camera>

            <b-flex left>
                <b-btn clear color="theme" @click=${this.start}>Start/Stop</b-btn>
                <b-btn clear color="theme" @click=${this.saveFrame}>Save Frame</b-btn>
                <b-btn clear color="theme" @click=${this.options}>Options</b-btn>
            </b-flex>

        </b-grid>
        <br>

    `}

    start(){
        this.camera.toggleStart()
    }

    saveFrame(){
        this.camera.takePicture()
    }

    options(e){
        this.$$('b-camera-controls', true).contextMenu(e)
    }

    
})