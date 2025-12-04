/*
    Screen Record

    NOTES
    - mic/video enable/disable
*/
import { LitElement, html, css } from 'lit'
import Dialog from '../../presenters/dialog'
import Menu from '../../presenters/menu'
import {downloadContent} from '../../util/download'
import '../../helpers/lit/shared'
import '../../helpers/lit/contextmenu'
import '../../elements/camera'
import '../../elements/draggable'
import '../../elements/timer'
import '../../elements/text'
import '../../elements/btn'
import '../../elements/btn-group'
import '../../elements/grid'
import '../../elements/code'
import Draw from '../../elements/draw'
import CollMap from '../../util/collmap'
import store from '../../util/store'

// for developing
// setTimeout(()=>{
//     customElements.get('b-screen-record').shared.open()
// },500)

const SIZES = [
    {label: 'Standard', val: 'standard'},
    {label: 'Small', val: 'small'},
]

const RESOLUTIONS = {
    720: [1280, 720],
    1080: [1920, 1080],
    1440: [2560, 1440]
}

customElements.defineShared('b-screen-record', class extends LitElement{

    static properties = {
        recording: {type: Boolean, reflect: true},
        size: {type: String, reflect: true}
    }

    static styles = css`

        :host {
            display: grid;
            place-items: center;
            poition: absolute;
            height: var(--size, 200px);
            width: var(--size, 200px);
            border-radius: 50%;
            bottom: 0;
            right: 0;
            z-index: 10000;
            box-shadow: var(--theme-shadow-1);
        }

        :host([size="small"]) {
            --size: 150px;
        }

        b-camera {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: -1;
        }

        .controls {
            
        }

        [fab]{
            top: 0;
            left: 0;
        }

        :host([recording]:not(:hover)) .controls {
            display: none;
        }

        b-text {
            background: rgba(0,0,0,.4);
            color: white;
            padding: 0.25em;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
        }

        b-camera {
            --aspect-ratio: 1;
            border-radius: 50%;
        }

        b-camera::part(video) {
            height: 100%;
            object-fit: cover;
        }
    `

    constructor(){
        super()
        this.draw = new Draw()

        this.opts = new CollMap(null, {
            store: store.create('b-screen-recorder-opts', {
                size: 'standard',
                resolution: 720
            })
        })

        this.size = this.opts.get('size')

        this.recordedData = []
        this.drawOn = this.drawOn.bind(this)
        this.drawOff = this.drawOff.bind(this)
    }

    open(){
        if( this.parentElement ) return
        document.body.appendChild(this)
    }

    close(){
        this.remove()
    }

    firstUpdated(){
        super.firstUpdated()

        setTimeout(()=>{
            this.camera?.start().catch(err=>{})
        })
    }

    connectedCallback(){
        super.connectedCallback()
        this.camera?.start().catch(err=>{})
    }

    disconnectedCallback(){
        super.disconnectedCallback()

        // make sure these stop
        this.camera.stop()
        this.drawOff()
        this.disableDraw()
    }

    render(){return html`

        <b-draggable></b-draggable>

        <b-grid class="controls" cols=1 center gap=" ">
            <b-btn fab icon="close" @click=${this.cancelAndClose}></b-btn>
            ${this.recording?html`
                <b-btn color="theme-gradient" @click=${this.stop}>Stop & Save</b-btn>
                <b-text tnum class="timer" sm><b-timer running></b-timer></b-text>
            `:html`
                <b-btn-group>
                    <b-btn color="theme-gradient" @click=${this.start}>Record</b-btn>
                    <b-btn color="theme" icon="settings" @click=${this.options}></b-btn>
                </b-btn-group>
            `}

        </b-grid>

        <b-camera placeholder=""></b-camera>
    `}

    showTips(e){
        new Dialog({
            title: 'Tips',
            body: html`
                - Click and drag this bubble to move
                <br>- Change cameras with <b-code>right+click</b-code> on the circle
                <br>- While recording, hold <b-code>shift+ctrl/cmd</b-code> to draw with your mouse; letting go of keys will clear the drawing
            `,
            btns: ['dismiss']
        }).popOver(e.currentTarget, {maxWidth: '400px'})
    }

    get camera(){ return this.$$('b-camera', true) }

    toggle(){
        this.recording ? this.stop() : this.start()
    }

    cancel(){
        this.recordedData = []
        this.stop()
    }

    async cancelAndClose(e){

        if( this.recordedData?.length && !await new Dialog({
            body: 'Trash current recording and stop?',
            btns: ['dismiss', {label: 'Cancel Recording', color: 'red'}]
        }).popOver(e.currentTarget))
            return

        this.cancel()
        this.close()
    }

    async start({thisTab=false}={}){

        if( this.recording ) return
        
        this.title = document.title // for filename
        this.deviceRecorder = null
        this.recordedData = []
        
        this.enableDraw()

        try{

            let [resW, resH] = RESOLUTIONS[this.opts.get('resolution')] || RESOLUTIONS[720]

            var videoStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    mediaSource: 'screen',
                    width: { ideal: resW, max: resW },
                    height: { ideal: resH, max: resH }
                }, 
                audio: false,
                selfBrowserSurface: 'include',
                surfaceSwitching: 'exclude',
                preferCurrentTab: thisTab, // not wide support
            })
            

            let audioStream = await navigator.mediaDevices.getUserMedia({
                video: false,
                // audio: true
                audio: { // https://medium.com/@trystonperry/why-is-getdisplaymedias-audio-quality-so-bad-b49ba9cfaa83
                    autoGainControl: true,
                    echoCancellation: true,
                    googAutoGainControl: true,
                    noiseSuppression: true
                }, 
            })

            this.stream = await new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]) 

            // if ended via Chrome "stop share" button
            this.stream.getVideoTracks()[0].addEventListener('ended', () => {
                console.log('stream ended');
                this.onStop()
            });

            this.deviceRecorder = await new MediaRecorder(this.stream, {mimeType: "video/webm"});

            this.deviceRecorder.ondataavailable = (e) => {
                if(e.data.size > 0 && this.recording )
                    this.recordedData.push(e.data);
            }

            this.deviceRecorder.onstop = function(){} // this not yet needed
            
            this.deviceRecorder.start(4.17188152) // timeslice (ms) - number is 24 frames a second; idk :shrug:

            this.recording = true
            this.draggableController?.snapToEdge()

        }catch(err){
            
            this.stop()

            if( err.message != 'Permission denied' )
                throw err
        }
    }

    stop(){
        this.stream?.getTracks().forEach(track=>track.stop())
        this.onStop()
    }

    onStop(){

        // stop recording
        this.recording = false
        this.deviceRecorder?.stop()
        // this.camera?.stop()
        this.disableDraw()

        if( !this.recordedData.length ) return console.log('nothing captured');

        // download recording
        let filename = this.title+'-'+(new Date().getTime())+'.webm'
        downloadContent(this.recordedData, filename, {type: 'video/webm'})
        
        // reset
        this.recordedData = []
    }

    enableDraw(){
        document.addEventListener('keydown', this.drawOn)
        document.addEventListener('keyup', this.drawOff)
    }

    disableDraw(){
        document.removeEventListener('keydown', this.drawOn)
        document.removeEventListener('keyup', this.drawOff)
    }

    drawOn(e){
        if( !e 
        || ((e.ctrlKey||e.metaKey) && e.shiftKey) )
            document.body.appendChild(this.draw)
    }
    
    drawOff(){
        this.draw.remove()
    }

    async contextMenu(e){
        this.options(e)
    }

    async options(e){

        if( !this.camera ) return

        let menu = []

        menu.push({
            label: 'Size',
            description: this.opts.get('size')||'Standard',
            fn: 'changeSize',
            menu: SIZES,
            menuOpts: {selected: this.opts.get('size')}
        })

        menu.push({
            label: 'Resolution',
            fn: 'changeRes',
            description: this.opts.get('resolution')||'720',
            menu: Object.values(RESOLUTIONS).map(([width, height])=>{
                return {label: height, val: height}
            }),
            menuOpts: {selected: this.opts.get('resolution')}
        })

        let devices = await this.camera.getDevices()
        let device = devices.find(d=>d.deviceId==this.camera.settings.get('deviceId'))
        menu.push({
            label: 'Camera',
            description: device?.label||this.camera.settings.get('deviceId'),
            fn: 'changeCamera',
            menu: devices.length ? [...devices] : [{text: 'No cameras available', bgd: false}]
        })

        menu.push('-',{
            label: 'Tips',
            menu: [
                {text: html`
                <b-text md body color="text" style="max-width: 300px">
                <b-grid cols=1 gap="1">
                    <b-text>Click and drag this bubble to move</b-text>
                    <b-text>Hold <b-code>shift+ctrl/cmd</b-code> while recording to draw with your mouse</b-text>
                    <b-text>Left and Right clicks draw with different colors</b-text>
                    <b-text>Letting go of keys will clear the drawing</b-text>
                </b-grid>
                </b-text>
            `}
            ]
        })

        new Menu(menu, {
            handler: [this, e]
        }).popOver(e)
    }

    async changeCamera(e, device){
        this.camera.start({deviceId: device.menuSelected||device})
    }

    async changeSize(e, size){
        this.size = size.menuSelected?.val || size.val
        this.opts.set('size', this.size)
        setTimeout(()=>{
            this.draggableController.snapToEdge()
        })
    }

    async changeRes(e, res){
        this.opts.set('resolution', res.menuSelected?.val || res.val)
    }

})

export default customElements.get('b-screen-record')
