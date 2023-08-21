// https://gist.github.com/beefchimi/a1cc7fdfa722ae1366ca8d982f20ed8d#file-single-js
import fetchAudioBuffer from './fetch-audio-buffer';
import methodPatch from './method-patch';
import MobileAudioFix from './mobile-audio-fix';
import device from '../util/device'
import vibrate from '../util/vibrate'

// All of my MP3s were built to be a consistent volume on export,
// so I can safely set the same gain on all of them.
const singleGain = 0.6;

let assetPaths = {};

export default class Single {

  static get singleKeys(){
      return Object.keys(assetPaths);
  }

  constructor(soundAssets={}) {
    
    assetPaths = soundAssets

    if( !('AudioContext' in window) )
      return

    this.context = new AudioContext();
    // Think of this as the "volume knob"   
    this.gainNode = this.context.createGain();
    // `source` will be the active "sound"
    this.source = null;
    // Used to store all of my decoded sounds
    this.sounds = {};

    // Loop through all of my paths, fetch them,
    // and store their decoded AudioBuffer in the `sounds` object
    Single.singleKeys.forEach((key) => {
      fetchAudioBuffer(assetPaths[key], this.context).then((response) => {
        this.sounds[key] = response;
        return this.sounds[key];
      }).catch(() => {
        this.sounds[key] = null;
      });
    });

    this.mobileAudio = new MobileAudioFix(this.context);
    this.mobileAudio.init();
  }

  playIfMobile(...args){
    if( device.isMobile ){
      this.play(...args)
      vibrate(70) // NOTE: do I want this to always happen?
    }
  }

  play(key, volume) {
    
    if( !this.context ) return

    if (!Single.singleKeys.includes(key)) {
      return Error(`The requested sound is not available: ${key}`);
    }

    return this._startSource(this.sounds[key], volume||singleGain);
  }

  _startSource(sound, volume) {
    // We need to create a `AudioBufferSourceNode` in order to attach
    // our individual decoded sound
    this.source = this.context.createBufferSource();
    this.source.buffer = sound;

    // Turn the volume knob up to a specific value at the current time
    this.gainNode.gain.setValueAtTime(
      volume,
      this.context.currentTime
    );

    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);

    this.source.start = methodPatch.start(this.source);
    this.source.start();
  }
}
