/*
    # Dictate

    WIP - not setup for generic use yet - a bit "hardcoded"
*/
import { LitElement, html, css } from 'lit'
import './pointer-events'
// import Fuse from 'fuse.js'


customElements.define('b-dictate', class extends LitElement{

    static get properties(){return {
        listening: {type: Boolean, reflect: true},
        value: {type: String},
        final: {type: Boolean, reflect: true}
    }}

    static styles = css`
        :host {
            display: block;
            position:relative;
        }

        b-btn {
            position: relative;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* Base subtle shadow */
            font-size: 2em;
            bottom: 0;
            right: 0;
        }

        b-btn::part(label){
            display: none;
        }

        .value {
            position: absolute;
            bottom: calc(100% + 2em);
            right: 50%;
            z-index: 1000;
            background: var(--theme-inverse-bgd);
            color: var(--theme-inverse-text);
            padding: .5em;
            box-shadow: var(--theme-shadow);
            border-radius: 1em;
            white-space: nowrap;
            display: none;
        }

        /*:host([final]) .value {
            background: var(--theme-gradient);
        }*/

        :host([listening]) .value:not(:empty) {
            display: block;
        }

        :host([listening]) b-btn{
            animation: rainbowGlow 3s infinite linear;
        }

        @keyframes rainbowGlow {
            0% {
                box-shadow: 0 0 20px 5px rgba(255, 0, 0, 0.8), /* Red */
                            0 0 30px 10px rgba(255, 165, 0, 0.6), /* Orange */
                            0 0 40px 15px rgba(255, 255, 0, 0.4); /* Yellow */
            }
            16.67% {
                box-shadow: 0 0 20px 5px rgba(255, 255, 0, 0.8), /* Yellow */
                            0 0 30px 10px rgba(0, 128, 0, 0.6), /* Green */
                            0 0 40px 15px rgba(0, 0, 255, 0.4); /* Blue */
            }
            33.33% {
                box-shadow: 0 0 20px 5px rgba(0, 128, 0, 0.8), /* Green */
                            0 0 30px 10px rgba(0, 0, 255, 0.6), /* Blue */
                            0 0 40px 15px rgba(128, 0, 128, 0.4); /* Purple */
            }
            50% {
                box-shadow: 0 0 20px 5px rgba(0, 0, 255, 0.8), /* Blue */
                            0 0 30px 10px rgba(128, 0, 128, 0.6), /* Purple */
                            0 0 40px 15px rgba(255, 0, 0, 0.4); /* Red */
            }
            66.67% {
                box-shadow: 0 0 20px 5px rgba(128, 0, 128, 0.8), /* Purple */
                            0 0 30px 10px rgba(255, 0, 0, 0.6), /* Red */
                            0 0 40px 15px rgba(255, 165, 0, 0.4); /* Orange */
            }
            83.33% {
                box-shadow: 0 0 20px 5px rgba(255, 165, 0, 0.8), /* Orange */
                            0 0 30px 10px rgba(255, 255, 0, 0.6), /* Yellow */
                            0 0 40px 15px rgba(0, 128, 0, 0.4); /* Green */
            }
            100% {
                box-shadow: 0 0 20px 5px rgba(255, 0, 0, 0.8), /* Back to Red */
                            0 0 30px 10px rgba(255, 165, 0, 0.6), /* Orange */
                            0 0 40px 15px rgba(255, 255, 0, 0.4); /* Yellow */
            }
        }
    `

    static get isSupported(){
        return !!window.SpeechRecognition || !!window.webkitSpeechRecognition
    }

    render(){return html`
        <b-btn icon="mic" lg fab empty
            @pointerdown=${this.start}
            @pointerrelease=${this.done}
            @pointercancel=${this.cancel}
        ><b-pointer-events></b-pointer-events></b-btn>

        <b-text class="value">${this.value}</b-text>
    `}

    constructor(){
        super()
        this.listening = false
    }

    firstUpdated(){
        this.setup()
    }

    cleanValue(val){
        return val.replace(/ space /g, ' ')
    }

    setup(){

        if( !this.constructor.isSupported )
            return console.warn('Your browser does not support the Web Speech API.')

        if( this.recognition )
            return

        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()

        // let brands = ['Kurz', 'ifoil', 'ricoh']
        // let grammar = `#JSGF V1.0; grammar brands; public <brand> = ${brands.join(' | ')}`

        // const GrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
        // if( GrammarList ){
        //     console.log(grammar);
            
        //     const speechRecognitionList = new GrammarList()
        //     speechRecognitionList.addFromString(grammar, 100)
        //     this.recognition.grammars = speechRecognitionList
        // }

        this.recognition.continuous = true
        this.recognition.interimResults = true
        this.recognition.lang = 'en-US'
        
        this.recognition.onresult = (event) => {

            let interimTranscript = '';
            let finalTranscript = '';
            let final = false

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                // console.log(transcript);
                
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                    final = true
                } else {
                    interimTranscript += transcript;
                    final = false
                }
            }

            // Update textarea with final and interim results
            this.final = final
            this.value = (finalTranscript + interimTranscript).trim()
            // this.valueDone()
        }

        this.recognition.onerror = (event) => {
            // status.textContent = `Error occurred: ${event.error}`;
            console.log(event.error);

            if (event.error === 'no-speech' || event.error === 'aborted') {
                this.stop();
            }
        }

        this.recognition.onend = () => {
            console.log('onend');
            
            if( this.listening ){
                this.recognition.start(); // Restart if still in recognizing mode
            } else {
                // status.textContent = 'Dictation stopped. Click the button to start again.';
                // startStopBtn.textContent = 'Start Dictation';
            }
        };
  
    }

    /*valueDone(){
        clearTimeout(this._valueDoneTimeout)

        if( this._valueDone == this.value )
            return

        this._valueDoneTimeout = setTimeout(()=>{

            this._valueDone = this.value
            
            console.log('DONE', this.value);

            let fuse = new Fuse(window.dictateActions, {
                // threshold: this.threshold,
                // includeScore: true,
                keys: ["id"]
            })

            let action = fuse.search(this.value)

            console.log(action);
            
            if( action[0]?.url )
                goTo(action[0].url)

            
        }, 600)
    }*/
    
    toggle(){
        this.listening ? this.stop() : this.start()
    }

    done(){
        let val = this.value
        console.log(val);

        if( this.final )
            this.emitEvent('dictate', val)
        
        this.stop()
    }

    cancel(){
        window.soundFX?.play('dictateCancel')
        this.stop()
    }
    
    start(){
        
        // window.soundFX?.play('dictateStart')
        this.listening = true;
        this.value = ''
        this._valueDone = ''
        this.recognition.start()
        
        // startStopBtn.textContent = 'Stop Dictation';
        // status.textContent = 'Dictating... Speak clearly into your microphone.';
    }

    stop(){
        
        this.listening = false;
        this.recognition.stop()
        // startStopBtn.textContent = 'Start Dictation';
        // status.textContent = 'Dictation stopped. Click the button to start again.';
    }
})

export default customElements.get('b-dictate')