import { LitElement, html, css } from 'lit'
import Camera from './camera'
import {downloadContent} from '../../util/download'
import Draw from '../draw'

customElements.define('b-screen-record', class extends LitElement{

    static properties = {
        recording: {type: Boolean, reflect: true}
    }

    static styles = css`
        :host {
            display: contents;
        }
    `

    constructor(){
        super()
        this.camera = new Camera()
        this.draw = new Draw()

        this.drawOn = this.drawOn.bind(this)
        this.drawOff = this.drawOff.bind(this)

        window.rec = this // TEMP
    }

    render(){return html`
        <b-btn @click=${this.toggle}>${this.recording?'Stop':'Record'}</b-btn>
    `}

    toggle(){
        if(this.recording){
            this.stop()  
        }else{
            this.start()
        }
    }

    async start({thisTab=true}={}){

        if( this.recording ) return
        
        this.title = document.title // for filename
        this.deviceRecorder = null
        this.chunks = []

        this.camera.show()
        this.enableDraw()

        try{

            var videoStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    mediaSource: 'screen',
                    width: { ideal: 1920, max: 1920 },
                    height: { ideal: 1080, max: 1080 }
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
                audio: true
                // audio: { // https://medium.com/@trystonperry/why-is-getdisplaymedias-audio-quality-so-bad-b49ba9cfaa83
                //     autoGainControl: false,
                //     echoCancellation: false,
                //     googAutoGainControl: false,
                //     noiseSuppression: false
                // }, 
            })

            this.stream = await new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]) 

            // if ended via Chrome "stop share" button
            this.stream.getVideoTracks()[0].addEventListener('ended', () => {
                console.log('stream ended');
                this.onStop()
            });

            this.deviceRecorder = await new MediaRecorder(this.stream, {mimeType: "video/webm"});

            this.deviceRecorder.ondataavailable = (e) => {
                if(e.data.size > 0){
                    this.chunks.push(e.data);
                }
            }

            // this not yet needed
            this.deviceRecorder.onstop = function(){
                console.log('recorder stopped?');
            }
            
            this.deviceRecorder.start(4.17188152) // ms - 24 frames a second?

            this.recording = true

        }catch(err){
            
            this.stop()

            if( err.message != 'Permission denied' )
                throw err
        }
    }

    stop(){
        this.stream?.getVideoTracks()?.[0].stop()
        this.onStop()
    }

    onStop(){

        // stop recording
        this.recording = false
        this.deviceRecorder?.stop()
        this.camera?.hide()
        this.disableDraw()

        if( !this.chunks.length ) return

        // download recording
        let filename = this.title+'.webm'
        downloadContent(this.chunks, filename, {type: 'video/webm'})
        
        // reset
        this.chunks = []
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
