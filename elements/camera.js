/*
    Camera
*/
import { LitElement, html, css } from 'lit'
import '../helpers/lit/selectors'
import '../elements/empty-state'
import download from '../util/download'
import CollMap from '../util/collmap'
import store from '../util/store'

customElements.define('b-camera', class extends LitElement{

    static properties = {
        iid: {type: String},
        mirror: {type: Boolean, reflect: true}
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
    `}

    get key(){ return 'b-camera-'+(this.iid||'0') }
    
    async firstUpdated(){
        this.video = this.$$('video')
        this.settings = new CollMap(null, {store: store.create(this.key)})
    }

    render(){return html`
        <canvas></canvas>
        <video autoplay playsinline></video>
        <b-empty-state sm>Uninitialized</b-empty-state>
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
        deviceId=null,
        mirror=null
    }={}){

        this.checkFeatures()

        this.style.setProperty('--aspect-ratio', aspectRatio) // NOTE: support this?
        this.mirror = mirror === null ? this.mirror : mirror

        this.stop()

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
                deviceId
            }
        })

        let track = this.stream.getVideoTracks()[0]
        this.capabilities = track.getCapabilities()

        this.video.srcObject = this.stream
        this.video.hidden = false
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
                track.applyConstraints({
                    advanced: [{
                        focusMode: 'manual', 
                        focusDistance,
                    }]
                })
            }catch(err){

            }
        }
    }

    async getDevices(){
        let devices = await navigator.mediaDevices.enumerateDevices()
        devices = devices.filter(device=>device.kind=='videoinput').map(d=>{
            d.val = d.deviceId
            return d
        })
        return devices
    }

    stop(){

        if( this.stream )
            this.stream.getTracks().forEach(track=>{ track.stop() })

        this.video.srcObject = null
        this.video.hidden = true
    }

    takePicture({filename}={}){
        
        filename = (filename||this.key)+`-${new Date().getTime()}.jpg`

        const canvas = this.$$('canvas', true)
        const context = canvas.getContext("2d");
        let width = this.video.videoWidth;
        let height = this.video.videoHeight;
        
        canvas.width = width;
        canvas.height = height;
        context.drawImage(this.video, 0, 0, width, height);

        const data = canvas.toDataURL('image/jpeg', 1.0);
        download(data, filename)
    }

})

export default customElements.get('b-barcode-camera-scanner')