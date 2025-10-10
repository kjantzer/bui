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

    render(){return html`
        <b-audio autoplay .src=${this.src}>
            <b-text slot="before" sm dim ?hidden=${!this.model?.origFilenameLabel}>${this.model?.origFilenameLabel}</b-text>
        </b-audio>
    `}

})

export default customElements.get('b-floating-audio-player')