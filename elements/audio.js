import { LitElement, html, css } from 'lit-element'
// import Menu from '../presenters/menu'
import './icon'
import '../presenters/form-control/controls/range-slider'
import moment from 'moment'
import store from '../util/store'

// TODO: hook up settings menu

const formatTime = sec=>{
    var dur = moment.duration(sec * 1000)
    var hours = dur.hours()
    var min = hours > 0 ? String(dur.minutes()).padStart(2,'0') : dur.minutes()
    return (hours?hours+':':'') + min + ':' + String(dur.seconds()).padStart(2,'0')
}

let ACTIVE_PLAYER = null

customElements.define('b-audio', class extends LitElement {

    static get properties(){return {
        src: {type: String, reflect: true},
        autoplay: {type: Boolean, reflect: true},
        playing: {type: Boolean, reflect: true},
        // currentTime: {type: Number},
    }}

    constructor(src='', {
        autoplay = false
    }={}){
        super()
        this.src = src
        this.autoplay = autoplay
        this.playing = false
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            /* padding: 1em; */
            border: solid 1px rgba(0,0,0,.1);
            background: #fff;
            border-radius: var(--radius);
            --radius: 4px;
        }

        main {
            display: grid;
            grid-template-columns: 2em 45px 1fr 45px;
            align-items: center;
            justify-content: space-between;
            gap: .25em;
            padding-right: .5em;
        }

        .time {
            font-weight: bold;
        }

        .time.elapsed {
            text-align: right;
        }

        .btn-play {
            cursor: pointer;
            height: 1.5em;
            width: 1.5em;
            margin: .25em;
            padding: .25em;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            border-radius: 20px;
            /* margin-right: .5em; */
            background: #eee;
            /* color: #fff; */
            /* border: solid 2px; */
            transition: color .15s ease-in-out, border-color .15s ease-in-out;
        }

        :host([status="error"]) {
            background: var(--red-50) !important;
        }

        :host([status="error"]) .btn-play {
            color: var(--red);
            background: var(--red-100);
        }


        .btn-play:hover {
            color: var(--blue);
        }

        input[type=range] {
            -webkit-appearance: none;
            min-width: 100px;
            height: 10px;
            border-radius: 5px;
            background: var(--black);
            outline: none;
            padding: 0;
            margin: 0 .5em;
            border: none;
            box-shadow: none;
        }

        input[type=range]::-webkit-slider-runnable-track {
            border: none;
            height: 100%;
        }

        input[type=range]::-webkit-slider-thumb {
            display: none;
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: solid 2px #fff;
            background: var(--black);
            cursor: pointer;
            box-shadow: none;
            margin-top: -4px;
        }

        input[type=range]::-webkit-slider-thumb:hover {
            background: var(--blue);
        }

        input[type=range]:active::-webkit-slider-thumb {
            background: var(--blue);
        }

        input[type=range]:hover::-webkit-slider-thumb {
            display: block;
        }

        .settings {
            transform: rotate(90deg);
        }
    `}

    render(){ return html`
        <main @mouseenter=${this.onHover} @mouseleave=${this.onHoverLeave}>
            <audio
                @loadedmetadata=${this.audioLoaded}
                @timeupdate=${this.audioTimeChange}
                @ended=${this.pause}
                @error=${this.audioLoadError}
            ></audio>
            <span class="btn-play icon-play" @click=${this.playPause}>
                <b-icon name=${this.playing?'pause':'play'}></b-icon>
            </span>
            <span class="elapsed time">00:00</span>
            <input type="range" value="0" disabled
                @input=${this.progressSliderChanging}
                @change=${this.progressSliderChangingDone}
                class="progress"/>
            <span class="remaining time">00:00</span>
            <!-- <b-btn clear icon="dot-3" class="settings" @click=${this.viewSettings}></b-btn> -->
        </main>
    `}

    // events: {
    //     'mouseenter': 'onHover',
    //     'mouseleave': 'onHoverLeave',
    //     'mouseenter .progress': 'progressHover',
    //     'mouseleave .progress': 'progressHoverLeave',
    //     'input .progress': 'progressSliderChanging',
    //     'change .progress': 'progressSliderChangingDone',
    //     'click .btn-settings': 'viewSettings',
    //     'click .btn-play': 'playPause'
    // },

    firstUpdated(){

        this.audio = this.shadowRoot.querySelector('audio')
        this.progress = this.shadowRoot.querySelector('.progress')
        this.elapsed = this.shadowRoot.querySelector('.elapsed')
        this.remaining = this.shadowRoot.querySelector('.remaining')

        this.loadAudio(this.src)
    }
    
    get status(){ return this.getAttribute('status') }
    set status(val){
        this.setAttribute('status', val)
    }

    playPause(){
        this.audio.paused ? this.play() : this.pause()
    }

    play(src){

        // if another audio player is playing, pause it
        if( ACTIVE_PLAYER && ACTIVE_PLAYER != this )
            ACTIVE_PLAYER.pause()

        // if audio src has not loaded yet or we have been given a new src, load it now
        if( !this._loaded || src ){
            this.loadAudio(src || this.src )
            return
        }

        if( this.status == 'error' )
            return;

        ACTIVE_PLAYER = this;
        this.audio.play()
        this.playing = true
    }

    pause(){
        ACTIVE_PLAYER = null;
        this.clip = null; // clear any clips
        this.audio.pause()
        this.playing = false
    }
    
    skipBack(val){ this.skip(-val||-10) }
    skipForward(val){ this.skip(val||10) }
    skip(amt){
        var time = this.audio.currentTime + amt;
        if( time < 0 ) time = 0;
        if( time > this.audio.duration ) time = this.audio.duration;
        this.audio.currentTime = time;
    }
    
    loadAudio(src){
        this.status = 'loading'
        this.audio.src = src
    }

// Events ==================================================================

    audioLoadError(){
        this._loaded = true;
        this.status = 'error'
        this.progress.disabled = true
    }

    audioLoaded(){
        this.status = 'loaded'
        this._loaded = true;
        this.progress.disabled = false
        this.progress.max = this.audio.duration
        this.setProgress()

        // clips were set before fully loaded, so set them again if needed
        if( this.clip && this.clip.length == 2 && isNaN(this.clip[1]) )
            this.playLastClip()
        else if( this.clip && this.clip.length > 2 && isNaN(this.clip[2]) )
            this.playEndClips()
        else if( this.autoplay )
            this.play()
    }

/*
    Playing <audio> time has changed
*/
    audioTimeChange(){
        
        // update the progress slider unless currently seeking
        if( !this.seeking )
            this.progress.value = this.audio.currentTime
            
        this.setProgress();

        // reached end of clip, stop
        if( this.clip && this.audio.currentTime >= this.clip[1] ){

            // more than one clip is given, remove the just finished clip and begin playing the next one
            if( this.clip.length > 2 ){
                this.audio.pause();
                setTimeout(function(){ // play next clip after 700ms pause
                    this.playClip(this.clip.splice(2))
                }.bind(this), 700)
            }else{
                this.pause();
            }
        }
    }

/*
    Set Progress: uses current poisition to adjust background of proress slider on and updates elapsed/remaining times
*/
    setProgress(){

        var percent = this.progress.value / this.audio.duration * 100;
        var time = this.progress.value
        var color = '#2c3033' // this.classList.contains('progress-hover') ? '#3498db' : '#2c3033';
        
        this.progress.style.background = "linear-gradient(to right, "+color+" "+percent+"%, #bbb "+percent+"%)"
        this.elapsed.innerHTML = formatTime(time)
        this.remaining.innerHTML = this.audio.duration == Infinity ? '' : formatTime(this.audio.duration - time)
    }

    progressSliderChanging(){
        this.seeking = true
        this.wasPlaying = this.wasPlaying || !this.audio.paused
        this.audio.pause();
        this.setProgress()
    }

    progressSliderChangingDone(){
        this.audio.currentTime = this.progress.value
        this.wasPlaying && this.play()
        this.wasPlaying = null;
        this.seeking = false;
        this.progress.blur() // so slider doesn't hijack the keyboard events
    }

    progressHover(){
        this.classList.add('progress-hover')
        this.setProgress();
    }

    progressHoverLeave(){
        this.classList.remove('progress-hover')
        this.setProgress();
    }
    
// Clips ====================================================================

    setClipLength(item){
        store('audioplayer:clip-length', item.val)
    }

    clipLength(){
        return store('audioplayer:clip-length') || 15
    }

    playFirstClip(){
        if( this.audio.duration < this.clipLength() ) return; // TODO: improve
        this.playClip([0, this.clipLength()])
    }

    playLastClip(){
        if( this.audio.duration < this.clipLength() ) return;
        this.playClip([this.audio.duration - this.clipLength(), this.audio.duration])
    }

    playEndClips(){
        if( this.audio.duration < this.clipLength() ) return;
        this.playClip([0, this.clipLength(), this.audio.duration - this.clipLength(), this.audio.duration])
    }

    playClip(clip){
        this.clip = clip
        if( !isNaN(this.clip[0]) )
            this.audio.currentTime = this.clip[0]
        this.play()
    }
    
// Keyboard Shortcuts =======================================================

    onKeyPress(e){

        if( this.status == 'error' )
            return;

        e.preventDefault()
        e.stopPropagation()

        switch(e.which){
            case 32: this.playPause(); break; // space
            case 27: this.pause(); break; // esc
            case 70: this.playFirstClip(); break; // f
            case 76: this.playLastClip(); break; // l
            case 69: this.playEndClips(); break; // e
            case 37: // left
                if( e.shiftKey )
                    this.audio.currentTime = 0;
                else
                    this.skipBack(_.metaKey()?30:10)
                break;
            case 39: // right
                if( e.shiftKey )
                    this.audio.currentTime = this.audio.duration
                else
                    this.skipForward(_.metaKey()?30:10)
                break;
        }
    }

    onHover(){
        this._onKeyPress = this._onKeyPress || this.onKeyPress.bind(this)
        window.addEventListener('keydown', this._onKeyPress)
    }

    onHoverLeave(){
        window.removeEventListener('keydown', this._onKeyPress)
    }
    
// Settings & Utilities =====================================================

    // viewSettings(e){

    //     var menu = [{
    //         label: 'Tips',
    //         icon: 'lightbulb',
    //         dropdown: {
    //             view: marked("While hovered over the player, you can control via keybard shortcuts:  \n\n`space` = play/pause  \n`f` = play **first** clip  \n`l` = play **last** clip  \n`e` = play **end** clips  \n  \n`←` = skip **back** 10  \n`ctrl+←` 30 sec  \n`→` = skip **forward** 10  \n`ctrl+→` 30 sec"),
    //             align: 'leftBottom',
    //             w: 180
    //         }
    //     },{
    //         label: 'Clip Length',
    //         icon: 'clock',
    //         menu: {
    //             view: [
    //                 {label: '10 sec', val: 10},
    //                 {label: '15 sec', val: 15},
    //                 {label: '20 sec', val: 20},
    //                 {label: '30 sec', val: 30},
    //             ],
    //             onClick: 'setClipLength',
    //             selected: this.clipLength,
    //             align: 'leftBottom',
    //             w: 90
    //         }
    //     },'divider',{
    //         label: 'Fullscreen',
    //         icon: 'resize-full',
    //         onClick: 'fullscreenToggle'
    //     }]

    //     $(e.currentTarget).dropdown(menu, {
    //         w: 120,
    //         align: 'bottomLeft',
    //         trigger: 'none',
    //         context: this
    //     })
    // }

})

export default customElements.get('b-audio')