/*
    Screen Record

    NOTES
    - enable resolutions
    - mic/video enable/disable
    - avatar sizes
*/
import { LitElement, html, css } from 'lit'
import Dialog from '../../presenters/dialog'
import {downloadContent} from '../../util/download'
import '../../helpers/lit/shared'
import '../../elements/camera'
import '../../elements/camera-controls'
import '../../elements/draggable'
import '../../elements/timer'
import '../../elements/text'
import '../../elements/btn'
import '../../elements/grid'
import Draw from '../draw'

customElements.defineShared('b-screen-record', class extends LitElement{

    static properties = {
        recording: {type: Boolean, reflect: true}
    }

    static styles = css`

        :host {
            display: grid;
            place-items: center;
            poition: absolute;
            height: 200px;
            width: 200px;
            border-radius: 50%;
            bottom: 0;
            right: 0;
            z-index: 10000;
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

        [fab]:first-of-type {
            top: 0;
            left: 0;
        }

        [fab] ~ [fab] {
            bottom: 0;
            right: 0;
        }

        :host([recording]:not(:hover)) .controls {
            display: none;
        }

        .timer {
            background: rgba(0,0,0,.4);
            color: white;
            padding: 0.25em;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
        }
    `

    constructor(){
        super()
        this.draw = new Draw()

        this.recordedData = []
        this.drawOn = this.drawOn.bind(this)
        this.drawOff = this.drawOff.bind(this)
    }

    open(){
        document.body.appendChild(this)
    }

    close(){
        this.remove()
    }

    firstUpdated(){
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
            <b-btn color="theme-gradient" @click=${this.toggle}>${this.recording?'Stop & Save':'Start Recording'}</b-btn>
            <b-btn fab @click=${this.showTips}>?</b-btn>

            ${this.recording?html`
                <b-text tnum class="timer" sm><b-timer running></b-timer></b-text>
            `:''}
        </b-grid>

        <b-camera bubble placeholder="">
            <b-camera-controls></b-camera-controls>
        </b-camera>
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

            var videoStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    mediaSource: 'screen',
                    // TODO: enable resolution selection
                    width: { ideal: 1280, max: 1280 },
                    height: { ideal: 720, max: 720 }
                    // width: { ideal: 1920, max: 1920 },
                    // height: { ideal: 1080, max: 1080 }
                    // width: { ideal: 2560, max: 2560 },
                    // height: { ideal: 1440, max: 1440 }
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

})

export default customElements.get('b-screen-record')
