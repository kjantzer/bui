/*
    Camera
*/
import { LitElement, html, css } from 'lit'
import '../helpers/lit/selectors'
import '../elements/empty-state'
import download, {downloadContent} from '../util/download'
import CollMap from '../util/collmap'
import store from '../util/store'

customElements.define('b-camera', class extends LitElement{

    static properties = {
        iid: {type: String},
        mirror: {type: Boolean, reflect: true},
        placeholder: {type: String},
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            width: var(--width, 400px);
            aspect-ratio: var(--aspect-ratio, 1.7777777778);
            line-height: 0;

            position: relative;
            overflow: hidden;
            background-color: var(--theme-bgd-accent);
        }

        :host([hidden]) {
            display: none;
        }

        video {
            height: auto;
            width: auto;
            max-width: 100%;
            position: relative;
            z-index: 10;
        }

        :host([mirror]) video {
            transform: scaleX(-1);
        }

        canvas {
            width: 100%;
            height: 100%;
            position: absolute;
        }

        b-empty-state {
            z-index: 0;
            color: var(--theme-text-accent);
            opacity: 1;
        }

        :host([bubble]) {
            --aspect-ratio: 1;
            border-radius: 50%;
        }

        :host([bubble]) video {
            height: 100%;
            object-fit: cover;
        }
    `}

    constructor(){
        super()
        this.placeholder = 'Uninitialized'
    }

    get key(){ return 'b-camera-'+(this.iid||'0') }
    
    async firstUpdated(){
        this.video = this.$$('video')
        this.settings = new CollMap(null, {store: store.create(this.key)})
    }

    render(){return html`
        <canvas hidden></canvas>
        <video autoplay playsinline part="video"></video>
        <b-empty-state part="placeholder">${this.placeholder}</b-empty-state>
        <slot></slot>
    `}

    disconnectedCallback(){
        super.disconnectedCallback()
        this.stop()
    }

    static get isSupported(){
        // Check for a camera support
        if( !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia )
            return 'getUserMedia not supported'

        return true
    }

    get isActive(){
        return this.stream?.active
    }

    checkFeatures(){
        let isSupported = this.constructor.isSupported
        if( isSupported !== true )
            throw new Error(isSupported)
    }

    toggleStart(){
        this.isActive ? this.stop() : this.start()
    }

    async start({
        facingMode='environment',
        width=1920,
        aspectRatio=1.7777777778,
        audio=false,
        zoom=null, // default or saved settings
        deviceId=null,
        mirror=null
    }={}){

        if( !this.video ) return

        this.checkFeatures()

        this.style.setProperty('--aspect-ratio', aspectRatio) // NOTE: support this?

        this.stop()

        if( mirror !== null )
            this.settings.set('mirror', mirror)

        this.mirror = this.settings.get('mirror')

        // can be given `InputDeviceInfo` object
        if( deviceId?.deviceId )
            deviceId = deviceId.deviceId

        if( deviceId )
            this.settings.set('deviceId', deviceId)
        else
            deviceId = this.settings.get('deviceId')
        
        // Start video stream
        this.stream = await navigator.mediaDevices.getUserMedia({ 
            audio,
            video: {
                width: {ideal: width},
                aspectRatio,
                facingMode,
                deviceId,
                zoom: zoom || this.settings.get('zoom') || 1
            }
        })

        this.videoStream = this.stream.getVideoTracks()[0]
        this.capabilities = this.videoStream.getCapabilities()

        this.video.srcObject = this.stream
        this.video.hidden = false
        this.setAttribute('streaming', '')
    }

    async startRecording(){

        if( !this.stream ) throw new UIWarningError('No stream')
        
        this.recordedData = []
        this.deviceRecorder = await new MediaRecorder(this.stream, {mimeType: "video/webm"});

        this.deviceRecorder.ondataavailable = (e) => {
            if(e.data.size > 0 && this.recording )
                this.recordedData.push(e.data);
        }

        this.deviceRecorder.onstop = function(){} // this not yet needed
        
        this.deviceRecorder.start(4.17188152) // timeslice (ms) - number is 24 frames a second; idk :shrug:

        this.recording = true
    }

    stopRecording({
        download=false
    }={}){
        if( !this.deviceRecorder ) throw new UIWarningError('Not recording')

        this.recording = false
        this.deviceRecorder.stop()

        if( !this.recordedData?.length ) return console.log('nothing captured');

        let data = this.recordedData
        this.recordedData = []

        // download recording
        if( download ){
            let filename = 'camera-'+(new Date().getTime())+'.webm'
            return downloadContent(data, filename, {type: 'video/webm'})
        }

        return new Blob(data, {type: 'video/webm'});
    }

    focusTo(focusDistance){
        if( !this.stream ) return
        let opts = this.capabilities

        // throw new UIAlertError(`${supports.focusDistance.min} - ${supports.focusDistance.max}`)
        if( opts.focusDistance ){

            if( focusDistance < opts.focusDistance.min )
                focusDistance = opts.focusDistance.min
            
            if( focusDistance > opts.focusDistance.max )
                focusDistance = opts.focusDistance.max

            try{
                this.videoStream.applyConstraints({
                    advanced: [{
                        focusMode: 'manual', 
                        focusDistance,
                    }]
                })
            }catch(err){

            }
        }
    }

    get canZoom(){ return this.capabilities?.zoom }
    get zoom(){ return this.videoStream.getConstraints()?.zoom }
    set zoom(val){ return this.zoomTo(val) }

    zoomTo(zoomVal){
        // TODO: check capabilities and change zoomVal if out of bounds

        let opts = this.capabilities

        if( !opts.zoom ) return console.log('zoom not supported');

        if( !zoomVal ) zoomVal = opts.zoom.min // reset to min
        else zoomVal = parseFloat(zoomVal)

        if( !zoomVal ) return console.log('bad zoom val:', zoomVal);

        if( zoomVal < opts.zoom.min ) zoomVal = opts.zoom.min
        if( zoomVal > opts.zoom.max ) zoomVal = opts.zoom.max

        try{
            this.videoStream.applyConstraints({
                zoom: zoomVal
            })

            this.settings.set('zoom', zoomVal)
        }catch(err){
            console.log(err);
        }
    }

    async getDevices(){
        let devices = await navigator.mediaDevices.enumerateDevices()
        devices = devices.filter(device=>device.kind=='videoinput'&&device.deviceId).map(d=>{
            d.val = d.deviceId
            return d
        })
        return devices
    }

    async hasFrontBack(){
        let devices = await this.getDevices()
        let front = devices.find(d=>d.label.match(/front/i))
        let back = devices.find(d=>d.label.match(/back/i))

        if( front && back )
            return {front, back}

        return false
    }

    stop(){
        this.stream?.getTracks().forEach(track=>track.stop())
        this.video.srcObject = null
        this.video.hidden = true
        this.removeAttribute('streaming')
    }

    saveFrame(...args){ return this.takePicture(...args) } // alias
    takePicture({filename}={}){
        
        filename = (filename||this.key)+`-${new Date().getTime()}.jpg`

        const canvas = this.$$('canvas', true)
        const context = canvas.getContext("2d");
        let width = this.video.videoWidth;
        let height = this.video.videoHeight;
        
        canvas.hidden = false
        canvas.width = width;
        canvas.height = height;
        context.drawImage(this.video, 0, 0, width, height);

        const data = canvas.toDataURL('image/jpeg', 1.0);
        download(data, filename)

        canvas.hidden = true
    }

})

export default customElements.get('b-barcode-camera-scanner')