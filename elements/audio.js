/*
    # Audio

    A simple styled audio bar with controls
*/
import { LitElement, html, css } from 'lit'
import './btn'
import '../presenters/form/controls/range-slider'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import store from '../util/store'

dayjs.extend(duration)

// TODO: hook up settings menu

const formatTime = sec=>{
    var dur = dayjs.duration(sec * 1000)
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
        status: {type: String, reflect: true},
        // currentTime: {type: Number},
    }}

    // supporr subclassing
    get audioElement(){ return 'audio' }

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
            background: var(--theme-bgd, #fff);
            border-radius: var(--radius);
            --radius: 4px;

            --b-audio-progress: var(--theme-text, #333);
            --b-audio-progress-bgd: var(--theme-bgd-accent, #bbb);
        }

        main {
            display: grid;
            grid-template-columns: 2em minmax(45px, auto) 1fr minmax(45px, auto);
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
            padding: .25em;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            border-radius: 20px;
            /* margin-right: .5em; */
            background: var(--theme-bgd-accent, #eee);
            /* color: #fff; */
            /* border: solid 2px; */
            transition: color .15s ease-in-out, border-color .15s ease-in-out;
        }

        /*:host([status="error"]) {
            background: var(--red-50) !important;
        }*/

        :host([status="error"]) .btn-play {
            color: var(--red);
            background: var(--red-100);
        }


        .btn-play:hover {
            color: var(--theme);
        }

        [part="progress"] {
            -webkit-appearance: none;
            min-width: 100px;
            height: 10px;
            border-radius: var(--b-audio-progress-radius, 1em);
            background: var(--theme-text, var(--black));
            outline: none;
            padding: 0;
            margin: 0 .5em;
            border: none;
            box-shadow: none;
        }

        [part="progress"]::-webkit-slider-runnable-track {
            border: none;
            height: 100%;
        }

        [part="progress"]::-webkit-slider-thumb {
            display: none;
            -webkit-appearance: none;
            appearance: none;
            width: var(--b-audio-progress-thumb-size, 18px);
            height: var(--b-audio-progress-thumb-size, 18px);
            border-radius: 50%;
            border: solid 2px var(--theme-bgd, #fff);
            background: var(--theme-text, var(--black));
            cursor: pointer;
            box-shadow: none;
            margin-top: -4px;
        }

        [part="progress"]::-webkit-slider-thumb:hover {
            background: var(--theme);
        }

        [part="progress"]:active::-webkit-slider-thumb {
            background: var(--theme);
        }

        [part="progress"]:hover::-webkit-slider-thumb {
            display: block;
        }

        .settings {
            transform: rotate(90deg);
        }

        [name="before"], [name="after"] {
            display: block;
            grid-column: 1/-1;
        }
    `}

    get audio(){

        if( this._audio ) return this._audio

        let audio = document.createElement(this.audioElement)

        audio.addEventListener('loadedmetadata', this.audioLoaded.bind(this))
        audio.addEventListener('timeupdate', this.audioTimeChange.bind(this))
        audio.addEventListener('ended', this.pause.bind(this))
        audio.addEventListener('error', this.audioLoadError.bind(this))

        return this._audio = audio
    }

    render(){ return html`
        <main part="main">

            <slot name="before"></slot>

            ${this.audio}

            <b-btn color="theme-gradient" pill icon=${this.playing?'pause':'play_arrow'} @click=${this.playPause}></b-btn>
            
            <span part="time-elapsed" class="elapsed time">00:00</span>
            
            <input part="progress" type="range" value="0" disabled
                @input=${this.progressSliderChanging}
                @change=${this.progressSliderChangingDone}
                class="progress"/>

            <span part="time-remaining" class="remaining time">00:00</span>
            <!-- <b-btn clear icon="dot-3" class="settings" @click=${this.viewSettings}></b-btn> -->

            <slot name="after"></slot>
        </main>
    `}

    disconnectedCallback(){
        super.disconnectedCallback()
        this.pause()
        this.onHoverLeave()
    }

    firstUpdated(){

        this.progress = this.shadowRoot.querySelector('.progress')
        this.elapsed = this.shadowRoot.querySelector('.elapsed')
        this.remaining = this.shadowRoot.querySelector('.remaining')

        this.addEventListener('mouseenter', this.onHover)
        this.addEventListener('mouseleave', this.onHoverLeave)

        // this.loadAudio(this.src)
    }

    set src(val){
        let oldVal = this.src
        this.__src = val

        if( val == oldVal ) return

        let isPlaying = this.playing

        if( oldVal )
            this.pause()

        setTimeout(()=>{
            this.loadAudio(this.src)

            if( isPlaying )
                this.play()
        })
    
        this.requestUpdate('src', oldVal)
    }
    
    get src(){ return this.__src}
    
    // get status(){ return this.getAttribute('status') }
    // set status(val){
    //     this.setAttribute('status', val)
    // }

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
        this._loaded = false
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
        if( !this.seeking && this.progress )
            this.progress.value = this.audio.currentTime
            
        if( this.progress )
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
        var color = 'var(--b-audio-progress, #333)'
        var color2 = 'var(--b-audio-progress-bgd, #bbb)'
        
        this.progress.style.background = `linear-gradient(to right, ${color} ${percent}%, ${color2} ${percent}%)`

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
        let metaKey = e.metaKey || e.ctrlKey

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
                    this.skipBack(metaKey?30:10)
                break;
            case 39: // right
                if( e.shiftKey )
                    this.audio.currentTime = this.audio.duration
                else
                    this.skipForward(metaKey?30:10)
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

})

export default customElements.get('b-audio')