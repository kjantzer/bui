/*
    Barcode Camera Scanner

    Original ideal from:
    https://github.com/fletcherrippon/JavaScriptQRCodeReader

    ```
    import CameraScanner from 'bui/util/barcodeScanner/camera

    CameraScanner.open() // closes after first scan
    CameraScanner.open({continuous: true})
    ```

    TODO:
    - support switching cameras (list available)
    - toggle torch/light if supported
    - zoom support?
*/
import { LitElement, html, css } from 'lit'
import {Parsers, emit} from './index'
import device from '../device'
import '../../helpers/lit/shared'
import Dialog from '../../presenters/dialog'
import '../../elements/camera'
import '../../elements/flex'
import '../../elements/text'

customElements.defineShared('b-barcode-camera-scanner', class extends LitElement{

    static get properties(){return {
        continuous: {Boolean: String}
    }}

    static async open({
        scanner={}, // "start()" options
        anchor=(device.isSmall?'top':'top-left'),
    }={}){

        let camScanner = this.shared

        if( camScanner.presenter )
            return camScanner.close()

        camScanner.checkFeatures()

        camScanner.presenter = new Dialog({
            view: camScanner,
            btns: false,
            color: 'inverse',
            fill: true
        })
        
       camScanner.presenter.notif({
           anchor,
           autoClose: false,
           closeOnClick: false,
           width: 'auto'
        })

        setTimeout(async () => {
            await camScanner.start(scanner)
        }, 0);
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            width: var(--width, 300px);
            height: calc(var(--width, 300px) / var(--aspect-ratio, 1.7777777778));
            line-height: 0;

            position: relative;
            border-radius: var(--radius, 8px);
            overflow: hidden;
            background-color: var(--theme-bgd-accent);
        }

        b-camera {
            width: 100%;
        }

        .marks {
            z-index: 20;
            margin: .5em;
            width: calc(100% - 1em);
            height: calc(100% - 1em);
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
        }

        .marks > div {
            border-color: red;
            border-style: solid;
            position: absolute;
            height: 1.5em;
            width: 1.5em;
        }

        .marks > div:nth-child(1){ border-width: 4px 0 0 4px; top: 0; left: 0;}
        .marks > div:nth-child(2){ border-width: 4px 4px 0 0; top: 0; right: 0;}
        .marks > div:nth-child(3){ border-width: 0 4px 4px 0; bottom: 0; right: 0;}
        .marks > div:nth-child(4){ border-width: 0 0 4px 4px; bottom: 0; left: 0;}

        .switch-cam {
            position: absolute;
            top: 1em;
            left: 1em;
            z-index: 10000;
            --bgdColor: rgba(0,0,0,.6);
        }

        radio-group {
            position: absolute;
            z-index: 10000;
            line-height: 1em;
            width: calc(100% - 2em);
            left: 1em;
            bottom: 1em;
            color: white;
            --radio-segment-min-width: 2em;
            --radio-segment-padding: 2px;
            --radio-segment-active-bgd: rgba(0,0,0,.6);
        }

        radio-group::part(main) {
            background: rgba(0,0,0,.3);
        }

        b-camera:not([streaming]) ~ radio-group {
            display: none;
        }

        .error  {
            background: rgba(0,0,0,.8);
            padding: 1px 3px;
        }
    `}

    render(){return html`
        <b-camera @click=${this.close}></b-camera>
        <div class="marks">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <b-flex center>
                <b-text ucase xbold xs align="center">
                    Barcode Scanner
                    <b-text ?hidden=${this.detector||!this.camera} class="error" color="red" block>BarcodeDetector not supported</b-text>
                </b-text>
            </b-flex>
        </div>

        ${this.camera?.canZoom?html`
            <radio-group segment @change=${this.changeZoom} .value=${this.camera.settings?.get('zoom')||'1`'}>
                <radio-btn value="1">1x</radio-btn>
                <radio-btn value="2">2x</radio-btn>
                <radio-btn value="3">3x</radio-btn>
            </radio-group>
        `:''}

        ${this.hasFrontBackCam?html`
            <b-btn @click=${this.toggleCamera} pill lg icon="cameraswitch" class="switch-cam"></b-btn>
        `:''}
    `}

    toggleCamera(e){
        e.stopPropagation()
        let {front, back} = this.hasFrontBackCam
        let camera = this.camera.videoStream.label == front.label ? back : front
        this.camera.start({
            deviceId: camera,
            mirror: camera == front
        })
    }

    changeZoom(e){
        e.stopPropagation()
        this.camera.zoom = e.currentTarget.value
    }

    constructor(){
        super();
        this.detectCode = this.detectCode.bind(this)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.stop()
    }

    static get isSupported(){
        // Check for a camera
        if( !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia )
            return 'getUserMedia not supported'

        if( !window.BarcodeDetector )
            return 'BarcodeDetector not supported'

        return true
    }

    checkFeatures(){
        let isSupported = this.constructor.isSupported
        if( isSupported !== true )
            throw new Error(isSupported)
    }

    get camera(){ return this.$$('b-camera', true) }

    async start({
        continuous=false,
        formats=['qr_code', 'ean_13', 'code_128'],
        facingMode='environment',
        width=1920,
        aspectRatio=1.7777777778,
        focusDistance=0.1,
        detectInterval=100 // ms
    }={}){

        this.checkFeatures()

        this.continuous = continuous

        this.style.setProperty('--aspect-ratio', aspectRatio)
        
        this.camera.start(arguments[0]).then(async ()=>{

            try{
                this.detector = new BarcodeDetector({formats});
                this.detecting = this.detecting || setInterval(this.detectCode, detectInterval);
            }catch(err){
                console.log(err);
            }

            this.hasFrontBackCam = await this.camera.hasFrontBack()
            this.requestUpdate() // to render zoom controls
        })

        this.focusTo(focusDistance)

        // after 3 seconds try minium focus distance
        // this._autoFocusChange = setTimeout(()=>{
        //     this.focusTo(0.05)
        // }, 3*1000)
    }

    focusTo(focusDistance){
        this.camera.focusTo(focusDistance)
    }

    // alias
    close(){
        this.stop()
    }

    stop(){

        if( this.presenter ){
            this.presenter.close()
            this.presenter = null
        }

        clearTimeout(this._autoFocusChange)
        clearInterval(this.detecting)
        this.detecting = null
        this.camera.stop()
    }

    async detectCode(){
            
        let codes = []
        
        try {
            codes = await this.detector.detect(this.camera.video)
        }catch(err){
            console.log(err);
        }

        // If no codes exit function and clear canvas
        if (codes.length === 0) return //this.drawCodePath({});

        let ts = new Date().getTime()

        // must have a delay between scans
        if( this._tsDetected && ts-this._tsDetected < 1000 )
            return

        this._tsDetected = ts
        
        codes = codes.map(code=>{

            if( typeof value === 'number' ) // error
                throw value // handle this better?
            
            // Draw outline
            // this.drawCodePath(barcode);

            let result = Parsers.parse(code.rawValue)
            result.format = code.format
            
            emit(result)

            return result
        })

        if( codes.length == 0 ) return

        window.soundFX&&soundFX.play('scan')

        if( !this.continuous )
            this.stop()

        // this.value = JSON.stringify(codes, null, 4)

        // for (const barcode of codes)  {
        //     console.log(barcode.rawValue)

        //     let value = barcode.rawValue

        //     if( typeof value === 'number' ) // error
        //         throw value

        //     if( value == this.value )
        //         return

        //     this.value = value

        //     window.soundFX&&soundFX.play('scan')

        //     // Draw outline
        //     this.drawCodePath(barcode);
            
        //     // Code in seen set then exit loop 
        //     // if (seen.has(barcode.rawValue)) return;

        //     // Save barcode to window to use later on
        //     // then push to the codes proxy
        //     // window.barcodeVal = barcode.rawValue;
        //     // codesProxy.push(barcode);
        // }
    }

    drawCodePath({cornerPoints}){

        return // dont need right now

        const canvas = this.canvas
        const ctx = canvas.getContext('2d');
        const strokeGradient = ctx.createLinearGradient(0, 0, canvas.scrollWidth, canvas.scrollHeight);
        
        // Exit function and clear canvas if no corner points
        if (!cornerPoints) return ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Clear canvas for new redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create new gradient
        strokeGradient.addColorStop('0', '#c471ed');
        strokeGradient.addColorStop('1', '#f7797d');

        // Define stoke styles
        ctx.strokeStyle = strokeGradient;
        ctx.lineWidth = 4;

        // Begin draw
        ctx.beginPath();

        // Draw code outline path
        for (const [i, {x, y}] of cornerPoints.entries()) {
            if (i === 0) {
            // Move x half of the stroke width back 
            // makes the start and end corner line up
            ctx.moveTo(x - ctx.lineWidth/2, y);
            continue;
            }

            // Draw line from current pos to x, y
            ctx.lineTo(x, y);

            // Complete square draw to starting position
            if (i === cornerPoints.length-1) ctx.lineTo(cornerPoints[0].x, cornerPoints[0].y);
        }

        // Make path to stroke
        ctx.stroke();
    }

})

export default customElements.get('b-barcode-camera-scanner')