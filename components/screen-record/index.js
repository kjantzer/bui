import { LitElement, html, css } from 'lit'
import Camera from './camera'

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
        this.onStop = this.onStop.bind(this)
        this.camera = new Camera()        
    }

    render(){return html`
        <b-btn @click=${this.toggle}>${this.recording?'Stop':'Record'}</b-btn>
        
    `}

    firstUpdated(){
        this.camera.show()
    }

    toggle(){
        this.recording = !this.recording; // Start / Stop recording

        // setTimeout(()=>{

            if(this.recording){
                this.camera.show()
                this.startRecording()
            } else {
                this.camera?.hide()
                this.stopRecording()
            }

        // })
    }

    async startRecording(){
        
        this.deviceRecorder = null
        this.chunks = []

        try{

        var videoStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: 'screen',
                width: { ideal: 2560, max: 2560 },
                height: { ideal: 1440, max: 1440 }
            }, 
            audio: {
                autoGainControl: false,
                echoCancellation: false,
                googAutoGainControl: false,
                noiseSuppression: false
            },
            // selfBrowserSurface: 'include',
            surfaceSwitching: 'exclude',
            // preferCurrentTab: true, // not wide support
            // systemAudio: 'include'
        })

        let audioStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: { // https://medium.com/@trystonperry/why-is-getdisplaymedias-audio-quality-so-bad-b49ba9cfaa83
                autoGainControl: false,
                echoCancellation: false,
                googAutoGainControl: false,
                noiseSuppression: false
            }, 
        }) 

        let stream = await new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]) 

        this.deviceRecorder = await new MediaRecorder(stream, {mimeType: "video/webm"});


        this.deviceRecorder.ondataavailable = (e) => {
            if(e.data.size > 0){
                this.chunks.push(e.data);
            }
        }

        this.deviceRecorder.onstop = this.onStop
        
        this.deviceRecorder.start(4.17188152) // ms - 24 frames a second?

        }catch(err){
            this.recording = false
            throw err
        }
    }

    stopRecording(){
        this.deviceRecorder.stop()
    }

    onStop(){
        console.log('did stop?');
        // var filename = window.prompt("File name", "video"); // Ask the file name
        let filename = 'test.webm'

        let blob = new Blob(this.chunks, {type: "video/webm"})
        this.chunks = [] // Resetting the data chunks

        var dataDownloadUrl = URL.createObjectURL(blob);

        // Downloadin it onto the user's device
        let a = document.createElement('a')
        a.href = dataDownloadUrl;
        a.download = `${filename}.webm`
        a.click()
        
        URL.revokeObjectURL(dataDownloadUrl)
    }

})

export default customElements.get('b-screen-record')
