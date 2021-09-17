/*
    Barcode Camera Scanner

    Original ideal from:
    https://github.com/fletcherrippon/JavaScriptQRCodeReader

    ```
    import CameraScanner from 'bui/util/barcodeScanner/camera

    CameraScanner.open() // closes after first scan
    CameraScanner.open({continous: true})
    ```

    TODO:
    - support switching cameras (list available)
    - toggle torch/light if supported
    - zoom support?
*/
import { LitElement, html, css } from 'lit-element'
import {Parsers, emit} from './index'
import device from '../device'
import '../../helpers/lit-element/shared'
import Dialog from '../../presenters/dialog'

customElements.defineShared('b-barcode-camera-scanner', class extends LitElement{

    static get properties(){return {
        continous: {Boolean: String}
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
            color: 'inverse'
        })
        
       camScanner.presenter.notif({
           anchor,
           autoClose: false,
           closeOnClick: true,
           width: 'auto'
        })

        await camScanner.start(scanner)
    }

    static get styles(){return css`
        :host {
            display: inline-block;
            position:relative;
            width: var(--width, 300px);
            height: calc(var(--width, 300px) / var(--aspect-ratio, 1.7777777778));
            line-height: 0;

            position: relative;
            border-radius: var(--radius, 8px);
            overflow: hidden;
            background-color: var(--theme-bgd-accent);
        }

        video {
            height: auto;
            width: auto;
            max-width: 100%;
        }

        canvas {
            width: 100%;
            height: 100%;
            position: absolute;
        }
    `}

    async firstUpdated(){
        this.video = this.$$('video')
        // this.canvas = this.$$('canvas')
    }

    render(){return html`
        <canvas></canvas>
        <video autoplay></video>
    `}

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

        if( !'BarcodeDetector' in window )
            return 'BarcodeDetector not supported'

        return true
    }

    checkFeatures(){
        let isSupported = this.constructor.isSupported
        if( isSupported !== true )
            throw new Error(isSupported)
    }

    async start({
        continous=false,
        formats=['qr_code', 'ean_13', 'code_128'],
        facingMode='environment',
        width=640,
        aspectRatio=1.7777777778,
        focusDistance=0.1,
        detectInterval=100 // ms
    }={}){

        this.checkFeatures()

        this.continous = continous
        this.detector = new BarcodeDetector({formats});

        this.style.setProperty('--aspect-ratio', aspectRatio)
        
        // Start video stream
        this.stream = await navigator.mediaDevices.getUserMedia({ 
                audio: false,
                video: {
                    width,
                    aspectRatio,
                    facingMode,
                    // imac camera // TEMP
                    deviceId: '0881177ed75e30561585154f2605242a344718e018049b168bfee0604eef3d1e'
                }
        })

        this.video.srcObject = this.stream

        this.detecting = this.detecting || setInterval(this.detectCode, detectInterval);

        let track = this.stream.getVideoTracks()[0]
        let supports = track.getCapabilities()
        
        if( supports.focusDistance )
        track.applyConstraints({
            advanced: [{ focusMode: 'manual', focusDistance}]
        })
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

        clearInterval(this.detecting)
        this.detecting = null

        if( this.stream )
            this.stream.getTracks().forEach(track=>{ track.stop() })

        this.video.srcObject = null
    }

    async detectCode(){
            
        let codes = []
        
        try {
            codes = await this.detector.detect(this.video)
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

        if( !this.continous )
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