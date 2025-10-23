/*
    # Floating Audio Player

    Displays `b-audio` in a Dialog.notif

    ```js
    FloatingAudioPlayer.shared.open(file)
    ```
*/
import { LitElement, html, css } from 'lit'
import Dialog from '../presenters/dialog'
import './audio'
import '../helpers/lit/shared'

customElements.defineShared('b-floating-audio-player', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position:relative;
            width: 400px;
        }

        :host-context(b-dialog) {
            margin: calc(-1 * var(--pad));
        }

        :host-context(b-dialog) b-audio::part(main) {
            padding: var(--pad);
            padding-top: calc(.75 * var(--pad));
            padding-bottom: calc(.75 * var(--pad));
            /*padding-left: calc(.75 * var(--pad));*/
        }

        b-audio {
            background: none;
        }
        
        b-waveform { 
            --waveform-height: 100px;
            --waveform-color: var(--theme);
            --waveform-offset: 200px; /* center it */
            --waveform-playhead-color: var(--theme-text);

            margin: calc(var(--pad) * -1);
            margin-top: calc(-.75 * var(--pad));
            margin-bottom: calc(-.75 * var(--pad));
            margin-bottom: 0;
        }
    `

    open(file){

        if( !this.presenter ){
            this.presenter = new Dialog({
                view: this,
                color: 'inverse',
                btns: false,
                closeBtn: true,
            })
            .notif({
                autoClose: false, 
                closeOnClick: false,
                onClose: ()=>{
                    this.model = null
                }
            })
            .then(r=>{
                this.presenter = null
            })
        }

        this.model = file
    }

    get src(){
        if( !this.model ) return ''

        if( typeof this.model == 'string' )
            return this.model

        return this.model.displayURL || this.model.get?.('url') || this.model.url
    }

    connectedCallback(){
        super.connectedCallback()
        setTimeout(()=>{
            this.hookupWaveform()
        },100)
    }

    hookupWaveform(){
        if( this.$$('b-audio', true) )
            this.$$('b-audio', true).waveform = this.$$('b-waveform')
    }

    render(){return html`

        <b-audio autoplay .src=${this.src}>
            ${this.model?.get?.('has_preview')?html`
            <b-waveform playhead url=${this.model.previewURL} center slot="before"></b-waveform>
            `:''}
            <b-text block align="center" slot="before" ?hidden=${!this.model?.origFilenameLabel}>${this.model?.origFilenameLabel}</b-text>
        </b-audio>
    `}

})

export default customElements.get('b-floating-audio-player')